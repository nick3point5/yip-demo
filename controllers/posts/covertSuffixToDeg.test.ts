import { assertAlmostEquals } from "jsr:@std/assert"
import { convertSuffixToDeg } from "./covertSuffixToDeg.ts"


Deno.test("convertSuffixToDeg 1", () => {
	const {lat, lon} = convertSuffixToDeg(`40°1'19"N 75°10'3"W`)
	assertAlmostEquals(lat, 40.021938, 0.0001)
	assertAlmostEquals(lon, -75.167530, 0.0001)
})