# PLAN HOME V2 — VELOCENTUM.COM

Versión: 2026-09-05
Estado: **borrador de dirección. Nada aprobado. No implementar.**
Reemplaza en dirección, no en autoridad, a `docs/PLAN_MAIN_HOME.txt`.
Hasta que este documento se apruebe, la fuente de verdad sigue siendo el plan viejo.

---

## 0. QUÉ ES ESTE DOCUMENTO

Es el plan de la reestructuración de la home de velocentum.com sobre fondo claro,
tomando como referencia **estructural** la plantilla LoftyLab.

Orden de trabajo obligatorio, igual que en el plan anterior:
estructura → mockup → aprobación → registro → implementación → auditoría.
Una sección por vez.

---

## 1. DECISIONES TOMADAS

| # | Decisión | Estado |
|---|---|---|
| D1 | La home pasa a **fondo claro**. | Tomada |
| D2 | LoftyLab es referencia **estructural y de ritmo**, nunca de tono ni de código. | Tomada |
| D3 | La data dura (facturación, capturas de Meta Ads, ROAS) vive en **velocentum.agency**. La `.com` es marca, trabajo y método. | Tomada |
| D4 | El rol del Crystal 5 y del sistema de cristal **se decide con mockups**, no por escrito. | Pendiente de F0 |
| D5 | Material fotográfico disponible: **backstage de shootings** y **fotos de producto de clientes**. No hay fotos de equipo ni retratos. | Verificado |

### D2 — Límite explícito sobre LoftyLab

LoftyLab es una plantilla **paga** del marketplace de Framer, con licencia de un tercero.

**NO se toma de ahí:** código, CSS, JS, SVG de stickers, íconos, fotografías,
tipografías ni copy. Ni un archivo.

**SÍ se toma:** el vocabulario de composición (cards de servicio con entregables
numerados, grid de trabajos con tag de categoría, franja de cifras, marquee,
proceso en tres pasos, CTA final full-bleed) y el ritmo de densidad informativa.
Eso es vocabulario común de la web y se reconstruye de cero en el stack propio.

**Tono: NO se toma.** LoftyLab se vende como plantilla de estética "sticker,
paleta vibrante, alta energía" para agencias de social media que venden viralidad.
Velocentum es "crecimiento con control": sobrio, sin urgencia artificial, sin
emojis. Si el rediseño importa el tono junto con la estructura, contradice el
posicionamiento. **Lo que se busca de la referencia es claridad, densidad y
presencia de mundo real. No es alegría gráfica.**

---

## 2. RIESGOS ABIERTOS

### R1 — El fondo claro y el sistema de cristal están en conflicto. Es el riesgo principal.

`docs/DESIGN_SYSTEM_CRYSTAL.txt` construye el cristal con materiales rosa, grafito
y vidrio, reflejos localizados y aristas encendidas. Todo eso está calibrado
**para fondo oscuro**. Sobre blanco pierde contraste, el glow desaparece y las
caras casi transparentes se vuelven invisibles.

Esto ya está documentado en el propio repositorio: la Sección 08 —única sección
clara de la home actual— tuvo que cambiar la sombra del fragmento porque
*"el drop-shadow negro se lee como una mancha sucia sobre fondo blanco"*.
Ese problema, que ahí era una excepción, ahora pasa a ser la regla en toda la página.

**Consecuencia concreta:** la explosión del Hero (18 facetas rosa saliendo hacia
los bordes) sobre blanco corre riesgo de leerse como confeti, no como cristal
estallando. Y esa coreografía —única explosión, única reconstrucción, Hero → 09—
es lo más caro que ya está construido: incluye la API por faceta de
`CrystalFiveApproved`, su harness de verificación y los 19 errores de tipado que
se cerraron para habilitarla.

**Esto se resuelve en F0, antes de tocar cualquier otra cosa.** No se avanza a
ciegas y no se descubre a mitad de camino.

### R2 — No hay fotografía de personas, y es de donde sale buena parte de la sensación de "profesional".

LoftyLab tiene caras humanas en el hero, en el bloque de equipo, en las cinco
cards de servicio, en los cuatro testimonios y en el cierre. Nada de eso es real
—son fotos de stock y personas inventadas— pero produce el efecto.

