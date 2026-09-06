/* ===========================================================
   PROGRESO DE SCROLL — primitivo compartido.

   Devuelve un valor continuo de 0 a 1 atado a la posición del
   elemento en la ventana, y lo escribe como `--progreso` en el
   propio elemento. No es un reveal: es reversible, y si el
   usuario scrollea para atrás el valor vuelve.

   Lo usan la rotación de entrada de ServiceStack (B4) y de
   Trabajos (B3), y después ScrollMedia.

   No es el único que escucha `scroll`: `lib/navAlScrollear.ts`
   tiene el suyo. Resuelve otra cosa —una dirección y un umbral,
   sin elemento que medir— y meterla acá sería agrandar este
   primitivo para un caso que no comparte nada.

   POR QUÉ UN SOLO BUCLE
   Cada elemento con su propio listener de scroll multiplica el
   trabajo por cuadro. Acá hay un listener y un rAF para todos:
   los elementos se anotan en un registro y se recalculan juntos.

   POR QUÉ INTERSECTIONOBSERVER ADEMÁS
   Un elemento fuera de la ventana no necesita recalcularse. El
   observer lo saca del registro activo y lo vuelve a meter
   cuando aparece. Con ocho tarjetas, la diferencia se nota en
   teléfono.
   =========================================================== */

import { useEffect, type RefObject } from "react";
import { prefiereMenosMovimiento } from "./tokens";

type Anotado = {
  elemento: HTMLElement;
  /** Porción de la ventana que recorre el elemento hasta llegar a 1. */
  recorrido: number;
};

const anotados = new Set<Anotado>();
let programado = false;

function calcular(a: Anotado) {
  const caja = a.elemento.getBoundingClientRect();
  const alto = window.innerHeight || 1;

  /* 0 cuando el borde superior toca el pie de la ventana.
     1 cuando subió `recorrido` de ventana. Se recorta a [0,1]
     para que quedarse quieto arriba no siga acumulando. */
  const avance = (alto - caja.top) / (alto * a.recorrido);
  const p = Math.min(1, Math.max(0, avance));

  a.elemento.style.setProperty("--progreso", p.toFixed(4));
}

function actualizar() {
  programado = false;
  for (const a of anotados) calcular(a);
}

function programar() {
  if (programado) return;
  programado = true;
  requestAnimationFrame(actualizar);
}

let escuchando = false;
function asegurarEscucha() {
  if (escuchando || typeof window === "undefined") return;
  escuchando = true;
  window.addEventListener("scroll", programar, { passive: true });
  window.addEventListener("resize", programar);
}

export function useProgresoDeScroll(
  ref: RefObject<HTMLElement | null>,
  opciones: { activo?: boolean; recorrido?: number } = {},
) {
  const { activo = true, recorrido = 0.6 } = opciones;

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    /* Con movimiento reducido el elemento arranca y se queda en
       su estado final. No se anota, no se escucha nada. */
    if (!activo || prefiereMenosMovimiento()) {
      elemento.style.setProperty("--progreso", "1");
      return;
    }

    asegurarEscucha();
    const anotado: Anotado = { elemento, recorrido };

    /* Sólo se recalcula mientras está a la vista. El margen
       generoso evita que entre en cuadro ya enderezado. */
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada?.isIntersecting) {
          anotados.add(anotado);
          calcular(anotado);
        } else {
          anotados.delete(anotado);
        }
      },
      { rootMargin: "100% 0px" },
    );
    observador.observe(elemento);

    // Valor inicial: si ya está en pantalla al montar, no espera un scroll.
    calcular(anotado);

    return () => {
      observador.disconnect();
      anotados.delete(anotado);
    };
  }, [ref, activo, recorrido]);
}
