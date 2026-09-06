# TIPOGRAFÍA — V3

| Rol | Familia | Uso |
|---|---|---|
| Display | **Anton** | Hero y titulares de sección. Mayúsculas, un peso |
| Texto | **Manrope** | Párrafos, tarjetas, UI |
| Mono | **Geist Mono** | Numeración, categorías, etiquetas |

## Escala

- **Anton:** hero 72–144px desktop según ancho, 56–80px móvil. Interlínea ~0,95.
  Ajustar por contenido, sin recortar. **No usarla fuera de titulares.**
- **Manrope:** cuerpo 18px desktop / 16px móvil, interlínea 1,5.
  Títulos de tarjeta 28–36px desktop, 24–28px móvil.
- **Geist Mono:** 12–14px. Nada de párrafos largos en mono.

## Presupuesto de caracteres

**Es una guía editorial, no una regla dura.** El ancho real depende de la fuente,
el tamaño y las palabras. Validar con la fuente cargada a 390/810/1200 y con
zoom 200%, permitiendo reflow. **No reducir el tamaño de fuente arbitrariamente
para cumplir un máximo.**

| Slot | Guía |
|---|---|
| Titular de hero, por línea | 16 car. · **excepción de 18 en Método** |
| Bajada de hero | 120 car. |
| Texto de botón | 22 car. |
| Párrafo expresivo de Home | 190 car. |
| Titular de sección display | 20 car. en un renglón · **40 en dos renglones** |
| Título de tarjeta de servicio | 24 car. |
| Descripción de tarjeta de servicio | 120 car. |
| Entregable | 34 car. |
| Píldora | 20 car. |
| Título de tarjeta de proceso | 14 car. |
| Bajada de tarjeta de proceso | 45 car. con 4 columnas |
| Nombre de cliente bajo el logo | 18 car. |
| Titular de cierre | 28 car. |

El castellano corre 20-25% más largo que el inglés y el layout de la referencia
está calibrado para inglés. Donde no entre, se acorta el texto antes que
agrandar la caja.

### La excepción de dos renglones

`Titular de sección display` son dos slots con un mismo nombre. Los 20
caracteres salieron de medir `Our works` y `Our services`, que son de **un
renglón**. Un titular que envuelve en **dos** dentro de `--medida-titular`
admite **40**, y no hay que achicarle el cuerpo para forzarlo a uno.

Caso construido: el titular de B2, `UN EQUIPO DE CRECIMIENTO PARA TU NEGOCIO`,
40 caracteres. Medido con la fuente cargada: dos renglones a 390, 500 y 1370px,
y a zoom 200%. Ver `02_paginas/02_HOME_copy.md`.
