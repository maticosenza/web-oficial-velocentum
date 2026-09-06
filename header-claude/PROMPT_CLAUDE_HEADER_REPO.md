# Corregir el fondo atmosférico de B1 en web-oficial-velocentum

Implementá esta corrección en el proyecto `maticosenza/web-oficial-velocentum`. Mi objetivo es que la mancha difuminada de colores del hero de Inicio tenga la composición y el comportamiento de https://loftylab.framer.website/.

## Primero ubicá el trabajo actual

La revisión del remoto encontró el hero en la rama `desarrollo`, commit `ead4756ac77b4eddca6b20c3b15611b5c22eb89a`. En `main`, commit `0c8a880`, `src/routes/index.tsx` todavía devuelve `<main />`. Revisá la rama y el estado local; conservá cualquier avance local posterior y no reemplaces la implementación por la versión vacía de main. Leé el AGENTS.md del repositorio, que está conectado a Lovable.

Stack observado: React 19, TypeScript, TanStack Start, Vite y Tailwind 4. No hay GSAP ni Framer Motion en package.json; aprovechá las herramientas y hooks existentes para esta corrección.

## Archivos concretos a revisar

- `src/bloques/B1Hero.tsx`: renderiza `.b1__atmosfera` y `.b1__nubes > .b1__nubes-giro`, e invoca `useParallaxDelHero(heroRef)`.
- `src/estilos/home.css`: reglas de esas tres clases, `@keyframes nube-girar` y media queries del hero.
- `src/lib/parallaxDelHero.ts`: escribe `--px`, `--py` y `--scroll`.
- `src/componentes/HeroSticky.tsx`: combina B1+B2 y publica `--cobertura` en su contenedor común.
- `src/lib/progresoDeScroll.ts`: calcula el progreso compartido; revisá su contrato antes de reutilizarlo.
- `src/routes/index.tsx`: monta `<HeroSticky hero={<B1Hero />} siguiente={<B2QuienesSomos />} />`.

## Diagnóstico de la versión revisada

1. `.b1__atmosfera` es un fondo de varios degradados radiales y uno lineal que cubre el hero entero.
2. `.b1__nubes-giro` dibuja cinco degradados blancos en un cuadrado de `170vmax` y ejecuta `nube-girar 60s linear infinite`, cuyo destino es `rotate(-360deg)`.
3. `.b1__nubes` agrega desplazamiento por cursor de hasta ±70px por eje, rotación dependiente de X y escala dependiente de Y. Su scroll agrega `--scroll * 0.26px` hacia abajo; la atmósfera usa `--scroll * 0.12px`, también hacia abajo.
4. El hook normaliza el cursor respecto de toda la ventana y escucha `pointermove` en window. No limita la respuesta a B1 ni vuelve al centro al salir del hero. El suavizado real es 0.11; algunos comentarios mencionan otros valores.
5. El rAF del hook se detiene al alcanzar el objetivo del cursor. No produce oscilación autónoma. El movimiento en reposo proviene del giro CSS, que es el movimiento equivocado para reproducir la referencia.
6. El PNG de la mancha no está en `public/assets` en este commit.

Por eso no alcanza con aumentar amplitudes o cambiar la duración del giro: hay que corregir tanto el recurso visual como la lógica.

## Aspecto que quiero

Una única mancha extensa, asimétrica y de borde imperfecto, muy difuminada, blanca con zonas crema, amarillas y rosas. Se superpone al campo azul `var(--cielo)` y aparece a media altura y hacia abajo, detrás del título y del CTA. El contorno se desvanece suavemente hacia transparente.

Usá el archivo adjunto `lofty-textura-referencia.png` como referencia y recurso para la prueba local. Es el PNG original de Lofty, no un asset original de Velocentum: dejá su ruta fácilmente sustituible por una textura propia equivalente. Copialo a `public/assets/hero-mancha-referencia.png`. Tiene 2396 × 1013 px y transparencia real. Si necesitás localizar el original: https://framerusercontent.com/images/YC33KD8DtS3mHxa6tDHybM2TI.png?width=2396&height=1013

