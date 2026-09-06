/* ===========================================================
   PÁGINA DE PRUEBA — ScrollMedia
   No forma parte del sitio.
   =========================================================== */

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { ScrollMedia, MarcoDeMedio } from "../../componentes/ScrollMedia";
import { B0Nav } from "../../bloques/B0Nav";

export const Route = createFileRoute("/pruebas/scroll-media")({
  head: () => ({
    meta: [{ title: "Prueba · ScrollMedia" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PruebaScrollMedia,
});

const CASOS = [
  { nombre: "Marca de ejemplo", rubro: "PLACEHOLDER", acento: "var(--acento-3)" },
  { nombre: "Otra marca", rubro: "PLACEHOLDER", acento: "var(--acento-1)" },
];

function PruebaScrollMedia() {
  const [lectura, setLectura] = useState("");

  useEffect(() => {
    const t = setInterval(() => {
      const nodos = [...document.querySelectorAll<HTMLElement>(".scroll-medio")];
      setLectura(
        nodos
          .map((n, i) => `${i + 1}: ${n.style.getPropertyValue("--progreso") || "—"}`)
          .join("   "),
      );
    }, 200);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <B0Nav />

      <div className="prueba contenido">
        <header className="prueba__encabezado">
          <p className="etiqueta etiqueta--apagada">Componente · F0</p>
          <h1 className="prueba__titulo">ScrollMedia</h1>
          <p className="prueba__nota">
            El marco crece de 0.7 a 1 mientras la imagen se desamplía de 1.3 a 1: la foto parece
            quedarse quieta mientras el encuadre se abre. <strong>El texto no escala.</strong>
          </p>
        </header>

        <section className="prueba__panel">
          <p className="etiqueta etiqueta--apagada">--progreso en vivo</p>
          <p className="prueba__lectura">{lectura || "…"}</p>
        </section>

        <section className="prueba__seccion">
          <h2 className="etiqueta etiqueta--apagada">Qué verificar</h2>
          <ul className="prueba__lista">
            <li>
              <strong>Continuo y reversible:</strong> scrolleá para arriba y el valor vuelve. No es
              un reveal.
            </li>
            <li>
              <strong>El texto no escala:</strong> se desplaza, pero su tamaño de letra no cambia
              nunca. Escalar texto lo desenfoca y le rompe el tamaño a quien tiene zoom.
            </li>
            <li>
              <strong>0.7 × 1.3 = 0.91:</strong> la compensación es aproximada, no exacta. Es lo que
              mide la referencia y es el efecto buscado.
            </li>
            <li>
              <strong>Sin perspectiva:</strong> el plan medía 1200px, pero sobre una escala 2D pura
              no hace nada. Queda afuera.
            </li>
          </ul>
        </section>

        <section className="demo-medio__espacio" />

        {CASOS.map((c) => (
          <section key={c.nombre} className="seccion">
            <ScrollMedia
              medio={<MarcoDeMedio acento={c.acento} />}
              texto={
                <div className="demo-medio__texto">
                  <p className="etiqueta etiqueta--apagada">{c.rubro}</p>
                  <p className="demo-borde__nombre">{c.nombre}</p>
                  <p className="prueba__nota">
                    Párrafo de caso. El copy real no existe todavía: son ~140 caracteres por caso y
                    están pendientes.
                  </p>
                </div>
              }
            />
          </section>
        ))}

        <section className="demo-medio__espacio">
          <p className="prueba__nota">Espacio para volver a subir y verificar la reversibilidad.</p>
        </section>
      </div>
    </>
  );
}
