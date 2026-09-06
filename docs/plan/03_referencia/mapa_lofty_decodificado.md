# MAPA DE REFERENCIA — LOFTYLAB → VELOCENTUM

Documento de consulta. Une, en una sola tabla por sección:
**captura → sección de la referencia → lectura estética → mecánica real
decodificada → bloque nuestro.**

Cada dato está marcado como:
- `[VERIFICADO]` — leído directamente en el CSS del sitio publicado.
- `[INFERIDO]` — deducido de las capturas. No confirmado en código.

El JS de la referencia está minificado y compilado: **todo lo que depende de
JavaScript es `[INFERIDO]`.** Se reconstruye por comportamiento observado, no
copiando parámetros.

---

## ⚠ CORRECCIONES A LO QUE HABÍA ANOTADO ANTES

Tres cosas que escribí mirando las capturas y que el CSS desmiente:

**1. El nav NO tiene `backdrop-filter`.**
No hay una sola declaración de `filter` ni de `backdrop-filter` en todo el CSS
de la página. La card del nav es **blanca sólida**, no vidrio esmerilado. Yo lo
había anotado como blur y está mal.

**2. El fondo difuminado del hero NO es un blur de CSS.**
Por lo mismo: no hay `filter: blur`. El degradado desenfocado es **una imagen
ya renderizada** puesta de fondo. Es más barato y más estable que desenfocar en
el navegador, y hay que producirla como asset.

**3. Las rotaciones NO son CSS.**
Cero ocurrencias de `rotate()` en todo el CSS. Las cards inclinadas de Trabajos
y de Servicios se rotan **desde JavaScript, atadas al progreso de scroll**. Esto
confirma que son valores continuos y reversibles, no reveals disparados.

Y un hallazgo que cambia cómo se construye el recurso principal:

**4. El borde de nube es una MÁSCARA SVG, no `border-radius`.**
`[VERIFICADO]` — se aplica como
`mask-image: url(<svg>) 50% / cover no-repeat alpha`.
No son círculos apilados ni un gradiente: es un archivo SVG que recorta el
bloque entero por canal alfa. **Nosotros dibujamos nuestra propia SVG** y la
usamos igual. Es la forma correcta y la que permite parametrizar la silueta.

---

# SISTEMA GLOBAL `[VERIFICADO]`

| Dato | Valor |
|---|---|
| Breakpoints | `≥1200` desktop · `810–1199` tablet · `<810` mobile |
| Contenedor máximo | `1440px` |
| Contenido | `1200px` |
| Medida de texto | `650px` párrafo · `800–850px` titular |
| Padding lateral mobile | `16px` |
| Radios en uso | `24px` · `32px` · `59px` |
| `@keyframes` | **ninguno en toda la home** |

**Paleta de la referencia** (se reemplaza por la propia, se conserva la
estructura de roles):
`#2d69ff` `#4797ff` `#529dff` azules · `#ff742e` naranja · `#e5a0fa` lila ·
`#f8f47c` amarillo · `#030f2e` tinta · `#5c6275` gris texto · `#fff`

---

# CAPTURA 1 → HERO

**Sección de la referencia:** `Hero + About (Sticky)` › `Hero` › `Cloud Background`

**Lectura estética**
Fondo azul saturado arriba que se disuelve en un halo cálido —rosa, durazno,
amarillo— hacia abajo. Nubes blancas macizas, sin degradado, flotando a los
costados. Titular en display condensado, muy pesado, tres líneas, la tercera en
naranja. Objetos a izquierda y derecha de la línea 2, del alto de una línea.
CTA en píldora azul centrado. Nav flotante blanco arriba.

**Mecánica**

| Dato | Estado |
|---|---|
| `height: 100vh; position: sticky; top: 0` | `[VERIFICADO]` |
| `padding: 100px 16px 0` · `background-color: #4797ff` | `[VERIFICADO]` |
| Mobile: `position: relative; height: min-content; padding: 150px 16px 56px` | `[VERIFICADO]` |
| Fondo difuminado = imagen, no filtro | `[VERIFICADO]` |
| `Cloud Background`: `position: absolute; inset: 0; z-index: 0` | `[VERIFICADO]` |
| Parallax de capas siguiendo el cursor | `[INFERIDO]` |
| Flotación de nubes en loop | `[INFERIDO]` |

**→ Nuestro B1.** Mecánica M1.

---

# CAPTURA 2 → NUBE BLANCA / QUIÉNES SOMOS

**Sección de la referencia:** `Cloud + About` › `About`

