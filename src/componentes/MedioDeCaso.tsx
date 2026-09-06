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

import { useEffect, useRef } from "react";

import type { Medio } from "../data/casos";

export function MedioDeCaso({
  medio,
  className,
  /** El primero de la lista precarga; el resto no. */
  prioritario = false,
}: {
  medio: Medio;
  className?: string;
  prioritario?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

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
  }, [medio]);

  if (medio.tipo === "imagen") {
    return (
      <img
        className={className}
        src={medio.archivo}
        alt=""
        loading={prioritario ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  return (
    <video
      ref={ref}
      className={className}
      src={medio.archivo}
      poster={medio.poster}
      muted
      loop
      playsInline
      preload={prioritario ? "metadata" : "none"}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
