/**
 * Parse human duration string into total seconds
 * Examples: "15 min", "30 minutes", "1 hour", "90 minutes", "2 hours", "2+ hours"
 * @param {string|number} duration
 * @returns {number} duration in seconds
 */
export function parseDurationToSeconds(duration) {
  if (typeof duration === 'number' && !isNaN(duration) && duration > 0) {
    return duration;
  }

  if (!duration || typeof duration !== 'string') {
    return 30 * 60; // 30 minutes default
  }

  const clean = duration.toLowerCase().trim();

  // Check for hours
  const hourMatch = clean.match(/(\d+(?:\.\d+)?)\s*(?:hour|hr|h)/);
  if (hourMatch) {
    const hours = parseFloat(hourMatch[1]);
    return Math.round(hours * 3600);
  }

  // Check for minutes
  const minMatch = clean.match(/(\d+)\s*(?:min|minute|m)/);
  if (minMatch) {
    const mins = parseInt(minMatch[1], 10);
    return mins * 60;
  }

  // Fallback defaults
  if (clean.includes('15')) return 15 * 60;
  if (clean.includes('45')) return 45 * 60;
  if (clean.includes('60')) return 60 * 60;
  if (clean.includes('90')) return 90 * 60;
  if (clean.includes('2')) return 120 * 60;

  return 30 * 60;
}

/**
 * Format seconds into MM:SS or HH:MM:SS string
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatTime(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  const pad = (n) => String(n).padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Format elapsed seconds into human readable duration string
 * Example: 1840 -> "31 minutes"
 * @param {number} elapsedSeconds
 * @returns {string}
 */
export function formatElapsedHuman(elapsedSeconds) {
  const mins = Math.max(1, Math.round(elapsedSeconds / 60));
  if (mins === 1) return '1 minute';
  if (mins >= 60) {
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    if (remMins === 0) return `${hrs} hour${hrs > 1 ? 's' : ''}`;
    return `${hrs}h ${remMins}m`;
  }
  return `${mins} minutes`;
}
