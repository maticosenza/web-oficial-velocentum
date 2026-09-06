/* ===========================================================
   Ticker — loop horizontal con máscara.

   Lo usan B5 (las once capacidades) y B7 (los logos de
   clientes). Una sola fila, una sola dirección: el plan es
   explícito en que no hay una segunda banda en contra.

   LA MÁSCARA AL 10%
   Los bordes se desvanecen en vez de cortarse. El 10% de cada
   lado es el número medido en la referencia, y es lo que hace
   que se vea prolijo en lugar de recortado.

   LA PAUSA ES POR TECLADO, Y NADA MÁS
   WCAG 2.2.2: cualquier contenido que se mueva solo más de
   cinco segundos junto a otro contenido necesita un mecanismo
   para detenerlo. Acá el mecanismo es uno: la banda es una
   parada de tabulación con nombre accesible y se detiene al
   recibir el foco.

   NO se detiene al pasar el mouse. Se probó y se sacó: la banda
   ocupa media pantalla, así que frenaba cada vez que el puntero
   la cruzaba de paso, sin que nadie se lo pidiera.

   ⚠ LO QUE ESTE MECANISMO NO CUBRE
   En una pantalla táctil no hay foco de teclado, así que ahí no
   queda ningún freno accionable: el único que sigue en pie es
   `prefers-reduced-motion`, que es una preferencia del sistema y
   no algo que el usuario accione en el momento — con ella la
   banda ni arranca. Antes hubo un botón visible, que cubría el
   caso táctil; se sacó a pedido. Queda dicho por si vuelve.

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

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

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
  const [foco, setFoco] = useState(false);
  const [reducido, setReducido] = useState(false);

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

  const enMovimiento = !reducido && !foco;

  return (
    <section
      className={["ticker", className].filter(Boolean).join(" ")}
      aria-label={etiqueta}
      /* La parada de tabulación es lo que le da al teclado una
         forma de frenar la banda. Si no hay movimiento tampoco
         hay nada que frenar, así que deja de ser parada: un stop
         que no hace nada es ruido en el recorrido.
         `onFocus`/`onBlur` en React burbujean, así que también
         atrapan el foco de cualquier cosa enfocable de adentro. */
      tabIndex={reducido ? undefined : 0}
      onFocus={() => setFoco(true)}
      onBlur={() => setFoco(false)}
    >
      <div className="ticker__ventana">
        <div ref={pistaRef} className="ticker__pista" data-animando={enMovimiento ? "sí" : "no"}>
          <div className="ticker__grupo">{children}</div>
          {/* Copia visual. Fuera del árbol accesible y del orden
              de tabulación: el contenido ya se anunció una vez. */}
          <div className="ticker__grupo" aria-hidden="true" inert>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Una píldora de la banda de capacidades (B5).
 *
 * `indice` no es decorativo: de él sale el desfase de la
 * oscilación vertical, para que las píldoras no suban y bajen
 * todas juntas. Derivado y no aleatorio, así el mismo índice da
 * siempre el mismo desfase entre la copia real de la pista y la
 * copia visual que el Ticker duplica — si fuera al azar, las dos
 * copias oscilarían distinto y el corte del loop se vería.
 */
export function Pildora({
  children,
  acento,
  sobre,
  indice = 0,
}: {
  children: ReactNode;
  acento: string;
  sobre: string;
  indice?: number;
}) {
  return (
    <span
      className="pildora"
      style={{ "--acento": acento, "--sobre": sobre, "--i": indice } as CSSProperties}
    >
      {children}
    </span>
  );
}
