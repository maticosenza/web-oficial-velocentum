# SPEC DE CONSTRUCCIÓN — VELOCENTUM.COM V2

Proyecto nuevo. Cuatro páginas: **Home · Método · Casos · Contacto**.
Referencia de comportamiento: LoftyLab (analizada, no copiada).
Assets, copy, paleta y objetos: propios de Velocentum.

---

## 0. QUÉ ES ESTE DOCUMENTO Y QUÉ NO

Es la especificación de **comportamiento y estructura**: qué hace cada bloque,
cómo se mueve, en qué breakpoint cambia y qué contenido lleva.

No contiene código, CSS ni assets de la referencia. Los valores numéricos que
aparecen (breakpoints, offsets de sticky, máscaras) son medidas de comportamiento
observadas, del mismo tipo que se leen abriendo las devtools de cualquier sitio.
Se reconstruye todo desde cero.

**Las imágenes de la referencia no se usan.** Todas las imágenes salen del banco
propio: backstage de shootings, fotos de producto de clientes, posters reales de
los 13 videos y los 12 logos.

---

## 1. STACK

| Capa | Elección | Motivo |
|---|---|---|
| Framework | Next.js (App Router) | SSR, rutas file-based, la ruta de menos fricción para las 4 páginas |
| Estilos | Tailwind | Los breakpoints y el layout de la referencia son flex/grid puro |
| Animación | Motion (ex Framer Motion) | Solo para reveals y hover. El 70% del efecto es CSS |
| Video | Mux Player | Ya se usa hoy, los 13 playback IDs existen |
| Deploy | Vercel | — |

**Nota importante:** el par sticky del hero, las tarjetas apiladas de servicios y
el bloque de logos son **CSS puro**. No necesitan JavaScript. No hay un solo
`@keyframes` en toda la home de la referencia. Lo único que sí requiere JS son
los reveals de scroll, los tickers y los estados de hover.

---

## 2. SISTEMA BASE

### Breakpoints
| Nombre | Rango |
|---|---|
| `desktop` | ≥ 1200px |
| `tablet` | 810px – 1199px |
| `mobile` | < 810px |

Son solo tres. Toda la especificación de abajo asume que **en `mobile` todo
sticky pasa a `position: relative`** y los bloques se apilan.

### Medidas
- Contenedor exterior máximo: **1440px**
- Contenido máximo: **1200px**
- Medida de texto: **650px** (párrafos), **800–850px** (titulares)
- Padding lateral: **16px** en mobile

### Tipografía — roles a cubrir
| Rol | Uso |
|---|---|
| Display | Titulares grandes |
| Sans de texto | Párrafos y UI |
| Mono | Eyebrows, tags, números de card |
| *Acento manuscrito* | La referencia lo usa para notas sueltas. **Decisión pendiente:** con "crecimiento con control" probablemente sobre. Sugerencia: omitirlo. |

Punto de partida: mantener **Manrope** (display + texto) y **Geist Mono**
(eyebrows y números), que ya son las del sistema actual.

### Paleta — mapeo por ROL, no por valor
La referencia usa azul como base, más naranja, lila y amarillo como acentos sobre
tinta oscura. Lo que se toma es **la estructura de roles**, y cada rol se llena
con el color propio de Velocentum:

| Rol | Función |
|---|---|
| `surface` | Fondo principal, claro |
| `ink` | Texto principal |
| `ink-2` | Texto secundario |
| `brand` | Acento primario, CTA, números |
| `accent-a/b/c` | Chips y categorías (la referencia usa 4–5) |
| `dark` | Único bloque oscuro, el cierre |

---

## 3. LAS TRES MECÁNICAS QUE HAY QUE CONSTRUIR PRIMERO

Todo lo demás es layout. Estas tres son las que producen el efecto.

### M1 — PAR STICKY (apertura)
El bloque A queda **fijado a pantalla completa** y el bloque B **sube por
encima** hasta taparlo.

- Bloque A: `height: 100vh`, `position: sticky`, `top: 0`, `z-index` bajo.
- Bloque B: se apoya inmediatamente después, con fondo opaco y `z-index` mayor.
- En `mobile`: A pasa a `position: relative`, `height: auto`, con padding
  superior generoso (~150px) y padding inferior chico (~56px). Deja de fijarse.

**Dónde se usa:** Home, Hero + bloque "Quiénes somos".

### M2 — TARJETAS APILADAS (sticky stack)
Cada tarjeta de una lista se fija al llegar arriba, y la siguiente **se desliza
por encima** de la anterior. Es el patrón más valioso de toda la referencia.

- Cada ítem: `position: sticky`, `top: 56px`, fondo opaco, `z-index` creciente.
- Se apilan en el mismo contenedor, con `gap` chico (16px, 8px en tablet).
- Cada tarjeta debe ser opaca o el efecto se rompe.
- En `mobile`: `position: relative`, se apilan normal, sin superposición.

