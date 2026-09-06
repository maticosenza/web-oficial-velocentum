/* ===========================================================
   B0 · NAV

   Card blanca flotante, centrada arriba, esquinas muy
   redondeadas y sombra suave. Logotipo a la izquierda y los
   cuatro links como botones propios, cada uno con el borde del
   acento de su página y el activo con fondo lleno.

   Fija en toda la página, por encima de todos los bloques: se ve
   sobre las tarjetas apiladas de B4 y sobre la nube azul de B8.

   FONDO SÓLIDO, SIN `backdrop-filter`
   Verificado en la referencia: no hay una sola declaración de
   `filter` ni `backdrop-filter` en todo su CSS. La card es
   blanca opaca. La sombra es `box-shadow`, que es otra cosa.

   EL COLOR TIENE FUNCIÓN, NO ES DECORACIÓN
   En la referencia los bordes de colores son al azar. Acá cada
   link lleva el acento de SU página, el mismo que reaparece en
   los bloques de esa página y en los rectángulos del footer. El
   nav es la leyenda del sistema de color del sitio, y por eso la
   lista vive en `lib/paginas.ts` y no acá: si el nav y el footer
   declararan cada uno la suya, la leyenda podría mentir.

   EL ACTIVO NO LLEVA TEXTO OSCURO
   El plan pide "fondo lleno del color de esa página, texto
   oscuro". Lo segundo no se cumple, medido: tinta sobre el
   violeta de Contacto da 3.72:1 y sobre el azul de Inicio
   4.08:1, los dos por debajo del mínimo de 4.5. Va el
   `--texto-sobre-N` de cada acento, y con eso los cuatro pasan.
   Misma decisión que en las píldoras de B5.

   EL ESTADO ACTIVO SE LEE DE `aria-current`
   El CSS se engancha del propio atributo, no de una clase
   aparte, así el color y la semántica no se pueden
   desincronizar. Y el activo no se distingue sólo por color:
   cambia el relleno, que es un cambio de forma.

   EL NAV SE MIDE SOLO
   Publica `--alto-nav` para que el apilado sticky de B4 y B7 no
   tenga que adivinar. Como el `<nav>` incluye su propio padding,
   lo que se publica es la banda entera que tapa arriba, no sólo
   el alto de la card.

   ⚠ EL COMPORTAMIENTO MÓVIL ES NUESTRO, NO DE LA REFERENCIA
   `03_referencia` lo deja explícito: las variantes mobile del
   nav están en Framer y no se pudieron medir. Así que acá no se
   copia nada. Bajo 810px la card se parte en dos filas —logotipo
   arriba, los cuatro links abajo— y los links se compactan para
   entrar en una sola fila. Lo que NO se toca es el alto mínimo
   de 48px de cada link: es el área táctil, y achicarla para
   ganar unos píxeles sería cambiar accesibilidad por estética.
   =========================================================== */

import { useRef, type CSSProperties } from "react";
import { useRouterState } from "@tanstack/react-router";

import { EnlaceConCortina } from "../componentes/RouteCurtain";
import { useMedirNav } from "../lib/altoDeNav";
import { PAGINAS } from "../lib/paginas";

export function B0Nav() {
  const rutaActual = useRouterState({ select: (s) => s.location.pathname });

  const navRef = useRef<HTMLElement>(null);
  useMedirNav(navRef);

  return (
    <nav ref={navRef} aria-label="Principal" className="b0">
      <div className="b0__card">
        {/* El logotipo lleva al inicio, que es lo que espera
            cualquiera que lo vea arriba a la izquierda. Su nombre
            accesible es el `alt` de la imagen. Duplica el link de
            "Inicio" a propósito: la convención pesa más que la
            repetición.
            Va la versión NEGRA con canal alfa, porque la card es
            blanca. */}
        <EnlaceConCortina to="/" className="b0__marca">
          <img
            src="/assets/velocentum-logotipo-negro.png"
            alt="Velocentum"
            width={2117}
            height={743}
          />
        </EnlaceConCortina>

        <ul className="b0__links" role="list">
          {PAGINAS.map((p) => (
            <li key={p.ruta}>
              <EnlaceConCortina
                to={p.ruta}
                className="b0__link"
                {...(p.ruta === rutaActual ? { "aria-current": "page" as const } : {})}
                style={{ "--acento": p.acento, "--sobre": p.sobre } as CSSProperties}
              >
                {p.nombre}
              </EnlaceConCortina>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
