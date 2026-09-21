/* ===========================================================
   ServiceStack — apilado sticky con movimiento de compositor.

   La tarjeta siguiente empuja visualmente a la anterior: cuando
   entra desde el pie de la ventana, la anterior se hunde hasta
   0.7 y gira 10 grados. Es la misma mecánica observada en la
   referencia de Lofty. Un único listener mide toda la pila y un
   único resorte actualiza sólo las capas que realmente se mueven.
   =========================================================== */

import { Children, useEffect, useRef, type ReactNode } from "react";

import { prefiereMenosMovimiento } from "../lib/tokens";

const RIGIDEZ = 500;
const AMORTIGUACION = 60;
const ESCALA_SALIDA = 0.7;
const GIRO_SALIDA = 10;

type Resorte = { valor: number; velocidad: number; objetivo: number };

function limitar(valor: number) {
  return Math.min(1, Math.max(0, valor));
}

function useMovimientoDePila(ref: React.RefObject<HTMLDivElement | null>, activo: boolean) {
  useEffect(() => {
    const pila = ref.current;
    if (!pila || !activo || prefiereMenosMovimiento()) return;

    const huecos = Array.from(pila.querySelectorAll<HTMLElement>(".pila-sticky__hueco"));
    const salidas = Array.from(pila.querySelectorAll<HTMLElement>(".pila-sticky__salida"));
    const entradas = Array.from(pila.querySelectorAll<HTMLElement>(".pila-sticky__giro"));
    const resortesSalida: Resorte[] = salidas.map(() => ({
      valor: 0,
      velocidad: 0,
      objetivo: 0,
    }));
    const resortesEntrada: Resorte[] = entradas.map(() => ({
      valor: 0,
      velocidad: 0,
      objetivo: 0,
    }));

    let cerca = false;
    let cuadro = 0;
    let ultimoTiempo = 0;

    const medir = () => {
      if (!cerca) return;
      const alto = window.innerHeight || 1;

      huecos.forEach((hueco, indice) => {
        const caja = hueco.getBoundingClientRect();
        const recorridoEntrada = Math.max(1, alto * 0.22);
        resortesEntrada[indice].objetivo = limitar((alto - caja.top) / recorridoEntrada);

        const siguiente = huecos[indice + 1];
        if (!siguiente) return;
        const topeSticky = Number.parseFloat(getComputedStyle(hueco).top) || 0;
        const recorridoSalida = Math.max(1, alto - topeSticky);
        resortesSalida[indice].objetivo = limitar(
          (alto - siguiente.getBoundingClientRect().top) / recorridoSalida,
        );
      });

      iniciar();
    };

    const pintar = (tiempo: number) => {
      const dt = ultimoTiempo ? Math.min((tiempo - ultimoTiempo) / 1000, 0.032) : 1 / 60;
      ultimoTiempo = tiempo;
      let moviendose = false;

      const avanzar = (resorte: Resorte) => {
        const aceleracion =
          RIGIDEZ * (resorte.objetivo - resorte.valor) - AMORTIGUACION * resorte.velocidad;
        resorte.velocidad += aceleracion * dt;
        resorte.valor += resorte.velocidad * dt;

        if (
          Math.abs(resorte.objetivo - resorte.valor) < 0.0005 &&
          Math.abs(resorte.velocidad) < 0.002
        ) {
          resorte.valor = resorte.objetivo;
          resorte.velocidad = 0;
        } else {
          moviendose = true;
        }
      };

      resortesSalida.forEach((resorte, indice) => {
        avanzar(resorte);
        const progreso = limitar(resorte.valor);
        const escala = 1 - (1 - ESCALA_SALIDA) * progreso;
        salidas[indice].style.transform =
          `translate3d(0, 0, 0) rotate(${(GIRO_SALIDA * progreso).toFixed(3)}deg) scale(${escala.toFixed(4)})`;
      });

      resortesEntrada.forEach((resorte, indice) => {
        avanzar(resorte);
        const progreso = limitar(resorte.valor);
        entradas[indice].style.transform =
          `translate3d(0, ${(20 * (1 - progreso)).toFixed(3)}px, 0) scale(${(0.9 + 0.1 * progreso).toFixed(4)})`;
      });

      if (moviendose && cerca) {
        cuadro = requestAnimationFrame(pintar);
      } else {
        cuadro = 0;
        ultimoTiempo = 0;
      }
    };

    function iniciar() {
      if (!cuadro) cuadro = requestAnimationFrame(pintar);
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        cerca = Boolean(entrada?.isIntersecting);
        pila.dataset.movimiento = cerca ? "activo" : "inactivo";
        if (cerca) medir();
        else if (cuadro) {
          cancelAnimationFrame(cuadro);
          cuadro = 0;
          ultimoTiempo = 0;
        }
      },
      { rootMargin: "100% 0px" },
    );

    observador.observe(pila);
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    medir();

    return () => {
      observador.disconnect();
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
      if (cuadro) cancelAnimationFrame(cuadro);
      delete pila.dataset.movimiento;
      [...salidas, ...entradas].forEach((elemento) => elemento.style.removeProperty("transform"));
    };
  }, [ref, activo]);
}

export function ServiceStack({
  children,
  offset,
  girar = true,
}: {
  children: ReactNode;
  /** Alto al que se fija cada tarjeta. Por defecto, el del sistema. */
  offset?: string;
  /** Conserva la API previa: el ángulo ahora replica la referencia. */
  angulo?: string;
  girar?: boolean;
}) {
  const pilaRef = useRef<HTMLDivElement>(null);
  const hijos = Children.toArray(children);
  useMovimientoDePila(pilaRef, girar);

  return (
    <div
      ref={pilaRef}
      className="pila-sticky"
      style={offset ? ({ "--pila-offset": offset } as React.CSSProperties) : undefined}
    >
      {hijos.map((hijo, indice) => (
        <div
          className="pila-sticky__hueco"
          style={{ "--capa": indice + 1 } as React.CSSProperties}
          key={indice}
        >
          <div className="pila-sticky__salida">
            <div className="pila-sticky__giro">{hijo}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
