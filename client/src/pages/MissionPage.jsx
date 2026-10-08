import { useState, useEffect } from 'react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import PageContainer from '../components/PageContainer';
import ProgressIndicator from '../components/ProgressIndicator';
import { parseDurationToSeconds, formatTime, formatElapsedHuman } from '../utils/time';

/**
 * MissionPage Component - Intentionally Minimal Outdoor Mission Mode
 * @param {Object} props
 * @param {(page: string) => void} props.onNavigate
 * @param {Object} [props.mission]
 * @param {(summary: Object) => void} [props.onMissionFinished]
 */
export default function MissionPage({ onNavigate, mission, onMissionFinished }) {
  const defaultMission = {
    title: 'Sensory Nature Walk',
    duration: '30 min',
    difficulty: 'Easy',
    description:
      'Step away from artificial blue light. Head toward the nearest green space and ground your senses without digital distractions.',
    challenges: [
      'Find 3 distinct tree bark textures along your route and touch them.',
      'Close your eyes for 3 continuous minutes and identify 4 distinct natural sounds.',
      'Touch living grass, moist moss, or natural soil with your bare hands.',
    ],
    phoneRule: 'Pocket your phone and enjoy the world. No scrolling or checking messages.',
    safetyNote: 'Stay aware of your surroundings, traffic, and footing at all times.',
  };

  const activeMission = mission || defaultMission;
  const initialDurationSeconds = parseDurationToSeconds(activeMission.duration);

  // Initialize challenges
  const [challengeStates, setChallengeStates] = useState(() => {
    const raw = activeMission.challenges || [];
    return raw.map((c, idx) => ({
      id: idx + 1,
      text: typeof c === 'string' ? c : c.text || c.title || `Challenge ${idx + 1}`,
      completed: false,
    }));
  });

  // Timer state
  const [remainingSeconds, setRemainingSeconds] = useState(initialDurationSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [showConfirmFinish, setShowConfirmFinish] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    if (isPaused || remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, remainingSeconds]);

  const toggleChallenge = (id) => {
    setChallengeStates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  const completedCount = challengeStates.filter((c) => c.completed).length;
  const totalChallenges = challengeStates.length || 3;

  const handleFinish = () => {
    const elapsedSeconds = Math.max(10, initialDurationSeconds - remainingSeconds);
    const summary = {
      missionTitle: activeMission.title,
      timeSpent: formatElapsedHuman(elapsedSeconds),
      completedCount,
      totalChallenges,
      challenges: challengeStates,
    };

    if (onMissionFinished) {
      onMissionFinished(summary);
    }
    setShowConfirmFinish(false);
    onNavigate('complete');
  };

  return (
    <PageContainer size="md" className="relative pb-16">
      <ProgressIndicator currentStepKey="mission" onStepClick={(key) => onNavigate(key)} />

      {/* Intentionally Minimal Outdoor Header */}
      <div className="text-center pt-2 mb-6">
        <Badge variant="moss" className="mb-2.5">
          ● MISSION ACTIVE
        </Badge>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#152a1e] tracking-tight">
          {activeMission.title}
        </h1>

        <div className="flex items-center justify-center gap-2 mt-2 text-xs text-[#596a5f]">
          <span>{activeMission.difficulty}</span>
          <span>•</span>
          <span>{activeMission.duration} Target</span>
        </div>
      </div>

      {/* Prominent PHONE DOWN Reminder */}
      <div className="bg-[#1b3b2b] text-white rounded-3xl p-6 sm:p-7 shadow-xs mb-8 border border-[#274b37]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl shrink-0">
            📵
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide uppercase">
              Phone Down
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mt-0.5">
              {activeMission.phoneRule || 'Pocket your phone. Your adventure is in the physical world.'}
            </p>
          </div>
        </div>
      </div>

      {/* Large Minimal Timer */}
      <div className="bg-[#f8f5ee] border border-[#e3ded2] rounded-3xl p-8 sm:p-10 text-center mb-8 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-widest text-[#6c7d72] block">
          {remainingSeconds === 0 ? 'Outdoor Goal Reached' : 'Time Remaining'}
        </span>

        <div
          className={`text-6xl sm:text-7xl font-mono font-extrabold my-4 tracking-tight ${
            remainingSeconds === 0 ? 'text-[#347051]' : 'text-[#152a1e]'
          }`}
          aria-live="polite"
        >
          {formatTime(remainingSeconds)}
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#e8e2d4] text-[#1b3b2b] hover:bg-[#ded6c3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26533c] transition-colors cursor-pointer"
          >
            <span>{isPaused ? '▶ Resume Timer' : '⏸ Pause Timer'}</span>
          </button>
          {isPaused && <span className="text-xs text-[#718277] italic">(Timer Paused)</span>}
        </div>
      </div>

      {/* Large Readable Challenge Tasks */}
      <div className="bg-[#f8f5ee] border border-[#e3ded2] rounded-3xl p-6 sm:p-8 mb-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#e2dccf] pb-3">
          <h3 className="text-base font-bold text-[#152a1e] flex items-center gap-2">
            <span>🎯</span>
            <span>Outdoor Challenges</span>
          </h3>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1b3b2b] text-white">
            {completedCount} of {totalChallenges} Complete
          </span>
        </div>

        <div className="space-y-3 pt-1" role="group" aria-label="Mission challenges">
          {challengeStates.map((c, idx) => (
            <label
              key={c.id}
              className={`
                flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer select-none
                ${
                  c.completed
                    ? 'bg-[#e9f2ec] border-[#bad9c4] text-[#1b3b2b]'
                    : 'bg-[#fbf9f5] border-[#e4dfd4] hover:bg-[#f2ece0]'
                }
              `}
            >
              <input
                type="checkbox"
                checked={c.completed}
                onChange={() => toggleChallenge(c.id)}
                className="w-6 h-6 mt-0.5 rounded-lg border-2 border-[#1b3b2b] text-[#1b3b2b] focus:ring-[#26533c] cursor-pointer shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#347051]">
                    Task 0{idx + 1}
                  </span>
                  {c.completed && (
                    <span className="text-[10px] bg-[#347051] text-white px-2 py-0.5 rounded-md font-semibold">
                      Done ✓
                    </span>
                  )}
                </div>
                <p
                  className={`text-base sm:text-lg font-medium leading-relaxed ${
                    c.completed ? 'line-through text-[#63756a]' : 'text-[#152a1e]'
                  }`}
                >
                  {c.text}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Practical Safety Note */}
      {activeMission.safetyNote && (
        <div className="p-4 rounded-2xl bg-[#f4efe4] border border-[#ded7ca] text-xs text-[#526358] mb-8 flex items-start gap-2.5">
          <span className="text-base">⚠️</span>
          <div>
            <strong className="text-[#152a1e]">Safety reminder:</strong>{' '}
            {activeMission.safetyNote}
          </div>
        </div>
      )}

      {/* Minimal Mission Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            if (completedCount < totalChallenges && remainingSeconds > 60) {
              setShowConfirmFinish(true);
            } else {
              handleFinish();
            }
          }}
          className="w-full sm:w-auto min-w-[240px] shadow-sm font-semibold"
        >
          <span>🌿</span>
          <span>Finish Mission</span>
        </Button>

        <Button
          variant="ghost"
          size="md"
          onClick={() => onNavigate('generate')}
        >
          Abort / New Mission
        </Button>
      </div>

      {/* Early Wrap-up Confirmation Modal */}
      {showConfirmFinish && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#132a1c]/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-[#fbf9f5] border border-[#ded7ca] rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#e9f2ec] text-[#1b3b2b] text-2xl flex items-center justify-center mx-auto">
              🌿
            </div>
            <h3 id="modal-title" className="text-lg font-bold text-[#152a1e]">
              Wrap Up Mission Early?
            </h3>
            <p className="text-xs sm:text-sm text-[#5a6b61] leading-relaxed">
              You finished <strong>{completedCount} of {totalChallenges}</strong> challenges with {formatTime(remainingSeconds)} remaining. Complete now?
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={handleFinish}
              >
                Yes, Complete Mission
              </Button>
              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => setShowConfirmFinish(false)}
              >
                Continue Outside
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
