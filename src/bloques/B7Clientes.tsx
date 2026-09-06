/* ===========================================================
   B7 · MARCAS

   En desktop, el titular queda a la izquierda y la banda de doce
   logos a la derecha. En mobile se apilan para darle ancho real al
   ticker. La pista conserva su movimiento, máscara y duplicación.

   Los logos son negros sobre un disco del acento rebajado al 40%,
   la misma regla que las píldoras de B5: disco pastel, contenido
   oscuro. Con el color en el campo y no en un contorno, el acento
   significa algo en vez de decorar.
   El bloque queda fijado mientras B8 sube por encima; eso lo
   resuelve `HeroSticky`.
   =========================================================== */

import type { CSSProperties } from "react";

import { Ticker } from "../componentes/Ticker";
import { Reveal } from "../componentes/Reveal";
import { LOGOS, MARCAS_DEL_MARQUEE } from "../data/casos";

/* El marquee arranca con los ocho casos en su orden y sigue con
   los cuatro clientes que tienen logo pero no caso: Patagonia
   Vessels, BuyNow, Lámina y Uprise. Las doce ranuras tienen nombre
   real — ya no queda ningún marcador.

   Sale de `data/casos.ts`: la home y `/casos` tienen que leerse
   como un mismo conjunto y no como dos listas distintas, y la
   única forma de garantizarlo es que sean la misma lista. */

/* Los cinco acentos. Con los logos negros sobre el disco pastel el
   contraste dejó de ser la restricción —de 10.89 a 16.32 sobre los
   cinco, contra el mínimo de 3 para objeto gráfico—, así que ya no
   hay que sacar verde ni amarillo como con los logos blancos. */
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
