# CONTACTO — ESTRUCTURA, ANIMACIONES Y RESPONSIVE
# + TRANSICIÓN ENTRE PÁGINAS

Referencia: página `contact` de LoftyLab. Código del mirror + página en vivo.
`[VERIFICADO]` medido · `[INFERIDO]` deducido · `[NUESTRO]` decisión propia.

---

# PARTE 1 — CONTACTO

> **⚠ ESTA PARTE ESTÁ REESCRITA (F4, fase 1).** Lo que había era la lectura de
> la página `contact` de LoftyLab: una tarjeta partida en dos con datos de
> oficina, redes y un formulario de tres campos con el botón al costado. Se
> derogó entera. Lo que se construyó no es esa página, y conviene que se sepa
> por qué antes de que alguien vuelva a la referencia a buscar una medida.
>
> **La Parte 2 —la transición entre páginas— sigue vigente y no se tocó.**

## Qué se derogó, y por qué

| Lo que decía | Qué pasó |
|---|---|
| «La página entera es UN bloque»: un hero de `100vh` con una sola tarjeta adentro | **Derogado.** Son tres bloques: CON-1, CON-3 y el footer. La página dejó de ser un formulario de contacto y pasó a ser un flujo de calificación, que no entra en una pantalla. |
| Las dos mitades como tarjetas independientes con `gap` de 16px sobre el color de la página | **Derogado.** El panel es una tarjeta y el flujo va sobre el fondo de la página, sin caja propia: meter cuatro pasos y después un calendario dentro de una tarjeta con `max-height: 800px` obliga a hacer scroll adentro de un scroll. |
| Bloque de datos con oficina, teléfono, email e íconos en círculo | **Derogado.** No hay dirección, y el mail y el teléfono se movieron a CON-3, después del flujo. Quien llega a esta página viene a reservar una llamada; escribir es la salida alternativa, no lo primero. |
| Formulario de Nombre + Email en fila, mensaje abierto y botón en columna vertical al costado | **Derogado.** Son cinco campos en columna y el botón debajo. La pregunta abierta que proponía el documento —«¿Qué le estás pidiendo hoy a tu agencia?»— la reemplazan los pasos 1 y 2, que preguntan lo mismo de forma cerrada y por eso se puede agrupar en la base. |
| «⚠ BLOQUEANTE: el formulario necesita destino» | **Resuelto en otro lado.** El destino de los CTA quedó en `/contacto`, que es esta página. Lo que esta página hace con lo que junta es la fase 2. |
| El responsive medido de la referencia | **Derogado en su detalle**, no en su criterio: la caída a una columna sigue ocurriendo en 810px, que es el corte del sitio. |

Lo único que sobrevive del documento viejo es el radio de 24px de las tarjetas,
que en el sistema es `--r-card`, y el corte de 810px.

---

## La estructura

**Nav · CON-1 · CON-3 · Footer**

Acento de la página: `--acento-4` con `--texto-sobre-4`, el mismo par que el nav
declara para Contacto en `lib/paginas.ts`.

**⚠ NO LLEVA B8Cierre, Y NO ES UN OLVIDO.** B8 es el llamado a reservar la
llamada, y ésta es la página de reservar la llamada: cerrarla con un botón que
lleva acá mismo es un lazo. Las otras tres páginas sí lo llevan, porque desde
ellas el CTA va a algún lado.

---

## CON-1 · Dos columnas

Izquierda el panel con el titular, derecha el flujo. En móvil se apila —panel
arriba, flujo abajo— y el panel pasa a **apaisado**: uno cuadrado se come media
pantalla de un teléfono antes de que se vea la primera pregunta. Medido a 390px:
244px de alto, 34% del viewport.

### El panel se construye en CSS, no es una imagen

Existe un PNG con este titular horneado y **no se usa**. Un titular dentro de una
imagen no se selecciona, no escala con el zoom del navegador, no lo lee un
buscador y para un lector de pantalla depende de que alguien haya escrito un buen
`alt`. Sería el único titular del sitio que no es texto, justo en la página que
convierte. Y el PNG viene cuadrado, con marco y esquinas horneadas, así que
ataría el bloque a que el fondo sea exactamente ese azul para siempre.

Todo lo que lleva ya estaba en el sistema:

