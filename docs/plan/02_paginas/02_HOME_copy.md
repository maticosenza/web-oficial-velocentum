# COPY HOME — VELOCENTUM.COM

Alineado a la estructura final: diez bloques B0–B9, ocho de contenido más nav y footer.
Tono: sobrio, rioplatense, sin urgencia artificial, sin emojis.
Segmento: e-commerce que ya vende.

`[APROBADO]` copy que ya existía y se conserva · `[NUEVO]` a aprobar ·
`[ABIERTO]` falta una decisión tuya.

---

## B0 · NAV `[CONSTRUIDO]`

> Inicio · Método · Casos · Contacto

**Sin CTA en el nav.** En la referencia son solo los links; el botón de agendar
vive en el hero y en el cierre. Sumarlo acá le saca peso a los otros dos.

**`[DECIDIDO]` Va "Inicio".** El resto del sitio está en castellano.

### Estado en obra

Card blanca flotante centrada, esquinas de píldora, sombra suave y fondo sólido
—sin `backdrop-filter`—. Logotipo negro con canal alfa a la izquierda, a 172px
de ancho óptico, dentro del rango 160–190 de `identidad.md`. Los cuatro links
como botones propios, cada uno con el borde de su acento, y el activo con fondo
lleno.

**El activo no lleva texto oscuro.** El plan lo pedía, y no se cumple: medido,
tinta sobre el violeta de Contacto da 3.72:1 y sobre el azul de Inicio 4.08:1,
los dos por debajo del mínimo de 4.5. Va el `--texto-sobre-N` de cada acento y
con eso los cuatro pasan. Misma decisión que en las píldoras de B5.

**El activo se lee de `aria-current`,** no de una clase, así el color y la
semántica no se pueden desincronizar. Y no se distingue sólo por color: cambia
el relleno, que es forma.

**El nav se mide solo** y publica `--alto-nav`. Verificado: 108px en desktop, y
el apilado de B4 se fija a 116px, que es ese alto más 8. Nadie adivina un 56.

**La lista de páginas se mudó a `src/lib/paginas.ts`.** Antes había dos copias,
una en el andamio y otra en B9. El plan dice que el nav es "la leyenda del
sistema de color del sitio": con dos listas, esa leyenda podía mentir.

### La card se ajusta al contenido

No se estira al ancho de contenido. Medido: **735px contra los 1200 de la
columna de texto.** Estirada se leía como una barra, no como una card.

### El hero reserva el alto del nav

El nav no pisaba el titular por culpa del nav: el hero no le dejaba lugar.
`.b1__contenido` reserva arriba `--alto-nav` más holgura, así que si el nav
crece —móvil, zoom, dos renglones— el hero se corre solo y no hay número que
mantener.

**Dos cosas que hicieron falta además, y no eran obvias:**

1. **`align-content: safe center`.** Centrar centra la caja entera, padding
   incluido. En una ventana de 654px de alto la caja mide más que el viewport,
   el centrado le corría el tope a -96px y la reserva no garantizaba nada: el
   eyebrow volvía a quedar 32px por debajo de la card. `safe` alinea al inicio
   justo cuando desborda, que es el único caso donde el centrado hacía daño.

2. **Un bloque `@media (max-height: 760px)`** que achica el aire interno y el
   cuerpo del titular. El hero mide `100dvh` y recorta lo que sobra, y encima
   reserva abajo el alto de la onda de B2: con la reserva del nav sumada arriba,
   el bloque del CTA quedaba 79px por debajo de donde arranca la onda.

   *Va al final de la sección, después de las reglas base:* una media query no
   suma especificidad, y declarada antes, la regla base de `.titular-letras` la
   pisaba y el titular se quedaba en 101px. Verificado fallando.

Medido a 1371×654, que es el peor caso probado: **40px de holgura entre la card
y el eyebrow, y 23px entre el pendiente del CTA y la onda.** Entra todo.

### Se esconde al bajar y vuelve al subir

En desktop y en móvil. Con eso deja de chocar con el titular del hero. Tres
reglas que no son obvias, en `lib/navAlScrollear.ts`:

1. **Cerca del tope nunca se esconde.** Bajando desde arriba de todo, esconderlo
   antes de que llegue a taparse es un parpadeo sin motivo.
2. **El foco lo trae de vuelta, y lo retiene.** Si alguien tabula a un link con
   el nav escondido, el navegador enfoca un control invisible. Verificado:
   escondido a mano, `focusin` en un link lo muestra; y con el foco adentro,
   scrollear hacia abajo no lo esconde.