El borde ya está difuminado en el archivo. Conservá el alfa, la proporción y los colores; no agregues un rectángulo blanco, negro o azul al archivo. No lo sustituyas por nubes cúmulo sólidas ni por cinco óvalos blancos separados.

En la referencia, la imagen está en `top: 80%`, centrada verticalmente con `translateY(-50%)`, y se extiende 696px a cada lado del hero. Usá ese encuadre como punto de partida y ajustalo visualmente al tamaño real de B1. La masa de color debe verse amplia, parcialmente fuera de pantalla y sin bordes rectangulares visibles. Conservá el recorte de `.b1` y evitá scroll horizontal.

Reemplazá los fondos de degradados que actualmente simulan esta misma mancha para no superponer dos atmósferas que laven los colores. Conservá el campo azul base. Eliminá el giro de 360° y su superficie cuadrada de 170vmax.

## Lógica correcta: tres movimientos que se suman

Separá en wrappers el posicionamiento de la textura, su flotación/cursor y su desplazamiento por scroll. No permitas que CSS y JS sobrescriban el mismo `transform`. Podés renombrar `.b1__nubes-giro` para que el nombre represente su función nueva.

### A. Flotación autónoma suave

El controlador real de Lofty se llama `CloudSquiggleInteractive`. Sus oscilaciones son:

```text
floatX = sin(phase * 1.3) * 45px
floatY = cos(phase * 0.9) * 27px
rotation = sin(phase * 0.7) * 3deg
scale = 1 + sin(phase * 0.5) * 0.03
```

Así la mancha deriva en dos ejes, se inclina entre −3° y +3° y cambia de tamaño entre 97% y 103%. Tiene que continuar suavemente con el cursor quieto mientras el hero esté visible.

El original avanza la fase 0.015 por tick. Implementá el equivalente con tiempo transcurrido, aproximadamente 0.9 por segundo a una base de 60Hz, para que no se acelere en pantallas de 120Hz. No hay una rotación completa continua: el `rotate(-360deg)` fijo visto en el DOM no es prueba de un loop.

### B. Cursor con inercia

Calculá el cursor respecto del rectángulo estable de `.b1`, no de toda la ventana ni del wrapper ya animado. Solo debe influir mientras el cursor está en la zona del hero.

La referencia usa fuerza 300, radio de influencia de 600px desde el centro y objetivos:

```text
mouseTargetX = ((clientX - centerX) / heroWidth) * 300px
mouseTargetY = ((clientY - centerY) / heroHeight) * 300px
```

Su interpolación toma el 50% de la diferencia por tick; al alejarse, el objetivo decae multiplicándose por 0.9 por tick. Normalizá las tasas por tiempo. Sumá el desplazamiento suavizado a la oscilación autónoma. Al salir del hero o perder foco, volvé gradualmente a un objetivo de cero, conservando la flotación cuando corresponda.

### C. Scroll reversible hacia arriba

La referencia configura un desplazamiento interior de `0` a `−400px` ligado al progreso del scroll. Al bajar, la mancha asciende; al subir, vuelve. Tiene suavizado tipo spring, con damping 60, stiffness 500 y mass 1.

En este repo ya existe `--cobertura`, heredada de HeroSticky: 0 cuando B2 empieza a cubrir y 1 cuando alcanza la parte superior. Reutilizá ese progreso como punto de partida para `scrollY = -400px * cobertura` y validá el encuadre. Este mapeo reutiliza la arquitectura local; no significa que sea el cálculo interno exacto de Framer. Evitá otro listener basado en el scroll absoluto de toda la página si la señal existente resuelve el recorrido.

Conservá el `translateY(-50%)` que centra la textura. El desplazamiento por scroll debe componerse con ese centrado y con flotación/cursor, no reemplazarlos.

## Integración precisa

