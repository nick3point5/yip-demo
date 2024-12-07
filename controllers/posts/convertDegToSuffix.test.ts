import { assertEquals } from "jsr:@std/assert"
import { convertDegToSuffix, degToSuffix } from "./convertDegToSuffix.ts"

Deno.test("degToSuffix 1", () => {
	const result = degToSuffix(40.021938)
	assertEquals(result, `40°1'19"`);
})

Deno.test("degToSuffix 2", () => {
	const result = degToSuffix(-75.167530)
	assertEquals(result, `75°10'3"`);
})

Deno.test("convertDegToSuffix", () => {
	const result = convertDegToSuffix(40.021938, -75.167530)
	assertEquals(result, `40°1'19"N 75°10'3"W`);
})