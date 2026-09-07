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
   Van en el marquee de B7 y no en `/casos`.

   ⚠ IMAGINARIOS ENTRA ACÁ Y NO EN `CASOS`. Tiene logo y va en la
   banda de la home, pero no tiene caso escrito: meterlo en `CASOS`
   le inventaría rubro, frase y pieza, y de paso rompería los ocho
   que la página de Casos anuncia en su encabezado. */
export const CLIENTES_SIN_CASO = ["Patagonia Vessels", "BuyNow", "Lámina", "Uprise", "Imaginarios"];

/* Las trece ranuras del marquee de B7: los ocho casos en su orden
   y los cinco clientes que sólo tienen logo. Ya no hay marcadores.

   Eran doce hasta que entró Imaginarios. El ancho de pista con el
   que se probaron el loop y la máscara del Ticker era doce, y trece
   no lo rompe: el componente duplica la pista completa, así que el
   ciclo visual cierra igual — como ya cerraba con doce, que
   tampoco son divisibles por los cinco acentos. */
export const MARCAS_DEL_MARQUEE: string[] = [...CASOS.map((c) => c.nombre), ...CLIENTES_SIN_CASO];

/* ===========================================================
   LOS TRECE LOGOS — versiones a color.

   Son PNG de 132×132 con fondo transparente, en
   `logos-clientes-color/`. Reemplazan a los SVG negros, y ese
   cambio es el que vació el contenedor: un disco pastel debajo de
   un logo que ya trae su propia paleta pelea con él, así que el
   acento se fue al contorno y el logo quedó apoyado sobre el fondo
   de la página. Ver `.b7-cliente__anillo`.

   ⚠ NO SE LES APLICA NADA. Ni filtro, ni sombra, ni recoloreo:
   cada marca se ve con los colores que entregó. Lo único que este
   archivo decide es CUÁNTO OCUPA cada una.

   POR QUÉ NO SE NORMALIZAN POR ANCHO NI POR ALTO
   Las cajas de tinta van de 4.6:1 —`uprise`, 104×26— a 1:2
   —`buynow`, 24×48—. Igualando el ancho, Uprise aplasta al resto;
   igualando el alto, lo hace BuyNow. Lo que el ojo compara no es
   ninguna de las dos medidas sino cuánta tinta hay, así que es eso
   lo que se iguala.

   ⚠ LOS ARCHIVOS VIENEN CON AIRE PROPIO, Y CADA UNO CON EL SUYO.
   Los doce de 132px comparten lienzo pero no encuadre: la tinta va
   del 18% del ancho —`buynow`— al 91% —`snake-store`—. Ese aire
   no se puede leer como intención de composición ni ignorar: hay
   que medirlo y descontarlo, que es lo que hace el paso 1.

   CÓMO SALE CADA NÚMERO
   1. Se mide la CAJA DE TINTA real de cada PNG, no el lienzo: el
      bounding box de los píxeles con alfa > 16. El umbral no es
      cosmético — los lienzos traen ruido casi invisible en las
      esquinas y a umbral 0 la caja da el archivo entero.
   2. Se cuentan los píxeles con alfa > 128: eso es la tinta.
   3. Se escala cada logo para que las trece cajas de tinta muestren
      la MISMA cantidad. Como la tinta crece con el cuadrado de la
      escala, el factor es `sqrt(T / tinta)`, con `T = 0.13` en
      unidades de D², el diámetro del círculo.
   4. Topes y suelo sobre la CAJA DE TINTA: la tinta no pasa del 70%
      del diámetro ni del 55% de alto, y al que le sobra aire se lo
      agranda hasta el 55% de ancho.

   ⚠ `ancho` ES EL ANCHO DEL ARCHIVO, NO EL DE LA TINTA. El `<img>`
   renderiza el PNG entero, aire incluido, así que el número está
   inflado por ese aire: `greenpac` pide 0.971 de ancho de archivo
   para que su tinta ocupe 0.427. Es fracción del DIÁMETRO del
   círculo —no del contenedor, que con el borde de 2px ya no mide lo
   mismo—, así que el mismo número sirve en el anillo de B7 y en el
   círculo más grande de Casos.

   ⚠ NO PONERLE TOPES EN CSS. Un `max-width` sobre el `<img>` se
   pisa con este número y gana en silencio, dejando la
   normalización a medias: los topes ya están aplicados acá, sobre
   la tinta, que es lo que se ve.

   ⚠ CUATRO NO LLEGAN AL 55% Y NO ES UN ERROR DE CÁLCULO: es el
   techo del raster. Los archivos miden 132px de ancho y el círculo
   más grande del sitio —Casos en desktop— mide 136, así que
   `ancho` no puede pasar de 132/136 = 0.971 sin dibujar un PNG por
   encima de sus píxeles. `armbruster` (tinta al 41%), `greenpac`
   (43%), `glam-ragazza` (50%) y `buynow` (18% de ancho, aunque 35%
   de alto, que es su medida real: es la única marca vertical) están
   contra ese techo. Para que entren en la banda hacen falta
   archivos con la tinta más grande dentro del lienzo, o los mismos
   a más resolución — no un número más alto acá, que sólo los
   agrandaría borrosos.

   ⚠ CINCO LLEGAN AL TOPE DE ANCHO: son las firmas apaisadas
   —`caracter`, `lamina`, `patagonia-vessels`, `snake-store`,
   `uprise`—. Igualar tinta las haría enormes de ancho, y el tope
   está justamente para eso.

   ⚠ EL TOPE DE ALTO SÍ ACTÚA ACÁ, a diferencia de los SVG negros:
   `imaginarios` es un emblema circular y `buynow` un rayo vertical,
   y los dos lo tocan. Con firmas apaisadas el ancho manda siempre
   primero; con marcas altas, no.
   =========================================================== */

