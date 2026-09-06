# PLAN VELOCENTUM.COM — **V3 · FUENTE ÚNICA DE VERDAD**

5 de septiembre de 2026.
Consolida el plan V2 más la auditoría de identidad. **Reemplaza a todo lo anterior.**
Si algo de `_historico/` contradice esto, manda esto.

Proyecto nuevo. Cuatro páginas: **Inicio · Método · Casos · Contacto.**
Objetivo del sitio: que el visitante reserve una llamada de diagnóstico.
No se toca `velocentum.agency`.

---

## DIRECCIÓN — decidida en V3

**Composición expresiva, copy prudente.**

Marca con presencia gráfica: titulares condensados grandes, campos de color,
objetos 3D con significado, mucho aire entre bloques. Y lenguaje rioplatense
concreto, sin urgencia artificial, sin emojis, sin prometer viralidad ni
resultados garantizados.

**Queda derogada la regla del V2 "ante la duda, elegir lo más sobrio".**
La creatividad gráfica no obliga a exagerar en el copy: son dos ejes separados.

---

## MAPA DE LA CARPETA

| Carpeta | Contenido |
|---|---|
| `01_sistema/` | tokens, identidad, tipografía, lámina visual |
| `02_paginas/` | estructura, animaciones, responsive y copy por página |
| `03_referencia/` | LoftyLab decodificado + auditoría del V2 |
| `assets/` | logos, cuatro objetos, tres SVG, manifiesto |
| `_historico/` | **derogado. No leer como instrucción** |

---

## LA REFERENCIA Y SU LÍMITE

LoftyLab es una plantilla **paga** de Framer.

**Se estudia:** ritmo, jerarquía, superposición y distribución de contenido.
**No se copia:** código, CSS, JS, SVG, fotos, íconos, tipografías ni copy.
**El tono no se toma:** su estética es de stickers y alta energía para agencias
de social media. Acá el copy es concreto y prudente.

Todo dato está marcado `[VERIFICADO]` o `[INFERIDO]`. Respetar la distinción.

---

## COMPONENTES — nombres definitivos

**No usar M1–M5 como sinónimo de "cualquier animación".** Son siete piezas
distintas y cada una es un componente propio:

| Componente | Qué hace |
|---|---|
| `HeroSticky` | Hero a `100vh` fijado; el bloque siguiente sube encima. Se apaga bajo 810px |
| `ServiceStack` | Tarjetas `sticky` a 56px, fondo opaco, `z-index` creciente. Se apaga bajo 810px |
| `Ticker` | Loop horizontal con máscara que difumina el 10% de cada borde. Pausa visible |
| `ScrollMedia` | Marco `0.7→1` con la imagen `1.3→1`, atado al scroll. **El texto no escala** |
| `Reveal` | Opacidad + 12px de Y, 240ms, escalonado 50ms. **Una vez.** Es otra cosa que ScrollMedia |
| `SectionEdge` | Borde de onda por máscara, sobre capa decorativa |
| `RouteCurtain` | Cortina de transición entre páginas. 300 + 300ms |

**Numeración de páginas:** Home usa `B0–B9` (ocho de contenido más nav y footer).
Método usa `MET-0` a `MET-5`. No se cruzan.

---

## SEIS COSAS QUE CONTRADICEN LO OBVIO

Salieron de medir. **No las "corrijas":**

1. **No hay `filter` ni `backdrop-filter` en toda la referencia.** El nav es
   sólido. El degradado del hero es una imagen, no un blur de CSS.
2. **No hay `@keyframes` en la home.** Casi todo el efecto es `sticky` puro.
   *(Ausencia de keyframes no prueba ausencia de animación: puede venir de JS.)*
3. **El movimiento del mouse es un cursor custom**, no parallax.
4. **En reposo la página está estática.** Las nubes no flotan.
5. **Los "blur" de Casos no son blur:** degradados blancos planos de `10vh`.
6. **`mask-image: url(...) 50%/cover no-repeat alpha` NO ES VÁLIDO.**
   Van las propiedades separadas. Ver `01_sistema/tokens.css`.

