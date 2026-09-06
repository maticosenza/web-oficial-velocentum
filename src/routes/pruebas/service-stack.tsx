/* ===========================================================
   PÁGINA DE PRUEBA — ServiceStack
   No forma parte del sitio.
   =========================================================== */

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { ServiceStack } from "../../componentes/ServiceStack";
import { NavProvisional } from "../../componentes/AndamioF0";
import { textoDeToken } from "../../lib/tokens";

export const Route = createFileRoute("/pruebas/service-stack")({
  head: () => ({
    meta: [{ title: "Prueba · ServiceStack" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PruebaServiceStack,
});

const mono: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

const caja: React.CSSProperties = {
  maxWidth: "var(--max-contenido)",
  margin: "0 auto",
  padding: "0 var(--page-gutter)",
};

/* Los cuatro motores del plan. Los entregables van como
   placeholder explícito: los 16 reales están sin confirmar. */
const SERVICIOS = [
  {
    n: "01",
    nombre: "Estrategia",
    bajada: "Definimos a dónde vamos y con qué prioridad.",
    color: "var(--acento-1)",
    sobre: "var(--texto-sobre-1)",
  },
  {
    n: "02",
    nombre: "Creatividad",
    bajada: "Convertimos una idea en muchas piezas que compiten.",
    color: "var(--acento-2)",
    sobre: "var(--texto-sobre-2)",
  },
  {
    n: "03",
    nombre: "Adquisición",
    bajada: "Llevamos esas piezas al mercado y compramos atención.",
    color: "var(--acento-3)",
    sobre: "var(--texto-sobre-3)",
  },
  {
    n: "04",
    nombre: "Web & Conversión",
    bajada: "Ordenamos lo que pasa después del clic.",
    color: "var(--acento-4)",
    sobre: "var(--texto-sobre-4)",
  },
];

function PruebaServiceStack() {
  const [altoNav, setAltoNav] = useState("");
  const [offset, setOffset] = useState("");

  useEffect(() => {
    const leer = () => {
      setAltoNav(textoDeToken("--alto-nav", "sin medir"));
      const hueco = document.querySelector(".pila-sticky__hueco");
      setOffset(hueco ? getComputedStyle(hueco).top : "—");
    };
    leer();
    const t = setInterval(leer, 500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <NavProvisional />

      <div style={{ ...caja, display: "grid", gap: "var(--space-3)" }}>
        <p style={{ ...mono, color: "var(--texto-2)" }}>Componente · F0</p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 7vw, 88px)",
            lineHeight: 0.95,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          ServiceStack
        </h1>

        <div
          style={{
            border: "1px solid var(--texto-2)",
            borderRadius: "var(--r-card)",
            padding: "var(--space-4)",
            display: "grid",
            gap: "var(--space-2)",
          }}
        >
          <p style={{ ...mono, color: "var(--texto-2)", margin: 0 }}>Offset en vivo</p>
          <p style={{ margin: 0, fontFamily: "var(--font-mono)" }}>
            --alto-nav: <strong>{altoNav || "…"}</strong> · top efectivo:{" "}
            <strong>{offset || "…"}</strong>
          </p>
          <p style={{ margin: 0, color: "var(--texto-2)", fontSize: 15 }}>
            El top tiene que ser el mayor entre los 56px del plan y el alto real del nav más 8px. Si
            el nav crece, el top crece.
          </p>
        </div>

        <p style={{ color: "var(--texto-2)", maxWidth: "var(--medida-parrafo)" }}>
          Scrolleá despacio: cada tarjeta se fija y la siguiente la tapa. Después scrolleá para{" "}
          <strong>arriba</strong> — tiene que deshacerse solo, sin saltos. Es sticky puro, no una
          animación disparada.
        </p>
      </div>

      <div style={{ ...caja, padding: "var(--space-6) var(--page-gutter)" }}>
        <ServiceStack>
          {SERVICIOS.map((s) => (
            <article
              key={s.n}
              style={{
                /* Fondo 100% opaco: si hay transparencia el
                   apilado se rompe y se ve lo de abajo. */
                background: s.color,
                color: s.sobre,
                borderRadius: "var(--r-card)",
                padding: "var(--space-6)",
                minHeight: 420,
                display: "grid",
                alignContent: "space-between",
                gap: "var(--space-5)",
              }}
            >
              <div>
                <p style={{ ...mono, margin: 0, opacity: 0.8 }}>{s.n}</p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(36px, 5vw, 64px)",
                    lineHeight: 1,
                    textTransform: "uppercase",
                    margin: "var(--space-3) 0 0",
                  }}
                >
                  {s.nombre}
                </h2>
                <p style={{ margin: "var(--space-3) 0 0", maxWidth: 520 }}>{s.bajada}</p>
              </div>

              <ul style={{ listStyle: "none", margin: 0, padding: 0, maxWidth: 520 }}>
                {["01", "02", "03", "04"].map((e) => (
                  <li
                    key={e}
                    style={{
                      display: "flex",
                      gap: "var(--space-3)",
                      padding: "var(--space-3) 0",
                      borderTop: "1px solid currentColor",
                      opacity: 0.9,
                    }}
                  >
                    <span style={{ ...mono }}>{e}</span>
                    <span>[entregable pendiente de confirmar]</span>
                  </li>
                ))}
              </ul>

              {/* Control de foco: tiene que ser alcanzable con Tab
                  y su anillo verse entero sobre el color. */}
              <a
                href="#control"
                style={{
                  justifySelf: "start",
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: "var(--control-min-height)",
                  padding: "0 var(--space-4)",
                  borderRadius: "var(--r-pill)",
                  border: "1.5px solid currentColor",
                  color: "inherit",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Control de foco {s.n}
              </a>
            </article>
          ))}
        </ServiceStack>
      </div>

      {/* Espacio para poder ver la última tarjeta fijada y salir. */}
      <div style={{ ...caja, padding: "var(--space-7) var(--page-gutter)", minHeight: "80vh" }}>
        <p style={{ ...mono, color: "var(--texto-2)" }}>Después del apilado</p>
        <p style={{ color: "var(--texto-2)", maxWidth: "var(--medida-parrafo)" }}>
          Al llegar acá las tarjetas ya se soltaron. Ninguna tiene que quedar pegada arriba.
        </p>
      </div>
    </>
  );
}