3. **Con movimiento reducido no se esconde nunca.** Un nav que aparece y
   desaparece es movimiento, y sin transición el salto es peor. El costo es que
   vuelve a pisar el titular del hero: una superposición estática, no un defecto.

### Bajo 810px sigue siendo una card, y sigue fija

**Se revirtió la decisión anterior de dejarla en el flujo.** El motivo de
aquella era que ocupaba una banda del 18% de forma permanente; ahora se esconde
al bajar, así que ese motivo ya no existe.

Sigue siendo una card flotante y no una barra: medido, **295px de ancho en una
pantalla de 500, con 102px de aire a cada lado**.

**Se apretó todo lo que da.** La banda pasó de 150px a **131px**. Una sola fila
no entra a ningún ancho de teléfono, y está medido: a 390px quedan 334px útiles,
los cuatro links ocupan 236px en el tamaño más chico que sigue siendo legible
—12px de cuerpo—, y al logotipo le sobrarían **90px contra los 135–155** que
pide `identidad.md`. Achicarlo hasta ahí sería romper la identidad para ganar
48px de alto. Así que siguen las dos filas, con el logotipo en 135px, que es el
mínimo del rango.

Los links entran los cuatro en una fila y **conservan sus 48px de alto mínimo**:
es el área táctil, y achicarla para ganar píxeles sería cambiar accesibilidad
por estética.

*El comportamiento móvil del nav de la referencia nunca se pudo medir: está en
Framer. Ver `03_referencia`. Así que nada de esto se copió.*

### Se borró el `NavProvisional`

El andamio de F0 conserva sólo `parDeColor` y `PaginaProvisional`, que sostienen
Método, Casos y Contacto hasta que se construyan. Las páginas de prueba y las
tres rutas provisionales ahora usan B0, el nav de verdad.

---

## B1 · HERO `[DECIDIDO]` — construido

Titular en tres líneas, la tercera en color de marca.

**Eyebrow** `[DECIDIDO]`
> EQUIPO DE CRECIMIENTO

**Titular** `[DECIDIDO]`
> ESTAMOS EN EL / NEGOCIO DE HACER / **CRECER NEGOCIOS**

*(13, 16 y 15 caracteres. Techo: 16 por línea. Entra sin tocar el cuerpo.)*

**Las cuatro opciones A–D quedaron sin usar.** No se eligió ninguna: el titular
decidido es una quinta. Se borran del documento para que nadie las reabra.

**Cae con ellas la regla del eyebrow condicional.** Decía que sólo hacía falta
eyebrow con B, C o D, y que debía ser `PARA TIENDAS QUE YA VENDEN`. No aplica:
hay eyebrow, y dice otra cosa.

**El hero no nombra al segmento e-commerce, y así queda** `[DECIDIDO]`

Registro amplio en la `.com`. La especificidad de e-commerce vive en
`velocentum.agency`. No es un pendiente ni un riesgo abierto: es el reparto
entre los dos sitios. No reabrir.

**Bajada** `[DECIDIDO]`
> Estrategia, contenido, pauta y conversión. Un mismo equipo, un plan claro y
> decisiones con tus números.

*(103 caracteres, bajo el techo de 120.)*

**Se descartó** `Primero medimos tu negocio. Después armamos el plan.` porque
repite la fórmula de Método. La home no tiene que adelantar el método: para eso
está el botón de B2.

**CTA** `[APROBADO]`
> Reservá tu análisis ↗

**Estado en obra:** el botón va deshabilitado y con el pendiente escrito al
lado, porque el destino de la agenda no está decidido.

---

## B2 · QUIÉNES SOMOS `[NUEVO]`

Un solo párrafo grande centrado, con objetos intercalados entre palabras.
Condensa las tres secciones de argumento que hoy ocupan tres pantallas.

**Eyebrow**
> QUIÉNES SOMOS

**Titular** `[DECIDIDO]`
> UN EQUIPO PARA TU NEGOCIO

**Se acortó.** Era `UN EQUIPO DE CRECIMIENTO PARA TU NEGOCIO`, de 40 caracteres.
Ahora son **25**, en dos renglones.

### El slot sigue siendo de dos renglones, con techo 25

El presupuesto general da **20 caracteres** al titular de sección display, pero
esos 20 salieron de medir `Our works` y `Our services`, que son de **un
renglón**. Este envuelve en **dos** dentro de `--medida-titular` (850px): son
dos slots distintos con el mismo nombre, y esa distinción se mantiene.

**Lo que se cayó es el número.** La excepción de 40 quedaba sin objeto al
acortarse el titular: el techo del slot es ahora **25**.

