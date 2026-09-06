/* ===========================================================
   B4 · NUESTROS SERVICIOS

   El bloque más importante de la página. Cuatro tarjetas
   apiladas con ServiceStack: cada una se fija arriba y la
   siguiente se desliza por encima.

   CUATRO TARJETAS, NO CINCO
   La referencia tiene cinco servicios; acá son cuatro motores.
   Con cuatro el apilado funciona igual. Bajo tres perdería el
   efecto, así que cuatro es el piso cómodo, no el techo.

   UN ACENTO POR TARJETA, EN ORDEN
   acento-1 → 2 → 3 → 4. El par `--acento` / `--sobre` viaja
   junto: el plan dice que usar un acento sin su color de texto
   no es una opción, y acá los dos se escriben en el mismo lugar
   para que olvidarse de uno sea difícil.

   Observación registrada: esos cuatro acentos son también los
   colores de las cuatro páginas en el nav y en los rectángulos
   del footer. La paleta tiene cinco y el quinto está tomado por
   los ciclos, así que la coincidencia es inevitable mientras el
   color de servicio salga de la misma paleta. No es un error;
   queda dicho por si más adelante molesta.

   LAS TARJETAS NO VAN ENVUELTAS EN Reveal
   Reveal anima `opacity` y `transform`. Las dos cosas rompen
   este bloque:
   - `opacity` menor a 1 sobre una tarjeta hace que se vea la de
     abajo mientras entra, y el apilado exige fondo 100% opaco.
   - `transform` genera contexto de apilado y pelea con el
     `z-index` creciente de la pila.
   El titular y la bajada sí usan Reveal: están fuera de la pila.
   La entrada de las tarjetas ya la da el giro de ServiceStack,
   que está atado al scroll y es reversible.

   SIN BORDE DE ONDA
   El hilo conductor de la nube pasa por B2, B3, B7, B8 y B9.
   B4 no está en esa lista: va sobre el fondo de página.
   =========================================================== */

import type { CSSProperties } from "react";

import { ServiceStack } from "../componentes/ServiceStack";
import { Reveal } from "../componentes/Reveal";

/* PENDIENTE: los 16 entregables (4 por tarjeta) están sin
   confirmar operativamente. Se construye con un marcador de
   posición explícito, igual que el CTA del hero: antes que
   inventar cuatro afirmaciones sobre lo que la agencia entrega,
   el bloque dice que faltan.

   El largo no es casual. El presupuesto da 34 caracteres por
   entregable y este marcador tiene 36: entra apenas por encima
   del techo, así el layout queda probado en el peor caso y el
   copy real después entra sin mover nada. */
const ENTREGABLE_PENDIENTE = "Pendiente · entregable sin confirmar";

type Servicio = {
  n: string;
  nombre: string;
  bajada: string;
  acento: string;
  sobre: string;
};

/* Los cuatro motores. Nombres y bajadas están `[APROBADO]` en
   `docs/plan/02_paginas/02_HOME_copy.md`. */
const SERVICIOS: Servicio[] = [
  {
    n: "01",
    nombre: "Estrategia",
    bajada: "Definimos a dónde vamos y con qué prioridad.",
    acento: "var(--acento-1)",
    sobre: "var(--texto-sobre-1)",
  },
  {
    n: "02",
    nombre: "Creatividad",
    bajada: "Convertimos una idea en muchas piezas que compiten.",
    acento: "var(--acento-2)",
    sobre: "var(--texto-sobre-2)",
  },
  {
    n: "03",
    nombre: "Adquisición",
    bajada: "Llevamos esas piezas al mercado y compramos atención.",
    acento: "var(--acento-3)",
    sobre: "var(--texto-sobre-3)",
  },
  {
    n: "04",
    nombre: "Web & Conversión",
    bajada: "Ordenamos lo que pasa después del clic.",
    acento: "var(--acento-4)",
    sobre: "var(--texto-sobre-4)",
  },
];

export function B4Servicios() {
  return (
    <section className="b4" aria-labelledby="b4-titulo">
      <div className="b4__contenido contenido">
        <Reveal as="h2" indice={0} id="b4-titulo" className="b4__titular">
          Qué hacemos
        </Reveal>

        <Reveal indice={1} className="b4__bajada">
          <p className="b4__bajada-texto">
            Un equipo. Cuatro motores funcionando juntos. Cada motor tiene su oficio, y la medición
            los atraviesa a todos.
          </p>
          {/* Dicho una vez para todo el bloque, en vez de repetirlo
              en las dieciséis filas: con lector de pantalla,
              dieciséis avisos idénticos tapan el contenido real. */}
          <p className="etiqueta etiqueta--apagada b4__pendiente">
            Pendiente · los 16 entregables están sin confirmar. Los de abajo son marcadores de
            posición.
          </p>
        </Reveal>
      </div>

      <div className="b4__pila contenido">
        <ServiceStack>
          {SERVICIOS.map((s) => (
            <article
              key={s.n}
              className="b4-tarjeta"
              /* Fondo 100% opaco. No es estética: con
                 transparencia el apilado deja ver la tarjeta de
                 abajo y el efecto se arruina. */
              style={{ "--acento": s.acento, "--sobre": s.sobre } as CSSProperties}
            >
              <div className="b4-tarjeta__texto">
                <p className="etiqueta b4-tarjeta__n">{s.n}</p>
                <h3 className="b4-tarjeta__nombre">{s.nombre}</h3>
                <p className="b4-tarjeta__bajada">{s.bajada}</p>

                {/* `ol` porque el orden es parte del contenido, y
                    `role="list"` porque Safari le saca la semántica
                    de lista a cualquier lista con `list-style:
                    none`. El numeral va `aria-hidden`: la lista ya
                    comunica la posición, y sin esto el lector dice
                    el número dos veces. */}
                <ol className="b4-tarjeta__entregables" role="list">
                  {["01", "02", "03", "04"].map((e) => (
                    <li key={e} className="b4-tarjeta__entregable">
                      <span className="etiqueta b4-tarjeta__entregable-n" aria-hidden="true">
                        {e}
                      </span>
                      <span className="b4-tarjeta__entregable-texto">{ENTREGABLE_PENDIENTE}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* PENDIENTE: las cuatro imágenes verticales no
                  existen. Va el marco con la proporción, y el
                  nombre accesible dice de qué tarjeta es para que
                  no suenen los cuatro iguales. */}
              <div
                className="b4-tarjeta__medio"
                role="img"
                aria-label={`Marco reservado para la imagen vertical de ${s.nombre}. La imagen real todavía no existe.`}
              >
                <p className="etiqueta b4-tarjeta__medio-nota">Imagen pendiente</p>
              </div>
            </article>
          ))}
        </ServiceStack>
      </div>
    </section>
  );
}
