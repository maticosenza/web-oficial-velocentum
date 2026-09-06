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

   NO ES SÓLO PARA EL HERO
   Lo usan B1+B2 y también B7+B8, donde el bloque de clientes
   queda fijado mientras el cierre azul sube por encima. El plan
   llama a eso "variante de M2 con top alto", pero M2
   —ServiceStack— no alcanza solo: un `sticky` se fija dentro de
   SU padre, así que para que B7 siga fijado mientras B8 sube los
   dos tienen que compartir contenedor. Eso es exactamente lo que
   hace este componente, y por eso el offset es un parámetro en
   vez de un componente nuevo.

   EL OFFSET DESCUENTA DEL ALTO
   `top` y `height` salen del mismo número. Fijar arriba a 200px
   sin descontarlos del alto dejaría los últimos 200px del bloque
   por debajo del pie de la ventana, invisibles para siempre.

   SE APAGA BAJO 810px
   No es una preferencia: con la pantalla de un teléfono el hero
   fijado se come todo el viewport. Ahí pasa a flujo normal, con
   alto natural. Con movimiento reducido, lo mismo.
   =========================================================== */

import type { CSSProperties, ReactNode } from "react";

export function HeroSticky({
  hero,
  siguiente,
  offset,
  className,
}: {
  /** El bloque que se fija. Ocupa el viewport menos el offset. */
  hero: ReactNode;
  /** El bloque que sube y lo tapa. Fondo 100% opaco. */
  siguiente: ReactNode;
  /** Alto al que se fija. Por defecto 0, que es el hero a pantalla completa. */
  offset?: string;
  className?: string;
}) {
  return (
    <div
      className={["hero-sticky", className].filter(Boolean).join(" ")}
      style={offset ? ({ "--pin-offset": offset } as CSSProperties) : undefined}
    >
      <div className="hero-sticky__hero">{hero}</div>
      <div className="hero-sticky__siguiente">{siguiente}</div>
    </div>
  );
}
