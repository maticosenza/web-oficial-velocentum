/* ===========================================================
   PÁGINA DE PRUEBA — ServiceStack
   No forma parte del sitio.
   =========================================================== */

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { ServiceStack } from "../../componentes/ServiceStack";
import { parDeColor } from "../../componentes/AndamioF0";
import { B0Nav } from "../../bloques/B0Nav";
import { textoDeToken } from "../../lib/tokens";

export const Route = createFileRoute("/pruebas/service-stack")({
  head: () => ({
    meta: [{ title: "Prueba · ServiceStack" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PruebaServiceStack,
});

/* Los cuatro motores del plan. Los entregables van como
   placeholder explícito: los 16 reales están sin confirmar. */
const SERVICIOS = [
  {
    n: "01",
    nombre: "Estrategia",
    bajada: "Definimos a dónde vamos y con qué prioridad.",
    acento: "var(--acento-1)",
    sobre: "var(--texto-sobre-1)",
  },
  {
    n: "02",
    nombre: "Creatividad",
    bajada: "Convertimos una idea en muchas piezas que compiten.",
    acento: "var(--acento-2)",
    sobre: "var(--texto-sobre-2)",
  },
  {
    n: "03",
    nombre: "Adquisición",
    bajada: "Llevamos esas piezas al mercado y compramos atención.",
    acento: "var(--acento-3)",
    sobre: "var(--texto-sobre-3)",
  },
  {
    n: "04",
    nombre: "Web & Conversión",
    bajada: "Ordenamos lo que pasa después del clic.",
    acento: "var(--acento-4)",
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
      <B0Nav />

      <div className="prueba contenido">
        <header className="prueba__encabezado">
          <p className="etiqueta etiqueta--apagada">Componente · F0</p>
          <h1 className="prueba__titulo">ServiceStack</h1>
        </header>

        <section className="prueba__panel">
          <p className="etiqueta etiqueta--apagada">Offset en vivo</p>
          <p className="prueba__lectura">
            --alto-nav: {altoNav || "…"} · top: {offset || "…"}
          </p>
          <p className="prueba__nota">
            El top tiene que ser el mayor entre los 56px del plan y el alto real del nav más 8px. Si
            el nav crece, el top crece.
          </p>
        </section>

        <p className="prueba__nota">
          Scrolleá despacio: cada tarjeta se fija y la siguiente la tapa. Después scrolleá para{" "}
          <strong>arriba</strong> — tiene que deshacerse solo, sin saltos. Es sticky puro, no una
          animación disparada.
        </p>

        <ServiceStack>
          {SERVICIOS.map((s) => (
            <article
              key={s.n}
              className="demo-servicio"
              /* Fondo 100% opaco: si hay transparencia el apilado
                 se rompe y se ve lo de abajo. */
              style={parDeColor(s.acento, s.sobre)}
            >
              <div>
                <p className="etiqueta">{s.n}</p>
                <h2 className="demo-servicio__titulo">{s.nombre}</h2>
                <p className="demo-servicio__bajada">{s.bajada}</p>
              </div>

              <ul className="demo-servicio__entregables">
                {["01", "02", "03", "04"].map((e) => (
                  <li key={e} className="demo-servicio__entregable">
                    <span className="etiqueta">{e}</span>
                    <span>[entregable pendiente de confirmar]</span>
                  </li>
                ))}
              </ul>

              {/* Control de foco: tiene que ser alcanzable con Tab
                  y su anillo verse entero sobre el color. */}
              <a href="#control" className="boton boton--contorno demo-servicio__cta">
                Control de foco {s.n}
              </a>
            </article>
          ))}
        </ServiceStack>

        {/* Espacio para poder ver la última tarjeta fijada y salir. */}
        <section className="demo-reveal__espacio">
          <p className="etiqueta etiqueta--apagada">Después del apilado</p>
          <p className="prueba__nota">
            Al llegar acá las tarjetas ya se soltaron. Ninguna tiene que quedar pegada arriba.
          </p>
        </section>
      </div>
    </>
  );
}