Velocentum no tiene retratos ni foto de equipo. **Pero no las necesita**, porque
tiene tres capas de imagen real que la plantilla no tiene:

1. **Backstage de shootings** — hay gente, set, cámara, producción. Es la capa
   humana, y es auténtica.
2. **Fotos de producto de clientes** — es la capa de mundo real y de rubro.
3. **13 videos verticales** (`Trabajos.tsx`) — sus posters son, de hecho, la
   fotografía más fuerte del sitio. Sobre fondo claro dejan de ser miniaturas
   detrás de un play y pasan a ser la imagen principal.

**Lo que se cae por falta de material:** el bloque "quiénes somos" con foto de
equipo y los testimonios con retrato. Ver bloque 08.

### R3 — El nav de tema dual se invierte.

Hoy: nav oscuro, con una única transición a claro en la Sección 08.
En V2: nav claro por defecto, con transición a oscuro solo si el cierre queda oscuro.
La lógica de transición progresiva en franja de ~100 px sigue valiendo; cambia el signo.

### R4 — Bloqueos de publicación que ya existían y que este rediseño NO resuelve.

- `handleSubmit` en `Contacto.tsx` es un `preventDefault()` vacío: el formulario
  no tiene destino. **Bloquea publicación.**
- Los 13 playback IDs de Mux nunca se verificaron contra categoría, acción y
  poster real. **Bloquea publicación.**
- `/casos` está vacía (31 líneas, un `<h1>`), y el nav y la 07 la linkean.
  Con D3, o linkea a `.agency`, o se construye, o sale del nav. **Decidir.**
- No existen mockups mobile de ninguna sección.

---

## 3. QUÉ SE CONSERVA Y QUÉ SE ARCHIVA

### Se conserva sin discusión
- Paleta, tipografías (Manrope / Geist Mono) y jerarquía tipográfica.
- Isotipo y `BrandLogoMark`.
- Sistema CTA y `BrandCTA` (con la corrección pendiente de formato: hoy el
  componente renderiza `→` y la regla global del plan pide `↗` con rx=7).
- `useScrollEngine` como única fuente de scroll, y las reglas 7 a 11 de `AGENTS.md`.
- Datos de `Trabajos.tsx` (13 videos, 3 cards, 11 tags) y de `Clientes.tsx` (12 logos).
- La ruta `/metodo` y sus cuatro bloques de contenido. Son buenos y se reutilizan.

### Se archiva, no se borra
- Composiciones de `sequenceA/` para las secciones 02, 03 y 04.
- El abanico de la Sección 05, que nunca llegó a tener forma resuelta.
- Los mockups 01–09 v2, que quedan como versión anterior.

### En duda hasta F0
- Explosión del Hero y reconstrucción de la 09.
- Presencia del Crystal 5 como protagonista.

---

## 4. ESTRUCTURA PROPUESTA

Diez bloques. Cada uno contesta **una** pregunta distinta del visitante.
El primer contenido real aparece en la posición 4, no en la 7.

---

### 00 — NAV
- **Rol:** firma estable.
- **Contenido:** isotipo + wordmark, links, CTA compacto.
- **Pendiente:** definir los links en función de qué páginas van a existir (ver R4).
- **Movimiento:** microinteracción. Tema claro por defecto.

---

### 01 — HERO
- **Contesta:** qué hacen y para quién.
- **Requisito no negociable:** el hero **tiene que nombrar el ICP**. Hoy el copy
  dice "Estamos en el negocio de hacer crecer negocios", que lo puede firmar
  cualquier agencia del mundo. Verificado por grep: en todo `src/` no aparece ni
  una vez "e-commerce", ni "tienda", ni "crecimiento con control".
- **Contenido:** eyebrow con el segmento, titular editorial grande, bajada corta,
  un CTA primario. Sin segundo CTA si el destino no existe.
- **Imagen:** a definir en F0. Candidatos: backstage a sangre, composición de
  producto, o crystal sobre claro.
- **Copy:** **a rehacer.** Es el cambio de mayor retorno de todo el proyecto.

---

### 02 — CIFRAS
- **Contesta:** cuánto rinden.
- **Contenido:** tres o cuatro cifras grandes, pegadas al hero.
- **Fuente:** velocentum.agency ya usa +280% crecimiento promedio / 10 rubros /
  45 min de diagnóstico, y funciona.
