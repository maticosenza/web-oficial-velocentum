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

   EL FONDO ES UNA TEXTURA QUE FLOTA SOLA
   Queda derogado lo que decía antes este comentario —que en
   reposo no se mueve, y que la nube da una vuelta completa en
   loop—. Ninguna de las dos cosas describe la referencia.

   Lo que hay es una única mancha extensa y difuminada, en PNG con
   alfa real, apoyada sobre el campo azul. Se mueve de tres
   maneras que se suman, cada una en su propio envoltorio:

   A · flota sola, sin cursor y sin scroll, mientras el hero se
       vea. Cuatro osciladores de períodos distintos, así el
       recorrido no se lee como un loop corto.
   B · sigue al cursor con inercia, y vuelve sola al centro
       cuando el puntero se va.
   C · asciende hasta -400px con el progreso de `--cobertura`, y
       vuelve al subir. Eso vive en CSS, no en el hook.

   Los degradados de colores que simulaban esta misma mancha se
   fueron: superponerlos a la textura real lavaba los dos. Del
   fondo anterior queda sólo el campo azul.

   SE MUEVE EL FONDO Y NADA MÁS
   Ni el cursor ni la flotación tocan el texto. Lo que el texto sí
   conserva es su propio hundimiento por `--cobertura`, que es otra
   cosa y sigue igual.

   LOS OBJETOS NO REEMPLAZAN LETRAS
   Van a los costados del renglón 2, no dentro de la palabra.
   Máximo dos en el hero, y no más de 6° de rotación.
   =========================================================== */

import { useId, useRef, type CSSProperties } from "react";

import { TitularPorLetras } from "../componentes/TitularPorLetras";
import { Flecha } from "../componentes/Flecha";
import { useParallaxDelHero } from "../lib/parallaxDelHero";

export function B1Hero() {
  const idPendiente = useId();

  /* El hook escribe `--mancha-x/-y/-rot/-escala` acá, y el CSS
     los aplica a la capa que flota. El ascenso por scroll no pasa
     por el hook: sale de `--cobertura` directamente en CSS. Ver la
     nota larga de `parallaxDelHero.ts`. */
  const heroRef = useRef<HTMLDivElement>(null);
  useParallaxDelHero(heroRef);

  return (
    <div className="b1" ref={heroRef}>
      {/* Dos capas decorativas, y ninguna toca el texto.
          Se mueven a distinta velocidad: eso es lo que se lee como
          profundidad. El degradado poco, las nubes bastante más. */}
      {/* El campo azul base. Nada más: los degradados de colores
          que simulaban la mancha se fueron, porque superponerlos a
          la textura real lavaba los dos. */}
      <div className="b1__atmosfera" aria-hidden="true" />

      {/* LA MANCHA, EN TRES ENVOLTORIOS.
          Uno por movimiento, y no por prolijidad: si compartieran
          elemento, el `transform` del CSS y el del JS se pisarían y
          el último en escribir borraría al otro.

          · `__mancha`         encuadre fijo. No se mueve nunca.
          · `__mancha-scroll`  asciende con `--cobertura`, en CSS.
          · `__mancha-flotar`  flotación y cursor, desde el hook.

          Decorativa entera: `aria-hidden`, `alt` vacío y sin
          eventos de puntero. */}
      <div className="b1__mancha" aria-hidden="true">
        <div className="b1__mancha-scroll">
          <div className="b1__mancha-flotar">
            {/* PENDIENTE DE REEMPLAZO: es el PNG original de
                Lofty, no un asset de Velocentum. Está acá para
                probar el encuadre y el movimiento. Cuando exista
                la textura propia, se cambia esta ruta y no hace
                falta tocar nada más. */}
            <img
              className="b1__mancha-img"
              src="/assets/hero-mancha-referencia.png"
              alt=""
              width={2396}
              height={1013}
              decoding="async"
            />
          </div>
        </div>
      </div>

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
          {/* Azul `--acento-1` con su par de texto. El relieve en
              hover lo da la regla general de `.boton`, que excluye
              los deshabilitados: mientras el destino de la agenda
              no exista, este botón no se levanta. Cuando se
              defina y se saque el `aria-disabled`, lo hereda solo,
              sin tocar nada. */}
          <button
            type="button"
            className="boton boton--relleno"
            style={
              { "--acento": "var(--acento-1)", "--sobre": "var(--texto-sobre-1)" } as CSSProperties
            }
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
