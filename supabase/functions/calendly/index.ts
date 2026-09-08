const CALENDLY_PAT = Deno.env.get("CALENDLY_PAT");
const CALENDLY_API = "https://api.calendly.com";
const EVENT_URL = "https://calendly.com/matias-velocentum/analisis-de-negocio";
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type CalendlyResource = { uri: string };
type CalendlyLocation = { kind: string };
type CalendlyEventType = {
  uri: string;
  scheduling_url: string;
  locations?: CalendlyLocation[];
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

async function eventTypeUri() {
  const me = (await calendly("/users/me")) as { resource?: CalendlyResource };
  const user = me.resource?.uri;
  if (!user) throw new Error("No se encontró el usuario de Calendly.");

  const types = (await calendly(`/event_types?user=${encodeURIComponent(user)}&active=true`)) as {
    collection?: CalendlyEventType[];
  };
  const expected = EVENT_URL.replace(/\/$/, "");
  const eventType = types.collection?.find(
    (type) => type.scheduling_url.replace(/\/$/, "") === expected,
  );
  if (!eventType) throw new Error("No se encontró el evento Análisis de negocio en Calendly.");
  return eventType;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (request.method !== "POST") return fail("Método no permitido.", 405);

  try {
    const body = (await request.json()) as Record<string, unknown>;

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
        event_type: (await eventTypeUri()).uri,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
      });
      const result = (await calendly(`/event_type_available_times?${query}`)) as {
        collection?: unknown[];
      };
      return json({ collection: result.collection ?? [] });
    }

    if (body.action === "book") {
      const leadId = typeof body.lead_id === "string" ? body.lead_id : "";
      const startTime = typeof body.start_time === "string" ? body.start_time : "";
      const name = typeof body.name === "string" ? body.name.trim() : "";
      const email = typeof body.email === "string" ? body.email.trim() : "";
      const timezone =
        typeof body.timezone === "string" ? body.timezone : "America/Argentina/Buenos_Aires";
      if (
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(leadId)
      ) {
        return fail("Lead inválido.");
      }
      if (Number.isNaN(new Date(startTime).valueOf())) return fail("Horario inválido.");
      if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email)) return fail("Datos de contacto inválidos.");
      const eventType = await eventTypeUri();
      const location = eventType.locations?.length === 1 ? eventType.locations[0] : undefined;
      const result = (await calendly("/invitees", {
        method: "POST",
        body: JSON.stringify({
          event_type: eventType.uri,
          start_time: new Date(startTime).toISOString(),
          invitee: { name, email, timezone },
          // Calendly exige que una reserva indique la ubicación cuando
          // el tipo de evento tiene una sola ubicación configurada.
          ...(location ? { location } : {}),
          tracking: { utm_content: leadId },
        }),
      })) as { resource?: CalendlyResource };
      return json({ uri: result.resource?.uri ?? null });
    }

    return fail("Acción inválida.");
  } catch (error) {
    console.error(error);
    return fail(error instanceof Error ? error.message : "No se pudo procesar la solicitud.", 502);
  }
});