export type Logo = {
  /** Ruta del archivo. */
  archivo: string;
  /**
   * Ancho del ARCHIVO como fracción del diámetro del círculo.
   * Incluye el aire que el PNG trae adentro: la tinta ocupa menos.
   */
  ancho: number;
};

export const LOGOS: Record<string, Logo> = {
  "Snake Store": {
    archivo: "/assets/logos-clientes-color/logo-snake-store-color.png",
    ancho: 0.776,
  }, // tinta 0.700 — tope de ancho
  Carácter: { archivo: "/assets/logos-clientes-color/logo-caracter-color.png", ancho: 0.797 }, // tinta 0.700 — tope de ancho
  "Glam Ragazza": {
    archivo: "/assets/logos-clientes-color/logo-glam-ragazza-color.png",
    ancho: 0.971,
  }, // tinta 0.500 — ⚠ techo del raster
  Vinotique: { archivo: "/assets/logos-clientes-color/logo-vinotique-color.png", ancho: 0.971 }, // tinta 0.662 — ⚠ techo del raster
  Ilsapore: { archivo: "/assets/logos-clientes-color/logo-ilsapore-color.png", ancho: 0.864 }, // tinta 0.550 — suelo
  Armbruster: { archivo: "/assets/logos-clientes-color/logo-armbruster-color.png", ancho: 0.971 }, // tinta 0.412 — ⚠ techo del raster
  Greenpac: { archivo: "/assets/logos-clientes-color/logo-greenpac-color.png", ancho: 0.971 }, // tinta 0.427 — ⚠ techo del raster
  "Comercial Pas": {
    archivo: "/assets/logos-clientes-color/logo-comercial-pas-color.png",
    ancho: 0.849,
  }, // tinta 0.630
  "Patagonia Vessels": {
    archivo: "/assets/logos-clientes-color/logo-patagonia-vessels-color.png",
    ancho: 0.783,
  }, // tinta 0.700 — tope de ancho
  BuyNow: { archivo: "/assets/logos-clientes-color/logo-buynow-color.png", ancho: 0.971 }, // tinta 0.177 de ancho y 0.353 de alto — ⚠ techo del raster
  Lámina: { archivo: "/assets/logos-clientes-color/logo-lamina-color.png", ancho: 0.77 }, // tinta 0.700 — tope de ancho
  Uprise: { archivo: "/assets/logos-clientes-color/logo-uprise-color.png", ancho: 0.888 }, // tinta 0.700 — tope de ancho
  Imaginarios: {
    archivo: "/assets/logos-clientes-color/logo-imaginarios-color.png",
    ancho: 0.734,
  }, // tinta 0.554 de ancho y 0.550 de alto — tope de alto
};
