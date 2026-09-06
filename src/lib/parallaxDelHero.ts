/* ===========================================================
   PARALLAX DEL FONDO DEL HERO.

   Escribe tres números en el hero y el CSS los reparte entre las
   capas. No mueve nada por sí mismo: decide, y la hoja dibuja.

   `--px` y `--py`  · posición del puntero, de -1 a 1 desde el
                      centro de la ventana.
   `--scroll`       · píxeles scrolleados dentro del hero.

   SUAVIZADO, NO DIRECTO
   Seguir al puntero cuadro a cuadro hace que el fondo salte y se
   lea como un elemento persiguiendo al mouse. Acá el valor
   aplicado se acerca al del puntero un 8% por cuadro, así que
   llega con retardo y frena solo. Es la diferencia entre
   profundidad y persecución.

   EL BUCLE NO QUEDA GIRANDO
   El rAF arranca con el primer movimiento y se detiene cuando la
   distancia al destino baja de un milésimo. Con el puntero
   quieto no hay bucle, que es también lo que dice la referencia:
   en reposo la página no se mueve.

   DÓNDE NO VA
   - Movimiento reducido: no se anota nada y las variables quedan
     sin definir, así que el CSS cae en sus respaldos de 0.
   - Punteros gruesos: no hay cursor que seguir, así que sólo
     queda el scroll. No se escucha `pointermove` en absoluto.

   LO QUE SE MUEVE ES EL FONDO, NADA MÁS
   El titular, el CTA y los objetos viven en otra rama del DOM y
   ninguna regla los toca. Está probado en el CSS: las
   transformaciones son de `.b1__atmosfera` y `.b1__nubes`.
   =========================================================== */

import { useEffect, type RefObject } from "react";

import { prefiereMenosMovimiento } from "./tokens";

/** Cuánto se acerca el valor aplicado al del puntero por cuadro. */
const SUAVIZADO = 0.11;
/** Bajo esta distancia se considera llegado y el bucle para. */
const QUIETO = 0.001;

export function useParallaxDelHero(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    if (prefiereMenosMovimiento()) return;

    let destinoX = 0;
    let destinoY = 0;
    let x = 0;
    let y = 0;
    let corriendo = false;
    let programado = false;

    const publicarScroll = () => {
      programado = false;
      /* Se recorta al alto del hero: pasado eso el fondo ya no se
         ve y seguir acumulando sólo agranda el desplazamiento. */
      const alto = nodo.offsetHeight || 1;
      const s = Math.min(Math.max(window.scrollY, 0), alto);
      nodo.style.setProperty("--scroll", s.toFixed(1));
    };

    const cuadro = () => {
      x += (destinoX - x) * SUAVIZADO;
      y += (destinoY - y) * SUAVIZADO;
      nodo.style.setProperty("--px", x.toFixed(4));
      nodo.style.setProperty("--py", y.toFixed(4));

      if (Math.abs(destinoX - x) > QUIETO || Math.abs(destinoY - y) > QUIETO) {
        requestAnimationFrame(cuadro);
      } else {
        corriendo = false;
      }
    };

    const arrancar = () => {
      if (corriendo) return;
      corriendo = true;
      requestAnimationFrame(cuadro);
    };

    const alMover = (e: PointerEvent) => {
      destinoX = (e.clientX / window.innerWidth) * 2 - 1;
      destinoY = (e.clientY / window.innerHeight) * 2 - 1;
      arrancar();
    };

    const alScrollear = () => {
      if (programado) return;
      programado = true;
      requestAnimationFrame(publicarScroll);
    };

    publicarScroll();
    window.addEventListener("scroll", alScrollear, { passive: true });

    const fino = window.matchMedia("(pointer: fine)").matches;
    if (fino) window.addEventListener("pointermove", alMover, { passive: true });

    return () => {
      window.removeEventListener("scroll", alScrollear);
      window.removeEventListener("pointermove", alMover);
      nodo.style.removeProperty("--px");
      nodo.style.removeProperty("--py");
      nodo.style.removeProperty("--scroll");
    };
  }, [ref]);
}