**La regla que queda:** no achicar el cuerpo para meterlo en un renglón.
Envuelve en dos, y así está construido.

### Recompuesto en dos columnas de verdad

Eyebrow, titular, párrafo y CTA van **todos en la columna izquierda**, y la
imagen en la derecha. Antes el titular cruzaba el ancho completo y la imagen
arrancaba recién a la altura del párrafo, así que quedaba flotando.

Las dos columnas empiezan a la misma altura: **medido, el borde superior de la
imagen queda a 0px del eyebrow y el inferior a 0px de la base del CTA.**

Por eso el marco **no declara proporción en desktop**: el alto se lo da la
columna de texto. Si se fijara una proporción, tendría que ceder la alineación o
la proporción, y lo que se pidió es la alineación. Cuando exista la foto real
entra con `object-fit: cover`. Apilado, bajo 810px, sí lleva 4:3, porque ya no
hay columna al lado que le dé el alto.

**Párrafo**
> Coordinamos estrategia, contenido, pauta y conversión para que cada decisión
> responda al mismo plan y puedas ver qué está funcionando.

*(134 caracteres, techo 190. La versión anterior tenía 325.)*

**Se cayó `Tu tienda ya vende.` del arranque del párrafo** al entrar el titular:
con el titular arriba, esa frase quedaba diciendo dos veces a quién le habla.
Es una consecuencia del titular, no un recorte suelto.

**CTA**
> Cómo trabajamos ↗ → `/metodo`

---

## B3 · TRABAJOS

**Titular display, corto, a la izquierda** `[NUEVO]`
> TRABAJOS

**Botón a la derecha, misma línea de base** `[APROBADO]`
> Ver casos ↗ → `/casos`

**Bajo cada card:** categoría chica arriba, nombre grande abajo.

**Nota:** la línea aprobada *"Trabajo real, pensado para hacer crecer marcas"*
no entra en este formato — el titular de la referencia es una o dos palabras en
display condensado. Se puede recuperar como bajada, o dejarla para `/casos`.

### Estado en obra `[CONSTRUIDO CON MARCADORES]`

**Cuatro piezas, en dos filas de dos.** Eran dos. Sólo se conocen dos clientes
—`Patagonia Vessels` (17 car.) y `Comercial Pas` (13), dentro del rango medido
de 4–23— así que las otras dos ranuras llevan el mismo marcador que B7, para que
se lean como el mismo hueco y no como dos clientes distintos.

### La entrada: una sola regla para las dos filas

Cada pieza entra desde el lado de **su columna**: izquierda por la izquierda,
derecha por la derecha, **en las dos filas igual**. La fila de abajo no hace
nada distinto de la de arriba.

Se descartaron dos alternativas por contradecir a la fila de arriba:

- **Cruzada** (fila 2 al revés que fila 1): los recorridos se pisan y deja de
  leerse "se cierran hacia el centro".
- **Desde abajo**: es otro gesto dentro del mismo bloque.

La dirección **se deriva del índice**, no se escribe a mano, así no puede quedar
desalineada de la columna que le toca. Y no hace falta escalonar nada:
`useProgresoDeScroll` mide por elemento, así que la fila de abajo arranca sola
cuando le toca entrar en cuadro.

*Si al verlo resulta mecánico,* la variante mínima es bajarle amplitud a la fila
2 —62% a ~40% de recorrido, 5° a 3°— manteniendo la dirección. No se hizo:
introduce una segunda regla que habría que justificar.

### El corte de columnas baja de 810 a 600

Con cuatro piezas, una columna única a 390px deja la sección en **~1.670px, unas
2,4 pantallas**, contra ~820px con dos piezas. El modelo está verificado: cada
pieza mide `ancho × 0,75 + festón + pie`, y a 1379px da 596px medidos.

El corte a 810 dejaba la columna única también en tablets y teléfonos apaisados,
donde entran dos sin problema. **Desde 600px van dos columnas**, así el apilado
largo queda sólo donde no hay alternativa. En la columna única el gap baja a
`--space-5`: son tres huecos, y cada uno que sobra son 16px más de scroll.

**No se esconden piezas en móvil.** Ocultar contenido por ancho de pantalla es
peor que una página larga, y para eso ya está el botón a `/casos`.

**Tres cosas van como marcador explícito**, dichas una sola vez para todo el
bloque en vez de repetirlas por tarjeta:

1. Los videos en loop no existen. Va el campo con la proporción.
2. Los posters tampoco.
3. **El uso autorizado de cada cliente sigue sin confirmar.** Es lo único de los
   tres que bloquea publicar, no sólo maquetar.

