const express = require('express');
const router = express.Router();
const { getWeather } = require('../services/weather');

/**
 * GET /api/weather?latitude=...&longitude=...
 */
router.get('/', async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'latitude and longitude query parameters are required.',
    });
  }

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return res.status(400).json({
      error: 'Invalid Coordinates',
      message: 'latitude must be between -90 and 90, and longitude between -180 and 180.',
    });
  }

  try {
    const weather = await getWeather(lat, lon);
    if (!weather) {
      return res.status(502).json({
        error: 'Weather Unavailable',
        message: 'Unable to retrieve weather data for the provided coordinates.',
      });
    }

    return res.json(weather);
  } catch (err) {
    console.error('Weather route error:', err.message);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve weather information.',
    });
  }
});

module.exports = router;