| Pieza | De dónde sale |
|---|---|
| El campo oscuro | `--tinta`, **el mismo del footer**. ⚠ La paleta no tiene «navy»: tiene la tinta con la que se escribe y con la que se pinta el único bloque oscuro del sitio. Un color más sería una sexta decisión de color sin nadie que la sostenga. |
| «HABLEMOS DE» | Anton en `--fondo` sobre el campo. 18.1:1. |
| «TU NEGOCIO.» dentro de una mancha crema | **El mismo recurso que B8 en el cierre**, no uno nuevo. Lo único que cambia es que acá va rotada 2.5°. |
| El garabato amarillo | ⚠ **Pendiente.** El archivo no llegó al repo. El lugar está previsto y anotado en `CON1Flujo.tsx`; cuando aparezca se convierte a WebP con alfa y entra como `<img aria-hidden>`. Es un adorno, no información: el bloque funciona sin él y por eso no se esperó. |

**El panel va `sticky` en escritorio.** La columna derecha es bastante más alta
—cuatro pasos, y en la fase 2 un calendario—, así que sin esto el titular se va
de cuadro en la primera pregunta. El offset es `--alto-nav`, que el nav publica
midiéndose solo.

### ⚠ En el paso 4 la columna izquierda desaparece

Es un contrato, no una decoración. El calendario de la fase 2 necesita la grilla
del mes **más** una columna de horarios al lado, y eso en media pantalla de
1440px no entra sin apilarse. El flujo toma el ancho completo. **Ya está
implementado**, con el marcador adentro, para que cuando llegue el calendario el
layout no sea una sorpresa.

---

## El flujo — cuatro pasos

| Paso | Qué es |
|---|---|
| 1 | ¿En qué rubro estás? · cinco opciones |
| 2 | ¿Qué querés lograr? · cuatro opciones |
| 3 | ¿Cómo te contactamos? · cinco campos obligatorios |
| 4 | Elegí día y horario · **marcador: el calendario va en la fase 2** |

El copy de los tres primeros está confirmado y vive en `src/data/contacto.ts`,
que es la fuente única del bloque igual que `casos.ts` lo es de Casos.

### El estado está escrito para serializarse, aunque todavía no se envíe

La fase 1 no guarda nada. Pero lo que la fase 2 va a guardar **no es el índice
del radio marcado**: es el TEXTO de la opción elegida, que es lo que alguien va a
leer en la base sin tener que traducir un número. Por eso cada opción tiene `id`
y texto por separado, y `respuestasSerializables()` devuelve el objeto listo:

```json
{
  "respuestas": [
    { "pregunta": "¿En qué rubro estás?", "id": "retail",
      "respuesta": "Retail — local físico con presencia digital" },
    { "pregunta": "¿Qué querés lograr?", "id": "escalar",
      "respuesta": "Escalar las ventas que ya tengo" }
  ],
  "contacto": { "nombre": "…", "telefono": "…", "email": "…",
                "empresa": "…", "web": "…" }
}
```

El contrato se escribió ahora, mientras las decisiones estaban frescas, y no
cuando haya que conectarlo con apuro.

### Las reglas de los pasos 1 y 2

- **Radios nativos dentro de un `label` que envuelve la tarjeta entera.** Con el
  label al costado, lo tocable sería el círculo de 16px del control. La tarjeta
  mide 87px de alto.
- **⚠ NO HAY AUTOAVANCE AL ELEGIR.** Un grupo de radios se recorre con las
  flechas: al elegir la primera opción para escuchar las demás, autoavanzar
  dejaría a quien navega con teclado sin poder llegar nunca a la tercera. Y con
  lector de pantalla la página se movería sola bajo el foco. El avance es
  siempre explícito, con el botón.
- **Al cambiar de paso el foco va al titular del paso nuevo**, con `tabIndex={-1}`
  y anillo propio. ⚠ Y **no** en el primer render: mover el foco al cargar le
  roba el control a quien recién llega y se saltea el nav entero.
- **No se puede avanzar sin elegir**, con el aviso «Elegí una opción para
  seguir.» ⚠ El motivo no es de formulario sino **de dato**: estos dos pasos son
  la calificación, y son exactamente lo que la fase 2 va a guardar. Dejar avanzar
  sin elegir hace que el paso 4 llegue con dos respuestas nulas, y esas dos nulas
  se escriben en la base junto con el resto — un contacto sin rubro ni objetivo
  es un contacto que hay que volver a preguntar entero. Acá alcanza un mensaje
  único, a diferencia del paso 3: la pregunta es una y la respuesta también.
