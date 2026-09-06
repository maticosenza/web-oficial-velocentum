# IDENTIDAD — V3 CONFIRMADA

## Decisiones tomadas

| Elemento | Decisión |
|---|---|
| **Isotipo** | La **V inflada** de `assets/velocentum-isotipo-*.png` |
| **Logotipo** | La palabra `velocentum` en la versión **redondeada pesada** del zip de identidad, que es la que combina con la V inflada |
| **Objetos** | Los cuatro 3D del zip: rayo, foco, barras, conexión |
| **Paleta** | Sin cambios respecto de V2. Cinco acentos + rosa de CTA |
| **Tipografía** | Anton display · Manrope texto · Geist Mono etiquetas |

## Uso del logo

**Palabra completa en el nav de desktop.** V como firma secundaria en favicon,
avatar, footer **y nav móvil**. El círculo es un contenedor opcional, no parte
de la V.

No rotar ni estirar el logo. Las rotaciones pertenecen a los objetos.
Sin sombras, degradados ni textura añadidos. Negro sobre claro, blanco sobre
oscuro.

**Zona libre:** un cuarto del alto del símbolo alrededor.
**Wordmark en nav:** ancho óptico ~160–190px. **Sólo desktop.**

**En el nav móvil va el isotipo, no el wordmark.** La V dentro de un círculo de
44px, blanca sobre campo oscuro. No es una preferencia: con la palabra completa
la card no entra en una sola fila a ningún ancho de teléfono. Medido, a 390px
quedan 334px útiles y al wordmark le sobrarían 90px contra los 160–190 del
rango; achicarlo hasta ahí sería romper la identidad para salvar el layout.
Esta hoja ya admite la V como firma secundaria en avatar, y el nav móvil entra
en ese uso.
**V:** probar silueta a 16, 24, 32 y 48px antes de aprobar.

## ⚠ BLOQUEANTE: los archivos entregados no son usables como están

Verificado sobre `manifest-assets.json` y los propios PNG:

| Archivo | Modo | Alfa | Estado |
|---|---|---|---|
| `velocentum-logotipo-negro.png` | RGB | **NO** | fondo blanco sólido |
| `velocentum-logotipo-blanco.png` | RGB | **NO** | fondo negro sólido |
| `velocentum-isotipo-blanco.png` | RGB | **NO** | fondo negro sólido |
| `velocentum-isotipo-negro.png` | RGBA | sí | usable |
| Los cuatro objetos | RGBA | sí | usables |

**Sin canal alfa, el wordmark no se puede poner en el nav ni sobre ninguna
superficie de color.** Hace falta reexportar con transparencia, o el vector.

Además: son propuestas raster generadas, no un máster vectorial. Antes de
producción hay que fijar **una única geometría** y derivar la inversa de ella;
hoy las versiones negra y blanca tienen diferencias de generación, y las dos `e`
del wordmark no son idénticas.

## Biblioteca de objetos

| Objeto | Significado | Dónde | Evitar |
|---|---|---|---|
| Rayo amarillo | Activar una prioridad | Hero, creatividad, cierre | Sugerir resultados instantáneos |
| Foco azul | Entender, diagnosticar | Diagnóstico, primer paso de Método | Cuatro focos en la misma sección |
| Barras verdes | Medir y proyectar | Proceso, Método | Presentarlo como gráfico con datos |
| Conexión violeta | Coordinar disciplinas | Home B2, Contacto | Sustituir casos reales por ilustraciones |
| `borde-onda.svg` | Cambio de sección | Home B2 y B8 | Festonear cada caja y cada foto |
| `destello.svg` | Énfasis puntual | Junto a etiqueta o titular | Ruido detrás de texto |
| `flecha.svg` | Dirección | CTA, señal de continuación | Fingir interacción inexistente |

**Tamaños ópticos:** hero 80–120px · inline 32–48px · proceso 112–150px ·
Método 150–200px. En móvil bajar 25–35%. No rotar más de 6°.

Los objetos tienen luces y sombras propias: **usar los hex de los tokens en CSS,
no muestrear sus sombras.**

**Regla de composición por pantalla:** un campo dominante, un acento y el CTA.
No mostrar los cinco colores en la misma pantalla. El color identifica página y
estructura; el objeto identifica significado.
