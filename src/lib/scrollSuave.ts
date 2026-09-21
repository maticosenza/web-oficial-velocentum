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
    };

    const alCambiar = () => void sincronizar();
    media.addEventListener("change", alCambiar);
    void sincronizar();

    return () => {
      version += 1;
      media.removeEventListener("change", alCambiar);
      instancia?.destroy();
    };
  }, []);
}
