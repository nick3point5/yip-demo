import { Hono } from "hono"
import { authRouter } from "./controllers/auth/authRouter.ts"
import { postRouter } from "./controllers/posts/postRouter.ts"

const app = new Hono()

app.get('/', (c) => c.text('Hello World!'))
app.route("/auth", authRouter)
app.route("/posts", postRouter)

Deno.serve(app.fetch)