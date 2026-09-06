/* ===========================================================
   LOS OCHO CASOS — fuente única.

   La página de Casos y el bloque B3 de la home se construyen
   contra este archivo. La mecánica queda probada con la cantidad
   real y después es sólo rellenar: cuando lleguen los logos y las
   imágenes, se completan `logo` y `medio` acá y no se toca ni un
   componente.

   ⚠ EL RUBRO NO SALE DE LA FICHA VIEJA. Lo definió Matías.
   El sitio actual —`/work/clients-…`— tiene un campo «Industria»
   que en varios casos trae el CANAL y no el rubro: Snake Store y
   Glam Ragazza figuran ahí como «E-Commerce», que es por dónde
   venden, no a qué se dedican. Acá van «Moda» e «Indumentaria».
   Si alguien vuelve a la ficha vieja, esto NO es un dato a
   corregir: es la corrección.

   LAS OCHO FRASES ESTÁN SIN APROBAR
   Son condensaciones del texto que ya está escrito en cada ficha.
   Condensar copy aprobado no es inventarlo, pero tampoco es
   aprobarlo: ninguna se publica sin que Matías la confirme. No
   llevan ninguna cifra, período ni resultado que no esté en la
   ficha — y de hecho no llevan ninguno, porque los porcentajes
   del sitio actual (140%, 200%…) quedaron descartados: no dicen
   de qué son ni contra qué base.

   `frase` de Carácter está aparte, ver `revisar`.
   =========================================================== */

/* EL MEDIO DE CADA CASO, YA RECORTADO A 4:3.

   Los originales iban de 0.56 a 1.78 de proporción, y con eso la
   columna del medio cambiaba de alto en cada fila y los bloques de
   80vh dejaban de encuadrar igual. Los ocho se recortaron al mismo
   4:3, que es además el de B3.

   El recorte es centrado salvo donde descabeza el motivo:

   | Caso | Anclaje | Por qué |
   |---|---|---|
   | Greenpac | abajo | Centrado deja cielo vacío y corta la cosechadora a la altura de la cabina. |
   | Vinotique | arriba | Centrado corta las botellas por el hombro. |
   | Glam Ragazza | arriba | Centrado le corta la cabeza. La foto trae orientación EXIF 6, así que es VERTICAL 3024×4032 y no apaisada como dice el nombre del archivo. |

   Los tres videos van sin audio, y dos se recortaron en el tiempo.

   Vinotique baja de 7.8s a 5.0: a partir de 5.2 el plano se vacía
   —las botellas salen de cuadro— y termina con un rótulo quemado.

   Ilsapore baja de 42.8s a 3.2, tomando 17.3→20.5. Es más corto
   que los 6-8s que se buscaban, y es lo que hay: el clip corta a
   la presentadora cada dos o tres segundos. Medido cuadro a cuadro
   sobre los 42.8s, el tramo más largo sin ella dura 5.0s —de 10.25
   a 15.25— pero arrastra el rótulo «CHOCOOREO» y una placa de
   comillas. El de 17.3 es el único que está limpio de las dos
   cosas, y encima es una toma continua: el loop no tiene cortes
   adentro. Un texto quemado en un fondo envejece mal, y una
   presentadora hablando sin audio, peor.

   ⚠ EL MÁS FLOJO DE RESOLUCIÓN ES COMERCIAL PAS: el original son
   530×354 y recortado quedan 472. La columna del medio renderiza
   cerca de 600px CSS, así que en pantalla 2x se va a ver blando.
   No se agranda: escalar no agrega información. */
export type Medio =
  { tipo: "imagen"; archivo: string } | { tipo: "video"; archivo: string; poster: string };

export type Caso = {
  /** Nombre del cliente, como se muestra. */
  nombre: string;
  /** Rubro, en gris bajo el nombre. Definido por Matías. */
  rubro: string;
  /** Una frase de qué hicimos. Pendiente de aprobación. */
  frase: string;
  /** La pieza, recortada a 4:3. */
  medio: Medio;
  /**
   * Marca la frase que necesita reescritura, no sólo visto bueno.
   * Ver el caso 02.
   */
  revisar?: string;
};

