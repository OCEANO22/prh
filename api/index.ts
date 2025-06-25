interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/prhs")) {
       if (request.method == 'GET') {
        let { results } = await env.DB.prepare("SELECT * FROM prhs").all();
        return Response.json(results);
      } else if (request.method == 'POST') {
        const newId = crypto.randomUUID()
        const input = await request.json<any>()
        const query = `INSERT INTO prhs(id,nama,email,pesan) values ("${newId}","${input.name}","${input.email}","${input.pesan}")`;
        const newPrh = await env.DB.exec(query);
        return Response.json(newPrh);
      }
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;