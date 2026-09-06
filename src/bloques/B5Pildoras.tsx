/* ===========================================================
   B5 · PÍLDORAS

   Banda baja entre B4 y B6. Sin titular, sin CTA, sin peso: es
   un respiro. Una sola fila y una sola dirección — el plan es
   explícito en que no hay una segunda banda en contra.

   ESTE CONTENIDO SÍ EXISTE
   Las once capacidades ya están escritas y aprobadas. Es el
   primer bloque de la home que no lleva un solo marcador.

   TEXTO OSCURO NO, PAR DE COLOR SÍ
   El plan dice "cada píldora con su color de fondo, texto
   oscuro". Se cumple lo primero y no lo segundo, a propósito:
   con tinta sobre `--acento-1` o sobre `--acento-4` el contraste
   se cae, y el sistema define para cada acento su
   `--texto-sobre-N` justamente para que ese par no se decida a
   ojo. Dos de los cinco acentos piden texto blanco. Se usa el
   par que corresponde a cada uno.

   ONCE SOBRE CINCO
   El ciclo de color queda cortado, igual que en B7. No se fuerza
   a que cierre: la lista de capacidades manda sobre la paleta.
   =========================================================== */

import { Ticker, Pildora } from "../componentes/Ticker";

/* Las once capacidades, tal cual están en el plan. Ninguna pasa
   de 21 caracteres contra un techo de 20 —`Optimización de
   ficha` se pasa por uno— así que la banda queda probada al
   filo del presupuesto. */
const CAPACIDADES = [
  "Meta Ads",
  "Tracking con CAPI",
  "Google Ads",
  "Atribución real",
  "Product Ads",
  "Optimización de ficha",
  "Contenido para pauta",
  "GA4",
  "Influencer marketing",
  "Diseño de marca",
  "Web y conversión",
];

const PARES = [
  ["var(--acento-1)", "var(--texto-sobre-1)"],
  ["var(--acento-2)", "var(--texto-sobre-2)"],
  ["var(--acento-3)", "var(--texto-sobre-3)"],
  ["var(--acento-4)", "var(--texto-sobre-4)"],
  ["var(--acento-5)", "var(--texto-sobre-5)"],
] as const;

export function B5Pildoras() {
  return (
    <section className="b5">
      {/* Velocidad más baja que la de B7: son píldoras cortas y
          juntas, y a la misma velocidad la banda se lee nerviosa
          en vez de como un respiro. */}
      <Ticker etiqueta="Qué hacemos, en once capacidades" velocidad={28} className="b5__ticker">
        {CAPACIDADES.map((c, i) => {
          const par = PARES[i % PARES.length];
          return (
            <Pildora key={c} acento={par![0]} sobre={par![1]}>
              {c}
            </Pildora>
          );
        })}
      </Ticker>
    </section>
  );
}
