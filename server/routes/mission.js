const express = require('express');
const router = express.Router();
const { generateMission } = require('../services/ollama');
const { getWeather } = require('../services/weather');
const { getNearbyOutdoorPlaces } = require('../services/places');

/**
 * Robust JSON extractor and validator for Qwen 3 4B output
 * @param {string} rawText
 * @param {{ mood: string, time: string, difficulty: string }} fallbackContext
 * @returns {Object}
 */
function extractAndValidateMission(rawText, fallbackContext) {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error('Empty or non-string response received from AI model');
  }

  // 1. Remove <think>...</think> reasoning blocks if present (Qwen3 feature)
  let cleaned = rawText.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

  // 2. Remove markdown code fences if model wrapped output in ```json ... ```
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  // 3. Extract JSON between the outermost '{' and '}'
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error('AI output did not contain a valid JSON object structure');
  }

  cleaned = cleaned.substring(firstBrace, lastBrace + 1);

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`JSON syntax error in AI output: ${err.message}`);
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Parsed AI mission is not an object');
  }

  // Handle camelCase and snake_case keys
  const title = String(parsed.title || parsed.mission_title || parsed.name || '').trim();
  const duration = String(parsed.duration || parsed.time || parsed.target_time || fallbackContext.time || '30 min').trim();
  const difficulty = String(parsed.difficulty || parsed.difficulty_level || fallbackContext.difficulty || 'Easy').trim();
  const description = String(parsed.description || parsed.objective || parsed.summary || '').trim();
  const phoneRule = String(parsed.phoneRule || parsed.phone_rule || parsed.phone_instruction || 'Pocket your phone immediately to stay present and avoid digital distractions.').trim();
  const safetyNote = String(parsed.safetyNote || parsed.safety_note || parsed.safety || 'Stay aware of your surroundings, traffic, and footing at all times.').trim();

  if (!title || title.length < 3) {
    throw new Error(`Mission title is missing or too short (length: ${title.length})`);
  }
  if (!description || description.length < 10) {
    throw new Error(`Mission description is missing or too short (length: ${description.length})`);
  }

  // Handle challenges array (strings, objects, or challenge1/2/3 keys)
  let rawChallenges = parsed.challenges || parsed.tasks || parsed.micro_challenges || [];
  if (!Array.isArray(rawChallenges)) {
    if (parsed.challenge1 && parsed.challenge2 && parsed.challenge3) {
      rawChallenges = [parsed.challenge1, parsed.challenge2, parsed.challenge3];
    } else {
      throw new Error('Challenges must be an array of tasks');
    }
  }

  const sanitizedChallenges = [];
  for (const item of rawChallenges) {
    let text = '';
    if (typeof item === 'string') {
      text = item.trim();
    } else if (item && typeof item === 'object') {
      text = String(item.text || item.title || item.instruction || item.description || item.challenge || '').trim();
    }
    if (text && text.length >= 4) {
      sanitizedChallenges.push(text);
    }
  }

  if (sanitizedChallenges.length < 3) {
    throw new Error(`Expected at least 3 outdoor challenges, extracted ${sanitizedChallenges.length}`);
  }

  // Ensure exactly 3 challenges
  const finalChallenges = sanitizedChallenges.slice(0, 3);

  return {
    title,
    duration,
    difficulty,
    description,
    challenges: finalChallenges,
    phoneRule,
    safetyNote,
  };
}

/**
 * POST /api/mission
 * Generate structured outdoor mission based on user preferences and environmental context
 */
