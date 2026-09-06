import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { RouteCurtain } from "../componentes/RouteCurtain";

function NotFoundComponent() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeContent: "center",
        textAlign: "center",
        padding: "var(--space-4)",
        gap: "var(--space-4)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.06em",
          color: "var(--texto-2)",
        }}
      >
        ERROR 404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(48px, 8vw, 96px)",
          lineHeight: 0.95,
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        Esta página
        <br />
        no existe.
      </h1>
      <p style={{ color: "var(--texto-2)", maxWidth: "var(--medida-parrafo)" }}>
        Puede que el enlace esté mal escrito, o que la página haya cambiado de dirección.
      </p>
      <div>
        {/* Enlace duro, no `EnlaceConCortina`: el 404 tiene que
            funcionar aunque se renderice fuera del proveedor. */}
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: "var(--control-min-height)",
            padding: "0 var(--space-4)",
            borderRadius: "var(--r-pill)",
            background: "var(--marca)",
            color: "var(--texto-sobre-marca)",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeContent: "center",
        textAlign: "center",
        padding: "var(--space-4)",
        gap: "var(--space-4)",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(40px, 6vw, 72px)",
          lineHeight: 0.95,
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        Esta página
        <br />
        no cargó.
      </h1>
      <p style={{ color: "var(--texto-2)", maxWidth: "var(--medida-parrafo)" }}>
        Hubo un problema de nuestro lado. Podés reintentar o volver al inicio.
      </p>
      <div
        style={{
          display: "flex",
          gap: "var(--space-2)",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          style={{
            minHeight: "var(--control-min-height)",
            padding: "0 var(--space-4)",
            borderRadius: "var(--r-pill)",
            background: "var(--marca)",
            color: "var(--texto-sobre-marca)",
            border: "none",
            fontWeight: 700,
            fontFamily: "var(--font-texto)",
            fontSize: "inherit",
            cursor: "pointer",
          }}
        >
          Reintentar
        </button>
        {/* Enlace duro a propósito: si el router está roto, una
            navegación de cliente no es de fiar. */}
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: "var(--control-min-height)",
            padding: "0 var(--space-4)",
            borderRadius: "var(--r-pill)",
            border: "1.5px solid var(--tinta)",
            color: "var(--tinta)",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Velocentum" },
      {
        name: "description",
        content: "Agencia de performance marketing para tiendas de e-commerce que ya venden.",
      },
      { name: "author", content: "Velocentum" },
      { property: "og:site_name", content: "Velocentum" },
      { property: "og:title", content: "Velocentum" },
      {
        property: "og:description",
        content: "Agencia de performance marketing para tiendas de e-commerce que ya venden.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_AR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      /* Las tres familias se usan arriba del pliegue: se
         precargan para que el titular display no aparezca con
         fuente de sistema y salte al cargar la real. */
      {
        rel: "preload",
        href: "/fonts/anton-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/manrope-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <RouteCurtain>
        <a href="#contenido" className="saltar-al-contenido">
          Saltar al contenido
        </a>
        {/* `tabIndex={-1}` lo hace enfocable por programa, no por
            teclado: es el destino del foco al terminar la cortina. */}
        <main id="contenido" tabIndex={-1} className="destino-de-foco">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
      </RouteCurtain>
    </QueryClientProvider>
  );
}
