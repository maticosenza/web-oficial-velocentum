/* ===========================================================
   CAS-2 · LA LISTA DE CASOS

   Tres capas superpuestas. Entenderlas es entender la página.

   1. LA LISTA, que scrollea normal. Cada caso mide `--alto-caso`
      —80vh, ya en tokens— y con eso el siguiente queda justo
      fuera de cuadro: se ve uno por vez sin scroll-snap y sin una
      línea de JavaScript de paginado.

   2. EL TITULAR PINNEADO AL PIE. `sticky` dentro del contenedor de
      la lista, apoyado abajo, con los casos pasando por encima.
      Al terminar la lista el sticky se suelta solo y el titular
      sale con la sección — no hace falta el centinela de la
      referencia, que existía para el paginado que acá no va.

   3. LOS DEGRADADOS DE BORDE, arriba y abajo, de
      `--degradado-borde`. NO son blur: son degradados planos del
      color de fondo a transparente. Verificado en la referencia —
      sus bloques se llaman `Top Blur` y `Bottom Blur` pero no hay
      una sola declaración de `filter` ni `backdrop-filter` en toda
      la página. Un degradado es mucho más barato y no castiga el
      rendimiento en teléfonos.

   SIN PAGINADO Y SIN SUBPÁGINAS
   Son ocho casos fijos, así que no hay nada que paginar. Y las
   tarjetas no son enlaces: el único destino de la página es el CTA
   del cierre. Eso alcanza también a B3 en la home.

   LA ENTRADA ES `ScrollMedia`, NO UN COMPONENTE NUEVO
   Marco 0.7→1 con la imagen 1.3→1 y el texto sin escalar, atado al
   progreso de scroll. Se le agregó una tercera columna con una
   prop, igual que `HeroSticky` con su `offset`.

   NADA DE ESTO SE INVENTA POR CASO: los ocho salen de
   `data/casos.ts`, que es la fuente única que comparte con B3.
   =========================================================== */

import type { CSSProperties } from "react";

import { ScrollMedia } from "../componentes/ScrollMedia";
import { CASOS, LOGOS, type Caso } from "../data/casos";

/* Mismo criterio que el anillo de B7: círculo relleno del acento
   con el logo blanco adentro, y el mismo ciclo de tres colores.

   ⚠ EL CICLO NO USA EL ACENTO DE ESTA PÁGINA. Casos es verde, y el
   verde es justamente el que no pasa: blanco sobre él da 2.20:1
   contra el mínimo de 3 para objeto gráfico. El contenedor no
   puede llevar el color de su propia página. */
const ACENTOS = ["var(--acento-1)", "var(--acento-2)", "var(--acento-4)"];

function Identificacion({ caso, indice }: { caso: Caso; indice: number }) {
  const logo = LOGOS[caso.nombre];
  return (
    <div className="cas-caso__id">
      {/* Decorativo: el nombre va debajo en texto, así que un `alt`
          acá haría que el lector dijera dos veces lo mismo. */}
      <div
        className="cas-caso__logo"
        aria-hidden="true"
        style={
          {
            "--anillo": ACENTOS[indice % ACENTOS.length],
            "--logo-ancho": logo?.ancho ?? 0.6,
          } as CSSProperties
        }
      >
        <img src={logo?.archivo} alt="" loading="lazy" />
      </div>

      <p className="cas-caso__nombre">{caso.nombre}</p>
      <p className="etiqueta cas-caso__rubro">{caso.rubro}</p>
    </div>
  );
}

export function CAS2Lista() {
  return (
    <section className="cas2" aria-labelledby="cas2-titulo">
      <h2 id="cas2-titulo" className="solo-lectores">
        Los {CASOS.length} casos
      </h2>

      <p className="etiqueta etiqueta--apagada cas2__pendiente contenido">
        Pendiente · los logos y las imágenes no existen todavía, las ocho frases están sin aprobar y
        el uso autorizado de cada cliente está sin confirmar.
      </p>

      <div className="cas2__lista">
        {/* El titular decorativo. El encabezado real de la página
            es el H1 de CAS-1: éste repite la palabra en grande y
            va `aria-hidden` para no anunciarla dos veces.
            `pointer-events: none` es obligatorio o tapa los clics
            de las tarjetas, y `user-select: none` evita que se
            seleccione al arrastrar sobre un caso. Los dos están en
            el CSS. */}
        <div className="cas2__pin" aria-hidden="true">
          <p className="cas2__pin-texto">Casos</p>
        </div>

        <ol className="cas2__casos" role="list">
          {CASOS.map((caso, i) => (
            <li key={caso.nombre} className="cas-caso">
              <ScrollMedia
                className="cas-caso__cuerpo"
                izquierda={<Identificacion caso={caso} indice={i} />}
                medio={
                  /* PENDIENTE: las imágenes tampoco existen. El
                     marco lleva la proporción real para que el
                     bloque no se mueva cuando entren. */
                  <div
                    className="cas-caso__medio"
                    role="img"
                    aria-label={`Imagen pendiente del caso ${caso.nombre}.`}
                  />
                }
                texto={
                  <p className="cas-caso__frase">
                    {caso.frase}
                    {caso.revisar ? <span className="solo-lectores"> {caso.revisar}</span> : null}
                  </p>
                }
              />
            </li>
          ))}
        </ol>

        {/* Los degradados de borde, en su propia capa fijada.
            Tienen que quedar ARRIBA de los casos —son del color
            del fondo y lo que hacen es taparlos al entrar y al
            salir—, mientras que el titular queda abajo. Por eso
            son dos capas separadas y no una sola: en la referencia
            comparten contenedor y el titular termina delante de
            las tarjetas. */}
        <div className="cas2__bordes" aria-hidden="true">
          <div className="cas2__borde cas2__borde--arriba" />
          <div className="cas2__borde cas2__borde--abajo" />
        </div>
      </div>
    </section>
  );
}
