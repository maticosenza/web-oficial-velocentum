/* ===========================================================
   B5 · PÍLDORAS

   Banda baja entre B4 y B6. Sin titular, sin CTA, sin peso: es
   un respiro. Una sola fila y una sola dirección — el plan es
   explícito en que no hay una segunda banda en contra.

   ESTE CONTENIDO SÍ EXISTE
   Las once capacidades ya están escritas y aprobadas. Es el
   primer bloque de la home que no lleva un solo marcador.

   FONDO PASTEL Y TEXTO EN TINTA, Y POR ESO ENTRAN LOS CINCO
   La banda ya no va con texto blanco sobre el acento pleno. Va con
   el acento rebajado al 40% sobre `--fondo` y el texto en tinta,
   que es la lógica de la referencia.

   El cambio no es estético: es lo que devuelve los cinco acentos
   al ciclo. Con el acento pleno la tinta no llega en dos —azul
   4.08 y violeta 3.72 contra el mínimo de 4.5—, y por esa misma
   restricción el ciclo se había quedado en dos colores. Rebajados,
   los cinco pasan con muchísimo aire: de 9.97 el peor a 14.93 el
   mejor. La mezcla y la tabla están en `componentes.css`.

   ⚠ EL PAR `--texto-sobre-N` NO APLICA ACÁ, y no es un descuido.
   Ese par existe para el acento PLENO: dice qué color de texto
   sobrevive encima de él. El fondo de la píldora ya no es el
   acento, así que su par tampoco es el que corresponde — el que
   corresponde es la tinta, y por eso va escrito.

   ⚠ Y ESTO NO ALCANZA A LOS ANILLOS DE B7. Acá encima va TEXTO
   OSCURO y el pastel es lo que le da contraste; allá encima va un
   LOGO y su regla la decide el color del archivo. Dos superficies
   con dos problemas distintos: no unificarlas.

   ONCE SOBRE CINCO
   El ciclo queda cortado en la costura del loop. Acá no importa
   como en B7: las píldoras no son un set cerrado que el ojo
   cuente, son una banda que pasa.

   NO VAN ALINEADAS NI QUIETAS
   Mientras la banda se desplaza al costado, cada píldora sube y
   baja en loop, como flotando: 14px de recorrido sobre 1,8s. El
   desfase de cada una sale de su índice: ver la nota de `Pildora`
   en `Ticker.tsx`, donde está el motivo por el que no puede ser
   aleatorio. Se apaga entera con movimiento reducido, junto con
   el desplazamiento lateral.
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

/* Los cinco acentos. El CSS los rebaja al 40%; acá va el acento
   pleno como dato y la tinta como color de texto. Ver la nota de
   arriba sobre por qué el texto no sale de `--texto-sobre-N`. */
const ACENTOS = [
  "var(--acento-1)",
  "var(--acento-2)",
  "var(--acento-3)",
  "var(--acento-4)",
  "var(--acento-5)",
];

export function B5Pildoras() {
  return (
    <section className="b5">
      {/* Sigue por debajo de la de B7 —son píldoras cortas y
          juntas— pero subió de 28 a 46: a 28 la banda se leía
          detenida más que tranquila. */}
      <Ticker etiqueta="Qué hacemos, en once capacidades" velocidad={46} className="b5__ticker">
        {CAPACIDADES.map((c, i) => (
          <Pildora key={c} acento={ACENTOS[i % ACENTOS.length]!} sobre="var(--tinta)" indice={i}>
            {c}
          </Pildora>
        ))}
      </Ticker>
    </section>
  );
}
