/* ===========================================================
   ANDAMIO DE F0 — PROVISIONAL, SE BORRA EN F1

   El nav provisional YA NO ESTÁ: lo reemplazó B0, que es el
   definitivo, y estas páginas lo usan tal cual.

   Lo que queda acá es sólo lo que todavía no tiene reemplazo:
   `parDeColor`, que usan las páginas de prueba de F0, y
   `PaginaProvisional`, que sostiene Método, Casos y Contacto
   hasta que se construyan. Cuando existan las tres, este archivo
   se borra.
   =========================================================== */

import { type CSSProperties } from "react";

import { B0Nav } from "../bloques/B0Nav";
import { PAGINAS } from "../lib/paginas";

/** El par acento + texto-sobre-acento, como datos para el CSS. */
export function parDeColor(acento: string, sobre: string): CSSProperties {
  return { "--acento": acento, "--sobre": sobre } as CSSProperties;
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
      <B0Nav />
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
