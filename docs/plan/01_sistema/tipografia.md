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
| Titular de sección display | 20 car. en un renglón · **25 en dos renglones** |
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
renglón**. Un titular que envuelve en **dos** dentro de `--medida-titular` da
más, y no hay que achicarle el cuerpo para forzarlo a uno.

Caso construido: el titular de B2, `UN EQUIPO PARA TU NEGOCIO`, **25
caracteres** en dos renglones.

**El techo de este slot bajó de 40 a 25**, porque el titular se acortó. Los 40
correspondían a `UN EQUIPO DE CRECIMIENTO PARA TU NEGOCIO`, que ya no existe. Lo
que se conserva de aquella anotación es la distinción entre un slot de un
renglón y uno de dos, no el número.

---

## Relieve de los botones

Todos los botones del sitio suben 2px y toman una sombra al pasar el mouse. No
es sólo del CTA: es el estado de hover del sistema.

**No lo reciben los botones deshabilitados,** ni con `disabled` ni con
`aria-disabled`: un control que no responde no puede parecer que responde. Es el
caso del CTA de la agenda, en el hero y en B8.

La sombra usa tinta con alfa y no un token de color, porque es una sombra y no
un color de marca: tiene que funcionar igual sobre el crema, sobre el campo azul
de B8 y sobre el footer oscuro.

Con movimiento reducido se va el desplazamiento pero **queda la sombra**: el
cambio de estado sigue siendo visible, que es lo que importa; lo que se saca es
el movimiento.
