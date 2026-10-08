/**
 * WMO Weather interpretation codes (WW) mapping
 */
const WMO_WEATHER_CODES = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

/**
 * Fetch current weather from Open-Meteo API
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<{ temperature: number, apparentTemperature?: number, windSpeed: number, rainProbability: number, condition: string } | null>}
 */
async function getWeather(latitude, longitude) {
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    throw new Error('Invalid coordinates: latitude must be between -90 and 90, longitude between -180 and 180.');
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m&hourly=precipitation_probability&forecast_days=1`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Open-Meteo returned status ${res.status}`);
      return null;
    }

    const data = await res.json();
    const current = data.current || {};
    const weatherCode = current.weather_code ?? 0;
    const condition = WMO_WEATHER_CODES[weatherCode] || 'Clear';

    // Get precipitation probability for current hour if available
    let rainProbability = 0;
    if (data.hourly?.precipitation_probability?.length) {
      const currentHourIndex = new Date().getHours();
      rainProbability = data.hourly.precipitation_probability[currentHourIndex] ?? data.hourly.precipitation_probability[0] ?? 0;
    } else if (current.precipitation > 0 || current.rain > 0) {
      rainProbability = 80;
    }

    return {
      temperature: Math.round(current.temperature_2m ?? 20),
      apparentTemperature: Math.round(current.apparent_temperature ?? current.temperature_2m ?? 20),
      windSpeed: Math.round(current.wind_speed_10m ?? 5),
      rainProbability: Math.round(rainProbability),
      condition: condition,
    };
  } catch (err) {
    console.warn('Weather service failed gracefully:', err.message);
    return null;
  }
}

module.exports = {
  getWeather,
};