export const CASOS: Caso[] = [
  {
    nombre: "Snake Store",
    rubro: "Moda",
    frase: "Meta Ads y contenido para pauta, con foco en escalar ventas.",
    medio: {
      tipo: "video",
      archivo: "/assets/caso-snake-store.mp4",
      poster: "/assets/caso-snake-store-poster.webp",
    },
  },
  {
    nombre: "Carácter",
    rubro: "Productora",
    frase: "Diseño web y campañas de performance.",
    /* La única de las ocho que NO sale de una descripción del
       trabajo. Su ficha describe al CLIENTE —«productora de
       eventos con experiencia en diseño y producción de
       experiencias de marca»— y en ningún momento dice qué
       hicimos nosotros. Esta frase sale de sus dos categorías del
       índice, Diseño Web y Publicidad de Performance, así que no
       inventa nada, pero tampoco cuenta el trabajo. Hay que
       reescribirla antes de publicar, no sólo aprobarla. */
    revisar: "Sale de dos etiquetas del índice, no de una descripción del trabajo.",
    medio: { tipo: "imagen", archivo: "/assets/caso-caracter.webp" },
  },
  {
    nombre: "Glam Ragazza",
    rubro: "Indumentaria",
    frase: "Paid Media y un sistema de contenido para sostener el crecimiento.",
    medio: { tipo: "imagen", archivo: "/assets/caso-glam-ragazza.webp" },
  },
  {
    nombre: "Vinotique",
    rubro: "Gastronomía",
    frase: "Estrategia de marca y una web nueva, con foco en claridad y confianza.",
    medio: {
      tipo: "video",
      archivo: "/assets/caso-vinotique.mp4",
      poster: "/assets/caso-vinotique-poster.webp",
    },
  },
  {
    nombre: "Ilsapore",
    rubro: "Gastronomía",
    frase: "Contenido y redes para posicionar la marca, con pauta para pedidos mayoristas.",
    medio: {
      tipo: "video",
      archivo: "/assets/caso-ilsapore.mp4",
      poster: "/assets/caso-ilsapore-poster.webp",
    },
  },
  {
    nombre: "Armbruster",
    rubro: "Real Estate",
    frase: "Estrategia, contenido y campañas de performance para captar leads.",
    medio: { tipo: "imagen", archivo: "/assets/caso-armbruster.webp" },
  },
  {
    nombre: "Greenpac",
    rubro: "Agricultura",
    frase: "Web de producto y campañas segmentadas por zona y perfil del agro.",
    medio: { tipo: "imagen", archivo: "/assets/caso-greenpac.webp" },
  },
  {
    nombre: "Comercial Pas",
    rubro: "Seguros",
    frase: "Web, tracking y campañas de performance enfocadas en conversiones.",
    medio: { tipo: "imagen", archivo: "/assets/caso-comercial-pas.webp" },
  },
];

/* Las cuatro piezas de B3 en la home son los cuatro primeros, en
   el mismo orden. Sale de acá y no de una lista paralela
   justamente para que no puedan divergir. */
export const CASOS_EN_LA_HOME = CASOS.slice(0, 4);

/* CLIENTES QUE TIENEN LOGO PERO NO SON CASOS.
   Van en el marquee de B7 y no en `/casos`. */
export const CLIENTES_SIN_CASO = ["Patagonia Vessels", "BuyNow", "Lámina", "Uprise"];

/* Las doce ranuras del marquee de B7: los ocho casos en su orden y
   los cuatro clientes que sólo tienen logo. Ya no hay marcadores.

   Doce era además el ancho de pista con el que se probaron el loop
   y la máscara del Ticker, así que el bloque no cambia de forma al
   entrar los logos reales.

   Doce sobre un ciclo de TRES colores divide exacto, así que el
   ciclo cierra en la costura del loop. Con los cinco acentos
   quedaba cortado, y el plan lo tenía anotado como defecto
   asumido: se arregló solo al sacar verde y amarillo. */
export const MARCAS_DEL_MARQUEE: string[] = [...CASOS.map((c) => c.nombre), ...CLIENTES_SIN_CASO];

