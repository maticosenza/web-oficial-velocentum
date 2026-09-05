# HOME — ESTRUCTURA Y ANIMACIONES

Estado: **estructura confirmada por Matías.** Diez bloques: **ocho de contenido** (B1–B8) más nav (B0) y footer (B9).
Reemplaza al borrador de once bloques anterior.

---

## EL HILO CONDUCTOR: EL BORDE DE NUBE

Antes de los bloques, lo que hay que entender: la página entera está cosida por
**un mismo recurso** — un borde festoneado, semicírculos de distinto radio con
un contorno fino, que funciona como transición entre bloques y **va en las dos
direcciones**:

- **Nube blanca subiendo sobre azul** → entrada del bloque 2.
- **Nube azul subiendo sobre blanco** → entrada del bloque 8 y del footer.
- **Festoneado al pie de una tarjeta** → las cards de Trabajos.

Se aplica con `mask-image: url('/assets/borde-onda.svg')` con
`mask-position: center`, `mask-size: 100% 100%`, `mask-repeat: no-repeat`
y `mask-mode: alpha`, en propiedades separadas sobre una **capa decorativa**, nunca sobre texto,
controles ni anillos de foco. **Se construye una vez y se usa en toda la página.**
Es lo que hace que se sienta un sistema y no una suma de secciones.

---

# B0 · NAV

Fija en toda la página, por encima de todos los bloques. Se ve incluso sobre las
tarjetas apiladas de B4 y sobre la nube azul de B8.

**Copy**
- Logo a la izquierda, dentro de la card.
- Cuatro links: `INICIO · MÉTODO · CASOS · CONTACTO`
  *(pendiente: "Inicio" o "Home". El resto del sitio está en castellano.)*

**Forma**
- Card blanca flotante, centrada arriba, esquinas muy redondeadas, sombra suave.
  **Fondo sólido, sin `backdrop-filter`.** Verificado: no hay una sola
  declaración de `filter` ni `backdrop-filter` en toda la referencia.
- Cada link es un botón propio dentro de la card, no texto suelto.

**Color — un color por página, con sentido**

En la referencia los bordes de colores son decorativos: cada link tiene un color
al azar. Acá se les da función: **el color de cada link es el color de acento de
esa página.** El mismo color reaparece en los bloques de esa página. El nav pasa
a ser la leyenda del sistema de color del sitio.

| Estado | Tratamiento |
|---|---|
| Activo | Fondo lleno del color de esa página, texto oscuro |
| Inactivo | Fondo blanco, borde fino del color de esa página |
| Hover | El fondo se tiñe del color, el borde se funde con el relleno |

**Animaciones**

| # | Movimiento | Mecánica |
|---|---|---|
| 1 | Transición de borde a fondo lleno en hover | Transición CSS, ~150–200ms |
| 2 | Cambio de estado activo al navegar entre páginas | — |
| 3 | Estado activo con `aria-current`, no solo color | — |

**Mobile:** la card se reduce a logo + botón de menú, conservando la misma
forma. El desplegable mantiene los cuatro colores.

**Nota:** no verifiqué que los bordes tengan movimiento continuo en reposo en la
referencia; en las capturas están quietos. Si se quiere un idle, que sea muy
sutil o no va: cuatro bordes de color moviéndose solos pelean con el tono.

---

# B1 · HERO

**Copy**
- Eyebrow / Titular en tres líneas, la tercera en color de acento.
- Un CTA centrado debajo.

**Animaciones**

| # | Movimiento | Mecánica |
|---|---|---|
| 1 | Fondo azul con degradado difuminado | **Imagen renderizada o gradientes estáticos. NO `filter: blur`** |
| 2 | **CURSOR CUSTOM** — CONFIRMADO, es lo que más te gustó. **No es parallax.** `cursor:none` en el body + un div fijo de `100×100`, `pointer-events:none`, `z-index:13`, centrado en el puntero con `translate(-50px,-50px)`, con un SVG de `32×46` adentro | Verificado en vivo. Ver `MAPA_REFERENCIA.md` |
| 3 | Titular que **entra letra por letra**, escalonado, una sola vez en la carga | JS. Única animación de entrada del hero |
| — | ~~Nubes flotando en loop~~ **NO EXISTE.** En reposo la página está completamente estática: cero cambios de transform en 1,6s | Verificado en vivo |
| 4 | Objetos intercalados a izquierda y derecha de la línea 2 del titular | Posicionamiento absoluto dentro del renglón |
| 5 | CTA con glow en hover | CSS |
| 6 | El hero queda **fijado a 100vh** mientras B2 sube por encima | **M1** — `position: sticky; top: 0` |

**Assets:** objetos propios en tratamiento realista. Capa atmosférica propia.

---

# B2 · NUBE BLANCA — QUIÉNES SOMOS

