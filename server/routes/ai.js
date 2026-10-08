const express = require('express');
const router = express.Router();
const { checkOllamaHealth } = require('../services/ollama');

/**
 * GET /api/ai/health
 * Check whether Ollama is reachable and whether qwen3:4b is available
 */
router.get('/health', async (req, res) => {
  try {
    const health = await checkOllamaHealth();
    return res.json(health);
  } catch (err) {
    console.error('AI Health check failed:', err.message);

    return res.status(err.status || 503).json({
      status: 'error',
      provider: 'Ollama',
      message: err.message || 'Local AI service is unavailable. Make sure Ollama is running.',
      local: true
    });
  }
});

module.exports = router;
