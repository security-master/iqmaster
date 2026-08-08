export default {
  async fetch(request, env) {
    // Assets binding is automatic for [assets]; this worker is a thin fallback.
    if (env.ASSETS) {
      return env.ASSETS.fetch(request)
    }
    return new Response('IQMaster preview worker', { status: 200 })
  },
}