**Dónde se usa:** Home, bloque "Qué hacemos" (los cuatro motores).
Una variante del mismo patrón, con `top: 200px` y un padding inferior grande
(~250px, 100px en mobile), se usa para el bloque de logos, que queda fijado
mientras el bloque siguiente sube encima.

### M3 — TICKER (marquee)
Fila horizontal en loop infinito, con los bordes desvanecidos.

- Contenido duplicado y trasladado en X de forma continua.
- Padding vertical: 24px.
- Máscara: `linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)`.
  Esto es lo que hace que no se corte con un borde duro: es el detalle que
  separa un marquee prolijo de uno casero.
- Pausa en hover.
- `prefers-reduced-motion`: detenido.

**Dónde se usa:** chips de capacidades y muro de logos.

### M4 — REVEALS DE SCROLL
Entrada por opacidad + desplazamiento en Y al entrar en viewport, con
`will-change` y `perspective` para las tarjetas que rotan levemente.
Una sola vez, no en cada pasada.

---

## 4. HOME

Once bloques.

### H0 · Nav
Logo, links, CTA. Variantes desktop / tablet / phone (menú desplegable).
Fondo con `backdrop-filter`.
**Contenido:** Método · Casos · Contacto + CTA.

### H1 · Hero  — usa **M1**
- `height: 100vh`, sticky, fondo con la capa de atmósfera.
- Titular editorial partido en tres líneas, con **objetos del sistema
  intercalados en el renglón** (la referencia mete dos íconos de 80×80 dentro
  del titular). Acá van los objetos propios: rayo, prisma, mira, barras — en
  tratamiento **más realista y menos caricaturesco**, según lo pedido.
- Bajada corta + un CTA primario con `glow` en hover.
- **REQUISITO:** el titular tiene que nombrar el segmento. Hoy el copy de la
  `.com` no dice "e-commerce" ni "tienda" ni una sola vez.
- **Interacción de mouse:** la referencia mueve elementos del hero siguiendo el
  cursor. Se reemplaza por una interacción propia, a definir en mockup.
- **Fondo "nube":** el motivo atmosférico gusta y se conserva. Base propia:
  `atmosphere/network.svg` y `atmosphere/orbit.svg`.

### H2 · Quiénes somos — cierra **M1**
Sube por encima del hero.
- Heading con wrap controlado + contorno de texto como recurso gráfico.
- Contenedor de imagen + tag.
- **Imagen:** backstage de shooting.
- **Contenido:** condensado de las tres secciones de argumento actuales
  (cuello de botella / sumar gente no alcanzó / todo apuntando al mismo lado).
- CTA a `/metodo`.

### H3 · Trabajos
Grid de 4 piezas. Cada una: video con poster, estado hover, tag de categoría,
título, y un bloque de texto + botón. Grid de 1 columna con `gap: 20px` que se
reflowea por breakpoint. Variante mobile propia.
- **Contenido:** selección de 4 de los 13 videos, con su rubro.
- CTA a `/casos`.

### H4 · Qué hacemos — usa **M2**
Los **cuatro motores** como tarjetas apiladas.
Cada tarjeta: título grande, descripción, **cuatro sub-servicios numerados
separados por línea**, y contenedor de imagen o video a un lado.
- **CONTENIDO A PRODUCIR: 16 entregables (4 por motor). No existen todavía.**
  Es el ítem que más bloquea, porque sin eso la tarjeta queda vacía.
- **Imagen por tarjeta:** producto de cliente o backstage.

### H5 · Capacidades — usa **M3**
Imagen + tickers de chips de colores en dos filas con direcciones opuestas.
- **Contenido:** los 11 tags que ya existen (Meta Ads, Tracking con CAPI,
  Google Ads, Atribución real, Product Ads, Optimización de ficha, Contenido
  para pauta, GA4, Influencer marketing, Diseño de marca, Web y conversión).

### H6 · Proceso
Tres tarjetas: número grande + ícono en contenedor de 150×150 (100×100 en
mobile) + título + una línea. Variantes de alineación desktop/mobile.
- **Contenido:** versión corta de los cuatro bloques de `/metodo`.
- **Íconos:** objetos del sistema propio.

### H7 · Con quiénes trabajamos — usa **M2** (variante `top: 200px`)
Muro de logos en ticker. Queda fijado mientras H8 sube por encima.
- **Contenido:** los 12 logos reales.

### H8 · Por qué nosotros
Lista de 4 razones con ícono, sobre fondo con la capa de atmósfera.
Alineación a la izquierda, variantes desktop/mobile.

### H9 · Cifras
Tres números grandes con etiqueta.
- **REQUISITO:** verificar atribución antes de portar cualquier cifra desde
  velocentum.agency. Hay una inconsistencia detectada: $629M figura como
  "CASO INDUMENTARIA" en la agency y contra Buy Now (electrodomésticos y hogar)
  en el prompt viejo del landing.

