# PROMPT DE ARRANQUE — Claude Code

Descomprimí este paquete en el repo, en `docs/plan/`, y comiteálo.
Después pegá el bloque de abajo entero, de una sola vez.

---

```
Estás arrancando un sitio nuevo desde cero: velocentum.com.

Velocentum es una agencia de performance marketing en Argentina, enfocada en
tiendas de e-commerce que ya venden. Posicionamiento: "crecimiento con control".
Español rioplatense. Cuatro páginas: Inicio, Método, Casos, Contacto. El objetivo
es que el visitante reserve una llamada de diagnóstico. Existe una segunda
propiedad, velocentum.agency, que NO se toca.

FUENTE DE VERDAD

Todo el plan está en docs/plan/. Leelo COMPLETO antes de escribir una línea.
Empezá por docs/plan/00_LEEME.md, que es la versión V3 y deroga todo lo anterior.
La carpeta docs/plan/_historico/ está derogada: no la leas como instrucción.

DIRECCIÓN

Composición expresiva y copy prudente. Presencia gráfica fuerte —titulares
condensados grandes, campos de color, objetos 3D, mucho aire— con lenguaje
concreto, sin urgencia artificial, sin emojis y sin prometer resultados.
Son dos ejes separados: lo gráfico puede ser audaz, el copy no.

LA REFERENCIA

LoftyLab, plantilla paga de Framer, está decodificada en docs/plan/03_referencia/.
Ese documento es todo lo que necesitás: no hace falta que la visites.
Se estudia su ritmo y jerarquía. NO se copia su código, CSS, JS, SVG, fotos,
íconos, tipografías ni copy. Su tono tampoco.

STACK

El repositorio ya está scaffoldeado. NO lo reemplaces ni migres de framework.

PRIMERA TAREA. NO CONSTRUYAS NADA TODAVÍA.

  1. Leé toda la documentación de docs/plan/.
  2. Reportame: framework y versión, sistema de ruteo, si hay Tailwind y en qué
     versión, y qué librería de animación hay disponible.
  3. Decime cuáles de los siete componentes son viables tal como están
     especificados y cuál necesita adaptarse. En particular RouteCurtain, que
     depende del router y necesita contrato de estados, cancelación, error,
     foco y restauración de scroll. Si no se puede garantizar, el fallback es
     navegación normal: decímelo en vez de buscarle la vuelta.

Esperá mi confirmación antes de instalar nada.

REGLAS QUE NO SE NEGOCIAN

  - No inventes contenido: ni mails, ni teléfonos, ni URLs, ni cifras, ni
    nombres de clientes. Lo que falta va como placeholder explícito.
  - Usá los tokens de docs/plan/01_sistema/tokens.css. No hardcodees colores,
    espaciado ni tiempos.
  - El par texto-sobre-acento no es opcional, y aplica también en hover, footer,
    chips y estados activos.
  - Separá los componentes por nombre: HeroSticky, ServiceStack, Ticker,
    ScrollMedia, Reveal, SectionEdge, RouteCurtain. ScrollMedia y Reveal son
    cosas distintas.
  - Accesibilidad desde el primer componente, no al final: teclado, foco
    visible, zoom 200%, movimiento reducido y pausa de contenido automático.
  - Con movimiento reducido, poner los tiempos en cero no alcanza: hay que
    apagar sticky y scroll-linked, detener tickers y mostrar el contenido
    completo. Ningún bloque arranca permanentemente oculto.
  - Nav sólido, sin backdrop blur. Atmósfera del hero estática.
  - La máscara de borde va con propiedades separadas y sobre una capa
    decorativa, nunca sobre texto ni controles. El ejemplo correcto está en
    tokens.css.
```
