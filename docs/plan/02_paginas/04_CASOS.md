# CASOS — ESTRUCTURA, ANIMACIONES Y RESPONSIVE

Referencia estructural: página `works` de LoftyLab.
Analizada en el código del mirror **y en la página en vivo**.
`[VERIFICADO]` medido · `[INFERIDO]` deducido · `[NUESTRO]` decisión propia.

---

## ⚠ CORRECCIÓN A LO QUE HABÍA ANOTADO

Yo había escrito que esta página tiene *"overlay fijo con blur arriba y abajo"*.
**Es falso.** `[VERIFICADO]`

Los bloques se llaman `Top Blur` y `Bottom Blur`, pero **no hay desenfoque**.
Son **degradados blancos planos**:

```
Top Blur    → linear-gradient(180deg, #fff 0%, transparent 100%)
Bottom Blur → linear-gradient(180deg, transparent 0%, #fff 100%)
```

Ambos de `height: 10vh`, `position: absolute`, pegados arriba y abajo.
No hay una sola declaración de `filter` ni `backdrop-filter` en toda la página.

**Es mejor noticia de la que parece:** un degradado es infinitamente más barato
que un blur real y no castiga el rendimiento en teléfonos.

---

# LA MECÁNICA CENTRAL

Tres capas superpuestas. Entenderlas es entender la página entera.

### Capa 1 — La lista de casos (fondo, scrollea normal)

`[VERIFICADO]`

| Dato | Valor |
|---|---|
| Contenedor `All Works` | `max-width: 1200px; padding: 200px 0 0` |
| Cada caso | `height: calc(viewport-height × 0.8)` · `max-width: 1200px` · `max-height: 900px` |

**El 80% de altura de pantalla por caso es lo que hace que se vea uno por vez.**
No hay scroll-snap ni JavaScript de paginado: es simplemente que cada bloque
ocupa 80vh y el que sigue queda justo fuera de cuadro.

### Capa 2 — El encabezado fijo (`z-index: 1`, detrás del contenido)

`[VERIFICADO]`

| Elemento | Valor |
|---|---|
| `Fixed Overlay` | `position: sticky; top: 0; height: 100vh` · `place-content: flex-end center` · `padding: 0 0 16px` |
| `Sticky Heading` | `position: absolute; inset: 0 0 auto 0; height: 100%` · `pointer-events: none; user-select: none` |
| `Heading Disappear` | `height: 10vh; position: absolute; bottom: 0; width: 1px` |

El titular gigante queda **pinneado al pie de la pantalla** —`flex-end`— durante
todo el recorrido de la sección, con los casos pasando por encima. El
`Heading Disappear` es un centinela de 10vh de alto y 1px de ancho al final de
la lista: cuando entra en cuadro, el titular se desvanece.

`pointer-events: none` es obligatorio o el titular bloquea los clics de las
tarjetas.

### Capa 3 — Los degradados de borde

`[VERIFICADO]` — dos franjas de `10vh`, blanco a transparente arriba y
transparente a blanco abajo. Hacen que los casos **entren y salgan
desvaneciéndose** en vez de cortarse contra el canto de la pantalla.

---

# LA ANIMACIÓN DE ENTRADA — medida en vivo

`[VERIFICADO]` — muestreada scrolleando y leyendo los `transform` reales.

Cada caso tiene **dos escalas anidadas que van en sentido contrario**:

| Elemento | Lejos del centro | En el centro |
|---|---|---|
| Contenedor de la tarjeta | `scale(0.7)` | `scale(1)` |

**Nota:** `0.7 × 1.3 = 0.91`, no compensa exacto. Es un efecto aproximado, no una escala neta constante. Para compensación exacta habría que usar la inversa `1/escala`.
| Imagen dentro de la tarjeta | `scale(1.3)` | `scale(1)` |
| Columna de texto | `scale(0.905)` + `translateX(-47px)` | `scale(1)` + `translateX(0)` |

**Perspectiva declarada: `1200px`.** Sólo tiene efecto si hay una transformación con componente de profundidad; sobre una escala 2D pura no cambia nada. **Perspectiva:** `1200px` — deducida del `matrix3d`, cuyo componente es
`-0.000833333`, es decir `-1/1200`.

Muestreo intermedio: con la tarjeta a media entrada se leyó `0.797` en el
contenedor y `1.2027` en la imagen. Los valores son **continuos y atados al
progreso de scroll**, no una animación disparada.

**Qué produce esto:** mientras el marco crece de 0.7 a 1, la imagen se
desamplía de 1.3 a 1. El resultado es que la foto parece quedarse quieta
mientras el encuadre se abre. Es un zoom-out de encuadre, y es lo que hace que
la página se sienta cara. Es barato: son dos `scale` atados al mismo valor.

**Radio de la tarjeta de medio:** `16px`.

---

# ESTRUCTURA DE CADA CASO

Tres columnas, confirmado en vivo:

| Columna | Contenido |
|---|---|
| **Izquierda** | Logo del cliente · nombre en grande · categoría en gris debajo |
| **Centro** | Imagen o video, tarjeta con radio de 16px |
| **Derecha** | Párrafo · botón |

`Text + Logo`: `flex-flow: column; align-items: center; gap: 8px`.

**Longitudes reales de la referencia** `[VERIFICADO]`:

| Slot | Medida |
|---|---|
| Nombre del cliente | 4–23 caracteres |
| Categoría | 13–20 caracteres |
| Párrafo | 122–155 caracteres |
| Botón | 11 (`More Detail`) |

