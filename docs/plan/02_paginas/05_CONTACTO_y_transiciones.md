# CONTACTO — ESTRUCTURA, ANIMACIONES Y RESPONSIVE
# + TRANSICIÓN ENTRE PÁGINAS

Referencia: página `contact` de LoftyLab. Código del mirror + página en vivo.
`[VERIFICADO]` medido · `[INFERIDO]` deducido · `[NUESTRO]` decisión propia.

---

# PARTE 1 — CONTACTO

## La página entera es UN bloque

`[VERIFICADO]` — no hay secciones apiladas. Es un hero a pantalla completa con
una sola tarjeta grande adentro, partida en dos mitades.

| Elemento | Valor |
|---|---|
| `Hero` | `height: 100vh` · `flex-flow: column` · `place-content: center` · `gap: 16px` |
| `Contact` (la tarjeta) | `border-radius: 24px` · `flex-flow: row` · `gap: 16px` · `width: 90%` · `max-width: 1200px` · `min-height: 550px` · `max-height: 800px` |
| Mitad izquierda `Heading` | `background: #030f2e` (tinta) · `border-radius: 24px` · `flex: 1 0 0` |
| Mitad derecha `Information` | `background: #fff` · `border-radius: 24px` · `flex: 1 0 0` |

**Las dos mitades son tarjetas independientes con su propio radio de 24px**,
separadas por 16px de gap, sobre el fondo de color de la página. No es una
tarjeta partida al medio: son dos, y por eso se ve el color entre ellas.

`min-height: 550px` y `max-height: 800px` son la clave para que la tarjeta no se
deforme en pantallas muy bajas o muy altas.

## Mitad izquierda — el panel oscuro

Fondo tinta, titular display grande, y objetos sueltos alrededor.
En la referencia lleva una línea manuscrita chica arriba del titular.

**Tu versión** `[NUESTRO]`: acá va la imagen representativa que pediste. Dos
opciones: foto de backstage con el titular encima, o campo de color con objetos
del sistema. La segunda es más coherente con el cierre de la home, que también
es campo de color con mancha blanca.

## Mitad derecha — información y formulario

`[VERIFICADO]`

| Elemento | Valor |
|---|---|
| `In4` (bloque de datos) | `flex-flow: column` · `gap: 32px` |
| `Line` | separador de `1px` en color de acento (`#ff742e` en la referencia) |
| Cada fila (`Office`, `Phone`, `Email`) | `flex-flow: row` · `gap: 16px` · icono en círculo de color + etiqueta + dato |
| `Social Media` | `flex-flow: row` · `gap: 8px`, íconos en círculo con contorno |
| `All Form` | `flex-flow: row` · `gap: 16px` — formulario + botón de envío al costado |
| `Name & Email` | `flex-flow: row` · `gap: 16px` — dos campos en una fila |
| `Form` | `flex-flow: column` · `gap: 16px` |
| Botón de envío | columna propia a la derecha, alto completo, con estado `Disabled` |

**Estructura de campos de la referencia:** Nombre y Email en fila, Mensaje
debajo a ancho completo, y el botón de envío como una **columna vertical
separada** a la derecha de todo el formulario, no debajo.

**Radios en uso:** `24px` tarjetas · `56px` campos · `59px` círculos de ícono.

## Tu versión del contenido `[NUESTRO]`

Pediste solo teléfono y email, sin dirección.

> **Teléfono** · [a completar]
> **Email** · [a completar]

**Consecuencia:** la referencia tiene tres filas y vos dos, así que el bloque
queda más corto y sobra aire. Dos salidas: subir el `gap` de 32 a 48 para que
las dos filas ocupen el espacio, o sumar una tercera fila con algo que sí
tengas — horario de atención, o "respondemos en menos de 24 h".

**Campos del formulario, propuesta:** Nombre y Email en fila, Empresa o tienda,
y un mensaje abierto. La pregunta abierta de Meraki —*"¿Qué le estás pidiendo
hoy a tu agencia?"*— es mejor placeholder que "contanos tu proyecto", porque te
da el diagnóstico antes de la llamada.

**⚠ BLOQUEANTE:** el formulario necesita destino. Si el envío va a Calendly con
los datos precargados, no hace falta backend. Si querés capturar al que llena y
no agenda, sí. Es la misma decisión pendiente de la home.

