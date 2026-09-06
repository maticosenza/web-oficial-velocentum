/* ===========================================================
   ScrollMedia — apertura de encuadre atada al scroll.

   El marco crece de 0.7 a 1 mientras la imagen se desamplía de
   1.3 a 1. El resultado es que la foto parece quedarse quieta
   mientras el encuadre se abre. Es lo que hace que la página de
   Casos se sienta cara, y es barato: dos `scale` atados al
   mismo valor.

   EL TEXTO NO ESCALA
   La columna de texto acompaña con un desplazamiento, no con un
   `scale`. Escalar texto lo desenfoca en el camino y le rompe
   el tamaño a quien tiene zoom.

   0.7 × 1.3 = 0.91, NO 1
   La compensación no es exacta y el plan ya lo admite. Es un
   efecto aproximado, no una escala neta constante. Si alguna vez
   se quisiera exacta, la imagen tendría que ir a la inversa
   `1/escala` del marco. Se deja como está: los valores salieron
   de medir la referencia y el efecto buscado es ese.

   SIN PERSPECTIVA
   El plan medía `perspective: 1200px`, pero sobre una escala 2D
   pura no cambia absolutamente nada. Queda afuera hasta que haya
   una transformación con componente de profundidad que la
   justifique.

   NO ES Reveal. Es continuo y reversible.
   =========================================================== */

import { useRef, type CSSProperties, type ReactNode } from "react";

import { useProgresoDeScroll } from "../lib/progresoDeScroll";

export function ScrollMedia({
  medio,
  texto,
  className,
}: {
  /** La imagen o el video. Va dentro del marco que se abre. */
  medio: ReactNode;
  /** La columna de texto. No escala. */
  texto?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useProgresoDeScroll(ref, { recorrido: 0.75 });

  return (
    <div ref={ref} className={["scroll-medio", className].filter(Boolean).join(" ")}>
      <div className="scroll-medio__marco">
        <div className="scroll-medio__interior">{medio}</div>
      </div>
      {texto ? <div className="scroll-medio__texto">{texto}</div> : null}
    </div>
  );
}

/** Marco de proporción fija para el medio, con su radio de 16px. */
export function MarcoDeMedio({ ratio = "16 / 10", acento }: { ratio?: string; acento: string }) {
  return (
    <div
      className="scroll-medio__placeholder"
      style={{ "--ratio": ratio, "--acento": acento } as CSSProperties}
      role="img"
      aria-label="Placeholder de medio. La pieza real todavía no existe."
    />
  );
}
