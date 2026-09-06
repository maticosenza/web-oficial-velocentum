/* ===========================================================
   RouteCurtain — cortina de transición entre páginas.

   Comportamiento medido en la referencia (ver
   docs/plan/02_paginas/05_CONTACTO_y_transiciones.md):
   un solo barrido continuo de abajo hacia arriba. La cortina
   sube tapando la página que se va; cuando terminó de taparla
   sigue subiendo y sale por arriba, destapando la que llega.

   Diferencias deliberadas con la referencia:
   - 300 + 300 ms en vez de ~1300 ms. 1,3 s se lee como espera.
   - Sin pausa en blanco: la ruta cambia bajo cobertura.
   - Color del acento de la página de DESTINO, no blanco.

   ALCANCE: sólo navegación por links internos. Atrás/adelante
   del navegador van sin cortina, a propósito — `popstate` se
   dispara DESPUÉS de que la URL cambió, así que taparla antes
   exigiría manipular el historial, y eso está prohibido.
   =========================================================== */

import { useRouter } from "@tanstack/react-router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

import { duracionDeToken, textoDeToken, prefiereMenosMovimiento } from "../lib/tokens";

type Estado = "idle" | "cubriendo" | "tapado" | "descubriendo";

/* El acento de cada página, que es también el color de su link
   en el nav y el de su rectángulo en el footer. Una cortina del
   color de destino hace que el sistema de color se lea solo. */
const ACENTO_POR_RUTA: Record<string, string> = {
  "/": "var(--acento-1)",
  "/metodo": "var(--acento-2)",
  "/casos": "var(--acento-3)",
  "/contacto": "var(--acento-4)",
};

const NOMBRE_POR_RUTA: Record<string, string> = {
  "/": "Inicio",
  "/metodo": "Método",
  "/casos": "Casos",
  "/contacto": "Contacto",
};

/* Si la navegación no resuelve en este tiempo, la cortina se
   abre igual. Una cortina clavada deja el sitio inutilizable:
   ante la duda, mostrar el estado de carga de la página. */
const MS_MAXIMO_DE_ESPERA = 4000;

/* Margen sobre la duración nominal de cada fase. Chrome PAUSA
   las animaciones mientras la pestaña está oculta, así que
   `animation.finished` puede no resolver nunca si el usuario se
   va a otra pestaña a mitad de navegación. Verificado en el
   spike: la secuencia quedó clavada en `cubriendo` hasta que la
   pestaña volvió a estar visible.
   Si se vence, se salta al estado final. Nadie estaba mirando. */
const MS_MARGEN_DE_FASE = 1000;

/** Espera la promesa, pero nunca más de `ms`. */
function conTiempoMaximo(promesa: Promise<unknown>, ms: number): Promise<unknown> {
  return Promise.race([promesa, new Promise((resolver) => setTimeout(resolver, ms))]);
}

type ContextoCortina = {
  navegar: (destino: string) => void;
  estado: Estado;
  ocupada: boolean;
};

const Contexto = createContext<ContextoCortina | null>(null);

export function useRouteCurtain(): ContextoCortina {
  const valor = useContext(Contexto);
  if (!valor) {
    throw new Error("useRouteCurtain necesita estar dentro de <RouteCurtain>");
  }
  return valor;
}

function acentoDe(ruta: string): string {
  return ACENTO_POR_RUTA[ruta] ?? "var(--fondo)";
}

/* Los tokens se leen en el momento del click, no al renderizar:
   leerlos al renderizar arriesga que el HTML del servidor y el
   del cliente no coincidan. */

/* Un click que el navegador ya sabe manejar mejor que nosotros:
   pestaña nueva, ventana nueva, descarga, botón del medio. */
function esClickQueNoInterceptamos(evento: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    evento.defaultPrevented ||
    evento.button !== 0 ||
    evento.metaKey ||
    evento.ctrlKey ||
    evento.shiftKey ||
    evento.altKey
  );
}

