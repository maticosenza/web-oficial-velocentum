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

   Y hay una segunda red, en CSS: la regla de `cursor: none` pide
   con `:has()` que exista un `.cursor-propio` visible. Si el nodo
   se va del DOM o se apaga, el cursor del sistema vuelve solo,
   sin que ningún JS tenga que acordarse de limpiar.

   ⚠ VA EN LA RAÍZ DE LA PÁGINA, NO ADENTRO DE UN BLOQUE
   Esto costó un defecto real y conviene que quede escrito. El
   componente vivía dentro de `B1Hero`, o sea dentro de
   `.hero-sticky__hero`, que es `position: sticky` — y sticky
   CREA CONTEXTO DE APILADO. Con eso, el `z-index: 60` del cursor
   dejaba de competir contra la página y pasaba a competir sólo
   adentro del hero. Como ese contexto vale ~0 en la raíz,
   cualquier bloque posterior lo tapaba: B2 y B9 por `z-index`
   propio, y B5, B6 o B7 por ser simplemente posteriores en el
   DOM.

   El síntoma no era "se ve mal": era que el documento tenía
   `cursor: none` y el cursor propio quedaba abajo de todo, así
   que el usuario se quedaba sin puntero de la mitad de la página
   para abajo. Verificado con `elementFromPoint` sobre B1, B2, B4,
   B6 y B9: en los cinco había otro elemento encima.

   Por eso ahora se monta al tope de la página y, además, el
   componente se niega a esconder el cursor del sistema si detecta
   que algún ancestro le crea un contexto de apilado. Si alguien
   lo vuelve a meter adentro de un bloque, el efecto se apaga solo
   en vez de dejar al usuario sin puntero.

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

/**
 * ¿Algún ancestro le crea al cursor un contexto de apilado?
 * Si lo hay, su `z-index` no compite contra la página y termina
 * tapado. Antes que dejar al usuario sin puntero, no se activa.
 */
function atrapadoEnUnContexto(nodo: HTMLElement): boolean {
  for (let el = nodo.parentElement; el && el !== document.documentElement; el = el.parentElement) {
    const e = getComputedStyle(el);
    if (
      e.position === "sticky" ||
      e.position === "fixed" ||
      (e.position !== "static" && e.zIndex !== "auto") ||
      e.transform !== "none" ||
      e.filter !== "none" ||
      e.perspective !== "none" ||
      e.isolation === "isolate" ||
      e.mixBlendMode !== "normal" ||
      e.willChange.includes("transform") ||
      e.willChange.includes("opacity") ||
      Number(e.opacity) < 1
    ) {
      return true;
    }
  }
  return false;
}

export function CursorPropio() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    const finoYSinPreferencia =
      window.matchMedia("(pointer: fine)").matches && !prefiereMenosMovimiento();
    if (!finoYSinPreferencia) return;

    /* Si está atrapado, el cursor propio quedaría abajo de la
       página con el del sistema escondido. Se prefiere no tener
       cursor custom antes que no tener ningún puntero. */
    if (atrapadoEnUnContexto(nodo)) return;

    let activo = false;

    const mover = (e: PointerEvent) => {
      /* Recién en el primer movimiento real se esconde el cursor
         del sistema. Si nunca llega, nunca se esconde. */
      if (!activo) {
        /* Un nodo desconectado no se dibuja: no se esconde nada. */
        if (!nodo.isConnected) return;
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
