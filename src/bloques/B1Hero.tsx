/* ===========================================================
   B1 · HERO

   Campo --cielo, titular condensado de tres líneas con la tercera
   en bermellón y CTA. La composición se apoya en tipografía,
   atmósfera y movimiento, sin objetos decorativos.

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

   =========================================================== */

import { useRef, type CSSProperties } from "react";

import { EnlaceConCortina } from "../componentes/RouteCurtain";
import { TitularPorLetras } from "../componentes/TitularPorLetras";
import { Flecha } from "../componentes/Flecha";
import { TextoBoton } from "../componentes/TextoBoton";
import { useParallaxDelHero } from "../lib/parallaxDelHero";

export function B1Hero() {
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
      <div className="b1__nube b1__nube--izq" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="b1__nube b1__nube--der" aria-hidden="true">
        <span />
        <span />
      </div>

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
          <TitularPorLetras
            lineas={[
              { texto: "ESTAMOS EN EL" },
              { texto: "NEGOCIO DE HACER" },
              { texto: "CRECER NEGOCIOS", marca: true },
            ]}
          />
        </div>

        {/* EL CTA NAVEGA, Y POR ESO ES UN ENLACE.
            Va a `/contacto`, que es navegación interna: no es una
            acción, es ir a otro lado. Con `EnlaceConCortina`, igual
            que el nav y que los rectángulos del footer — el
            `<button>` de antes existía sólo porque el destino no
            estaba decidido, y con él se van el `aria-disabled`, la
            descripción que explicaba el pendiente y el 55% de
            opacidad que arrastraba el estado deshabilitado.

            Azul `--acento-1` con su par de texto: blanco, 4.56
            sobre el azul. El botón contra el fondo crema de la
            página da 4.45, holgado sobre el 3.0 que pide un objeto
            gráfico. */}
        <div className="b1__cta">
          <EnlaceConCortina
            to="/contacto"
            className="boton boton--relleno"
            style={
              { "--acento": "var(--acento-1)", "--sobre": "var(--texto-sobre-1)" } as CSSProperties
            }
          >
            <TextoBoton texto="Reservá tu análisis" />
            <Flecha />
          </EnlaceConCortina>
        </div>
      </div>
    </div>
  );
}
