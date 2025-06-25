import { Hono } from 'hono'

type Bindings = {
  ASSETS: Fetcher
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/prhs', async (c) => {
  let { results } = await c.env.DB.prepare("SELECT * FROM prhs").all()
  return c.json(results)
})

app.post('/api/prhs', async (c) => {
  const newId = crypto.randomUUID()
  const input = await c.req.json<any>()
  const query = `INSERT INTO prhs(id,nama,email,pesan) values ("${newId}","${input.nama}","${input.email}","${input.pesan}")`
  const newPrh = await c.env.DB.exec(query)
  return c.json(newPrh)
})

app.get('/api/prhs/:id', async (c) => {
  const prhId = c.req.param('id')
  let { results } = await c.env.DB.prepare('SELECT * FROM prhs WHERE id = ?').bind(prhId).all()
  return c.json(results[0])
})

app.put('/api/prhs/:id', async (c) => {
  const prhId = c.req.param('id')

  const input = await c.req.json<any>()
  const query = `UPDATE prhs SET nama = "${input.nama}", email = "${input.email}", pesan = "${input.pesan}" WHERE id = "${prhId}"`
  const prh = await c.env.DB.exec(query)

  return c.json(prh)
})

app.delete('/api/prhs/:id', async (c) => {
  const prhId = c.req.param('id')

  const query = `DELETE FROM prhs WHERE id = "${prhId}"`
  const prh  = await c.env.DB.exec(query)

  return c.json(prh)
})

export default app