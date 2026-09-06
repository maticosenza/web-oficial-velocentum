/* ===========================================================
   ANDAMIO DE F0 — PROVISIONAL, SE BORRA EN F1

   Esto NO es el nav (B0) ni el hero (B1). Es lo mínimo para
   poder ver la cortina tapando y destapando algo, y para
   navegar entre las cuatro rutas durante las pruebas.

   No tiene la forma, ni la card flotante, ni el comportamiento
   móvil que especifica 01_HOME_estructura.md. Cuando se
   construya B0 de verdad, este archivo se borra.
   =========================================================== */

import { useRef, type CSSProperties } from "react";
import { useRouterState } from "@tanstack/react-router";

import { EnlaceConCortina } from "./RouteCurtain";
import { useMedirNav } from "../lib/altoDeNav";

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

/** El par acento + texto-sobre-acento, como datos para el CSS. */
export function parDeColor(acento: string, sobre: string): CSSProperties {
  return { "--acento": acento, "--sobre": sobre } as CSSProperties;
}

export function NavProvisional() {
  const rutaActual = useRouterState({ select: (s) => s.location.pathname });

  /* El nav publica su alto real para que el apilado sticky no
     tenga que adivinarlo. El nav definitivo (B0) hace lo mismo. */
  const navRef = useRef<HTMLElement>(null);
  useMedirNav(navRef);

  return (
    <nav ref={navRef} aria-label="Principal" className="nav-provisional">
      {PAGINAS.map((p) => (
        <EnlaceConCortina
          key={p.ruta}
          to={p.ruta}
          className="nav-provisional__link"
          /* El estado activo no puede ser sólo color. El CSS se
             engancha del propio `aria-current`, así que color y
             semántica no se pueden desincronizar. */
          {...(p.ruta === rutaActual ? { "aria-current": "page" as const } : {})}
          style={parDeColor(p.acento, p.sobre)}
        >
          {p.nombre}
        </EnlaceConCortina>
      ))}
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
      <section className="pagina-provisional__banda" style={parDeColor(acento, sobre)}>
        <p className="etiqueta">Andamio F0 · provisional</p>
        <h1 className="pagina-provisional__titulo">{nombre}</h1>
      </section>

      {/* Alto extra para poder verificar la restauración de scroll:
          si se scrollea acá y se navega, la página nueva tiene que
          arrancar arriba, y el atrás tiene que volver a esta altura. */}
      <section className="pagina-provisional__relleno contenido">
        <p className="prueba__nota">
          Bloque alto, sólo para tener scroll durante las pruebas. Scrolleá hasta el fondo, navegá a
          otra página y volvé con el botón atrás del navegador: la página nueva tiene que abrir
          arriba de todo, y el atrás tiene que devolverte a esta altura.
        </p>
        <p className="etiqueta etiqueta--apagada">FIN DE {nombre.toUpperCase()}</p>
      </section>
    </>
  );
}

export { PAGINAS };