La categoría por cliente tampoco está: marcador de 19 caracteres, dentro del
rango medido de 13–20.

**Proporción del campo: 4:3.** El plan no la fijaba. Es la única que deja ver
las dos piezas juntas: con dos tarjetas lado a lado a 1200px de contenido cada
campo mide unos 570px, y en vertical el par pasaría los mil píxeles de alto.
Se cambia en `aspect-ratio` de `.b3-trabajo__medio`.

**El festón del pie cuelga en el color del campo.** `SectionEdge` con
`borde="abajo"` es una franja de alto fijo que cuelga por debajo, no una máscara
sobre el medio. Con el campo plano del marcador queda exacto. **Cuando lleguen
los videos reales hay que mirarlo de nuevo:** si el video llena el campo hasta
el borde se va a ver la juntura con la franja plana.

**Las tarjetas no tienen estado de hover, y queda así** `[DECIDIDO]`. El plan
pide "hover con estado propio", pero eso presupone que la tarjeta lleva a algún
lado. La decisión 4 ya se cerró y **no hay botón ni destino por caso**: en Casos
van chips de intervención. Así que las tarjetas de Trabajos no son enlaces, y un
hover sobre algo que no responde al click prometería una interacción que no
existe. El único destino del bloque es el botón a `/casos`.

---

## B4 · NUESTROS SERVICIOS

**Titular display centrado** `[NUEVO]`
> QUÉ HACEMOS

**Bajada** `[APROBADO]`
> Un equipo. Cuatro motores funcionando juntos. Cada motor tiene su oficio, y la
> medición los atraviesa a todos.

### Las cuatro tarjetas

Nombre grande · dos líneas · cuatro entregables numerados · imagen vertical.

**01 · Estrategia** `[APROBADO]` — Definimos a dónde vamos y con qué prioridad.
**02 · Creatividad** `[APROBADO]` — Convertimos una idea en muchas piezas que compiten.
**03 · Adquisición** `[APROBADO]` — Llevamos esas piezas al mercado y compramos atención.
**04 · Web & Conversión** `[APROBADO]` — Ordenamos lo que pasa después del clic.

### Los 16 entregables `[ABIERTO]` ← lo único que bloquea

Derivados de material tuyo: los 11 tags, `queActivamosContent.ts` y lo que
calcula la herramienta de diagnóstico. **Son afirmaciones sobre lo que
entregás: confirmalos, corregilos o reemplazalos uno por uno.**

| | Estrategia | Creatividad | Adquisición | Web & Conversión |
|---|---|---|---|---|
| 01 | Diagnóstico de negocio y márgenes | Contenido para pauta | Meta Ads | Tienda y páginas de producto |
| 02 | ROAS de equilibrio y CPA objetivo | Shootings de producto y marca | Google Ads | Tracking con CAPI |
| 03 | Plan de inversión por canal | Diseño de marca y piezas | Product Ads y Shopping | GA4 y eventos |
| 04 | Proyección a 90 días | Influencer marketing | Optimización de ficha en ML | Medición y atribución por canal |

### Estado en obra `[CONSTRUIDO CON MARCADORES]`

**La tabla de arriba NO está en el sitio.** El bloque se construyó con las
dieciséis filas mostrando `Pendiente · entregable sin confirmar`, igual que el
CTA del hero: antes que publicar dieciséis afirmaciones sin confirmar sobre lo
que la agencia entrega, el bloque dice que faltan.

El marcador mide **36 caracteres** contra un techo de 34, a propósito: el layout
queda probado apenas por encima del peor caso, así el copy real entra después
sin mover nada.

Para reemplazarlos: `ENTREGABLE_PENDIENTE` en `src/bloques/B4Servicios.tsx`.

**Cuatro tarjetas — confirmado.** Nombres de 10 a 16 caracteres, bajo el techo
de 24.

**Un acento por tarjeta, en orden:** acento-1 azul, 2 bermellón, 3 verde,
4 violeta, cada uno con su `--texto-sobre-N`.

*Observación, no error:* esos cuatro acentos son también los colores de las
cuatro páginas en el nav y en los rectángulos del footer. La paleta tiene cinco
y el quinto está tomado por los ciclos, así que la coincidencia es inevitable
mientras el color de servicio salga de la misma paleta.

**Imagen vertical a 3:4.** El plan pedía "imagen vertical" sin fijar
proporción. Queda **3:4**, el retrato estándar, con marco punteado y el nombre
accesible diciendo de qué tarjeta es. Si las fotos reales vienen en otra
proporción, se cambia `aspect-ratio` en `.b4-tarjeta__medio` y nada más se mueve.

