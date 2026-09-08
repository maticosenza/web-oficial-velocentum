/* ===========================================================
   CON-1 · DOS COLUMNAS

   Izquierda el panel con el titular, derecha el flujo de
   calificación en cuatro pasos. En móvil se apila: panel arriba,
   flujo abajo, y el panel pasa a apaisado — uno cuadrado se come
   media pantalla de un teléfono antes de que se vea la primera
   pregunta.

   EL PANEL ES CSS, NO UNA IMAGEN
   Existe un PNG con este titular horneado y no se usa. Un titular
   dentro de una imagen no se selecciona, no escala con el zoom del
   navegador, no lo lee un buscador y para un lector de pantalla
   depende de que alguien haya escrito un buen `alt`. Sería el
   único titular del sitio que no es texto, justo en la página que
   convierte. Y el PNG viene cuadrado, con marco y esquinas
   horneadas, así que ataría el bloque a que el fondo sea
   exactamente ese azul para siempre.

   Todo lo que lleva ya estaba en el sistema: el campo es `--tinta`
   —el MISMO que el footer, no un navy nuevo— y la mancha crema con
   el titular oscuro adentro es el recurso que ya hace B8 en el
   cierre. Se reutiliza su regla, no se escribe otra.

   EL PANEL VA `sticky` EN ESCRITORIO
   La columna derecha es bastante más alta: cuatro pasos, y en la
   fase 2 un calendario. Sin `sticky`, el titular se va de cuadro
   en la primera pregunta.

   ⚠ EN EL PASO 4 LA COLUMNA IZQUIERDA DESAPARECE, Y ES UN
   CONTRATO, NO UNA DECORACIÓN. El calendario que entra en la fase
   2 necesita la grilla del mes MÁS una columna de horarios al
   lado, y eso en media pantalla de 1440px no entra sin apilarse.
   El flujo toma el ancho completo. Está implementado ya —con el
   marcador adentro— para que cuando llegue el calendario el
   layout no sea una sorpresa.

   LOS CUATRO PASOS EXISTEN EN EL DOM DESDE EL PRIMER RENDER
   No se montan y desmontan: se esconden con `hidden`, que además
   los saca del árbol accesible, así que el lector anuncia sólo el
   paso en curso. Montarlos y desmontarlos perdería lo escrito al
   volver atrás y obligaría a levantar el estado a otro lado.

   AUTOAVANCE AL ELEGIR, PERO SÓLO POR PUNTERO
   Con mouse o con el dedo, elegir una opción avanza solo. Con
   teclado NO, y la excepción no es un capricho: un grupo de radios
   se recorre con las flechas, así que avanzar al cambiar dejaría a
   quien navega con teclado sin poder llegar nunca a la tercera
   opción — la primera flecha ya lo habría sacado del paso. Y con
   lector de pantalla la página se movería sola bajo el foco.

   La modalidad se lee de la interacción, no del dispositivo: un
   `pointerdown` sobre la tarjeta marca puntero, un `keydown` marca
   teclado, y el `change` que viene después mira esa marca. Es la
   misma distinción que hace `:focus-visible`, hecha a mano porque
   acá no alcanza con un selector.

   EL RETARDO DE 250ms NO ES DECORACIÓN. Sin él, la tarjeta se
   marca y el paso cambia en el mismo cuadro: nadie llega a
   confirmar qué eligió, y con cinco opciones parecidas eso importa.
   No es una animación —es una pausa de lectura—, así que con
   movimiento reducido se mantiene: lo que ahí no va es una
   transición, y no hay ninguna.

   EL BOTÓN «SIGUIENTE» SE QUEDA. Es el único camino para teclado, y
   además la salida cuando el autoavance no dispara — un `change`
   sin `pointerdown` previo, por ejemplo, porque alguien llegó al
   radio con un lector de pantalla en modo formulario.

   AL CAMBIAR DE PASO EL FOCO VA AL TITULAR DEL PASO NUEVO
   Con `tabIndex={-1}` para poder recibirlo y su propio anillo. Sin
   esto el foco se queda en el botón «Siguiente», que después del
   avance ya no es el mismo botón, y quien no ve la pantalla no se
   entera de que cambió de pregunta.

   ⚠ Y CON EL AUTOAVANCE ESTO HACE MÁS FALTA, NO MENOS. Al avanzar
   por puntero, el elemento que tenía el foco es el radio que se
   acaba de elegir — y ese radio queda dentro de un paso que pasa a
   `hidden`. Un elemento enfocado que desaparece deja el foco en
   `<body>`, así que el siguiente Tab volvería al principio de la
   página, saltándose el paso nuevo entero. Moverlo al titular lo
   evita.

   No se ve un anillo por eso: el navegador no hace coincidir
   `:focus-visible` cuando la última interacción fue de puntero, así
   que quien hace clic no ve nada y quien llegó con teclado sí.

   ⚠ Y NO EN EL PRIMER RENDER. Mover el foco al cargar la página le
   roba el control a quien recién llega y se saltea el nav entero.
   Por eso el efecto mira una bandera que sólo se enciende cuando
   el cambio de paso lo pidió alguien.
   =========================================================== */

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { Reveal } from "../componentes/Reveal";
import { Flecha } from "../componentes/Flecha";
import { horariosDeCalendly, reservarEnCalendly } from "../lib/calendly";
import { guardarLead } from "../lib/leads";
import {
  CAMPOS,
  ESTADO_INICIAL,
  PASOS_DE_OPCIONES,
  errorDeCampo,
  textoDeOpcion,
  respuestasSerializables,
  type CampoId,
  type EstadoDelFlujo,
} from "../data/contacto";

