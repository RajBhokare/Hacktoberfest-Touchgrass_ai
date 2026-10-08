import React, { useState } from 'react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import PageContainer from '../components/PageContainer';
import ProgressIndicator from '../components/ProgressIndicator';

/**
 * MissionCompletePage Component - Calm & Reflective Outdoor Wrap-up
 * @param {Object} props
 * @param {(page: string) => void} props.onNavigate
 * @param {Object} [props.sessionSummary]
 */
export default function MissionCompletePage({ onNavigate, sessionSummary }) {
  const [reflection, setReflection] = useState('');
  const [savedLocally, setSavedLocally] = useState(false);

  const timeSpent = sessionSummary?.timeSpent || '30 minutes';
  const completedCount = sessionSummary?.completedCount ?? 3;
  const totalChallenges = sessionSummary?.totalChallenges ?? 3;
  const missionTitle = sessionSummary?.missionTitle || 'Sensory Nature Walk';

  const handleSaveReflection = (e) => {
    e.preventDefault();
    if (reflection.trim()) {
      setSavedLocally(true);
    }
  };

  return (
    <PageContainer size="md">
      <ProgressIndicator currentStepKey="complete" onStepClick={(key) => onNavigate(key)} />

      {/* Completion Header */}
      <div className="text-center pt-4 mb-8">
        <Badge variant="moss" className="mb-4">
          OUTDOOR SESSION LOGGED
        </Badge>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#152a1e] tracking-tight">
          Mission Complete 🌿
        </h1>

        <p className="text-base sm:text-lg text-[#55665d] mt-3 max-w-lg mx-auto leading-relaxed">
          You stepped away from screens and reconnected with the physical world. Your mind and body thank you.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#f8f5ee] border border-[#e3ded2] rounded-3xl p-6 text-center">
          <span className="text-2xl mb-1 block">⏱️</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1b3b2b]">
            {timeSpent}
          </div>
          <div className="text-xs font-semibold text-[#66776d] uppercase tracking-wider mt-1">
            Time Spent Outdoors
          </div>
        </div>

        <div className="bg-[#f8f5ee] border border-[#e3ded2] rounded-3xl p-6 text-center">
          <span className="text-2xl mb-1 block">🎯</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1b3b2b]">
            {completedCount} of {totalChallenges} Tasks
          </div>
          <div className="text-xs font-semibold text-[#66776d] uppercase tracking-wider mt-1">
            Challenges Completed
          </div>
        </div>
      </div>

      {/* Mission title badge */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#f2ece0] border border-[#ded6c5] text-xs sm:text-sm font-medium text-[#2d3b32]">
          <span>🌲</span>
          <span>Mission: <strong>{missionTitle}</strong></span>
        </span>
      </div>

      {/* Short Mindful Reflection Section (No database/account) */}
      <div className="bg-[#f8f5ee] border border-[#e3ded2] rounded-3xl p-6 sm:p-8 mb-10 shadow-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-[#e9f2ec] text-[#1b3b2b] flex items-center justify-center text-lg">
            ✍️
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1b3b2b]">
              What did you notice?
            </h2>
            <p className="text-xs text-[#6e7f75]">
              Optional personal reflection on your walk (kept only in your current session).
            </p>
          </div>
        </div>

        {savedLocally ? (
          <div className="p-4 rounded-2xl bg-[#e9f2ec] border border-[#bad9c4] text-[#1b3b2b] text-sm animate-in fade-in">
            <div className="font-semibold text-xs uppercase tracking-wider text-[#347051] mb-1">
              Your observation:
            </div>
            <p className="italic text-[#294233]">"{reflection}"</p>
          </div>
        ) : (
          <form onSubmit={handleSaveReflection} className="space-y-3">
            <textarea
              rows="3"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="e.g., Felt calm after feeling overwhelmed earlier. Noticed the breeze and cool bark..."
              className="w-full p-4 rounded-2xl bg-[#fbf9f5] border border-[#ded8cc] text-sm text-[#1b3b2b] placeholder-[#8d9e94] focus:outline-none focus:ring-2 focus:ring-[#26533c] focus:bg-white resize-none"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                disabled={!reflection.trim()}
              >
                Record Observation
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <Button
          variant="primary"
          size="lg"
          onClick={() => onNavigate('generate')}
          className="w-full sm:w-auto shadow-md"
        >
          <span>🌱</span>
          <span>Create Another Mission</span>
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => onNavigate('home')}
          className="w-full sm:w-auto"
        >
          I'm Done — Go Enjoy the World
        </Button>
      </div>
    </PageContainer>
  );
}
