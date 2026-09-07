import { createFileRoute } from "@tanstack/react-router";

import { B0Nav } from "../bloques/B0Nav";
import { CON1Flujo } from "../bloques/CON1Flujo";
import { CON3Directo } from "../bloques/CON3Directo";
import { B9Footer } from "../bloques/B9Footer";
import { CursorPropio } from "../componentes/CursorPropio";

const DESCRIPCION =
  "Contanos en qué rubro estás y qué querés lograr, y reservá una llamada de 45 minutos sin costo.";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto · Velocentum" },
      { name: "description", content: DESCRIPCION },
      { property: "og:title", content: "Contacto · Velocentum" },
      { property: "og:description", content: DESCRIPCION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contacto,
});

/* ⚠ ESTA PÁGINA NO LLEVA B8Cierre, Y NO ES UN OLVIDO.
   B8 es el llamado a reservar la llamada, y ésta es la página de
   reservar la llamada: cerrar acá con un botón que lleva acá mismo
   es un lazo. Las otras tres páginas sí lo llevan, porque desde
   ellas el CTA va a algún lado.

   Por eso también el orden es más corto que el de las otras:
   nav, el bloque de dos columnas, el contacto directo y el pie. */
function Contacto() {
  return (
    <>
      {/* Al tope y fuera de todo bloque, por lo mismo que en la
          home: adentro de un contexto de apilado su z-index deja
          de competir contra la página. Ver `CursorPropio.tsx`. */}
      <CursorPropio />

      <B0Nav />

      <CON1Flujo />
      <CON3Directo />

      <B9Footer />
    </>
  );
}
