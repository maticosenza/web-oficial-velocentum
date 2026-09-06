# COPY HOME — VELOCENTUM.COM

Alineado a la estructura final: diez bloques B0–B9, ocho de contenido más nav y footer.
Tono: sobrio, rioplatense, sin urgencia artificial, sin emojis.
Segmento: e-commerce que ya vende.

`[APROBADO]` copy que ya existía y se conserva · `[NUEVO]` a aprobar ·
`[ABIERTO]` falta una decisión tuya.

---

## B0 · NAV `[ABIERTO]`

> Inicio · Método · Casos · Contacto

**Sin CTA en el nav.** En la referencia son solo los links; el botón de agendar
vive en el hero y en el cierre. Sumarlo acá le saca peso a los otros dos.

**Abierto:** "Inicio" o "Home". El resto del sitio está en castellano.

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
> UN EQUIPO DE CRECIMIENTO PARA TU NEGOCIO

### Este slot admite 40 caracteres, no 20

El presupuesto general da **20 caracteres** al titular de sección display. Este
titular tiene **40** y se queda igual: **el slot de B2 admite 40 en dos
renglones.**

**Por qué no es una excepción arbitraria.** Los 20 salieron de medir
`Our works` y `Our services` en la referencia, que son titulares de una línea.
Este no es de una línea: es un titular de dos renglones que envuelve dentro de
`--medida-titular` (850px). Son dos slots distintos con el mismo nombre.

**Medido en el navegador, no estimado.** Con la fuente cargada da **dos
renglones a 390, 500 y 1370px de ancho**, y también a zoom 200%. No llega a tres
en ningún punto del rango: arriba de 1259px el cuerpo se topa en 68px y la caja
en 850px, así que la peor relación cuerpo/caja ya está medida.

**La regla que queda:** no achicar el cuerpo para meterlo en un renglón. Envuelve
en dos, y así está construido en `src/estilos/home.css`.

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

**Dos piezas,** `Patagonia Vessels` (17 car.) y `Comercial Pas` (13), dentro del
rango medido de 4–23.

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

## B5 · PÍLDORAS `[APROBADO]`

Banda baja, una fila flotando hacia un costado. Sin titular.

> Meta Ads · Tracking con CAPI · Google Ads · Atribución real · Product Ads ·
> Optimización de ficha · Contenido para pauta · GA4 · Influencer marketing ·
> Diseño de marca · Web y conversión

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

## B7 · CONFÍAN EN NOSOTROS `[NUEVO]`

**Titular display a la izquierda**
> CONFÍAN EN NOSOTROS

Doce logos en anillos de color, con el nombre del cliente debajo.

**Nota:** la línea aprobada *"Detrás de cada una hay un plan escrito"* funciona
como bajada acá si querés conservarla.

### Estado en obra `[CONSTRUIDO CON MARCADORES]`

Se conservó la bajada *"Detrás de cada una hay un plan escrito."*

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

### El control de pausa va ARRIBA de la pista, sólo acá

B8 sube y tapa a B7 de abajo hacia arriba. Con el botón en su lugar normal
—debajo de la pista— quedaba tapado **antes** que los anillos, y en ese tramo el
ticker se veía moviéndose sin forma de detenerlo. Es exactamente lo que prohíbe
WCAG 2.2.2, y `prefers-reduced-motion` no lo cubre: son cosas distintas.

Subiéndolo se invierte el orden de tapado: primero desaparece el movimiento y
último el control. Es un `order` local y no un cambio en el Ticker, porque el
problema no es del componente — aparece sólo cuando algo lo tapa de abajo hacia
arriba. En B5 el botón va donde va.

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

**B7 fijado mientras B8 sube** lo resuelve `HeroSticky`, no `ServiceStack`. El
plan lo llama "variante de M2 con top alto", pero M2 no alcanza solo: un
`sticky` se fija dentro de SU padre, así que para que B7 siga fijado mientras B8
sube los dos tienen que compartir contenedor. `HeroSticky` es exactamente eso, y
se le agregó un `offset` opcional que sale de `--sticky-clientes` (200px) con el
piso del nav real. El offset se descuenta del alto: fijar a 200px sin
descontarlo dejaría los últimos 200px del bloque por debajo del pie de la
ventana.

---

## B9 · FOOTER `[ABIERTO]`

Logo en forma de nube, nombre, mail. Tres botones de redes en píldora con
contorno. Cuatro rectángulos de color, uno por página.

**Faltan datos reales:** mail, qué redes van, y si se enlaza a
velocentum.agency. No se inventan.

---

# LO QUE FALTA PARA CERRAR

| # | Decisión | Bloquea |
|---|---|---|
| 1 | **Los 16 entregables** | B4 — el bloque principal |
| ~~2~~ | ~~Titular del hero y su bajada~~ **RESUELTO** — ver B1 | — |
| 4 | "Inicio" o "Home" | B0 y B9 |
| 5 | Destino del CTA de cierre | B8 y la publicación |
| 6 | Mail y redes reales | B9 |
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
