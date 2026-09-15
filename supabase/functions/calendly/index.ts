const CALENDLY_PAT = Deno.env.get("CALENDLY_PAT");
const CALENDLY_API = "https://api.calendly.com";
const EVENT_URLS: Record<string, string> = {
  business: "https://calendly.com/matias-velocentum/analisis-de-negocio",
  ecommerce: "https://calendly.com/matias-velocentum/30min",
};
type EventKey = keyof typeof EVENT_URLS;

function eventKeyDe(body: Record<string, unknown>): EventKey | null {
  if (body.event_key === undefined || body.event_key === null || body.event_key === "") {
    return "business";
  }
  return typeof body.event_key === "string" && body.event_key in EVENT_URLS
    ? (body.event_key as EventKey)
    : null;
}
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type CalendlyResource = { uri: string };
type CalendlyLocation = { kind: string };
type CalendlyCustomQuestion = {
  name: string;
  type?: string;
  position?: number;
  enabled?: boolean;
  required?: boolean;
  answer_choices?: string[];
};
type CalendlyEventType = {
  uri: string;
  scheduling_url: string;
  locations?: CalendlyLocation[];
  custom_questions?: CalendlyCustomQuestion[];
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

function fail(message: string, status = 400) {
  return json({ error: message }, status);
}

async function calendly(path: string, init: RequestInit = {}) {
  if (!CALENDLY_PAT) throw new Error("Calendly no está configurado en Supabase.");
  const response = await fetch(`${CALENDLY_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${CALENDLY_PAT}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (!response.ok) {
    const detalle = await response.text();
    console.error("Calendly rechazó la solicitud", { path, status: response.status, detalle });
    throw new Error(`Calendly respondió ${response.status}: ${detalle}`);
  }
  return response.json();
}

async function eventTypeUri(key: EventKey) {
  const me = (await calendly("/users/me")) as { resource?: CalendlyResource };
  const user = me.resource?.uri;
  if (!user) throw new Error("No se encontró el usuario de Calendly.");

  const types = (await calendly(`/event_types?user=${encodeURIComponent(user)}&active=true`)) as {
    collection?: CalendlyEventType[];
  };
  const expected = EVENT_URLS[key].replace(/\/$/, "");
  const eventType = types.collection?.find(
    (type) => type.scheduling_url.replace(/\/$/, "") === expected,
  );
  if (!eventType) throw new Error(`No se encontró el evento "${key}" en Calendly.`);
  return eventType;
}

// ---------------------------------------------------------------------------
// Respuestas obligatorias del evento e-commerce.
// El texto y la posición de cada pregunta se toman SIEMPRE de la configuración
// real del event type en Calendly; acá sólo declaramos qué campo del cliente
// responde a qué pregunta, en orden de especificidad para el emparejado.
// ---------------------------------------------------------------------------
type CampoEcommerce = {
  campo: string;
  patron: RegExp;
  max: number;
  obligatorio: boolean;
  telefono?: boolean;
};

const CAMPOS_ECOMMERCE: CampoEcommerce[] = [
  { campo: "nombre_tienda", patron: /nombre|marca/i, max: 160, obligatorio: true },
  { campo: "instagram", patron: /instagram|\big\b|@|redes/i, max: 160, obligatorio: true },
  {
    campo: "whatsapp",
    patron: /whats|tel[eé]fono|celular|phone|m[oó]vil/i,
    max: 32,
    obligatorio: true,
    telefono: true,
  },
  {
    campo: "facturacion_mensual",
    patron: /factur|ingres|ventas|revenue|mensual/i,
    max: 120,
    obligatorio: true,
  },
  { campo: "rol", patron: /rol|cargo|puesto|funci[oó]n/i, max: 120, obligatorio: true },
  {
    campo: "tienda_online_activa",
    patron: /tienda|online|shop|vend[eé]s|e-?commerce/i,
    max: 120,
    obligatorio: true,
  },
  {
    campo: "comentario",
    patron: /coment|contanos|cu[eé]nt|detalle|objetivo|algo m[aá]s/i,
    max: 1000,
    obligatorio: false,
  },
];

function textoDe(valor: unknown) {
  return typeof valor === "string" ? valor.trim() : "";
}

/** Normaliza un número a E.164 (Argentina por defecto). */
function aE164(valor: string) {
  const limpio = valor.replace(/[^\d+]/g, "");
  let digitos = limpio.startsWith("+")
    ? limpio.slice(1).replace(/\D/g, "")
    : limpio.replace(/\D/g, "");
  const teniaMas = limpio.startsWith("+");
  if (!teniaMas) {
    if (digitos.startsWith("00")) digitos = digitos.slice(2);
    else if (!digitos.startsWith("54")) {
      // número local argentino: se quita el 0 de larga distancia y el 15 del
      // móvil, y se agrega el 9 que exige E.164 para celulares argentinos.
      const local = digitos.replace(/^0/, "").replace(/^(\d{2,4})15(\d{6,8})$/, "$1$2");
      digitos = local.length === 10 ? `549${local}` : `54${local}`;
    }
  }
  if (!/^[1-9]\d{7,14}$/.test(digitos)) return null;
  return `+${digitos}`;
}

type Respuesta = { question: string; answer: string; position: number };

/** Empareja los campos declarados con las preguntas reales del event type. */
function armarRespuestas(
  eventType: CalendlyEventType,
  entrada: Record<string, unknown>,
): { respuestas: Respuesta[]; telefono: string | null; telefonoRequerido: boolean } | { error: string } {
  const preguntas = (eventType.custom_questions ?? []).filter(
    (pregunta) => pregunta.enabled !== false && typeof pregunta.name === "string",
  );
  const usadas = new Set<CalendlyCustomQuestion>();
  const respuestas: Respuesta[] = [];
  let telefono: string | null = null;
  let telefonoRequerido = false;

  for (const campo of CAMPOS_ECOMMERCE) {
    const pregunta = preguntas.find(
      (candidata) => !usadas.has(candidata) && campo.patron.test(candidata.name),
    );
    const valorCrudo = textoDe(entrada[campo.campo]);

    if (!pregunta) {
      // La pregunta no existe en el evento: el dato se ignora sin romper nada.
      if (valorCrudo && campo.obligatorio) continue;
      continue;
    }
    usadas.add(pregunta);

    const requerida = pregunta.required === true || campo.obligatorio;
    if (!valorCrudo) {
      if (requerida) return { error: `Falta el campo obligatorio "${campo.campo}".` };
      continue;
    }
    if (valorCrudo.length > campo.max) {
      return { error: `El campo "${campo.campo}" supera ${campo.max} caracteres.` };
    }

    let valor = valorCrudo;
    const opciones = pregunta.answer_choices ?? [];
    if (opciones.length > 0) {
      const elegida = opciones.find(
        (opcion) => opcion.trim().toLowerCase() === valorCrudo.toLowerCase(),
      );
      if (!elegida) {
        return {
          error: `El campo "${campo.campo}" debe ser uno de: ${opciones.join(" | ")}.`,
        };
      }
      valor = elegida;
    }
    if (campo.telefono) {
      const normalizado = aE164(valorCrudo);
      if (!normalizado) return { error: `El campo "${campo.campo}" no es un teléfono válido.` };
      valor = normalizado;
      telefono = normalizado;
      telefonoRequerido = pregunta.type === "phone_number";
    }

    respuestas.push({
      question: pregunta.name,
      answer: valor,
      position: typeof pregunta.position === "number" ? pregunta.position : respuestas.length,
    });
  }

  // Cualquier pregunta obligatoria del evento que no hayamos podido responder
  // debe fallar de forma explícita en lugar de que Calendly rechace la reserva.
  const sinResponder = preguntas.find(
    (pregunta) => pregunta.required === true && !usadas.has(pregunta),
  );
  if (sinResponder) {
    return { error: `El evento pide una respuesta no soportada: "${sinResponder.name}".` };
  }

  respuestas.sort((a, b) => a.position - b.position);
  return { respuestas, telefono, telefonoRequerido };
}

// Protección simple contra dobles reservas (misma instancia, 10 minutos).
const reservas = new Map<string, { vence: number; promesa: Promise<{ uri: string | null }> }>();
function limpiarReservas() {
  const ahora = Date.now();
  for (const [clave, valor] of reservas) if (valor.vence <= ahora) reservas.delete(clave);
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (request.method !== "POST") return fail("Método no permitido.", 405);

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const eventKey = eventKeyDe(body);
    if (!eventKey) return fail("Evento inválido.");

    if (body.action === "availability") {
      const start = typeof body.start_time === "string" ? new Date(body.start_time) : null;
      const end = typeof body.end_time === "string" ? new Date(body.end_time) : null;
      if (
        !start ||
        !end ||
        Number.isNaN(start.valueOf()) ||
        Number.isNaN(end.valueOf()) ||
        end <= start
      ) {
        return fail("Rango de fechas inválido.");
      }
      if (end.valueOf() - start.valueOf() > 31 * 24 * 60 * 60 * 1000) {
        return fail("El rango máximo es de 31 días.");
      }
      const query = new URLSearchParams({
        event_type: (await eventTypeUri(eventKey)).uri,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
      });
      const result = (await calendly(`/event_type_available_times?${query}`)) as {
        collection?: unknown[];
      };
      return json({ collection: result.collection ?? [] });
    }

    if (body.action === "book") {
      const startTime = typeof body.start_time === "string" ? body.start_time : "";
      const name = typeof body.name === "string" ? body.name.trim() : "";
      const email = typeof body.email === "string" ? body.email.trim() : "";
      const timezone =
        typeof body.timezone === "string" ? body.timezone : "America/Argentina/Buenos_Aires";
      if (Number.isNaN(new Date(startTime).valueOf())) return fail("Horario inválido.");
      if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email))
        return fail("Datos de contacto inválidos.");
      const eventType = await eventTypeUri(eventKey);
      const location = eventType.locations?.length === 1 ? eventType.locations[0] : undefined;

      let respuestas: Respuesta[] = [];
      let telefono: string | null = null;
      let telefonoRequerido = false;
      if (eventKey === "ecommerce") {
        const entrada =
          typeof body.ecommerce_answers === "object" && body.ecommerce_answers !== null
            ? (body.ecommerce_answers as Record<string, unknown>)
            : {};
        const armado = armarRespuestas(eventType, entrada);
        if ("error" in armado) return fail(armado.error);
        respuestas = armado.respuestas;
        telefono = armado.telefono;
        telefonoRequerido = armado.telefonoRequerido;
      }

      const idempotencia =
        typeof body.idempotency_key === "string" && body.idempotency_key.trim().length > 0
          ? body.idempotency_key.trim().slice(0, 200)
          : `${eventKey}|${new Date(startTime).toISOString()}|${email.toLowerCase()}`;
      limpiarReservas();
      const existente = reservas.get(idempotencia);
      if (existente) return json(await existente.promesa);

      const promesa = (async () => {
        const result = (await calendly("/invitees", {
          method: "POST",
          body: JSON.stringify({
            event_type: eventType.uri,
            start_time: new Date(startTime).toISOString(),
            invitee: {
              name,
              email,
              timezone,
              // Sólo se envía cuando el evento pide el teléfono como pregunta
              // de tipo phone_number (recordatorio por SMS).
              ...(telefonoRequerido && telefono ? { text_reminder_number: telefono } : {}),
            },
            // Calendly exige que una reserva indique la ubicación cuando
            // el tipo de evento tiene una sola ubicación configurada.
            ...(location ? { location } : {}),
            ...(respuestas.length > 0 ? { questions_and_answers: respuestas } : {}),
          }),
        })) as { resource?: CalendlyResource };
        return { uri: result.resource?.uri ?? null };
      })();
      reservas.set(idempotencia, { vence: Date.now() + 10 * 60_000, promesa });
      try {
        return json(await promesa);
      } catch (error) {
        reservas.delete(idempotencia);
        throw error;
      }
    }

    return fail("Acción inválida.");
  } catch (error) {
    console.error(error);
    return fail(error instanceof Error ? error.message : "No se pudo procesar la solicitud.", 502);
  }
});
