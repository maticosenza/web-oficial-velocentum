/* ===========================================================
   LA MANCHA DEL HERO — flotación autónoma y cursor con inercia.

   Escribe cuatro números en el hero y el CSS los reparte. No
   mueve nada por sí mismo: decide, y la hoja dibuja.

   `--mancha-x` · `--mancha-y`   desplazamiento, en px
   `--mancha-rot`                inclinación, en grados
   `--mancha-escala`             escala, sin unidad

   TRES MOVIMIENTOS QUE SE SUMAN, EN TRES CAPAS DISTINTAS
   Este hook resuelve dos de los tres. El tercero —el ascenso por
   scroll— vive en CSS y se alimenta de `--cobertura`, que publica
   `HeroSticky`. Cada movimiento tiene su propio envoltorio en el
   DOM justamente para que CSS y JS nunca escriban el mismo
   `transform`: si compartieran elemento, el último en escribir
   borraría al otro.

   A · FLOTACIÓN AUTÓNOMA
   La mancha deriva sola, sin cursor y sin scroll, mientras el
   hero se vea. Cuatro osciladores de períodos distintos —1.3,
   0.9, 0.7 y 0.5 sobre la misma fase— para que nunca vuelvan a
   coincidir en el mismo punto y el recorrido no se lea como un
   loop corto.

   LA FASE AVANZA POR TIEMPO, NO POR CUADRO. El controlador
   original sumaba 0.015 por tick a 60Hz. Copiar eso tal cual haría
   que en una pantalla de 120Hz la mancha flotara al doble de
   velocidad. Acá avanza 0.9 por segundo, que es lo mismo a 60Hz y
   sigue siendo lo mismo a 120.

   B · CURSOR CON INERCIA
   El objetivo se calcula contra el rectángulo de `.b1`, no contra
   la ventana: lo que importa es dónde está el puntero respecto
   del hero. Y se mide contra el rectángulo ESTABLE, o sea el del
   contenedor sin animar — medirlo contra la capa que ya se mueve
   sería realimentar el movimiento con su propio resultado.

   Fuera del hero, o fuera del radio de influencia, el objetivo
   decae a cero en vez de cortarse: la mancha vuelve sola, sin
   saltos, y la flotación sigue corriendo por debajo.

   LAS TASAS TAMBIÉN SE NORMALIZAN POR TIEMPO. El original
   interpolaba el 50% de la diferencia por tick y decaía al 90%
   por tick. Ambas cosas dependen de la frecuencia de cuadro, así
   que acá se convierten a su equivalente por segundo.

   CUÁNDO SE PAUSA, Y POR QUÉ NO ALCANZA CON `IntersectionObserver`
   El hero es `sticky`: mientras B2 lo tapa sigue intersectando, o
   sea que el observer lo da por visible aunque no se vea nada. Por
   eso además se mira `--cobertura`, y con el hero tapado la fase
   deja de avanzar y no se escribe nada. Al destaparse retoma
   desde donde quedó, sin salto.

   Con la pestaña oculta se cancela el cuadro pendiente. El bucle
   anterior no cancelaba nada al desmontar: acá se guarda el id y
   se cancela.

   DÓNDE NO VA
   - Movimiento reducido: no se anota nada, las variables quedan
     sin definir y el CSS cae en sus respaldos. La textura queda
     quieta en un encuadre legible. Se reacciona si la preferencia
     cambia en caliente.
   - Sin `(hover: hover) and (pointer: fine)`: no se escucha
     `pointermove`. En táctil no hay cursor que seguir, y la
     flotación sigue corriendo igual.
   =========================================================== */

import { useEffect, type RefObject } from "react";

/* --- Flotación --- */
const FASE_POR_SEGUNDO = 0.9;
const FLOTAR_X = 45; // px
const FLOTAR_Y = 27; // px
const FLOTAR_ROT = 3; // grados
const FLOTAR_ESCALA = 0.03; // 1 ± esto

/* --- Cursor --- */
const FUERZA = 300; // px a fondo de escala
const RADIO = 600; // px de influencia desde el centro del hero
const ACERCARSE_POR_TICK = 0.5; // a 60Hz
const DECAER_POR_TICK = 0.9; // a 60Hz

/* Cada cuántos cuadros se refrescan el rectángulo del hero y la
   cobertura. Son lecturas de layout: no hacen falta por cuadro. */
const CADA = 12;
/* Desde acá se considera al hero tapado por B2. */
const TAPADO = 0.985;

