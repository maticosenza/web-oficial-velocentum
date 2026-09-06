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

/* PENDIENTE: 17 caracteres, contra un techo de 18 para el nombre
   bajo el logo. Queda al filo a propósito, así el nombre real
   entra después sin mover el anillo. */
const CLIENTE_PENDIENTE = "Cliente pendiente";

const ACENTOS = [
  "var(--acento-1)",
  "var(--acento-2)",
  "var(--acento-3)",
  "var(--acento-4)",
  "var(--acento-5)",
];

/* Doce ranuras. El índice es la ranura, no el cliente: cuando
   lleguen los logos reales se reemplaza esta lista. */
const RANURAS = Array.from({ length: 12 }, (_, i) => i);

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
          {RANURAS.map((i) => (
            <div key={i} className="b7-cliente">
              {/* El anillo es decorativo mientras no haya logo: lo
                que nombra a la ranura es el texto de abajo. Sin
                esto el lector leería doce veces la misma
                descripción de un marco vacío. */}
              <div
                className="b7-cliente__anillo"
                aria-hidden="true"
                style={{ "--anillo": ACENTOS[i % ACENTOS.length] } as CSSProperties}
              >
                <span className="etiqueta b7-cliente__nota">Logo</span>
              </div>
              <p className="etiqueta b7-cliente__nombre">{CLIENTE_PENDIENTE}</p>
            </div>
          ))}
        </Ticker>
      </div>
    </section>
  );
}
