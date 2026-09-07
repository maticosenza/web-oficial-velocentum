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

   LAS OCHO DESCRIPCIONES SON COPY FINAL
   Amplían el resumen de cada trabajo sin agregar cifras, períodos
   ni resultados que no estén documentados.
   =========================================================== */

/* MEDIOS DE LOS CASOS

   Las tarjetas se presentan en proporción vertical 3:4 mediante
   CSS. Snake Store y Vinotique usan versiones 1080×1440 sin audio,
   generadas desde sus originales y con pósters de igual tamaño.
   Vinotique conserva el corte útil de cinco segundos.

   Comercial PAS usa un lienzo 3:4 que mantiene completa la foto
   original y extiende únicamente cielo y pavimento. */
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
    frase:
      "Gestionamos Meta Ads y producimos contenido pensado para pauta, con una estrategia orientada a ampliar el alcance, mejorar el rendimiento y acompañar el crecimiento de las ventas.",
    medio: {
      tipo: "video",
      archivo: "/assets/caso-snake-store.mp4",
      poster: "/assets/caso-snake-store-poster.webp",
    },
  },
  {
    nombre: "Carácter",
    rubro: "Productora",
    frase:
      "Desarrollamos su sitio web y campañas de performance para presentar sus servicios con claridad, fortalecer su presencia digital y generar nuevas oportunidades comerciales.",
    medio: { tipo: "imagen", archivo: "/assets/caso-caracter.webp" },
  },
  {
    nombre: "Glam Ragazza",
    rubro: "Indumentaria",
    frase:
      "Articulamos Paid Media con un sistema continuo de contenidos para sostener el crecimiento, ordenar la comunicación y construir una experiencia de marca consistente.",
    medio: { tipo: "imagen", archivo: "/assets/caso-glam-ragazza.webp" },
  },
  {
    nombre: "Vinotique",
    rubro: "Gastronomía",
    frase:
      "Redefinimos la estrategia de marca y desarrollamos una nueva web para comunicar su propuesta con claridad, transmitir confianza y acompañar cada etapa de la experiencia digital.",
    medio: {
      tipo: "video",
      archivo: "/assets/caso-vinotique.mp4",
      poster: "/assets/caso-vinotique-poster.webp",
    },
  },
  {
    nombre: "Ilsapore",
    rubro: "Gastronomía",
    frase:
      "Creamos contenido y gestionamos sus redes para posicionar la marca, combinando comunicación orgánica y pauta orientada a generar nuevos pedidos mayoristas.",
    medio: {
      tipo: "video",
      archivo: "/assets/caso-ilsapore.mp4",
      poster: "/assets/caso-ilsapore-poster.webp",
    },
  },
  {
    nombre: "Armbruster",
    rubro: "Real Estate",
    frase:
      "Diseñamos una estrategia integral de contenidos y campañas de performance para fortalecer su presencia digital y captar nuevas oportunidades comerciales.",
    medio: { tipo: "imagen", archivo: "/assets/caso-armbruster.webp" },
  },
  {
    nombre: "Greenpac",
    rubro: "Agricultura",
    frase:
      "Desarrollamos una web centrada en su propuesta de producto y campañas segmentadas por zona y perfil de productor para conectar con audiencias del sector agropecuario.",
    medio: { tipo: "imagen", archivo: "/assets/caso-greenpac.webp" },
  },
  {
    nombre: "Comercial Pas",
    rubro: "Seguros",
    frase:
      "Integramos sitio web, medición y campañas de performance para ordenar el recorrido digital, optimizar la captación y convertir el interés en consultas comerciales.",
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

   ⚠ TRES ARCHIVOS SE REHICIERON, Y SUS NÚMEROS NO SE HEREDAN.
   `greenpac`, `buynow` y `uprise` llegaron de nuevo con la tinta
   mucho más grande dentro del mismo lienzo de 132, y eso invalida
   el multiplicador anterior: el número es una fracción del ANCHO
   DEL ARCHIVO, y lo que cambió es cuánto de ese archivo es tinta.
   Arrastrar el valor viejo los habría dibujado enormes. Se
   recalcularon los tres contra su caja de tinta nueva:

   | marca    | tinta vieja | tinta nueva | ancho viejo | ancho nuevo |
   |---|---|---|---|---|
   | greenpac | 58×56       | 78×75       | 0.971       | 0.94 |
   | buynow   | 24×48       | 38×78       | 0.971       | 0.92 |
   | uprise   | 104×26      | 88×90       | 0.888       | 0.80 |

   Los tres salieron del techo del raster: con la tinta más grande
   ya no hace falta estirar el archivo para que se vea. `buynow`
   se dimensiona por ALTO —es la única marca vertical— y llega al
   54.4% de alto contra un 26.5% de ancho, que es su forma.

   ⚠ DOS SIGUEN CONTRA EL TECHO DEL RASTER, y no es un error de
   cálculo. Los archivos miden 132px de ancho y el círculo más
   grande del sitio —Casos en desktop— mide 136, así que `ancho`
   no puede pasar de 132/136 = 0.971 sin dibujar un PNG por encima
   de sus píxeles. `armbruster` (tinta al 41%) y `glam-ragazza`
   (50%) están ahí. Para que entren en la banda hacen falta
   archivos con la tinta más grande dentro del lienzo, igual que
   los tres de arriba — no un número más alto acá, que sólo los
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
  Greenpac: { archivo: "/assets/logos-clientes-color/logo-greenpac-color.png", ancho: 0.8 }, // tinta 0.674 de ancho y 0.682 de alto en el PNG HD
  "Comercial Pas": {
    archivo: "/assets/logos-clientes-color/logo-comercial-pas-color.png",
    ancho: 0.849,
  }, // tinta 0.630
  "Patagonia Vessels": {
    archivo: "/assets/logos-clientes-color/logo-patagonia-vessels-color.png",
    ancho: 0.783,
  }, // tinta 0.700 — tope de ancho
  BuyNow: { archivo: "/assets/logos-clientes-color/logo-buynow-color.png", ancho: 0.92 }, // tinta 0.265 de ancho y 0.544 de alto — manda el alto
  Lámina: { archivo: "/assets/logos-clientes-color/logo-lamina-color.png", ancho: 0.77 }, // tinta 0.700 — tope de ancho
  Uprise: { archivo: "/assets/logos-clientes-color/logo-uprise-color.png", ancho: 0.8 }, // tinta 0.533 de ancho y 0.545 de alto
  Imaginarios: {
    archivo: "/assets/logos-clientes-color/logo-imaginarios-color.png",
    ancho: 0.734,
  }, // tinta 0.554 de ancho y 0.550 de alto — tope de alto
};
