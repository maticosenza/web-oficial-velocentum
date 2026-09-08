import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const EVENTO_PUBLICO = "https://calendly.com/matias-velocentum/analisis-de-negocio";
const API = "https://api.calendly.com";
type Horario = { start_time: string; scheduling_url: string };
type RespuestaDeReserva = { resource?: { uri?: string } };
let cache: { vence: number; horarios: Horario[] } | undefined;

function token() {
  const value = process.env.CALENDLY_PAT;
  if (!value) throw new Error("Calendly todavía no está configurado.");
  return value;
}

async function pedir(path: string) {
  const response = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  if (!response.ok) throw new Error(`Calendly respondió ${response.status}.`);
  return response.json() as Promise<{
    resource?: { uri: string };
    collection?: Array<{ uri: string; scheduling_url: string }>;
  }>;
}

async function tipoDeEvento() {
  const usuario = (await pedir("/users/me")).resource?.uri;
  if (!usuario) throw new Error("No se encontró el usuario de Calendly.");
  const tipos = await pedir(`/event_types?user=${encodeURIComponent(usuario)}&active=true`);
  const objetivo = EVENTO_PUBLICO.replace(/\/$/, "");
  const tipo = tipos.collection?.find(
    (item) => item.scheduling_url.replace(/\/$/, "") === objetivo,
  );
  if (!tipo) throw new Error("No se encontró el evento Análisis de negocio en Calendly.");
  return tipo.uri;
}

const esquemaReserva = z.object({
  inicio: z.string().datetime(),
  nombre: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(254),
  zonaHoraria: z.string().trim().min(2).max(80),
  leadId: z.string().uuid(),
});

export const reservarEnCalendly = createServerFn({ method: "POST" })
  .validator(esquemaReserva)
  .handler(async ({ data }) => {
    const tipo = await tipoDeEvento();
    const response = await fetch(`${API}/invitees`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_type: tipo,
        start_time: data.inicio,
        invitee: {
          name: data.nombre,
          email: data.email,
          timezone: data.zonaHoraria,
        },
        tracking: { utm_content: data.leadId },
      }),
    });

    if (!response.ok) {
      throw new Error(`Calendly respondió ${response.status}.`);
    }

    const reserva = (await response.json()) as RespuestaDeReserva;
    return { uri: reserva.resource?.uri ?? null };
  });

export const horariosDeCalendly = createServerFn({ method: "POST" })
  .validator(z.object({ inicio: z.string().datetime(), fin: z.string().datetime() }))
  .handler(async ({ data }) => {
    if (cache && cache.vence > Date.now()) return cache.horarios;
    const tipo = await tipoDeEvento();
    const query = new URLSearchParams({
      event_type: tipo,
      start_time: data.inicio,
      end_time: data.fin,
    });
    const dataApi = await pedir(`/event_type_available_times?${query}`);
    const horarios = (dataApi.collection ?? []) as Horario[];
    cache = { horarios, vence: Date.now() + 60_000 };
    return horarios;
  });
