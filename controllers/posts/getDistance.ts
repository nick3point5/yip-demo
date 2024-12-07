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