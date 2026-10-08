require('dotenv').config();
const express = require('express');
const cors = require('cors');

const missionRoutes = require('./routes/mission');
const aiRoutes = require('./routes/ai');
const weatherRoutes = require('./routes/weather');
const placesRoutes = require('./routes/places');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/mission', missionRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/places', placesRoutes);

// General Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'TouchGrass AI API'
  });
});

// Start Server if run directly
if (process.env.NODE_ENV !== 'production' || require.main === module) {
  app.listen(PORT, () => {
    console.log(`TouchGrass AI server running on port ${PORT}`);
  });
}

module.exports = app;