Tus nombres de cliente —`Patagonia Vessels` 17, `Comercial Pas` 13— entran
cómodos acá, a diferencia de lo que pasaba con los anillos de la home.

---

# LO QUE PEDISTE, Y LO QUE HAY QUE RESOLVER

## ✅ Encaja directo

- **Tres columnas con logo, medio y párrafo:** es exactamente la estructura.
- **Un cliente por vez al scrollear:** sale solo del `80vh` por bloque.
- **Imagen o video indistinto:** la referencia ya mezcla ambos.

## ⚠ 1. Sin subpáginas, el botón se queda sin destino

La referencia usa `More Detail` para ir a la ficha del caso. Vos no querés
subpáginas, así que ese botón no tiene a dónde ir.

**El problema:** sin botón, la columna derecha queda con un párrafo suelto y el
bloque pierde peso visual. La composición de tres columnas está calibrada para
que la derecha tenga dos elementos.

**Tres salidas** `[NUESTRO]`:

- **a)** El botón abre el video del caso en grande, sobre la página.
- **b)** El botón lleva a la tienda o al Instagram del cliente.
- **c)** Se saca el botón y en su lugar van los tópicos del caso —Meta Ads,
  Tracking, Contenido— como chips debajo del párrafo. La referencia ya tiene un
  bloque llamado `Button & Topics`, así que el patrón existe.

**Recomiendo la c.** No inventa destinos que no existen, llena el espacio, y le
dice al visitante qué se hizo en cada caso, que es información que hoy no está
en ninguna parte del sitio.

## ⚠ 2. El "Ver más" a los 8 casos

La referencia tiene **7 casos y ningún paginado.** `[VERIFICADO]`

Tu propuesta —8 visibles y un botón para el resto— es una adición.
Consideración de altura: 8 casos × 80vh + 200px de padding ≈ **siete pantallas**
antes del botón. Es largo, pero es el formato: la página es un recorrido.

**Cómo se implementa** `[NUESTRO]`: los 4 restantes se montan al hacer clic, con
la misma animación de entrada. El centinela `Heading Disappear` tiene que
recalcularse cuando cambia el alto de la lista, o el titular se desvanece en el
lugar equivocado.

## ⚠ 3. Doce clientes, trece videos

Los mismos 12 logos que van en el bloque B7 de la home. Conviene que el orden de
los primeros 8 acá coincida con los primeros del marquee de la home, para que se
lea como un mismo conjunto y no como dos listas distintas.

---

# COMPORTAMIENTO RESPONSIVE

## El hallazgo: esta página casi no cambia

`[VERIFICADO]` — **no hay una sola regla responsive en el CSS** para el bloque de casos, el
overlay fijo, el encabezado sticky ni los degradados: están en unidades de
viewport.

**Pero eso NO significa que se adapte solo.** En el marcado existe una variante
`Tablet & Mobile` que vive en el componente, no en el CSS, y no se pudo
observar. En móvil hay que **especificar composición propia y altura natural**:
tres columnas apiladas no entran en el 80% de la pantalla de un teléfono.

Lo único que cambia por CSS:

| Elemento | Mobile <810 | Tablet 810–1199 |
|---|---|---|
| Padding del hero | `0 8px` | `0 8px` |
| Separación entre secciones | `gap: 100px` | `gap: 100px` |
| Footer | `flex-direction: column`, contenedor a `padding: 100px 16px 16px`, navegación a columna con `gap: 8px`, redes a `flex-wrap: wrap; order: 1; width: 100%`, logo a `order: 0`, rectángulos a `width: 100%; height: 100px` | solo cambian los gaps |

**Anchos de diseño:** `390px` mobile · `810px` tablet.

## ⚠ Lo que NO se pudo verificar

**Cómo se reordenan las tres columnas en teléfono.** En el marcado existe un
bloque llamado `Tablet & Mobile`, o sea que **sí hay una variante distinta**,
pero vive en el componente de Framer y no en el CSS de la página. Y no se pudo
observar en vivo: el navegador acepta redimensionar la ventana pero la página
sigue reportando ancho de escritorio, así que la variante nunca se activa.

**Reconstrucción propuesta** `[NUESTRO]`, a validar en mockup: en mobile las
tres columnas se apilan en el orden medio → identificación → texto. El medio va
primero porque es lo que se mira; el nombre y la categoría debajo; el párrafo y
los tópicos al final. Y el bloque deja de ser `80vh` fijo para pasar a alto
natural, porque tres elementos apilados no entran en el 80% de la pantalla de un
teléfono.

---

# RESUMEN DE LA PÁGINA

**Nav · Hero · Lista de casos con encabezado fijo · Ver más · Cierre · Footer**

Componentes nuevos respecto de Home y Método:
1. **Degradados de borde de 10vh**, blanco a transparente.
2. **Encabezado pinneado al pie** con centinela de desvanecimiento.
3. **Doble escala anidada** 0.7→1 y 1.3→1 con perspectiva de 1200px.
4. **Paginado "Ver más"** — nuestro, no existe en la referencia.

El cierre y el footer son los mismos de la home.

## Decisiones abiertas

1. ¿Qué va en la columna derecha en lugar de `More Detail`? (recomendado: tópicos)
2. ¿Cuáles son los 8 casos que abren, y en qué orden?
3. ¿Cada caso lleva imagen o video? ¿Se mezclan?
4. Copy: nombre, categoría y párrafo de ~140 caracteres por caso. **No existe.**
5. ¿El orden coincide con el marquee de logos de la home?
