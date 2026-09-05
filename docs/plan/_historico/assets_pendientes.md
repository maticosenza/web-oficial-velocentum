# SISTEMA VISUAL Y ASSETS PENDIENTES

Todo lo que falta definir o producir antes de que Claude Code escriba la primera
línea. Ordenado por lo que bloquea a lo demás.

---

# PARTE 1 — SISTEMA DE COLOR

## Dónde se usa color en el sitio

Antes de elegir, conviene ver cuántos lugares lo piden. Salen de las specs:

| Lugar | Cuántos colores |
|---|---|
| Links del nav, uno por página | 4 |
| Rectángulos del footer, uno por página | 4 |
| Cortina de transición | 1 por página de destino |
| Tarjetas de servicio, Home B4 | 4 |
| Tarjetas de proceso, Home B6 | 4 |
| Tarjetas de método, M3 | 4 |
| Anillos de logos, Home B7 | 12, en ciclo |
| Píldoras, Home B5 | 11, en ciclo |
| CTAs | 1 |

Sin disciplina, esto termina en diez colores distintos y el sitio se ve como una
juguetería. La referencia usa cinco tonos saturados y le funciona porque su tono
es alto; el tuyo no.

## Propuesta: cuatro acentos + el rosa reservado

**Una sola paleta de cuatro acentos, usada en todos lados en ciclo**, más el
rosa de marca reservado exclusivamente para CTAs y marca.

Que el rosa **no** se use en tarjetas ni en anillos tiene una razón funcional:
si el rosa aparece solo en botones, el visitante aprende en tres segundos que
rosa = acción. Es lo que hace que un sistema colorido siga siendo legible.

Y los cuatro acentos se asignan **uno por página**, y esa misma asignación se
reusa en todo el sitio:

| Rol | Se usa en |
|---|---|
| `acento-1` → Inicio | Link del nav, rectángulo del footer, cortina al ir a Inicio, y primera tarjeta de cada set de cuatro |
| `acento-2` → Método | Ídem, y segunda tarjeta |
| `acento-3` → Casos | Ídem, y tercera tarjeta |
| `acento-4` → Contacto | Ídem, y cuarta tarjeta |
| `marca` (rosa) | CTAs, isotipo, detalles. **Nada más.** |

Con eso, las cuatro tarjetas de servicio, las cuatro de proceso y las cuatro de
método usan los mismos cuatro colores en el mismo orden. Los 12 anillos y las 11
píldoras ciclan sobre esos cuatro. **Todo el sitio corre con cinco colores.**

## Lo que hay que decidir

**Decisión 1 — ¿El rosa sobrevive?**
Es lo único que conecta con tu marca actual, con el isotipo y con
velocentum.agency. **Recomiendo que sí**, aunque cambie el resto.
Si se va, hay que rehacer también el isotipo y desalinear las dos propiedades.

**Decisión 2 — Los cuatro acentos.**
Sobre fondo claro, con texto oscuro encima, tienen que ser lo bastante saturados
para leerse como campo pleno y lo bastante apagados para no gritar. Tres caminos:

- **a)** Cuatro tonos derivados del rosa: magenta, ciruela, coral, terracota.
  Muy coherente, riesgo de monotonía.
- **b)** Rosa + tres tonos fríos que contrasten: azul, verde, ocre.
  Más parecido a la referencia, más versátil.
- **c)** Cuatro neutros cálidos y fríos muy desaturados, con el rosa como único
  color vivo. El más sobrio de los tres y el más alineado con "crecimiento con
  control". El riesgo es que quede apagado.

**Decisión 3 — Fondo, tinta y texto secundario.**
La referencia usa blanco puro, tinta `#030f2e` y gris `#5c6275`. Hay que definir
los tres equivalentes. **El fondo no tiene por qué ser blanco puro**: un blanco
apenas cálido baja la dureza sin perder claridad.

**Decisión 4 — El color de la cortina de transición.**
O blanca siempre, o del color de la página de destino. La segunda hace que el
sistema se explique solo. Es gratis y la referencia no lo tiene.

---

# PARTE 2 — TIPOGRAFÍA

Tres roles a cubrir:

| Rol | Uso | Referencia |
|---|---|---|
| **Display condensada** | Titulares gigantes | Muy condensada, muy pesada |
| **Sans de texto** | Párrafos, tarjetas, UI | Neutra, geométrica |
| **Mono** | Eyebrows, números `01`–`04`, categorías | — |

**Punto de partida:** conservar **Manrope** y **Geist Mono**, que ya son las del
sistema actual.

**⚠ Pero falta la display.** Manrope no es condensada. Los titulares de la
referencia son extremadamente condensados y pesados, y ese es buena parte de su
carácter. Con Manrope en peso alto, los titulares de tres líneas del hero van a
ocupar mucho más ancho y no van a leerse igual.

**Hay que elegir una tercera tipografía condensada para display.** Es una
decisión con peso propio: es lo primero que se ve en las cuatro páginas.

**Decisión 5 — ¿Qué display condensada?**

---

# PARTE 3 — EL LOGO

**Decisión 6.** Tres caminos:

- **a)** Se conserva el isotipo actual tal cual. Es lo único no copiable que
  tenés y ya comparte ADN con el objeto de cristal.
- **b)** Se conserva pero se adapta al fondo claro. El isotipo está calibrado
  para oscuro: hay que revisar contraste y sombras.
- **c)** Se rehace. Cuesta y no lo recomiendo salvo que ya lo tuvieras decidido.

