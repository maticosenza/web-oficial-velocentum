/* ===========================================================
   B3 · TRABAJOS

   Titular a la izquierda, botón a la derecha en la misma línea
   de base, y cuatro piezas en dos filas de dos, que entran
   inclinadas y salidas de cuadro por los costados, se enderezan
   y se cierran hacia el centro. Cada tarjeta con el pie
   festoneado.

   UNA SOLA REGLA PARA LAS DOS FILAS
   Cada pieza entra desde el lado de SU COLUMNA. Izquierda por la
   izquierda, derecha por la derecha, en las dos filas igual. La
   fila de abajo no hace nada distinto de la de arriba: si
   entrara cruzada, los recorridos se pisarían y dejaría de
   leerse "se cierran hacia el centro"; si entrara desde abajo,
   sería otro gesto dentro del mismo bloque.

   La dirección se deriva del índice y no se escribe a mano, así
   no puede quedar desalineada de la columna que le toca.

   No hace falta escalonar nada: `useProgresoDeScroll` mide por
   elemento, así que la fila de abajo arranca sola cuando le toca
   entrar en cuadro. La repetición se lee como ritmo.

   ES UN VALOR CONTINUO, NO UN REVEAL
   El plan es explícito: `translateX` + `rotate` + `scale`
   interpolados contra el progreso de scroll. Reveal es otra
   cosa —dispara una vez y se queda— y acá el movimiento tiene
   que deshacerse si el usuario scrollea para arriba. Por eso va
   `useProgresoDeScroll`, el mismo primitivo que usa el giro de
   las tarjetas de B4.

   EL FALLBACK DE `--progreso` ES 1, NO 0
   `var(--progreso, 1)` en el CSS. Si el JS no corre —o antes de
   hidratar— las tarjetas se quedan en su estado FINAL: derechas
   y centradas. Nunca fuera de cuadro. El estado sin JS tiene que
   ser el visible, nunca el escondido.

   LA CAPA QUE SE MIDE NO ES LA QUE SE MUEVE
   Dos capas, igual que el `hueco`/`giro` de ServiceStack. La de
   afuera es la celda de la grilla: quieta, sin transformar, y es
   la que mide el hook. La de adentro lleva la transformación.

   Dos razones, con distinto grado de evidencia:

   1. `[VERIFICADO]` `useProgresoDeScroll` decide con
      `getBoundingClientRect()`, que en un elemento transformado
      devuelve la caja YA rotada y escalada, no la de layout. Se
      ve midiendo las tarjetas de B4, que sí tienen el giro en el
      elemento medido: el marco de 279px de ancho se lee 304
      mientras la tarjeta está rotada. Con `translateX` de 62% y
      `scale` la desviación es mucho mayor, y la medición pasaría
      a depender de su propio resultado.

   2. `[PRECAUCIÓN, no observado]` A `--progreso: 0` la tarjeta
      queda corrida 62% hacia afuera, fuera de `.b3`, que tiene
      `overflow-x: clip`. El IntersectionObserver tiene en cuenta
      el recorte de los ancestros, así que podría darla por no
      visible y dejar de anotarla — y sin recalcular se quedaría
      en 0 para siempre. No lo vi pasar; separar las capas lo
      vuelve imposible, así que no hace falta averiguarlo.

   Con la celda de afuera quieta, el observer siempre ve algo que
   no se mueve ni se recorta, y la medición no se muerde la cola.

   LAS TARJETAS NO SON ENLACES, Y POR ESO NO TIENEN HOVER
   El plan pide "hover con estado propio", pero eso presupone que
   la tarjeta lleva a algún lado. No hay subpáginas por caso: la
   decisión 4 del plan —qué reemplaza al botón por caso— sigue
   abierta. Un estado de hover sobre algo que no responde al
   click promete una interacción que no existe. Cuando se cierre
   esa decisión, la tarjeta pasa a ser enlace y ahí el hover
   significa algo. Hasta entonces, el único control de la sección
   es el botón a `/casos`.

   EL FESTÓN CUELGA EN EL COLOR DEL CAMPO
   `SectionEdge` con `borde="abajo"` es una franja de alto fijo
   que cuelga por debajo, no una máscara sobre el medio. Con el
   campo de color del placeholder queda exacto. **Cuando lleguen
   los videos reales hay que mirar esto de nuevo:** si el video
   llena el campo hasta el borde, se va a ver la juntura entre el
   video y la franja plana. La salida es dejar que el campo
   respire alrededor del video, para que la franja continúe un
   color que ya está a la vista.
   =========================================================== */