- **Requisito:** antes de portar cualquier cifra a la `.com`, **verificar la
  atribución**. En la `.agency` $629M figura como CASO INDUMENTARIA; en el prompt
  viejo del landing la misma cifra figuraba contra Buy Now, que es
  electrodomésticos y hogar. Hasta resolver eso no se mueve un número de dominio.
- **Movimiento:** conteo al entrar en viewport, o nada. Sin fuegos artificiales.

---

### 03 — QUIÉNES SOMOS
- **Contesta:** con quién estoy hablando.
- **Contenido:** un párrafo grande, una imagen, un CTA a `/metodo`.
- **Imagen:** **backstage de shooting.** Reemplaza a la foto de equipo que no existe,
  y dice más: muestra que hay producción real, no una oficina posando.
- **Sustituye a:** las secciones 02, 03 y 04 actuales. Hoy esas tres consumen tres
  viewports completos para transportar unas setenta palabras. El argumento —sos el
  cuello de botella / sumar gente no lo resolvió / hace falta que todo apunte al
  mismo lado— se cuenta acá en un párrafo o en tres líneas dentro de un bloque.
- **Copy:** a rehacer, condensando el material aprobado de 02+03+04.

---

### 04 — TRABAJOS
- **Contesta:** qué hicieron.
- **Contenido:** grid de 4 a 6 piezas con tag de rubro, título y poster real.
  El resto va a una página o a un carrusel secundario.
- **Fuente:** `Trabajos.tsx`, sin modificar los datos.
- **Cambio respecto de hoy:** deja de ser un carrusel de 16 items sin jerarquía y
  pasa a ser una selección. Sobre fondo claro los posters son la fotografía del sitio.
- **Requisito de cierre:** verificación de los 13 playback IDs contra categoría,
  acción, poster y orden. Ya era obligatorio en el plan anterior.

---

### 05 — QUÉ HACEMOS
- **Contesta:** qué me vendés exactamente.
- **Contenido:** los cuatro motores en cards altas. Cada card: nombre, una frase,
  **cuatro entregables numerados** y una imagen vertical.
- **Este es el patrón más valioso de toda la referencia.** Convierte
  "Estrategia: definimos a dónde vamos y con qué prioridad" —que no se compra— en
  algo concreto.
- **Imagen por card:** producto de cliente o backstage, según el motor.
- **CONTENIDO A PRODUCIR: 16 entregables (4 por motor). No existen hoy.**
  Lo más cercano son las seis capacidades de `queActivamosContent.ts`, que el plan
  anterior manda eliminar y que ya están marcadas como contradicción viva en el
  propio archivo.
- **Reemplaza al abanico**, que nunca tuvo forma resuelta.

---

### 06 — CÓMO TRABAJAMOS
- **Contesta:** cómo es trabajar con ustedes.
- **Contenido:** los cuatro pasos ya escritos en `/metodo`: qué preguntamos, qué
  medimos, qué proyectamos, qué recomendamos.
- **Fuente:** `src/routes/metodo.tsx`. El contenido existe y es bueno; acá va la
  versión corta con link a la página completa.

---

### 07 — CON QUIÉNES TRABAJAMOS
- **Contesta:** a quién le creyeron antes que yo.
- **Contenido:** los doce logos reales de `Clientes.tsx` en marquee dentro de frame.
- **Ya está resuelto** en el mockup 08 actual, que además ya es claro. Se reutiliza
  casi tal cual.
- **Pendiente heredado:** las dimensiones declaradas (120 × 34) son placeholder de
  ratio, no el tamaño real de cada PNG.

---

### 08 — PRUEBA / TESTIMONIOS
- **Contesta:** quién lo dice además de ustedes.
- **Problema:** no hay retratos ni permisos. Un bloque de testimonios sin cara y
  sin nombre pesa menos que no tenerlo.
- **Tres caminos, a decidir:**
  - **a)** Conseguir dos o tres testimonios con nombre, cargo y marca, usando el
    logo del cliente en lugar del retrato.
  - **b)** Reemplazar el bloque por rubros trabajados, con imagen de producto por rubro.
  - **c)** Omitirlo en V2 y sumarlo cuando existan los permisos.