**Lectura estética**
Silueta festoneada blanca —arcos de radio irregular, alternando grandes y
chicos— con un contorno negro finísimo, subiendo sobre el azul. Eyebrow gris en
mayúsculas. Párrafo grande centrado, tipografía de texto (no display), con
objetos intercalados **entre palabras**, uno cada dos o tres líneas, nunca dos
en el mismo renglón.

**Mecánica**

| Dato | Estado |
|---|---|
| Recorte por `mask-image: url(svg) 50%/cover no-repeat alpha` | `[VERIFICADO]` |
| Sube sobre el hero fijado, fondo opaco | `[VERIFICADO]` — cierre de M1 |
| Reveal del párrafo al entrar | `[INFERIDO]` |

**→ Nuestro B2.**

---

# CAPTURAS 3 y 4 → TRABAJOS

**Sección de la referencia:** `Works` › `Work 1..4` › `Work (Home)`

**Lectura estética**
Titular display grande abajo a la izquierda, botón con contorno alineado a la
derecha en la misma línea de base. Las piezas entran **inclinadas y salidas de
cuadro por los costados** (captura 3) y terminan **derechas, centradas y en
par** (captura 4). Cada card tiene **el borde inferior festoneado**, la misma
silueta de nube. Debajo: categoría chica en gris, nombre grande en tinta.

**Mecánica**

| Dato | Estado |
|---|---|
| `display: grid; gap: 20px; place-self: start` | `[VERIFICADO]` |
| `grid-template-columns: repeat(1, minmax(50px, 1fr))` | `[VERIFICADO]` |
| Rotación + traslación atadas al scroll, **no CSS** | `[VERIFICADO]` que no es CSS · ángulo `[INFERIDO]` |
| Ángulo aparente | `[INFERIDO]` — del orden de 3–6° |
| Festoneado al pie de card | `[VERIFICADO]` — misma técnica de máscara |

**→ Nuestro B3.**

---

# CAPTURAS 5, 6 y 7 → SERVICIOS

**Sección de la referencia:** `Services` › `Services List` › `Services1..5`

**Lectura estética**
Titular display centrado arriba. Cada tarjeta es un **rectángulo de color pleno**
—azul, naranja, verde…— de esquinas redondeadas, ocupando casi todo el ancho.
Dentro: nombre grande en tinta oscura sobre el color, dos líneas de descripción,
y abajo a la izquierda **cuatro entregables numerados `01`–`04`, separados por
líneas finas horizontales**. A la derecha, una imagen vertical con marco blanco.

En la captura 6 se ve el momento clave: la tarjeta naranja está **tapando** a la
azul, que quedó inclinada detrás. En la 7, la verde tapa a la naranja. El nav
queda por encima de todo.

**Mecánica**

| Dato | Estado |
|---|---|
| Cada tarjeta: `position: sticky; top: 56px` | `[VERIFICADO]` |
| Mobile: `top: unset; position: relative` | `[VERIFICADO]` |
| Contenedor: `max-width: 1440px; gap: 16px` (`8px` en tablet) | `[VERIFICADO]` |
| Fondo de color 100% opaco por tarjeta | `[VERIFICADO]` |
| La tarjeta entrante llega rotada y se endereza | `[INFERIDO]` — es JS |
| Reversible al scrollear hacia arriba | Consecuencia de que sea `sticky` puro |

**→ Nuestro B4.** Mecánica M2. Es el bloque más importante de la página.

---

# CAPTURA 8 → PÍLDORAS

**Sección de la referencia:** `Our Superpower` › `Ticker Key` › `Chip Container (Animate)`

**Lectura estética**
Una sola fila, banda baja, sin titular. Píldoras de radio completo, cada una de
un color pleno distinto, texto oscuro chico. Se desvanecen contra los dos
bordes en vez de cortarse.

**Mecánica**

| Dato | Estado |
|---|---|
| `mask: linear-gradient(90deg, #0000 0%, #000 10.06% 90.15%, #0000 100%)` | `[VERIFICADO]` |
| `padding: 24px 0` | `[VERIFICADO]` |
| Loop horizontal continuo | `[INFERIDO]` — es JS |

**→ Nuestro B5.** Mecánica M3.
El porcentaje de la máscara —10% de cada lado— es el número exacto que hace que
se vea prolijo.

---

# CAPTURA 9 → PROCESO

**Sección de la referencia:** `Process` › `All Cards` › `Card 1..3`

**Lectura estética**
Titular display centrado. Tres tarjetas de igual ancho, cada una de un color
pleno, esquinas redondeadas. Adentro y centrado: número `01` chico arriba,
objeto grande al medio con contorno blanco y sombra proyectada, título en
tipografía de texto abajo, y una bajada de dos líneas.

