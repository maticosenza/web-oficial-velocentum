/* ===========================================================
   PÁGINA DE PRUEBA — SectionEdge
   No forma parte del sitio.
   =========================================================== */

import { createFileRoute } from "@tanstack/react-router";

import { SectionEdge, SeccionConBorde } from "../../componentes/SectionEdge";
import { NavProvisional } from "../../componentes/AndamioF0";

export const Route = createFileRoute("/pruebas/section-edge")({
  head: () => ({
    meta: [{ title: "Prueba · SectionEdge" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PruebaSectionEdge,
});

const mono: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--texto-2)",
};

const caja: React.CSSProperties = {
  maxWidth: "var(--max-contenido)",
  margin: "0 auto",
  padding: "0 var(--page-gutter)",
};

function PruebaSectionEdge() {
  return (
    <>
      <NavProvisional />

      <div
        style={{ ...caja, display: "grid", gap: "var(--space-3)", paddingBottom: "var(--space-6)" }}
      >
        <p style={mono}>Componente · F0</p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 7vw, 88px)",
            lineHeight: 0.95,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          SectionEdge
        </h1>
        <p style={{ color: "var(--texto-2)", maxWidth: "var(--medida-parrafo)" }}>
          Franja de alto fijo recortada por máscara alfa. La silueta tiene que verse idéntica en los
          tres usos, sin importar el alto del bloque.
        </p>
      </div>

      {/* --- 1. B2: nube blanca subiendo sobre azul --- */}
      <section
        className="deja-lugar-al-borde"
        style={{ background: "var(--cielo)", paddingTop: "var(--space-7)" }}
      >
        <div style={{ ...caja }}>
          <p style={{ ...mono, color: "var(--tinta)" }}>1 · Como B2 — nube blanca sobre el hero</p>
        </div>
      </section>
      <SeccionConBorde color="var(--fondo)" borde="arriba" className="deja-lugar-al-borde">
        <div style={{ ...caja, padding: "var(--space-6) var(--page-gutter) 0" }}>
          <p style={{ maxWidth: "var(--medida-parrafo)", margin: 0 }}>
            Este párrafo tiene que quedar entero y legible. Si la máscara lo tocara, se vería
            recortado por los arcos. La franja vive en una capa decorativa aparte.
          </p>
          <p style={{ marginTop: "var(--space-4)" }}>
            <a
              href="#control-foco"
              id="control-foco"
              style={{ color: "var(--tinta)", fontWeight: 700 }}
            >
              Control de foco: tabulá hasta acá
            </a>{" "}
            — el anillo tiene que verse completo, sin recortes.
          </p>
        </div>
      </SeccionConBorde>

      {/* --- 2. B8: nube azul subiendo sobre blanco --- */}
      <SeccionConBorde color="var(--acento-1)" borde="arriba">
        <div
          style={{
            ...caja,
            padding: "var(--space-7) var(--page-gutter)",
            color: "var(--texto-sobre-1)",
          }}
        >
          <p style={{ ...mono, color: "var(--texto-sobre-1)", opacity: 0.8 }}>
            2 · Como B8 — nube azul sobre blanco
          </p>
          <p style={{ margin: "var(--space-3) 0 0", maxWidth: "var(--medida-parrafo)" }}>
            Mismo componente, mismo alto, otro color. La dirección no se invierte con una propiedad:
            el borde siempre lleva el color de la sección que entra.
          </p>
        </div>
      </SeccionConBorde>

      {/* --- 3. B3: pie festoneado de tarjeta --- */}
      <div style={{ ...caja, padding: "var(--space-7) var(--page-gutter)" }}>
        <p style={mono}>3 · Como B3 — pie festoneado de tarjeta</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "var(--grid-gap-trabajos)",
            marginTop: "var(--space-4)",
          }}
        >
          {[
            { nombre: "Marca de ejemplo", rubro: "PLACEHOLDER", color: "var(--acento-3)" },
            { nombre: "Otra marca", rubro: "PLACEHOLDER", color: "var(--acento-5)" },
          ].map((c) => (
            <div key={c.nombre}>
              {/* La tarjeta: contenedor relativo con el borde abajo.
                  `overflow: visible` es necesario — la franja se
                  dibuja por fuera de la caja. */}
              <div
                style={{
                  position: "relative",
                  background: c.color,
                  borderRadius: "var(--r-media) var(--r-media) 0 0",
                  minHeight: 220,
                  marginBottom: "var(--borde-onda-alto)",
                }}
              >
                <SectionEdge color={c.color} borde="abajo" />
              </div>
              <p style={{ ...mono, margin: 0 }}>{c.rubro}</p>
              <p style={{ margin: "var(--space-1) 0 0", fontSize: 28, fontWeight: 800 }}>
                {c.nombre}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- 4. Control de deformación --- */}
      {/* Acá la clase NO sirve: `caja` trae `padding` inline y un
          estilo inline le gana a cualquier regla de hoja. Con
          estilos inline hay que reservar el espacio también inline. */}
      <div style={{ ...caja, paddingBottom: "var(--borde-onda-alto)" }}>
        <p style={mono}>4 · Control — la silueta no depende del alto del bloque</p>
        <p style={{ color: "var(--texto-2)", maxWidth: "var(--medida-parrafo)" }}>
          Las dos secciones de abajo tienen alturas muy distintas. Los arcos tienen que medir lo
          mismo en las dos. Si se ven estirados en la alta, la franja no está funcionando y volvimos
          a enmascarar el bloque.
        </p>
      </div>
      <SeccionConBorde color="var(--acento-4)" borde="arriba">
        <div
          style={{
            ...caja,
            padding: "var(--space-4) var(--page-gutter)",
            color: "var(--texto-sobre-4)",
          }}
        >
          <p style={{ margin: 0, ...mono, color: "var(--texto-sobre-4)" }}>bloque bajo</p>
        </div>
      </SeccionConBorde>
      <div style={{ height: "var(--borde-onda-alto)" }} />
      <SeccionConBorde color="var(--acento-2)" borde="arriba">
        <div
          style={{
            ...caja,
            padding: "var(--space-7) var(--page-gutter)",
            minHeight: "60vh",
            color: "var(--texto-sobre-2)",
          }}
        >
          <p style={{ margin: 0, ...mono, color: "var(--texto-sobre-2)" }}>bloque alto</p>
        </div>
      </SeccionConBorde>

      {/* --- 5. El fallo, a propósito --- */}
      <div style={{ ...caja, padding: "var(--space-7) var(--page-gutter) var(--space-4)" }}>
        <p style={mono}>5 · Así NO — sin reservar el espacio</p>
        <p style={{ color: "var(--texto-2)", maxWidth: "var(--medida-parrafo)" }}>
          Este bloque no lleva <code>.deja-lugar-al-borde</code>. La onda de abajo se le come el
          último renglón. Queda acá a propósito: es el modo de fallar del componente y conviene
          poder reconocerlo de un vistazo.
        </p>
        <p style={{ fontWeight: 800, margin: "var(--space-3) 0 0" }}>
          ESTE RENGLÓN TIENE QUE VERSE TAPADO POR LA ONDA
        </p>
      </div>
      <SeccionConBorde color="var(--acento-5)" borde="arriba">
        <div
          style={{
            ...caja,
            padding: "var(--space-6) var(--page-gutter)",
            color: "var(--texto-sobre-5)",
          }}
        >
          <p style={{ margin: 0, ...mono, color: "var(--texto-sobre-5)" }}>sección que entra</p>
        </div>
      </SeccionConBorde>
    </>
  );
}
