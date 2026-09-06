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

import type { CSSProperties } from "react";

import { SeccionConBorde } from "../componentes/SectionEdge";
import { Reveal } from "../componentes/Reveal";
import { Flecha } from "../componentes/Flecha";

export function B8Cierre({
  titulo = "Hagamos crecer tu negocio.",
  eyebrow = "Empecemos",
  bajada = "Una llamada de 45 minutos, sin costo. Salís con un diagnóstico y una proyección, actives o no con nosotros.",
}: {
  /** El titular dentro de la mancha. */
  titulo?: string;
  /** Se puede omitir pasando cadena vacía. */
  eyebrow?: string;
  /** Ídem. Método lo omite: su spec sólo pide titular y CTA. */
  bajada?: string;
} = {}) {
  return (
    <SeccionConBorde
      color="var(--acento-1)"
      sobre="var(--texto-sobre-1)"
      borde="arriba"
      className="b8"
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
            {/* CREMA, NO ROSA NI VIOLETA, Y ESTÁ MEDIDO.
                Contra el campo azul `--acento-1`, el botón necesita
                3.0 de contraste para leerse como un objeto aparte.
                Ningún acento llega: violeta da 1.10, el rosa de
                marca 1.23, bermellón 1.25, verde 2.07 y amarillo
                2.84. El problema no es la saturación sino la
                luminancia — todos pesan casi lo mismo que el azul.
                Crema da 4.45 y su texto en tinta 18.14, que es lo
                más lejos que se puede llegar con la paleta. */}
            <button
              type="button"
              className="boton boton--relleno"
              style={{ "--acento": "var(--fondo)", "--sobre": "var(--tinta)" } as CSSProperties}
              disabled
            >
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
