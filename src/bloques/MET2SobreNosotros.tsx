/* ===========================================================
   MET-2 · SOBRE NOSOTROS

   Título display a la izquierda y el párrafo a la derecha, en la
   misma banda, con mucho aire arriba y abajo. En móvil se apilan.

   NO REPITE A B2 DE LA HOME, Y ESO ESTÁ REPARTIDO
   Los dos son párrafos de "quiénes somos", así que el plan fijó
   el reparto: la home habla del cliente y su problema, y acá se
   habla de nosotros — qué hacemos y cómo lo encaramos. Si alguno
   de los dos se reescribe, hay que mirar el otro.

   Es el único lugar de las cuatro páginas donde se dice quiénes
   somos, y por eso no se estira: un párrafo y sigue.
   =========================================================== */

import { Reveal } from "../componentes/Reveal";

export function MET2SobreNosotros() {
  return (
    <section className="met2" aria-labelledby="met2-titulo">
      <div className="met2__contenido contenido">
        <Reveal as="h2" indice={0} id="met2-titulo" className="met2__titular">
          Sobre nosotros
        </Reveal>

        {/* 190 caracteres contra un techo medido de 220. */}
        <Reveal indice={1} className="met2__texto">
          <p className="met2__parrafo">
            Somos un equipo de crecimiento. Analizamos el negocio, la estrategia de contenido, los
            medios pagos y la conversión, y trabajamos las cuatro cosas como una sola, no como
            servicios sueltos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
