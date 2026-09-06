/* ===========================================================
   B6 · NUESTRO PROCESO

   Titular centrado y cuatro tarjetas: número arriba, objeto
   grande al centro, título y bajada de dos líneas abajo.
   No se toca `/metodo`: acá va la versión corta.

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

import { Reveal } from "../componentes/Reveal";

type Paso = {
  n: string;
  titulo: string;
  bajada: string;
  objeto: string;
};

const PASOS: Paso[] = [
  {
    n: "01",
    titulo: "Preguntamos",
    bajada: "Qué vendés, a qué margen y con qué costos.",
    objeto: "/assets/foco.png",
  },
  {
    n: "02",
    titulo: "Medimos",
    bajada: "Dónde se frena el crecimiento.",
    objeto: "/assets/barras.png",
  },
  {
    n: "03",
    titulo: "Proyectamos",
    bajada: "Qué pasa si se corrigen esas fugas.",
    objeto: "/assets/conexion.png",
  },
  {
    n: "04",
    titulo: "Recomendamos",
    bajada: "Un plan con presupuesto y prioridad. Escrito.",
    objeto: "/assets/rayo.png",
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
            <Reveal as="li" key={p.n} indice={i + 1} className="b6-paso">
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
