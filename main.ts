import { Hono } from "hono"
import { cors } from "hono/cors"
import { authRouter } from "./controllers/auth/authRouter.ts"
import { postRouter } from "./controllers/posts/postRouter.ts"
import { serveStatic } from 'hono/deno'


const app = new Hono()

app.use('/*', cors())
app.use('/static/*', serveStatic({ root: './' }))
app.get('/', serveStatic({ path: './static/index.html' }))
app.route("/auth", authRouter)
app.route("/posts", postRouter)

Deno.serve(app.fetch)