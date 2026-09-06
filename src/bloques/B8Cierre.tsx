/* ===========================================================
   B8 · CIERRE — DENTRO DE LA NUBE AZUL

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

   EL CTA NO NAVEGA, Y POR ESO NO TIENE GLOW
   El plan pide glow en hover. Presupone que el botón lleva a la
   agenda, y el destino sigue sin definir: es el pendiente 3 del
   `00_LEEME` y la decisión 5 del documento de copy. Va el mismo
   marcador que el hero —botón deshabilitado y el pendiente
   escrito al lado— porque un enlace a ninguna parte es peor que
   un botón que dice que todavía no está. Un glow sobre un
   control que no responde promete lo mismo que ese enlace.

   Cuando se decida el destino se cambian las dos cosas juntas,
   acá y en `B1Hero.tsx`.

   EL TEXTO SOBRE EL AZUL VA A OPACIDAD PLENA
   Nada de `etiqueta--apagada` acá adentro: `--texto-2` es un gris
   calculado contra el fondo crema de la página, y sobre el azul
   pleno pierde contraste sin avisar. El par del campo es
   `--acento-1` con `--texto-sobre-1`, y ese es el que se usa.
   Misma lección que el eyebrow del hero.
   =========================================================== */

import { SeccionConBorde } from "../componentes/SectionEdge";
import { Reveal } from "../componentes/Reveal";
import { Flecha } from "../componentes/Flecha";

export function B8Cierre() {
  return (
    <SeccionConBorde
      color="var(--acento-1)"
      sobre="var(--texto-sobre-1)"
      borde="arriba"
      className="b8"
      aria-labelledby="b8-titulo"
    >
      <div className="b8__contenido contenido">
        <Reveal indice={0}>
          <p className="etiqueta b8__eyebrow">Empecemos</p>
        </Reveal>

        {/* La mancha blanca: mismo lenguaje de nube, variante
            "mancha". Lleva su propio par de color, porque adentro
            el fondo deja de ser azul y el texto no puede seguir
            siendo blanco. */}
        <Reveal indice={1} className="b8__mancha">
          <h2 id="b8-titulo" className="b8__titular">
            Hagamos crecer tu negocio.
          </h2>
        </Reveal>

        <Reveal indice={2} className="b8__cierre">
          <p className="b8__bajada">
            Una llamada de 45 minutos, sin costo. Salís con un diagnóstico y una proyección, actives
            o no con nosotros.
          </p>

          <div className="b8__cta">
            <button type="button" className="boton boton--marca" disabled>
              Reservá tu análisis
              <Flecha />
            </button>
            <p className="etiqueta b8__pendiente">Pendiente · destino de la agenda sin definir</p>
          </div>
        </Reveal>
      </div>
    </SeccionConBorde>
  );
}
