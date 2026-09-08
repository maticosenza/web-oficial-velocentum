/* ===========================================================
   NUBE DE EQUIPO · FOTO QUE SE ABRE CON EL SCROLL

   El marco crece mientras la foto compensa la escala. Así se
   abre la silueta sin que el sujeto parezca acercarse. El valor
   es continuo: al subir, la nube vuelve a cerrarse.
   =========================================================== */

import { useRef } from "react";

import { useProgresoDeScroll } from "../lib/progresoDeScroll";

export function BNubeEquipo() {
  const ref = useRef<HTMLElement>(null);
  useProgresoDeScroll(ref, { recorrido: 1 });

  return (
    <section ref={ref} className="nube-equipo" aria-label="Producción visual de Velocentum">
      <div className="nube-equipo__escena contenido">
        <div className="nube-equipo__marco">
          <div className="nube-equipo__foto">
            <img
              src="/assets/velocentum-equipo.webp"
              alt="Producción visual de indumentaria para una marca"
              width={1600}
              height={2133}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
