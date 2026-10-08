import React, { useState } from 'react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import MissionOption from '../components/MissionOption';
import PageContainer from '../components/PageContainer';
import ProgressIndicator from '../components/ProgressIndicator';
import { generateMission, getWeatherApi, getPlacesApi } from '../services/api';

/**
 * GenerateMissionPage Component
 * @param {Object} props
 * @param {(page: string) => void} props.onNavigate
 * @param {(mission: Object) => void} props.onMissionGenerated
 */
export default function GenerateMissionPage({ onNavigate, onMissionGenerated }) {
  const [mood, setMood] = useState('Stressed');
  const [time, setTime] = useState('30 min');
  const [difficulty, setDifficulty] = useState('Easy');
  const [activity, setActivity] = useState('Nature');

  // Location and environmental context state
  const [coords, setCoords] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle'); // 'idle' | 'getting' | 'ready' | 'denied' | 'error'
  const [weatherPreview, setWeatherPreview] = useState(null);
  const [placesPreview, setPlacesPreview] = useState([]);
  const [loadingContext, setLoadingContext] = useState(false);

  // Generation state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const moods = [
    { label: 'Relaxed', icon: '🍃' },
    { label: 'Stressed', icon: '💭' },
    { label: 'Bored', icon: '☕' },
    { label: 'Low Energy', icon: '🔋' },
    { label: 'Energetic', icon: '⚡' },
    { label: 'Need a Mental Break', icon: '🧠' },
  ];

  const times = [
    { label: '15 min', icon: '⏱️' },
    { label: '30 min', icon: '⏱️' },
    { label: '60 min', icon: '⏱️' },
    { label: '90 min', icon: '⏱️' },
    { label: '2+ hours', icon: '⏳' },
  ];

  const difficulties = [
    {
      label: 'Easy',
      description: 'Gentle stroll, deep breaths, light sensory observation',
      icon: '🌱',
    },
    {
      label: 'Moderate',
      description: 'Steady pacing, slight elevation or active exploration',
      icon: '🌿',
    },
    {
      label: 'Challenging',
      description: 'Brisk walk, longer trail distance, active movement',
      icon: '🌲',
    },
  ];

  const activities = [
    { label: 'Nature', icon: '🏞️' },
    { label: 'Walking', icon: '🚶' },
    { label: 'Running', icon: '🏃' },
    { label: 'Photography', icon: '📷' },
    { label: 'Birding', icon: '🐦' },
    { label: 'Gardening', icon: '🌻' },
    { label: 'Mindfulness', icon: '🧘' },
    { label: 'Surprise Me', icon: '✨' },
  ];

  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      return;
    }

    setLocationStatus('getting');
    setErrorMessage('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCoords({ latitude: lat, longitude: lon });
        setLocationStatus('ready');
        setLoadingContext(true);

        try {
          const [weatherData, placesData] = await Promise.allSettled([
            getWeatherApi(lat, lon),
            getPlacesApi(lat, lon),
          ]);

          if (weatherData.status === 'fulfilled' && weatherData.value) {
            setWeatherPreview(weatherData.value);
          }
          if (placesData.status === 'fulfilled' && Array.isArray(placesData.value)) {
            setPlacesPreview(placesData.value);
          }
        } catch {
          // non-blocking context preview
        } finally {
          setLoadingContext(false);
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus('denied');
        } else {
          setLocationStatus('error');
        }
        setCoords(null);
        setWeatherPreview(null);
        setPlacesPreview([]);
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 60000,
      }
    );
  };

  const handleClearLocation = () => {
    setCoords(null);
    setLocationStatus('idle');
    setWeatherPreview(null);
    setPlacesPreview([]);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!mood || !time || !difficulty || !activity) {
      setErrorMessage('Please choose all required preferences before generating.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const payload = {
        mood,
        time,
        difficulty,
        activity,
      };

      if (coords?.latitude && coords?.longitude) {
        payload.latitude = coords.latitude;
        payload.longitude = coords.longitude;
      }

      const missionData = await generateMission(payload);

      if (onMissionGenerated) {
        onMissionGenerated(missionData);
      }
      onNavigate('mission');
    } catch (err) {
      setErrorMessage(
        err.message ||
          'Local AI is unavailable. Make sure Ollama and the TouchGrass server are running.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper text for button
  const getLocationButtonText = () => {
    switch (locationStatus) {
      case 'getting':
        return 'Getting Location...';
      case 'ready':
        return 'Location Ready ✓';
      case 'denied':
        return 'Location Permission Denied';
      case 'error':
        return 'Unable to determine location';
      default:
        return 'Use My Location';
    }
  };

  return (
    <PageContainer size="md">
      <ProgressIndicator currentStepKey="generate" onStepClick={(key) => onNavigate(key)} />

      <div className="text-center mb-10 pt-4">
        <Badge variant="forest" className="mb-3">
          Step 1 • Customize Itinerary
        </Badge>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#152a1e] tracking-tight">
          Create Your Outdoor Mission
        </h1>
        <p className="text-sm sm:text-base text-[#5c6d63] mt-2 max-w-lg mx-auto">
          Choose your current state and available time. Local AI will generate a tailored micro-adventure.
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3 shadow-xs animate-in fade-in"
        >
          <span className="text-lg">⚠️</span>
          <div className="flex-1">
            <div className="font-semibold text-xs uppercase tracking-wider text-amber-800 mb-0.5">
              Service Notice
            </div>
            <div>{errorMessage}</div>
          </div>
        </div>
      )}

      <form onSubmit={handleGenerate} className="space-y-10">
        {/* Section: Mood */}
        <div className="bg-[#f8f5ee] border border-[#e3ded2] rounded-3xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-base font-bold text-[#1b3b2b] flex items-center gap-2">
              <span>💭</span>
              <span>How are you feeling right now?</span>
            </label>
            <span className="text-xs text-[#6e7d73]">Select your mood</span>
          </div>

          <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Mood selection">
            {moods.map((m) => (
              <MissionOption
                key={m.label}
                label={m.label}
                icon={m.icon}
                selected={mood === m.label}
                onClick={() => setMood(m.label)}
              />
            ))}
          </div>
        </div>

        {/* Section: Available Time */}
        <div className="bg-[#f8f5ee] border border-[#e3ded2] rounded-3xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-base font-bold text-[#1b3b2b] flex items-center gap-2">
              <span>⏱️</span>
              <span>How much time do you have?</span>
            </label>
            <span className="text-xs text-[#6e7d73]">Duration</span>
          </div>

          <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Time selection">
            {times.map((t) => (
              <MissionOption
                key={t.label}
                label={t.label}
                icon={t.icon}
                selected={time === t.label}
                onClick={() => setTime(t.label)}
              />
            ))}
          </div>
        </div>

        {/* Section: Difficulty */}
        <div className="bg-[#f8f5ee] border border-[#e3ded2] rounded-3xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-base font-bold text-[#1b3b2b] flex items-center gap-2">
              <span>🥾</span>
              <span>Choose Difficulty</span>
            </label>
            <span className="text-xs text-[#6e7d73]">Intensity level</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Difficulty selection">
            {difficulties.map((d) => (
              <MissionOption
                key={d.label}
                type="card"
                label={d.label}
                description={d.description}
                icon={d.icon}
                selected={difficulty === d.label}
                onClick={() => setDifficulty(d.label)}
              />
            ))}
          </div>
        </div>

        {/* Section: Activity Preference */}
        <div className="bg-[#f8f5ee] border border-[#e3ded2] rounded-3xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-base font-bold text-[#1b3b2b] flex items-center gap-2">
              <span>🎯</span>
              <span>Activity Preference</span>
            </label>
            <span className="text-xs text-[#6e7d73]">Style of mission</span>
          </div>

          <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Activity preference">
            {activities.map((a) => (
              <MissionOption
                key={a.label}
                label={a.label}
                icon={a.icon}
                selected={activity === a.label}
                onClick={() => setActivity(a.label)}
              />
            ))}
          </div>
        </div>

        {/* Section: Location & Environmental Context */}
        <div className="bg-[#f8f5ee] border border-[#e3ded2] rounded-3xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#1b3b2b] flex items-center gap-2">
                <span>📍</span>
                <span>Location & Outdoor Context</span>
              </h3>
              <p className="text-xs text-[#6e7d73] mt-0.5">
                Optional: Adapts mission to current local weather and nearby green spaces.
              </p>
            </div>
            <Badge variant={locationStatus === 'ready' ? 'moss' : 'earth'}>
              {locationStatus === 'ready' ? 'Active' : 'Optional'}
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#fbf9f5] border border-[#e5dfd2]">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {locationStatus === 'ready' ? '📍' : locationStatus === 'getting' ? '⏳' : '🗺️'}
              </span>
              <div>
                <div className="text-sm font-semibold text-[#1b3b2b]">
                  {locationStatus === 'ready'
                    ? 'Location Ready'
                    : locationStatus === 'getting'
                    ? 'Locating your device...'
                    : locationStatus === 'denied'
                    ? 'Location Access Denied'
                    : locationStatus === 'error'
                    ? 'Location Unavailable'
                    : 'Location Not Set'}
                </div>
                <div className="text-xs text-[#67776d]">
                  {locationStatus === 'ready'
                    ? 'Coordinates will be used for weather & nearby places (never stored)'
                    : locationStatus === 'denied'
                    ? 'Permission was denied in browser. Generating without location.'
                    : 'Click button to fetch weather and nearby parks.'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {locationStatus === 'ready' && (
                <button
                  type="button"
                  onClick={handleClearLocation}
                  className="text-xs text-[#718076] hover:text-[#1b3b2b] px-2 py-1.5 underline cursor-pointer"
                >
                  Clear
                </button>
              )}
              <Button
                type="button"
                variant={locationStatus === 'ready' ? 'secondary' : 'primary'}
                size="sm"
                disabled={locationStatus === 'getting'}
                onClick={locationStatus === 'ready' ? handleClearLocation : handleRequestLocation}
              >
                {getLocationButtonText()}
              </Button>
            </div>
          </div>

          {/* Context Preview Panel when location is ready */}
          {locationStatus === 'ready' && (
            <div className="p-4 rounded-2xl bg-[#f0ebdE] border border-[#ded5c5] space-y-2.5 text-xs text-[#3a483f] animate-in fade-in">
              <div className="font-semibold text-[#1b3b2b] flex items-center gap-1.5">
                <span>📍</span>
                <span>Location ready</span>
                {loadingContext && <span className="text-[10px] text-[#55675c] italic ml-2">(Gathering weather & places...)</span>}
              </div>

              {weatherPreview && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-sm">🌤️</span>
                  <span>
                    <strong>Current weather:</strong> {weatherPreview.temperature}°C · {weatherPreview.condition} · {weatherPreview.rainProbability}% rain · {weatherPreview.windSpeed} km/h wind
                  </span>
                </div>
              )}

              {placesPreview.length > 0 && (
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-sm">🌲</span>
                  <div>
                    <strong>Nearby:</strong>{' '}
                    {placesPreview.slice(0, 3).map((p, i) => (
                      <span key={p.name}>
                        {p.name} ({p.distance} km){i < Math.min(placesPreview.length, 3) - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-[10px] text-[#718076] pt-1 border-t border-[#dfd6c6]">
                🔒 <em>Privacy Note: Exact GPS coordinates are never sent to the AI model.</em>
              </div>
            </div>
          )}
        </div>

        {/* Submit Action */}
        <div className="pt-4 text-center">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="w-full sm:w-auto min-w-[280px] shadow-md"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin mr-2">🌿</span>
                <span>Creating Your Mission...</span>
              </>
            ) : (
              <>
                <span>✨</span>
                <span>Generate My Mission</span>
              </>
            )}
          </Button>

          <p className="text-xs text-[#718076] mt-3">
            Local generation runs via Ollama (`qwen3:4b`). No telemetry or cloud tracking.
          </p>
        </div>
      </form>
    </PageContainer>
  );
}