**Sin borde de onda.** El hilo conductor de la nube pasa por B2, B3, B7, B8 y
B9. B4 no está en esa lista.

---

## B5 · PÍLDORAS `[APROBADO]` — construido, sin marcadores

Banda baja, una fila flotando hacia un costado. Sin titular.

> Meta Ads · Tracking con CAPI · Google Ads · Atribución real · Product Ads ·
> Optimización de ficha · Contenido para pauta · GA4 · Influencer marketing ·
> Diseño de marca · Web y conversión

**⚠ Va entre B2 y B3.** Cambió de lugar: estaba entre B4 y B6. El número se
conserva para no renumerar, pero en la página aparece cuarta, como respiro entre
quiénes somos y trabajos.

**Es el primer bloque de la home sin un solo marcador:** las once capacidades ya
estaban escritas y entraron tal cual.

### Las píldoras flotan

No van alineadas ni quietas: mientras la banda se desplaza al costado, cada una
sube y baja en loop, ±3px sobre 3,2s. Es un flotar, no un rebote.

**El desfase de cada una sale de su índice, no de un azar,** y no es una
preferencia: el Ticker duplica la lista para que el loop no tenga saltos, y las
dos copias tienen que oscilar idéntico. Con un desfase aleatorio, la copia
visual haría otra cosa que la real y el corte del loop se vería. El retardo es
negativo, así la animación arranca ya avanzada y no hay un primer instante con
las once alineadas.

**Se apaga entera con `prefers-reduced-motion`,** junto con el desplazamiento
lateral: para quien mira, son el mismo movimiento.

**El anillo de foco no se recorta.** La ventana del ticker tiene `overflow:
hidden` y 24px de padding vertical. En el peor punto de la oscilación, con el
anillo completo de 6px —3 de trazo más 3 de offset— quedan 14px de holgura
arriba y 16 abajo. Hoy las píldoras no son enfocables; la medición vale para
cuando lo sean. La más larga, `Optimización de ficha`, mide
21 contra un techo de 20 — se pasa por uno y entra igual, así que la banda queda
probada al filo del presupuesto.

### Texto blanco en todas, y por eso el ciclo son dos colores

La banda va con texto blanco en todas las píldoras. Eso no se consigue
escribiendo blanco: se consigue usando **sólo los acentos cuyo
`--texto-sobre-N` ya es blanco**. Así el par se sigue respetando y el resultado
es blanco parejo.

Medido, blanco contra el mínimo de 4.5:1:

| Acento | Blanco | ¿Pasa? |
|---|---|---|
| acento-1 azul | 4.56 | sí |
| acento-4 violeta | 5.00 | sí |
| acento-2 bermellón | 3.65 | **NO** |
| acento-3 verde | 2.20 | **NO** |
| acento-5 amarillo | 1.61 | **NO** |

⚠ **Bermellón también quedó afuera, no sólo amarillo y verde.** Se pidió dejar
azul, bermellón y violeta. Bermellón con blanco da **3.65:1** y no llega: es
exactamente el mismo motivo por el que salieron los otros dos. El ciclo queda en
azul y violeta.

Con texto oscuro bermellón da 5.09:1 y entra sin problema — es sólo el blanco lo
que no soporta. Si se lo quiere de vuelta, la salida es texto oscuro en esa
píldora, no bajar el techo.

El ciclo queda cortado —once sobre dos— y no se fuerza a que cierre: manda la
lista de capacidades, no la paleta.

---

## B6 · NUESTRO PROCESO `[DECIDIDO: 4 tarjetas]`

**Titular display centrado**
> NUESTRO PROCESO

Cuatro tarjetas, una por paso del método. No se toca `/metodo`.

> **01 Preguntamos** · Qué vendés, a qué margen y con qué costos.
> **02 Medimos** · Dónde se frena el crecimiento.
> **03 Proyectamos** · Qué pasa si se corrigen esas fugas.
> **04 Recomendamos** · Un plan con presupuesto y prioridad. Escrito.

**Grilla:** 4 columnas iguales en desktop · 2×2 en tablet · 1 columna en mobile.
La referencia usa 3 columnas a `flex: 1 0 0`; con 4 cada tarjeta baja de ~393px
a ~292px sobre un contenido de 1200px. El objeto de 150×150 sigue entrando
cómodo, pero **la bajada tiene que quedar en dos líneas**: ver presupuesto.

### Estado en obra `[CONSTRUIDO]`

Sin marcadores: el copy corto ya estaba. Objeto en contenedor de 150×150, que
baja a 100×100 bajo 810px. El contenedor es fijo y el objeto entra adentro con
`object-fit: contain`, porque los cuatro PNG no traen el mismo margen interno y
sin contenedor se verían de tamaños distintos en la misma fila.

