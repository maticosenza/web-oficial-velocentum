/* ===========================================================
   SectionEdge — el borde de onda que cose las secciones.

   Es el hilo conductor de la home: lo usan B2 (nube blanca
   subiendo sobre azul), B3 (pie festoneado de las tarjetas de
   Trabajos), B7/B8 (nube azul subiendo sobre blanco) y B9.
   Se construye una vez y se usa en toda la página.

   DOS DECISIONES QUE VALE ACLARAR

   1. Es una FRANJA DE ALTO FIJO, no una máscara sobre el bloque
      entero. Enmascarar el bloque completo hace que los arcos se
      deformen según la proporción del bloque: una sección alta
      da arcos estirados y una baja da arcos aplastados, así que
      el "mismo" borde se ve distinto en cada lugar. Con una
      franja, la silueta es idéntica en toda la página.

   2. La máscara va sobre una capa DECORATIVA, nunca sobre texto,
      controles ni anillos de foco. Por eso el borde es un
      elemento aparte, `aria-hidden` y sin eventos de puntero, y
      el contenido de la sección nunca pasa por acá.

   La dirección no es un color invertido: el borde siempre lleva
   el color de la sección que ENTRA. "Nube blanca sobre azul" y
   "nube azul sobre blanco" son el mismo componente con distinto
   `color`.

   LA RESERVA DE ESPACIO ES AUTOMÁTICA
   Un borde `arriba` se dibuja por fuera de su sección, encima
   del bloque anterior, y tapa píxeles reales. Antes eso era una
   clase que había que acordarse de poner. Ahora lo resuelve el
   CSS con `:has()`: el bloque anterior incorpora el alto del
   borde a su padding por cálculo. Ningún bloque tiene que saber
   nada. Ver `estilos/componentes.css`.
   =========================================================== */

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type Borde = "arriba" | "abajo";

export function SectionEdge({
  color = "var(--fondo)",
  borde = "arriba",
  alto,
  className,
}: {
  /** Color de la sección que entra. */
  color?: string;
  /** `arriba`: la onda corona la sección. `abajo`: pie de tarjeta. */
  borde?: Borde;
  /** Alto de la franja. Por defecto, el del sistema. */
  alto?: string;
  className?: string;
}) {
  /* Sólo custom properties: son datos que alimentan la regla de
     `componentes.css`, no declaraciones que la pisen. */
  const tokens = {
    "--edge-color": color,
    ...(alto ? { "--edge-alto": alto } : {}),
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={["borde-onda", className].filter(Boolean).join(" ")}
      data-borde={borde}
      style={tokens}
    />
  );
}

/* ===========================================================
   Envoltorio de conveniencia: una sección con su borde ya
   posicionado y su contenido en la capa de arriba.
   =========================================================== */
export function SeccionConBorde({
  color,
  sobre,
  borde = "arriba",
  alto,
  children,
  className,
  ...resto
}: {
  color: string;
  /* Obligatorio a propósito. El plan dice que el par
     texto-sobre-acento no es opcional: acá se hace cumplir en el
     tipo, así olvidarlo no compila en vez de dar bajo contraste. */
  sobre: string;
  borde?: Borde;
  alto?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  return (
    <section
      {...resto}
      className={["seccion-con-borde", className].filter(Boolean).join(" ")}
      style={{ "--seccion-color": color, "--seccion-sobre": sobre } as CSSProperties}
    >
      {/* `alto` se pasa sólo si existe: con
          `exactOptionalPropertyTypes`, mandar `undefined` a una
          prop opcional no es lo mismo que omitirla. */}
      <SectionEdge color={color} borde={borde} {...(alto ? { alto } : {})} />
      <div className="seccion-con-borde__contenido">{children}</div>
    </section>
  );
}
