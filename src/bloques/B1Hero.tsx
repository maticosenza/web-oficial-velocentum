/* ===========================================================
   B1 · HERO

   Campo --cielo, titular condensado de tres líneas con la
   tercera en --marca, bajada, CTA y dos objetos a los costados
   de la línea 2.

   LA ATMÓSFERA NO ES UN BLUR
   Verificado en la referencia: no hay una sola declaración de
   `filter` ni `backdrop-filter` en todo el CSS. El degradado del
   fondo es una imagen ya renderizada. Ese asset no existe
   todavía, así que acá va con degradados estáticos —que el plan
   admite explícitamente como equivalente— y no con un blur.

   LOS OBJETOS NO REEMPLAZAN LETRAS
   Van a los costados del renglón 2, no dentro de la palabra.
   Máximo dos en el hero, y no más de 6° de rotación.
   =========================================================== */

import { TitularPorLetras } from "../componentes/TitularPorLetras";
import { Flecha } from "../componentes/Flecha";

export function B1Hero() {
  return (
    <div className="b1">
      {/* Capa decorativa: la atmósfera nunca toca el texto. */}
      <div className="b1__atmosfera" aria-hidden="true" />

      <div className="b1__contenido contenido">
        <p className="etiqueta b1__eyebrow">Equipo de crecimiento</p>

        <div className="b1__titular">
          {/* Los objetos flanquean el renglón 2. Son decorativos:
              el significado está en el texto, no en ellos. */}
          <img
            className="b1__objeto b1__objeto--izq"
            src="/assets/foco.png"
            alt=""
            aria-hidden="true"
            width={1254}
            height={1254}
            loading="eager"
          />
          <img
            className="b1__objeto b1__objeto--der"
            src="/assets/rayo.png"
            alt=""
            aria-hidden="true"
            width={1254}
            height={1254}
            loading="eager"
          />
          <TitularPorLetras
            lineas={[
              { texto: "ESTAMOS EN EL" },
              { texto: "NEGOCIO DE HACER" },
              { texto: "CRECER NEGOCIOS", marca: true },
            ]}
          />
        </div>

        <p className="b1__bajada">
          Estrategia, contenido, pauta y conversión. Un mismo equipo, un plan claro y decisiones con
          tus números.
        </p>

        {/* PENDIENTE: el destino de la agenda no está decidido, así
            que el CTA no navega. Va como botón deshabilitado y con
            el pendiente escrito al lado: un enlace a ninguna parte
            sería peor que un botón que dice que todavía no está. */}
        <div className="b1__cta">
          <button type="button" className="boton boton--marca" disabled>
            Reservá tu análisis
            <Flecha />
          </button>
          <p className="etiqueta etiqueta--apagada">Pendiente · destino de la agenda sin definir</p>
        </div>
      </div>
    </div>
  );
}
