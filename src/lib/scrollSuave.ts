/* ===========================================================
   SCROLL SUAVE DEL SITIO

   Lofty y Chrome amortiguan la rueda/trackpad con Lenis. Antes
   Velocentum lo montaba únicamente dentro de la Home y excluía
   Safari; por eso el mismo gesto se sentía distinto al cambiar
   de navegador o de ruta. Ahora el motor vive en la raíz y se
   usa en todo escritorio, incluido Safari.

   En táctil conserva el scroll nativo de iOS/Android. Con
   movimiento reducido tampoco se monta.
   =========================================================== */

import { useEffect } from "react";

type InstanciaDeScroll = {
  destroy: () => void;
  scrollTo: (
    destino: number,
    opciones?: { immediate?: boolean; force?: boolean; programmatic?: boolean },
  ) => void;
};

let instanciaActiva: InstanciaDeScroll | null = null;

/* TanStack restaura el scroll nativo al cambiar de ruta. En
   escritorio Lenis también conserva una posición propia; si ambas
   no se actualizan juntas, su siguiente frame puede devolver la
   página nueva a la altura de la anterior. En táctil no hay Lenis,
   así que el scroll nativo alcanza. */
export function reiniciarScrollDeRuta() {
  instanciaActiva?.scrollTo(0, {
    immediate: true,
    force: true,
    programmatic: true,
  });
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

export function useScrollSuaveDelSitio() {
  useEffect(() => {
    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let instancia: { destroy: () => void } | null = null;
    let version = 0;

    const sincronizar = async () => {
      const estaVersion = ++version;

      if (!media.matches) {
        instancia?.destroy();
        instancia = null;
        instanciaActiva = null;
        return;
      }

      const { default: Lenis } = await import("lenis");
      if (estaVersion !== version || !media.matches) return;

      instancia?.destroy();
      instancia = new Lenis({
        autoRaf: true,
        autoToggle: true,
        anchors: true,
        smoothWheel: true,
      });
      instanciaActiva = instancia;
    };

    const alCambiar = () => void sincronizar();
    media.addEventListener("change", alCambiar);
    void sincronizar();

    return () => {
      version += 1;
      media.removeEventListener("change", alCambiar);
      instancia?.destroy();
      if (instanciaActiva === instancia) instanciaActiva = null;
    };
  }, []);
}
