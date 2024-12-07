export function convertSuffixToDeg(suffix: string) {
	const parts = suffix.split(" ")
	const lat_suffix = parts[0]
	const lon_suffix = parts[1]
	const lat = suffixToDeg(lat_suffix) * (lat_suffix.at(-1) === "S" ? -1 : 1)
	const lon = suffixToDeg(lon_suffix) * (lon_suffix.at(-1) === "W" ? -1 : 1)
	return { lat, lon }
}

function suffixToDeg(suffix: string) {
	const deg = parseInt(suffix.split("°")[0])
	const min = parseInt(suffix.split("°")[1].split("'")[0])
	const sec = parseInt(suffix.split("°")[1].split("'")[1].split('"')[0])
	return deg + min / 60 + sec / 3600
}