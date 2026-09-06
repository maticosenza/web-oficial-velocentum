# MÉTODO — ESTRUCTURA, ANIMACIONES Y COPY

Referencia estructural: página `about` de LoftyLab.
`[VERIFICADO]` leído en el CSS · `[INFERIDO]` deducido de capturas.

---

# ESTADO: CONSTRUIDA `[F3]`

Seis unidades. **Tres se reutilizan de la home sin tocarlas**: el nav (B0), el
cierre (B8) y el footer (B9). Se construyeron MET-1, MET-2 y MET-3.

Se borró el uso de `PaginaProvisional` en `/metodo`. El componente sigue en el
andamio porque Casos y Contacto todavía lo usan.

## MET-1 · Hero

- **`100dvh` en los tres breakpoints.** Verificado en la fuente: **ninguna media
  query toca `.met1`**. Esta página no tiene pin, así que no hay nada que
  soltar en móvil — a diferencia de la home, que sí suelta el alto bajo 810px
  porque ahí se apaga el pin.
- Overlay de tinta al **45%**, en `#030f2e` y no en `--tinta`: son azules
  distintos y el de la referencia empuja la foto al azul del sistema. Va en
  **capa aparte de la foto**, para poder ajustarlo sin tocar la imagen. Bajó de
  70% para que la foto se vea; el contraste del titular lo resuelve un scrim
  aparte, ver más abajo.
- Titular blanco en dos líneas de 17 caracteres, con `line-height: 1.14`. No es
  una interlínea a ojo: en Anton la É llega a +1.1006 em sobre su línea de base
  y la O baja a −0.0078, así que por debajo de 1.1084 los dos renglones se
  tocan y la tilde de «DESPUÉS» se mete dentro de la O de «PRIMERO». A 0.98 el
  solapamiento era de 17px a cuerpo máximo.
- CTA azul con el mismo marcador de agenda que la home: `aria-disabled` y el
  aviso como descripción accesible.
- **No lleva borde de nube**, y es lo que lo define: el hero de la home entra en
  la nube, éste es foto a sangre. Ese contraste es el argumento de la página.
- La foto no existe: marco a sangre con el aviso al pie. **Al pie y no al
  centro** — centrado quedaba detrás del titular, que también se centra.

## MET-2 · Sobre nosotros

Título display a la izquierda, párrafo a la derecha, apilados bajo 810px.
El párrafo mide **188 caracteres** contra un techo medido de 220.

## MET-3 · Los cuatro pasos

Grilla 2×2, una columna bajo 810px. Un acento por tarjeta en orden 1→4 con su
`--texto-sobre-N`.

### Las tarjetas tienen los cuatro bordes ondulados

Cambio respecto de lo que decía este documento, que las daba como rectángulos de
color. Misma técnica de máscara alfa que `SectionEdge`, con una silueta nueva en
`assets/tarjeta-onda.svg` y ondas bastante más marcadas que el pie festoneado de
B3.

**Cómo se generó la silueta:** una curva cerrada, rectángulo muy redondeado
modulado por un seno de **diez períodos enteros sobre todo el perímetro**. Que
el número sea entero es lo que la hace cerrar sin costura; que la modulación sea
sobre el perímetro completo —y no lado por lado— es lo que hace que las ondas
crucen las esquinas en vez de morir en ellas.

**⚠ La máscara va sobre una capa decorativa, no sobre la tarjeta.** Es la regla
que `SectionEdge` ya deja escrita y vale igual acá: enmascarando la tarjeta
entera, cualquier texto que rozara una entrada de la onda se recortaría en
silencio, y un anillo de foco también. El campo de color es un `div` aparte
detrás del contenido.

**Las dos cosas que había que forzar, y están forzadas:**

1. **El padding sale del dip, no de ojo.** La onda muerde hacia adentro un 5.5%
   de cada semieje. El padding suma ese mordisco más el aire normal:
   `calc(var(--space-5) + 5.5%)` de lado. Medido: 63px laterales sobre una
   tarjeta de 572px.
