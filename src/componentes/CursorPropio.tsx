/* ===========================================================
   CursorPropio — el cursor custom del hero.

   Verificado en la referencia: `cursor: none` en el documento y
   un div fijo de 100×100, `pointer-events: none`, centrado en
   el puntero restando la mitad de su tamaño, con un SVG adentro.
   No es parallax: el "movimiento del mouse" de la referencia era
   esto, y es mucho más barato.

   EL RIESGO Y CÓMO SE EVITA
   `cursor: none` a secas es peligroso: si el JS falla, tarda o
   el elemento no llega a dibujarse, el usuario se queda SIN
   puntero visible y no puede usar el sitio.
   Por eso el orden es al revés de lo obvio: el documento no
   esconde el cursor hasta que este componente ya está montado
   Y recibió un primer movimiento real. Hasta entonces —y si algo
   falla— manda el cursor del sistema.

   DÓNDE NO VA
   - Punteros gruesos (touch): no hay puntero que seguir y
     consumiría batería.
   - Movimiento reducido: el cursor del sistema y listo.
   - Campos de formulario y texto seleccionable: ahí el cursor
     nativo comunica algo que el nuestro no.

   Sin suavizado: sigue al puntero al instante. La referencia no
   permitió medir si tenía retardo elástico, así que se elige lo
   que no puede sentirse "pesado".
   =========================================================== */

import { useEffect, useRef } from "react";

import { prefiereMenosMovimiento } from "../lib/tokens";

export function CursorPropio() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    const finoYSinPreferencia =
      window.matchMedia("(pointer: fine)").matches && !prefiereMenosMovimiento();
    if (!finoYSinPreferencia) return;

    let activo = false;

    const mover = (e: PointerEvent) => {
      /* Recién en el primer movimiento real se esconde el cursor
         del sistema. Si nunca llega, nunca se esconde. */
      if (!activo) {
        activo = true;
        document.documentElement.classList.add("con-cursor-propio");
        nodo.dataset["visible"] = "sí";
      }
      nodo.style.setProperty("--x", `${e.clientX}px`);
      nodo.style.setProperty("--y", `${e.clientY}px`);
    };

    const esconder = () => {
      nodo.dataset["visible"] = "no";
    };
    const mostrar = () => {
      if (activo) nodo.dataset["visible"] = "sí";
    };

    window.addEventListener("pointermove", mover, { passive: true });
    document.addEventListener("pointerleave", esconder);
    document.addEventListener("pointerenter", mostrar);

    return () => {
      window.removeEventListener("pointermove", mover);
      document.removeEventListener("pointerleave", esconder);
      document.removeEventListener("pointerenter", mostrar);
      document.documentElement.classList.remove("con-cursor-propio");
    };
  }, []);

  return (
    <div ref={ref} className="cursor-propio" aria-hidden="true" data-visible="no">
      <svg viewBox="0 0 32 46" width="32" height="46" focusable="false">
        <path
          d="M3 3 L29 24 L17 26 L23 41 L16 44 L10 29 L3 37 Z"
          fill="var(--acento-1)"
          stroke="#fff"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