**Copy**
- Eyebrow: `QUIÉNES SOMOS`
- Un párrafo grande centrado, con objetos intercalados dentro del texto.

**Animaciones**

| # | Movimiento | Mecánica |
|---|---|---|
| 1 | La nube blanca **sube desde abajo y tapa el hero** | Cierre de **M1**. Fondo opaco + borde festoneado arriba |
| 2 | El párrafo aparece al entrar | **M4** reveal |
| 3 | Objetos intercalados en medio de las frases | Inline, tamaño ~1 línea |

**Nota:** en la referencia los objetos van cada dos o tres líneas, nunca dos en
la misma. Rompe el ritmo si se abusa.

---

# B3 · TRABAJOS

**Copy**
- Titular grande a la izquierda.
- Botón a la derecha, alineado a la línea de base del titular → `/casos`.
- Bajo cada card: categoría chica arriba, nombre grande abajo.

**Animaciones**

| # | Movimiento | Mecánica |
|---|---|---|
| 1 | Las dos cards **entran desde los costados**, rotadas e inclinadas, y al scrollear se enderezan y se cierran hacia el centro | Scroll-linked: `translateX` + `rotate` + `scale` interpolados contra el progreso de scroll de la sección. **No es un reveal**, es un valor continuo |
| 2 | Cada card tiene el **borde inferior festoneado** | Componente de nube, variante "pie de tarjeta" |
| 3 | Video en loop dentro de la card, hover con estado propio | — |

**Detalle:** las cards arrancan **fuera del viewport por los costados y
rotadas**. Es lo que hace que la sección se sienta viva. La rotación es sutil,
del orden de 3–6 grados, no más.

**Contenido:** 2 piezas seleccionadas, con su rubro.

---

# B4 · NUESTROS SERVICIOS

El bloque más importante de la página.

**Copy**
- Titular grande centrado arriba.
- Por tarjeta: nombre grande, dos líneas de descripción, **cuatro entregables
  numerados separados por líneas finas**, imagen a la derecha.

**Animaciones**

| # | Movimiento | Mecánica |
|---|---|---|
| 1 | **Cada tarjeta se fija arriba y la siguiente se desliza por encima**, tapándola | **M2** — `position: sticky; top: 56px`, fondo de color pleno y opaco, `z-index` creciente |
| 2 | Al entrar, la tarjeta **llega rotada y se endereza** | Scroll-linked `rotate`, igual que B3 |
| 3 | Es **reversible**: si scrolleás para arriba, la de abajo se va y reaparece la de arriba | Consecuencia de que sea `sticky` puro, no una animación disparada |
| 4 | Cada tarjeta con un color distinto | Un color por servicio |

**Requisito técnico:** fondo 100% opaco por tarjeta. Si hay transparencia, el
apilado se rompe y se ve el desastre de abajo.

**En mobile:** pasa a apilado normal, sin superposición.

**Contenido:** un servicio por tarjeta. Los 16 entregables (4 por tarjeta) están
`[PENDIENTE DE VERIFICAR]` en el documento de copy.

---

# B5 · PÍLDORAS

Mini sección. Sin titular, sin CTA, sin peso. Es un respiro entre B4 y B6.

**Animaciones**

| # | Movimiento | Mecánica |
|---|---|---|
| 1 | Una sola fila que **flota hacia un costado** en loop continuo | **M3** — ticker, velocidad baja |
| 2 | Bordes desvanecidos, no cortados | Máscara `linear-gradient` que difumina el 10% de cada lado |
| 3 | Cada píldora con su color de fondo, texto oscuro | Colores en ciclo sobre la paleta |

**Altura:** banda baja. No ocupa un viewport.
**Dirección:** una sola. No hay segunda fila en contra.

**CONTENIDO — DEFINIDO:** las 11 capacidades que ya existen.

> Meta Ads · Tracking con CAPI · Google Ads · Atribución real · Product Ads ·
> Optimización de ficha · Contenido para pauta · GA4 · Influencer marketing ·
> Diseño de marca · Web y conversión

Se eligen sobre los atributos genéricos porque son concretas, ya están
escritas y le dicen al visitante qué compra.

---

# B6 · NUESTRO PROCESO

**Copy**
- Titular grande centrado.
- **Cuatro** tarjetas: número arriba, objeto grande al centro, título y una
  bajada de dos líneas abajo.

**Grilla:** 4 columnas iguales en desktop · 2×2 en tablet · 1 columna en mobile.
Con 4 en vez de 3, cada tarjeta baja de ~393px a ~292px sobre 1200px de
contenido. El objeto de 150×150 entra cómodo; la bajada baja a un techo de ~45
caracteres para que no pase de dos líneas.

**Animaciones**

