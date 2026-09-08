/* ===========================================================
   EL FLUJO DE CALIFICACIÓN — fuente única.

   Las preguntas, sus opciones y los campos del paso 3. El bloque
   se construye contra este archivo, igual que Casos contra
   `casos.ts`: si mañana cambia una opción, cambia acá y no en el
   componente.

   ⚠ ESTÁ ESCRITO PARA SERIALIZARSE, AUNQUE TODAVÍA NO SE ENVÍE.
   La fase 1 no guarda nada —no hay backend, no hay Calendly— pero
   la fase 2 sí, y lo que se va a guardar NO es el índice del radio
   marcado: es el TEXTO de la opción elegida, que es lo que alguien
   va a leer en la base sin tener que traducir un número.

   Por eso cada opción tiene `id` y texto por separado:

   - el `id` es la clave estable, la que viaja en el `value` del
     radio y la que sobrevive a una corrección de redacción;
   - el texto es el dato, y lo arma `textoDeOpcion()` en un solo
     lugar para que la raya larga entre nombre y detalle no se
     escriba dos veces.

   `respuestasSerializables()` devuelve el objeto que la fase 2 va
   a mandar. Hoy no lo llama nadie en producción y es a propósito:
   el contrato se escribe ahora, mientras las decisiones están
   frescas, y no cuando haya que conectarlo con apuro.
   =========================================================== */

/* El mail de contacto, en un solo lugar.
   Lo usan el footer —donde vivía como constante local— y CON-3.
   Dos constantes con la misma dirección es una de las dos
   desactualizada esperando su turno. */
export const MAIL = "marketing@velocentum.com";

/** Una opción de los pasos 1 y 2. */
export type Opcion = {
  /** Clave estable. Viaja en el `value` del radio y a la base. */
  id: string;
  /** Lo que se lee grande en la tarjeta. */
  nombre: string;
  /** La aclaración chica. El paso 2 no la usa. */
  detalle?: string;
};

/** Uno de los dos pasos de opciones. */
export type PasoDeOpciones = {
  id: "rubro" | "objetivo";
  /** La pregunta. Es el titular del paso y recibe el foco al entrar. */
  titulo: string;
  /** El renglón chico bajo la pregunta. */
  ayuda: string;
  opciones: Opcion[];
};

/* La primera pregunta deja sólo rubros que cambian el diagnóstico:
   Retail solapaba E-commerce y las aclaraciones repetían el nombre. */
export const PASOS_DE_OPCIONES: PasoDeOpciones[] = [
  {
    id: "rubro",
    titulo: "¿En qué rubro estás?",
    ayuda: "Elegí el que mejor te describa.",
    opciones: [
      { id: "ecommerce", nombre: "E-commerce" },
      { id: "servicios", nombre: "Servicios" },
      { id: "b2b", nombre: "B2B" },
      { id: "otro", nombre: "Otro" },
    ],
  },
  {
    id: "objetivo",
    titulo: "¿Qué querés lograr?",
    ayuda: "Elegí lo que más te pesa hoy. En la llamada vemos el resto.",
    opciones: [
      { id: "escalar", nombre: "Escalar las ventas que ya tengo" },
      { id: "ordenar", nombre: "Ordenar y sistematizar el marketing" },
      { id: "digital", nombre: "Crecer en el canal digital" },
      { id: "consultas", nombre: "Generar más consultas calificadas" },
    ],
  },
];

/** El texto que se guarda cuando alguien elige esta opción. */
export function textoDeOpcion(opcion: Opcion): string {
  return opcion.detalle ? `${opcion.nombre} — ${opcion.detalle}` : opcion.nombre;
}

/* --- El paso 3 --- */

export type CampoId = "nombre" | "telefono" | "email" | "instagram" | "web";

/**
 * Cómo se valida cada campo. Los cinco son obligatorios; la
 * comprobación extra es la que va después de "y además".
 */
export type Comprobacion = "digitos" | "email" | "ninguna";

export type Campo = {
  id: CampoId;
  etiqueta: string;
  /**
   * El `autocomplete` del navegador. No es decorativo: es lo que
   * deja que alguien complete los cinco campos de una vez con lo
   * que ya tiene guardado, y para quien usa un lector de pantalla
   * o navega con una mano es la diferencia entre un formulario de
   * cinco campos y uno de ninguno.
   */
  autocompletado: string;
  /** El teclado que abre un teléfono. */
  tipo: "text" | "tel" | "email" | "url";
  comprobacion: Comprobacion;
  /** Falta el campo entero. */
  errorVacio: string;
  /** Está escrito pero no pasa la comprobación. */
  errorFormato?: string;
};

