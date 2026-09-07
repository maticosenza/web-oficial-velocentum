/* ===========================================================
   ServiceStack — el apilado sticky.

   Cada tarjeta se fija arriba y la siguiente se desliza por
   encima, tapándola. Es `position: sticky` puro, no una
   animación disparada: por eso es reversible sola — si
   scrolleás para arriba, la de abajo se va y reaparece la de
   arriba, sin lógica nuestra.

   LA TARJETA QUE SE VA TAMBIÉN SE MUEVE
   Hasta acá la de atrás se quedaba quieta y recta mientras la
   nueva le pasaba por encima, y el bloque se leía como hojas que
   se acumulan y nada más. Ahora la de atrás se inclina, sube un
   poco y se achica mientras la siguiente la cubre: queda un
   borde inclinado asomando detrás y la pila se lee como una pila.

   ⚠ LA SALIDA DE UNA TARJETA NO SE PUEDE MEDIR EN ELLA MISMA.
   Una vez fijada, su `getBoundingClientRect().top` se queda
   clavado en el offset y deja de haber progreso que leer. Lo que
   avanza es la SIGUIENTE, así que la salida de la tarjeta N se
   calcula midiendo a la N+1 y se escribe en la capa de salida de
   la N. Por eso los refs de los huecos se crean en el
   contenedor y se reparten, en vez de vivir dentro de cada
   elemento.

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
   Ninguna va en el elemento sticky. Un `transform` genera
   contexto de apilado y pelea con el `z-index` creciente del
   apilado. Son tres capas: la de afuera se fija, la del medio
   hace la SALIDA —la empuja la tarjeta siguiente— y la de
   adentro hace la ENTRADA, su propio enderezado. Dos
   transformaciones distintas no pueden compartir declaración:
   la segunda pisaría a la primera entera.

   UN SOLO BUCLE PARA TODO
   Las dos mediciones pasan por `useProgresoDeScroll`, que ya
   tiene un único listener y un solo rAF compartido para toda la
   página, y que agrupa el cálculo de todos los anotados en la
   misma pasada. No se agrega ningún listener por tarjeta.
   =========================================================== */

import { Children, createRef, useRef, type ReactNode, type RefObject } from "react";

import { useProgresoDeScroll } from "../lib/progresoDeScroll";

/* CUÁNTO RECORRIDO DE LA SIGUIENTE CONSUME LA SALIDA.
   El hook mide de 0 —borde superior de la siguiente apoyado en el
   pie de la ventana— a 1 —ese borde a `1 - recorrido` de ventana
   del tope—. Con 0.85 la salida termina con la siguiente a unos
   120px del tope, o sea justo antes de que se clave en su offset
   sticky (~88px). Con 1 nunca llegaría a completarse: la
   siguiente se frena en el offset y el valor se quedaría en 0.89
   para siempre. */
const RECORRIDO_SALIDA = 0.85;

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

  const hijos = Children.toArray(children);

  /* UN REF POR HUECO, CREADO ACÁ Y ESTABLE ENTRE RENDERS.
     La tarjeta N mide a la N+1, así que los refs no pueden vivir
     dentro de cada elemento: se crean en el contenedor y se
     reparten. Guardados en un `useRef` para que la identidad no
     cambie en cada render — si cambiara, el efecto del hook se
     desmontaría y volvería a montar en cada pasada. */
  const huecos = useRef<RefObject<HTMLDivElement | null>[]>([]);
  if (huecos.current.length !== hijos.length) {
    huecos.current = hijos.map((_, i) => huecos.current[i] ?? createRef<HTMLDivElement>());
  }

  return (
    <div className="pila-sticky" style={estilo}>
      {/* Se itera sobre los REFS y no sobre los hijos: así el ref
          propio llega definido desde el `map` y el único que puede
          faltar es el de la siguiente, que es justo el caso que la
          última tarjeta necesita. */}
      {huecos.current.map((huecoRef, i) => (
        <ElementoDePila
          key={i}
          indice={i}
          girar={girar}
          huecoRef={huecoRef}
          siguienteRef={huecos.current[i + 1]}
        >
          {hijos[i]}
        </ElementoDePila>
      ))}
    </div>
  );
}

function ElementoDePila({
  children,
  indice,
  girar,
  huecoRef,
  siguienteRef,
}: {
  children: ReactNode;
  indice: number;
  girar: boolean;
  huecoRef: RefObject<HTMLDivElement | null>;
  /** El hueco de la tarjeta que viene. La última no tiene. */
  siguienteRef: RefObject<HTMLDivElement | null> | undefined;
}) {
  const giroRef = useRef<HTMLDivElement>(null);
  const salidaRef = useRef<HTMLDivElement>(null);

  /* ⚠ EL REF DE LA ÚLTIMA TARJETA NUNCA SE ENGANCHA A NADA, Y ESO
     ES EL MECANISMO. El hook arranca con `if (!ref.current)
     return;`, así que con un ref vacío no anota nada y no escribe
     la variable: `--salida` se queda sin declarar y el CSS usa su
     valor por defecto, 0. La última queda recta, que es lo que se
     pide, sin una rama aparte ni un `activo` que mentiría.

     No sirve pasarle `activo: false`: esa rama escribe 1, porque
     para el resto de los consumidores del hook 1 es el estado
     final. Acá 1 es «ya se fue». Es la trampa que el propio hook
     documenta. */
  const sinSiguiente = useRef<HTMLDivElement>(null);

  useProgresoDeScroll(giroRef, { activo: girar });
  useProgresoDeScroll(siguienteRef ?? sinSiguiente, {
    activo: girar,
    recorrido: RECORRIDO_SALIDA,
    destino: salidaRef,
    variable: "--salida",
  });

  return (
    /* Capa 1: se fija. La capa va como variable y no como
       `zIndex` inline: un estilo inline le ganaría a la regla de
       `:focus-within`, que es la que rescata a una tarjeta tapada
       cuando alguien la alcanza con el teclado. */
    <div
      ref={huecoRef}
      className="pila-sticky__hueco"
      style={{ "--capa": indice + 1 } as React.CSSProperties}
    >
      {/* Capa 2: la salida, empujada por la tarjeta siguiente.
          El signo alterna con el índice: con todas inclinadas
          para el mismo lado la pila se lee como un error de
          alineación, alternando se lee como una pila. */}
      <div
        ref={salidaRef}
        className="pila-sticky__salida"
        style={{ "--salida-dir": indice % 2 === 0 ? 1 : -1 } as React.CSSProperties}
      >
        {/* Capa 3: la entrada, su propio enderezado. */}
        <div className="pila-sticky__giro" ref={giroRef}>
          {children}
        </div>
      </div>
    </div>
  );
}
