/* ===========================================================
   CON-3 · CONTACTO DIRECTO

   El panel de color después del flujo, con el borde de onda del
   sistema. Es la salida para quien no quiere completar cuatro
   pasos: escribe y listo.

   EL MAIL ES EL MISMO DE B9, y sale del mismo lugar: si algún día
   cambia, cambia una vez. Dos constantes con la misma dirección es
   una de las dos desactualizada esperando su turno.

   ⚠ EL TELÉFONO VA COMO MARCADOR VISIBLE, NO OMITIDO.
   El sitio actual muestra un +54 9 11 3581-0100 y nadie confirmó
   todavía si se usa también acá. Omitir la fila en silencio deja
   la página pareciendo terminada con un dato menos; el marcador
   deja dicho que falta una decisión. Es el mismo criterio que el
   resto del sitio usó con la agenda mientras no tuvo destino.
   =========================================================== */

import { SeccionConBorde } from "../componentes/SectionEdge";
import { Reveal } from "../componentes/Reveal";
import { MAIL } from "../data/contacto";

export function CON3Directo() {
  return (
    <SeccionConBorde
      color="var(--acento-4)"
      sobre="var(--texto-sobre-4)"
      borde="arriba"
      className="con3"
      aria-labelledby="con3-titulo"
    >
      <div className="con3__contenido contenido">
        <Reveal as="h2" indice={0} id="con3-titulo" className="con3__titular">
          ¿Preferís escribir antes?
        </Reveal>

        <Reveal indice={1} className="con3__datos">
          <p className="con3__dato">
            <span className="etiqueta con3__etiqueta">Email</span>
            <a className="con3__mail" href={`mailto:${MAIL}`}>
              {MAIL}
            </a>
          </p>

          <p className="con3__dato">
            <span className="etiqueta con3__etiqueta">Teléfono</span>
            <span className="etiqueta con3__marcador">Pendiente · a confirmar</span>
          </p>
        </Reveal>
      </div>
    </SeccionConBorde>
  );
}
