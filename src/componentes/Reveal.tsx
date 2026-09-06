/* ===========================================================
   Reveal — aparición al entrar en cuadro.

   Opacidad más 12px de Y, 240ms, escalonado de 50ms. UNA VEZ.

   NO ES ScrollMedia. El plan lo separa a propósito porque el V2
   los llamaba igual y son mecánicas opuestas:

     Reveal      → se dispara una vez y no vuelve. Es un evento.
     ScrollMedia → valor continuo atado al scroll, reversible.

   Si se mezclan, termina uno queriendo que el reveal "vuelva"
   al scrollear para arriba, que es justamente lo que no hace.

   NINGÚN BLOQUE ARRANCA PERMANENTEMENTE OCULTO
   El HTML se sirve visible. Es el JS el que baja la opacidad al
   montar, y sólo si el elemento todavía no entró en cuadro. Así,
   si el JS falla, si tarda, o si el usuario pidió menos
   movimiento, el contenido está: no hay forma de que un bloque
   quede invisible para siempre por un error nuestro.
   =========================================================== */

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

import { prefiereMenosMovimiento } from "../lib/tokens";

export function Reveal({
  children,
  as: Componente = "div",
  indice = 0,
  className,
  style,
  ...resto
}: {
  children: ReactNode;
  /** Etiqueta a renderizar. El reveal no impone un elemento. */
  as?: ElementType;
  /** Posición en el escalonado. 0 es el primero. */
  indice?: number;
  className?: string;
  style?: CSSProperties;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    /* Con movimiento reducido no se toca nada: el contenido ya
       está visible en el HTML y así se queda. */
    if (prefiereMenosMovimiento()) return;

    /* Si ya está en cuadro al montar —por ejemplo arriba de todo
       en la primera carga— no se esconde para después mostrarlo:
       eso produciría un parpadeo. Se deja visible. */
    const caja = elemento.getBoundingClientRect();
    if (caja.top < window.innerHeight) return;

    elemento.dataset["revelado"] = "no";

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada?.isIntersecting) return;
        elemento.dataset["revelado"] = "sí";
        /* Una vez y no vuelve: el observador se desconecta en
           cuanto disparó. */
        observador.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observador.observe(elemento);

    return () => observador.disconnect();
  }, []);

  return (
    /* El `style` del llamador se FUSIONA, no se pisa ni pisa: si
       el spread fuera después, un `style` de afuera borraría
       `--reveal-indice` y el escalonado dejaría de existir en
       silencio. */
    <Componente
      ref={ref}
      {...resto}
      className={["reveal", className].filter(Boolean).join(" ")}
      style={{ ...style, "--reveal-indice": indice } as CSSProperties}
    >
      {children}
    </Componente>
  );
}
