const express = require('express');
const router = express.Router();
const { getNearbyOutdoorPlaces } = require('../services/places');

/**
 * GET /api/places?latitude=...&longitude=...
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
    const places = await getNearbyOutdoorPlaces(lat, lon);
    return res.json(places);
  } catch (err) {
    console.error('Places route error:', err.message);
    return res.json([]);
  }
});

module.exports = router;
