/* ===========================================================
   MET-1 · HERO DE MÉTODO

   Foto a sangre de borde a borde, overlay de tinta al 70% y el
   titular blanco encima. Sin pin, sin nube.

   NO LLEVA BORDE DE ONDA, Y ES LO QUE LO DEFINE
   El hero de la home entra en la nube: éste es una foto plana de
   borde a borde. Ese contraste ES el argumento de la página. La
   nube vuelve en el cierre, MET-4.

   `100vh` EN LOS TRES BREAKPOINTS
   La home suelta el alto del hero bajo 810px porque ahí el pin se
   apaga y un hero fijado se comería el teléfono. Acá no hay pin,
   así que no hay nada que soltar: el alto se mantiene. Está
   verificado en la referencia — no hay una sola regla responsive
   para el contenedor de este hero.

   EL OVERLAY AL 70% ES EL DATO CLAVE
   Es lo que permite que una foto cualquiera funcione de fondo: la
   tiñe tanto que aporta textura y profundidad, no información. Y
   es lo que hace que el titular blanco se lea sin depender de qué
   hay en la imagen.
   =========================================================== */

import { useId, type CSSProperties } from "react";

import { Flecha } from "../componentes/Flecha";

export function MET1Hero() {
  const idPendiente = useId();

  return (
    <section className="met1" aria-labelledby="met1-titulo">
      {/* PENDIENTE: la foto de backstage no existe. Va el marco
          con la proporción del hero —pantalla completa— y dicho en
          el nombre accesible, para que no se confunda con una
          pieza real. Cuando exista, se reemplaza el fondo de esta
          capa y el overlay queda igual. */}
      <div
        className="met1__foto"
        role="img"
        aria-label="Marco reservado para una foto de backstage a sangre. La imagen real todavía no existe."
      >
        <p className="etiqueta met1__foto-nota">Foto pendiente · backstage</p>
      </div>

      {/* La tinta al 70%. Capa aparte de la foto: cuando entre la
          imagen real, esto no se toca. */}
      <div className="met1__velo" aria-hidden="true" />

      <div className="met1__contenido contenido">
        <h1 id="met1-titulo" className="met1__titular">
          Primero entender.
          <br />
          Después proponer.
        </h1>

        {/* El mismo marcador que la home: el destino de la agenda
            sigue sin definir, así que el botón no navega y el
            aviso va como su descripción accesible.
            `aria-disabled` y no `disabled`, por lo mismo que en
            B1: un `disabled` de verdad sale del orden de
            tabulación y su descripción no se anunciaría nunca. */}
        <div className="met1__cta">
          <button
            type="button"
            className="boton boton--relleno"
            style={
              { "--acento": "var(--acento-1)", "--sobre": "var(--texto-sobre-1)" } as CSSProperties
            }
            aria-disabled="true"
            aria-describedby={idPendiente}
          >
            Reservá tu análisis
            <Flecha />
          </button>
          <p id={idPendiente} className="solo-lectores">
            Pendiente: el destino de la agenda todavía no está definido, así que este botón no
            navega.
          </p>
        </div>
      </div>
    </section>
  );
}
