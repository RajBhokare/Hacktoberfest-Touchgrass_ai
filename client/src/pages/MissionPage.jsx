import React, { useState, useEffect, useRef } from 'react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import PageContainer from '../components/PageContainer';
import ProgressIndicator from '../components/ProgressIndicator';
import { parseDurationToSeconds, formatTime, formatElapsedHuman } from '../utils/time';

/**
 * MissionPage Component - Minimal Outdoor Mission Mode
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
    phoneRule: 'Pocket your phone and enjoy the world. No scrolling or emails during the walk.',
    safetyNote: 'Stay aware of your surroundings, traffic, and footing at all times.',
  };

  const activeMission = mission || defaultMission;

  // Initialize challenges
  const [challengeStates, setChallengeStates] = useState(() => {
    const raw = activeMission.challenges || [];
    return raw.map((c, idx) => ({
      id: idx + 1,
      text: typeof c === 'string' ? c : c.text || c.title || `Challenge ${idx + 1}`,
      completed: false,
    }));
  });

  // Re-sync if mission changes
  useEffect(() => {
    const raw = activeMission.challenges || [];
    setChallengeStates(
      raw.map((c, idx) => ({
        id: idx + 1,
        text: typeof c === 'string' ? c : c.text || c.title || `Challenge ${idx + 1}`,
        completed: false,
      }))
    );
  }, [activeMission]);

  // Timer state
  const initialTotalSeconds = useRef(parseDurationToSeconds(activeMission.duration));
  const [remainingSeconds, setRemainingSeconds] = useState(initialTotalSeconds.current);
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
    const elapsedSeconds = Math.max(10, initialTotalSeconds.current - remainingSeconds);
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
    <PageContainer size="md" className="relative">
      <ProgressIndicator currentStepKey="mission" onStepClick={(key) => onNavigate(key)} />

      {/* Header */}
      <div className="text-center pt-4 mb-8">
        <Badge variant="moss" className="mb-3 animate-pulse">
          ● MISSION ACTIVE
        </Badge>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#152a1e] tracking-tight">
          {activeMission.title}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-xs text-[#5f6f65]">
          <span className="bg-[#f2ece0] px-3 py-1 rounded-full border border-[#e0d8cb]">
            🌱 {activeMission.difficulty}
          </span>
          <span className="bg-[#f2ece0] px-3 py-1 rounded-full border border-[#e0d8cb]">
            ⏱️ {activeMission.duration} Target
          </span>
          <span className="bg-[#e9f2ec] text-[#1b3b2b] px-3 py-1 rounded-full border border-[#c8ded0] font-semibold">
            🧠 Qwen 3 4B Mission
          </span>
        </div>
      </div>

      {/* PHONE DOWN Banner (Critical Step 7 requirement) */}
      <div className="bg-[#1b3b2b] text-white rounded-3xl p-6 sm:p-7 shadow-sm mb-8 border border-[#274b37]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl shrink-0">
            📵
          </div>
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
              PHONE DOWN
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Your mission is outside this screen. Review your challenges below, then slide your phone into your pocket and enjoy the world.
            </p>
          </div>
        </div>
      </div>

      {/* Countdown Timer Block */}
      <div className="bg-[#f8f5ee] border border-[#e3ded2] rounded-3xl p-6 sm:p-7 text-center mb-8 shadow-xs">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#6c7d72] block">
          {remainingSeconds === 0 ? 'Outdoor Time Complete' : 'Time Remaining'}
        </span>

        <div
          className={`text-5xl sm:text-6xl font-mono font-bold my-3 tracking-tight ${
            remainingSeconds === 0 ? 'text-[#347051]' : 'text-[#1b3b2b]'
          }`}
        >
          {formatTime(remainingSeconds)}
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#eae4d5] text-[#1b3b2b] hover:bg-[#ded6c3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26533c] transition-colors cursor-pointer"
          >
            <span>{isPaused ? '▶ Resume Timer' : '⏸ Pause Timer'}</span>
          </button>

          <span className="text-xs text-[#718277]">
            {isPaused ? '(Paused)' : 'Counting down in real-time'}
          </span>
        </div>
      </div>

      {/* Active Challenges Block */}
      <div className="bg-[#f8f5ee] border border-[#e3ded2] rounded-3xl p-6 sm:p-7 mb-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#e2dccf] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#1b3b2b] flex items-center gap-2">
              <span>🎯</span>
              <span>Outdoor Challenges</span>
            </h3>
            <p className="text-xs text-[#6e8075] mt-0.5">
              Check off tasks as you complete them outside.
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1b3b2b] text-white">
            {completedCount}/{totalChallenges} Done
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {challengeStates.map((c, idx) => (
            <label
              key={c.id}
              className={`
                flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer select-none
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
                className="w-5 h-5 mt-0.5 rounded-lg border-2 border-[#1b3b2b] text-[#1b3b2b] focus:ring-[#26533c] cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#347051]">
                    Challenge 0{idx + 1}
                  </span>
                  {c.completed && (
                    <span className="text-[10px] bg-[#347051] text-white px-2 py-0.5 rounded-md font-semibold">
                      Completed ✓
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm sm:text-base font-medium mt-1 leading-relaxed ${
                    c.completed ? 'line-through text-[#63756a]' : 'text-[#1b3b2b]'
                  }`}
                >
                  {c.text}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Safety & Objective context */}
      {activeMission.safetyNote && (
        <div className="p-4 rounded-2xl bg-[#f4efe4] border border-[#ded7ca] text-xs text-[#5d6e64] mb-8 flex items-start gap-2.5">
          <span className="text-base">⚠️</span>
          <div>
            <strong className="text-[#1b3b2b]">Safety First:</strong>{' '}
            {activeMission.safetyNote}
          </div>
        </div>
      )}

      {/* Bottom Mission Actions */}
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
          className="w-full sm:w-auto min-w-[240px] shadow-md"
        >
          <span>🌿</span>
          <span>Finish Mission</span>
        </Button>

        <Button
          variant="ghost"
          size="md"
          onClick={() => onNavigate('generate')}
        >
          Abort / Create New Mission
        </Button>
      </div>

      {/* Confirmation Modal when finishing early */}
      {showConfirmFinish && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#132a1c]/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-[#fbf9f5] border border-[#ded7ca] rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#e9f2ec] text-[#1b3b2b] text-2xl flex items-center justify-center mx-auto">
              🌿
            </div>
            <h3 id="modal-title" className="text-lg font-bold text-[#1b3b2b]">
              Finish Outdoor Mission?
            </h3>
            <p className="text-xs sm:text-sm text-[#5a6b61] leading-relaxed">
              You have completed <strong>{completedCount} of {totalChallenges}</strong> challenges with {formatTime(remainingSeconds)} remaining. Ready to wrap up?
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
                Keep Going Outside
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
