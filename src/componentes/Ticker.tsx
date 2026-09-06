/* ===========================================================
   Ticker — loop horizontal con máscara.

   Lo usan B5 (las once capacidades) y B7 (los logos de
   clientes). Una sola fila, una sola dirección: el plan es
   explícito en que no hay una segunda banda en contra.

   LA MÁSCARA AL 10%
   Los bordes se desvanecen en vez de cortarse. El 10% de cada
   lado es el número medido en la referencia, y es lo que hace
   que se vea prolijo en lugar de recortado.

   LA PAUSA NO ES OPCIONAL, PERO NO ES UN BOTÓN DIBUJADO
   WCAG 2.2.2: cualquier contenido que se mueva solo más de
   cinco segundos junto a otro contenido necesita un mecanismo
   para detenerlo. Acá el mecanismo son dos, y ninguno ocupa
   lugar en la composición:

   - **Puntero:** la banda se detiene al pasar el mouse.
   - **Teclado:** la banda es una parada de tabulación con
     nombre accesible, y se detiene al recibir el foco.

   Las dos condiciones son independientes: salir con el mouse
   mientras el foco sigue adentro no reanuda nada.

   `prefers-reduced-motion` es una tercera vía y NO reemplaza a
   las otras dos: es una preferencia del sistema, no algo que el
   usuario accione en el momento. Con ella la banda ni arranca.

   ⚠ LO QUE ESTE MECANISMO NO CUBRE
   En una pantalla táctil no hay hover, y sin teclado ni lector
   no hay foco. Ahí el único freno que queda es
   `prefers-reduced-motion`. Un botón visible cubría también ese
   caso; se sacó a pedido, para que la banda quede como la
   referencia. Queda dicho por si más adelante aparece.

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
  /* Dos frenos independientes. Con un solo booleano, sacar el
     mouse reanudaría la banda aunque el foco siguiera adentro. */
  const [puntero, setPuntero] = useState(false);
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

  const enMovimiento = !reducido && !puntero && !foco;

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
      onMouseEnter={() => setPuntero(true)}
      onMouseLeave={() => setPuntero(false)}
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