- **Los cuatro pasos existen en el DOM desde el primer render**, escondidos con
  `hidden`. No se montan y desmontan: eso perdería lo escrito al volver atrás.
  Verificado que la elección sobrevive al ir y volver.

  **⚠ ACOPLAMIENTO SILENCIOSO: ese `hidden` funciona por el preflight de
  Tailwind, no por nosotros.** `.con1-paso { display: grid }` le gana al
  `display: none` que el atributo `hidden` trae en la hoja del NAVEGADOR, que
  pierde contra cualquier regla de autor. Lo que lo salva es
  `[hidden]:where(:not([hidden="until-found"])) { display: none !important }`,
  que viene en el preflight de Tailwind v4.

  Es el peor tipo de dependencia: **si algún día se saca el preflight, los cuatro
  pasos aparecen apilados y no falla nada ruidosamente** — no hay error de build,
  no hay excepción, no hay test rojo. Sólo una página con las cuatro preguntas
  juntas que alguien tiene que ver. Está anotado también en `contacto.css`, sobre
  la propia regla; si se saca el preflight, hay que escribir esa línea a mano.
- **Progreso:** barra decorativa con `aria-hidden` más el texto «Paso N de 4». El
  estado no se dice dos veces.

### La validación del paso 3 — por campo

- Cada campo con **su propio mensaje**, atado por `aria-describedby`. Un cartel
  único arriba obliga a adivinar cuál de los cinco falla.
- `aria-invalid` va **junto con** el mensaje, nunca en su lugar: solo, anuncia
  «inválido» y nada más.
- **Corre al intentar avanzar, no al tipear.** Marcar un email como inválido en
  la primera letra es hostil. El error se limpia al tocar el campo.
- Al enviar, **el foco salta al primer campo con problema**.
- **Teléfono:** se cuentan sólo los dígitos, mínimo 8. La gente lo escribe con
  espacios, guiones, paréntesis y un `+` adelante, y los cinco son válidos.
- **Web o Instagram:** no se valida como URL. `@tumarca` es una respuesta
  correcta. Por eso el campo es `type="text"` y no `type="url"`.
- **Email:** regex laxo. Uno estricto rechaza direcciones válidas y no atrapa las
  que importan.
- **Honeypot escondido también para el lector de pantalla:** `aria-hidden`, fuera
  de tabulación y fuera de pantalla. ⚠ **No** lleva `.solo-lectores`: esa clase
  esconde a la vista pero sí se anuncia, así que una persona ciega escucharía un
  campo pidiéndole su sitio web y lo completaría — y completarlo es exactamente
  lo que marca el envío como robot.
- **Los campos van a 16px** o iOS hace zoom solo al enfocarlos.

Los mensajes dicen **qué hacer, no qué está mal**: «Escribí tu nombre completo» y
no «campo requerido». El segundo describe el estado del formulario; el primero le
dice a la persona cuál es su próximo movimiento.

---

## CON-3 · Contacto directo

Panel `--acento-4` con borde de onda, después del flujo. Titular «¿Preferís
escribir antes?» y dos datos:

- **Email** · `marketing@velocentum.com`, el mismo de B9 y **desde el mismo
  lugar**: la constante `MAIL` era local de `B9Footer.tsx` y se mudó a
  `data/contacto.ts`, que ahora leen los dos. Dos constantes con la misma
  dirección es una de las dos desactualizada esperando su turno.
- **Teléfono** · ⚠ **marcador visible**, no una fila omitida en silencio. El
  sitio actual muestra un `+54 9 11 3581-0100` y nadie confirmó todavía si se usa
  también acá. Omitirla dejaría la página pareciendo terminada con un dato menos.

---

## Lo que queda para la fase 2

1. El calendario propio del paso 4, con la columna izquierda ya escondida.
2. La integración con Calendly.
3. La persistencia en Supabase, contra el contrato de `respuestasSerializables()`.
4. El garabato amarillo del panel.
5. Confirmar el teléfono de CON-3.

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
