import { sql } from "drizzle-orm"
import { integer, text, sqliteTable, real } from "drizzle-orm/sqlite-core"
import { type InferSelectModel } from "drizzle-orm"

export const Posts = sqliteTable("posts", {
	id: integer("id").primaryKey({autoIncrement: true}),
	root: integer("root").notNull(),
	replyId: integer("replyId").notNull(),
	message: text("message").notNull(),
	username: text("username").notNull(),
	userId: integer("userId").notNull(),
	sin_lat: real("sin_lat").notNull(),
	cos_lat: real("cos_lat").notNull(),
	sin_lon: real("sin_lon").notNull(),
	cos_lon: real("cos_lon").notNull(),
	lat: real("lat").notNull(),
	lon: real("lon").notNull(),
	createdAt: text("createdAt").notNull().default(sql`(current_timestamp)`),
})

export type postType = InferSelectModel<typeof Posts>
