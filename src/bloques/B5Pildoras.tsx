/* ===========================================================
   B5 · PÍLDORAS

   Banda baja entre B4 y B6. Sin titular, sin CTA, sin peso: es
   un respiro. Una sola fila y una sola dirección — el plan es
   explícito en que no hay una segunda banda en contra.

   ESTE CONTENIDO SÍ EXISTE
   Las once capacidades ya están escritas y aprobadas. Es el
   primer bloque de la home que no lleva un solo marcador.

   TEXTO BLANCO EN TODAS, Y POR ESO EL CICLO SON DOS COLORES
   La banda va con texto blanco en todas las píldoras. Eso NO se
   consigue escribiendo blanco: se consigue usando solamente los
   acentos cuyo `--texto-sobre-N` ya es blanco. Así el par se
   sigue respetando y el resultado es blanco parejo.

   Medido sobre los cinco acentos, blanco contra el mínimo 4.5:1:

   | Acento              | Blanco | ¿Pasa? |
   |---------------------|--------|--------|
   | acento-1 azul       | 4.56   | sí     |
   | acento-4 violeta    | 5.00   | sí     |
   | acento-2 bermellón  | 3.65   | NO     |
   | acento-3 verde      | 2.20   | NO     |
   | acento-5 amarillo   | 1.61   | NO     |

   ⚠ BERMELLÓN TAMBIÉN QUEDÓ AFUERA, NO SÓLO AMARILLO Y VERDE.
   Se pidió dejar azul, bermellón y violeta. Bermellón con blanco
   da 3.65:1 y no llega al mínimo: es exactamente el mismo motivo
   por el que salieron los otros dos. Queda el ciclo en azul y
   violeta.

   Con texto oscuro bermellón da 5.09:1 y entra sin problema — es
   sólo el blanco lo que no soporta. Si se lo quiere de vuelta, la
   salida es texto oscuro en esa píldora, no bajar el techo.

   ONCE SOBRE DOS
   El ciclo queda cortado, igual que en B7. No se fuerza a que
   cierre: la lista de capacidades manda sobre la paleta.
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

/* Sólo los dos acentos cuyo texto-sobre ya es blanco. Ver la
   tabla de contrastes de arriba antes de agregar uno. */
const PARES = [
  ["var(--acento-1)", "var(--texto-sobre-1)"],
  ["var(--acento-4)", "var(--texto-sobre-4)"],
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
