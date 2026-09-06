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

**Consecuencia registrada:** el hero ya no nombra al segmento e-commerce. Es una
decisión, no un olvido. Si hace falta nombrarlo arriba de todo, se resuelve en
otro slot.

**Bajada** `[NUEVO — divergencia sin resolver]`

El documento tenía:
> Estrategia, contenido, pauta y conversión en un solo equipo.
> Primero medimos tu negocio. Después armamos el plan.

Lo construido dice:
> Estrategia, contenido, pauta y conversión. Un mismo equipo, un plan claro y
> decisiones con tus números.

*(103 caracteres, bajo el techo de 120.)* **Las dos están sin aprobar.**
Elegir una y borrar la otra.

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

---

## B8 · CIERRE `[APROBADO]`

Sobre el campo azul, dentro de la mancha blanca.

**Eyebrow** → EMPECEMOS
**Titular** → **Hagamos crecer tu negocio.**
**Bajada** → Una llamada de 45 minutos, sin costo. Salís con un diagnóstico y una proyección, actives o no con nosotros.
**CTA** → Reservá tu análisis ↗

**Destino** `[ABIERTO]`: agendar directo, o `/contacto`. Recomendado: agendar,
así la home se publica sin backend.

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
| ~~2~~ | ~~Titular del hero: A, B, C o D~~ **RESUELTO** — ver B1 | — |
| 2b | Cuál de las dos bajadas de hero queda | B1 |
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
