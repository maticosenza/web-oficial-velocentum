import { createFileRoute } from "@tanstack/react-router";

import { HeroSticky } from "../componentes/HeroSticky";
import { B1Hero } from "../bloques/B1Hero";
import { B2QuienesSomos } from "../bloques/B2QuienesSomos";
import { B4Servicios } from "../bloques/B4Servicios";
import { NavProvisional } from "../componentes/AndamioF0";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Velocentum · Crecimiento con control" },
      {
        name: "description",
        content:
          "Estrategia, contenido, pauta y conversión en un solo equipo, para tiendas de e-commerce que ya venden.",
      },
      { property: "og:title", content: "Velocentum · Crecimiento con control" },
      {
        property: "og:description",
        content:
          "Estrategia, contenido, pauta y conversión en un solo equipo, para tiendas de e-commerce que ya venden.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  return (
    <>
      {/* PROVISIONAL: el nav real es B0 y todavía no se construyó.
          Se reemplaza en la tanda que lo incluya. */}
      <NavProvisional />

      {/* B1 y B2 van cosidos: el hero se fija y B2 sube encima. */}
      <HeroSticky hero={<B1Hero />} siguiente={<B2QuienesSomos />} />

      {/* B4 va acá y no dentro del HeroSticky: su apilado es una
          pila propia. Metido adentro compartiría contenedor con el
          pin del hero y las dos mecánicas sticky se pisarían.

          B3 va ENTRE B2 y B4 según el orden de la página, pero se
          construye después: el plan manda armar B4 antes que B3
          porque B4 es el bloque que define el ritmo del medio. */}
      <B4Servicios />
    </>
  );
}
