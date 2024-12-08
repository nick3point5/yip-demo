import { convertDegToRad } from "./convertDegToRad.ts"

type ProjectionType = {
	sin_lat: number
	cos_lat: number
	sin_lon: number
	cos_lon: number
}

export function getDistance(projection1: ProjectionType, projection2: ProjectionType) {
	const earthRadiusKm = 6371
	const a = projection1.sin_lat * projection2.sin_lat + projection1.cos_lat * projection2.cos_lat * (projection1.cos_lon * projection2.cos_lon + projection1.sin_lon * projection2.sin_lon)
	return earthRadiusKm * Math.acos(a)
}

export function getDistance2(coordinates1: {lat: number, lon: number}, coordinates2: {lat: number, lon: number}) {
	const { lat: lat1, lon: lon1 } = coordinates1
	const { lat: lat2, lon: lon2 } = coordinates2

	const earthRadiusKm = 6371
	const phi1 = convertDegToRad(lat1)
	const phi2 = convertDegToRad(lat2)
	const deltaPhi = convertDegToRad(lat2 - lat1)
	const deltaLambda = convertDegToRad(lon2 - lon1)

	const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

	const d = earthRadiusKm * c

	return d
}