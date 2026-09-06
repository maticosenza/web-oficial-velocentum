/* ===========================================================
   EL NAV SE ESCONDE AL BAJAR Y VUELVE AL SUBIR.

   Escribe `data-oculto` en el nav y el CSS hace el resto. No
   toca estilos: el componente decide el estado, la hoja decide
   cómo se ve.

   POR QUÉ ESCUCHA `scroll` POR SU CUENTA
   `lib/progresoDeScroll.ts` tiene su propio bucle, pero resuelve
   otra cosa: un valor continuo de 0 a 1 por elemento, atado a la
   posición de ese elemento. Acá no hay elemento que medir ni
   valor continuo — hay una dirección y un umbral. Meterlo ahí
   sería agrandar ese primitivo para un caso que no comparte
   nada. Los dos usan un solo listener pasivo y un rAF.

   TRES REGLAS QUE NO SON OBVIAS

   1. **Cerca del tope nunca se esconde.** Bajando desde arriba
      de todo, esconderlo antes de que llegue a taparse es un
      parpadeo sin motivo.

   2. **El foco lo trae de vuelta, y lo retiene.** Si alguien
      tabula a un link con el nav escondido, el navegador enfoca
      un control invisible: se ve el anillo de foco flotando en
      la nada, o directamente no se ve nada. Por eso `focusin` lo
      muestra, y mientras el foco siga adentro no se esconde
      aunque se scrollee.

   3. **Con movimiento reducido no se esconde nunca.** Un nav que
      aparece y desaparece es movimiento, y sin transición el
      salto es peor que la transición. Se queda quieto y visible.
      El costo es que vuelve a pisar el titular del hero, que es
      una superposición estática y no un defecto.

   El umbral de 4px evita que el temblor de un trackpad o el
   rebote del final de la página lo hagan aparecer y desaparecer.
   =========================================================== */

import { useEffect, type RefObject } from "react";

import { prefiereMenosMovimiento } from "./tokens";

/** Movimiento mínimo, en px, para considerar que hubo scroll. */
const UMBRAL = 4;

export function useNavAlScrollear(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    /* Con movimiento reducido el nav se queda quieto y visible.
       No se anota nada y no se escucha nada. */
    if (prefiereMenosMovimiento()) {
      nodo.dataset["oculto"] = "no";
      return;
    }

    let ultimo = window.scrollY;
    let programado = false;
    let focoAdentro = false;

    const aplicar = () => {
      programado = false;
      const y = window.scrollY;
      const alto = nodo.getBoundingClientRect().height;

      if (focoAdentro || y <= alto) {
        nodo.dataset["oculto"] = "no";
      } else if (Math.abs(y - ultimo) > UMBRAL) {
        nodo.dataset["oculto"] = y > ultimo ? "sí" : "no";
      }

      ultimo = y;
    };

    const programar = () => {
      if (programado) return;
      programado = true;
      requestAnimationFrame(aplicar);
    };

    const alEnfocar = () => {
      focoAdentro = true;
      nodo.dataset["oculto"] = "no";
    };
    const alDesenfocar = () => {
      focoAdentro = false;
    };

    window.addEventListener("scroll", programar, { passive: true });
    nodo.addEventListener("focusin", alEnfocar);
    nodo.addEventListener("focusout", alDesenfocar);
    aplicar();

    return () => {
      window.removeEventListener("scroll", programar);
      nodo.removeEventListener("focusin", alEnfocar);
      nodo.removeEventListener("focusout", alDesenfocar);
    };
  }, [ref]);
}
