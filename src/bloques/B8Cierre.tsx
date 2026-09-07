/* ===========================================================
   B8 · CIERRE — DENTRO DE LA NUBE AZUL

   Lo usan la home y Método. El copy entra por props con los
   valores de la home por defecto, así el llamado de la home no
   cambia y Método pasa el suyo. `eyebrow` y `bajada` se apagan
   con cadena vacía: la spec de MET-4 pide sólo titular y CTA.

   La nube azul sube por encima de B7 y el cierre completo vive
   adentro del campo: eyebrow, titular dentro de la mancha
   blanca, bajada y CTA. El plan lo decidió así para que el CTA
   no compita con los logos sobre el mismo fondo blanco ni deje
   una franja azul grande sin contenido.

   SIN FOTO. Con la nube entrando, apilar una fotografía a sangre
   serían dos tratamientos peleando. Las fotos rinden en B2 y B3.

   TIENE QUE SER MÁS ALTO QUE EL VIEWPORT
   Es la mitad de arriba del par que cose `HeroSticky`: B7 queda
   fijado sólo mientras este bloque tenga recorrido. La misma
   razón por la que B2 mide 108vh.

   EL CTA NAVEGA, Y CON ESO VUELVE EL GLOW
   El destino era el pendiente 3 del `00_LEEME` y la decisión 5 del
   documento de copy: quedó en `/contacto`. El botón deshabilitado
   y el aviso de pendiente que había al lado se fueron, y con ellos
   el 55% de opacidad que arrastraba el estado deshabilitado.

   El glow en hover que el plan pedía estaba afuera justamente
   porque el botón no llevaba a ningún lado — un glow sobre un
   control que no responde promete algo que no pasa. Ahora
   responde, así que vuelve. Vive en `.boton--relleno` y lo
   heredan los tres CTA.

   ⚠ `/contacto` es hoy la PaginaProvisional del andamio. El CTA
   lleva a una página vacía hasta que se construya F4.

   EL TEXTO SOBRE EL AZUL VA A OPACIDAD PLENA
   Nada de `etiqueta--apagada` acá adentro: `--texto-2` es un gris
   calculado contra el fondo crema de la página, y sobre el azul
   pleno pierde contraste sin avisar. El par del campo es
   `--acento-1` con `--texto-sobre-1`, y ese es el que se usa.
   Misma lección que el eyebrow del hero.
   =========================================================== */

import type { CSSProperties } from "react";

import { SeccionConBorde } from "../componentes/SectionEdge";
import { EnlaceConCortina } from "../componentes/RouteCurtain";
import { Reveal } from "../componentes/Reveal";
import { Flecha } from "../componentes/Flecha";

export function B8Cierre({
  titulo = "Hagamos crecer tu negocio.",
  eyebrow = "Empecemos",
  bajada = "Una llamada de 45 minutos, sin costo. Salís con un diagnóstico y una proyección, actives o no con nosotros.",
  centrado = false,
}: {
  /** El titular dentro de la mancha. */
  titulo?: string;
  /** Se puede omitir pasando cadena vacía. */
  eyebrow?: string;
  /** Ídem. Método lo omite: su spec sólo pide titular y CTA. */
  bajada?: string;
  /** Centra el bloque completo en la altura azul de cierres independientes. */
  centrado?: boolean;
} = {}) {
  return (
    <SeccionConBorde
      color="var(--acento-1)"
      sobre="var(--texto-sobre-1)"
      borde="arriba"
      className={["b8", centrado && "b8--centrado"].filter(Boolean).join(" ")}
      aria-labelledby="b8-titulo"
    >
      <div className="b8__contenido contenido">
        {eyebrow ? (
          <Reveal indice={0}>
            <p className="etiqueta b8__eyebrow">{eyebrow}</p>
          </Reveal>
        ) : null}

        {/* La mancha blanca: mismo lenguaje de nube, variante
            "mancha". Lleva su propio par de color, porque adentro
            el fondo deja de ser azul y el texto no puede seguir
            siendo blanco. */}
        <Reveal indice={1} className="b8__mancha">
          <h2 id="b8-titulo" className="b8__titular">
            {titulo}
          </h2>
        </Reveal>

        <Reveal indice={2} className="b8__cierre">
          {bajada ? <p className="b8__bajada">{bajada}</p> : null}

          <div className="b8__cta">
            {/* ⚠ BERMELLÓN SOBRE EL AZUL FALLA LA MÉTRICA, Y VA
                IGUAL — CON UN BORDE QUE LA ARREGLA.

                Contra el campo `--acento-1`, un objeto gráfico
                necesita 3.0 (WCAG 1.4.11). El bermellón da 1.25:
                es el mismo número por el que en su momento se
                descartaron violeta (1.10), rosa (1.23), verde
                (2.07) y amarillo (2.84) y se terminó en crema
                (4.45). El problema no es la saturación sino la
                luminancia — todos pesan casi lo mismo que el azul.

                Naranja y azul son complementarios, así que EN LA
                PRÁCTICA el botón se ve: la métrica mide luminancia
                y no tono, y ahí es donde se queda corta. Pero
                «se ve» no es un criterio verificable y 1.4.11 no
                se cumple sola.

                Por eso el borde en `--sobre`, que acá es tinta:
                4.08 contra el azul, y con eso el LÍMITE del botón
                pasa el mínimo aunque el relleno no lo pase. Es la
                salida que la propia norma admite — el contorno es
                lo que define el objeto.

                El texto sí pasa por su cuenta: tinta sobre
                bermellón da 5.09, sobre el 4.5 de 1.4.3. */}
            <EnlaceConCortina
              to="/contacto"
              className="boton boton--relleno boton--perfilado"
              style={
                {
                  "--acento": "var(--acento-2)",
                  "--sobre": "var(--texto-sobre-2)",
                } as CSSProperties
              }
            >
              Reservá tu análisis
              <Flecha />
            </EnlaceConCortina>
          </div>
        </Reveal>
      </div>
    </SeccionConBorde>
  );
}
