/* ===========================================================
   PÁGINA DE PRUEBA — RouteCurtain
   No forma parte del sitio.
   =========================================================== */

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { EnlaceConCortina, useRouteCurtain } from "../../componentes/RouteCurtain";
import { NavProvisional, PAGINAS, parDeColor } from "../../componentes/AndamioF0";
import { duracionDeToken, textoDeToken } from "../../lib/tokens";

export const Route = createFileRoute("/pruebas/route-curtain")({
  head: () => ({
    meta: [{ title: "Prueba · RouteCurtain" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PruebaRouteCurtain,
});

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

      <div className="prueba contenido">
        <header className="prueba__encabezado">
          <p className="etiqueta etiqueta--apagada">Spike · F0</p>
          <h1 className="prueba__titulo">RouteCurtain</h1>
        </header>

        <section aria-labelledby="t-estado" className="prueba__panel">
          <h2 id="t-estado" className="etiqueta etiqueta--apagada">
            Estado en vivo
          </h2>
          <p className="prueba__lectura">
            {estado}
            {ocupada ? " · contenido inert" : " · contenido interactivo"}
          </p>
          <p className="etiqueta etiqueta--apagada">
            prefers-reduced-motion: {reducido === null ? "…" : reducido ? "sí" : "no"}
            {" · "}
            --motion-curtain-phase: {duracion || "…"}
          </p>
        </section>

        <section aria-labelledby="t-puente" className="prueba__seccion">
          <h2 id="t-puente" className="etiqueta etiqueta--apagada">
            0 · Puente de tokens a utilidades de Tailwind
          </h2>
          <p className="prueba__nota">
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

        <section aria-labelledby="t-si" className="prueba__seccion">
          <h2 id="t-si" className="etiqueta etiqueta--apagada">
            1 · Con cortina — color del destino
          </h2>
          <p className="prueba__nota">
            Cada link tiene que tapar con el acento de la página a la que va.
          </p>
          <div className="prueba__fila">
            {PAGINAS.map((p) => (
              <EnlaceConCortina
                key={p.ruta}
                to={p.ruta}
                className="prueba__pastilla"
                style={parDeColor(p.acento, p.sobre)}
              >
                {p.nombre}
              </EnlaceConCortina>
            ))}
          </div>
        </section>

        <section aria-labelledby="t-no" className="prueba__seccion">
          <h2 id="t-no" className="etiqueta etiqueta--apagada">
            2 · Sin cortina — el navegador manda
          </h2>
          <ul className="prueba__lista">
            <li>
              <strong>⌘/Ctrl + click</strong> en cualquier link de arriba: abre pestaña nueva, sin
              cortina, sin cambiar esta página.
            </li>
            <li>
              <strong>Click del medio</strong>: idem.
            </li>
            <li>
              <EnlaceConCortina to="/casos" target="_blank" rel="noreferrer">
                <strong>Link con target="_blank"</strong>
              </EnlaceConCortina>{" "}
              — pestaña nueva, sin cortina.
            </li>
            <li>
              <a href="https://example.org" target="_blank" rel="noreferrer">
                <strong>Link externo</strong>
              </a>{" "}
              — nunca lo tocamos.
            </li>
            <li>
              <strong>Atrás / adelante</strong> del navegador: instantáneo, sin cortina. Es la
              decisión tomada.
            </li>
          </ul>
        </section>

        <section aria-labelledby="t-borde" className="prueba__seccion">
          <h2 id="t-borde" className="etiqueta etiqueta--apagada">
            3 · Bordes
          </h2>
          <div className="prueba__fila">
            <EnlaceConCortina to="/pruebas/route-curtain" className="boton boton--contorno">
              A la misma página (no debe pasar nada)
            </EnlaceConCortina>
            <EnlaceConCortina to="/ruta-que-no-existe" className="boton boton--contorno">
              A una ruta inexistente (404 bajo la cortina)
            </EnlaceConCortina>
          </div>
          <p className="prueba__nota">
            <strong>Clicks repetidos:</strong> apretá dos links distintos lo más rápido que puedas.
            El segundo se tiene que descartar — no encolarse ni cortar la animación en curso.
          </p>
          <p className="prueba__nota">
            <strong>Control:</strong> los de abajo son <code>&lt;Link&gt;</code> de TanStack, sin
            cortina. Sirven para separar lo que rompe nuestro componente de lo que ya hacía el
            andamiaje.
          </p>
          <div className="prueba__fila">
            <Link to="/" className="boton boton--contorno" data-control="1">
              Control · Inicio sin cortina
            </Link>
            <Link to="/casos" className="boton boton--contorno" data-control="1">
              Control · Casos sin cortina
            </Link>
          </div>
          <p className="prueba__nota">
            <strong>Teclado:</strong> navegá con Tab y Enter. Al terminar la cortina el foco tiene
            que estar en el contenido de la página nueva, no volver al principio del documento.
            Durante la cortina, Tab no debe alcanzar nada de la página tapada.
          </p>
        </section>
      </div>
    </>
  );
}
