/* ===========================================================
   PÁGINA DE PRUEBA — Ticker
   No forma parte del sitio.
   =========================================================== */

import { createFileRoute } from "@tanstack/react-router";

import { Ticker, Pildora } from "../../componentes/Ticker";
import { NavProvisional } from "../../componentes/AndamioF0";

export const Route = createFileRoute("/pruebas/ticker")({
  head: () => ({
    meta: [{ title: "Prueba · Ticker" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PruebaTicker,
});

/* Las once capacidades del plan. Copy [APROBADO]. */
const CAPACIDADES = [
  "Meta Ads",
  "Tracking con CAPI",
  "Google Ads",
  "Atribución real",
  "Product Ads",
  "Optimización de ficha",
  "Contenido para pauta",
  "GA4",
  "Influencer marketing",
  "Diseño de marca",
  "Web y conversión",
];

/* Los colores ciclan sobre la paleta, con su par de texto.
   Nunca se elige un acento sin su texto-sobre. */
const CICLO = [
  ["var(--acento-1)", "var(--texto-sobre-1)"],
  ["var(--acento-2)", "var(--texto-sobre-2)"],
  ["var(--acento-3)", "var(--texto-sobre-3)"],
  ["var(--acento-4)", "var(--texto-sobre-4)"],
  ["var(--acento-5)", "var(--texto-sobre-5)"],
] as const;

function PruebaTicker() {
  return (
    <>
      <NavProvisional />

      <div className="prueba contenido">
        <header className="prueba__encabezado">
          <p className="etiqueta etiqueta--apagada">Componente · F0</p>
          <h1 className="prueba__titulo">Ticker</h1>
          <p className="prueba__nota">
            Una fila, una dirección, bordes desvanecidos al 10%. La pausa no es un extra: WCAG 2.2.2
            pide un control para cualquier cosa que se mueva sola más de cinco segundos.
          </p>
        </header>

        <section className="prueba__seccion">
          <h2 className="etiqueta etiqueta--apagada">1 · Como B5 — las once capacidades</h2>
          <Ticker etiqueta="Capacidades">
            {CAPACIDADES.map((c, i) => {
              const par = CICLO[i % CICLO.length]!;
              return (
                <Pildora key={c} acento={par[0]} sobre={par[1]}>
                  {c}
                </Pildora>
              );
            })}
          </Ticker>
        </section>

        <section className="prueba__seccion">
          <h2 className="etiqueta etiqueta--apagada">2 · Velocidad constante</h2>
          <p className="prueba__nota">
            Esta banda tiene tres elementos en vez de once. Tiene que moverse a la{" "}
            <strong>misma velocidad aparente</strong> que la de arriba: la duración se calcula desde
            el ancho real de la pista, no es un número fijo.
          </p>
          <Ticker etiqueta="Banda corta de control">
            {["Uno", "Dos", "Tres"].map((c, i) => {
              const par = CICLO[i % CICLO.length]!;
              return (
                <Pildora key={c} acento={par[0]} sobre={par[1]}>
                  {c}
                </Pildora>
              );
            })}
          </Ticker>
        </section>

        <section className="prueba__seccion">
          <h2 className="etiqueta etiqueta--apagada">3 · Qué verificar</h2>
          <ul className="prueba__lista">
            <li>
              <strong>Pausa:</strong> el botón detiene y reanuda. Es alcanzable con Tab y expone{" "}
              <code>aria-pressed</code>.
            </li>
            <li>
              <strong>Lector de pantalla:</strong> las capacidades se anuncian{" "}
              <strong>una sola vez</strong>, aunque en pantalla estén dos veces. La copia va{" "}
              <code>aria-hidden</code> e <code>inert</code>.
            </li>
            <li>
              <strong>Loop sin salto:</strong> al llegar al 50% el cuadro es idéntico al inicial. No
              tiene que verse el corte.
            </li>
            <li>
              <strong>Movimiento reducido:</strong> la banda se muestra entera y quieta,
              envolviéndose en varias líneas. No queda contenido inalcanzable fuera de cuadro.
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
