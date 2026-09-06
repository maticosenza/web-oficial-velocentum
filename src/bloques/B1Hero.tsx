/* ===========================================================
   B1 · HERO

   Campo --cielo, titular condensado de tres líneas con la
   tercera en --marca, bajada, CTA y dos objetos a los costados
   de la línea 2.

   LA ATMÓSFERA NO ES UN BLUR
   Verificado en la referencia: no hay una sola declaración de
   `filter` ni `backdrop-filter` en todo el CSS. El degradado del
   fondo es una imagen ya renderizada. Ese asset no existe
   todavía, así que acá va con degradados —que el plan admite
   explícitamente como equivalente— y no con un blur.

   EL FONDO SÍ SE MUEVE
   El plan tenía anotado que en reposo la página está estática, y
   eso sigue siendo cierto: con el puntero quieto no pasa nada.
   Pero la corrección de `03_referencia` es que el fondo responde
   al cursor y al scroll — el degradado entero se desplaza y las
   nubes también, a otra velocidad.

   Son dos capas justamente por eso: si las dos se movieran igual
   no habría profundidad, habría una imagen corriéndose. El
   degradado se mueve poco y las nubes bastante más.

   Se mueve el FONDO y nada más. El titular, el CTA y los objetos
   del renglón quedan quietos: viven en `.b1__contenido`, que
   ninguna de estas reglas toca.

   LOS OBJETOS NO REEMPLAZAN LETRAS
   Van a los costados del renglón 2, no dentro de la palabra.
   Máximo dos en el hero, y no más de 6° de rotación.
   =========================================================== */

import { useId, useRef } from "react";

import { TitularPorLetras } from "../componentes/TitularPorLetras";
import { Flecha } from "../componentes/Flecha";
import { useParallaxDelHero } from "../lib/parallaxDelHero";

export function B1Hero() {
  const idPendiente = useId();

  /* El parallax escribe `--px`, `--py` y `--scroll` acá, y el CSS
     los reparte entre las dos capas de fondo. Ver la nota del
     hook: suavizado, sin bucle en reposo, y en táctil sólo
     scroll. */
  const heroRef = useRef<HTMLDivElement>(null);
  useParallaxDelHero(heroRef);

  return (
    <div className="b1" ref={heroRef}>
      {/* Dos capas decorativas, y ninguna toca el texto.
          Se mueven a distinta velocidad: eso es lo que se lee como
          profundidad. El degradado poco, las nubes bastante más. */}
      <div className="b1__atmosfera" aria-hidden="true" />
      <div className="b1__nubes" aria-hidden="true" />

      <div className="b1__contenido contenido">
        {/* Sin eyebrow. Estaba `EQUIPO DE CRECIMIENTO` y se sacó:
            el titular abre el hero solo y gana aire. */}
        <div className="b1__titular">
          {/* Los objetos flanquean el renglón 2. Son decorativos:
              el significado está en el texto, no en ellos. */}
          <img
            className="b1__objeto b1__objeto--izq"
            src="/assets/foco.png"
            alt=""
            aria-hidden="true"
            width={1254}
            height={1254}
            loading="eager"
          />
          <img
            className="b1__objeto b1__objeto--der"
            src="/assets/rayo.png"
            alt=""
            aria-hidden="true"
            width={1254}
            height={1254}
            loading="eager"
          />
          <TitularPorLetras
            lineas={[
              { texto: "ESTAMOS EN EL" },
              { texto: "NEGOCIO DE HACER" },
              { texto: "CRECER NEGOCIOS", marca: true },
            ]}
          />
        </div>

        {/* PENDIENTE: el destino de la agenda no está decidido, así
            que el CTA no navega.

            El aviso dejó de estar a la vista —competía con el
            titular— pero NO desapareció: va como descripción del
            botón, para lectores de pantalla.

            Por eso el botón lleva `aria-disabled` y no `disabled`.
            Un `disabled` de verdad sale del orden de tabulación y
            la mayoría de los lectores lo saltea, así que su
            descripción no se anunciaría nunca: el aviso quedaría
            escrito y nadie lo escucharía. Con `aria-disabled` el
            botón se anuncia como deshabilitado y explica por qué.
            No hace falta frenar nada: no tiene handler ni destino,
            así que activarlo no hace nada.

            El aviso sigue a la vista en el CTA de B8, que está
            sobre el campo azul y no compite con ningún titular. */}
        <div className="b1__cta">
          <button
            type="button"
            className="boton boton--marca"
            aria-disabled="true"
            aria-describedby={idPendiente}
          >
            Reservá tu análisis
            <Flecha />
          </button>
          <p id={idPendiente} className="solo-lectores">
            Pendiente: el destino de la agenda todavía no está definido, así que este botón no
            navega.
          </p>
        </div>
      </div>
    </div>
  );
}