const TOTAL_DE_PASOS = 4;

/* Lo que se espera entre elegir y avanzar. Suficiente para ver la
   tarjeta marcada, corto como para no leerse como una demora. */
const ESPERA_DEL_AUTOAVANCE = 250;

export function CON1Flujo() {
  const [paso, setPaso] = useState(1);
  const [estado, setEstado] = useState<EstadoDelFlujo>(ESTADO_INICIAL);
  const [errores, setErrores] = useState<Partial<Record<CampoId, string>>>({});
  const [horarios, setHorarios] = useState<Array<{ start_time: string; scheduling_url: string }>>(
    [],
  );
  const [errorCalendly, setErrorCalendly] = useState<string | null>(null);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [reservando, setReservando] = useState<string | null>(null);
  const [errorReserva, setErrorReserva] = useState<string | null>(null);
  const [reservaLista, setReservaLista] = useState(false);
  const leadId = useRef<string | null>(null);
  const [faltaElegir, setFaltaElegir] = useState(false);

  /* El foco se mueve sólo cuando el cambio de paso lo pidió
     alguien, nunca al cargar. Ver la nota de arriba. */
  const movido = useRef(false);
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const campoRefs = useRef<Partial<Record<CampoId, HTMLInputElement | null>>>({});

  /* De dónde vino la última interacción sobre un radio. Lo escribe
     el `pointerdown` o el `keydown` de la tarjeta y lo lee el
     `change`, que llega después de los dos. */
  const modalidad = useRef<"puntero" | "teclado">("teclado");
  const temporizador = useRef<number | null>(null);

  const cancelarAutoavance = useCallback(() => {
    if (temporizador.current === null) return;
    window.clearTimeout(temporizador.current);
    temporizador.current = null;
  }, []);

  /* Si el componente se va con un avance pendiente, el temporizador
     dispararía sobre un componente desmontado. */
  useEffect(() => cancelarAutoavance, [cancelarAutoavance]);

  useEffect(() => {
    if (!movido.current) return;
    tituloRef.current?.focus();
  }, [paso]);

  const irA = useCallback(
    (siguiente: number) => {
      cancelarAutoavance();
      movido.current = true;
      setFaltaElegir(false);
      setPaso(Math.min(TOTAL_DE_PASOS, Math.max(1, siguiente)));
    },
    [cancelarAutoavance],
  );

  const elegir = (pasoId: "rubro" | "objetivo", opcionId: string, siguiente: number) => {
    setFaltaElegir(false);
    setEstado((e) => ({ ...e, elecciones: { ...e.elecciones, [pasoId]: opcionId } }));

    /* Sólo por puntero. Con teclado el avance lo pide el botón. */
    if (modalidad.current !== "puntero") return;
    cancelarAutoavance();
    temporizador.current = window.setTimeout(() => {
      temporizador.current = null;
      irA(siguiente);
    }, ESPERA_DEL_AUTOAVANCE);
  };

  const escribir = (campo: CampoId, valor: string) => {
    setEstado((e) => ({ ...e, datos: { ...e.datos, [campo]: valor } }));
    /* El error se limpia al tocar el campo. Dejarlo puesto
       mientras la persona corrige es discutir con ella. */
    setErrores((e) => {
      if (!e[campo]) return e;
      const copia = { ...e };
      delete copia[campo];
      return copia;
    });
  };

  /* ⚠ NO SE PUEDE AVANZAR SIN ELEGIR, Y EL MOTIVO NO ES DE
     FORMULARIO SINO DE DATO. Estos dos pasos no son un trámite:
     son la calificación, y son exactamente lo que la fase 2 va a
     guardar. Dejar avanzar sin elegir hace que el paso 4 llegue
     con dos respuestas nulas, y esas dos nulas se van a escribir
     en la base junto con el resto — un contacto sin rubro ni
     objetivo es un contacto que hay que volver a preguntar entero.

     El paso 3 sí valida por campo con mensajes propios; acá alcanza
     con uno solo, porque la pregunta es una y la respuesta también.
     El foco vuelve al titular del paso para que quien no ve la
     pantalla escuche la pregunta de nuevo antes que el aviso. */
  const avanzarDesdeOpciones = (pasoId: "rubro" | "objetivo", siguiente: number) => {
    if (!estado.elecciones[pasoId]) {
      setFaltaElegir(true);
      tituloRef.current?.focus();
      return;
    }
    irA(siguiente);
  };

  /* ⚠ LA VALIDACIÓN CORRE ACÁ Y NO AL TIPEAR. Marcar un email como
     inválido en la primera letra es hostil: todavía nadie terminó
     de escribirlo. Corre al intentar avanzar, y ahí el foco salta
     al primer campo con problema — si no, con cinco campos hay que
     buscar cuál falló. */
  const cargarHorarios = useCallback(async () => {
    // Calendly exige una fecha futura. Un "ahora" exacto ya puede haber
    // quedado atrás cuando llega la petición al servidor.
    const inicio = new Date(Date.now() + 5 * 60 * 1000);
    const fin = new Date(inicio);
    fin.setDate(fin.getDate() + 21);
    try {
      setErrorCalendly(null);
      setHorarios(
        await horariosDeCalendly({
          inicio: inicio.toISOString(),
          fin: fin.toISOString(),
        }),
      );
    } catch (error) {
      const detalle = error instanceof Error ? error.message : "Error desconocido.";
      setErrorCalendly(`No pudimos cargar los horarios: ${detalle}`);
    }
  }, []);

  // Mientras la persona completa los pasos anteriores, la disponibilidad
  // ya se consulta. Al llegar al calendario normalmente está lista.
  useEffect(() => {
    void cargarHorarios();
  }, [cargarHorarios]);

  const avanzarDesdeDatos = async () => {
    const nuevos: Partial<Record<CampoId, string>> = {};
    for (const campo of CAMPOS) {
      const error = errorDeCampo(campo, estado.datos[campo.id]);
      if (error) nuevos[campo.id] = error;
    }
    setErrores(nuevos);

    const primero = CAMPOS.find((c) => nuevos[c.id]);
    if (primero) {
      campoRefs.current[primero.id]?.focus();
      return;
    }
    const serializado = respuestasSerializables(estado);
    const [respuestaRubro, respuestaObjetivo] = serializado.respuestas;

    if (!respuestaRubro.respuesta || !respuestaObjetivo.respuesta) {
      setErrorEnvio("Elegí tu rubro y objetivo antes de continuar.");
      return;
    }

    setEnviando(true);
    setErrorEnvio(null);
    try {
      const id = crypto.randomUUID();
      await guardarLead({
        data: {
          id,
          rubro: respuestaRubro.respuesta,
          objetivo: respuestaObjetivo.respuesta,
          ...serializado.contacto,
        },
      });
      leadId.current = id;
      irA(4);
      await cargarHorarios();
    } catch (error) {
      const detalle = error instanceof Error ? error.message : "Error desconocido.";
      setErrorEnvio(`No pudimos guardar tus datos: ${detalle}`);
    } finally {
      setEnviando(false);
    }
  };

  const reservar = async (inicio: string) => {
    if (!leadId.current) return;
    setReservando(inicio);
    setErrorReserva(null);
    try {
      await reservarEnCalendly({
        inicio,
        zonaHoraria:
          Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Argentina/Buenos_Aires",
        nombre: estado.datos.nombre,
        email: estado.datos.email,
      });
      setReservaLista(true);
    } catch (error) {
      const detalle = error instanceof Error ? error.message : "Error desconocido.";
      setErrorReserva(`No pudimos reservar ese horario: ${detalle}`);
      await cargarHorarios();
    } finally {
      setReservando(null);
    }
  };

  const enElCalendario = paso === TOTAL_DE_PASOS;

  return (
    <section
      className={["con1", enElCalendario && "con1--ancho"].filter(Boolean).join(" ")}
      aria-labelledby="con1-titulo"
    >
      <div className="con1__caja contenido">
        <Panel oculto={enElCalendario} />

        <div className="con1__flujo">
          <Progreso paso={paso} />

          {PASOS_DE_OPCIONES.map((definicion, i) => {
            const numero = i + 1;
            return (
              <div key={definicion.id} className="con1-paso" hidden={paso !== numero}>
                <h2
                  className="con1-paso__titulo"
                  ref={paso === numero ? tituloRef : null}
                  tabIndex={-1}
                >
                  {definicion.titulo}
                </h2>
                <p className="con1-paso__ayuda">{definicion.ayuda}</p>

                {/* El grupo de radios se anuncia como grupo, con la
                    pregunta de nombre: sin esto el lector lee cinco
                    opciones sueltas sin decir de qué. */}
                <fieldset className="con1-opciones">
                  <legend className="solo-lectores">{definicion.titulo}</legend>

                  {definicion.opciones.map((opcion) => (
                    /* ⚠ EL `label` ENVUELVE TODO, Y ESO ES EL ÁREA
                       TÁCTIL. Con el label al lado del radio, lo
                       tocable sería un círculo de 16px; envolviendo
                       la tarjeta entera, se toca la tarjeta. */
                    <label
                      key={opcion.id}
                      className="con1-opcion"
                      /* La modalidad se marca en la TARJETA y no en el
                         radio: el `pointerdown` de un clic sobre el
                         label no siempre llega al `input`, pero el
                         `change` que dispara sí. */
                      onPointerDown={() => (modalidad.current = "puntero")}
                      onKeyDown={() => (modalidad.current = "teclado")}
                    >
                      <input
                        type="radio"
                        name={definicion.id}
                        value={opcion.id}
                        checked={estado.elecciones[definicion.id] === opcion.id}
                        onChange={() => elegir(definicion.id, opcion.id, numero + 1)}
                      />
                      <span className="con1-opcion__texto">
                        <span className="con1-opcion__nombre">{opcion.nombre}</span>
                        {opcion.detalle ? (
                          <span className="con1-opcion__detalle">{opcion.detalle}</span>
                        ) : null}
                      </span>
                      {/* El texto que se va a guardar, armado en un
                          solo lugar. Ver `textoDeOpcion`. */}
                      <span className="solo-lectores">{textoDeOpcion(opcion)}</span>
                    </label>
                  ))}
                </fieldset>

                {faltaElegir && paso === numero ? (
                  <p className="con1__aviso" role="alert">
                    Elegí una opción para seguir.
                  </p>
                ) : null}

                <Botones
                  atras={numero > 1 ? () => irA(numero - 1) : null}
                  siguiente={() => avanzarDesdeOpciones(definicion.id, numero + 1)}
                  textoSiguiente="Siguiente"
                />
              </div>
            );
          })}

          <PasoDeDatos
            visible={paso === 3}
            tituloRef={paso === 3 ? tituloRef : null}
            campoRefs={campoRefs}
            datos={estado.datos}
            errores={errores}
            escribir={escribir}
            atras={() => irA(2)}
            avanzar={avanzarDesdeDatos}
            enviando={enviando}
            errorEnvio={errorEnvio}
          />

          <PasoDelCalendario
            visible={enElCalendario}
            tituloRef={paso === 4 ? tituloRef : null}
            horarios={horarios}
            error={errorCalendly ?? errorReserva}
            reservando={reservando}
            reservaLista={reservaLista}
            reservar={reservar}
          />
        </div>
      </div>
    </section>
  );
}

