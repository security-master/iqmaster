export async function onRequestPost(context: { request: Request }): Promise<Response> {
  let payload: Record<string, unknown>
  try {
    payload = (await context.request.json()) as Record<string, unknown>
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = String(payload.name ?? '').trim()
  const email = String(payload.email ?? '').trim()
  const message = String(payload.message ?? '').trim()

  if (!name || !email || !message) {
    return Response.json({ error: 'name, email, and message are required' }, { status: 400 })
  }

  // Persist via email provider / KV later — acknowledge for now
  return Response.json({
    ok: true,
    received: true,
    at: new Date().toISOString(),
  })
}
