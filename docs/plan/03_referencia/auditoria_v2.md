# Velocentum · revisión del plan V2

5 de septiembre de 2026. Dirección revisada: una agencia visualmente creativa que comunica crecimiento con control.

**La estructura de cuatro páginas es correcta. El plan todavía no está listo para implementarse literalmente:** combina decisiones vigentes, borradores anteriores y deducciones técnicas demasiado categóricas. Conviene corregir la especificación, sin rehacer la arquitectura.

## Alcance y evidencia

Leí los 12 documentos vigentes del ZIP —índice, cinco archivos de sistema, cinco de páginas y mapa de referencia—, excluyendo el histórico. El ZIP contiene documentación; no incluye el mirror HTML/CSS/JS que algunos textos mencionan. Por lo tanto, no pude auditar ese supuesto código adjunto. Sí abrí las cuatro páginas de LoftyLab e inspeccioné su DOM y estilos calculados en vivo.

La carpeta local disponible es un espacio de documentación y entregables. No encontré `package.json`, lockfile ni un proyecto `src/` identificable en la búsqueda del proyecto. **Framework, versión, router, Tailwind y librería de animación: no determinables con el material recibido.** No corresponde inventar el stack ni instalar fundaciones en esta carpeta.

El pedido actual de revisar y crear identidad reemplaza la dirección anterior de programar F0 y evitar expresividad gráfica. Las afirmaciones [APROBADO] del ZIP describen el estado documentado; las propuestas de esta entrega no se presentan como aprobaciones nuevas.

### Lo que pude comprobar ahora

