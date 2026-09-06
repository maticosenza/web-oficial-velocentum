import { createFileRoute } from "@tanstack/react-router";

import { B0Nav } from "../bloques/B0Nav";
import { CAS1Hero } from "../bloques/CAS1Hero";
import { CAS2Lista } from "../bloques/CAS2Lista";
import { B8Cierre } from "../bloques/B8Cierre";
import { B9Footer } from "../bloques/B9Footer";
import { CursorPropio } from "../componentes/CursorPropio";

const DESCRIPCION =
  "Ocho clientes y qué hicimos con cada uno: moda, gastronomía, real estate, agro y seguros.";

export const Route = createFileRoute("/casos")({
  head: () => ({
    meta: [
      { title: "Casos · Velocentum" },
      { name: "description", content: DESCRIPCION },
      { property: "og:title", content: "Casos · Velocentum" },
      { property: "og:description", content: DESCRIPCION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Casos,
});

function Casos() {
  return (
    <>
      {/* Al tope y fuera de todo bloque, por lo mismo que en la
          home: adentro de un contexto de apilado su z-index deja
          de competir contra la página. Ver `CursorPropio.tsx`. */}
      <CursorPropio />

      <B0Nav />

      {/* Como Método, esta página no tiene pares cosidos. Lo único
          fijado es el titular de la lista, y vive adentro de su
          propia sección: no toca el resto de la página. */}
      <CAS1Hero />
      <CAS2Lista />

      {/* El mismo componente que B8, con otro copy. El eyebrow y la
          bajada se apagan pasando texto vacío, igual que en MET-4. */}
      <B8Cierre titulo="Contanos qué está pasando con tu negocio." eyebrow="" bajada="" />

      <B9Footer />
    </>
  );
}
