import { createFileRoute } from "@tanstack/react-router";

import { PaginaProvisional } from "../componentes/AndamioF0";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inicio · Velocentum" },
      { name: "description", content: "" },
      { property: "og:title", content: "Inicio · Velocentum" },
      { property: "og:description", content: "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Inicio,
});

/* PROVISIONAL — andamio de F0. El contenido real de esta página
   se construye en F1, con los bloques del plan. */
function Inicio() {
  return (
    <PaginaProvisional nombre="Inicio" acento="var(--acento-1)" sobre="var(--texto-sobre-1)" />
  );
}
