import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/casos")({
  head: () => ({
    meta: [
      { title: "Casos" },
      { name: "description", content: "" },
      { property: "og:title", content: "Casos" },
      { property: "og:description", content: "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Casos,
});

function Casos() {
  return <main />;
}