2. **Las cuatro miden exactamente lo mismo.** La máscara se estira con
   `mask-size: 100% 100%`, así que dos tarjetas de distinto alto deforman la
   onda distinto y se nota. `grid-auto-rows: 1fr` iguala las filas y las
   columnas ya eran iguales. **Verificado: las cuatro dan 572×508.**

### Los objetos, y por qué acá cierran los cuatro

| Paso | Objeto | Significado en identidad.md |
|---|---|---|
| 01 Revisamos el ecosistema | conexión | Coordinar disciplinas |
| 02 Diagnosticamos | foco | Entender, diagnosticar |
| 03 Proyectamos | barras | Medir y proyectar |
| 04 Ejecutamos | rayo | Activar una prioridad |

El 01 mira las cuatro disciplinas juntas —qué vendés, cómo llega la gente, qué
encuentra—, que es exactamente lo que significa conexión. **Es el objeto que en
la home quedó fuera de B6, y acá encuentra su lugar.**

Contorno blanco grueso, el mismo de B6. Se animan **al entrar en viewport y al
hover, no en loop**, como el plan había decidido: cuatro objetos moviéndose
solos en una página que explica cómo trabajás va en contra del tono.

## MET-4 · Cierre

**Es el componente B8 con otro copy.** Se le agregaron props `titulo`, `eyebrow`
y `bajada`, con los valores de la home por defecto: el llamado de la home no
cambió —verificado— y Método pasa el suyo. `eyebrow` y `bajada` se apagan con
cadena vacía, porque la spec de MET-4 pide sólo titular y CTA. Se encienden
pasando el texto.

## Copy: se usó el tuyo, no el recortado

Este documento proponía partir los títulos por no entrar. **Se usó el copy
completo que mandaste**, de 28 a 35 caracteres de título y de 95 a 128 de
bajada, y entra: con la tarjeta en 572px, los títulos toman dos renglones y las
bajadas tres. La tabla de "tu copy no entra en este formato" quedó desactualizada
por el ancho real de la tarjeta.

---

## HALLAZGO PRINCIPAL: ESTA PÁGINA NO TIENE STICKY

`[VERIFICADO]` — **cero ocurrencias de `position: sticky` en todo el `about`.**

La home usa tres mecánicas de sticky. Esta página no usa ninguna. Todo el peso
visual lo llevan dos cosas: el hero a pantalla completa con foto, y la grilla de
cuatro tarjetas de color.

**Es una buena noticia:** Método es mucho más barata de construir que la home, y
la calma es correcta para una página que explica cómo trabajás.

---

# MET-0 · NAV

Igual que en la home. El link **Método** en estado activo: fondo lleno de su
color. En la referencia el activo se ve como un rectángulo verde relleno con el
texto en tinta.

---

# MET-1 · HERO

**Mecánica** `[VERIFICADO]`

| Dato | Valor |
|---|---|
| Contenedor | `height: 100vh; position: relative` — a pantalla completa, **sin pin** |
| Imagen | `position: absolute; inset: 0` con `will-change: filter` |
| Overlay | capa de tinta `#030f2e` a `opacity: 0.45` sobre la foto, `inset: 0` |
| Scrim | degradado vertical del mismo tinte, `0.25` en la banda del titular |
| Titular | display condensado, blanco, dos líneas, centrado |

### El overlay, y por qué 45% no alcanza solo

El overlay es lo que permite que una foto cualquiera funcione de fondo: la tiñe
lo suficiente como para que aporte textura y profundidad, no información.

Al **70%** la foto quedaba apagada. Bajó a **45%**, y ahí el titular blanco deja
de cumplir. Medido sobre `imagen-metodo.png`, compuesto contra el tinte con la
fórmula de WCAG, sobre toda la caja del titular:

| Velo | Peor contraste del titular |
|---|---|
| 70% | 7.10:1 |
| 57.5% | 4.55:1 |
| 50% | 3.55:1 |
| **45%** | **3.04:1** |
| **40%** | **2.62:1** |

