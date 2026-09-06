/* ===========================================================
   PÁGINA DE PRUEBA — Reveal
   No forma parte del sitio.
   =========================================================== */

import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "../../componentes/Reveal";
import { NavProvisional, parDeColor } from "../../componentes/AndamioF0";

export const Route = createFileRoute("/pruebas/reveal")({
  head: () => ({
    meta: [{ title: "Prueba · Reveal" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PruebaReveal,
});

/* Los cuatro pasos del proceso (B6), que es donde va el reveal
   escalonado. Copy del plan. */
const PASOS = [
  { n: "01", titulo: "Preguntamos", bajada: "Qué vendés, a qué margen y con qué costos." },
  { n: "02", titulo: "Medimos", bajada: "Dónde se frena el crecimiento." },
  { n: "03", titulo: "Proyectamos", bajada: "Qué pasa si se corrigen esas fugas." },
  { n: "04", titulo: "Recomendamos", bajada: "Un plan con presupuesto y prioridad. Escrito." },
];

const CICLO = [
  ["var(--acento-1)", "var(--texto-sobre-1)"],
  ["var(--acento-2)", "var(--texto-sobre-2)"],
  ["var(--acento-3)", "var(--texto-sobre-3)"],
  ["var(--acento-5)", "var(--texto-sobre-5)"],
] as const;

function PruebaReveal() {
  return (
    <>
      <NavProvisional />

      <div className="prueba contenido">
        <header className="prueba__encabezado">
          <p className="etiqueta etiqueta--apagada">Componente · F0</p>
          <h1 className="prueba__titulo">Reveal</h1>
          <p className="prueba__nota">
            Opacidad más 12px de Y, 240ms, escalonado de 50ms. <strong>Una vez.</strong> No es
            ScrollMedia: no vuelve al scrollear para arriba, y eso es a propósito.
          </p>
        </header>

        <section className="prueba__seccion">
          <h2 className="etiqueta etiqueta--apagada">Qué verificar</h2>
          <ul className="prueba__lista">
            <li>
              <strong>Escalonado:</strong> las cuatro tarjetas no entran juntas. Cada una arranca
              50ms después de la anterior.
            </li>
            <li>
              <strong>Una vez:</strong> scrolleá más allá y volvé. Tienen que quedarse visibles, no
              repetir la entrada.
            </li>
            <li>
              <strong>Sin JS o con movimiento reducido:</strong> el contenido se ve igual. El HTML
              se sirve visible; el JS sólo esconde lo que todavía no entró en cuadro.
            </li>
          </ul>
        </section>

        <section className="demo-reveal__espacio">
          <p className="prueba__nota">
            Scrolleá para abajo. Las tarjetas están más abajo del pliegue, así que se esconden al
            montar y aparecen al entrar.
          </p>
        </section>

        <section className="prueba__seccion">
          <h2 className="etiqueta etiqueta--apagada">Como B6 — los cuatro pasos</h2>
          <div className="demo-reveal__grilla">
            {PASOS.map((p, i) => {
              const par = CICLO[i % CICLO.length]!;
              return (
                <Reveal
                  key={p.n}
                  as="article"
                  indice={i}
                  className="demo-reveal__tarjeta"
                  style={parDeColor(par[0], par[1])}
                >
                  <p className="etiqueta">{p.n}</p>
                  <div>
                    <h3>{p.titulo}</h3>
                    <p>{p.bajada}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="demo-reveal__espacio">
          <p className="prueba__nota">
            Espacio para poder scrollear más allá y volver. Al volver, las tarjetas siguen visibles.
          </p>
        </section>
      </div>
    </>
  );
}
