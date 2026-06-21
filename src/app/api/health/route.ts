export async function GET(): Promise<Response> {
  console.log(JSON.stringify({ route: '/api/health', method: 'GET', ts: Date.now() }))
  return Response.json({
    ok: true,
    version: '1.0.0',
    mode: 'demo',
    ts: Date.now(),
    features: ['dashboard', 'analytics', 'export'],
  })
}