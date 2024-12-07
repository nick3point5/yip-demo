import { migrate } from "drizzle-orm/libsql/migrator"
import { db } from "./db.ts"

async function runMigration() {
	console.log("Running migration...")
	await migrate(db, { migrationsFolder: "./drizzle" })
	console.log("Migration completed successfully")
}

runMigration().catch((error) => {
	console.error("Migration failed:", error)
	Deno.exit(1)
})
