import { createFileRoute } from "@tanstack/react-router";

import { PaginaProvisional } from "../componentes/AndamioF0";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto · Velocentum" },
      { name: "description", content: "" },
      { property: "og:title", content: "Contacto · Velocentum" },
      { property: "og:description", content: "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contacto,
});

/* PROVISIONAL — andamio de F0. El contenido real de esta página
   se construye en F4, con los bloques del plan. */
function Contacto() {
  return (
    <PaginaProvisional nombre="Contacto" acento="var(--acento-4)" sobre="var(--texto-sobre-4)" />
  );
}