**Ojo con la bajada de `Recomendamos`:** `Un plan con presupuesto y prioridad.
Escrito.` mide **exactamente 45**, que es el techo con cuatro columnas. Está en
el límite, no debajo. Un carácter más y pasa a tres líneas, que desalinea la fila.

### Los objetos, asignados por significado

Según `01_sistema/identidad.md`. Tres de los cuatro son exactos:

| Paso | Objeto | Significado en identidad.md |
|---|---|---|
| 01 Preguntamos | foco | Entender, diagnosticar |
| 02 Medimos | barras | Medir y proyectar |
| 03 Proyectamos | conexión | Coordinar disciplinas |
| 04 Recomendamos | rayo | Activar una **prioridad** |

**⚠ El 03 no cierra, y conviene saberlo.** `Proyectamos` querría barras, porque
el significado de barras es "medir **y proyectar**": los pasos 02 y 03 se pelean
el mismo objeto. Repetirlo en una fila de cuatro se leería como un error, así
que al 03 le toca conexión, que es el que sobra y el que peor encaja —
"coordinar disciplinas" no es proyectar.

Es la asignación menos mala, no una buena. **Revisado y aparcado a propósito:
queda conexión.** No es un pendiente. Si aparece un quinto objeto, o si se
prefiere repetir barras en 02 y 03, se cambia en `B6Proceso.tsx`.

## B7 · MARCAS `[DECIDIDO]`

**Titular display corto a la izquierda**
> MARCAS

Doce logos en anillos de color, con el nombre del cliente debajo, en una banda
a la derecha del titular y **en la misma línea**, como la referencia.

**Cambió el titular:** era `CONFÍAN EN NOSOTROS` (19 caracteres) y quedó
`MARCAS` (6). El formato de la referencia es un display corto a la izquierda con
la banda al lado, y un titular de 19 caracteres no deja ancho para la banda.

**Salió la bajada.** La línea *"Detrás de cada una hay un plan escrito"* no va:
el bloque es el titular y la banda, sin párrafo debajo. Si se quiere recuperar,
va en `/casos`, no acá.

**La banda sangra hasta el borde derecho de la ventana.** La máscara del Ticker
desvanece ese borde, así que cortarla contra la columna de contenido
desperdiciaría el efecto y acortaría la banda sin ganar nada.

**Título y banda van en la misma línea EN TODOS LOS ANCHOS,** también en móvil.
Antes se apilaban bajo 810px. La banda entra desde la derecha y avanza hacia la
izquierda, que es la dirección propia del Ticker.

**Salió el párrafo de pendiente.** Decía que los doce logos no existen y que el
uso autorizado está sin confirmar. El marcador ya se lee en los anillos, que
dicen "Logo" y "Cliente pendiente" doce veces: el aviso duplicaba algo que el
bloque muestra solo. Lo que sigue vigente está en esta ficha.

### Estado en obra `[CONSTRUIDO CON MARCADORES]`

**Nada del contenido de este bloque existe:** no hay un solo logo de cliente en
`public/assets`, de los doce nombres se conocen dos —los de B3— y el uso
autorizado por cliente sigue sin confirmar. Van doce marcadores y el bloque lo
dice una vez arriba, no doce veces.

Se construye con los **doce** y no con tres o cuatro para que el loop y la
máscara del Ticker queden probados con el ancho de pista real. El nombre
marcador mide 17 caracteres contra un techo de 18.

**El anillo es borde, no relleno**, como pide el plan. Con un disco pintado, un
logo oscuro adentro se pierde contra media paleta.

**Doce anillos sobre cinco acentos:** el ciclo queda cortado al final —el doce
cae en acento-2, no en acento-5— y así queda. Forzar que cierre justo pediría
diez o quince clientes, y la cantidad la manda el cliente real, no la paleta.

### La pausa del Ticker es por teclado, y nada más

**Cambio en el componente, así que vale para B5 y B7.** Se sacó el botón visible
de `Pausar`. El mecanismo de WCAG 2.2.2 es uno: la banda es una parada de
tabulación con nombre accesible y se detiene al recibir el foco.

**También se sacó la pausa por hover**, que llegó a estar. Se probó y molestaba:
la banda ocupa media pantalla, así que frenaba cada vez que el puntero la
cruzaba de paso, sin que nadie se lo pidiera.

Con el botón fuera desapareció de paso el arreglo de subirlo arriba de la pista
para que B8 no lo tapara antes que a los anillos.