No es un brillo puntual: al 45%, el **2.39%** de la caja del titular queda bajo
4.5:1, repartido de un extremo al otro — el aro de vidrio detrás de
«ENTENDER.», el objeto violeta y las piezas de la izquierda.

**La solución es un scrim, no un velo más alto ni una sombra.** Subir el velo
parejo hasta cumplir pedía 57.5%, que devuelve buena parte del apagado que se
quería sacar. Y `text-shadow` **no sirve para esto**: WCAG 1.4.3 compara el
color del texto contra el del fondo, y la sombra no entra en esa cuenta — ayuda
a percibir el texto, no a cumplir el mínimo.

Va entonces una segunda capa del mismo tinte al **25%**, en un degradado
vertical detrás del titular. Compuesta con el velo da el equivalente a un 58.75%
en esa banda, y el resto del hero se queda en 45%. Medido en siete ventanas
—de 390×844 a 1920×700— el peor caso pasa de 3.04:1 a **4.75:1**, y en ninguna
queda un solo píxel de la caja del titular por debajo de 4.5.

Es vertical y no una elipse alrededor del texto porque la elipse dejaba ver su
rectángulo: con radios más grandes que la caja, el degradado todavía valía 0.20
al llegar a las esquinas y ahí lo cortaba el borde del elemento.

**Copy**

> PRIMERO ENTENDER.
> DESPUÉS PROPONER.

17 y 17 caracteres. La referencia usa 14 y 11. Entra bien.

**Adición tuya:** un CTA grande debajo del titular. La referencia **no tiene
CTA en este hero**, solo el texto sobre la foto. Agregarlo está bien y le da
salida a la página desde arriba.

> `Reservá tu análisis ↗`

**Imagen de fondo:** `imagen-metodo.png`, 1690×931, un render 3D de los objetos
del sistema sobre fondo azul oscuro con la columna central vacía — que es
justamente donde cae el titular.

Se sirve en **WebP**: 1415 KB → **69.5 KB**, el 4.9% del original. El PNG queda
en el repo para rehacer la pieza, no para servirla. Va como `<img>` con
`fetchPriority="high"` y no como `background-image`: es lo primero que se ve de
la página y el escáner de precarga encuentra un `src` en el HTML enseguida,
mientras que un fondo en CSS recién se descubre después de bajar la hoja.

**El recorte en móvil, resuelto.** La imagen es 1.82:1 y el hero es `100dvh`:
con `cover`, en un teléfono sólo entraba la columna central oscura y no se veía
un solo objeto. Y no hay recorte vertical que lo salve, porque los dos grupos de
objetos están pegados a los bordes laterales: verlos a los dos exige el ancho
completo, y con el ancho completo el alto es el que es.

Así que abajo de 810px la imagen entra **entera**, a lo ancho y apoyada al pie,
y el resto del hero se pinta de `#1A2341` — el navy muestreado del propio
archivo, no un color de la paleta. Como ese fondo es liso, la escena parece
continuar hacia arriba en vez de terminar en una banda. Si se reemplaza la foto
hay que volver a muestrearlo.

El borde superior de la franja lleva un desvanecido de 72px: el 11% de la fila
de arriba del archivo tiene objeto encima —la esfera coral y el objeto violeta
llegan cortados—, y con una costura dura esos dos quedaban rebanados en plano
contra el navy.

Ahí el velo y el scrim se apagan: el titular ya no está sobre la foto sino sobre
navy plano, donde el blanco da **15.05:1**. Dejarlos puestos sólo apagaría la
imagen.

*Detalle menor, medido:* en los dos teléfonos más bajos —360×640 y 375×667— el
CTA se mete 11px y 6px en la franja, dentro del desvanecido, donde la foto está
al 16% y al 9%. No afecta a nadie: el botón tiene fondo sólido, así que su
contraste no depende de lo que haya detrás.

**Sobre la estética de nubes que pediste:** acá conviene **no** meter el borde
festoneado. El hero de esta página es foto a sangre de borde a borde, y ese es
justamente su contraste contra la home. La nube vuelve en el cierre (MET-4), que
es donde ya la tenemos.

