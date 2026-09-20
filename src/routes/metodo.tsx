import { createFileRoute } from "@tanstack/react-router";

import { B0Nav } from "../bloques/B0Nav";
import { MET1Hero } from "../bloques/MET1Hero";
import { MET2SobreNosotros } from "../bloques/MET2SobreNosotros";
import { MET3Pasos } from "../bloques/MET3Pasos";
import { MET4Sistemas } from "../bloques/MET4Sistemas";
import { B8Cierre } from "../bloques/B8Cierre";
import { B9Footer } from "../bloques/B9Footer";
import { CursorPropio } from "../componentes/CursorPropio";

const DESCRIPCION =
  "Cómo trabajamos: primero entender el negocio, después proponer. Cuatro pasos, de la revisión del ecosistema a la ejecución del plan.";

export const Route = createFileRoute("/metodo")({
  head: () => ({
    meta: [
      { title: "Método · Velocentum" },
      { name: "description", content: DESCRIPCION },
      { property: "og:title", content: "Método · Velocentum" },
      { property: "og:description", content: DESCRIPCION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: "/assets/hero-metodo-mobile.webp",
        media: "(max-width: 809px) and (max-aspect-ratio: 3 / 4)",
        fetchPriority: "high",
      },
      {
        rel: "preload",
        as: "image",
        href: "/assets/hero-metodo-desktop-v2.webp",
        media: "(min-width: 810px), (min-aspect-ratio: 751 / 1000)",
        fetchPriority: "high",
      },
    ],
  }),
  component: Metodo,
});

function Metodo() {
  return (
    <>
      {/* Al tope y fuera de todo bloque, por lo mismo que en la
          home: adentro de un contexto de apilado su z-index deja
          de competir contra la página. Ver `CursorPropio.tsx`. */}
      <CursorPropio />

      <B0Nav />

      {/* Esta página no tiene sticky: cero pines. Los bloques van
          uno tras otro, sin pares cosidos. Es lo que la hace mucho
          más barata que la home, y la calma es correcta para una
          página que explica cómo trabajás. */}
      <MET1Hero />
      <MET2SobreNosotros />
      <MET3Pasos />
      <MET4Sistemas />

      {/* MET-5 es el mismo componente que B8, con otro copy.
          ⚠ LA SPEC DEL CIERRE PEDÍA SÓLO TITULAR Y CTA, Y ESO QUEDÓ
          DEROGADO: los tres cierres llevan bajada. Ésta retoma el
          titular del hero de Método —primero entender, después
          proponer— y lo dice desde la llamada. El eyebrow sí sigue
          apagado. */}
      <B8Cierre
        titulo="Empecemos por entender tu negocio."
        eyebrow=""
        bajada="Una llamada de 45 minutos, sin costo. Primero el diagnóstico, después la propuesta."
        centrado
      />

      {/* MET-6 es idéntico al footer de la home, con Método en su
          color. Eso sale solo de `lib/paginas.ts`. */}
      <B9Footer />
    </>
  );
}
