import { defineConfig } from "drizzle-kit"
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.DB_URL) {
	throw new Error("no DB_URL environment variable")
}

if(!process.env.DB_TOKEN) {
	throw new Error("no DB_TOKEN environment variable")
}

export default defineConfig({
  dialect: "turso",
  schema: [
		"./models/Users.ts",
		"./models/Posts.ts",
		"./models/Followers.ts",
	],
  dbCredentials: {
    url: process.env.DB_URL,
		authToken: process.env.DB_TOKEN,
  },
})
