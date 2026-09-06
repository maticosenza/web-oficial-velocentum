/* ===========================================================
   CAS-1 · HERO DE CASOS

   Deliberadamente chico. No es un hero a pantalla completa como
   los de Inicio y Método: acá el peso visual lo lleva el titular
   gigante que queda pinneado al pie durante todo el recorrido de
   la lista, y dos titulares grandes seguidos se pelearían.

   EL H1 VIVE ACÁ, NO EN EL TITULAR PINNEADO
   El titular grande de la lista lleva `pointer-events: none` y
   `user-select: none` —hacen falta o bloquea los clics de las
   tarjetas— y eso lo vuelve un mal lugar para el encabezado real
   de la página: no se puede seleccionar ni copiar. Así que el H1
   está acá y aquél queda como decoración, `aria-hidden`. La
   información no se pierde: es la misma palabra.

   LA BAJADA ESTÁ SIN APROBAR, COMO LAS OCHO FRASES
   Dice sólo lo que es verificable —que son ocho y que de cada uno
   se cuenta qué se hizo— y no promete resultados. Los porcentajes
   del sitio actual quedaron afuera por decisión tomada: no dicen
   de qué son ni contra qué base. Que está pendiente lo dice la
   línea de aviso de CAS-2, no la bajada: el aviso es andamio y el
   copy no tiene que hablar de su propio estado.
   =========================================================== */

import { Reveal } from "../componentes/Reveal";

export function CAS1Hero() {
  return (
    <section className="cas1" aria-labelledby="cas1-titulo">
      <div className="cas1__contenido contenido">
        <Reveal indice={0}>
          <p className="etiqueta etiqueta--apagada">Casos</p>
        </Reveal>

        <Reveal as="h1" indice={1} id="cas1-titulo" className="cas1__titular">
          Trabajos con nombre y apellido
        </Reveal>

        <Reveal indice={2}>
          <p className="cas1__bajada">Ocho clientes, y qué hicimos con cada uno.</p>
        </Reveal>
      </div>
    </section>
  );
}
