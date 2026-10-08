const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Generate mission from backend Ollama integration with optional environmental context
 * @param {{ mood: string, time: string, difficulty: string, activity: string, latitude?: number, longitude?: number }} preferences
 * @returns {Promise<Object>}
 */
export async function generateMission(preferences) {
  const { mood, time, difficulty, activity, latitude, longitude } = preferences || {};

  if (!mood || !time || !difficulty || !activity) {
    throw new Error('Please select all preferences (mood, time, difficulty, and activity) before generating.');
  }

  const payload = { mood, time, difficulty, activity };
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    payload.latitude = latitude;
    payload.longitude = longitude;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/mission`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    throw new Error('Local AI is unavailable. Make sure Ollama and the TouchGrass server are running.', { cause: err });
  }

  if (!response.ok) {
    let errorMessage = 'Local AI is unavailable. Make sure Ollama and the TouchGrass server are running.';
    try {
      const errorData = await response.json();
      if (errorData?.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // fallback
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

/**
 * Fetch current weather from backend Open-Meteo integration
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<{ temperature: number, windSpeed: number, rainProbability: number, condition: string } | null>}
 */
export async function getWeatherApi(latitude, longitude) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/weather?latitude=${latitude}&longitude=${longitude}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

/**
 * Fetch nearby outdoor places from backend OpenStreetMap integration
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<Array<{ name: string, type: string, distance: number }>>}
 */
export async function getPlacesApi(latitude, longitude) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/places?latitude=${latitude}&longitude=${longitude}`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/**
 * Check backend and local Ollama health status
 * @returns {Promise<{ status: string, provider: string, model: string, local: boolean }>}
 */
export async function checkAiHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/health`);
    if (!response.ok) {
      throw new Error('Local AI service is unreachable');
    }
    return response.json();
  } catch (err) {
    throw new Error('Local AI is unavailable. Make sure Ollama and the TouchGrass server are running.', { cause: err });
  }
}

export const generateMissionApi = generateMission;
export const checkAiHealthApi = checkAiHealth;
