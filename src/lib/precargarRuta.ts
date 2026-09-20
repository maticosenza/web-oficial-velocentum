/* Empieza a pedir la imagen critica de la pagina de destino durante
   la intencion de navegacion. En mobile el primer toque ocurre unos
   cientos de milisegundos antes de que la cortina descubra la ruta;
   aprovechar ese intervalo evita mostrar primero el color de fondo. */

const imagenesPorRuta: Record<string, () => string[]> = {
  "/metodo": () => [
    window.matchMedia("(max-width: 809px) and (max-aspect-ratio: 3 / 4)").matches
      ? "/assets/hero-metodo-mobile.webp"
      : "/assets/hero-metodo-desktop-v2.webp",
  ],
  "/casos": () => ["/assets/caso-snake-store-poster.webp"],
  "/contacto": () => [
    window.matchMedia("(max-width: 809px)").matches
      ? "/assets/contacto-cta-escena-mobile.webp"
      : "/assets/contacto-cta-escena.webp",
  ],
};

export function precargarImagenesDeRuta(ruta: string) {
  if (typeof document === "undefined") return;

  for (const href of imagenesPorRuta[ruta]?.() ?? []) {
    if (document.head.querySelector(`link[data-precarga-ruta][href="${href}"]`)) continue;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    link.fetchPriority = "high";
    link.dataset.precargaRuta = ruta;
    document.head.append(link);
  }
}
