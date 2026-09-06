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

   El ticker duplica la pista completa, así que el ciclo visual
   sigue cerrando aunque los cinco acentos no dividan doce. */
export const MARCAS_DEL_MARQUEE: string[] = [...CASOS.map((c) => c.nombre), ...CLIENTES_SIN_CASO];

/* ===========================================================
   LOS DOCE LOGOS — versiones negras vectorizadas.

   Los originales eran PNG blancos y pequeños. Las versiones de
   `public/assets/logos-clientes` conservan la silueta de cada
   wordmark, eliminan el color de origen y permiten volver al
   anillo de contorno sobre el fondo blanco.

   `ancho` es la fracción del DIÁMETRO del contenedor, no un
   tamaño en píxeles. Por eso los mismos números sirven en el
   anillo de B7 y en el contenedor más grande de Casos: el logo
   crece con el círculo y la composición no cambia.

   ⚠ EL SUBTÍTULO DE `patagonia` —«VESSELS S.A.»— casi no se lee a
   120px. Es del archivo, que trae dos líneas de peso muy distinto,
   no del cálculo: agrandar el logo entero para rescatarlo lo
   dejaría fuera de escala contra los otros once.

   =========================================================== */

export type Logo = {
  /** Ruta del archivo, ya recortado a su caja de tinta. */
  archivo: string;
  /** Ancho como fracción del diámetro del contenedor. */
  ancho: number;
};

export const LOGOS: Record<string, Logo> = {
  "Snake Store": {
    archivo: "/assets/logos-clientes/logo-snake-store-negro-hd.svg",
    ancho: 0.72,
  },
  Carácter: { archivo: "/assets/logos-clientes/logo-caracter-negro-hd.svg", ancho: 0.76 },
  "Glam Ragazza": {
    archivo: "/assets/logos-clientes/logo-glam-ragazza-negro-hd.svg",
    ancho: 0.82,
  },
  /* ⚠ 1.25 A MANO SOBRE EL 0.447 QUE DA LA FÓRMULA.
     Es la debilidad conocida de normalizar por área: Vinotique es
     el logo más denso del set —0.38 de tinta por píxel de caja,
     contra 0.14 de Glam— así que igualar tinta lo achica de más y
     en el círculo se veía chico, con la mitad del campo vacío.
     No toca ningún tope: queda en 0.559 × 0.236 y le sobra un 39%
     de aire contra la circunferencia. La medición acerca, el ojo
     cierra. */
  Vinotique: { archivo: "/assets/logos-clientes/logo-vinotique-negro-hd.svg", ancho: 0.68 },
  Ilsapore: { archivo: "/assets/logos-clientes/logo-ilsapore-negro-hd.svg", ancho: 0.72 },
  Armbruster: { archivo: "/assets/logos-clientes/logo-armbruster-negro-hd.svg", ancho: 0.82 },
  Greenpac: { archivo: "/assets/logos-clientes/logo-greenpac-negro-hd.svg", ancho: 0.82 },
  "Comercial Pas": {
    archivo: "/assets/logos-clientes/logo-comercial-pas-negro-hd.svg",
    ancho: 0.82,
  },
  "Patagonia Vessels": {
    archivo: "/assets/logos-clientes/logo-patagonia-vessels-negro-hd.svg",
    ancho: 0.74,
  },
  BuyNow: { archivo: "/assets/logos-clientes/logo-buynow-negro-hd.svg", ancho: 0.8 },
  Lámina: { archivo: "/assets/logos-clientes/logo-lamina-negro-hd.svg", ancho: 0.7 },
  Uprise: { archivo: "/assets/logos-clientes/logo-uprise-negro-hd.svg", ancho: 0.82 },
};
