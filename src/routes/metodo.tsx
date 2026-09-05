import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/metodo")({
  head: () => ({
    meta: [
      { title: "Método" },
      { name: "description", content: "" },
      { property: "og:title", content: "Método" },
      { property: "og:description", content: "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Metodo,
});

function Metodo() {
  return <main />;
}