| Página | Observación de esta revisión |
|---|---|
| [Home](https://loftylab.framer.website/) | Viewport 1452 × 741. Hero sticky a 0, alto 741 px. Cuatro elementos de servicios sticky a 56 px, alto aproximado 599 px; hay cinco servicios en contenido. Clientes sticky a 200 px. No aparecieron filtros activos en la consulta de estilos calculados. Titular condensado, nav blanco, objetos, trabajos inclinados y bloques de color visibles. |
| [About](https://loftylab.framer.website/about) | Cero elementos sticky en la consulta del DOM. Hero fotográfico a sangre y titular blanco. Las cuatro tarjetas y los bloques de historia/equipo existen en el contenido de la referencia. |
| [Works](https://loftylab.framer.website/works) | `Fixed Overlay` sticky a 0. `Top Blur` y `Bottom Blur` son degradados blancos/transparencia, de 74 px con viewport de 741 px. La primera composición tiene identificación a la izquierda, medio al centro, descripción y botón a la derecha. |
| [Contact](https://loftylab.framer.website/contact) | Dos paneles independientes: mensaje visual izquierdo e información/formulario derecho. En desktop, botón de envío vertical junto a los campos. |

**Límite del chequeo móvil:** solicité 390 × 844 mediante el control de viewport, pero la página continuó reportando 1452 × 741. Restablecí el control. No doy por verificada la variante móvil de LoftyLab. Las reglas móviles siguientes son decisiones propuestas para Velocentum.

No volví a medir las duraciones de transición a 60 fps, el inventario completo de keyframes o el código JavaScript compilado. Los números de esos apartados siguen siendo evidencia declarada por el plan, no una nueva verificación mía.

## Correcciones prioritarias

| Prioridad | Archivo / apartado | Problema | Cambio concreto |
|---|---|---|---|
| Alta | `00_LEEME`, `assets_pendientes`, `paleta` | “No alegría gráfica” y “sobrio” conviven con “colorida y prendida”, cinco acentos y el nuevo pedido creativo. | Dirección única: composición expresiva, lenguaje claro y compromisos medidos. La creatividad gráfica no obliga a prometer viralidad ni resultados garantizados. |
| Alta | `01_HOME_estructura`, B0/B1 | Vuelven a pedir `backdrop-filter` y capas con `filter: blur`, contradiciendo el índice y el mapa. | Nav sólido. Atmósfera como imagen propia o gradientes estáticos sin filtros; la equivalencia visual no exige una técnica única. |
| Alta | Índice, mapa y prompt, NUBE | `mask-image: url(...) 50% / cover no-repeat alpha` no es una declaración válida de `mask-image`. | Usar las propiedades separadas o el shorthand `mask`. No copiar literalmente esa línea. |
| Alta | `04_CASOS`, responsive | Afirma que `vh` hace que “se adapte solo” y a continuación admite una variante móvil no observada. | Especificar composición móvil propia y altura natural; quitar esa garantía. |
| Alta | `01_HOME_estructura`, B0/B5/B9 | Pide texto oscuro para todos los estados activos, píldoras y tarjetas. | Aplicar `texto-sobre-X` también en hover, footer y chips: blanco en azul/violeta, tinta en los demás. |
| Alta | Mecánica M4 / Home B2 y B6 | Una misma etiqueta describe doble escala reversible y reveals disparados una vez. | Separar `ScrollMedia` de `Reveal`. Rotaciones de trabajos/servicios constituyen además una variante explícita de scroll. |
| Alta | `05_CONTACTO`, cortina | El dibujo de la cortina está descrito, pero no la navegación, errores, foco, atrás/adelante o clics repetidos. | Definir contrato del router y fallback. `pointer-events:none` por sí solo deja clics atravesar una página tapada. |
| Alta | `02_HOME_copy`, B2 | Párrafo normalizado: 330 caracteres, frente al techo de 190. El propio documento estima otro número. | Sustituir por el párrafo de 154 caracteres propuesto más abajo. |
| Media | `assets_pendientes` | Habla de cuatro acentos, tipografía sin elegir y conservar el logo; `tokens.css` ya tiene cinco acentos, Anton y el pedido actual exige logo nuevo. | Convertirlo en inventario de pendientes, eliminando decisiones antiguas. |
| Media | Espaciado | Prohíbe valores fuera de 4/8/16/32/100/150/250, pero prescribe 20, 24, 48, 50 y 56. Incluso afirma que todo es múltiplo de cuatro. | Distinguir escala de separación, dimensiones funcionales y medidas observadas. Agregar tokens explícitos para los valores elegidos. |
| Media | Home B1 / transición | Titular “una sola vez en carga” frente a “en cada visita”. | Primera visita animada; navegación interna breve o sin repetición. Es una decisión propia, documentarla una sola vez. |
| Media | Método | M1–M5 identifica secciones y también mecánicas globales. | Usar prefijo `MET-` para secciones; reservar `M1–M5` para mecánicas. |
| Media | Números de bloques | B0–B9 son diez unidades incluyendo nav/footer, ocho de contenido, no nueve. Método enumera seis unidades y las llama cinco. | Corregir índices para evitar entregas faltantes o duplicadas. |
| Media | Footer | Logo en círculo en `logo.md`, logo en nube en páginas. | Adoptar V en círculo limpio + palabra; las curvas de sección no envuelven todos los elementos. |
| Media | Datos | Se da por existente un conjunto de 12 clientes / 13 vídeos sin archivos verificables en el ZIP. | Inventario por cliente, uso autorizado, medio, poster y categoría. No rellenar para cumplir una cantidad estética. |

La sintaxis correcta de máscara y sus componentes están documentados por [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask). Aplicaría el recorte a una capa decorativa o al medio, evitando recortar texto, controles y anillos de foco. `cover` puede cortar arcos según la proporción: para bordes de sección, una franja independiente es más estable que una máscara sobre todo el bloque.

## Comparación de composición y función

### Inicio

**Conservar:** hero de gran presencia, explicación breve, dos trabajos seleccionados, cuatro tarjetas de servicios, banda de capacidades, proceso corto, clientes y cierre.

La referencia alterna tipografía enorme, personas/productos reales y campos de color. Si se reemplazan todas las fotografías por iconos, la composición se vuelve genérica. Los objetos nuevos son acentos; el trabajo real tiene que seguir siendo protagonista.

**Orden recomendado:** B1 propuesta → B2 coordinación del equipo → B3 trabajos → B4 servicios → B5 capacidades → B6 proceso → B7 clientes → B8 diagnóstico. B0 y B9 son navegación global.

El primer caso ya aporta prueba temprano. No hace falta añadir un bloque de resultados inventados. Pero “Casos” debe explicar qué se hizo: una galería de vídeos sin intervención ni contexto funciona como portfolio de producción, no como evidencia de performance.

Dos ajustes visuales: máximo dos objetos en el hero, sin reemplazar letras; en B2 un objeto como máximo. Usar el borde orgánico en cambios grandes de sección, no en cada tarjeta. Conservar el apilado en B4 y el cierre azul, donde su efecto tiene una función clara.

### Método

**Conservar:** hero fotográfico, introducción, cuatro pasos en 2 × 2 y cierre. Quitar historia y equipo de la plantilla es razonable para esta versión.

**Corregir la duplicación:** Home cuenta el proceso en una frase por paso; Método debe agregar qué se revisa, qué entregable sale y qué decisión habilita. Usar los mismos cuatro nombres en ambas páginas: Preguntamos, Medimos, Proyectamos, Recomendamos. Hoy las dos páginas parecen nombrar procesos distintos.

El hero con CTA necesita altura según contenido, especialmente con zoom o ventana baja. Una foto con overlay fuerte sigue necesitando buena composición y autorización; “cualquier foto sirve” no es un criterio suficiente.

### Casos

**Conservar:** tres columnas en desktop, un proyecto dominante y apertura del encuadre. Reemplazar `More Detail` por chips de trabajo es coherente si no habrá subpáginas.

Cada caso debe contener: marca/rubro → situación → intervención concreta → pieza o evidencia → alcance. Si no hay resultados validados, describir la intervención sin atribuirle un incremento. Una métrica aprobada puede incorporarse como apoyo, aunque los análisis detallados vivan en la otra propiedad; eso sería una decisión nueva, no algo autorizado por el ZIP.

No forzar ocho casos iniciales: seleccionar por calidad y variedad. Si se mantienen ocho más cuatro, mostrar cantidad pendiente, dejar el centinela después del último caso y anunciar la ampliación de la lista. La ausencia de un botón no “rompe” por sí sola la composición: un texto, chips y espacio bien distribuido pueden resolverla.

En móvil: identificación → medio → intervención/chips, altura natural. Propongo identificar antes el trabajo para que se sepa qué se está mirando. El orden diferente sugerido en V2 también es viable, pero debe elegirse uno y coincidir con el orden del DOM.

### Contacto

**Conservar:** panel expresivo y panel funcional. Elegiría campo oscuro con un objeto y titular breve; evita depender de otra foto de backstage.

**Reordenar según el objetivo real:** reservar una llamada debe ser la acción principal. Si la agenda está disponible, mostrarla directamente o ofrecer su enlace principal; el formulario queda como alternativa. No pedir primero un formulario largo y luego repetir datos en el calendario.

Si se conserva el formulario, usar Nombre, Email, URL de la tienda y Mensaje opcional. Etiquetas persistentes, errores claros, confirmación y botón horizontal con texto. La columna vertical de la referencia es expresiva, pero una flecha aislada comunica peor qué ocurrirá. No sumar horarios o promesas de respuesta para llenar el espacio.

## Copy propuesto para encajar

Todo este copy es **propuesta**, no nuevas afirmaciones comerciales verificadas.

| Lugar | Texto |
|---|---|
| Home hero, tres líneas | HACEMOS CRECER / TIENDAS QUE / YA VENDEN |
| Home bajada | Estrategia, contenido, pauta y conversión. Un mismo equipo, un plan claro y decisiones con tus números. |
| Home B2, 154 caracteres | Tu tienda ya vende. Coordinamos estrategia, contenido, pauta y conversión para que cada decisión responda al mismo plan y puedas ver qué está funcionando. |
| CTA principal | Reservá tu análisis ↗ |
| Proceso 01 | Preguntamos · Tu negocio, tus márgenes y tus objetivos. |
| Proceso 02 | Medimos · Dónde se frena el crecimiento. |
| Proceso 03 | Proyectamos · Escenarios con supuestos claros. |
| Proceso 04 | Recomendamos · Prioridades e inversión, por escrito. |
| Método hero | PRIMERO ENTENDER. / DESPUÉS PROPONER. |
| Método cierre | Empecemos por entender. |
| Casos encabezado | TRABAJO EN ACCIÓN |
| Contacto panel | HABLEMOS / DE TU TIENDA. |

El hero de Método tiene 17 caracteres por línea; definir una excepción de 18 en esa página. No reducir la fuente arbitrariamente para satisfacer un máximo global de 16. La longitud en caracteres es una guía editorial: el ancho real depende de la fuente, el tamaño y las palabras. Validar con fuente cargada a 390/810/1200 y con zoom; permitir reflow.

Los 16 entregables requieren confirmación operativa. En particular, “atribución real” sugiere certeza total: propondría “Medición y atribución por canal”. “Influencer marketing” y “Contenido para pauta” tienen 20 caracteres cada uno y entran en el presupuesto; la bajada actual de Medimos tiene 48 y supera el límite de 45.

La promesa “45 minutos, sin costo; diagnóstico y proyección” está registrada como aprobada en el plan, pero antes de publicar debe seguir coincidiendo con el servicio que efectivamente se entrega.

## Viabilidad de animaciones y especificación corregida

Las cinco mecánicas son técnicamente habituales en la web; **su integración concreta no puede certificarse sin el repositorio**. M5 es la que depende más del sistema de navegación.

| Pieza | Propuesta de comportamiento | Móvil / movimiento reducido |
|---|---|---|
| M1 · Hero y siguiente bloque | Sticky con padre que incluya ambos; capa siguiente opaca. Validar stacking context y altura disponible. | Flujo normal bajo 810 px; también desactivar si el contenido excede la altura útil. En modo reducido, sin superposición. |
| M2 · Servicios | Wrapper sticky; tarjeta interior con rotación muy leve que vuelve a cero. Offset ligado al espacio realmente ocupado por el nav. | Cards en flujo normal. No adoptar 56 px ciegamente si tapa título o controles. |
| M3 · Capacidades / clientes | Un solo sistema con pista duplicada visualmente, copias fuera del árbol accesible y control de pausa. Evitar dos bandas activas en el mismo viewport. | Pausa visible también por touch; modo reducido estático y con wrap o desplazamiento manual. |
| M4 · Medios | Marco 0.7 → 1 e imagen 1.3 → 1 como punto de partida; recorrido definido por entrada al viewport hasta posición de lectura. Texto sin escala. | Reducir amplitud o mostrar escala 1 directamente. Ningún contenido empieza permanentemente oculto. |
| M5 · Cortina | Tapar desde abajo, cambiar ruta bajo cobertura, destapar hacia arriba. Propuesta 300 + 300 ms; sin espera artificial. | Navegación inmediata o fundido de 100 ms. No animar al abrir nueva pestaña o enlaces externos. |
| Reveal · separado de M4 | Opacidad y desplazamiento breve de 12 px, 240 ms, escalonado de 50 ms. Una vez por bloque. | Contenido completo sin animación. |
| Objetos | Hover/foco: rotación máxima 4° y desplazamiento 4 px en 180 ms. No información exclusiva de hover. | Estáticos con touch o movimiento reducido. |
| Cursor | Complemento opcional para puntero fino, con fallback al cursor nativo y sin tapar campos. | Cursor nativo; no cursor personalizado en touch ni requisito para usar el sitio. |

Los tiempos anteriores son recomendaciones propias, no valores medidos en LoftyLab.

### Precisiones técnicas necesarias

1. **Ausencia de `@keyframes` no demuestra ausencia de animación.** JavaScript, Web Animations y estilos inline pueden producirla. Una muestra estática de 1,6 segundos tampoco permite declarar inmóviles todos los tickers, vídeos y carruseles de toda la página.
2. **Sticky no produce la rotación.** El pin y el cambio de transform son mecanismos distintos. Los transforms también generan contextos de apilado; separar wrappers reduce conflictos.
3. **Doble escala no es compensación exacta:** 0,7 × 1,3 = 0,91. Si se quisiera una imagen de escala neta constante, usar inversa 1/escala del marco. Para un efecto aproximado, los valores V2 son una referencia visual válida.
4. **Perspectiva no cambia una escala 2D por sí sola.** Mantener 1200 px solo si existe transformación con componente de profundidad y aporta un efecto buscado.
5. **Transform suele ser favorable, pero GPU no está garantizada.** Tampoco todo `clip-path` recalcula layout. Elegir `transform`/`opacity` es una buena base y después medir composición y pintado en los dispositivos objetivo. [Guía de web.dev](https://web.dev/articles/animations-guide)
6. **M5 necesita estado y recuperación:** ignorar navegación repetida durante el cambio, manejar error de carga, liberar la cortina, restaurar scroll según navegación y enviar foco al contenido nuevo. Precargar no garantiza que desaparezca toda espera. No alterar atrás/adelante ni atajos de enlaces.
7. **Pausa explícita:** `prefers-reduced-motion` no reemplaza el control para contenido que se mueve automáticamente durante más de cinco segundos junto a otro contenido. [W3C, Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
8. **Vídeos:** poster, reproducción sin sonido, `playsinline`, carga diferida y pausa fuera de vista. Si contienen diálogo relevante, incluir subtítulos. No iniciar 13 reproductores a la vez.
9. **Titular por letras:** un único H1 con nombre accesible completo; spans decorativos sin generar una lectura letra por letra por el lector de pantalla.
10. **Accesibilidad desde F0:** mover responsive, teclado, zoom y movimiento reducido desde F5 a los criterios de cada componente. Al final se hace la revisión integrada, no la primera adaptación.

## Contraste recalculado

Calculado en sRGB con los hex de `tokens.css`. Se confirma la tabla principal del plan para estos pares, no la accesibilidad completa del sitio.

| Fondo | Blanco | Tinta #141024 | Texto elegido |
|---|---:|---:|---|
| Azul #1F6BFF | 4,56:1 | 4,08:1 | Blanco |
| Bermellón #F5451F | 3,65:1 | 5,09:1 | Tinta |
| Verde #00C878 | 2,20:1 | 8,44:1 | Tinta |
| Violeta #8A3FFC | 5,00:1 | 3,72:1 | Blanco |
| Amarillo #FFC300 | 1,61:1 | 11,56:1 | Tinta |
| Rosa #FF1F6B | 3,71:1 | 5,01:1 | Tinta |

La regla “rosa = acción” pierde fuerza si se permite rosa en detalles decorativos sin límite. Propongo reservarlo a CTA y estados de interacción; usar logotipo e isotipo en negro/blanco como pidió Matías. Los colores de las ilustraciones tienen luces y sombras: no son muestras planas para colocar texto encima.

## Qué falta realmente para construir y publicar

**Para cerrar especificación:** adoptar una fuente de verdad, aprobar esta dirección visual, confirmar los 16 entregables y localizar el repositorio. **Para publicar:** datos de contacto, destino de agenda/formulario, medios reales y atribuciones correctas. La discrepancia de $629M identificada en el plan sigue sin verificar; no usar esa cifra ni derivar un promedio de ella.

No tocar `velocentum.agency`. La implementación debe salir del plan corregido y assets propios. La referencia se usa para estudiar composición y comportamiento, no para reutilizar su código, fotografías o iconos.
