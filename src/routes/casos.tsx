import { createFileRoute } from "@tanstack/react-router";

import { PaginaProvisional } from "../componentes/AndamioF0";

export const Route = createFileRoute("/casos")({
  head: () => ({
    meta: [
      { title: "Casos · Velocentum" },
      { name: "description", content: "" },
      { property: "og:title", content: "Casos · Velocentum" },
      { property: "og:description", content: "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Casos,
});

/* PROVISIONAL — andamio de F0. El contenido real de esta página
   se construye en F2, con los bloques del plan. */
function Casos() {
  return <PaginaProvisional nombre="Casos" acento="var(--acento-3)" sobre="var(--texto-sobre-3)" />;
}
