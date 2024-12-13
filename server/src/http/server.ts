import Fastify from 'fastify'

const app = Fastify()
const PORT = Number(process.env.PORT) || 3333

app.get('/', () => {
  return 'Hello World'
})

app
  .listen({
    port: PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`🔥 Server running on http://localhost:${PORT}`)
  })