- Concentrá los cambios en B1Hero, su bloque de CSS, el hook del fondo y el nuevo PNG. Conservá el titular actual «ESTAMOS EN EL / NEGOCIO DE HACER / CRECER NEGOCIOS», el CTA, foco, rayo, tamaños y entrada por letras.
- Conservá el hundimiento/desvanecimiento existente de `.b1__contenido` con `--cobertura`. «Mover solo el fondo» significa no aplicar cursor ni flotación al texto; no significa borrar la animación de scroll que el texto ya tiene.
- Conservá el par B1+B2, su borde de onda, el resto de las secciones y el cursor custom. `HeroSticky` también se usa en B7+B8: no alteres su contrato global para resolver un detalle de B1.
- La barra de navegación es B0 (`src/bloques/B0Nav.tsx`), un componente separado. Esta corrección trata del fondo de B1; preservá su comportamiento y cualquier personalización local de la barra, incluido blur si ya lo agregué. El commit remoto revisado tiene `.b0__card` sólida, sin backdrop-filter: no confundas esa barra con el difuminado de la textura.
- Extendé o refactorizá `useParallaxDelHero` en lugar de dejar dos controladores compitiendo. Usá refs, CSS custom properties y requestAnimationFrame; no actualices estado React por fotograma.
- Guardá y cancelá todos los IDs de rAF al desmontar, eliminá listeners y limpiá variables. El hook actual no cancela los frames pendientes: corregilo al refactorizarlo.
- Pausá la flotación con la pestaña oculta y cuando el hero deje de verse. Recordá que un elemento sticky puede seguir intersectando aunque B2 lo tape: considerá la cobertura al decidir cuándo pausar. Reanudá sin saltos al volver.
- En móvil, conservá el breakpoint de 810px que desactiva sticky y el flujo normal. No actives seguimiento sin `(hover: hover) and (pointer: fine)`. Desactivá el parallax por cobertura bajo 810px para evitar una posición inicial incorrecta.
- Con movimiento reducido, mantené la textura estática en un encuadre legible. Ojo: `useProgresoDeScroll` publica 1 en ese modo; aplicarle `-400px` sin una condición movería el fondo al extremo. Reutilizá las protecciones existentes y reaccioná si cambia la preferencia.
- Decoración con `aria-hidden`, `alt=""` y `pointer-events: none`.

## Aclaración sobre el plan y los comentarios viejos

Esta es mi corrección expresa para el fondo de B1. Reemplaza las afirmaciones anteriores de que «en reposo no se mueve», «solo hay cursor custom» o «la nube gira 360° continuamente». Esas afirmaciones quedaron en comentarios de B1Hero, parallaxDelHero y home.css, y en partes de `docs/plan/00_LEEME.md`, `04_PROMPT_ARRANQUE.md`, `02_paginas/01_HOME_estructura.md` y `03_referencia/mapa_lofty_decodificado.md`.

Actualizá los comentarios de los archivos que modifiques para que describan la nueva implementación. No vuelvas a tomar aquellas frases como motivo para eliminar la flotación o el parallax. El resto del plan y las decisiones de diseño se conservan; no reescribas el plan completo por esta tarea.

## Verificación antes de darlo por terminado

1. Mostrá Inicio en el navegador y compará la mancha con Lofty a un ancho similar.
2. Observá el hero en reposo durante varios segundos: debe flotar suavemente, sin vueltas completas.
3. Mové el cursor entre extremos y fuera del hero: seguimiento con inercia y retorno, sin mover texto/CTA por mouse.
4. Bajá y subí: la mancha asciende y vuelve; B2 sigue cubriendo B1 con su onda y el texto conserva su animación.
5. Probá desktop, móvil, ventana baja y movimiento reducido. Sin scroll horizontal, cortes rectangulares, controles tapados ni texto invisible.
6. Salí de Inicio y volvé: sin listeners ni bucles duplicados, errores de consola o problemas de hidratación.
7. Ejecutá `npm run build` y el lint correspondiente al cambio usando el gestor del proyecto. Si el lint global ya falla por problemas anteriores, distinguílos de lo introducido por esta tarea.

Entregá el cambio implementado, una vista del resultado y los parámetros que puedo ajustar. No hagas deploy ni push como parte de este pedido.

Fuente técnica inspeccionada de Lofty:
https://framerusercontent.com/sites/6b7njMavWjwSEoT8Enq0Pb/iNzNfE0shPXmDJV0zh7gQserO8wqQ9iWoEVBR7dFETM.C0baUdqf.mjs