---

# MET-2 · SOBRE NOSOTROS

**Mecánica** `[VERIFICADO]`
`flex-flow: column; padding: 0 16px`. Título display grande a la izquierda,
párrafo a la derecha, en la misma banda. Mucho aire arriba y abajo.

**Función:** es el único lugar de las cuatro páginas donde se dice quiénes son.
Por eso va acá y no se estira: un párrafo y sigue.

**Título display, izquierda**
> SOBRE NOSOTROS

*(14 caracteres. La referencia usa `WHO WE ARE`, 10. Entra.)*

**Párrafo, derecha — elegir uno**

**A.** *(178 car.)*
> Somos un equipo de crecimiento especializado en marcas de e-commerce que ya
> venden. No empezamos por las campañas: empezamos por entender qué está
> pasando en tu negocio y por qué.

**B.** *(198 car.)*
> Trabajamos con marcas de e-commerce que ya venden. Estrategia, contenido,
> pauta y conversión en un solo equipo, con un mismo objetivo. No empezamos por
> las campañas: empezamos por entender tu negocio.

**C.** *(190 car.)*
> Somos especialistas en marcas de e-commerce. Estrategia, contenido, pauta y
> conversión en un solo equipo. No empezamos por las campañas: empezamos por
> entender qué pasa en tu negocio y por qué.

**Techo medido:** 220 caracteres. Las tres entran cómodas.

**Recomiendo la B:** es la única que dice *qué* hacen además de *para quiénes*,
y deja la frase de método como cierre del párrafo, que es donde mejor cae.

**⚠ Coherencia con la home:** el bloque B2 de la home también es un párrafo de
"quiénes somos". **Los dos no pueden decir lo mismo.** Reparto propuesto:
la home habla del problema del cliente —sos el cuello de botella, sumar gente no
lo resolvió—; Método habla de ustedes: en qué se especializan y cómo encaran.

# MET-3 · LOS CUATRO PASOS

**Mecánica** `[VERIFICADO]`

| Dato | Valor |
|---|---|
| Grilla | `grid-template-columns: repeat(2, minmax(50px, 1fr))` · `grid-template-rows: repeat(2, min-content)` → **2×2** |
| Gap | `16px` desktop · `8px` tablet · `8px` mobile |
| Mobile | `grid-template-columns: repeat(1, minmax(50px, 1fr))` → una columna |
| Contenedor del objeto | `aspect-ratio: 1.32174`, `height: 242px` → **320 × 242px** |
| Estructura de la tarjeta | número arriba · objeto al centro · título · bajada |
| Color | uno pleno por tarjeta, cuatro colores |

**Ancho real de tarjeta:** sobre 1200px de contenido con 2 columnas y 16px de
gap, cada tarjeta mide ~592px. Es ancha: hay más lugar para texto del que usa
la referencia.

## ⚠ TU COPY NO ENTRA EN ESTE FORMATO

Medí la referencia contra lo que me pasaste:

| | Referencia | Tu copy | Exceso |
|---|---|---|---|
| Título de tarjeta | 9–14 car. | 20–33 car. | **2 a 3×** |
| Bajada de tarjeta | 43–49 car. | 120–200 car. | **3 a 4×** |

Lo que vos llamás título es en realidad una frase resumen. `Miramos todo, no
solo las campañas` son 33 caracteres contra `Playful & Bold` que son 14.

**No hay que tirar tu copy: hay que partirlo.** Título corto arriba, y la frase
que tenías como título se funde en la bajada. Como la tarjeta mide 592px de
ancho, la bajada puede llegar a ~140 caracteres sin pasar de tres líneas — casi
el triple de lo que usa la referencia.

## Copy ajustado — propuesta

> **01 · Miramos todo**
> Revisamos el ecosistema completo, no solo la pauta: qué vendés y a qué precio,
> cómo llega la gente y qué encuentra cuando llega.
> *(12 / 135)*

> **02 · Dónde se traba**
> "No vendo lo suficiente" nunca es un solo problema. Al separarlo aparecen
> tres o cuatro frentes, y siempre hay uno que pesa más.
> *(15 / 133)*