/* ===========================================================
   LOS DOCE LOGOS — tamaño normalizado por área de tinta.

   Todos son BLANCOS CON ALFA, hechos para fondo oscuro. Por eso
   el contenedor pasó de anillo de contorno sobre crema a círculo
   RELLENO del acento: sobre crema un logo blanco no se ve.

   POR QUÉ NO SE NORMALIZAN POR ANCHO NI POR ALTO
   Las proporciones van de 8.2:1 —`glam`, 361×44 después de
   recortar— a 2.3:1 —`snake`, 205×88—. Igualando el ancho,
   Vinotique aplasta al resto; igualando el alto, lo hace Glam.
   Lo que el ojo compara no es ninguna de las dos medidas sino
   cuánta tinta hay, así que es eso lo que se iguala.

   CÓMO SALE CADA NÚMERO
   1. Cada PNG se recorta a su caja real de píxeles opacos. Varios
      traían aire alrededor —Greenpac un 39%— y ese aire descalibra
      cualquier medida que venga después.
   2. Se cuentan los píxeles con alfa > 128: eso es la tinta.
   3. Se escala cada logo para que todos muestren la MISMA tinta.
      Como la tinta crece con el cuadrado de la escala, el factor
      es `sqrt(T / tinta)` con `T = 0.032` en unidades de D², el
      diámetro del círculo.
   4. Topes: ningún logo pasa del 78% del ancho ni del 55% del
      alto, ni de una diagonal que le deje menos del 12% de aire
      contra la circunferencia.

   `ancho` es la fracción del DIÁMETRO del contenedor, no un
   tamaño en píxeles. Por eso los mismos números sirven en el
   anillo de B7 y en el contenedor más grande de Casos: el logo
   crece con el círculo y la composición no cambia.

   ⚠ CINCO LLEGAN AL TOPE Y MUESTRAN MENOS TINTA QUE EL RESTO.
   Son los muy apaisados: `glam` sólo alcanza a mostrar un tercio
   de la tinta objetivo antes de tocar el 78% de ancho. Es
   inevitable —una firma fina y larguísima no puede pesar lo mismo
   sin salirse del círculo— y es exactamente lo que el tope está
   para evitar.

   ⚠ EL SUBTÍTULO DE `patagonia` —«VESSELS S.A.»— casi no se lee a
   120px. Es del archivo, que trae dos líneas de peso muy distinto,
   no del cálculo: agrandar el logo entero para rescatarlo lo
   dejaría fuera de escala contra los otros once.

   ⚠ EL TOPE DE ALTO NO LLEGA A ACTUAR con estos doce. El más
   alto en proporción es `snake` y se queda en 0.285 D contra el
   0.55 permitido: el ancho es siempre el que manda primero. Se
   deja declarado igual, porque un logo futuro más cuadrado sí lo
   necesitaría.
   =========================================================== */

export type Logo = {
  /** Ruta del archivo, ya recortado a su caja de tinta. */
  archivo: string;
  /** Ancho como fracción del diámetro del contenedor. */
  ancho: number;
};

export const LOGOS: Record<string, Logo> = {
  "Snake Store": { archivo: "/assets/logo-snake-store.webp", ancho: 0.549 },
  Carácter: { archivo: "/assets/logo-caracter.webp", ancho: 0.634 },
  "Glam Ragazza": { archivo: "/assets/logo-glam-ragazza.webp", ancho: 0.78 }, // al tope de ancho
  /* ⚠ 1.25 A MANO SOBRE EL 0.447 QUE DA LA FÓRMULA.
     Es la debilidad conocida de normalizar por área: Vinotique es
     el logo más denso del set —0.38 de tinta por píxel de caja,
     contra 0.14 de Glam— así que igualar tinta lo achica de más y
     en el círculo se veía chico, con la mitad del campo vacío.
     No toca ningún tope: queda en 0.559 × 0.236 y le sobra un 39%
     de aire contra la circunferencia. La medición acerca, el ojo
     cierra. */
  Vinotique: { archivo: "/assets/logo-vinotique.webp", ancho: 0.559 },
  Ilsapore: { archivo: "/assets/logo-ilsapore.webp", ancho: 0.706 },
  Armbruster: { archivo: "/assets/logo-armbruster.webp", ancho: 0.78 }, // al tope de ancho
  Greenpac: { archivo: "/assets/logo-greenpac.webp", ancho: 0.75 },
  "Comercial Pas": { archivo: "/assets/logo-comercial-pas.webp", ancho: 0.78 }, // al tope de ancho
  "Patagonia Vessels": { archivo: "/assets/logo-patagonia-vessels.webp", ancho: 0.651 },
  BuyNow: { archivo: "/assets/logo-buynow.webp", ancho: 0.78 }, // al tope de ancho
  Lámina: { archivo: "/assets/logo-lamina.webp", ancho: 0.62 },
  Uprise: { archivo: "/assets/logo-uprise.webp", ancho: 0.78 }, // al tope de ancho
};
