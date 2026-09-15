/* ===========================================================
   MET-4 · SISTEMAS ESPECIALIZADOS

   El Método Velocentum sigue siendo el sistema principal. Estas
   dos tarjetas muestran aplicaciones comerciales del mismo
   método y por eso cambian de lenguaje visual: son geométricas,
   sin numeración ni objetos 3D, para que no se lean como los
   pasos 05 y 06 de la sección anterior.

   Los destinos son otras propiedades del ecosistema Velocentum.
   Abren en la misma pestaña, como navegación normal: el usuario
   puede volver con el control del navegador.
   =========================================================== */

import { Reveal } from "../componentes/Reveal";

const SISTEMAS = [
  {
    clase: "met4-sistema--ecommerce",
    etiqueta: "Sistema E-commerce",
    titulo: "Crecer con números, contenido y conversión.",
    texto:
      "Analizamos el negocio, detectamos qué limita las ventas y conectamos estrategia, creatividad, adquisición y experiencia de compra en un mismo plan.",
    items: ["Diagnóstico y proyección", "Contenido y adquisición", "Web, tracking y conversión"],
    cta: "Ver sistema E-commerce",
    href: "https://ecommerce.velocentum.com",
  },
  {
    clase: "met4-sistema--industrial",
    etiqueta: "Sistema Industrial",
    titulo: "Mostrar capacidad. Generar oportunidades.",
    texto:
      "Combinamos posicionamiento en Google, contenido del proceso productivo y herramientas comerciales para hacer visible la capacidad de la empresa y convertir consultas en oportunidades.",
    items: [
      "Google Search y posicionamiento",
      "Empresa, historia y procesos",
      "Web, cotizaciones y gestión",
    ],
    cta: "Ver sistema Industrial",
    href: "https://velocentum.agency",
  },
] as const;

export function MET4Sistemas() {
  return (
    <section className="met4" aria-labelledby="met4-titulo">
      <div className="met4__marca" aria-hidden="true" />

      <div className="met4__contenido contenido">
        <Reveal as="header" className="met4__cabecera">
          <p className="etiqueta met4__eyebrow">Dos sistemas especializados</p>
          <h2 id="met4-titulo" className="met4__titulo">
            Un método. Dos formas de aplicarlo.
          </h2>
          <p className="met4__introduccion">
            El método integral de Velocentum se adapta al tipo de negocio. Para e-commerce, pone el
            foco en crecimiento y conversión. Para industrias, en posicionamiento, comunicación y
            desarrollo comercial.
          </p>
        </Reveal>

        <div className="met4__sistemas">
          {SISTEMAS.map((sistema, indice) => (
            <Reveal
              as="article"
              key={sistema.etiqueta}
              indice={indice}
              className={`met4-sistema ${sistema.clase}`}
            >
              <p className="etiqueta met4-sistema__etiqueta">{sistema.etiqueta}</p>
              <h3 className="met4-sistema__titulo">{sistema.titulo}</h3>
              <p className="met4-sistema__texto">{sistema.texto}</p>

              <ul className="met4-sistema__items">
                {sistema.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <a className="met4-sistema__cta" href={sistema.href}>
                <span>{sistema.cta}</span>
                <span className="met4-sistema__flecha" aria-hidden="true">
                  ↗
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
