/* ===========================================================
   Ticker — loop horizontal con máscara.

   Lo usan B5 (las once capacidades) y B7 (los logos de
   clientes). Una sola fila, una sola dirección: el plan es
   explícito en que no hay una segunda banda en contra.

   LA MÁSCARA AL 10%
   Los bordes se desvanecen en vez de cortarse. El 10% de cada
   lado es el número medido en la referencia, y es lo que hace
   que se vea prolijo en lugar de recortado.

   LA PAUSA NO ES OPCIONAL
   WCAG 2.2.2: cualquier contenido que se mueva solo más de
   cinco segundos junto a otro contenido necesita un control
   para detenerlo. `prefers-reduced-motion` NO lo reemplaza —
   son cosas distintas: una es una preferencia del sistema, la
   otra es un control que el usuario tiene que poder accionar
   en el momento. Por eso hay un botón de verdad, visible,
   alcanzable con teclado y con `aria-pressed`.

   LA PISTA DUPLICADA Y EL LECTOR DE PANTALLA
   Para que el loop no tenga saltos, la lista va dos veces y se
   desplaza media pista. La segunda copia es puramente visual:
   va `aria-hidden` y fuera del orden de tabulación, o el lector
   de pantalla leería las once capacidades dos veces.

   VELOCIDAD CONSTANTE
   La duración no es un número fijo: se calcula desde el ancho
   real de la pista para que once píldoras cortas y doce logos
   anchos se muevan a la misma velocidad aparente.
   =========================================================== */

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { prefiereMenosMovimiento } from "../lib/tokens";

export function Ticker({
  children,
  etiqueta,
  velocidad = 40,
  className,
}: {
  /** Los elementos de la pista. Se duplican solos. */
  children: ReactNode;
  /** Nombre accesible de la región. */
  etiqueta: string;
  /** Píxeles por segundo. Baja a propósito: es un respiro, no un carrusel. */
  velocidad?: number;
  className?: string;
}) {
  const pistaRef = useRef<HTMLDivElement>(null);
  const [pausado, setPausado] = useState(false);
  const [reducido, setReducido] = useState(false);
  const idPista = useId();

  /* La duración sale del ancho real: media pista a `velocidad`
     píxeles por segundo. Se recalcula si cambia el contenido o
     el ancho de la ventana. */
  useEffect(() => {
    const pista = pistaRef.current;
    if (!pista) return;

    const medir = () => {
      const mitad = pista.scrollWidth / 2;
      if (mitad <= 0) return;
      pista.style.setProperty("--ticker-duracion", `${(mitad / velocidad).toFixed(2)}s`);
    };

    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(pista);
    return () => observador.disconnect();
  }, [velocidad, children]);

  /* Con movimiento reducido el contenido se muestra entero y
     quieto: no alcanza con poner la duración en cero. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const leer = () => setReducido(mq.matches);
    leer();
    mq.addEventListener("change", leer);
    return () => mq.removeEventListener("change", leer);
  }, []);

  const enMovimiento = !reducido && !pausado;

  return (
    <section className={["ticker", className].filter(Boolean).join(" ")} aria-label={etiqueta}>
      <div className="ticker__ventana">
        <div
          ref={pistaRef}
          id={idPista}
          className="ticker__pista"
          data-animando={enMovimiento ? "sí" : "no"}
        >
          <div className="ticker__grupo">{children}</div>
          {/* Copia visual. Fuera del árbol accesible y del orden
              de tabulación: el contenido ya se anunció una vez. */}
          <div className="ticker__grupo" aria-hidden="true" inert>
            {children}
          </div>
        </div>
      </div>

      {/* El control no se muestra si no hay nada moviéndose:
          con movimiento reducido no habría qué pausar. */}
      {!reducido && (
        <button
          type="button"
          className="boton boton--contorno ticker__pausa"
          aria-pressed={pausado}
          aria-controls={idPista}
          onClick={() => setPausado((p) => !p)}
        >
          {pausado ? "Reanudar" : "Pausar"}
        </button>
      )}
    </section>
  );
}

/** Una píldora de la banda de capacidades (B5). */
export function Pildora({
  children,
  acento,
  sobre,
}: {
  children: ReactNode;
  acento: string;
  sobre: string;
}) {
  return (
    <span className="pildora" style={{ "--acento": acento, "--sobre": sobre } as CSSProperties}>
      {children}
    </span>
  );
}
