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

   DOS O TRES COLUMNAS
   Nació con dos —medio y texto— y Casos pide tres: la
   identificación del cliente a la izquierda, el medio al centro y
   la frase a la derecha. Se resuelve con una prop opcional, como
   `HeroSticky` con su `offset`, y no con un componente nuevo: la
   mecánica es exactamente la misma.

   Con `izquierda`, las dos columnas laterales entran SIMÉTRICAS:
   la de la izquierda desde la izquierda y la de la derecha desde
   la derecha, con el mismo desplazamiento de 47px que ya estaba
   medido. En la variante de dos columnas nada cambia — el signo
   por defecto es el que tenía.

   ⚠ TRAMPA AL APILAR: EL `order` VA EN LOS ENVOLTORIOS
   Los ítems de la grilla son los tres envoltorios que crea este
   componente —`__izquierda`, `__marco` y `__texto`—, no lo que
   se le pasa por prop. Al apilar en móvil y querer reordenar,
   `order` sobre el contenido no mueve NADA: es un hijo del ítem,
   no el ítem. Va sobre el envoltorio.

     ✗ .mi-columna            { order: 2 }
     ✓ .mi-caso > .scroll-medio__izquierda { order: 2 }

   Y falla en silencio, que es lo peor: la regla es válida, el
   navegador no se queja y las columnas quedan en el orden del
   DOM. Pasó construyendo Casos.

   Al reordenar, además, sólo cambia el orden VISUAL: el del DOM
   queda como está. Mientras no haya nada enfocable adentro no
   abre brecha con el orden de tabulación, pero si algún día la
   hay, hay que reordenar el DOM y no el `order`.

   ⚠ Y APILADO, APAGAR EL CORRIMIENTO LATERAL. Ver el bloque de
   `@media (max-width: 809px)` en `componentes.css`: sobre una
   columna de ancho completo, los 47px la empujan fuera de la
   pantalla y aparece scroll horizontal en toda la página.

   NO ES Reveal. Es continuo y reversible.
   =========================================================== */

import { useRef, type CSSProperties, type ReactNode } from "react";

import { useProgresoDeScroll } from "../lib/progresoDeScroll";

export function ScrollMedia({
  medio,
  texto,
  izquierda,
  className,
}: {
  /** La imagen o el video. Va dentro del marco que se abre. */
  medio: ReactNode;
  /** La columna de texto, a la derecha del medio. No escala. */
  texto?: ReactNode;
  /**
   * Columna a la IZQUIERDA del medio. Al pasarla, el bloque pasa
   * a tres columnas y las dos laterales entran simétricas.
   */
  izquierda?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useProgresoDeScroll(ref, { recorrido: 0.75 });

  return (
    <div
      ref={ref}
      className={["scroll-medio", izquierda ? "scroll-medio--tres" : null, className]
        .filter(Boolean)
        .join(" ")}
    >
      {izquierda ? <div className="scroll-medio__izquierda">{izquierda}</div> : null}
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