- **Recomendación:** (c) para el primer lanzamiento, (a) como objetivo.
  Un bloque vacío de credibilidad es peor que no tenerlo.

---

### 09 — CIERRE
- **Contesta:** qué hago ahora.
- **Contenido:** titular de cierre, bajada de la llamada de 45 minutos, un CTA
  único: "Reservá tu análisis de negocio ↗".
- **Candidato a ser el único bloque oscuro de la página**, y por lo tanto el lugar
  natural del Crystal 5 si sobrevive a F0. Un solo momento de marca al final pesa
  más que el objeto repartido en nueve secciones.
- **Bloqueo heredado:** el formulario no tiene destino. Si el CTA va a Calendly,
  el bloqueo desaparece; si va al formulario propio, sigue vivo.

---

### FOOTER
- Marca, navegación, mail y redes.
- **Contenido real todavía pendiente de definición.** No inventar direcciones ni URLs.

---

## 5. CONTENIDO A PRODUCIR

Ordenado por lo que bloquea a lo demás.

| # | Qué | Bloquea a |
|---|---|---|
| C1 | Copy del hero con el ICP nombrado | Bloque 01, y el tono de todo lo demás |
| C2 | 16 entregables, cuatro por motor | Bloque 05 |
| C3 | Tres o cuatro cifras con atribución verificada | Bloque 02 |
| C4 | Selección y recorte de backstage y producto | Bloques 01, 03, 05 |
| C5 | Condensado de 02+03+04 en un párrafo | Bloque 03 |
| C6 | Verificación de los 13 playback IDs | Bloque 04 y publicación |
| C7 | Decisión sobre `/casos` y sobre los links del nav | Bloque 00 y 04 |
| C8 | Destino del formulario o del CTA de cierre | Bloque 09 y publicación |

---

## 6. FASES Y GATES

**F0 — DECISIÓN DE SISTEMA VISUAL. Bloquea todo lo demás.**
Un solo mockup del Hero sobre fondo claro, en tres variantes:
1. Crystal 5 protagonista, recalibrado para claro.
2. Crystal como acento, con la fotografía al frente.
3. Sin crystal en la home, con el sistema viviendo solo en isotipo, íconos y detalles.
**Gate:** una variante elegida. Con ella queda decidido si la explosión y la
reconstrucción sobreviven. No se pasa a F1 sin esto.

**F1 — CONTENIDO.** C1 a C5. Es escritura y curaduría, no diseño.
**Gate:** copy y assets aprobados por bloque.

**F2 — MOCKUPS.** Uno por bloque, en el orden 01, 04, 05, 03, 02, 09, 06, 07.
Primero los que cargan contenido nuevo.
**Gate:** bloque `MOCKUP APROBADO` completo en este documento por cada uno.

**F3 — IMPLEMENTACIÓN.** Una sección por vez, con auditoría contra el artefacto.
Máximo dos rondas de corrección por bloque.

**F4 — MOBILE.** Mockups y especificación de los diez bloques.

**F5 — DESBLOQUEO DE PUBLICACIÓN.** C6, C7, C8 y reduced motion.

---

## 7. PREGUNTAS ABIERTAS

1. ¿El nav mantiene MÉTODO / TRABAJOS / CASOS? Si `/casos` no se construye,
   ¿ese link va a `.agency` o sale?
2. ¿El CTA de cierre va a Calendly, igual que en la `.agency`, o al formulario propio?
3. ¿Hay permiso de los clientes para nombrarlos en testimonios?
4. ¿Cuántas piezas de backstage y de producto hay realmente, y en qué resolución?
   De eso depende cuántos bloques pueden llevar imagen.
5. ¿La home enlaza explícitamente a velocentum.agency, o son dos propiedades
   separadas sin puente?

---

## 8. LO QUE NO SE HACE

- No se copia código, CSS, SVG, fotos ni copy de LoftyLab.
- No se implementa ningún bloque sin mockup aprobado.
- No se borra el sistema de cristal antes de F0.
- No se inventan cifras, clientes, URLs ni assets (regla 11 de `AGENTS.md`).
- No se migra a `main` hasta que F5 esté cerrada.
