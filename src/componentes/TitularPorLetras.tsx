/* ===========================================================
   TitularPorLetras — la entrada del titular del hero.

   Verificado en la referencia: las letras aparecen escalonadas,
   una por una, en la carga. Es la única animación de entrada del
   hero; en reposo la página está quieta.

   EL PROBLEMA DE ACCESIBILIDAD, Y CÓMO SE RESUELVE
   Partir un titular en un <span> por letra hace que muchos
   lectores de pantalla lo lean deletreado —"e, ese, te, a..."—
   porque cada span rompe la palabra en el árbol accesible.

   Acá el <h1> lleva su nombre accesible completo en `aria-label`
   y todo el andamiaje de letras va `aria-hidden`. El lector
   anuncia la frase entera, una vez; la pantalla muestra la
   animación. Son dos capas distintas del mismo contenido.

   NADIE QUEDA SIN TITULAR
   La animación va de opacidad 0 a 1 con `backwards`, no al
   revés. Si las animaciones no corren —movimiento reducido,
   navegador viejo, error— las letras se quedan en su estado
   normal, que es visible. El titular no depende de que algo se
   ejecute.
   =========================================================== */

import type { CSSProperties } from "react";

export function TitularPorLetras({
  lineas,
  className,
  id,
}: {
  /** Una entrada por línea. `marca` pinta la línea con el color de acción. */
  lineas: { texto: string; marca?: boolean }[];
  className?: string;
  id?: string;
}) {
  const textoPlano = lineas.map((l) => l.texto).join(" ");

  /* El índice corre a lo largo de TODO el titular, no por línea:
     si se reiniciara en cada renglón, las tres líneas arrancarían
     a la vez y el escalonado se vería en columnas. */
  let indice = 0;

  return (
    <h1
      {...(id ? { id } : {})}
      className={["titular-letras", className].filter(Boolean).join(" ")}
      aria-label={textoPlano}
    >
      <span aria-hidden="true">
        {lineas.map((linea) => (
          <span
            key={linea.texto}
            className="titular-letras__linea"
            data-marca={linea.marca ? "sí" : undefined}
          >
            {[...linea.texto].map((caracter, i) => (
              <span
                key={`${linea.texto}-${i}`}
                className="titular-letras__letra"
                style={{ "--i": indice++ } as CSSProperties}
              >
                {caracter === " " ? " " : caracter}
              </span>
            ))}
          </span>
        ))}
      </span>
    </h1>
  );
}
