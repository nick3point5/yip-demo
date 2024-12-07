import { integer, sqliteTable } from "drizzle-orm/sqlite-core"
import { type InferSelectModel } from "drizzle-orm"

export const Followers = sqliteTable("followers", {
	id: integer("id").primaryKey({autoIncrement: true}),
	userId: integer("userId").notNull(),
	followed: integer("followed").notNull(),
})

export type postType = InferSelectModel<typeof Followers>
