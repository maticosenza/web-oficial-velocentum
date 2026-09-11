/* ===========================================================
   MET-1 · HERO DE MÉTODO

   Foto a sangre de borde a borde, overlay de tinta y el titular
   blanco encima. Sin pin, sin nube.

   NO LLEVA BORDE DE ONDA, Y ES LO QUE LO DEFINE
   El hero de la home entra en la nube: éste es una foto plana de
   borde a borde. Ese contraste ES el argumento de la página. La
   nube vuelve en el cierre, MET-4.

   `100vh` EN LOS TRES BREAKPOINTS
   La home suelta el alto del hero bajo 810px porque ahí el pin se
   apaga y un hero fijado se comería el teléfono. Acá no hay pin,
   así que no hay nada que soltar: el alto se mantiene. Está
   verificado en la referencia — no hay una sola regla responsive
   para el contenedor de este hero.

   EL VELO BAJÓ A 45%, Y EL CONTRASTE SE RESUELVE APARTE
   Al 70% la foto quedaba apagada. Al 45% se ve, pero el titular
   blanco deja de cumplir: 3.04:1 sobre el peor píxel de su caja,
   medido sobre la imagen real. Subir el velo parejo hasta llegar a
   4.5:1 pedía 57.5%, que devuelve buena parte del apagado.

   Así que el velo general se queda en 45% y el contraste lo
   resuelve un scrim que va sólo detrás del titular. El detalle,
   con los números, está en `estilos/metodo.css`.
   =========================================================== */

import type { CSSProperties } from "react";

import { EnlaceConCortina } from "../componentes/RouteCurtain";
import { Flecha } from "../componentes/Flecha";
import { TextoBoton } from "../componentes/TextoBoton";

export function MET1Hero() {
  return (
    <section className="met1" aria-labelledby="met1-titulo">
      {/* DECORATIVA, Y POR ESO `alt=""`. El significado del bloque
          lo lleva el titular; la imagen aporta textura y
          profundidad. Un texto alternativo acá sería ruido para un
          lector de pantalla, que ya escucha el H1.

          Va como `<img>` y no como `background-image` a propósito:
          es lo primero que se ve de la página, y el escáner de
          precarga encuentra un `src` en el HTML enseguida — un
          fondo en CSS recién se descubre después de bajar y
          aplicar la hoja de estilos. `fetchPriority="high"` la
          adelanta todavía más.

          `width` y `height` son los del archivo: reservan la
          proporción y evitan que el hero salte al cargarla. El
          recorte real lo hace `object-fit: cover`. */}
      <div className="met1__foto">
        <img
          className="met1__foto-img"
          src="/assets/hero-metodo-desktop-v2.webp"
          alt=""
          width={1672}
          height={941}
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* La tinta. Capa aparte de la foto: se puede ajustar sin
          tocar la imagen. */}
      <div className="met1__velo" aria-hidden="true" />

      <div className="met1__contenido contenido">
        <h1 id="met1-titulo" className="met1__titular">
          Primero entender.
          <br />
          Después proponer.
        </h1>

        {/* Enlace a `/contacto`, igual que el de la home: es
            navegación interna y va con cortina.

            ⚠ BERMELLÓN, NO AZUL. El azul es el acento de Inicio, y
            un CTA azul en el hero de Método rompía la leyenda de
            color que el nav declara. Va `--acento-2` con su par,
            tinta, que da 5.09 sobre el bermellón.

            El campo de atrás no es un token sino la imagen 3D del
            hero, así que no hay un número único que medir para el
            límite del botón: es azul oscuro donde cae el CTA y
            cambia de tono a los costados. El bermellón se despega
            de ese azul por tono y por luminancia, y es el mismo
            criterio que el resto del sitio — donde el campo SÍ es
            un token plano y falla la métrica, como el cierre azul,
            va el borde de `.boton--perfilado`. Acá no hace falta. */}
        <div className="met1__cta">
          <EnlaceConCortina
            to="/contacto"
            className="boton boton--relleno"
            style={
              { "--acento": "var(--acento-2)", "--sobre": "var(--texto-sobre-2)" } as CSSProperties
            }
          >
            <TextoBoton texto="Reservá tu análisis" />
            <Flecha />
          </EnlaceConCortina>
        </div>
      </div>
    </section>
  );
}
