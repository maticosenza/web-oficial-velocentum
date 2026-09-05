# REGISTRO DE ANIMACIONES — VELOCENTUM.COM V2

Documento de trabajo. Sección por sección: qué movimiento tiene la referencia,
con qué mecánica se construye, y el veredicto tuyo.

**Cómo se completa:** en cada ficha, la línea `VEREDICTO` se llena con una de
estas tres: `SIRVE` · `NO SIRVE` · `ADAPTAR` (+ qué cambia).

Mecánicas base ya identificadas:
- **M1** Par sticky — bloque a `100vh` fijado, el siguiente sube encima.
- **M2** Tarjetas apiladas — cada ítem `sticky` a `top:56px`, se deslizan una sobre otra.
- **M3** Ticker — loop horizontal con máscara degradada en los bordes.
- **M4** Reveal — entrada por opacidad + Y al entrar en viewport.

---

# HOME

## H0 · NAV

| | |
|---|---|
| **Movimiento** | Card flotante centrada, esquinas redondeadas, fondo con blur. Cada link es un botón con borde de color propio; el activo va con fondo lleno. Hover con cambio de fondo. |
| **Mecánica** | CSS + `backdrop-filter`. Sin JS. |
| **Nota** | En la referencia los cuatro bordes de color son parte de la estética "sticker". Con tres links y un CTA se puede hacer más sobrio: un solo color de acento y el activo con fondo lleno. |

**VEREDICTO:**

---

## H1 · HERO

| | |
|---|---|
| **Movimiento 1** | Fondo de cielo en degradado, con nubes flotando en loop lento y parallax leve. |
| **Movimiento 2** | Las nubes y los objetos reaccionan al mouse. |
| **Movimiento 3** | Titular en tres líneas, la tercera en color de acento. Objetos intercalados a izquierda y derecha de la línea 2. |
| **Movimiento 4** | CTA con `glow` en hover. |
| **Movimiento 5** | Todo el hero queda fijado a `100vh` mientras H2 sube por encima. |
| **Mecánica** | M1 para el pin. Loop CSS para las nubes. JS mínimo para el seguimiento de mouse. |
| **Nota** | Ya dicho: el motivo atmosférico se conserva; la interacción de mouse se cambia por otra. Los objetos van en tratamiento realista, no caricaturesco. |

**VEREDICTO — fondo/nubes:**
**VEREDICTO — interacción de mouse:**
**VEREDICTO — titular a 3 líneas con tercera en color:**
**VEREDICTO — objetos intercalados en el renglón:**
**VEREDICTO — pin a 100vh:**

---

## H2 · QUIÉNES SOMOS

| | |
|---|---|
| **Movimiento** | El bloque sube por encima del hero fijado, con fondo opaco. Reveal del texto y de la imagen al entrar. Contorno de texto como recurso gráfico. |
| **Mecánica** | Cierre de M1 + M4. |

**VEREDICTO:**

---

## H3 · TRABAJOS

| | |
|---|---|
| **Movimiento 1** | Cada pieza tiene estado hover propio: se revela el texto y el botón encima del video. |
| **Movimiento 2** | Los videos arrancan en loop, sin sonido. |
| **Movimiento 3** | Reveal escalonado de las piezas al entrar en viewport. |
| **Mecánica** | M4 + hover. |

**VEREDICTO:**

---

## H4 · QUÉ HACEMOS  ← el bloque más importante

| | |
|---|---|
| **Movimiento** | Cada tarjeta de servicio se fija arriba y la siguiente **se desliza por encima**, tapándola. Se acumulan como un mazo. |
| **Mecánica** | **M2**. `position: sticky; top: 56px`, fondo opaco obligatorio, `z-index` creciente. En mobile pasa a apilado normal sin superposición. |
| **Nota** | Es el patrón más valioso de toda la referencia y donde van tus cuatro motores. Si esto no funciona, la página pierde la mitad del efecto. |

**VEREDICTO:**

---

