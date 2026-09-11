/* ===========================================================
   B6 · NUESTRO PROCESO

   Titular centrado y tres tarjetas: número arriba, objeto
   grande al centro, título y bajada de dos líneas abajo.
   No se toca `/metodo`: acá va la versión corta.

   TARJETAS DE COLOR PLENO, CON OBJETOS 3D SOBRE ALFA REAL
   Cada tarjeta lleva un acento en el orden normal —1, 2, 3—
   con su `--texto-sobre-N`. Sin reordenar nada.

   Cada objeto combina volúmenes brillantes y piezas de cristal:
   lente para diagnosticar, progresión para proyectar y flecha
   para ejecutar. Los WebP conservan transparencia real y se
   apoyan directamente sobre el campo de cada tarjeta.

   Los tres objetos son decorativos: el significado está en el
   número, el título y la bajada, que son texto. Por eso van
   `aria-hidden` y con `alt` vacío.

   LOS CUATRO BORDES ONDULADOS
   La misma silueta de MET-3, con el mismo `tarjeta-onda.svg` y la
   misma técnica. Y con las dos cosas que se aprendieron allá:

   ⚠ LA MÁSCARA NUNCA VA SOBRE EL CONTENIDO. En MET-3 la primera
   versión enmascaró la tarjeta entera y recortaba el texto en
   silencio — y con él recortaría un anillo de foco. Va en una capa
   decorativa detrás, que es lo único que este componente agrega al
   markup: un `div` vacío y `aria-hidden`.

   ⚠ Y EL PADDING SALE DEL DIP, NO DE OJO. El número no se copia de
   MET-3 porque estas tarjetas son más ANGOSTAS —357×419 contra
   572×508—, y eso invierte el problema. Ver la cuenta en
   `home.css`, sobre la regla.
   =========================================================== */

import type { CSSProperties } from "react";

import { Reveal } from "../componentes/Reveal";

type Paso = {
  n: string;
  titulo: string;
  bajada: string;
  objeto: string;
  objetoAncho: number;
  objetoAlto: number;
  acento: string;
  sobre: string;
};

const PASOS: Paso[] = [
  {
    n: "01",
    titulo: "Analizamos",
    bajada: "Qué vendés, a qué margen y dónde se frena el crecimiento.",
    objeto: "/assets/proceso-analizamos.webp",
    objetoAncho: 1254,
    objetoAlto: 1254,
    acento: "var(--acento-1)",
    sobre: "var(--texto-sobre-1)",
  },
  {
    n: "02",
    titulo: "Proyectamos",
    bajada: "Qué pasa con tus números si se corrigen esas fugas.",
    objeto: "/assets/proceso-proyectamos.webp",
    objetoAncho: 1254,
    objetoAlto: 1254,
    acento: "var(--acento-2)",
    sobre: "var(--texto-sobre-2)",
  },
  {
    n: "03",
    titulo: "Ejecutamos",
    bajada: "Un plan con presupuesto y prioridad, y lo ejecutamos.",
    objeto: "/assets/proceso-ejecutamos.webp",
    objetoAncho: 1536,
    objetoAlto: 1024,
    acento: "var(--acento-3)",
    sobre: "var(--texto-sobre-3)",
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
              {/* EL CAMPO DE COLOR ES UNA CAPA APARTE, Y ESO ES EL
                  PUNTO. La máscara de la onda vive acá y no en la
                  tarjeta: enmascarando la tarjeta entera, cualquier
                  texto que rozara una entrada de la onda se
                  recortaría sin que nada avise. */}
              <div className="b6-paso__campo" aria-hidden="true" />

              {/* El número es dato, no decoración: es el orden del
                  método y se lee. La lista es `ol` por lo mismo. */}
              <p className="etiqueta b6-paso__n">{p.n}</p>

              <div className="b6-paso__objeto">
                <img
                  src={p.objeto}
                  alt=""
                  aria-hidden="true"
                  width={p.objetoAncho}
                  height={p.objetoAlto}
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