## Responsive de Contacto

`[VERIFICADO]` — es la página que más cambia de las cuatro.

**Mobile <810:**

| Elemento | Cambio |
|---|---|
| `Hero` | `height: min-content` — **deja de ser 100vh** |
| Contenedor | `padding: 150px 16px 50px` |
| `Contact` | `flex-direction: column` · `gap: 8px` · `max-height: unset` · `min-height: unset` — las dos mitades se apilan y se liberan los topes de alto |
| `Heading` e `Information` | `width: 100%` · `padding: 16px` |
| `All Form` y `Name & Email` | `flex-direction: column` · `gap: 8px` — **los campos dejan de ir en fila** |
| Botón de envío | `align-self: unset` · `width: 100%` · `height: 56px` — pasa de columna vertical a botón ancho debajo |
| Tipografía de campos | `--framer-input-font-size: 14px` |

**Tablet 810–1199:** la tarjeta **sigue en dos columnas**. Solo bajan los gaps a
`8px` y el padding interno a `16px`. La caída a una columna ocurre recién en
mobile.

**Anchos de diseño:** `390px` mobile · `810px` tablet.

---

# PARTE 2 — LA TRANSICIÓN ENTRE PÁGINAS

## ⚠ CORRECCIÓN: SÍ HAY TRANSICIÓN

En el análisis anterior escribí que no existía. **Estaba mal.**

El error fue de método: las capturas del navegador tardan más que la animación
completa, así que entre dos capturas la transición ya había terminado. Se ve un
cuadro con la página vieja y el siguiente con la nueva, y parece instantánea.

Ahora se midió sobre **una grabación de pantalla a 60 fps**, extrayendo los
fotogramas y calculando, en cada uno, la extensión vertical del contenido y la
posición del texto. Eso sí lo muestra.

## Qué es: una cortina blanca que barre de abajo hacia arriba

`[VERIFICADO]` sobre 84 fotogramas.

### Fase 1 — Salida (~650 ms)

| ms | Borde inferior del contenido |
|---|---|
| 300 | 198 (pantalla completa) |
| 433 | 172 |
| 566 | 127 |
| 700 | 78 |
| 833 | 36 |
| 966 | 3 |
| 983 | 0 — pantalla en blanco |

El **borde superior nunca se mueve**: queda clavado en 0. El ancho tampoco: full
bleed de principio a fin. Lo único que se mueve es el borde inferior, que sube
hasta el tope.

**Y el contenido no se desplaza con él.** El centroide del texto blanco se
mantiene alrededor de `y ≈ 99` durante toda la salida, con apenas ~17px de
corrimiento hacia abajo al principio.

Eso descarta que sea un `translateY` de la página. Si la página se desplazara
hacia arriba, el texto subiría con ella. **Es un recorte: algo blanco tapa la
página de abajo hacia arriba.**

### Fase 2 — Blanco (~80 ms)

Entre 983 ms y 1066 ms la pantalla queda completamente blanca. Es corto, pero
existe y es lo que separa las dos mitades.

### Fase 3 — Entrada (~600 ms)

| ms | Borde superior del contenido |
|---|---|
| 1066 | 192 (una franja fina abajo) |
| 1133 | 167 |
| 1200 | 142 |
| 1266 | 118 |
| 1333 | 95 |
| 1366 | 84 |

Espejo exacto de la salida: ahora el **borde inferior queda clavado abajo** y el
**superior sube**, revelando la página nueva desde el pie de la pantalla hacia
arriba.

### El movimiento completo

Es **un solo barrido continuo de abajo hacia arriba**. Una cortina blanca sube
tapando la página que se va; cuando termina de taparla sigue subiendo y sale por
arriba, destapando la que llega. No son dos animaciones: es una.

**Duración total: ~1,3 segundos.**

## Procedencia de estos datos — qué se verificó y qué no

Importa dejarlo claro, porque los tres orígenes dan cosas distintas:

**✅ El comportamiento visual — VERIFICADO sobre la grabación a 60 fps.**
Duraciones, dirección del barrido, y que el contenido **no se desplaza** sino que
se recorta. Es lo que hace falta para reconstruirla, y es sólido: sale de medir
la geometría del contenido en 84 fotogramas.

