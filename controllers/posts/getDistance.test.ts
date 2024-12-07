import { assertAlmostEquals } from "jsr:@std/assert"
import { getDistance } from "./getDistance.ts"
import { getProjection } from "./getProjection.ts"

Deno.test("getDistance 1", () => {
	const projection1 = getProjection(40.021938, -75.167530)
	const projection2 = getProjection(40.02777777777778, -75.167530)
	const result = getDistance(projection1, projection2)

	assertAlmostEquals(result, 0.6486, 0.001)
})

