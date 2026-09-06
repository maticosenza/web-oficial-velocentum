/* ===========================================================
   PÁGINA DE PRUEBA — SectionEdge
   No forma parte del sitio.
   =========================================================== */

import { createFileRoute } from "@tanstack/react-router";

import { SectionEdge, SeccionConBorde } from "../../componentes/SectionEdge";
import { parDeColor } from "../../componentes/AndamioF0";
import { B0Nav } from "../../bloques/B0Nav";

export const Route = createFileRoute("/pruebas/section-edge")({
  head: () => ({
    meta: [{ title: "Prueba · SectionEdge" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PruebaSectionEdge,
});

const TARJETAS = [
  { nombre: "Marca de ejemplo", rubro: "PLACEHOLDER", acento: "var(--acento-3)" },
  { nombre: "Otra marca", rubro: "PLACEHOLDER", acento: "var(--acento-5)" },
];

function PruebaSectionEdge() {
  return (
    <>
      <B0Nav />

      <div className="prueba__encabezado contenido">
        <p className="etiqueta etiqueta--apagada">Componente · F0</p>
        <h1 className="prueba__titulo">SectionEdge</h1>
        <p className="prueba__nota">
          Franja de alto fijo recortada por máscara alfa. La silueta tiene que verse idéntica en los
          tres usos, sin importar el alto del bloque. La reserva de espacio del bloque anterior es
          automática: la calcula el CSS, ningún bloque la declara.
        </p>
      </div>

      {/* --- 1. B2: nube blanca subiendo sobre azul --- */}
      <section className="demo-borde__banda" style={parDeColor("var(--cielo)", "var(--tinta)")}>
        <p className="etiqueta contenido">1 · Como B2 — nube blanca sobre el hero</p>
      </section>
      <SeccionConBorde color="var(--fondo)" sobre="var(--tinta)" borde="arriba">
        <div className="seccion contenido">
          <p className="prueba__nota">
            Este párrafo tiene que quedar entero y legible. Si la máscara lo tocara, se vería
            recortado por los arcos. La franja vive en una capa decorativa aparte.
          </p>
          <p>
            <a href="#control-foco" id="control-foco">
              <strong>Control de foco: tabulá hasta acá</strong>
            </a>{" "}
            — el anillo tiene que verse completo, sin recortes.
          </p>
        </div>
      </SeccionConBorde>

      {/* --- 2. B8: nube azul subiendo sobre blanco --- */}
      <SeccionConBorde color="var(--acento-1)" sobre="var(--texto-sobre-1)" borde="arriba">
        <div className="seccion contenido">
          <p className="etiqueta">2 · Como B8 — nube azul sobre blanco</p>
          <p>
            Mismo componente, mismo alto, otro color. La dirección no se invierte con una propiedad:
            el borde siempre lleva el color de la sección que entra.
          </p>
        </div>
      </SeccionConBorde>

      {/* --- 3. B3: pie festoneado de tarjeta --- */}
      <div className="seccion contenido">
        <p className="etiqueta etiqueta--apagada">3 · Como B3 — pie festoneado de tarjeta</p>
        <div className="demo-borde__grilla">
          {TARJETAS.map((c) => (
            <div key={c.nombre}>
              {/* La reserva de espacio de abajo también es
                  automática: la toma quien contiene el borde. */}
              <div className="demo-borde__tarjeta" style={parDeColor(c.acento, "var(--tinta)")}>
                <SectionEdge color={c.acento} borde="abajo" />
              </div>
              <p className="etiqueta etiqueta--apagada">{c.rubro}</p>
              <p className="demo-borde__nombre">{c.nombre}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- 4. Control de deformación --- */}
      <div className="seccion contenido">
        <p className="etiqueta etiqueta--apagada">
          4 · Control — la silueta no depende del alto del bloque
        </p>
        <p className="prueba__nota">
          Las dos secciones de abajo tienen alturas muy distintas. Los arcos tienen que medir lo
          mismo en las dos. Si se ven estirados en la alta, la franja no está funcionando y volvimos
          a enmascarar el bloque.
        </p>
      </div>
      <SeccionConBorde color="var(--acento-4)" sobre="var(--texto-sobre-4)" borde="arriba">
        <div className="contenido">
          <p className="etiqueta">bloque bajo</p>
        </div>
      </SeccionConBorde>
      <div />
      <SeccionConBorde color="var(--acento-2)" sobre="var(--texto-sobre-2)" borde="arriba">
        <div className="seccion contenido demo-borde__alto">
          <p className="etiqueta">bloque alto</p>
        </div>
      </SeccionConBorde>
    </>
  );
}
