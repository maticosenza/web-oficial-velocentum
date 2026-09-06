/* ===========================================================
   B7 · MARCAS

   En desktop, el titular queda a la izquierda y la banda de doce
   logos a la derecha. En mobile se apilan para darle ancho real al
   ticker. La pista conserva su movimiento, máscara y duplicación.

   Los logos son negros y el color vive solamente en el contorno
   del anillo, siguiendo el tratamiento visual de la referencia.
   El bloque queda fijado mientras B8 sube por encima; eso lo
   resuelve `HeroSticky`.
   =========================================================== */

import type { CSSProperties } from "react";

import { Ticker } from "../componentes/Ticker";
import { Reveal } from "../componentes/Reveal";
import { LOGOS, MARCAS_DEL_MARQUEE } from "../data/casos";

/* El marquee arranca con los ocho casos en su orden, sigue con
   `Patagonia Vessels` —que es cliente pero no caso, así que acá
   está y en `/casos` no— y cierra con tres marcadores hasta que
   Matías defina los que faltan.

   Sale de `data/casos.ts`: la home y `/casos` tienen que leerse
   como un mismo conjunto y no como dos listas distintas, y la
   única forma de garantizarlo es que sean la misma lista. */

/* Con los logos negros sobre el fondo blanco, los cinco acentos
   vuelven a estar disponibles para el borde de los anillos. */
const ACENTOS = [
  "var(--acento-1)",
  "var(--acento-2)",
  "var(--acento-3)",
  "var(--acento-4)",
  "var(--acento-5)",
];

const RANURAS = MARCAS_DEL_MARQUEE;

export function B7Clientes() {
  return (
    <section className="b7" aria-labelledby="b7-titulo">
      <div className="b7__fila">
        <div className="b7__cabecera">
          <Reveal as="h2" indice={0} id="b7-titulo" className="b7__titular">
            Marcas
          </Reveal>
        </div>

        <Ticker etiqueta="Marcas que confían en Velocentum" className="b7__ticker">
          {RANURAS.map((marca, i) => (
            <div key={marca} className="b7-cliente">
              {/* El círculo y el logo son decorativos: el nombre va
                  debajo en texto, así que un `alt` acá haría que el
                  lector dijera dos veces lo mismo. */}
              <div
                className="b7-cliente__anillo"
                aria-hidden="true"
                style={
                  {
                    "--anillo": ACENTOS[i % ACENTOS.length],
                    "--logo-ancho": LOGOS[marca]?.ancho ?? 0.6,
                  } as CSSProperties
                }
              >
                <img
                  className="b7-cliente__logo"
                  src={LOGOS[marca]?.archivo}
                  alt=""
                  loading="lazy"
                />
              </div>
              <p className="etiqueta b7-cliente__nombre">{marca}</p>
            </div>
          ))}
        </Ticker>
      </div>
    </section>
  );
}