| # | Movimiento | Mecánica |
|---|---|---|
| 1 | Reveal escalonado de las cuatro tarjetas | **M4** |
| 2 | Un color pleno por tarjeta, cuatro colores | — |
| 3 | Objeto grande centrado, con sombra proyectada | Objetos propios, tratamiento realista |

---

# B7 · CONFÍAN EN NOSOTROS

**Copy**
- Titular grande a la izquierda.
- Bajo cada logo, el nombre del cliente.

**Animaciones**

| # | Movimiento | Mecánica |
|---|---|---|
| 1 | Logos en **anillos circulares de color**, uno por cliente, con el logo adentro y el nombre debajo | Círculo con `border` de color, no relleno |
| 2 | Scroll horizontal en loop | **M3** |
| 3 | El bloque queda fijado mientras B8 sube por encima | Variante de **M2**, `top` alto y padding inferior grande |

**Contenido:** los 12 logos reales, con nombre.

**Detalle:** cada anillo lleva su propio color. Con 12 logos y una paleta corta,
los colores se repiten en ciclo.

---

# B8 · CIERRE — DENTRO DE LA NUBE AZUL

**DECIDIDO:** el CTA de cierre va **adentro del campo azul**, no antes.

Motivo: la nube no es solo una transición, es el fondo de una sección. Si el
CTA va antes, sobre blanco, compite con los logos de B7 —mismo fondo, mismo
bloque visual— y deja una franja azul grande sin contenido.

**Sin foto.** Con la nube entrando, apilar una fotografía a sangre serían dos
tratamientos peleando. El campo queda azul pleno con la mancha blanca encima.
Las fotos de backstage rinden en B2 y B3.

**Copy — todo ya aprobado, no hay nada que decidir**

- Eyebrow: `EMPECEMOS`
- Titular, dentro de la mancha blanca: **Hagamos crecer tu negocio.**
- Bajada: Una llamada de 45 minutos, sin costo. Salís con un diagnóstico y una
  proyección, actives o no con nosotros.
- CTA: `Reservá tu análisis ↗`

**Animaciones**

| # | Movimiento | Mecánica |
|---|---|---|
| 1 | La nube **azul** sube por encima de B7 | Componente de nube, dirección invertida respecto de B2 |
| 2 | El titular vive dentro de una **mancha blanca de bordes redondeados** sobre el azul | Mismo lenguaje de nube, variante "mancha" |
| 3 | CTA con glow en hover | CSS |
| 4 | Transición al footer oscuro | — |

**Destino del CTA:** agendar. **No lleva formulario.**
El formulario vive en `/contacto`. Así la home se puede publicar sin backend, y
no se abre un segundo destino de datos que ensucie la señal del píxel
compartido con velocentum.agency.

---

# B9 · FOOTER

**Copy**
- Logo dentro de una forma de nube, nombre de marca, mail.
- Botones de redes: píldoras con contorno, texto + ícono.
- Cuatro rectángulos grandes de color, uno por página, con el nombre abajo a la
  izquierda. **Cada rectángulo lleva el color de acento de su página**, el mismo
  que su link en el nav.

**Animaciones**

| # | Movimiento | Mecánica |
|---|---|---|
| 1 | Fondo oscuro pleno | Único bloque oscuro de la página |
| 2 | Hover en los rectángulos de página | — |

---

# ORDEN DE CONSTRUCCIÓN

**Primero los tres componentes transversales**, antes de cualquier bloque:

1. **Borde de nube** parametrizable — lo usan B2, B3, B7, B8 y B9.
2. **M2 · apilado sticky** — lo usan B4 y B7.
3. **M3 · ticker con máscara** — lo usan B5 y B7.

Después: B1+B2 juntos (van cosidos por M1) → B4 → B3 → B7+B8 → B5 → B6 → B9.

---

# PENDIENTES QUE HAY QUE RESOLVER

### 1. ~~CTA de cierre~~ — RESUELTO
Va dentro de B8, sobre el campo azul. Sin foto, sin formulario, con destino a
agendar. Ver B8.

### 2. Cifras y testimonios quedan afuera.
Es coherente con que la data dura viva en velocentum.agency. Solo confirmalo,
para dejarlo registrado como decisión y no como olvido.

### 3. ~~Los rectángulos del footer~~ — RESUELTO
Con "Inicio" en el nav son cuatro páginas, así que van cuatro rectángulos, cada
uno del color de su página. Coincide con el nav.

### 4. ~~Qué dicen las píldoras~~ — RESUELTO
Las 11 capacidades, en banda baja, una sola fila flotando hacia un costado.
Ver B5.

### 5. Cuántas tarjetas en B4.
En la referencia son cinco servicios. Vos tenés cuatro motores. Con cuatro el
apilado funciona igual; con menos de tres pierde el efecto.
