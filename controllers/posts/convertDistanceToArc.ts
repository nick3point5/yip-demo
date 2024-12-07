export function convertDistanceToArc(distance: number) {
	const earthRadiusKm = 6371
	return Math.cos(distance / earthRadiusKm)
}