**Mecánica**

| Dato | Estado |
|---|---|
| `flex: 1 0 0; gap: 10px` — tres columnas iguales | `[VERIFICADO]` |
| Mobile: `flex: none; width: 100%` — apiladas | `[VERIFICADO]` |
| Contenedor de objeto: `150×150` desktop · `100×100` mobile | `[VERIFICADO]` |
| Reveal escalonado | `[INFERIDO]` |

**→ Nuestro B6.**

---

# CAPTURAS 10 y 11 → CLIENTES + NUBE AZUL

**Sección de la referencia:** `Trusted By + Why Us` › `Trusted By` › `Stroke`

**Lectura estética**
Titular display a la izquierda, logos alineados a la derecha en la misma banda.
Cada logo va **dentro de un anillo**: contorno fino de color, sin relleno, con
el logo a color adentro y el nombre del cliente debajo en gris. Cada anillo con
su propio color.

Debajo, la **nube azul subiendo sobre el blanco** — misma silueta que la
captura 2, invertida en color y dirección. En la captura 11 el campo azul ya es
el fondo de la sección siguiente, con su propio titular adentro.

**Mecánica**

| Dato | Estado |
|---|---|
| `Trusted By`: `position: sticky; top: 200px; padding: 0 16px 250px` | `[VERIFICADO]` |
| Mobile: `position: relative; gap: 32px; padding: 0 16px 100px` | `[VERIFICADO]` |
| Anillo: `padding: 24px` alrededor de un logo de `50×50` | `[VERIFICADO]` |
| Radio del anillo: `59px` sobre una caja de ~98px → casi circular | `[VERIFICADO]` |
| **No hay `border-radius: 50%` en toda la página** | `[VERIFICADO]` |
| Scroll horizontal de los logos | `[INFERIDO]` |

**→ Nuestros B7 y B8.**

**Dato importante:** el campo azul **no es una transición vacía, es el fondo de
una sección con contenido adentro.** Es exactamente el argumento por el que
nuestro CTA de cierre va adentro de la nube azul y no antes.

---

# CAPTURA 12 → FOOTER

**Sección de la referencia:** `Footer` › `Information + Navigation`

**Lectura estética**
Fondo tinta, el único oscuro de la página. Arriba y centrado: el logo dentro de
una forma de nube, el nombre de marca en blanco, el mail en gris. Debajo, tres
botones de redes en píldora con contorno blanco fino, texto + ícono. Abajo,
cuatro rectángulos verticales grandes de color pleno, uno por página, con el
nombre abajo a la izquierda en tinta oscura.

**→ Nuestro B9.** Cuatro rectángulos, cada uno del color de su link en el nav.

---

# CAPTURA EXTRA → CTA DE CIERRE

**Sección de la referencia:** bloque previo al footer.

**Lectura estética**
Fotografía a sangre con esquinas redondeadas. Encima, una **mancha blanca
orgánica de bordes redondeados** que contiene el titular display. Debajo, el
botón en píldora azul sobre la foto.

**→ Nuestro B8, adaptado.** Sin foto: la mancha blanca va sobre el campo azul,
porque apilar fotografía debajo de la nube entrante serían dos tratamientos
peleando.

---

# RESUMEN: QUÉ HAY QUE CONSTRUIR

**Cuatro piezas transversales, antes que cualquier bloque:**

1. **Silueta de nube** — SVG propia usada como `mask-image ... alpha`.
   Parametrizable en color, dirección, cantidad y radio de arcos, con o sin
   contorno. La usan B2, B3, B7, B8 y B9.
2. **Apilado sticky (M2)** — `top: 56px`, fondo opaco, `z-index` creciente,
   `relative` en mobile. La usan B4 y B7.
3. **Ticker con máscara (M3)** — máscara al 10% de cada lado. La usan B5 y B7.
4. **Rotación atada a scroll** — valor continuo y reversible. La usan B3 y B4.

**Dos assets a producir:**
- El degradado desenfocado del hero, como imagen.
- La SVG de la silueta de nube.

---

# COMPORTAMIENTO RESPONSIVE — `[VERIFICADO]`

Todo lo de esta sección está leído directamente de las media queries del CSS.

**Anchos de diseño de la referencia:** `390px` mobile · `810px` tablet.

## Lo más importante: las mecánicas no se apagan todas juntas

No es "desktop tiene animación y mobile no". Cada mecánica muere en un
breakpoint distinto, y eso es una decisión de diseño, no un descuido:

