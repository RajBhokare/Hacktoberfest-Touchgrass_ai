const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen3:4b';

/**
 * Generate mission text from local Ollama instance
 * @param {string} prompt
 * @returns {Promise<string>}
 */
async function generateMission(prompt) {
  let response;
  try {
    response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: prompt,
        stream: false,
        keep_alive: '15m',
      }),
    });
  } catch (err) {
    if (err.code === 'ECONNREFUSED' || err.cause?.code === 'ECONNREFUSED' || err.message?.includes('fetch failed')) {
      const error = new Error('Local AI service is unavailable. Make sure Ollama is running.');
      error.status = 503;
      throw error;
    }
    throw err;
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    const error = new Error(`Ollama API error: ${response.status} ${response.statusText} ${errorText}`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data.response;
}

/**
 * Check Ollama connectivity and model availability
 * @returns {Promise<{ status: string, provider: string, model: string, local: boolean }>}
 */
async function checkOllamaHealth() {
  try {
    const res = await fetch(`${OLLAMA_HOST}/api/tags`, {
      method: 'GET',
    });

    if (!res.ok) {
      const err = new Error('Ollama server returned non-200 status');
      err.status = res.status;
      throw err;
    }

    const data = await res.json();
    const models = data.models || [];
    const modelFound = models.some(
      (m) => m.name === OLLAMA_MODEL || m.name?.startsWith(`${OLLAMA_MODEL}:`) || m.name?.startsWith(OLLAMA_MODEL)
    );

    if (!modelFound) {
      const err = new Error(`Model ${OLLAMA_MODEL} not found in Ollama`);
      err.status = 404;
      err.availableModels = models.map((m) => m.name);
      throw err;
    }

    return {
      status: 'ok',
      provider: 'Ollama',
      model: OLLAMA_MODEL,
      local: true,
    };
  } catch (err) {
    if (err.code === 'ECONNREFUSED' || err.cause?.code === 'ECONNREFUSED' || err.message?.includes('fetch failed')) {
      const error = new Error('Local AI service is unavailable. Make sure Ollama is running.');
      error.status = 503;
      throw error;
    }
    throw err;
  }
}

module.exports = {
  generateMission,
  checkOllamaHealth,
};
