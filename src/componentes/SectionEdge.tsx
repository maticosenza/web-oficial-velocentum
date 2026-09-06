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

   ⚠ CONTRATO DE USO
   Un borde `arriba` se dibuja POR FUERA de su sección, encima
   del bloque anterior. Es lo que queremos, pero tapa píxeles
   reales: el bloque de arriba tiene que reservar el espacio con
   la clase `.deja-lugar-al-borde`, o la onda le come el texto.
   El alto por defecto (88px) es mayor que `--space-7` (64px),
   así que el padding de sección NO alcanza por sí solo.
   =========================================================== */

import type { CSSProperties } from "react";

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
  const estilo = {
    "--edge-color": color,
    ...(alto ? { "--edge-alto": alto } : {}),
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={["borde-onda", className].filter(Boolean).join(" ")}
      data-borde={borde}
      style={estilo}
    />
  );
}

/* ===========================================================
   Envoltorio de conveniencia: una sección con su borde ya
   posicionado. El borde se dibuja FUERA de la caja (hacia
   arriba o hacia abajo), así que la sección necesita
   `position: relative` y el contenido tiene que quedar por
   encima. Esto evita repetir esas tres reglas en cada bloque.
   =========================================================== */
export function SeccionConBorde({
  color,
  borde = "arriba",
  alto,
  children,
  style,
  ...resto
}: {
  color: string;
  borde?: Borde;
  alto?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section {...resto} style={{ position: "relative", background: color, ...style }}>
      {/* `alto` se pasa sólo si existe: con
          `exactOptionalPropertyTypes`, mandar `undefined` a una
          prop opcional no es lo mismo que omitirla. */}
      <SectionEdge color={color} borde={borde} {...(alto ? { alto } : {})} />
      {/* El contenido va en su propia capa: la máscara nunca lo toca. */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </section>
  );
}
