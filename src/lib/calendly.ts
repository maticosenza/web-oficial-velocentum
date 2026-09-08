import { z } from "zod";

const SUPABASE_URL = "https://nsjvfgjscvzjddnwbnik.supabase.co";
const SUPABASE_PUBLIC_KEY = "sb_publishable_I7EmSvOufYxyWOuSZn6QpQ_utbL7wgs";
const ENDPOINT = `${SUPABASE_URL}/functions/v1/calendly`;

type Horario = { start_time: string; scheduling_url: string };
type RespuestaDeReserva = { uri: string | null };
let cache: { vence: number; horarios: Horario[] } | undefined;

async function pedir(body: Record<string, unknown>) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLIC_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLIC_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const respuesta = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      typeof respuesta.error === "string" ? respuesta.error : "No se pudo conectar con Calendly.",
    );
  }
  return respuesta;
}

const esquemaReserva = z.object({
  inicio: z.string().datetime(),
  zonaHoraria: z.string().trim().min(2).max(80),
  leadId: z.string().uuid(),
});

export async function reservarEnCalendly(data: z.infer<typeof esquemaReserva>) {
  const reserva = esquemaReserva.parse(data);
  return pedir({
    action: "book",
    lead_id: reserva.leadId,
    start_time: reserva.inicio,
    timezone: reserva.zonaHoraria,
  }) as Promise<RespuestaDeReserva>;
}

export async function horariosDeCalendly(data: { inicio: string; fin: string }) {
  if (cache && cache.vence > Date.now()) return cache.horarios;
  const result = (await pedir({
    action: "availability",
    start_time: data.inicio,
    end_time: data.fin,
  })) as {
    collection?: Horario[];
  };
  const horarios = result.collection ?? [];
  cache = { horarios, vence: Date.now() + 60_000 };
  return horarios;
}
