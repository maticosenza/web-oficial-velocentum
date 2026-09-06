/* ===========================================================
   ALTO DEL NAV — publicado como token en tiempo de ejecución.

   El nav es fijo y tapa la parte de arriba de la pantalla.
   Cualquier cosa que se fije con `sticky` tiene que quedar por
   debajo de él, y su alto no es una constante: cambia con el
   breakpoint, con el zoom del navegador y con el tamaño de
   fuente del sistema.

   Por eso el nav se mide solo y escribe `--alto-nav` en el
   documento, en vez de que los demás componentes adivinen 56px.
   =========================================================== */

import { useEffect, type RefObject } from "react";

export function useMedirNav(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    const publicar = () => {
      const alto = elemento.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--alto-nav", `${Math.round(alto)}px`);
    };

    publicar();

    /* ResizeObserver y no `resize` de ventana: el nav también
       cambia de alto cuando se abre el menú de móvil o cuando
       el texto de un link pasa a dos renglones. */
    const observador = new ResizeObserver(publicar);
    observador.observe(elemento);

    return () => {
      observador.disconnect();
      document.documentElement.style.removeProperty("--alto-nav");
    };
  }, [ref]);
}