router.post('/', async (req, res) => {
  try {
    const { mood, time, difficulty, activity, latitude, longitude } = req.body;

    // Validate required preference fields
    if (!mood || !time || !difficulty || !activity) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Missing required fields: mood, time, difficulty, and activity are all required.'
      });
    }

    let weatherInfo = null;
    let nearbyPlaces = [];

    // If coordinates are provided, retrieve weather and nearby outdoor places
    if (latitude !== undefined && longitude !== undefined) {
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);

      if (!isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
        try {
          const [weatherResult, placesResult] = await Promise.allSettled([
            getWeather(lat, lon),
            getNearbyOutdoorPlaces(lat, lon),
          ]);

          if (weatherResult.status === 'fulfilled') {
            weatherInfo = weatherResult.value;
          }
          if (placesResult.status === 'fulfilled') {
            nearbyPlaces = placesResult.value || [];
          }
        } catch (ctxErr) {
          console.warn('Context gathering warning (continuing without context):', ctxErr.message);
        }
      }
    }

    // Build context description WITHOUT coordinates for privacy
    let contextBlock = '';
    if (weatherInfo) {
      contextBlock += `\n- Current Weather: ${weatherInfo.temperature}°C, ${weatherInfo.condition}, Wind: ${weatherInfo.windSpeed} km/h, Rain Probability: ${weatherInfo.rainProbability}%`;
    }
    if (nearbyPlaces.length > 0) {
      const placesList = nearbyPlaces
        .map((p) => `${p.name} (${p.type}, ~${p.distance} km away)`)
        .join(', ');
      contextBlock += `\n- Verified Nearby Outdoor Places: ${placesList}`;
    }

    // Construct concise, high-adherence prompt for Qwen 3 4B
    const prompt = `You are TouchGrass AI, an expert outdoor adventure creator.
Your purpose is to help users spend less time on screens and reconnect with the physical world through safe, engaging outdoor micro-missions.

USER PREFERENCES:
- Mood: ${mood}
- Target Available Time: ${time}
- Difficulty Level: ${difficulty}
- Activity Preference: ${activity}${contextBlock}

INSTRUCTIONS:
1. Duration & Scope: Create 3 distinct challenges realistically achievable within ${time} at ${difficulty} intensity.
2. Safety & Legality: NEVER suggest dangerous, illegal, nighttime, or private-property trespass activities. No special equipment required.
3. No Medical Claims: Do not make medical or mental-health claims.
4. Phone-Free: Require the user to pocket their phone during the session.
5. Location Rule: If verified nearby places are provided above, suggest one. NEVER invent fake specific park names.
6. Weather Adaptation: If current weather has rain, high wind, or extreme temperatures, adapt the activity and safety precautions accordingly.
7. Challenges: You MUST provide EXACTLY 3 actionable outdoor challenges as a list of strings in the "challenges" array.

OUTPUT FORMAT:
Return ONLY a raw, valid JSON object matching this schema with NO markdown code fences and NO extra words:
{
  "title": "Short Inspiring Title",
  "duration": "${time}",
  "difficulty": "${difficulty}",
  "description": "2-3 sentences explaining the outdoor mission objective.",
  "challenges": [
    "Challenge 1 actionable instruction",
    "Challenge 2 actionable instruction",
    "Challenge 3 actionable instruction"
  ],
  "phoneRule": "Specific phone pocketing instruction",
  "safetyNote": "Practical safety advice"
}`;

    const rawResponse = await generateMission(prompt);

    let mission;
    try {
      mission = extractAndValidateMission(rawResponse, { mood, time, difficulty });
    } catch (validationErr) {
      console.error('Mission validation failed:', validationErr.message, '\nRaw Response:', rawResponse);
      return res.status(500).json({
        error: 'Quality & Structure Validation Error',
        message: 'The AI model generated an incomplete or invalid mission structure. Please try again.',
        details: validationErr.message
      });
    }

    return res.json(mission);
  } catch (err) {
    console.error('Error in mission endpoint:', err.message);

    if (err.status === 503 || err.message?.includes('unavailable') || err.message?.includes('Ollama')) {
      return res.status(503).json({
        error: 'Service Unavailable',
        message: 'Local AI service is unavailable. Make sure Ollama is running.'
      });
    }

    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred while generating your mission.'
    });
  }
});

module.exports = router;