/* ⚠ LOS MENSAJES DICEN QUÉ HACER, NO QUÉ ESTÁ MAL.
   «Escribí tu nombre» y no «campo requerido»: el segundo describe
   el estado del formulario, el primero le dice a la persona cuál
   es su próximo movimiento. Es la diferencia entre un cartel y una
   instrucción, y con cinco campos obligatorios seguidos importa.

   Y CUANDO SE PUEDE, UN EJEMPLO EN VEZ DE UNA REGLA. El error de
   formato del teléfono decía «agregá la característica: tiene que
   tener al menos 8 dígitos», y mezclaba dos cosas: la
   característica es UN caso del problema, no la regla, y «al menos
   8 dígitos» le pide al visitante que cuente lo que escribió. Un
   número de ejemplo resuelve las dos sin explicar ninguna. */
export const CAMPOS: Campo[] = [
  {
    id: "nombre",
    etiqueta: "Nombre completo",
    autocompletado: "name",
    tipo: "text",
    comprobacion: "ninguna",
    errorVacio: "Escribí tu nombre completo.",
  },
  {
    id: "telefono",
    etiqueta: "WhatsApp",
    autocompletado: "tel",
    tipo: "tel",
    comprobacion: "digitos",
    errorVacio: "Escribí tu WhatsApp.",
    errorFormato: "Escribilo con característica, como +54 9 11 3581-0100.",
  },
  {
    id: "email",
    etiqueta: "Email",
    autocompletado: "email",
    tipo: "email",
    comprobacion: "email",
    errorVacio: "Escribí tu email.",
    errorFormato: "Escribilo con arroba y dominio, como nombre@empresa.com.",
  },
  {
    id: "instagram",
    etiqueta: "Instagram",
    autocompletado: "url",
    tipo: "text",
    comprobacion: "ninguna",
    errorVacio: "Escribí el Instagram de tu marca.",
  },
  {
    id: "web",
    etiqueta: "Web",
    autocompletado: "url",
    tipo: "url",
    comprobacion: "ninguna",
    errorVacio: "Escribí la web de tu marca.",
  },
];

/* ⚠ REGEX LAXO A PROPÓSITO. Uno estricto rechaza direcciones
   perfectamente válidas —subdominios largos, signos que el
   estándar permite— y no atrapa las que de verdad importan, que
   son las bien formadas y equivocadas. Acá sólo se pide que haya
   algo, un arroba, algo, un punto y algo. Lo demás lo dice el
   rebote del mail. */
const EMAIL = /^\S+@\S+\.\S+$/;

/* Ocho dígitos es el piso de un número argentino sin
   característica. Se cuentan SÓLO los dígitos porque la gente lo
   escribe con espacios, guiones, paréntesis y un `+` adelante, y
   los cinco formatos son correctos. */
const MINIMO_DE_DIGITOS = 8;

/**
 * Devuelve el error de un campo, o `null` si está bien.
 * Se llama al intentar avanzar, nunca al tipear.
 */
export function errorDeCampo(campo: Campo, valor: string): string | null {
  const limpio = valor.trim();
  if (!limpio) return campo.errorVacio;

  if (campo.comprobacion === "digitos") {
    const digitos = limpio.replace(/\D/g, "").length;
    if (digitos < MINIMO_DE_DIGITOS) return campo.errorFormato ?? campo.errorVacio;
  }

  if (campo.comprobacion === "email" && !EMAIL.test(limpio)) {
    return campo.errorFormato ?? campo.errorVacio;
  }

  return null;
}

/* --- El estado del flujo, y lo que la fase 2 va a mandar --- */

export type EstadoDelFlujo = {
  /** Id de la opción elegida en cada paso de opciones. */
  elecciones: Partial<Record<PasoDeOpciones["id"], string>>;
  /** Lo escrito en el paso 3, sin recortar. */
  datos: Record<CampoId, string>;
};

export const ESTADO_INICIAL: EstadoDelFlujo = {
  elecciones: {},
  datos: { nombre: "", telefono: "", email: "", instagram: "", web: "" },
};

/**
 * El objeto que la fase 2 va a serializar.
 *
 * Las respuestas salen como TEXTO y no como id: quien abra la base
 * tiene que leer «E-commerce — vendo productos online» y no
 * `ecommerce`. El id queda al lado para poder agrupar sin parsear
 * castellano.
 */
export function respuestasSerializables(estado: EstadoDelFlujo) {
  const elegida = (paso: PasoDeOpciones) =>
    paso.opciones.find((o) => o.id === estado.elecciones[paso.id]);

  const respuestas = PASOS_DE_OPCIONES.map((paso) => {
    const opcion = elegida(paso);
    return {
      pregunta: paso.titulo,
      id: opcion?.id ?? null,
      respuesta: opcion ? textoDeOpcion(opcion) : null,
    };
  });

  return {
    respuestas,
    contacto: Object.fromEntries(CAMPOS.map((c) => [c.id, estado.datos[c.id].trim()])) as Record<
      CampoId,
      string
    >,
  };
}
