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
  /** Dónde se escribe el valor. Por defecto, el propio elemento. */
  destino: HTMLElement;
  /** Nombre de la custom property. */
  variable: string;
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

  a.destino.style.setProperty(a.variable, p.toFixed(4));
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
  opciones: {
    activo?: boolean;
    recorrido?: number;
    /**
     * Dónde escribir el valor, si no es el elemento medido.
     *
     * Existe porque a veces el que se mide y el que se mueve no
     * son el mismo ni están en la misma rama: el hundimiento del
     * titular en B1 depende de cuánto lo tapó B2, que es su
     * HERMANO. Una custom property se hereda hacia abajo, no de
     * costado, así que el valor se escribe en el contenedor común
     * y los dos lo leen.
     */
    destino?: RefObject<HTMLElement | null>;
    /** Nombre de la custom property. Por defecto `--progreso`. */
    variable?: string;
  } = {},
) {
  const { activo = true, recorrido = 0.6, destino, variable = "--progreso" } = opciones;

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;
    const donde = destino?.current ?? elemento;

    /* Con movimiento reducido el elemento arranca y se queda en
       su estado final. No se anota, no se escucha nada.

       Ojo: el "estado final" es 1 porque quien lo usa interpola
       DESDE el valor y termina en 1 —el giro de ServiceStack, la
       entrada de B3—. Un consumidor donde 1 signifique lo
       contrario, como la cobertura de B1, no puede apoyarse en
       esto: tiene que apagar su regla con la media query. */
    if (!activo || prefiereMenosMovimiento()) {
      donde.style.setProperty(variable, "1");
      return;
    }

    asegurarEscucha();
    const anotado: Anotado = { elemento, recorrido, destino: donde, variable };

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
  }, [ref, activo, recorrido, destino, variable]);
}