/* --- El panel --- */

function Panel({ oculto }: { oculto: boolean }) {
  return (
    <div className="con1__panel" hidden={oculto}>
      <Reveal indice={0}>
        <h1 id="con1-titulo" className="con1__titular">
          <span className="con1__titular-linea">Hablemos de</span>{" "}
          <span className="con1__mancha">Tu negocio.</span>
        </h1>
      </Reveal>
    </div>
  );
}

/* --- El progreso --- */

/* ⚠ EL ESTADO NO SE DICE DOS VECES. La barra es decorativa y va
   `aria-hidden`; el estado lo da el texto, que es el que se
   anuncia. Poniendo `role="progressbar"` con sus `aria-value*` Y
   el texto, un lector leería el paso dos veces seguidas. */
function Progreso({ paso }: { paso: number }) {
  return (
    <div className="con1__progreso">
      <p className="con1__progreso-texto">
        Paso {paso} de {TOTAL_DE_PASOS}
      </p>
      <div
        className="con1__barra"
        aria-hidden="true"
        style={{ "--avance": paso / TOTAL_DE_PASOS } as React.CSSProperties}
      >
        <span className="con1__barra-avance" />
      </div>
    </div>
  );
}

/* --- Los botones de cada paso --- */

function Botones({
  atras,
  siguiente,
  textoSiguiente,
}: {
  atras: (() => void) | null;
  siguiente: () => void;
  textoSiguiente: string;
}) {
  return (
    <div className="con1__botones">
      {atras ? (
        <button type="button" className="boton boton--contorno" onClick={atras}>
          Atrás
        </button>
      ) : null}
      <button
        type="button"
        className="boton boton--relleno"
        style={
          {
            "--acento": "var(--acento-4)",
            "--sobre": "var(--texto-sobre-4)",
          } as React.CSSProperties
        }
        onClick={siguiente}
      >
        {textoSiguiente}
        <Flecha />
      </button>
    </div>
  );
}