> **03 · Cuánto se mueve**
> Con tus números reales, una proyección a 90 días. No promesas: un rango con
> supuestos explícitos y su inversión.
> *(16 / 119)*

> **04 · En qué orden**
> No activamos todo junto. Primero lo que más pesa, y qué tiene que estar
> resuelto antes de escalar.
> *(13 / 100)*

**Lo que se perdió al recortar:** de la 01 salió "qué hace la competencia"; de
la 03, "para que sepas qué esperar"; de la 04, "definimos la secuencia que
destraba". Si alguna de esas te parece imprescindible, decime cuál y busco de
dónde sacar caracteres.

## Los objetos animados

Pediste un ícono animado por tarjeta. En la referencia los objetos son
**estáticos** — verificado en vivo: en reposo la página no se mueve.

Dos caminos:

**a) Animación permanente en loop.** Es lo que pediste literal. Pero con cuatro
objetos moviéndose solos al mismo tiempo, en una página que explica cómo
trabajás, va en contra del tono sobrio.

**b) Animación al entrar en viewport y al hacer hover.** El objeto se arma o
entra cuando la tarjeta aparece, y reacciona si le pasás el mouse por encima.
En reposo queda quieto.

**Recomiendo la b.** Da la sensación de vida que buscás sin romper la calma, y
es coherente con la home, donde el movimiento en reposo tampoco existe.

**Objetos:** los tuyos, en tratamiento realista. Un objeto por paso:
mira para "miramos todo", prisma para "dónde se traba", barras para "cuánto se
mueve", rayo para "en qué orden".

---

# MET-4 · CIERRE

Igual que el B8 de la home: campo azul con la nube entrando, mancha blanca con
el titular, CTA debajo.

**Copy**
> Empecemos por entender tu negocio.
> `Reservá tu análisis ↗`

