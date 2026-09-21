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

   No hace falta escalonar nada: cada celda publica su propia view
   timeline, así que la fila de abajo arranca sola cuando le toca
   entrar en cuadro. La repetición se lee como ritmo.

   ES UN VALOR CONTINUO, NO UN REVEAL
   El plan es explícito: `translateX` + `rotate` + `scale`
   interpolados contra el progreso de scroll. Reveal es otra
   cosa —dispara una vez y se queda— y acá el movimiento tiene
   que deshacerse si el usuario scrollea para arriba. Por eso va
   una view timeline nativa. Safari la resuelve en el compositor,
   responde al gesto sin perseguirlo y revierte al subir.

   EL FALLBACK ES EL ESTADO FINAL
   Si el navegador no soporta scroll timelines, las tarjetas se
   quedan derechas y centradas. Nunca fuera de cuadro.

   LA CAPA QUE SE MIDE NO ES LA QUE SE MUEVE
   Dos capas, igual que el `hueco`/`giro` de ServiceStack. La de
   afuera es la celda de la grilla: quieta, sin transformar, y es
   la que mide el hook. La de adentro lleva la transformación.

   Dos razones, con distinto grado de evidencia:

   Con la celda de afuera quieta, la timeline siempre mide algo que
   no se mueve ni se recorta y no se muerde la cola.

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

import { useEffect, useRef } from "react";
import "lenis/dist/lenis.css";

import { CASOS_EN_LA_HOME, type Medio } from "../data/casos";
import { MedioDeCaso } from "../componentes/MedioDeCaso";
import { EnlaceConCortina } from "../componentes/RouteCurtain";
import { Reveal } from "../componentes/Reveal";
import { Flecha } from "../componentes/Flecha";
import { TextoBoton } from "../componentes/TextoBoton";

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

/* La referencia no enlaza el transform directamente al scroll: filtra
   el progreso con un resorte sobreamortiguado (damping 60, stiffness
   500, mass 1). Esa amortiguacion es la diferencia entre una card que
   cruza la pantalla de costado y una que parece ganar profundidad al
   entrar. El loop existe solo cerca de esta seccion, lee primero las
   cuatro cajas quietas y escribe despues sus capas transformadas. */
