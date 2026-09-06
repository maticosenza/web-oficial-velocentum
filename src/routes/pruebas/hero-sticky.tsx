/* ===========================================================
   PÁGINA DE PRUEBA — HeroSticky
   No forma parte del sitio.
   =========================================================== */

import { createFileRoute } from "@tanstack/react-router";

import { HeroSticky } from "../../componentes/HeroSticky";
import { SeccionConBorde } from "../../componentes/SectionEdge";
import { NavProvisional } from "../../componentes/AndamioF0";

export const Route = createFileRoute("/pruebas/hero-sticky")({
  head: () => ({
    meta: [{ title: "Prueba · HeroSticky" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PruebaHeroSticky,
});

function PruebaHeroSticky() {
  return (
    <>
      <NavProvisional />

      <HeroSticky
        hero={
          <div className="demo-hero">
            <p className="etiqueta etiqueta--apagada">Andamio · el titular real está sin decidir</p>
            <h1 className="demo-hero__titulo">
              Placeholder
              <br />
              de hero
            </h1>
            <p className="prueba__nota">
              El titular del hero es una decisión abierta del plan: A, B, C o D. Acá va un
              placeholder del largo correcto.
            </p>
          </div>
        }
        siguiente={
          /* Cosido con SectionEdge: es exactamente el par B1+B2 de
             la home. El bloque que sube es opaco. */
          <SeccionConBorde color="var(--fondo)" sobre="var(--tinta)" borde="arriba">
            <div className="seccion contenido demo-hero-siguiente">
              <p className="etiqueta etiqueta--apagada">Como B2 — quiénes somos</p>
              <p className="prueba__nota">
                Este bloque sube y tapa el hero. Tiene fondo 100% opaco: con transparencia se vería
                el hero atrás y el efecto se arruina.
              </p>
            </div>
          </SeccionConBorde>
        }
      />

      <div className="prueba contenido">
        <header className="prueba__encabezado">
          <p className="etiqueta etiqueta--apagada">Componente · F0</p>
          <h1 className="prueba__titulo">HeroSticky</h1>
        </header>

        <section className="prueba__seccion">
          <h2 className="etiqueta etiqueta--apagada">Qué verificar</h2>
          <ul className="prueba__lista">
            <li>
              <strong>El hero se queda:</strong> scrolleá despacio desde arriba. El hero tiene que
              quedarse fijo mientras el bloque blanco sube encima.
            </li>
            <li>
              <strong>Padre compartido:</strong> un sticky se fija dentro de su contenedor, no de la
              ventana. El componente envuelve a los dos, así que el contrato no se puede romper
              desde afuera.
            </li>
            <li>
              <strong>Reversible:</strong> al volver para arriba el hero reaparece sin saltos. Es
              sticky puro, no una animación.
            </li>
            <li>
              <strong>Bajo 810px se apaga:</strong> alto natural, sin pin. Un hero fijado se come el
              viewport entero de un teléfono.
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
