/* ===========================================================
   HeroSticky — el hero fijado y el bloque que sube encima.

   El hero queda a 100vh fijado arriba mientras el bloque
   siguiente sube y lo tapa. Es `position: sticky` puro: no hay
   animación, no hay estado, y por eso se deshace solo al
   scrollear para atrás.

   LOS DOS TIENEN QUE COMPARTIR PADRE
   Un elemento sticky se fija dentro de su contenedor, no dentro
   de la ventana. Si el hero y el bloque siguiente están en
   padres distintos, el hero se despega apenas termina el suyo y
   el efecto no existe. Por eso este componente envuelve a los
   dos: el contrato queda en el componente, no en un comentario
   que alguien tiene que leer.

   EL BLOQUE QUE SUBE TIENE QUE SER OPACO
   Si tiene transparencia se ve el hero atrás y el efecto se
   arruina. Es el mismo requisito que ServiceStack.

   Y TIENE QUE SER ALTO
   El hero queda pinneado sólo mientras el contenedor común
   tenga recorrido, y ese recorrido es exactamente el alto del
   bloque siguiente. Con un bloque más bajo que el viewport, el
   hero se despega antes de terminar de taparse. En la página de
   prueba, con 272px, se despegaba a los 32px de scroll.
   Regla práctica: el bloque que sube va de un viewport para
   arriba.

   SE APAGA BAJO 810px
   No es una preferencia: con la pantalla de un teléfono el hero
   fijado se come todo el viewport. Ahí pasa a flujo normal, con
   alto natural. Con movimiento reducido, lo mismo.
   =========================================================== */

import type { ReactNode } from "react";

export function HeroSticky({
  hero,
  siguiente,
  className,
}: {
  /** El hero. Se fija a 100vh. */
  hero: ReactNode;
  /** El bloque que sube y lo tapa. Fondo 100% opaco. */
  siguiente: ReactNode;
  className?: string;
}) {
  return (
    <div className={["hero-sticky", className].filter(Boolean).join(" ")}>
      <div className="hero-sticky__hero">{hero}</div>
      <div className="hero-sticky__siguiente">{siguiente}</div>
    </div>
  );
}
