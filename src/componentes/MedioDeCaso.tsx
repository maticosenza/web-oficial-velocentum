/* ===========================================================
   MedioDeCaso — la pieza de cada caso, imagen o video.

   Lo usan Casos y B3, contra el mismo dato: el medio de un cliente
   es el mismo mire donde se mire.

   ES DECORATIVO, Y POR ESO `alt=""`
   Al lado va el nombre del cliente, su rubro y la frase de qué
   hicimos. Un texto alternativo acá repetiría eso mismo o
   describiría el plano, que no es información que el bloque esté
   dando. Cuando existan descripciones escritas por alguien que vio
   las piezas, entran por `data/casos.ts` y esto cambia.

   EL VIDEO NO ARRANCA POR ATRIBUTO, ARRANCA POR CÓDIGO
   No lleva `autoPlay`. Si lo llevara, empezaría a reproducir antes
   de que corriera el efecto que consulta `prefers-reduced-motion`,
   así que quien pidió no ver movimiento vería el primer tirón
   igual. Acá no se reproduce nada hasta que el código decide que
   corresponde. Sin JavaScript queda el póster fijo, que es la
   degradación correcta.

   Y SÓLO REPRODUCE EN CUADRO
   Un `IntersectionObserver` lo arranca al entrar y lo pausa al
   salir. No es sólo cortesía: con `preload="none"`, el archivo
   recién se baja cuando hace falta. Son ocho casos en siete
   pantallas y el de Ilsapore pesa 771 KB — sin esto, los tres
   videos se bajarían al abrir la página aunque el visitante no
   llegue nunca al quinto caso.

   `muted` no es decorativo tampoco: sin él, ningún navegador deja
   arrancar un video solo.
   =========================================================== */

import { useEffect, useRef, useState } from "react";

import type { Medio } from "../data/casos";

/* CUÁNTO ANTES SE EMPIEZA A BAJAR EL ARCHIVO.
   500px por arriba y por abajo del viewport: alcanza para que el
   medio esté listo cuando entra en cuadro, y no tanto como para
   volver a bajar media lista de una. */
const MARGEN_CERCANIA = "500px 0px";

/* `loading="lazy"` y `preload="none"` son PISTAS, no garantías: el
   navegador igual adelanta lo que cree cercano, y en Casos eso
   significaba bajar el primer MP4 (~449 KB) y varias imágenes antes
   de que nadie las vea. Así que el `src` directamente no existe
   hasta que el elemento se acerca. La caja ya está reservada por el
   `aspect-ratio` del CSS, así que no hay salto ni hueco. */
function useCercaDelViewport(prioritario: boolean, anticipado: boolean, margenCercania: string) {
  const ref = useRef<HTMLElement | null>(null);
  const [cerca, setCerca] = useState(prioritario || anticipado);

  useEffect(() => {
    if (prioritario || anticipado) return;
    const el = ref.current;
    if (!el) return;

    const observador = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setCerca(true);
          observador.disconnect();
        }
      },
      { rootMargin: margenCercania },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, [prioritario, anticipado, margenCercania]);

  return { ref, cerca };
}

export function MedioDeCaso({
  medio,
  className,
  /** El primero de la lista precarga; el resto no. */
  prioritario = false,
  /** Permite anticipar una galeria animada sin volver eager toda la pagina. */
  margenCercania = MARGEN_CERCANIA,
  /** Carga desde el montaje con prioridad baja; útil para contenido bajo el hero. */
  anticipado = false,
}: {
  medio: Medio;
  className?: string;
  prioritario?: boolean;
  margenCercania?: string;
  anticipado?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const { ref: refCercania, cerca } = useCercaDelViewport(prioritario, anticipado, margenCercania);

  useEffect(() => {
    const v = ref.current;
    if (!v || !cerca) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enCuadro = false;

    const decidir = () => {
      if (mq.matches || !enCuadro) {
        v.pause();
        return;
      }
      /* `play()` devuelve una promesa que se rechaza si el
         navegador decide no dejarlo arrancar. No es un error que
         haya que reportar: el póster ya está puesto. */
      void v.play().catch(() => {});
    };

    const observador = new IntersectionObserver(
      ([e]) => {
        enCuadro = Boolean(e?.isIntersecting);
        decidir();
      },
      { threshold: 0.1 },
    );
    observador.observe(v);
    mq.addEventListener("change", decidir);

    return () => {
      observador.disconnect();
      mq.removeEventListener("change", decidir);
      v.pause();
    };
  }, [medio, cerca]);

  if (medio.tipo === "imagen") {
    return (
      <img
        ref={refCercania as React.RefObject<HTMLImageElement>}
        className={className}
        {...(cerca ? { src: medio.archivo } : {})}
        alt=""
        loading={prioritario || anticipado ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={prioritario ? "high" : "low"}
      />
    );
  }

  return (
    <video
      ref={(nodo) => {
        ref.current = nodo;
        refCercania.current = nodo;
      }}
      className={className}
      {...(cerca ? { src: medio.archivo } : {})}
      /* Los tres posters juntos pesan apenas 124 KB. Dejarlos siempre
         disponibles evita que un caso muestre el campo vacio mientras
         espera al observer; el MP4 sigue cargando solo al acercarse. */
      poster={medio.poster}
      muted
      loop
      playsInline
      preload={prioritario || anticipado ? "metadata" : "none"}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