### H10 · Testimonios
Avatar + cita + nombre/cargo/marca, con overlay. Lista con lados
izquierdo/derecho y variantes mobile.
- **BLOQUEADO:** no hay retratos ni permisos. Tres salidas: conseguir 2–3 con
  logo del cliente en lugar de foto; reemplazar por rubros con foto de producto;
  u omitir en V1. **Recomendación: omitir en V1.**

### H11 · Footer
Información + navegación, logo, redes, backdrop, barra inferior.
- **Contenido real todavía pendiente.** No inventar direcciones ni URLs.

---

## 5. MÉTODO

Estructura tomada del `about` de la referencia.

1. **Hero** — imagen a sangre + overlay + texto y forma encima.
2. **Quiénes somos** — tarjetas de lista con número + ícono, alineación
   centrada, variantes desktop/mobile.
3. **Nuestra historia / El método** — bloque de imagen + texto con un elemento
   gráfico suelto de acento.
   → **Contenido:** los cuatro bloques que ya están escritos en la ruta
   `/metodo` actual (qué preguntamos, qué medimos, qué proyectamos, qué
   recomendamos). Son buenos y se reutilizan tal cual.
4. **Equipo** — ítems de miembro con chips de color.
   → **BLOQUEADO por falta de fotos de equipo.** Alternativa: reemplazar por
   "cómo se compone el equipo" con los cuatro motores y foto de backstage.
5. **CTA de cierre** — heading + texto + botón con glow.
6. **Footer.**

---

## 6. CASOS

Estructura tomada del `works` de la referencia. **Esta página resuelve el
agujero actual:** hoy el nav y el CTA "Ver casos" apuntan a una ruta vacía.

1. **Hero** de la página.
2. **Todos los casos** — y acá está la mecánica propia de esta página:
   - **Encabezado sticky** que se desvanece al scrollear ("Heading Disappear").
   - **Overlay fijo** con **blur superior e inferior**: dos franjas
     degradadas arriba y abajo del área de scroll, de modo que las piezas
     entran y salen difuminadas en vez de cortarse contra el borde.
   - Contenedor de scroll con las piezas.
   - Cada caso: imagen o video + texto + logo + botón + tópicos.
3. **CTA de cierre.**
4. **Footer.**

**Contenido:** los 13 videos con rubro y acción, más los paneles de resultado
que se decida traer desde velocentum.agency, con la atribución resuelta.

---

## 7. CONTACTO

1. **Hero.**
2. **Bloque de contacto** en dos columnas:
   - Izquierda: heading + información (oficina, email, redes) separada por línea.
   - Derecha: **formulario** con Nombre y Email en fila, mensaje, y botón de
     envío con estado `disabled` hasta que el form sea válido.
3. **Footer.**

**BLOQUEANTE HEREDADO:** el formulario del sitio actual no tiene destino
(`handleSubmit` es un `preventDefault()` vacío). Hay que definir endpoint,
mail o Calendly antes de publicar. Es decisión del dueño, no técnica.

---

## 8. ORDEN DE TRABAJO

**F1 — Fundaciones.** Repo, stack, tokens, tipografías, layout base, nav y
footer. Y **M1, M2 y M3 como componentes aislados y probados**, antes de
cualquier página. Si las tres mecánicas no funcionan solas, nada de lo demás va
a funcionar.

**F2 — Home**, bloque por bloque, en este orden: H1+H2 (van juntos por M1),
H4, H3, H7, H5, H6, H9, H8, H0, H11.

**F3 — Casos.** Es la página que más credibilidad compra.

**F4 — Método.** Mayormente contenido que ya existe.

**F5 — Contacto** + desbloqueo del destino del formulario.

**F6 — Mobile y reduced motion** de las cuatro páginas.

---

## 9. CONTENIDO A PRODUCIR

| # | Qué | Bloquea |
|---|---|---|
| C1 | Copy del hero nombrando el segmento | H1 y el tono de todo |
| C2 | **16 entregables, 4 por motor** | H4 |
| C3 | Cifras con atribución verificada | H9 |
| C4 | Selección y recorte de backstage y producto | H1, H2, H4, Método |
| C5 | Condensado del argumento en un bloque | H2 |
| C6 | Verificación de los 13 playback IDs contra rubro, acción y poster | H3, Casos |
| C7 | Destino del formulario | Contacto, publicación |
| C8 | Contenido real del footer | H11 |
| C9 | Decisión sobre testimonios | H10 |

---

## 10. DECISIONES PENDIENTES

1. ¿Se conserva algo del sistema de cristal (Crystal 5, objetos, isotipo), o el
   proyecto nuevo arranca con identidad nueva? Los objetos —rayo, prisma, mira,
   barras— son el reemplazo natural de los stickers de la referencia, y en
   tratamiento realista es exactamente lo que pediste.
2. ¿Qué interacción de mouse va en el hero?
3. ¿El acento manuscrito entra o se omite?
4. ¿La `.com` enlaza a velocentum.agency, o son dos propiedades separadas?
5. ¿Testimonios en V1: sí, alternativa o no?
