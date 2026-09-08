import { z } from "zod";

const esquemaLead = z.object({
  id: z.string().uuid(),
  rubro: z.string().trim().min(2).max(80),
  objetivo: z.string().trim().min(2).max(200),
  nombre: z.string().trim().min(2).max(160),
  telefono: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(254),
  instagram: z.string().trim().min(1).max(160),
  web: z.string().trim().min(1).max(500),
});

type Lead = z.infer<typeof esquemaLead>;

function configuracion() {
  const url = import.meta.env.VITE_VELO_SUPABASE_URL;
  const key = import.meta.env.VITE_VELO_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase todavía no está configurado.");
  }

  return { url: url.replace(/\/$/, ""), key };
}

/** La Publishable key es segura en el navegador: la política RLS de
 * `leads` permite únicamente insertar y prohíbe leer, editar o borrar. */
export async function guardarLead({ data }: { data: Lead }) {
  const lead = esquemaLead.parse(data);
  const { url, key } = configuracion();
  const response = await fetch(`${url}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error(`Supabase respondió ${response.status}.`);
  }

  return { id: lead.id };
}