**✅ Descartado en el código — el mirror no la tiene.**
El scrape de HTTrack no capturó los bundles `.js`, y en el HTML de las cuatro
páginas no hay marcado de transición ni reglas `@view-transition`. Se confirmó
también en vivo: la página **no** usa la View Transitions API del navegador.

**❌ NO se pudo verificar la implementación exacta de Framer.**
Se intentó cuatro veces con métodos distintos: `requestAnimationFrame` (se
detiene entre llamadas), `setInterval` (el navegador lo estrangula a 1 segundo),
un bucle con `await` escribiendo a `sessionStorage`, y captura de pantallas
rápidas (más lentas que la animación).

Todos fallan por lo mismo: **la URL cambia a los ~40 ms del clic y el contexto
de JavaScript se reemplaza**, así que cualquier grabador muere antes de que la
transición termine. El único elemento fijo a pantalla completa que hay en reposo
—`z-index: 10`, `pointer-events: none`— resultó ser el contenedor del sello de
Framer, no una cortina.

**Por qué no importa para el proyecto:** no vamos a copiar su implementación de
todos modos. La especificación de abajo sale del comportamiento medido, que es
lo que hay que reproducir.

## Cómo se construye `[NUESTRO]`

Un elemento fijo a pantalla completa, fondo del color de fondo del sitio,
`pointer-events: none`, `z-index` por encima de todo, que se anima en `scaleY`
con origen abajo:

1. Al hacer clic: de `scaleY(0)` a `scaleY(1)` con origen en el borde inferior.
2. Se cambia la ruta cuando llega a 1.
3. De `scaleY(1)` a `scaleY(0)` con origen en el borde **superior**.

`transform` y `opacity` son la base correcta porque no recalculan layout, pero
**la aceleración por GPU no está garantizada**: hay que medir composición y
pintado en los dispositivos objetivo.

**⚠ La cortina necesita un contrato de router, no solo el dibujo:**
`pointer-events: none` por sí solo deja pasar los clics a la página tapada.
Hace falta definir: bloqueo de navegación repetida durante el cambio, manejo de
error de carga, liberación de la cortina si algo falla, restauración de scroll,
envío del foco al contenido nuevo, y **no alterar atrás/adelante ni los enlaces
externos o a pestaña nueva**. Si el stack no permite garantizar eso, el fallback
es navegación normal.

## Tres cosas a decidir `[NUESTRO]`

**1. Es lenta.** 1,3 segundos entre clic y página utilizable es mucho, sobre
todo yendo y viniendo entre Casos y Método. **Recomiendo bajarla a 800–900 ms
en total**: ~400 de subida, sin pausa en blanco, ~400 de bajada. Se mantiene el
efecto y deja de sentirse pesado.

**2. La pausa en blanco de 80 ms se puede sacar.** Existe porque hay que montar
la página nueva. Si se precarga la ruta al pasar el mouse por el link, se
elimina y el barrido queda continuo.

**3. El color de la cortina.** En la referencia es blanca porque el sitio es
blanco. En el nuestro puede ser blanca o del color de acento de la página a la
que se va — con el nav ya asignando un color por página, una cortina del color
de destino hace que el sistema se lea solo. Es un detalle que la referencia no
tiene y que sale gratis.

## Y además: la entrada del titular, letra por letra

`[VERIFICADO]` — independiente de lo anterior. En la home, al terminar la
transición, las letras del titular aparecen **escalonadas, una por una**. Se
capturó en tres cuadros: primero `W E` y `C O` sueltas, después medio titular,
después completo. Los objetos entran al final.

Se repite en cada visita, no solo en la primera carga. En el `about`, en cambio,
el titular aparece ya formado.

**Accesibilidad:** con `prefers-reduced-motion` se apagan las dos cosas — la
cortina pasa a un fundido corto y el titular aparece completo de una.

---

# DECISIONES ABIERTAS DE CONTACTO

1. Panel izquierdo: ¿foto de backstage o campo de color con objetos?
2. Con solo teléfono y email quedan dos filas donde la referencia tiene tres.
   ¿Se agranda el espaciado o se suma una tercera fila?
3. ¿Qué campos exactos lleva el formulario?
4. **Destino del formulario.** Sigue bloqueando la publicación.
5. Teléfono y email reales. No se inventan.
