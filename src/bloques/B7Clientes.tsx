/* ===========================================================
   B7 · MARCAS

   Titular display corto a la IZQUIERDA y la banda de anillos a
   la derecha, EN LA MISMA LÍNEA, también en móvil. Sin párrafo
   debajo: el bloque es el título y la banda, nada más.

   La banda entra desde la derecha y avanza hacia la izquierda:
   es la dirección propia del Ticker, no hay nada que configurar.

   La banda sangra hasta el borde derecho de la ventana a
   propósito — la máscara del Ticker desvanece ese borde, así que
   cortarla contra la columna de contenido desperdiciaría el
   efecto y haría la banda más corta de lo necesario.

   El bloque queda fijado mientras B8 sube por encima: eso lo
   resuelve `HeroSticky`, que envuelve a los dos. Ver su nota.

   EL ANILLO ES BORDE, NO RELLENO
   El plan es explícito: círculo con `border` de color, no un
   disco pintado. Con relleno, un logo oscuro adentro dejaría de
   leerse contra la mitad de la paleta.

   DOCE ANILLOS, CINCO ACENTOS
   Los colores se repiten en ciclo, como dice el plan. Doce sobre
   cinco deja el ciclo cortado al final —el doce cae en acento-2,
   no en acento-5— y así queda: forzar que cierre justo pediría
   diez o quince clientes, y la cantidad la manda el cliente real,
   no la paleta.

   NADA DE ESTO ES CONTENIDO REAL
   No hay un solo logo de cliente en `public/assets`, y de los
   doce nombres sólo se conocen dos, que están en B3. Encima el
   uso autorizado por cliente sigue sin confirmar.

   El párrafo que lo decía se sacó: el marcador ya se lee en los
   anillos, que dicen "Logo" y "Cliente pendiente" doce veces. El
   aviso duplicaba algo que el bloque muestra solo.

   Se construye igual con los doce, y no con tres o cuatro, para
   que el loop y la máscara del Ticker queden probados con el
   ancho de pista real.
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

/* ⚠ EL CICLO PERDIÓ EL VERDE Y EL AMARILLO, Y NO ES ESTÉTICA.
   Los doce logos son blancos, así que el mínimo aplicable es el de
   objeto gráfico —3:1, no 4.5— y ahí sólo pasan tres acentos:

     azul 4.56 · violeta 5.00 · bermellón 3.65 · verde 2.20 · amarillo 1.61

   Es la misma corrección que hubo que hacer en las píldoras de B5,
   con el otro umbral. Y de paso arregla algo que el plan tenía
   anotado como defecto asumido: doce anillos sobre cinco acentos
   dejaban el ciclo cortado en la costura del loop; sobre tres
   divide exacto. */
const ACENTOS = ["var(--acento-1)", "var(--acento-2)", "var(--acento-4)"];

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
