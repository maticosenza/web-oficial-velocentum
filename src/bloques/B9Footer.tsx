/* ===========================================================
   B9 · FOOTER

   Único bloque oscuro de la página. La nube sube sobre B8 igual
   que la de B8 sube sobre B7, sólo que en el color del footer:
   el borde siempre lleva el color de la sección que ENTRA.

   ES UNA `section` CON `role="contentinfo"`, NO UN `footer`
   Parece al revés y tiene motivo. La reserva de espacio del
   borde de onda la hace `componentes.css` con
   `*:has(+ * > .borde-onda[data-borde="arriba"])`: pide que la
   onda sea HIJA DIRECTA del hermano siguiente. Envolviendo esto
   en un `<footer>`, la onda pasa a ser nieta, la regla no
   engancha y la onda se come el cierre de B8.

   `role="contentinfo"` sobre la sección le da a la tecnología
   asistiva exactamente el mismo landmark que un `<footer>` de
   primer nivel, así que no se pierde nada y la reserva sigue
   siendo automática, que es de lo que se trata el sistema.

   LOS DATOS SON REALES
   Mail y las tres redes están confirmados. Este bloque no lleva
   marcadores. **No se enlaza a `velocentum.agency`:** fue una
   decisión explícita, no un olvido.

   LOS RECTÁNGULOS LLEVAN EL COLOR DE SU PÁGINA
   El mismo acento que el link de esa página en el nav, con su
   `--texto-sobre-N`. Son cuatro porque son cuatro páginas.

   La lista sale de `lib/paginas.ts`, la misma que usa el nav, así
   que los nombres y los colores no pueden decir cosas distintas
   en los dos lados. Antes había una copia acá.

   LAS REDES ABREN EN PESTAÑA NUEVA Y LO AVISAN
   Abrir una pestaña sin decirlo desorienta a quien no ve el
   cambio de contexto. El aviso va en texto para lectores de
   pantalla; para el resto lo dice la flecha, que en este sistema
   ya significa "sale del sitio".

   No hay íconos de marca en `public/assets`, así que la píldora
   es texto más la flecha. Cuando existan, entran acá.
   =========================================================== */

import type { CSSProperties } from "react";

import { SeccionConBorde } from "../componentes/SectionEdge";
import { EnlaceConCortina } from "../componentes/RouteCurtain";
import { Flecha } from "../componentes/Flecha";
import { TextoBoton } from "../componentes/TextoBoton";
import { PAGINAS } from "../lib/paginas";
import { MAIL } from "../data/contacto";

const REDES = [
  { nombre: "LinkedIn", url: "https://www.linkedin.com/company/velocentum/" },
  { nombre: "Instagram", url: "https://www.instagram.com/velocentum/" },
  { nombre: "Facebook", url: "https://www.facebook.com/velocentum/" },
];

export function B9Footer() {
  return (
    <SeccionConBorde
      color="var(--tinta)"
      sobre="var(--fondo)"
      borde="arriba"
      className="b9"
      role="contentinfo"
      aria-label="Pie de página"
    >
      <div className="b9__contenido contenido">
        <div className="b9__cabecera">
          <div className="b9__marca">
            {/* La V va sola, sin contenedor. identidad.md lo define
                como opcional y no como parte del símbolo, y acá no
                aporta: el disco crema existía porque la V negra
                necesitaba campo claro, y el anillo que lo
                reemplazó sólo le quitaba tamaño. El SVG bicolor
                trae sus dos colores y se apoya directo sobre el
                campo oscuro. */}
            <div className="b9__isotipo">
              <img
                src="/assets/velocentum-v-bicolor-ui.svg"
                alt=""
                aria-hidden="true"
                width={997}
                height={841}
                loading="lazy"
              />
            </div>

            <div className="b9__identidad">
              {/* El wordmark ES el nombre de marca, así que su alt
                  lleva el texto y no va vacío. Versión blanca,
                  porque el campo es oscuro.

                  VA LA COPIA RECORTADA, Y ES SÓLO UN RECORTE. El
                  archivo de marca es un lienzo de 2117×743 con la
                  palabra adentro ocupando 1925×291: más de un
                  tercio del alto es transparente, así que la caja
                  medía mucho más que la palabra. `-tight.webp`
                  recorta ese aire y entrega 768×119, resolución
                  suficiente para el ancho óptico del footer incluso
                  en pantallas de alta densidad. El original queda
                  intacto. */}
              <img
                className="b9__logotipo"
                src="/assets/velocentum-logotipo-blanco-tight.webp"
                alt="Velocentum"
                width={768}
                height={119}
                loading="lazy"
              />
              <a className="b9__mail" href={`mailto:${MAIL}`}>
                {MAIL}
              </a>
            </div>
          </div>

          <ul className="b9__redes" role="list">
            {REDES.map((r) => (
              <li key={r.nombre}>
                <a
                  className="boton boton--contorno"
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TextoBoton texto={r.nombre} />
                  <Flecha />
                  <span className="solo-lectores">(se abre en una pestaña nueva)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="b9__paginas" aria-label="Páginas del sitio">
          {PAGINAS.map((p) => (
            <EnlaceConCortina
              key={p.ruta}
              to={p.ruta}
              className="b9-pagina"
              style={{ "--acento": p.acento, "--sobre": p.sobre } as CSSProperties}
            >
              <span className="b9-pagina__nombre">{p.nombre}</span>
            </EnlaceConCortina>
          ))}
        </nav>

        {/* Barra de cierre: línea fina arriba, firma a la
            izquierda y la línea legal a la derecha.

            La palabra va como TEXTO y no como el logotipo: el
            wordmark ya está arriba, y repetirlo acá lo
            convertiría en decoración. Acá es una firma, no una
            marca.

            El isotipo es decorativo —`aria-hidden`— porque la
            palabra de al lado ya dice el nombre; si no, un lector
            leería "Velocentum velocentum". */}
        <div className="b9__barra">
          <p className="b9__firma">
            <span className="b9__firma-iso" aria-hidden="true">
              <img src="/assets/velocentum-v-bicolor-ui.svg" alt="" width={997} height={841} />
            </span>
            velocentum
          </p>

          {/* El año está escrito, no calculado: un `getFullYear()`
              en el servidor y en el cliente puede no coincidir, y
              esto no vale una discrepancia de hidratación.
              Hay que actualizarlo a mano cada enero. */}
          <p className="b9__legal">
            <span>Diseñado por Velocentum</span> <span>© 2026 · Todos los derechos reservados</span>
          </p>
        </div>
      </div>
    </SeccionConBorde>
  );
}
