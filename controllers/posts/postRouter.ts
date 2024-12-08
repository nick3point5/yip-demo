import { db } from "../../db/db.ts"
import { eq, sql, desc } from "drizzle-orm"
import { Hono } from "hono"
import { handleAuth, type TokenPayload } from "../auth/jwt.ts"
import { Posts } from "../../models/Posts.ts"
import { JwtVariables } from "hono/jwt"
import { getProjection } from "./getProjection.ts"
import { convertDistanceToArc } from "./convertDistanceToArc.ts"

export const postRouter = new Hono<{ Variables: JwtVariables }>()

interface Params {
	postId: string
}

interface PostBody {
	message: string
	lat: number
	lon: number
}

interface ReplyBody extends PostBody {
	replyId: number
}

postRouter.get("/q", async (c) => {
	const distance = Number(c.req.query("distance"))
	const lat = Number(c.req.query("lat"))
	const lon = Number(c.req.query("lon"))
	const limit = Number(c.req.query("limit")) ?? 10


	if (!distance || !lat || !lon) {
		return c.text("distance, lat, and lon are required", 400)
	}

	const { sin_lat, cos_lat, sin_lon, cos_lon } = getProjection(lat, lon)
	const arcDistance = convertDistanceToArc(distance)
	let sortBy
	switch (c.req.query("sortBy")) {
		case "distance":
			sortBy = desc(sql`${sin_lat} * ${Posts.sin_lat} + ${cos_lat} * ${Posts.cos_lat} * (${Posts.cos_lon} * ${cos_lon} + ${Posts.sin_lon} * ${sin_lon})`)
			break
		case "createdAt":
			sortBy = desc(Posts.createdAt)
			break
		default:
			sortBy = desc(Posts.createdAt)
			break
	}

	try {
		const posts = await db
			.select({
				id: Posts.id,
				message: Posts.message,
				username: Posts.username,
				lat: Posts.lat,
				lon: Posts.lon,
				createdAt: Posts.createdAt,
			})
			.from(Posts)
			.where(
				sql`${sin_lat} * ${Posts.sin_lat} + ${cos_lat} * ${Posts.cos_lat} * (${Posts.cos_lon} * ${cos_lon} + ${Posts.sin_lon} * ${sin_lon}) > ${arcDistance}`
			)
			.orderBy(sortBy)
			.limit(limit)
		return c.json(posts)
	} catch (error) {
		return c.text(`database error: ${error}`, 400)
	}
})
postRouter.use("/*", handleAuth())
postRouter.get("/:postId", async (c) => {
	const postId = Number(c.req.param("postId"))

	try {
		const post = await db.select().from(Posts).where(eq(Posts.id, postId)).get()
		return c.json(post)
	} catch (error) {
		return c.text(`database error: ${error}`, 400)
	}
})
postRouter.get("/", async (c) => {
	const { userId } = c.get("jwtPayload") as TokenPayload

	if (!userId) {
		return c.text("bad token", 400)
	}

	try {
		const userPosts = await db.select().from(Posts).where(eq(Posts.userId, userId))
		return c.json(userPosts)
	} catch (error) {
		return c.text(`database error: ${error}`, 400)
	}
})
postRouter.post("/", async (c) => {
	const { userId, username } = c.get("jwtPayload") as TokenPayload
	if (!userId || !username) {
		return c.text("bad token", 400)
	}
	const { message, lat, lon } = await c.req.json<PostBody>()

	if (!message || !lat || !lon) {
		return c.text("bad body", 400)
	}

	const { sin_lat, cos_lat, sin_lon, cos_lon } = getProjection(lat, lon)

	try {
		const post = await db.insert(Posts).values({
			message: message,
			sin_lat: sin_lat,
			cos_lat: cos_lat,
			sin_lon: sin_lon,
			cos_lon: cos_lon,
			lat: lat,
			lon: lon,
			root: 0,
			replyId: 0,
			userId: userId,
			username: username,
		}).returning().get()
		return c.json(post)
	} catch (error) {
		return c.text(`database error: ${error}`, 400)
	}
})
postRouter.delete("/:postId", async (c) => {
	const { userId } = c.get("jwtPayload") as TokenPayload
	const postId = Number(c.req.param("postId"))
	if (!userId) {
		return c.text("bad token", 400)
	}
	try {
		const post = await db.delete(Posts).where(eq(Posts.id, postId)).returning().get()
		if (!post) {
			return c.text("post not found", 400)
		}
		return c.json(post)
	} catch (error) {
		return c.text(`database error: ${error}`, 400)
	}
})
postRouter.post("/reply", async (c) => {
	const { userId, username } = c.get("jwtPayload") as TokenPayload
	if (!userId || !username) {
		return c.text("bad token", 400)
	}
	const { message, lat, lon, replyId } = await c.req.json<ReplyBody>()

	if (!message || !lat || !lon || !lon) {
		return c.text("bad body", 400)
	}

	const post = await db.select().from(Posts).where(eq(Posts.id, replyId)).get()
	if (!post) {
		return c.text("post not found", 400)
	}
	const root = post.root !== 0 ? post.root : post.id

	const { sin_lat, cos_lat, sin_lon, cos_lon } = getProjection(lat, lon)

	try {
		const post = await db.insert(Posts).values({
			message: message,
			sin_lat: sin_lat,
			cos_lat: cos_lat,
			sin_lon: sin_lon,
			cos_lon: cos_lon,
			lat: lat,
			lon: lon,
			root: root,
			replyId: replyId,
			userId: userId,
			username: username,
		}).returning().get()
		return c.json(post)
	} catch (error) {
		return c.text(`database error: ${error}`, 400)
	}
})