| Mecánica | Desktop ≥1200 | Tablet 810–1199 | Mobile <810 |
|---|---|---|---|
| **M1 · Pin del hero a 100vh** | Activo | **Activo** | Apagado |
| **M2 · Apilado de servicios** | Activo | **Activo** | Apagado |
| **Sticky de Clientes** (`top:200px`) | Activo | **Apagado** | Apagado |

El apilado de servicios y el pin del hero **sobreviven en tablet**: no hay
ninguna regla que los toque en el rango 810–1199. El sticky del bloque de
clientes, en cambio, ya se apaga en tablet. Tiene lógica: con `top:200px` y
`padding-bottom:250px` necesita altura de pantalla que en tablet no hay.

**Regla de construcción:** M1 y M2 se apagan en `<810`. El sticky de clientes se
apaga en `<1200`.

## Reglas exactas por bloque

**B1 · Hero** — mobile
`height: min-content; top: unset; position: relative; padding: 150px 16px 56px`
Deja de fijarse y pasa a alto natural. El padding superior grande es lo que
mantiene el aire del hero sin ocupar toda la pantalla.

**B3 · Trabajos** — mobile
`grid-template-columns: repeat(1, minmax(50px, 1fr)); gap: 32px 8px`
Una sola columna. En tablet mantiene las columnas y solo cambia el gap.

**B4 · Servicios** — mobile
Cada tarjeta: `top: unset; position: relative`. Se apilan normal, sin
superposición. Contenedor: `gap: 8px` (mobile y tablet).
Imagen de la tarjeta: `265px` en tablet, `204px` en mobile.

**B6 · Proceso** — mobile
De tres columnas a `grid-template-rows: repeat(2, min-content)` con una sola
columna y `gap: 8px`.

**B7 · Clientes** — tablet y mobile
`top: unset; position: relative; gap: 32px; padding: 0 16px 100px`
El padding inferior baja de `250px` a `100px` porque ya no hay que dejar
espacio para que el bloque siguiente suba por encima.

**B9 · Footer** — mobile
`flex-direction: column; gap: 32px`, contenedor a `padding: 100px 16px 16px`,
y los rectángulos de página pasan a `width: 100%; height: 100px` — de columnas
verticales a franjas horizontales apiladas.

## Escala de espaciado

La referencia usa **una escala corta y repetida**, no valores sueltos:

| Contexto | Desktop | Tablet | Mobile |
|---|---|---|---|
| Gaps de sección | 32px | 32px | 32px |
| Gaps de grupo | 16px | 16px | 16px |
| Gaps internos | 16px | 8px | 8px |
| Gaps finos | 4px | 4px | 4px |
| Padding de sección | — | `50px 16px` | `50px 16px` |
| Padding lateral | — | 16px | 16px |

**Todo es múltiplo de 4, y en la práctica solo se usan 4 · 8 · 16 · 32 · 100 ·
150 · 250.** Esa disciplina es parte de por qué se ve prolijo.

## Patrón de reflow

Se repite en casi todos los bloques y conviene adoptarlo tal cual:

1. Los contenedores en fila pasan a `flex-direction: column`.
2. Los hijos pasan de `flex: 1 0 0` a `flex: none; width: 100%`.
3. Las grillas pasan a una columna.
4. Los `aspect-ratio` se reemplazan por alturas fijas: `499px` tablet →
   `400px` mobile en el bloque grande, `265px` → `204px` en las imágenes de
   servicio.
5. El orden se reordena con `order: 0 / 1` donde hace falta que la imagen
   quede arriba del texto.

## Lo que NO está verificado en mobile

- Si el parallax de mouse se desactiva en touch. **`[INFERIDO]`** — es JS. Hay
  que desactivarlo igual: sin cursor no tiene sentido y consume batería.
- Si los tickers cambian de velocidad en mobile. **`[INFERIDO]`.**
- Cómo colapsa el nav. **No verificado**: las variantes mobile del nav están en
  el JS de componente, no en el CSS de la página.

---

# VERIFICACIÓN EN VIVO — sesión de navegador

Se abrió la página publicada y se inspeccionó el DOM en ejecución. Esto resuelve
lo que el CSS estático no podía mostrar, y **corrige tres cosas mal anotadas.**

## ✅ EL "MOVIMIENTO DEL MOUSE" ES UN CURSOR CUSTOM, NO PARALLAX

Es el hallazgo principal. Yo lo había anotado como capas del hero desplazándose
con el puntero. **Es otra cosa completamente distinta, y mucho más simple:**