**⚠ Lo que este mecanismo no cubre.** En una pantalla táctil no hay foco de
teclado, así que ahí no queda ningún freno accionable: el único que sigue en pie
es `prefers-reduced-motion`, que es una preferencia del sistema y no algo que el
usuario accione en el momento. El botón visible cubría el caso táctil. Queda
dicho por si vuelve.

---

## B8 · CIERRE `[APROBADO]`

Sobre el campo azul, dentro de la mancha blanca.

**Eyebrow** → EMPECEMOS
**Titular** → **Hagamos crecer tu negocio.**
**Bajada** → Una llamada de 45 minutos, sin costo. Salís con un diagnóstico y una proyección, actives o no con nosotros.
**CTA** → Reservá tu análisis ↗

**Destino** `[ABIERTO]`: agendar directo, o `/contacto`. Recomendado: agendar,
así la home se publica sin backend.

### Estado en obra `[CONSTRUIDO]`

Todo el copy de B8 está aprobado y entró tal cual. `Hagamos crecer tu negocio.`
son 26 caracteres contra un techo de 28.

**El campo es `--acento-1` con `--texto-sobre-1`,** y la mancha invierte el par:
fondo `--fondo`, texto `--tinta`. Nada de `etiqueta--apagada` adentro del campo
azul — `--texto-2` está calculado contra el fondo crema y sobre el azul pierde
contraste sin avisar. Misma lección que el eyebrow del hero.

**El CTA va con el mismo marcador que el hero:** botón deshabilitado y el
pendiente escrito al lado, porque el destino de la agenda sigue sin definir.
**Por eso tampoco tiene el glow en hover que pide el plan:** un glow sobre un
control que no responde promete lo mismo que un enlace a ninguna parte. Cuando
se decida el destino se cambian las dos cosas juntas, acá y en `B1Hero.tsx`.

**La mancha no lleva borde de onda.** La onda ya corona la sección; repetirla
adentro compite con ella. Son bordes muy redondeados, que es lo que pide la
variante "mancha".

**Bajo 810px se saca el `min-height: 108vh`.** Ese alto existe para que B7 siga
fijado mientras este bloque sube, y bajo 810px ese pin está apagado: ahí el
108vh no sostenía nada, sólo dejaba un hueco muerto grande entre el CTA y la
nube del footer. El alto pasa a ser el del contenido, y el padding de abajo baja
a `--space-5`.

**B7 fijado mientras B8 sube** lo resuelve `HeroSticky`, no `ServiceStack`. El
plan lo llama "variante de M2 con top alto", pero M2 no alcanza solo: un
`sticky` se fija dentro de SU padre, así que para que B7 siga fijado mientras B8
sube los dos tienen que compartir contenedor. `HeroSticky` es exactamente eso, y
se le agregó un `offset` opcional que sale de `--sticky-clientes` (200px) con el
piso del nav real. El offset se descuenta del alto: fijar a 200px sin
descontarlo dejaría los últimos 200px del bloque por debajo del pie de la
ventana.

---

## B9 · FOOTER `[CONSTRUIDO]` — con datos reales

Logo en forma de nube, nombre, mail. Tres botones de redes en píldora con
contorno. Cuatro rectángulos de color, uno por página.

**Los datos ya no faltan.** Este bloque no lleva un solo marcador:

- Mail: `marketing@velocentum.com`
- LinkedIn: `https://www.linkedin.com/company/velocentum/`
- Instagram: `https://www.instagram.com/velocentum/`
- Facebook: `https://www.facebook.com/velocentum/`
- **Enlace a `velocentum.agency`: NO va.** Decisión explícita, no un olvido.

**Es una `section` con `role="contentinfo"`, no un `<footer>`.** La reserva de
espacio del borde de onda pide que la onda sea hija directa del hermano
siguiente; envolviendo la sección en un `<footer>` la onda pasa a ser nieta, la
regla no engancha y la onda se come el cierre de B8. El `role` da a la
tecnología asistiva el mismo landmark, así que no se pierde nada.

**Las redes abren en pestaña nueva y lo avisan** con texto para lectores de
pantalla. Para el resto lo dice la flecha, que en este sistema ya significa que
sale del sitio. **No hay íconos de marca en `public/assets`**, así que la
píldora es texto más flecha; cuando existan, entran acá.

**Los rectángulos llevan el acento de su página** con su `--texto-sobre-N`, el
mismo par que su link en el nav. El hover sube la tarjeta y la aclara: no es
sólo color, así que se percibe aunque el color no se distinga.

