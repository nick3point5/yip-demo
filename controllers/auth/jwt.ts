import { sign, verify, jwt } from "hono/jwt"
import { UserModel } from "../../models/Users.ts"
import { JWTPayload } from "hono/utils/jwt/types"

export function createJWT(user: UserModel) {
	if (!Deno.env.get("JWT_SECRET")) {
		throw new Error("no JWT_SECRET environment variable")
	}
	const payload: TokenPayload = {
		userId: user.id,
		username: user.username,
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
	}

	return sign(payload, Deno.env.get("JWT_SECRET")!)
}

export function verifyJWT(token: string) {
	if (!Deno.env.get("JWT_SECRET")) {
		throw new Error("no JWT_SECRET environment variable")
	}
	return verify(token, Deno.env.get("JWT_SECRET")!)
}

export interface TokenPayload extends JWTPayload {
	userId: number
	username: string
	exp: number
}

export function handleAuth() {
	if (!Deno.env.get("JWT_SECRET")) {
		throw new Error("no JWT_SECRET environment variable")
	}
	return jwt({
		secret: Deno.env.get("JWT_SECRET")!,
	})
}
