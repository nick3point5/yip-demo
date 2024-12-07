import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { type InferSelectModel } from "drizzle-orm"

export const Users = sqliteTable("users", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	username: text("username").notNull().unique(),
	password: text("password").notNull(),
	createdAt: text("createdAt").notNull().default(sql`(current_timestamp)`),
})

export type UserModel = InferSelectModel<typeof Users>
