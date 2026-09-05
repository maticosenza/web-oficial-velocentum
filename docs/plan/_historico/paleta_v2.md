# PALETA — VELOCENTUM.COM

Dirección: colorida y prendida, sobre fondo claro.
**Corrida deliberadamente respecto de LoftyLab** para no replicar su paleta.

## Los cinco acentos

| Rol | Hex | Página | Texto encima | Contraste |
|---|---|---|---|---|
| `acento-1` | `#1F6BFF` azul | Inicio | blanco | 4.56:1 |
| `acento-2` | `#F5451F` bermellón | Método | tinta | 5.09:1 |
| `acento-3` | `#00C878` verde | Casos | tinta | 8.44:1 |
| `acento-4` | `#8A3FFC` violeta | Contacto | blanco | 5.00:1 |
| `acento-5` | `#FFC300` amarillo | — solo ciclos | tinta | 11.56:1 |

**Todos pasan WCAG AA.** El color de texto no es opcional: sobre azul y violeta
va blanco, sobre los otros tres va tinta. Poner tinta sobre el azul baja a
4.08:1 y deja de cumplir.

## Por qué están corridos respecto de la referencia

| Lofty | Nuestro | Qué cambia |
|---|---|---|
| `#4797ff` celeste | `#1F6BFF` | más saturado y más profundo |
| `#ff742e` naranja salmón | `#F5451F` | corrido hacia el rojo |
| verde menta suave | `#00C878` | esmeralda vivo, no pastel |
| `#e5a0fa` lila pastel | `#8A3FFC` | violeta con cuerpo |
| `#f8f47c` amarillo pálido | `#FFC300` | dorado saturado |

Misma energía, hues propios. Ya tomamos su estructura y sus mecánicas; tomar
además su paleta haría el sitio indistinguible de una plantilla que cualquier
competidor compra por sesenta dólares.

## La regla del rosa

`--marca: #FF1F6B` se usa **solo en CTAs, isotipo y detalles de marca.**
Nunca en tarjetas, anillos ni píldoras.

El motivo es funcional: si el rosa aparece únicamente en botones, el visitante
aprende en tres segundos que rosa = acción. Es lo que mantiene legible un
sistema de cinco colores. Y de paso conserva el único vínculo con el isotipo
actual y con velocentum.agency, que comparten píxel.

Texto sobre el rosa: **tinta**, no blanco — 5.01:1 contra 3.71:1. Coincide con
la referencia, donde los botones llevan texto oscuro.

## Dónde va cada color

| Lugar | Cómo se reparte |
|---|---|
| Links del nav | uno por página, acentos 1 a 4 |
| Rectángulos del footer | ídem |
| Cortina de transición | del color de la página de destino |
| Tarjetas de servicio, Home B4 | acentos 1 a 4, en orden |
| Tarjetas de proceso, Home B6 | acentos 1 a 4, en orden |
| Tarjetas de método, M3 | acentos 1 a 4, en orden |
| Anillos de logos, Home B7 | los cinco, en ciclo sobre 12 |
| Píldoras, Home B5 | los cinco, en ciclo sobre 11 |
| CTAs | `--marca` |

Con cinco acentos y cuatro páginas sobra uno, y es deliberado: el quinto rompe
el patrón en los ciclos de 12 y de 11 para que no se lea como una repetición.

## Fondo del hero

`--cielo: #A8D5FF`. Es **tono de fondo, no acento.** Tiene que ser bastante más
claro que `--acento-1` o el link de Inicio en el nav se pierde contra él.
