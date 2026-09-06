/* ===========================================================
   B2 · QUIÉNES SOMOS

   Sube sobre el hero con la nube blanca. Es la mitad de arriba
   del par cosido por HeroSticky, así que tiene que ser MÁS ALTO
   QUE EL VIEWPORT: el hero queda pinneado sólo mientras este
   bloque tenga recorrido. Con menos, el hero se despega antes de
   terminar de taparse. Lo verifiqué fallando en F0.

   Un objeto como máximo, y la foto de backstage todavía no
   existe: va un marco con la proporción correcta y dicho.
   =========================================================== */

import { SeccionConBorde } from "../componentes/SectionEdge";
import { Reveal } from "../componentes/Reveal";
import { EnlaceConCortina } from "../componentes/RouteCurtain";
import { Flecha } from "../componentes/Flecha";

export function B2QuienesSomos() {
  return (
    <SeccionConBorde
      color="var(--fondo)"
      sobre="var(--tinta)"
      borde="arriba"
      className="b2"
      aria-labelledby="b2-titulo"
    >
      {/* Dos columnas de verdad: TODO el texto a la izquierda y la
          imagen a la derecha. Antes el titular cruzaba el ancho
          completo y la imagen arrancaba recién a la altura del
          párrafo, así que quedaba flotando contra el bloque.
          Ahora las dos columnas empiezan a la misma altura. */}
      <div className="b2__contenido contenido">
        <div className="b2__texto">
          <Reveal indice={0}>
            <p className="etiqueta etiqueta--apagada">Quiénes somos</p>
          </Reveal>

          <Reveal as="h2" indice={1} id="b2-titulo" className="b2__titular">
            Un equipo para tu negocio
          </Reveal>

          <Reveal indice={2}>
            <p className="b2__parrafo">
              Coordinamos estrategia, contenido, pauta y conversión para que cada decisión responda
              al mismo plan y puedas ver qué está funcionando.
            </p>
          </Reveal>

          <Reveal indice={3}>
            <p className="b2__accion">
              <EnlaceConCortina to="/metodo" className="boton boton--contorno">
                Cómo trabajamos
                <Flecha />
              </EnlaceConCortina>
            </p>
          </Reveal>
        </div>

        <Reveal indice={4} className="b2__medio">
          {/* PENDIENTE: la foto de backstage no existe. Marco con
              la proporción correcta, dicho en el nombre accesible
              para que no se confunda con una pieza real. */}
          <div
            className="b2__placeholder"
            role="img"
            aria-label="Marco reservado para una foto de backstage. La imagen real todavía no existe."
          >
            <img
              className="b2__objeto"
              src="/assets/conexion.png"
              alt=""
              aria-hidden="true"
              width={1254}
              height={1254}
              loading="lazy"
            />
            <p className="etiqueta b2__placeholder-nota">Foto pendiente · backstage</p>
          </div>
        </Reveal>
      </div>
    </SeccionConBorde>
  );
}
