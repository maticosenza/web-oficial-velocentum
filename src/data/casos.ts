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

export type Caso = {
  /** Nombre del cliente, como se muestra. */
  nombre: string;
  /** Rubro, en gris bajo el nombre. Definido por Matías. */
  rubro: string;
  /** Una frase de qué hicimos. Pendiente de aprobación. */
  frase: string;
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
  },
  {
    nombre: "Glam Ragazza",
    rubro: "Indumentaria",
    frase: "Paid Media y un sistema de contenido para sostener el crecimiento.",
  },
  {
    nombre: "Vinotique",
    rubro: "Gastronomía",
    frase: "Estrategia de marca y una web nueva, con foco en claridad y confianza.",
  },
  {
    nombre: "Ilsapore",
    rubro: "Gastronomía",
    frase: "Contenido y redes para posicionar la marca, con pauta para pedidos mayoristas.",
  },
  {
    nombre: "Armbruster",
    rubro: "Real Estate",
    frase: "Estrategia, contenido y campañas de performance para captar leads.",
  },
  {
    nombre: "Greenpac",
    rubro: "Agricultura",
    frase: "Web de producto y campañas segmentadas por zona y perfil del agro.",
  },
  {
    nombre: "Comercial Pas",
    rubro: "Seguros",
    frase: "Web, tracking y campañas de performance enfocadas en conversiones.",
  },
];

/* Las cuatro piezas de B3 en la home son los cuatro primeros, en
   el mismo orden. Sale de acá y no de una lista paralela
   justamente para que no puedan divergir. */
export const CASOS_EN_LA_HOME = CASOS.slice(0, 4);

/* PATAGONIA VESSELS NO ES UN CASO.
   Estuvo en B3 mientras no había lista cerrada. Va únicamente
   como logo en el marquee de B7: es cliente, no caso. */
export const CLIENTE_SOLO_LOGO = "Patagonia Vessels";

/* Las ranuras del marquee de B7: los ocho casos, después
   Patagonia Vessels, y tres marcadores hasta que Matías defina
   los que faltan. Doce en total, que es el ancho de pista con el
   que se probaron el loop y la máscara del Ticker. */
export const MARCAS_DEL_MARQUEE: (string | null)[] = [
  ...CASOS.map((c) => c.nombre),
  CLIENTE_SOLO_LOGO,
  null,
  null,
  null,
];
