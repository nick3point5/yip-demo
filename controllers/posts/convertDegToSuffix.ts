export function convertDegToSuffix(lat: number, lon: number) {
	const lat_suffix = degToSuffix(lat) + (lat > 0 ? "N" : "S")
	const lon_suffix = degToSuffix(lon) + (lon > 0 ? "E" : "W")

	return `${lat_suffix} ${lon_suffix}`
}

export function degToSuffix(angle: number) {
	const deg = Math.trunc(angle)
	const min = Math.trunc((angle - deg) * 60)
	const sec = Math.round((angle - deg - min / 60) * 3600)
	return `${Math.abs(deg)}°${Math.abs(min)}'${Math.abs(sec)}"`
}

