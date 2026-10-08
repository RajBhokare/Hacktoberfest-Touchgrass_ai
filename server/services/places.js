/**
 * Calculate Haversine distance in kilometers between two coordinates
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @returns {number}
 */
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Fetch nearby outdoor places from OpenStreetMap Nominatim
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<Array<{ name: string, type: string, distance: number }>>}
 */
async function getNearbyOutdoorPlaces(latitude, longitude) {
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return [];
  }

  const delta = 0.045; // ~4.5km bounding box
  const viewbox = `${lon - delta},${lat + delta},${lon + delta},${lat - delta}`;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=park&limit=10&viewbox=${viewbox}&bounded=1`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'TouchGrassAI/1.0 (Hacktoberfest Challenge - dev@touchgrass.ai)',
        Accept: 'application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return [];
    }

    const items = await res.json();
    const seen = new Set();
    const places = [];

    for (const item of items) {
      const name = item.name || (item.display_name ? item.display_name.split(',')[0].trim() : null);
      if (!name || seen.has(name.toLowerCase())) continue;
      seen.add(name.toLowerCase());

      const pLat = parseFloat(item.lat);
      const pLon = parseFloat(item.lon);
      const distance = !isNaN(pLat) && !isNaN(pLon) ? calculateDistanceKm(lat, lon, pLat, pLon) : 1.0;

      let type = 'park';
      const typeStr = (item.type || item.category || '').toLowerCase();
      if (typeStr.includes('garden')) type = 'garden';
      else if (typeStr.includes('nature') || typeStr.includes('reserve')) type = 'nature reserve';
      else if (typeStr.includes('forest') || typeStr.includes('wood')) type = 'woodland';

      places.push({ name, type, distance });
    }

    places.sort((a, b) => a.distance - b.distance);
    return places.slice(0, 5);
  } catch (err) {
    console.warn('Places lookup failed gracefully:', err.message);
    return [];
  }
}

module.exports = {
  getNearbyOutdoorPlaces,
};
