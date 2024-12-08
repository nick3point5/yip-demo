import { assertAlmostEquals } from "jsr:@std/assert"
import { getDistance, getDistance2 } from "./getDistance.ts"
import { getProjection } from "./getProjection.ts"

Deno.test("getDistance 1", () => {
	const projection1 = getProjection(40.021938, -75.167530)
	const projection2 = getProjection(40.02777777777778, -75.167530)
	const result = getDistance(projection1, projection2)

	assertAlmostEquals(result, 0.6486, 0.001)
})

Deno.test("getDistance 2", () => {
	const coordinates1 = {lat: 40.021938, lon: -75.167530}
	const coordinates2 = {lat: 40.02777777777778, lon: -75.167530}
	const result = getDistance2(coordinates1, coordinates2)

	assertAlmostEquals(result, 0.6486, 0.001)
})

