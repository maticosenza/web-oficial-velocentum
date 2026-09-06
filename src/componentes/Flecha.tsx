/* ===========================================================
   Flecha — la señal de continuación de los CTA.

   POR QUÉ UN SVG Y NO EL CARÁCTER "↗"
   U+2197 no está en ninguno de los dos subsets que servimos.
   El rango `latin` de Google Fonts trae ↑ (U+2191) y ↓ (U+2193)
   pero NO ↗. Con el carácter, esa flecha caería en una fuente
   de sistema: otro peso, otra línea de base, otro tamaño, y se
   nota al lado de Manrope en negrita.

   Verificado sobre los unicode-range de `src/fuentes.css`.

   Es decorativa: el texto del botón ya dice qué hace. Por eso
   `aria-hidden` y sin nombre accesible.
   =========================================================== */

export function Flecha({ className }: { className?: string }) {
  return (
    <svg
      className={["flecha", className].filter(Boolean).join(" ")}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 80 80 20 M22 20 H80 V78"
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
