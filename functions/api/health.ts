export async function onRequestGet(): Promise<Response> {
  return Response.json({
    ok: true,
    service: 'iqmaster',
    platform: 'cloudflare-pages',
    timestamp: new Date().toISOString(),
  })
}
