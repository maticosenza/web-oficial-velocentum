/* ===========================================================
   ServiceStack — el apilado sticky.

   Cada tarjeta se fija arriba y la siguiente se desliza por
   encima, tapándola. Es `position: sticky` puro, no una
   animación disparada: por eso es reversible sola — si
   scrolleás para arriba, la de abajo se va y reaparece la de
   arriba, sin lógica nuestra.

   Lo usan B4 (servicios) y B7 (clientes, con otro offset).

   EL OFFSET NO ES 56px A CIEGAS
   El plan mide `top: 56px` en la referencia, pero ese número
   sale de SU nav. Si nuestro nav es más alto —o el usuario está
   a zoom 200%, donde todo crece— una tarjeta fijada a 56px
   queda tapada por el nav. El offset se calcula:

       max(--sticky-servicios, --alto-nav + --space-2)

   Nunca menos que el valor del plan, nunca por debajo del nav.
   `--alto-nav` lo publica el nav midiéndose solo.

   FONDO 100% OPACO
   Si una tarjeta tiene transparencia, el apilado se rompe y se
   ve el desastre de abajo. No es una preferencia estética: es
   un requisito del mecanismo.

   TECLADO
   Una tarjeta tapada sigue siendo alcanzable con Tab. Al enfocar
   algo adentro, el navegador la trae a la ventana pero queda
   DEBAJO de las siguientes: el usuario enfoca un control que no
   ve. Verificado en la página de prueba con `elementFromPoint`.
   Por eso `:focus-within` sube la tarjeta al tope del apilado.

   DÓNDE VA CADA TRANSFORMACIÓN
   El giro de entrada NO va en el elemento sticky. Un `transform`
   genera contexto de apilado y pelea con el `z-index` creciente
   del apilado. Van en capas separadas: la de afuera se fija, la
   de adentro gira.
   =========================================================== */

import { Children, useRef, type ReactNode } from "react";

import { useProgresoDeScroll } from "../lib/progresoDeScroll";

export function ServiceStack({
  children,
  offset,
  angulo = "4deg",
  girar = true,
}: {
  children: ReactNode;
  /** Alto al que se fija cada tarjeta. Por defecto, el del sistema. */
  offset?: string;
  /** Cuánto llega rotada la tarjeta que entra. El plan pide 3–6°. */
  angulo?: string;
  girar?: boolean;
}) {
  const estilo: React.CSSProperties = {
    ...(offset ? ({ "--pila-offset": offset } as React.CSSProperties) : {}),
    ...({ "--pila-angulo": angulo } as React.CSSProperties),
  };

  return (
    <div className="pila-sticky" style={estilo}>
      {Children.map(children, (hijo, i) => (
        <ElementoDePila indice={i} girar={girar}>
          {hijo}
        </ElementoDePila>
      ))}
    </div>
  );
}

function ElementoDePila({
  children,
  indice,
  girar,
}: {
  children: ReactNode;
  indice: number;
  girar: boolean;
}) {
  const giroRef = useRef<HTMLDivElement>(null);
  useProgresoDeScroll(giroRef, { activo: girar });

  return (
    /* Capa 1: se fija. La capa va como variable y no como
       `zIndex` inline: un estilo inline le ganaría a la regla de
       `:focus-within`, que es la que rescata a una tarjeta tapada
       cuando alguien la alcanza con el teclado. */
    <div className="pila-sticky__hueco" style={{ "--capa": indice + 1 } as React.CSSProperties}>
      {/* Capa 2: gira. Separada a propósito. */}
      <div className="pila-sticky__giro" ref={giroRef}>
        {children}
      </div>
    </div>
  );
}
