/* ===========================================================
   B6 · NUESTRO PROCESO

   Titular centrado y cuatro tarjetas: número arriba, objeto
   grande al centro, título y bajada de dos líneas abajo.
   No se toca `/metodo`: acá va la versión corta.

   TARJETAS DE COLOR PLENO, CON EL OBJETO EN UN CONTENEDOR CLARO
   Cada tarjeta lleva un acento en el orden normal —1, 2, 3, 4—
   con su `--texto-sobre-N`. Sin reordenar nada.

   El objeto va adentro de un círculo claro, del mismo crema que
   el fondo de la página. Eso es lo que resuelve el contraste, y
   es la razón por la que los acentos pueden ir en orden:

   Los cuatro objetos tienen color propio —foco azul, barras
   verde, conexión violeta, rayo amarillo— y sobre un campo de
   color se pelean con él. Medido, el mejor reparto posible de
   acentos deja un peor par de 2.27, porque estos acentos cambian
   de tono pero no de claridad; y con el acento en orden, el foco
   azul cae sobre el azul y directamente desaparece (1.00).

   El contenedor saca el problema del medio: el objeto deja de
   apoyarse en el color de la tarjeta y vuelve al crema, que es
   donde ya se veía bien antes de que las tarjetas tuvieran
   fondo. No agrega nada al plan: la spec de B6 ya pedía un
   contenedor de 150×150, y sólo faltaba que tuviera color.

   LOS OBJETOS VAN POR SIGNIFICADO, NO POR ADORNO
   `01_sistema/identidad.md` le da un significado a cada uno:

   | Objeto   | Significado            |
   |----------|------------------------|
   | Foco     | Entender, diagnosticar |
   | Barras   | Medir y proyectar      |
   | Conexión | Coordinar disciplinas  |
   | Rayo     | Activar una prioridad  |

   Tres de los cuatro pasos tienen su objeto exacto:
   Preguntamos → foco, Medimos → barras, Recomendamos → rayo
   ("un plan con presupuesto y **prioridad**").

   ⚠ EL TERCERO NO CIERRA, Y CONVIENE SABERLO
   `Proyectamos` querría barras, porque el significado de barras
   es "medir **y proyectar**": los pasos 02 y 03 se pelean el
   mismo objeto. Repetirlo en una fila de cuatro se leería como
   un error, así que al 03 le toca conexión, que es el que queda
   y el que peor encaja: "coordinar disciplinas" no es proyectar.
   Es la asignación menos mala, no una buena. Si aparece un
   quinto objeto, o si se prefiere repetir barras, se cambia acá.

   Los cuatro objetos son decorativos: el significado está en el
   número, el título y la bajada, que son texto. Por eso van
   `aria-hidden` y con `alt` vacío.
   =========================================================== */

import type { CSSProperties } from "react";

import { Reveal } from "../componentes/Reveal";

type Paso = {
  n: string;
  titulo: string;
  bajada: string;
  objeto: string;
  acento: string;
  sobre: string;
};

const PASOS: Paso[] = [
  {
    n: "01",
    titulo: "Preguntamos",
    bajada: "Qué vendés, a qué margen y con qué costos.",
    objeto: "/assets/foco.png",
    acento: "var(--acento-1)",
    sobre: "var(--texto-sobre-1)",
  },
  {
    n: "02",
    titulo: "Medimos",
    bajada: "Dónde se frena el crecimiento.",
    objeto: "/assets/barras.png",
    acento: "var(--acento-2)",
    sobre: "var(--texto-sobre-2)",
  },
  {
    n: "03",
    titulo: "Proyectamos",
    bajada: "Qué pasa si se corrigen esas fugas.",
    objeto: "/assets/conexion.png",
    acento: "var(--acento-3)",
    sobre: "var(--texto-sobre-3)",
  },
  {
    n: "04",
    titulo: "Recomendamos",
    bajada: "Un plan con presupuesto y prioridad. Escrito.",
    objeto: "/assets/rayo.png",
    acento: "var(--acento-4)",
    sobre: "var(--texto-sobre-4)",
  },
];

export function B6Proceso() {
  return (
    <section className="b6" aria-labelledby="b6-titulo">
      <div className="b6__contenido contenido">
        <Reveal as="h2" indice={0} id="b6-titulo" className="b6__titular">
          Nuestro proceso
        </Reveal>

        <ol className="b6__pasos" role="list">
          {PASOS.map((p, i) => (
            <Reveal
              as="li"
              key={p.n}
              indice={i + 1}
              className="b6-paso"
              style={{ "--acento": p.acento, "--sobre": p.sobre } as CSSProperties}
            >
              {/* El número es dato, no decoración: es el orden del
                  método y se lee. La lista es `ol` por lo mismo. */}
              <p className="etiqueta b6-paso__n">{p.n}</p>

              <div className="b6-paso__objeto">
                <img
                  src={p.objeto}
                  alt=""
                  aria-hidden="true"
                  width={1254}
                  height={1254}
                  loading="lazy"
                />
              </div>

              <h3 className="b6-paso__titulo">{p.titulo}</h3>
              <p className="b6-paso__bajada">{p.bajada}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