## H5 · CAPACIDADES

| | |
|---|---|
| **Movimiento** | Dos filas de chips en loop horizontal, direcciones opuestas. Bordes desvanecidos por máscara. |
| **Mecánica** | **M3**. Pausa en hover. Detenido con `prefers-reduced-motion`. |

**VEREDICTO:**

---

## H6 · PROCESO

| | |
|---|---|
| **Movimiento** | Tarjetas con número grande e ícono en contenedor cuadrado. Reveal escalonado. Hover con leve elevación y `perspective`. |
| **Mecánica** | M4 + hover. |

**VEREDICTO:**

---

## H7 · CON QUIÉNES TRABAJAMOS

| | |
|---|---|
| **Movimiento 1** | Muro de logos en ticker horizontal. |
| **Movimiento 2** | El bloque entero queda fijado (`top: 200px`) con padding inferior grande, mientras H8 sube por encima. |
| **Mecánica** | M3 + variante de M2. |

**VEREDICTO:**

---

## H8 · POR QUÉ NOSOTROS

| | |
|---|---|
| **Movimiento** | Sube por encima de H7. Lista de razones con reveal escalonado, sobre la capa de atmósfera. |
| **Mecánica** | Cierre de la variante M2 + M4. |

**VEREDICTO:**

---

## H9 · CIFRAS

| | |
|---|---|
| **Movimiento** | Números grandes. Candidato a conteo ascendente al entrar en viewport. |
| **Mecánica** | M4 + contador. |
| **Nota** | El conteo puede leerse como urgencia artificial. Alternativa sobria: reveal simple sin contar. |

**VEREDICTO:**

---

## H10 · TESTIMONIOS

| | |
|---|---|
| **Movimiento** | Lista con lados alternados, overlay, reveal al entrar. |
| **Nota** | Recomendado omitir en V1 por falta de retratos y permisos. |

**VEREDICTO:**

---

## H11 · CIERRE + FOOTER

| | |
|---|---|
| **Movimiento** | Reveal del bloque. CTA con glow. Footer con backdrop. |

**VEREDICTO:**

---

# CASOS

| | |
|---|---|
| **Movimiento 1** | Encabezado fijado que **se desvanece** al scrollear. |
| **Movimiento 2** | **Overlay fijo con blur arriba y abajo**: dos franjas degradadas en el borde superior e inferior del área de scroll, de modo que las piezas entran y salen difuminadas en vez de cortarse contra el canto. |
| **Movimiento 3** | Cada caso con hover propio: imagen o video + texto + logo + botón + tópicos. |
| **Nota** | El blur de borde es el detalle que hace que esta página se vea cara. Es lo más distintivo de toda la referencia después de M2. |

**VEREDICTO — encabezado que se desvanece:**
**VEREDICTO — overlay con blur superior e inferior:**
**VEREDICTO — hover por caso:**

---

# MÉTODO

| | |
|---|---|
| **Movimiento 1** | Hero con imagen a sangre + overlay + texto encima. |
| **Movimiento 2** | Tarjetas de lista con número + ícono, reveal escalonado. |
| **Movimiento 3** | Bloque de historia con imagen y un elemento gráfico suelto de acento. |
| **Movimiento 4** | Equipo: ítems de miembro con chips de color. |
| **Nota** | El bloque de equipo está bloqueado por falta de fotos de personas. |

**VEREDICTO:**

---

# CONTACTO

| | |
|---|---|
| **Movimiento 1** | Dos columnas: información a la izquierda separada por línea, formulario a la derecha. |
| **Movimiento 2** | Botón de envío con estado `disabled` hasta que el formulario sea válido. |
| **Movimiento 3** | Estados de foco en los campos. |

**VEREDICTO:**

---

## PENDIENTES DE ESTE REGISTRO

- Falta abrir el detalle de hover de las piezas de Trabajos y de los casos.
- Falta definir la interacción de mouse propia del Hero.
- Falta decidir si el conteo de cifras entra o no.