---

## ORDEN DE CONSTRUCCIÓN

**F0 — Fundaciones.** Inspeccionar el repo, tokens, tipografías, nav y footer.
Los siete componentes aislados, cada uno con página de prueba.
**Accesibilidad desde acá:** teclado, zoom, foco y movimiento reducido son
criterio de cada componente, no una fase final.

**F1 — Home**, bloque por bloque. **F2 — Casos.** **F3 — Método.**
**F4 — Contacto.** **F5 — Validación integrada.**

---

## PENDIENTES REALES

**Bloquean construir:**
1. Identificar repo, framework, router, Tailwind y librería de animación.
2. **Logos con canal alfa.** Los entregados son RGB sin transparencia y no se
   pueden usar en el nav. Ver `01_sistema/identidad.md`.

**Bloquean publicar:**
3. Destino de la agenda o del formulario. Recomendación: agenda como acción
   principal, formulario como alternativa.
4. Mail, teléfono y redes reales. No se inventan.
5. Los 16 entregables de la Home B4, confirmados operativamente.
6. Copy de los casos, e inventario por cliente: uso autorizado, medio, poster,
   categoría. No rellenar hasta ocho por estética.
7. Los 13 playback IDs verificados.
8. **No usar la cifra de $629M hasta resolver su atribución**, ni derivar de ella
   un promedio.

---

## DECISIONES ABIERTAS

| # | Decisión |
|---|---|
| ~~1~~ | ~~Titular del hero: A, B, C o D~~ — **DECIDIDO Y CONSTRUIDO.** Ver abajo |
| 2 | "Inicio" u "Home" en el nav |
| 3 | Panel izquierdo de Contacto: campo oscuro con objeto, o foto |
| ~~4~~ | ~~Qué reemplaza al botón por caso~~ — **DECIDIDO: chips de intervención.** Ver abajo |
| ~~5~~ | ~~Si `RouteCurtain` es viable en el stack real~~ — **SÍ.** Construido en `src/componentes/RouteCurtain.tsx` y en uso: B2 enlaza a `/metodo` con `EnlaceConCortina` |

---

## EL BOTÓN POR CASO — DECIDIDO

En Casos **no va botón por caso.** En su lugar van los tópicos de intervención
como chips debajo del párrafo —Meta Ads, Tracking con CAPI, Contenido para
pauta— tomados de las 11 capacidades. Es la salida **c** del documento de Casos.

No inventa destinos que no existen, llena la columna derecha y le dice al
visitante qué se hizo en cada caso.

**Consecuencia para B3 · Trabajos, en la home:** las tarjetas tampoco son
enlaces individuales. El único destino del bloque es el botón a `/casos`, y las
tarjetas no llevan estado de hover, porque un hover sobre algo que no responde
al click promete una interacción que no existe. Queda así.

---

## TITULAR DEL HERO — DECIDIDO

No se eligió ninguna de las cuatro opciones A–D del documento de copy. El
titular es:

> EQUIPO DE CRECIMIENTO *(eyebrow)*
> **ESTAMOS EN EL / NEGOCIO DE HACER / CRECER NEGOCIOS**

Construido en `src/bloques/B1Hero.tsx`. Las tres líneas miden 13, 16 y 15
caracteres, dentro del techo de 16 por línea.

**Queda derogada la dependencia "eyebrow según la opción elegida"** del
documento de copy: el eyebrow es `EQUIPO DE CRECIMIENTO`, no
`PARA TIENDAS QUE YA VENDEN`.

**El hero no nombra al segmento e-commerce, y es deliberado.** Registro amplio
en la `.com`; la especificidad de e-commerce vive en `velocentum.agency`. Es el
reparto entre los dos sitios, no un pendiente. No reabrir.

La bajada también quedó decidida: `Estrategia, contenido, pauta y conversión. Un
mismo equipo, un plan claro y decisiones con tus números.`