import { useRef } from "react";

import { CASOS_EN_LA_HOME, type Medio } from "../data/casos";
import { MedioDeCaso } from "../componentes/MedioDeCaso";
import { EnlaceConCortina } from "../componentes/RouteCurtain";
import { Reveal } from "../componentes/Reveal";
import { Flecha } from "../componentes/Flecha";
import { useProgresoDeScroll } from "../lib/progresoDeScroll";

/* La categoría dejó de ser marcador: es el rubro que definió
   Matías, el mismo que se muestra en `/casos`. Sale de
   `data/casos.ts` y no de una lista aparte, porque son el mismo
   dato mirado desde dos lugares — con dos copias, una se
   actualiza y la otra no.

   Quedan más cortos que el rango medido en la referencia, 13–20:
   el más largo de los cuatro es `Indumentaria`, 12. Sobra lugar,
   que es el lado bueno del problema. */

/* Los cuatro clientes ya no son marcadores: son los cuatro
   primeros de la lista de casos, en su mismo orden, y salen de
   `data/casos.ts` para que la home y `/casos` no puedan divergir.

   El nombre más largo de los cuatro es `Glam Ragazza`, 12
   caracteres — bien adentro del rango medido de 4-23.

   `Patagonia Vessels`, que ocupaba la primera ranura mientras no
   había lista cerrada, salió: es cliente, no caso, y va
   únicamente como logo en el marquee de B7.

   Dos filas de dos. El orden es el de la grilla: 0 y 2 caen en la
   columna izquierda, 1 y 3 en la derecha. */
const PIEZAS = CASOS_EN_LA_HOME;

/** Indice par -> columna izquierda -> entra por la izquierda. */
function direccionDe(indice: number): number {
  return indice % 2 === 0 ? -1 : 1;
}

export function B3Trabajos() {
  return (
    <section className="b3" aria-labelledby="b3-titulo">
      <div className="b3__contenido contenido">
        {/* Titular y botón comparten línea de base, como en la
            referencia. No es `align-items: center`: el botón se
            apoya en la base de las letras del titular. */}
        <div className="b3__encabezado">
          <Reveal as="h2" indice={0} id="b3-titulo" className="b3__titular">
            Trabajos
          </Reveal>

          <Reveal indice={1} className="b3__accion">
            <EnlaceConCortina to="/casos" className="boton boton--contorno">
              Ver casos
              <Flecha />
            </EnlaceConCortina>
          </Reveal>
        </div>

        <p className="etiqueta etiqueta--apagada b3__pendiente">
          Pendiente · el uso autorizado de cada cliente está sin confirmar.
        </p>

        <div className="b3__piezas">
          {PIEZAS.map((caso, i) => (
            <Trabajo
              key={caso.nombre}
              nombre={caso.nombre}
              rubro={caso.rubro}
              medio={caso.medio}
              direccion={direccionDe(i)}
              prioritario={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Trabajo({
  nombre,
  rubro,
  medio,
  direccion,
  prioritario,
}: {
  nombre: string;
  rubro: string;
  medio: Medio;
  direccion: number;
  prioritario: boolean;
}) {
  /* El hook mide la capa de afuera, que no se mueve. Ver la nota
     de arriba: medir la capa transformada traba el bloque. */
  const ref = useRef<HTMLElement>(null);
  useProgresoDeScroll(ref);

  return (
    <article ref={ref} className="b3-trabajo">
      {/* Capa 2: la que se mueve. El medio, el festón y el pie van
          adentro, así entran como una sola pieza. */}
      <div className="b3-trabajo__movil" style={{ "--dir": direccion } as React.CSSProperties}>
        {/* LA ONDA ENMASCARA EL MEDIO, NO CUELGA DEBAJO.
            Mientras el campo era un color plano, un festón del
            mismo color colgando abajo se leía como parte de él.
            Con una foto o un video adentro, ese festón pasa a ser
            una guarda de color que no pertenece a la pieza. Así
            que ahora la onda RECORTA el propio medio: sigue siendo
            el hilo que cose el sitio, y el borde de abajo del
            video es la nube. La máscara vive en el CSS. */}
        <div className="b3-trabajo__medio">
          <MedioDeCaso className="b3-trabajo__pieza" medio={medio} prioritario={prioritario} />
        </div>

        {/* Categoría chica arriba, nombre grande abajo. */}
        <div className="b3-trabajo__pie">
          <p className="etiqueta etiqueta--apagada">{rubro}</p>
          <h3 className="b3-trabajo__nombre">{nombre}</h3>
        </div>
      </div>
    </article>
  );
}
