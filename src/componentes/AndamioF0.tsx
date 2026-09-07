/* ===========================================================
   ANDAMIO DE F0 — LO QUE QUEDA

   El nav provisional YA NO ESTÁ: lo reemplazó B0, que es el
   definitivo, y las páginas de prueba lo usan tal cual.

   `PaginaProvisional` TAMPOCO ESTÁ. Sostuvo Método, después Casos
   y por último Contacto; con Contacto construido en F4 se quedó
   sin una sola página que sostener y se borró, junto con sus dos
   reglas de `componentes.css`. **Las cuatro páginas del sitio son
   ahora páginas de verdad.**

   Lo único que sobrevive es `parDeColor`, que usan las cuatro
   páginas de prueba de F0 en `routes/pruebas/` —`reveal`,
   `route-curtain`, `section-edge` y `service-stack`—, más el
   reexport de `PAGINAS`, que esas mismas páginas consumen.

   ⚠ ESTE ARCHIVO YA NO ES ANDAMIO DE PÁGINA, Y EL NOMBRE MIENTE.
   Es un ayudante de dos líneas con nombre de andamio, que es peor
   que un andamio: el nombre sugiere que se puede borrar cuando en
   realidad algo depende de él.

   PARA BORRARLO HACE FALTA UNA DE DOS COSAS:
   - retirar las cuatro páginas de prueba de F0, o
   - mover `parDeColor` a `lib/tokens.ts`, donde viven los otros
     ayudantes de sistema, y hacer que las pruebas importen
     `PAGINAS` directo de `lib/paginas.ts`.

   Lo segundo son diez minutos. Lo primero es una decisión sobre si
   las páginas de prueba siguen sirviendo ahora que las cuatro
   páginas reales existen — y esa decisión no es de F4.
   =========================================================== */

import { type CSSProperties } from "react";

import { PAGINAS } from "../lib/paginas";

/** El par acento + texto-sobre-acento, como datos para el CSS. */
export function parDeColor(acento: string, sobre: string): CSSProperties {
  return { "--acento": acento, "--sobre": sobre } as CSSProperties;
}

export { PAGINAS };
