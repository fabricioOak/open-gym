export interface Coordinate {
  latitude: number;
  longitude: number;
}

export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate
): number {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0;
  }

  const earthRadiusKm = 6371; // Raio médio da Terra em km [2, 5]

  const deltaLatitude = ((to.latitude - from.latitude) * Math.PI) / 180;
  const deltaLongitude = ((to.longitude - from.longitude) * Math.PI) / 180;

  const fromLatitudeRadian = (from.latitude * Math.PI) / 180;
  const toLatitudeRadian = (to.latitude * Math.PI) / 180;

  const a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(fromLatitudeRadian) *
      Math.cos(toLatitudeRadian) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c;

  return distance;
}