function useMovimientoAmortiguadoDeTrabajos() {
  const referencia = useRef<HTMLElement>(null);

  useEffect(() => {
    const seccion = referencia.current;
    const media = window.matchMedia(
      "(min-width: 600px) and (prefers-reduced-motion: no-preference)",
    );
    if (!seccion) return;

    let desactivar = () => {};

    const activar = () => {
      const piezas = Array.from(seccion.querySelectorAll<HTMLElement>(".b3-trabajo"));
      const moviles = piezas.map((pieza) => pieza.querySelector<HTMLElement>(".b3-trabajo__movil"));
      const estados = piezas.map(() => ({ valor: 0, velocidad: 0 }));
      const objetivos = piezas.map(() => 0);
      let cuadro = 0;
      let anterior = 0;
      let visible = false;

      const progresoDe = (rect: DOMRect) => {
        const recorrido = Math.min(window.innerHeight, rect.height);
        return Math.max(0, Math.min(1, (window.innerHeight - rect.top) / recorrido));
      };

      const colocar = (indice: number, progreso: number) => {
        const movil = moviles[indice];
        if (!movil) return;

        const direccion = indice % 2 === 0 ? -1 : 1;
        const restante = 1 - progreso;
        const x = direccion * 180 * restante;
        const rotacion = direccion * 10 * restante;
        const escala = 0.8 + 0.2 * progreso;
        movil.style.transform = `translate3d(${x}px, 0, 0) rotate(${rotacion}deg) scale(${escala})`;
      };

      const medir = () => {
        if (!visible) return;
        piezas.forEach((pieza, indice) => {
          objetivos[indice] = progresoDe(pieza.getBoundingClientRect());
        });
        if (!cuadro) cuadro = requestAnimationFrame(animar);
      };

      const animar = (ahora: number) => {
        if (!visible) {
          cuadro = 0;
          return;
        }

        const dt = anterior ? Math.min((ahora - anterior) / 1000, 1 / 30) : 1 / 60;
        anterior = ahora;
        let moviendose = false;

        objetivos.forEach((objetivo, indice) => {
          const estado = estados[indice];
          const aceleracion = (objetivo - estado.valor) * 500 - estado.velocidad * 60;
          estado.velocidad += aceleracion * dt;
          estado.valor += estado.velocidad * dt;

          if (Math.abs(objetivo - estado.valor) < 0.0005 && Math.abs(estado.velocidad) < 0.005) {
            estado.valor = objetivo;
            estado.velocidad = 0;
          } else {
            moviendose = true;
          }

          colocar(indice, Math.max(0, Math.min(1, estado.valor)));
        });

        if (moviendose) {
          cuadro = requestAnimationFrame(animar);
        } else {
          cuadro = 0;
          anterior = 0;
        }
      };

      const observador = new IntersectionObserver(
        ([entrada]) => {
          visible = entrada.isIntersecting;
          seccion.dataset.movimiento = visible ? "activo" : "inactivo";
          if (!visible) {
            if (cuadro) cancelAnimationFrame(cuadro);
            cuadro = 0;
            anterior = 0;
            return;
          }

          piezas.forEach((pieza, indice) => {
            const objetivo = progresoDe(pieza.getBoundingClientRect());
            objetivos[indice] = objetivo;
            estados[indice].valor = objetivo;
            estados[indice].velocidad = 0;
            colocar(indice, objetivo);
          });
        },
        { rootMargin: "100% 0px" },
      );

      seccion.classList.add("b3--movimiento-amortiguado");
      observador.observe(seccion);
      window.addEventListener("scroll", medir, { passive: true });
      window.addEventListener("resize", medir);

      return () => {
        observador.disconnect();
        window.removeEventListener("scroll", medir);
        window.removeEventListener("resize", medir);
        cancelAnimationFrame(cuadro);
        seccion.classList.remove("b3--movimiento-amortiguado");
        delete seccion.dataset.movimiento;
        moviles.forEach((movil) => movil?.style.removeProperty("transform"));
      };
    };

    const sincronizar = () => {
      desactivar();
      desactivar = media.matches ? activar() : () => {};
    };

    media.addEventListener("change", sincronizar);
    sincronizar();

    return () => {
      media.removeEventListener("change", sincronizar);
      desactivar();
    };
  }, []);

  return referencia;
}

/** Indice par -> columna izquierda -> entra por la izquierda. */
function direccionDe(indice: number): number {
  return indice % 2 === 0 ? -1 : 1;
}

export function B3Trabajos() {
  const referencia = useMovimientoAmortiguadoDeTrabajos();

  return (
    <section ref={referencia} className="b3" aria-labelledby="b3-titulo">
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
              <TextoBoton texto="Ver casos" />
              <Flecha />
            </EnlaceConCortina>
          </Reveal>
        </div>

        <div className="b3__piezas">
          {PIEZAS.map((caso, i) => (
            <Trabajo
              key={caso.nombre}
              nombre={caso.nombre}
              rubro={caso.rubro}
              medio={caso.medio}
              direccion={direccionDe(i)}
              /* Trabajos queda debajo del hero, Quiénes somos y
                 la banda de capacidades. Precargar su primer video
                 compite con la primera pantalla sin aportar nada. */
              prioritario={false}
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
  return (
    <article className="b3-trabajo">
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
          <MedioDeCaso
            className="b3-trabajo__pieza"
            medio={medio}
            prioritario={prioritario}
            anticipado
            /* En mobile una pasada rapida llegaba a la tarjeta antes
               que su poster/video. Se anticipa solamente esta galeria:
               sigue fuera de la carga critica del hero, pero ya esta
               lista cuando empieza el movimiento. */
            margenCercania="850px 0px"
          />
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
