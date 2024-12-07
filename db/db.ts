import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import "@std/dotenv/load"

if (!Deno.env.get("DB_URL")) {
	throw new Error("no DB_URL environment variable")
}
if (!Deno.env.get("DB_TOKEN")) {
	throw new Error("no DB_TOKEN environment variable")
}

const client = createClient({
	url: Deno.env.get("DB_URL")!,
	authToken: Deno.env.get("DB_TOKEN"),
})

export const db = drizzle(client)

