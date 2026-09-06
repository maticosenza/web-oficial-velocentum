/* ===========================================================
   LAS CUATRO PÁGINAS Y SU COLOR

   Fuente única. La usan el nav (B0), el footer (B9) y, mientras
   existan, el andamio y sus páginas de prueba.

   POR QUÉ VIVE ACÁ Y NO EN EL NAV
   El plan dice que el color de cada link es el acento de esa
   página, y que el nav es "la leyenda del sistema de color del
   sitio". Si el nav y el footer declaran cada uno su lista, esa
   leyenda puede desincronizarse sin que nada falle: los
   rectángulos del footer dirían un color y el nav otro. Con una
   sola lista, eso no puede pasar.

   Antes había dos copias —una en el andamio y otra en B9— y esta
   reemplaza a las dos.

   EL PAR DE COLOR NO ES OPCIONAL
   Cada página lleva su acento Y su `--texto-sobre-N`. El plan
   pide para el estado activo del nav "texto oscuro", y no se
   cumple a propósito: tinta sobre el violeta de Contacto da
   3.72:1 y sobre el azul de Inicio 4.08:1, los dos por debajo
   del mínimo de 4.5. Con el par que corresponde, los cuatro
   pasan. Es la misma decisión que en las píldoras de B5.

   "Inicio" y no "Home": el resto del sitio está en castellano.
   =========================================================== */

export type Pagina = {
  ruta: "/" | "/metodo" | "/casos" | "/contacto";
  nombre: string;
  acento: string;
  sobre: string;
};

export const PAGINAS: readonly Pagina[] = [
  { ruta: "/", nombre: "Inicio", acento: "var(--acento-1)", sobre: "var(--texto-sobre-1)" },
  { ruta: "/metodo", nombre: "Método", acento: "var(--acento-2)", sobre: "var(--texto-sobre-2)" },
  { ruta: "/casos", nombre: "Casos", acento: "var(--acento-3)", sobre: "var(--texto-sobre-3)" },
  {
    ruta: "/contacto",
    nombre: "Contacto",
    acento: "var(--acento-4)",
    sobre: "var(--texto-sobre-4)",
  },
];