export function useParallaxDelHero(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqPuntero = window.matchMedia("(hover: hover) and (pointer: fine)");

    let cuadro = 0;
    let limpiarActivo: (() => void) | null = null;

    /* Todo el ciclo de vida del bucle vive acá adentro, para poder
       apagarlo y volver a montarlo si cambia la preferencia de
       movimiento sin duplicar listeners. */
    const activar = () => {
      let fase = 0;
      let ultimo = 0;
      let cuenta = 0;

      let objetivoX = 0;
      let objetivoY = 0;
      let x = 0;
      let y = 0;

      let punteroX = 0;
      let punteroY = 0;
      let hayPuntero = false;

      let caja = nodo.getBoundingClientRect();
      let tapado = false;
      let visible = true;

      const leerCobertura = () => {
        const crudo = getComputedStyle(nodo).getPropertyValue("--cobertura").trim();
        const v = Number.parseFloat(crudo);
        return Number.isFinite(v) ? v : 0;
      };

      const paso = (ahora: number) => {
        cuadro = 0;
        const dt = ultimo ? Math.min((ahora - ultimo) / 1000, 0.1) : 0;
        ultimo = ahora;

        /* Lecturas de layout espaciadas: no hacen falta por cuadro
           y forzarían un recálculo de estilo cada vez. */
        if (cuenta % CADA === 0) {
          caja = nodo.getBoundingClientRect();
          tapado = leerCobertura() >= TAPADO;
        }
        cuenta++;

        /* Tapado por B2: la fase NO avanza y no se escribe nada.
           Al destaparse retoma desde donde quedó. */
        if (!tapado) {
          fase += FASE_POR_SEGUNDO * dt;

          if (hayPuntero && caja.width > 0 && caja.height > 0) {
            const cx = caja.left + caja.width / 2;
            const cy = caja.top + caja.height / 2;
            const dx = punteroX - cx;
            const dy = punteroY - cy;
            /* Fuera del radio de influencia el objetivo se apaga,
               aunque el puntero siga dentro del hero. */
            if (Math.hypot(dx, dy) <= RADIO) {
              objetivoX = (dx / caja.width) * FUERZA;
              objetivoY = (dy / caja.height) * FUERZA;
            } else {
              objetivoX *= Math.pow(DECAER_POR_TICK, dt * 60);
              objetivoY *= Math.pow(DECAER_POR_TICK, dt * 60);
            }
          } else {
            objetivoX *= Math.pow(DECAER_POR_TICK, dt * 60);
            objetivoY *= Math.pow(DECAER_POR_TICK, dt * 60);
          }

          const acercar = 1 - Math.pow(1 - ACERCARSE_POR_TICK, dt * 60);
          x += (objetivoX - x) * acercar;
          y += (objetivoY - y) * acercar;

          const fx = Math.sin(fase * 1.3) * FLOTAR_X + x;
          const fy = Math.cos(fase * 0.9) * FLOTAR_Y + y;
          const rot = Math.sin(fase * 0.7) * FLOTAR_ROT;
          const esc = 1 + Math.sin(fase * 0.5) * FLOTAR_ESCALA;

          nodo.style.setProperty("--mancha-x", `${fx.toFixed(2)}px`);
          nodo.style.setProperty("--mancha-y", `${fy.toFixed(2)}px`);
          nodo.style.setProperty("--mancha-rot", `${rot.toFixed(3)}deg`);
          nodo.style.setProperty("--mancha-escala", esc.toFixed(4));
        }

        cuadro = requestAnimationFrame(paso);
      };

      const arrancar = () => {
        if (cuadro || !visible) return;
        ultimo = 0; // sin salto: el primer dt vuelve a ser 0
        cuadro = requestAnimationFrame(paso);
      };

      const frenar = () => {
        if (!cuadro) return;
        cancelAnimationFrame(cuadro);
        cuadro = 0;
      };

      const alMover = (e: PointerEvent) => {
        punteroX = e.clientX;
        punteroY = e.clientY;
        /* Sólo cuenta mientras el puntero está sobre el hero. */
        hayPuntero =
          e.clientX >= caja.left &&
          e.clientX <= caja.right &&
          e.clientY >= caja.top &&
          e.clientY <= caja.bottom;
      };

      const alSalir = () => {
        hayPuntero = false;
      };

      const alCambiarVisibilidad = () => {
        if (document.visibilityState === "hidden") frenar();
        else arrancar();
      };

      const observador = new IntersectionObserver(
        ([entrada]) => {
          visible = Boolean(entrada?.isIntersecting);
          if (visible) arrancar();
          else frenar();
        },
        { threshold: 0 },
      );
      observador.observe(nodo);

      if (mqPuntero.matches) {
        window.addEventListener("pointermove", alMover, { passive: true });
        document.addEventListener("pointerleave", alSalir);
        window.addEventListener("blur", alSalir);
      }
      document.addEventListener("visibilitychange", alCambiarVisibilidad);

      arrancar();

      return () => {
        frenar();
        observador.disconnect();
        window.removeEventListener("pointermove", alMover);
        document.removeEventListener("pointerleave", alSalir);
        window.removeEventListener("blur", alSalir);
        document.removeEventListener("visibilitychange", alCambiarVisibilidad);
        for (const v of ["--mancha-x", "--mancha-y", "--mancha-rot", "--mancha-escala"]) {
          nodo.style.removeProperty(v);
        }
      };
    };

    const evaluarPreferencia = () => {
      if (mqReduce.matches) {
        limpiarActivo?.();
        limpiarActivo = null;
        return;
      }
      if (!limpiarActivo) limpiarActivo = activar();
    };

    evaluarPreferencia();
    mqReduce.addEventListener("change", evaluarPreferencia);

    return () => {
      mqReduce.removeEventListener("change", evaluarPreferencia);
      limpiarActivo?.();
      limpiarActivo = null;
    };
  }, [ref]);
}