/* --- Paso 3 --- */

function PasoDeDatos({
  visible,
  tituloRef,
  campoRefs,
  datos,
  errores,
  escribir,
  atras,
  avanzar,
  enviando,
  errorEnvio,
}: {
  visible: boolean;
  tituloRef: React.RefObject<HTMLHeadingElement | null> | null;
  campoRefs: React.RefObject<Partial<Record<CampoId, HTMLInputElement | null>>>;
  datos: Record<CampoId, string>;
  errores: Partial<Record<CampoId, string>>;
  escribir: (campo: CampoId, valor: string) => void;
  atras: () => void;
  avanzar: () => void;
  enviando: boolean;
  errorEnvio: string | null;
}) {
  const base = useId();
  const trampa = useId();

  return (
    <div className="con1-paso" hidden={!visible}>
      <h2 className="con1-paso__titulo" ref={tituloRef} tabIndex={-1}>
        ¿Cómo te contactamos?
      </h2>

      {/* `noValidate`: la validación es nuestra y por campo. La del
          navegador muestra un globo por vez, en el idioma del
          sistema y no en el nuestro, y se lleva el foco sin avisar. */}
      <form
        className="con1-campos"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          avanzar();
        }}
      >
        {CAMPOS.map((campo) => {
          const idCampo = `${base}-${campo.id}`;
          const idError = `${base}-${campo.id}-error`;
          const error = errores[campo.id];

          return (
            <div key={campo.id} className="con1-campo">
              <label className="con1-campo__etiqueta" htmlFor={idCampo}>
                {campo.etiqueta}
              </label>
              {/* ⚠ `aria-invalid` VA JUNTO CON EL MENSAJE, NO EN SU
                  LUGAR. Solo, anuncia «inválido» y nada más: la
                  persona sabe que algo está mal y no qué hacer. */}
              <input
                id={idCampo}
                ref={(nodo) => {
                  campoRefs.current[campo.id] = nodo;
                }}
                className="con1-campo__control"
                type={campo.tipo}
                name={campo.id}
                value={datos[campo.id]}
                autoComplete={campo.autocompletado}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? idError : undefined}
                onChange={(e) => escribir(campo.id, e.target.value)}
              />
              {error ? (
                <p id={idError} className="con1-campo__error">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}

        {/* ⚠ HONEYPOT, ESCONDIDO TAMBIÉN PARA EL LECTOR DE PANTALLA.
            `aria-hidden` + fuera de tabulación + fuera de pantalla.
            NO lleva `.solo-lectores`: esa clase esconde a la vista
            pero SÍ se anuncia, así que una persona ciega escucharía
            un campo pidiéndole su sitio web y lo completaría — y
            completarlo es exactamente lo que marca el envío como
            robot. Un honeypot que atrapa personas es un filtro de
            accesibilidad, no de spam. */}
        <div className="con1__trampa" aria-hidden="true">
          <label htmlFor={trampa}>No completes este campo</label>
          <input id={trampa} type="text" name="sitio-web" tabIndex={-1} autoComplete="off" />
        </div>

        {errorEnvio ? (
          <p className="con1__aviso" role="alert">
            {errorEnvio}
          </p>
        ) : null}

        <div className="con1__botones">
          <button
            type="button"
            className="boton boton--contorno"
            onClick={atras}
            disabled={enviando}
          >
            Atrás
          </button>
          <button
            type="submit"
            className="boton boton--relleno"
            disabled={enviando}
            style={
              {
                "--acento": "var(--acento-4)",
                "--sobre": "var(--texto-sobre-4)",
              } as React.CSSProperties
            }
          >
            {enviando ? "Guardando…" : "Elegí tu horario"}
            <Flecha />
          </button>
        </div>
      </form>
    </div>
  );
}

/* --- Paso 4 --- */

function PasoDelCalendario({
  visible,
  tituloRef,
  horarios,
  error,
  reservando,
  reservaLista,
  reservar,
}: {
  visible: boolean;
  tituloRef: React.RefObject<HTMLHeadingElement | null> | null;
  horarios: Array<{ start_time: string; scheduling_url: string }>;
  error: string | null;
  reservando: string | null;
  reservaLista: boolean;
  reservar: (inicio: string) => void;
}) {
  const horariosPorDia = useMemo(() => {
    const grupos = new Map<string, Array<{ start_time: string; scheduling_url: string }>>();
    for (const horario of [...horarios].sort(
      (a, b) => new Date(a.start_time).valueOf() - new Date(b.start_time).valueOf(),
    )) {
      const clave = claveDeFecha(new Date(horario.start_time));
      grupos.set(clave, [...(grupos.get(clave) ?? []), horario]);
    }
    return grupos;
  }, [horarios]);
  const diasDisponibles = useMemo(() => [...horariosPorDia.keys()], [horariosPorDia]);
  const [diaElegido, setDiaElegido] = useState<string | null>(null);

  useEffect(() => {
    if (diaElegido && horariosPorDia.has(diaElegido)) return;
    setDiaElegido(diasDisponibles[0] ?? null);
  }, [diaElegido, diasDisponibles, horariosPorDia]);

  const fechaElegida = diaElegido ? fechaDesdeClave(diaElegido) : undefined;
  const primerDia = diasDisponibles[0] ? fechaDesdeClave(diasDisponibles[0]) : undefined;
  const ultimoDia = diasDisponibles.at(-1)
    ? fechaDesdeClave(diasDisponibles.at(-1) as string)
    : undefined;
  const horariosElegidos = diaElegido ? (horariosPorDia.get(diaElegido) ?? []) : [];

  return (
    <div className="con1-paso" hidden={!visible}>
      <h2 className="con1-paso__titulo" ref={tituloRef} tabIndex={-1}>
        Elegí día y horario
      </h2>

      {reservaLista ? (
        <div className="con1-exito" role="status">
          <span className="con1-exito__icono" aria-hidden="true">
            ✓
          </span>
          <div>
            <h3 className="con1-exito__titulo">Tu llamada quedó agendada</h3>
            <p className="con1__marcador">
              Te enviamos un email con la fecha, el horario y el enlace para unirte.
            </p>
          </div>
        </div>
      ) : (
        <>
          {error ? (
            <p className="con1__aviso" role="alert">
              {error}
            </p>
          ) : null}
          {!error && horarios.length === 0 ? (
            <p className="con1__marcador">Cargando horarios disponibles…</p>
          ) : null}
          {diasDisponibles.length > 0 ? (
            <div className="con1-agenda" aria-live="polite">
              <div className="con1-agenda__fechas">
                <p className="con1-agenda__etiqueta">Seleccioná un día</p>
                <DayPicker
                  mode="single"
                  locale={es}
                  selected={fechaElegida}
                  defaultMonth={primerDia}
                  startMonth={primerDia}
                  endMonth={ultimoDia}
                  showOutsideDays
                  disabled={(fecha) => !horariosPorDia.has(claveDeFecha(fecha))}
                  onSelect={(fecha) => {
                    if (fecha) setDiaElegido(claveDeFecha(fecha));
                  }}
                />
                <p className="con1-agenda__zona">Los horarios se muestran en tu hora local.</p>
              </div>

              <div className="con1-agenda__horarios">
                <p className="con1-agenda__etiqueta">
                  {fechaElegida
                    ? capitalizar(
                        new Intl.DateTimeFormat("es-AR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        }).format(fechaElegida),
                      )
                    : "Horarios disponibles"}
                </p>
                <div className="con1-agenda__lista">
                  {horariosElegidos.map((horario) => {
                    const estaReservando = reservando === horario.start_time;
                    return (
                      <button
                        key={horario.start_time}
                        type="button"
                        className="con1-agenda__horario"
                        disabled={reservando !== null}
                        onClick={() => reservar(horario.start_time)}
                      >
                        {estaReservando
                          ? "Reservando…"
                          : new Intl.DateTimeFormat("es-AR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            }).format(new Date(horario.start_time))}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

function claveDeFecha(fecha: Date) {
  return [
    fecha.getFullYear(),
    String(fecha.getMonth() + 1).padStart(2, "0"),
    String(fecha.getDate()).padStart(2, "0"),
  ].join("-");
}

function fechaDesdeClave(clave: string) {
  const [anio, mes, dia] = clave.split("-").map(Number);
  return new Date(anio, mes - 1, dia);
}

function capitalizar(texto: string) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
