import { apiBase, contactServices } from "@/lib/site-data";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

// Forwards contact submissions to the dashboard API, which only accepts browser requests from exzell-it.de.
// Anti-spam fields (honeypot, render time, Turnstile token) are passed through for the dashboard to verify.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const payload = {
    name: text(body.name, 200),
    email: text(body.email, 320),
    company: text(body.company, 200),
    service: text(body.service, 60),
    message: text(body.message, 5000),
    hp_field: text(body.hp_field, 200),
    form_rendered_at: typeof body.form_rendered_at === "number" ? body.form_rendered_at : 0,
    turnstile_token: text(body.turnstile_token, 4096),
  };

  if (!payload.name || !emailPattern.test(payload.email) || !payload.message || !contactServices.some(service => service.value === payload.service)) {
    return Response.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  try {
    const upstream = await fetch(`${apiBase}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(forwardedFor ? { "X-Forwarded-For": forwardedFor } : {}) },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const result: unknown = await upstream.json().catch(() => null);
    const ok = upstream.ok && typeof result === "object" && result !== null && (result as { ok?: unknown }).ok === true;
    return Response.json({ ok }, { status: ok ? 200 : 502 });
  } catch {
    return Response.json({ ok: false, error: "upstream_unavailable" }, { status: 502 });
  }
}