*(33 caracteres. La referencia usa 18. Dentro de la mancha entra, pero va a
ocupar dos líneas. Alternativa más corta si queda apretado: "Empecemos por
entender.")*

---

# MET-5 · FOOTER

Idéntico al de la home. Cuatro rectángulos, Método en su color.

---

# BLOQUES DE LA REFERENCIA QUE NO USAMOS

El `about` tiene dos secciones más que tu copy no contempla. Lo registro como
decisión, no como olvido:

**`Our Story`** — bloque de imagen + texto largo (266 caracteres) con un
elemento gráfico suelto de acento. **Fuera.** Tu método no necesita relato
fundacional, y agregarlo diluye la página.

**`Our Team`** — seis miembros con foto, nombre y cargo, con chips de color.
**Fuera, y además estaba bloqueado:** no tenés fotos de personas.

**CONFIRMADO: las dos quedan afuera.** Decisión tomada — la página se mantiene
en cinco bloques para no extenderla.

---

# COMPORTAMIENTO RESPONSIVE

Todo `[VERIFICADO]` sobre las media queries del `about`, salvo lo marcado.

**Anchos de diseño:** `390px` mobile · `810px` tablet.
**Breakpoints:** `<810` mobile · `810–1199` tablet · `≥1200` desktop.

## El dato que más importa: el hero NO cambia

`[VERIFICADO]` — **no hay una sola regla responsive para el contenedor del hero.**
Se queda en `height: 100vh` en los tres breakpoints.

Esto es lo contrario de lo que hace la home, donde el hero abandona el `100vh` y
pasa a `position: relative; height: min-content` por debajo de 810.

**Por qué la diferencia:** el hero de la home tiene que soltar el pin porque
está cosido al bloque siguiente por el par sticky. Acá no hay sticky, así que la
pantalla completa se sostiene sola. Una foto a sangre con overlay funciona igual
de bien en un teléfono que en un monitor.

**Lo único que se ajusta** es el bloque de texto sobre la foto:
`max-width: 400px` en mobile, para que el titular no toque los bordes.

## MET-3 · Las cuatro tarjetas

| | Columnas | Gap |
|---|---|---|
| Desktop ≥1200 | **2 × 2** | `16px` |
| Tablet 810–1199 | **2 × 2** | `8px` |
| Mobile <810 | **1 columna** | `8px` |

`[VERIFICADO]` — en tablet la grilla **no se reordena**: sigue en dos columnas y
lo único que cambia es el gap. La caída a una columna ocurre recién en mobile.

**Dentro de cada tarjeta**, en mobile: el contenedor pasa a
`flex-direction: column; gap: 8px`, y el contenedor de imagen a
`flex: none; order: 1; width: 100%`. El `order` es lo que permite invertir
imagen y texto cuando hace falta.

**⚠ Recomendación nuestra, no de la referencia:** con una sola columna y cuatro
tarjetas, el contenedor de objeto de `242px` de alto hace que la página se
estire mucho en teléfono. Conviene bajarlo a ~`160px` en mobile. La home ya hace
algo equivalente: sus contenedores de objeto van de `150×150` a `100×100`.

## MET-2 · Sobre nosotros

`[VERIFICADO]` — en mobile el contenedor de texto pasa a
`flex-direction: column; gap: 16px`, así que **el título display y el párrafo
dejan de estar lado a lado y se apilan**: título arriba, párrafo debajo.
En tablet siguen en fila y solo baja el gap a `16px`.

## Padding lateral

`[VERIFICADO]` — el contenedor general usa `padding: 0 8px` en tablet y en
mobile. Es **la mitad** del `16px` que usa la home. Vale la pena unificarlo en
uno de los dos valores para todo el sitio; si no, las páginas van a tener
márgenes distintos en teléfono.

## MET-5 · Footer

`[VERIFICADO]`, mobile:
- El contenedor pasa a `flex-direction: column`, con `padding: 100px 16px 16px`.
- `Information + Navigation` a `gap: 32px`, `Information` a `gap: 16px`.
- `Navigation` a `flex-direction: column; gap: 8px`.
- `Social Media` a `flex-wrap: wrap; order: 1; width: 100%`, y el logo a
  `order: 0` — o sea que **logo arriba, redes abajo**, invirtiendo el orden del
  marcado.
- Los rectángulos de página pasan a `flex: none; width: 100%; height: 100px`:
  de columnas verticales a franjas horizontales apiladas.

En tablet solo cambian los gaps; la estructura se mantiene.

## Separación entre secciones

`[VERIFICADO]` — `gap: 100px` entre bloques en tablet y mobile, con un
`margin-bottom: -100px` que compensa el último. Es un valor único, no una escala.

## Escala de espaciado

Igual que en la home: solo `8` · `16` · `32` · `100`. Nada fuera de eso.

## Lo que NO se pudo verificar

- **Cómo colapsa el nav en mobile.** Se abrió la página en vivo e intentó
  reducirse la ventana: el navegador acepta el redimensionado pero la página
  sigue reportando ancho de escritorio, así que la variante mobile del nav nunca
  se activó. Lo que sí se confirmó en vivo es el modelo de estados: cada link es
  un botón con un elemento `Border` propio y estados `On` / `Off`, y en el
  `about` el link About está en `On`. **Queda pendiente.**
- **La animación de los objetos**, porque en la referencia son estáticos.

---

# RESUMEN DE LA PÁGINA

Seis unidades: nav, hero, sobre nosotros, cuatro pasos, cierre y footer: Nav · Hero a pantalla completa con foto y overlay · Intro ·
Cuatro tarjetas en 2×2 · Cierre azul · Footer.

Sin sticky. La única mecánica nueva respecto de la home es el **overlay de tinta
sobre foto a sangre**, que se reusa después en Casos.

## Decisiones abiertas

1. ~~`Our Story` y `Our Team`~~ — RESUELTO: afuera.
2. Objetos: ¿loop permanente o animación al entrar y al hover? (recomendado: hover)
3. ¿Aprobás el copy recortado de las cuatro tarjetas, o hay algo que no se puede perder?
4. ¿Qué foto va en el hero?
5. Párrafo de MET-2: A, B o C.