| Dato | Valor | Estado |
|---|---|---|
| `cursor` del `body` | `none` — el cursor del sistema se oculta | `[VERIFICADO]` |
| Contenedor del cursor | `position: fixed` · `100×100px` · `z-index: 13` | `[VERIFICADO]` |
| `pointer-events` | `none` — no bloquea clics ni hovers | `[VERIFICADO]` |
| Centrado | `transform: translate(-50px, -50px)` sobre la posición del puntero | `[VERIFICADO]` |
| Contenido | un `<svg>` de `32×46px` | `[VERIFICADO]` |
| Aspecto | flecha gruesa, relleno celeste, contorno blanco grueso, sombra suave | `[VERIFICADO]` visualmente |

**Cómo se construye:** `cursor: none` en el documento, un div fijo de 100×100
con `pointer-events: none` y z-index alto, que se traslada a la posición del
puntero y se centra restando la mitad de su tamaño. Adentro, un SVG propio.

**Es barato y es lo que más te gustó.** Y encima acepta variantes: el mismo
patrón permite cambiar el SVG según sobre qué elemento esté el puntero.

**No medible:** el suavizado. El elemento no responde a eventos sintéticos, así
que no pude cronometrar si sigue al puntero al instante o con retardo elástico.
Se define por criterio propio en el mockup.

**Accesibilidad:** con `cursor: none` hay que garantizar que el cursor custom
siempre se dibuje. Si el JS falla, el usuario se queda sin puntero visible.
Conviene un fallback que restituya el cursor del sistema.

## ✅ EL TITULAR ENTRA LETRA POR LETRA

En la carga, las letras del titular aparecen **escalonadas, una por una**, no el
bloque entero. `[VERIFICADO]` visualmente en la primera carga.
No está en el CSS: es JS. Es la única animación de entrada del hero.

## ❌ CORRECCIÓN: LAS NUBES NO FLOTAN **EN LOOP**

Yo había anotado "nubes flotando en loop lento" como inferido. **Es falso como
loop.** Con el puntero quieto, se muestrearon todos los `transform`, `left` y
`top` de la página durante 1,6 segundos: **cero cambios.** En reposo, y sólo en
reposo, la página está estática.

Todo el movimiento de esa pantalla viene de tres fuentes y ninguna es un loop:
1. La entrada letra por letra del titular, una sola vez.
2. El cursor custom siguiendo al puntero.
3. El scroll.

## ⚠ CORRECCIÓN DE LA CORRECCIÓN: EL FONDO DEL HERO **SÍ SE MUEVE**

`[VERIFICADO]` por Matías con dos capturas comparadas.

La conclusión anterior —"no hace falta programar flotación de nubes, la
sensación de vida la da el cursor"— **era demasiado amplia y hay que
descartarla.** Confundió "no hay loop en reposo" con "el fondo no se mueve".

Lo que se ve comparando las dos capturas:

- **El degradado entero se desplaza.** El azul, el rosa y el naranja cambian de
  posición, no sólo de intensidad.
- **Las nubes blancas también se desplazan,** y no a la misma velocidad que el
  degradado.

O sea que el muestreo de 1,6 segundos no estaba mal: estaba hecho con el puntero
quieto, que es exactamente la condición en la que este movimiento no ocurre. **El
fondo responde al cursor y al scroll**, no a un temporizador.

**Consecuencia para nosotros, y ya construida en B1:**

- Dos capas de fondo con parallax por capas. El degradado se mueve poco y las
  nubes bastante más — si las dos fueran a la misma velocidad no habría
  profundidad, habría una imagen corriéndose.
- El seguimiento del puntero va **suavizado**, no directo: el valor aplicado se
  acerca al del puntero un 8% por cuadro. Directo se lee como un elemento
  persiguiendo al mouse; con retardo se lee como profundidad.
- Las mismas capas suben y bajan con el scroll, **más lento que el contenido**.
- **El titular, el CTA y los objetos no se mueven.** Sólo el fondo.
- Se apaga entero con `prefers-reduced-motion`. En táctil no hay cursor, así que
  ahí queda sólo el scroll.

Y sigue en pie lo otro: **no hay loop.** Con el puntero quieto y sin scrollear,
el hero no se mueve, y el bucle de animación ni siquiera está corriendo.

## ⚠ SIGUE SIN VERIFICAR

- **Colapso del nav en mobile.** El intento de redimensionar la ventana no
  cambió el viewport de la página, así que no se pudo observar. Queda pendiente.
- **Suavizado del cursor**, por lo dicho arriba.
