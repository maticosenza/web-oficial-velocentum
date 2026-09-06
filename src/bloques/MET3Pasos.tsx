/* ===========================================================
   MET-3 · LOS CUATRO PASOS

   Grilla 2×2. Cada tarjeta: número, objeto, título y bajada. Un
   acento por tarjeta, en orden, con su `--texto-sobre-N`.

   LAS TARJETAS NO SON RECTÁNGULOS: TIENEN LOS CUATRO BORDES
   ONDULADOS. Misma técnica de máscara alfa que `SectionEdge`,
   con una silueta nueva —`tarjeta-onda.svg`— y ondas bastante
   más marcadas que el pie festoneado de B3.

   La silueta se generó como una curva cerrada: un rectángulo muy
   redondeado modulado por un seno de diez períodos ENTEROS sobre
   todo el perímetro. Que el número sea entero es lo que hace que
   cierre sin costura, y que la modulación sea sobre el perímetro
   completo —y no lado por lado— es lo que hace que las ondas
   crucen las esquinas en vez de morir en ellas.

   DOS COSAS QUE HAY QUE FORZAR, Y ESTÁN FORZADAS

   1. **El padding crece.** La onda muerde hacia adentro ~5% del
      ancho en su punto más profundo. Con el padding normal de una
      tarjeta, el texto quedaría comido por las entradas. Acá el
      padding lateral se calcula desde ese dip, no a ojo.

   2. **Las cuatro miden exactamente lo mismo.** La máscara se
      estira con `mask-size: 100% 100%`, así que dos tarjetas de
      distinto alto deforman la onda distinto y la diferencia se
      ve al toque. Con `grid-auto-rows: 1fr` las dos filas quedan
      iguales, y con columnas iguales, las cuatro. No alcanza con
      que se vean parecidas: tienen que ser idénticas.

   LOS OBJETOS, POR SIGNIFICADO
   Según `01_sistema/identidad.md`, y con cuatro pasos los cuatro
   cierran exacto:

   | Paso | Objeto | Significado |
   |---|---|---|
   | 01 Revisamos el ecosistema | conexión | Coordinar disciplinas |
   | 02 Diagnosticamos | foco | Entender, diagnosticar |
   | 03 Proyectamos | barras | Medir y proyectar |
   | 04 Ejecutamos | rayo | Activar una prioridad |

   El 01 mira las cuatro disciplinas juntas —qué vendés, cómo
   llega la gente, qué encuentra—, que es exactamente lo que
   conexión significa. Es el mismo objeto que en la home queda
   fuera de B6, y acá encuentra su lugar.

   SE ANIMAN AL ENTRAR Y AL HOVER, NO EN LOOP
   El plan lo dejó decidido y con motivo: cuatro objetos moviéndose
   solos al mismo tiempo, en una página que explica cómo trabajás,
   va en contra del tono. En reposo quedan quietos.

   El contorno blanco grueso es el mismo de B6: lo que despega al
   objeto de cualquier fondo, incluso del suyo propio.
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
    titulo: "Revisamos tu ecosistema completo",
    bajada:
      "No solo la pauta: qué vendés y a qué precio, cómo llega la gente y qué encuentra cuando llega.",
    objeto: "/assets/conexion.png",
    acento: "var(--acento-1)",
    sobre: "var(--texto-sobre-1)",
  },
  {
    n: "02",
    titulo: "Diagnosticamos tu cuello de botella",
    bajada:
      "“No vendo lo suficiente” nunca es un solo problema. Al separarlo aparecen tres o cuatro frentes, y siempre hay uno que pesa más.",
    objeto: "/assets/foco.png",
    acento: "var(--acento-2)",
    sobre: "var(--texto-sobre-2)",
  },
  {
    n: "03",
    titulo: "Proyectamos qué pasa si se corrige",
    bajada:
      "Con tus números reales, una proyección a 90 días. No promesas: un rango con supuestos explícitos y su inversión.",
    objeto: "/assets/barras.png",
    acento: "var(--acento-3)",
    sobre: "var(--texto-sobre-3)",
  },
  {
    n: "04",
    titulo: "Ejecutamos el plan de acción",
    bajada:
      "No activamos todo junto. Primero lo que más pesa, y qué tiene que estar resuelto antes de escalar.",
    objeto: "/assets/rayo.png",
    acento: "var(--acento-4)",
    sobre: "var(--texto-sobre-4)",
  },
];

export function MET3Pasos() {
  return (
    <section className="met3" aria-labelledby="met3-titulo">
      <div className="met3__contenido contenido">
        <h2 id="met3-titulo" className="solo-lectores">
          Los cuatro pasos del método
        </h2>

        <ol className="met3__pasos" role="list">
          {PASOS.map((p, i) => (
            <Reveal
              as="li"
              key={p.n}
              indice={i}
              className="met3-paso"
              style={{ "--acento": p.acento, "--sobre": p.sobre } as CSSProperties}
            >
              {/* El campo de color es una capa aparte, y la
                  máscara va sobre ella. `SectionEdge` lo deja
                  escrito y vale igual acá: la máscara nunca sobre
                  texto, controles ni anillos de foco. Enmascarando
                  la tarjeta entera, cualquier texto que rozara una
                  entrada de la onda se recortaría en silencio. */}
              <div className="met3-paso__campo" aria-hidden="true" />

              <p className="etiqueta met3-paso__n">{p.n}</p>

              <div className="met3-paso__objeto">
                <img
                  src={p.objeto}
                  alt=""
                  aria-hidden="true"
                  width={1254}
                  height={1254}
                  loading="lazy"
                />
              </div>

              <h3 className="met3-paso__titulo">{p.titulo}</h3>
              <p className="met3-paso__bajada">{p.bajada}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
