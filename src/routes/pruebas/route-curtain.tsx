/* ===========================================================
   PÁGINA DE PRUEBA — RouteCurtain
   No forma parte del sitio. Existe para verificar el contrato
   del componente antes de construir cualquier bloque.
   =========================================================== */

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { EnlaceConCortina, useRouteCurtain } from "../../componentes/RouteCurtain";
import { duracionDeToken, textoDeToken } from "../../lib/tokens";
import { NavProvisional, PAGINAS } from "../../componentes/AndamioF0";

export const Route = createFileRoute("/pruebas/route-curtain")({
  head: () => ({
    meta: [{ title: "Prueba · RouteCurtain" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PruebaRouteCurtain,
});

const mono: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--texto-2)",
};

function PruebaRouteCurtain() {
  const { estado, ocupada } = useRouteCurtain();
  const [reducido, setReducido] = useState<boolean | null>(null);
  const [duracion, setDuracion] = useState("");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const leer = () => {
      setReducido(mq.matches);
      /* Se muestra el crudo Y el interpretado: el crudo puede
         venir en `s` o en `ms` según lo que minifique más corto. */
      setDuracion(
        `${textoDeToken("--motion-curtain-phase")} = ${duracionDeToken("--motion-curtain-phase", 300)} ms`,
      );
    };
    leer();
    mq.addEventListener("change", leer);
    return () => mq.removeEventListener("change", leer);
  }, []);

  return (
    <>
      <NavProvisional />

      <div
        style={{
          maxWidth: "var(--max-contenido)",
          margin: "0 auto",
          padding: "var(--space-6) var(--page-gutter) var(--space-7)",
          display: "grid",
          gap: "var(--space-6)",
        }}
      >
        <header style={{ display: "grid", gap: "var(--space-3)" }}>
          <p style={mono}>Spike · F0</p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 7vw, 88px)",
              lineHeight: 0.95,
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            RouteCurtain
          </h1>
        </header>

        {/* --- Lectura de estado en vivo --- */}
        <section
          aria-labelledby="t-estado"
          style={{
            border: "1px solid var(--texto-2)",
            borderRadius: "var(--r-card)",
            padding: "var(--space-4)",
            display: "grid",
            gap: "var(--space-2)",
          }}
        >
          <h2 id="t-estado" style={{ ...mono, margin: 0 }}>
            Estado en vivo
          </h2>
          <p style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
            <span style={{ fontFamily: "var(--font-mono)" }}>{estado}</span>
            {ocupada ? " · contenido inert" : " · contenido interactivo"}
          </p>
          <p style={{ ...mono, margin: 0 }}>
            prefers-reduced-motion: {reducido === null ? "…" : reducido ? "sí" : "no"}
            {" · "}
            --motion-curtain-phase: {duracion || "…"}
          </p>
        </section>

        {/* --- El puente a Tailwind, ejercitado --- */}
        <section aria-labelledby="t-puente" style={{ display: "grid", gap: "var(--space-3)" }}>
          <h2 id="t-puente" style={{ ...mono, margin: 0 }}>
            0 · Puente de tokens a utilidades de Tailwind
          </h2>
          <p style={{ margin: 0, color: "var(--texto-2)" }}>
            Si estas cajas salen con su color y su par de texto, el bloque
            <code> @theme inline </code> de styles.css funciona.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-acento-1 text-sobre-1 rounded-pill px-4 py-3 font-bold">
              bg-acento-1
            </span>
            <span className="bg-acento-3 text-sobre-3 rounded-pill px-4 py-3 font-bold">
              bg-acento-3
            </span>
            <span className="bg-marca text-sobre-marca rounded-pill px-4 py-3 font-bold">
              bg-marca
            </span>
          </div>
        </section>

        {/* --- Casos que SÍ llevan cortina --- */}
        <section aria-labelledby="t-si" style={{ display: "grid", gap: "var(--space-3)" }}>
          <h2 id="t-si" style={{ ...mono, margin: 0 }}>
            1 · Con cortina — color del destino
          </h2>
          <p style={{ margin: 0, color: "var(--texto-2)" }}>
            Cada link tiene que tapar con el acento de la página a la que va.
          </p>
          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
            {PAGINAS.map((p) => (
              <EnlaceConCortina
                key={p.ruta}
                to={p.ruta}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: "var(--control-min-height)",
                  padding: "0 var(--space-4)",
                  borderRadius: "var(--r-pill)",
                  background: p.acento,
                  color: p.sobre,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                {p.nombre}
              </EnlaceConCortina>
            ))}
          </div>
        </section>

        {/* --- Casos que NO deben llevar cortina --- */}
        <section aria-labelledby="t-no" style={{ display: "grid", gap: "var(--space-3)" }}>
          <h2 id="t-no" style={{ ...mono, margin: 0 }}>
            2 · Sin cortina — el navegador manda
          </h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: "var(--space-4)",
              display: "grid",
              gap: "var(--space-2)",
              color: "var(--texto-2)",
            }}
          >
            <li>
              <strong style={{ color: "var(--tinta)" }}>⌘/Ctrl + click</strong> en cualquier link de
              arriba: abre pestaña nueva, sin cortina, sin cambiar esta página.
            </li>
            <li>
              <strong style={{ color: "var(--tinta)" }}>Click del medio</strong>: idem.
            </li>
            <li>
              <EnlaceConCortina
                to="/casos"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--tinta)", fontWeight: 700 }}
              >
                Link con target="_blank"
              </EnlaceConCortina>{" "}
              — pestaña nueva, sin cortina.
            </li>
            <li>
              <a
                href="https://example.org"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--tinta)", fontWeight: 700 }}
              >
                Link externo
              </a>{" "}
              — nunca lo tocamos.
            </li>
            <li>
              <strong style={{ color: "var(--tinta)" }}>Atrás / adelante</strong> del navegador:
              instantáneo, sin cortina. Es la decisión tomada.
            </li>
          </ul>
        </section>

        {/* --- Casos de borde --- */}
        <section aria-labelledby="t-borde" style={{ display: "grid", gap: "var(--space-3)" }}>
          <h2 id="t-borde" style={{ ...mono, margin: 0 }}>
            3 · Bordes
          </h2>
          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
            <EnlaceConCortina to="/pruebas/route-curtain" style={botonContorno}>
              A la misma página (no debe pasar nada)
            </EnlaceConCortina>
            <EnlaceConCortina to="/ruta-que-no-existe" style={botonContorno}>
              A una ruta inexistente (404 bajo la cortina)
            </EnlaceConCortina>
          </div>
          <p style={{ margin: 0, color: "var(--texto-2)" }}>
            <strong style={{ color: "var(--tinta)" }}>Clicks repetidos:</strong> apretá dos links
            distintos lo más rápido que puedas. El segundo se tiene que descartar — no encolarse ni
            cortar la animación en curso.
          </p>
          <p style={{ margin: 0, color: "var(--texto-2)" }}>
            <strong style={{ color: "var(--tinta)" }}>Control:</strong> los de abajo son{" "}
            <code>&lt;Link&gt;</code> de TanStack, sin cortina. Sirven para separar lo que rompe
            nuestro componente de lo que ya hacía el andamiaje.
          </p>
          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
            <Link to="/" style={botonContorno} data-control="1">
              Control · Inicio sin cortina
            </Link>
            <Link to="/casos" style={botonContorno} data-control="1">
              Control · Casos sin cortina
            </Link>
          </div>
          <p style={{ margin: 0, color: "var(--texto-2)" }}>
            <strong style={{ color: "var(--tinta)" }}>Teclado:</strong> navegá con Tab y Enter. Al
            terminar la cortina el foco tiene que estar en el contenido de la página nueva, no
            volver al principio del documento. Durante la cortina, Tab no debe alcanzar nada de la
            página tapada.
          </p>
        </section>
      </div>
    </>
  );
}

const botonContorno: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  minHeight: "var(--control-min-height)",
  padding: "0 var(--space-4)",
  borderRadius: "var(--r-pill)",
  border: "1.5px solid var(--tinta)",
  color: "var(--tinta)",
  fontWeight: 700,
  textDecoration: "none",
};