⚠ **Los nombres tienen que coincidir con los del nav, y la decisión 2 —"Inicio"
u "Home"— sigue abierta.** Si cambia, cambia en los dos lados a la vez.

### Dos defectos del borde de onda, encontrados acá y corregidos en el sistema

Aparecieron al poner una sección con onda después de un par cosido, que es algo
que antes no pasaba. Los dos estaban en `componentes.css` y valen para cualquier
par futuro:

1. **La reserva caía en el envoltorio.** El envoltorio del par no tiene color
   propio, así que entre el azul de B8 y la onda del footer quedaba una franja
   del color de la página. Ahora la reserva va en el bloque que sube, que es el
   que lleva el color.
2. **La onda existía y no se veía.** `hero-sticky__siguiente` lleva `z-index: 1`
   para poder tapar al bloque fijado, y con eso tapaba también la onda de la
   sección de abajo, que es hermana posterior pero con `z-index` automático. La
   transición quedaba como una línea recta. Ahora la sección que entra se pinta
   por encima del par.

---

# LO QUE FALTA PARA CERRAR

| # | Decisión | Bloquea |
|---|---|---|
| 1 | **Los 16 entregables** | B4 — el bloque principal |
| ~~2~~ | ~~Titular del hero y su bajada~~ **RESUELTO** — ver B1 | — |
| 4 | "Inicio" o "Home" | B0 y B9 |
| 5 | Destino del CTA de cierre | B8 y la publicación |
| ~~6~~ | ~~Mail y redes reales~~ **RESUELTO** — ver B9 | — |
| 7 | Confirmar que cifras y testimonios quedan afuera a propósito | registro |

---

# PRESUPUESTO DE CARACTERES POR SLOT

Medido sobre el texto real de la referencia. **Se construye con placeholders de
este largo**, así el copy definitivo entra después sin romper nada.

| Slot | Referencia | Techo recomendado |
|---|---|---|
| Titular hero, por línea | 9 · 14 · 11 | **16 por línea, 3 líneas** |
| Bajada hero | — | 120 total, 2 líneas |
| Texto de botón | 10 (`Contact Us`) · 20 (`Book a Strategy Call`) | **22** |
| Párrafo de B2 | 169 | **190** |
| Titular de sección display | 9–12 (`Our works`, `Our services`) | **20** en un renglón · **40 en dos**, ver B2 |
| Título de tarjeta de servicio | 14–20 | **24** |
| Descripción de tarjeta de servicio | 85–118 | **120**, 2 líneas |
| Entregable | 15–34 | **34** |
| Píldora | 9–19 | **20** |
| Título de tarjeta de proceso | 4–7 (`Plan`, `Amplify`) | **14** |
| Bajada de tarjeta de proceso | 45–49 | **55** con 3 columnas · **45** con 4 |
| Nombre de cliente bajo el logo | 4–7 | **18** |
| Titular de cierre | 18 (`Ready to be famous?`) | **28** |

## Dónde el borrador actual se pasa

Cinco lugares. Ninguno bloquea construir, pero hay que resolverlos antes de
poner el copy final:

**1. El párrafo de B2 se pasa al doble.** El borrador tiene ~380 caracteres
contra 169 de la referencia. Hay que cortarlo a la mitad o el bloque deja de
ser un párrafo suelto y se vuelve un muro.

**2. ~~El texto del CTA~~ — RESUELTO.** Queda `Reservá tu análisis`: 19
caracteres, 21 con la flecha. Entra bajo el techo de 22 y funciona en cualquier
posición, incluido un botón chico. Se pierde "de negocio", pero la bajada da el
contexto en los dos lugares donde aparece el botón: en el hero y en el cierre.

**3. Las bajadas de proceso.** El borrador va de 55 a 63 caracteres contra
45–49 de la referencia, y con **cuatro** columnas en vez de tres el techo baja a
~45. Por eso las acorté arriba.

**4. Los nombres de cliente.** `Patagonia Vessels` son 17 caracteres contra 4–7
de la referencia, que usa nombres inventados y cortos. Con 12 logos reales de
nombre largo, el anillo necesita más aire lateral del que usa la referencia.

**5. Los títulos de proceso.** `Recomendamos` son 12 contra 4–7. Siguen siendo
una palabra, así que entran, pero la tipografía va a verse más chica que en la
referencia. Es aceptable.

## Nota general

El castellano corre entre 20% y 25% más largo que el inglés para decir lo mismo.
**El layout de la referencia está calibrado para inglés.** Donde el texto no
entra, la solución es acortar el texto, no agrandar la caja: agrandar cajas es
lo que va a hacer que la página deje de parecerse a lo que te gustó.
