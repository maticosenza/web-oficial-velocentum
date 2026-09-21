/**
 * WebKit necesita caminos de animación un poco más austeros que Blink.
 * La exclusión evita confundir Chrome, Edge, Opera o Firefox para iOS con Safari.
 */
export function esSafariWebKit(): boolean {
  if (typeof navigator === "undefined") return false;

  const agente = navigator.userAgent;
  return /Safari\//.test(agente) && !/(?:Chrome|Chromium|CriOS|Edg|OPR|FxiOS)\//.test(agente);
}

export function esSafariDeEscritorio(): boolean {
  if (typeof window === "undefined" || !esSafariWebKit()) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
