import { hash, verify } from "@ts-rex/bcrypt"
import { eq } from "drizzle-orm"
import { db } from "../../db/db.ts"
import { Hono } from "hono"
import { createJWT } from "./jwt.ts"
import { Users } from "../../models/Users.ts"

export const authRouter = new Hono()

interface AuthBody {
	username: string
	password: string
}

authRouter.post("/signup", async (c) => {
	const { username, password } = await c.req.json<AuthBody>()
	if (!username || !password) {
		return c.text("username and Password are required", 400)
	}

	let user = await db.select().from(Users).where(eq(Users.username, username)).get()
	if (user) {
		return c.text("username taken", 400)
	}

	const passwordHash = await hash(password)

	user = await db.insert(Users).values({
		username,
		password: passwordHash,
	}).returning().get()

	const token = await createJWT(user)

	return c.json({token})
})

authRouter.post("/login", async (c) => {
	const { username, password } = await c.req.json<AuthBody>()

	if (!username || !password) {
		return c.text("username and Password are required", 400)
	}

	const user = await db.select().from(Users).where(eq(Users.username, username)).get()
	if (!user) {
		return c.text("user not found", 400)
	}


	const match = verify(password, user.password)
	console.log(match)
	if (!match) {
		return c.text("user not found", 400)
	}

	const token = await createJWT(user)

	return c.json({token})
})