**Recomiendo la b.** Y hay dos lugares donde el logo aparece en forma especial:
dentro de la card del nav, y **dentro de una forma de nube** en el footer.

---

# PARTE 4 — LOS OBJETOS

Pediste tratamiento realista, no caricaturesco. Los que hay hoy: **rayo, prisma,
mira, barras**. Hacen falta más.

| Dónde | Cuántos | Estado |
|---|---|---|
| Home B1, intercalados en el titular | 2 | Existen |
| Home B2, intercalados en el párrafo | 2 a 3 | Existen |
| Home B6, proceso | 4 | Existen los 4 |
| Método M3, los cuatro pasos | 4 | Existen los 4 |
| Contacto, panel izquierdo | 2 a 3 | Existen |

**Buena noticia:** con los cuatro que ya tenés alcanza para todo el sitio, si se
repiten entre páginas. **Decisión 7:** ¿se repiten, o hacen falta objetos nuevos
para que Home y Método no se vean iguales?

**Y hay que definir el tratamiento realista.** Los de la referencia son stickers
planos con contorno blanco grueso y sombra. Los tuyos tienen facetas, gradiente
por cara y reflejos. Sobre fondo claro hay que recalibrarlos: el glow que los
sostenía en oscuro desaparece.

---

# PARTE 5 — ASSETS, PÁGINA POR PÁGINA

## HOME

| # | Asset | Cantidad | Notas |
|---|---|---|---|
| 1 | **Degradado desenfocado del hero** | 1 imagen | No es un blur de CSS. Se renderiza como imagen. Verificado en la referencia |
| 2 | **SVG de silueta de nube** | 1, parametrizable | El recurso más importante del sitio. Se usa en B2, B3, B7, B8 y B9. Se aplica como `mask-image ... alpha` |
| 3 | Nubes sueltas del hero | 2 a 4 | Formas macizas, sin degradado |
| 4 | Objetos del titular | 2 | Realistas |
| 5 | **Foto de backstage** para B2 | 1 | La imagen del bloque "quiénes somos" |
| 6 | **Videos de trabajos** para B3 | 2 | Con poster real, no degradado |
| 7 | **Imágenes verticales** para B4 | 4 | Una por motor. Producto o backstage |
| 8 | Objetos de proceso B6 | 4 | Realistas |
| 9 | **Logos de clientes** | 12 | Con su nombre. Dimensiones reales, no el placeholder 120×34 |
| 10 | Cursor custom | 1 SVG de 32×46 | Flecha propia |

## MÉTODO

| # | Asset | Cantidad | Notas |
|---|---|---|---|
| 1 | **Foto del hero, a sangre** | 1 | Con overlay de tinta al 70% encima, así que no hace falta una toma perfecta |
| 2 | **Foto de backstage** para M2 | 1 | Distinta a la de la Home |
| 3 | Objetos de los cuatro pasos | 4 | Con animación al entrar y al hover |

## CASOS

| # | Asset | Cantidad | Notas |
|---|---|---|---|
| 1 | **Medios de los casos** | 8 | Imagen o video, indistinto. Radio de 16px |
| 2 | Logos de clientes | 8 de los 12 | Los mismos de la Home |
| 3 | Medios de los 4 restantes | 4 | Para el "Ver más" |

## CONTACTO

| # | Asset | Cantidad | Notas |
|---|---|---|---|
| 1 | **Panel izquierdo** | 1 | Decisión abierta: foto de backstage con titular encima, o campo de color con objetos |
| 2 | Íconos de teléfono y email | 2 | Dentro de círculos de color |
| 3 | Íconos de redes | 2 a 3 | Dentro de círculos con contorno |

---

# PARTE 6 — DATOS QUE SOLO PODÉS DAR VOS

No se inventan. Bloquean la publicación, no la construcción.

1. **Mail real** — footer y contacto.
2. **Teléfono real** — contacto.
3. **Qué redes van** y sus URLs.
4. **Los 13 playback IDs de Mux verificados** contra rubro, acción y poster.
5. **Nombres y rubros de los 12 clientes.**
6. **Destino del formulario o del CTA:** agendar, o backend propio.
7. **Los 16 entregables** del bloque B4.
8. **Copy de los 8 casos:** nombre, categoría y párrafo de ~140 caracteres.
9. **Si la `.com` enlaza a velocentum.agency**, y desde dónde.

---

# ORDEN SUGERIDO

**Primero, y bloquea todo:** decisiones 1 a 5. Color, tipografía, logo.

**Segundo, y bloquea la Home:** la SVG de nube y el degradado del hero. Son los
dos assets que no se pueden reemplazar por un placeholder, porque definen la
forma de cinco bloques.

**Tercero:** el resto de los assets, que sí admiten placeholder del tamaño
correcto mientras se construye.

**Cuarto, en paralelo a la construcción:** los datos de la Parte 6.

---

# RESUMEN DE DECISIONES ABIERTAS

| # | Decisión |
|---|---|
| 1 | ¿El rosa de marca sobrevive? |
| 2 | Los cuatro acentos: derivados del rosa, contrastantes, o casi neutros |
| 3 | Fondo, tinta y texto secundario |
| 4 | Cortina de transición: ¿blanca, o del color de destino? |
| 5 | Qué tipografía display condensada |
| 6 | El logo: ¿se conserva, se adapta o se rehace? |
| 7 | ¿Los objetos se repiten entre páginas o hacen falta nuevos? |
| 8 | Panel izquierdo de Contacto: ¿foto o campo de color? |
