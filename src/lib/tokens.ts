/* ===========================================================
   LECTURA DE TOKENS EN TIEMPO DE EJECUCIÓN

   Por qué existe este archivo, en vez de un parseFloat suelto:

   Lightning CSS —el minificador que trae Tailwind v4— normaliza
   las duraciones a la unidad que ocupe menos caracteres. En el
   CSS compilado, `300ms` sale como `.3s` y `240ms` como `.24s`,
   pero `50ms` queda `50ms`, porque `.05s` sería más largo.

   O sea que la unidad de un token de tiempo NO es estable y no
   se puede asumir. `parseFloat('.3s')` da 0.3, y eso interpretado
   como milisegundos es una animación que no se ve.

   Verificado en el navegador durante el spike de RouteCurtain.
   =========================================================== */

/** Convierte un valor CSS de tiempo (`.3s`, `300ms`) a milisegundos. */
export function msDesdeCss(valor: string): number | null {
  const limpio = valor.trim();
  const partes = /^(-?(?:\d+\.?\d*|\.\d+))(ms|s)$/.exec(limpio);
  if (!partes) return null;

  /* `noUncheckedIndexedAccess` está activo: los grupos de la
     regex llegan como `string | undefined`. */
  const [, cantidadTexto, unidad] = partes;
  if (cantidadTexto === undefined || unidad === undefined) return null;

  const cantidad = Number.parseFloat(cantidadTexto);
  if (!Number.isFinite(cantidad)) return null;

  return unidad === "s" ? cantidad * 1000 : cantidad;
}

/**
 * Lee un token de duración del `:root` y lo devuelve en ms.
 * `respaldo` se usa en el servidor y si el token no existe.
 */
export function duracionDeToken(nombre: string, respaldo: number): number {
  if (typeof window === "undefined") return respaldo;

  const crudo = getComputedStyle(document.documentElement).getPropertyValue(nombre);
  const ms = msDesdeCss(crudo);

  /* Cero es un valor legítimo: es lo que pone tokens.css con
     movimiento reducido. No hay que confundirlo con "no existe". */
  return ms === null ? respaldo : ms;
}

/** Lee un token cualquiera como texto, ya recortado. */
export function textoDeToken(nombre: string, respaldo = ""): string {
  if (typeof window === "undefined") return respaldo;
  const crudo = getComputedStyle(document.documentElement).getPropertyValue(nombre).trim();
  return crudo || respaldo;
}

export function prefiereMenosMovimiento(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