export function RouteCurtain({ children }: { children: ReactNode }) {
  const router = useRouter();
  const cortinaRef = useRef<HTMLDivElement>(null);
  const [estado, setEstadoReal] = useState<Estado>("idle");
  const [anuncio, setAnuncio] = useState("");

  /* El estado también vive en un ref porque los handlers lo leen
     de forma síncrona, y el valor del closure puede estar viejo. */
  const estadoRef = useRef<Estado>("idle");
  const navegacionPropiaRef = useRef(false);

  const setEstado = useCallback((nuevo: Estado) => {
    estadoRef.current = nuevo;
    setEstadoReal(nuevo);
  }, []);

  /* Red de seguridad. Si el usuario aprieta atrás mientras la
     cortina está arriba, la navegación se resuelve sin que la
     hayamos pedido nosotros: hay que soltar la cortina o queda
     tapando una página que ya cambió. */
  useEffect(() => {
    return router.subscribe("onRendered", () => {
      if (estadoRef.current !== "idle" && !navegacionPropiaRef.current) {
        const cortina = cortinaRef.current;
        if (cortina) {
          cortina.getAnimations().forEach((a) => a.cancel());
          cortina.style.transform = "scaleY(0)";
        }
        setEstado("idle");
      }
    });
  }, [router, setEstado]);

  const enfocarContenido = useCallback((destino: string) => {
    const contenido = document.getElementById("contenido");
    contenido?.focus();
    /* El lector de pantalla necesita que le digan que cambió la
       página: no hay recarga que se lo anuncie. */
    setAnuncio(`${NOMBRE_POR_RUTA[destino] ?? "Página"} — cargada`);
  }, []);

  /* El foco NO se puede pedir dentro de `finally`. Ahí ya se
     llamó a setEstado("idle"), pero React todavía no comiteó:
     el DOM sigue teniendo `inert`, y un elemento dentro de un
     subárbol inert no acepta foco. Verificado en el spike — el
     foco quedaba en <body>.
     Por eso se anota el destino y se enfoca en un efecto, que
     corre después del commit, ya sin inert. */
  const focoPendienteRef = useRef<string | null>(null);

  useEffect(() => {
    if (estado !== "idle") return;
    const destino = focoPendienteRef.current;
    if (destino === null) return;
    focoPendienteRef.current = null;
    enfocarContenido(destino);
  }, [estado, enfocarContenido]);

  const navegar = useCallback(
    async (destino: string) => {
      /* Click repetido durante el cambio: se descarta. No se
         encola ni se cancela lo que ya está en curso. */
      if (estadoRef.current !== "idle") return;
      if (destino === router.state.location.pathname) return;

      const cortina = cortinaRef.current;

      /* Movimiento reducido, o cortina no montada: navegación
         directa. Sin espera artificial. */
      if (!cortina || prefiereMenosMovimiento()) {
        await router.navigate({ to: destino });
        enfocarContenido(destino);
        return;
      }

      const duracion = duracionDeToken("--motion-curtain-phase", 300);
      const suavizado = textoDeToken("--motion-ease", "ease");

      navegacionPropiaRef.current = true;
      cortina.style.background = acentoDe(destino);

      try {
        // --- Fase 1: tapar, de abajo hacia arriba ---
        setEstado("cubriendo");
        cortina.style.transformOrigin = "bottom";
        const subida = cortina.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], {
          duration: duracion,
          easing: suavizado,
          fill: "forwards",
        });
        await conTiempoMaximo(subida.finished, duracion + MS_MARGEN_DE_FASE);
        cortina.style.transform = "scaleY(1)";
        subida.cancel();

        // --- Cambio de ruta, bajo cobertura ---
        setEstado("tapado");
        await conTiempoMaximo(router.navigate({ to: destino }), MS_MAXIMO_DE_ESPERA);

        // --- Fase 2: destapar, siguiendo hacia arriba ---
        setEstado("descubriendo");
        cortina.style.transformOrigin = "top";
        const salida = cortina.animate([{ transform: "scaleY(1)" }, { transform: "scaleY(0)" }], {
          duration: duracion,
          easing: suavizado,
          fill: "forwards",
        });
        await conTiempoMaximo(salida.finished, duracion + MS_MARGEN_DE_FASE);
        cortina.style.transform = "scaleY(0)";
        salida.cancel();
      } catch {
        /* Error de carga: la cortina se abre igual y se ve el
           errorComponent de la ruta. Nunca queda tapando. */
        cortina.getAnimations().forEach((a) => a.cancel());
        cortina.style.transform = "scaleY(0)";
      } finally {
        /* Invariante: pase lo que pase, la cortina termina
           aplastada abajo y sin animaciones colgadas. */
        cortina.getAnimations().forEach((a) => a.cancel());
        cortina.style.transformOrigin = "bottom";
        cortina.style.transform = "scaleY(0)";
        focoPendienteRef.current = destino;
        setEstado("idle");
        navegacionPropiaRef.current = false;
      }
    },
    [router, setEstado, enfocarContenido],
  );

  const ocupada = estado !== "idle";

  return (
    <Contexto.Provider value={{ navegar, estado, ocupada }}>
      {/* `inert` y no `pointer-events: none` en la cortina:
          pointer-events por sí solo deja pasar los clicks a la
          página tapada y además deja el foco alcanzable con Tab.
          React 19 soporta `inert` como booleano. */}
      <div inert={ocupada}>{children}</div>

      <div ref={cortinaRef} aria-hidden="true" className="cortina" />

      <p aria-live="polite" className="solo-lectores">
        {anuncio}
      </p>
    </Contexto.Provider>
  );
}

/* ===========================================================
   El link que dispara la cortina.
   Deliberadamente NO envuelve el <Link> de TanStack: necesita
   ser un <a> real con href para que el navegador conserve
   "abrir en pestaña nueva", "copiar dirección" y la barra de
   estado. La navegación la hacemos nosotros; el href está para
   que el navegador siga siendo el navegador.
   =========================================================== */
export function EnlaceConCortina({
  to,
  children,
  className,
  ...resto
}: {
  to: string;
  children: ReactNode;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const { navegar } = useRouteCurtain();

  /* El spread va PRIMERO: así href y onClick no se pueden pisar
     desde afuera por accidente. */
  return (
    <a
      {...resto}
      href={to}
      className={className}
      onClick={(evento) => {
        resto.onClick?.(evento);
        if (esClickQueNoInterceptamos(evento)) return;
        if (resto.target === "_blank") return;
        evento.preventDefault();
        void navegar(to);
      }}
    >
      {children}
    </a>
  );
}
