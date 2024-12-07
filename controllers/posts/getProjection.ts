import { convertDegToRad } from "./convertDegToRad.ts"

export function getProjection(lat: number, lon: number) {
	const lat_rad = convertDegToRad(lat)
	const lon_rad = convertDegToRad(lon)

	const sin_lat = Math.sin(lat_rad)
	const cos_lat = Math.cos(lat_rad)

	const sin_lon = Math.sin(lon_rad)
	const cos_lon = Math.cos(lon_rad)

	return { sin_lat, cos_lat, sin_lon, cos_lon }
}