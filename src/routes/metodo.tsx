import { createFileRoute } from "@tanstack/react-router";

import { PaginaProvisional } from "../componentes/AndamioF0";

export const Route = createFileRoute("/metodo")({
  head: () => ({
    meta: [
      { title: "Método · Velocentum" },
      { name: "description", content: "" },
      { property: "og:title", content: "Método · Velocentum" },
      { property: "og:description", content: "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Metodo,
});

/* PROVISIONAL — andamio de F0. El contenido real de esta página
   se construye en F3, con los bloques del plan. */
function Metodo() {
  return (
    <PaginaProvisional nombre="Método" acento="var(--acento-2)" sobre="var(--texto-sobre-2)" />
  );
}
