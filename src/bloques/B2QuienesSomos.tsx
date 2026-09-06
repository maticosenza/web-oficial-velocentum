/* ===========================================================
   B2 · QUIÉNES SOMOS

   Sube sobre el hero con la nube blanca. Es la mitad de arriba
   del par cosido por HeroSticky, así que tiene que ser MÁS ALTO
   QUE EL VIEWPORT: el hero queda pinneado sólo mientras este
   bloque tenga recorrido. Con menos, el hero se despega antes de
   terminar de taparse. Lo verifiqué fallando en F0.

   SIN IMAGEN, A PROPÓSITO
   Tenía un marco reservado para una foto de backstage. Se sacó
   entero: de acá para abajo la página ya es tarjetas, marcos y
   anillos, y este bloque rinde más siendo aire y texto. Es el
   párrafo que abre el contenido después del hero.

   Con eso desaparece también, para este bloque, el pendiente de
   la foto de backstage.
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
      /* La única onda de la página con línea de tinta. Ver
         `SectionEdge.tsx`: es la que separa el hero de la primera
         sección blanca, igual que en la referencia. */
      contorno
      className="b2"
      aria-labelledby="b2-titulo"
    >
      {/* Una sola columna de texto, ancha. La imagen se sacó: más
          abajo hay tarjetas y marcos por todos lados, y este
          bloque rinde más siendo aire y texto —el párrafo que abre
          el contenido después del hero—. */}
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
      </div>
    </SeccionConBorde>
  );
}
