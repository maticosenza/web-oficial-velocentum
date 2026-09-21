/* ===========================================================
   LA MANCHA DEL HERO — flotación autónoma.

   Escribe cuatro números en el hero y el CSS los reparte. No
   mueve nada por sí mismo: decide, y la hoja dibuja.

   `--mancha-x` · `--mancha-y`   desplazamiento, en px
   `--mancha-rot`                inclinación, en grados
   `--mancha-escala`             escala, sin unidad

   DOS MOVIMIENTOS QUE SE SUMAN, EN CAPAS DISTINTAS
   Este hook resuelve la flotación. El ascenso por scroll vive en
   CSS y se alimenta de `--cobertura`, que publica
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

   B · SIN RESPUESTA AL CURSOR
   El movimiento es ambiental y no depende de dónde esté el
   puntero. Con puntero fino corre este controlador. En táctil la
   hoja de estilos reproduce una deriva equivalente directamente
   en el compositor, sin escrituras de JS por cuadro.

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
   No se registra ningún listener de puntero.
   =========================================================== */

import { useEffect, type RefObject } from "react";

import { esSafariDeEscritorio } from "./navegador";

/* --- Flotación --- */
const FASE_POR_SEGUNDO = 0.9;
const FLOTACION_DESKTOP = { x: 60, y: 36, rotacion: 3.4, escala: 0.035 };

/* Cada cuántos cuadros se refresca la cobertura. La lectura de
   estilos no hace falta en cada cuadro. */
const CADA = 12;
/* Desde acá se considera al hero tapado por B2. */
const TAPADO = 0.985;

export function useParallaxDelHero(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    /* En pantallas táctiles la misma flotación vive como keyframes
       CSS sobre la capa transformada. Es una animación de compositor:
       evita escribir cuatro custom properties en el hero en cada
       refresco de una pantalla de 120 Hz mientras el usuario scrollea. */
    const mqPunteroFino = window.matchMedia("(hover: hover) and (pointer: fine)");

    /* Safari paga caro cuatro escrituras de custom properties por cuadro,
       sobre todo mientras también está resolviendo sticky y video. Allí la
       misma deriva vive como keyframes en el compositor. */
    if (esSafariDeEscritorio() && !mqReduce.matches) {
      nodo.dataset.motorMancha = "compositor";
      const observador = new IntersectionObserver(
        ([entrada]) => {
          nodo.dataset.manchaActiva = entrada?.isIntersecting ? "sí" : "no";
        },
        { rootMargin: "25% 0px" },
      );
      observador.observe(nodo);
      return () => {
        observador.disconnect();
        delete nodo.dataset.motorMancha;
        delete nodo.dataset.manchaActiva;
      };
    }

    let cuadro = 0;
    let limpiarActivo: (() => void) | null = null;

    /* Todo el ciclo de vida del bucle vive acá adentro, para poder
       apagarlo y volver a montarlo si cambia la preferencia de
       movimiento sin duplicar listeners. */
    const activar = () => {
      let fase = 0;
      let ultimo = 0;
      let cuenta = 0;

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

        /* Lectura de estilos espaciada: no hace falta por cuadro. */
        if (cuenta % CADA === 0) {
          tapado = leerCobertura() >= TAPADO;
        }
        cuenta++;

        /* Tapado por B2: la fase NO avanza y no se escribe nada.
           Al destaparse retoma desde donde quedó. */
        if (!tapado) {
          fase += FASE_POR_SEGUNDO * dt;

          const amplitud = FLOTACION_DESKTOP;
          const fx = Math.sin(fase * 1.3) * amplitud.x;
          const fy = Math.cos(fase * 0.9) * amplitud.y;
          const rot = Math.sin(fase * 0.7) * amplitud.rotacion;
          const esc = 1 + Math.sin(fase * 0.5) * amplitud.escala;

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

      document.addEventListener("visibilitychange", alCambiarVisibilidad);

      arrancar();

      return () => {
        frenar();
        observador.disconnect();
        document.removeEventListener("visibilitychange", alCambiarVisibilidad);
        for (const v of ["--mancha-x", "--mancha-y", "--mancha-rot", "--mancha-escala"]) {
          nodo.style.removeProperty(v);
        }
      };
    };

    const evaluarPreferencia = () => {
      if (mqReduce.matches || !mqPunteroFino.matches) {
        limpiarActivo?.();
        limpiarActivo = null;
        return;
      }
      if (!limpiarActivo) limpiarActivo = activar();
    };

    evaluarPreferencia();
    mqReduce.addEventListener("change", evaluarPreferencia);
    mqPunteroFino.addEventListener("change", evaluarPreferencia);

    return () => {
      mqReduce.removeEventListener("change", evaluarPreferencia);
      mqPunteroFino.removeEventListener("change", evaluarPreferencia);
      limpiarActivo?.();
      limpiarActivo = null;
    };
  }, [ref]);
}
