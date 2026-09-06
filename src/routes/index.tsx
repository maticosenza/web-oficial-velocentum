import { createFileRoute } from "@tanstack/react-router";

import { HeroSticky } from "../componentes/HeroSticky";
import { B1Hero } from "../bloques/B1Hero";
import { B2QuienesSomos } from "../bloques/B2QuienesSomos";
import { B3Trabajos } from "../bloques/B3Trabajos";
import { B4Servicios } from "../bloques/B4Servicios";
import { B5Pildoras } from "../bloques/B5Pildoras";
import { B6Proceso } from "../bloques/B6Proceso";
import { B7Clientes } from "../bloques/B7Clientes";
import { B8Cierre } from "../bloques/B8Cierre";
import { B9Footer } from "../bloques/B9Footer";
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

      {/* B3 y B4 van fuera del HeroSticky: cada uno tiene su
          mecánica de scroll y ninguna comparte contenedor con el
          pin del hero, que si no se pisarían. */}
      <B3Trabajos />
      <B4Servicios />

      <B5Pildoras />
      <B6Proceso />

      {/* B7 y B8 van cosidos, igual que B1 y B2: B7 queda fijado
          mientras el cierre azul sube encima. El offset sale del
          token del sistema, con el piso del nav real, así una
          tarjeta fijada nunca queda por debajo del nav. */}
      <HeroSticky
        offset="max(var(--sticky-clientes), calc(var(--alto-nav, 0px) + var(--space-2)))"
        hero={<B7Clientes />}
        siguiente={<B8Cierre />}
      />

      <B9Footer />
    </>
  );
}
