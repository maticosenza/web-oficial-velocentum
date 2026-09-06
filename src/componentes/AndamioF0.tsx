/* ===========================================================
   ANDAMIO DE F0 — PROVISIONAL, SE BORRA EN F1

   Esto NO es el nav (B0) ni el hero (B1). Es lo mínimo para
   poder ver la cortina tapando y destapando algo, y para
   navegar entre las cuatro rutas durante el spike.

   No tiene la forma, ni el color de estado, ni la card
   flotante que especifica 01_HOME_estructura.md. Cuando se
   construya B0 de verdad, este archivo se borra.
   =========================================================== */

import { useRouterState } from "@tanstack/react-router";
import { EnlaceConCortina } from "./RouteCurtain";

const PAGINAS = [
  { ruta: "/", nombre: "Inicio", acento: "var(--acento-1)", sobre: "var(--texto-sobre-1)" },
  { ruta: "/metodo", nombre: "Método", acento: "var(--acento-2)", sobre: "var(--texto-sobre-2)" },
  { ruta: "/casos", nombre: "Casos", acento: "var(--acento-3)", sobre: "var(--texto-sobre-3)" },
  {
    ruta: "/contacto",
    nombre: "Contacto",
    acento: "var(--acento-4)",
    sobre: "var(--texto-sobre-4)",
  },
] as const;

export function NavProvisional() {
  const rutaActual = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Principal"
      style={{
        display: "flex",
        gap: "var(--space-2)",
        flexWrap: "wrap",
        padding: "var(--space-4) var(--page-gutter)",
      }}
    >
      {PAGINAS.map((p) => {
        const activo = p.ruta === rutaActual;
        return (
          <EnlaceConCortina
            key={p.ruta}
            to={p.ruta}
            /* El estado activo no puede ser sólo color. */
            aria-current={activo ? "page" : undefined}
            style={{
              display: "inline-flex",
              alignItems: "center",
              minHeight: "var(--control-min-height)",
              padding: "0 var(--space-4)",
              borderRadius: "var(--r-pill)",
              /* El par texto-sobre-X, también en el estado activo. */
              background: activo ? p.acento : "transparent",
              color: activo ? p.sobre : "var(--tinta)",
              border: `1.5px solid ${p.acento}`,
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: "var(--font-texto)",
            }}
          >
            {p.nombre}
          </EnlaceConCortina>
        );
      })}
    </nav>
  );
}

export function PaginaProvisional({
  nombre,
  acento,
  sobre,
}: {
  nombre: string;
  acento: string;
  sobre: string;
}) {
  return (
    <>
      <NavProvisional />
      <section
        style={{
          minHeight: "70vh",
          background: acento,
          color: sobre,
          display: "grid",
          placeContent: "center",
          textAlign: "center",
          padding: "var(--space-7) var(--page-gutter)",
          gap: "var(--space-3)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            margin: 0,
            opacity: 0.75,
          }}
        >
          Andamio F0 · provisional
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(56px, 12vw, 144px)",
            lineHeight: 0.95,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {nombre}
        </h1>
      </section>
      {/* Alto extra para poder verificar la restauración de scroll:
          si se scrollea acá y se navega, la página nueva tiene que
          arrancar arriba, y el atrás tiene que volver a esta altura. */}
      <section
        style={{
          minHeight: "120vh",
          padding: "var(--space-7) var(--page-gutter)",
          display: "grid",
          alignContent: "space-between",
        }}
      >
        <p style={{ color: "var(--texto-2)", maxWidth: "var(--medida-parrafo)" }}>
          Bloque alto, sólo para tener scroll durante el spike. Scrolleá hasta el fondo, navegá a
          otra página y volvé con el botón atrás del navegador: la página nueva tiene que abrir
          arriba de todo, y el atrás tiene que devolverte a esta altura.
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--texto-2)",
          }}
        >
          FIN DE {nombre.toUpperCase()}
        </p>
      </section>
    </>
  );
}

export { PAGINAS };
