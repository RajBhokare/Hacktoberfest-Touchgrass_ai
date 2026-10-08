import { useState } from 'react';
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
    <PageContainer size="md" className="pb-16">
      <ProgressIndicator currentStepKey="complete" onStepClick={(key) => onNavigate(key)} />

      {/* Completion Header */}
      <div className="text-center pt-4 mb-8">
        <Badge variant="moss" className="mb-4">
          OUTDOOR SESSION COMPLETE
        </Badge>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#152a1e] tracking-tight">
          Mission Accomplished 🌿
        </h1>

        <p className="text-base sm:text-lg text-[#526358] mt-3 max-w-lg mx-auto leading-relaxed">
          You stepped away from artificial screens and reconnected with the physical world.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#f5f1e8] border border-[#e2ddd0] rounded-3xl p-6 text-center">
          <span className="text-2xl mb-1 block">⏱️</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#152a1e]">
            {timeSpent}
          </div>
          <div className="text-xs font-semibold text-[#66776d] uppercase tracking-wider mt-1">
            Time Spent Outdoors
          </div>
        </div>

        <div className="bg-[#f5f1e8] border border-[#e2ddd0] rounded-3xl p-6 text-center">
          <span className="text-2xl mb-1 block">🎯</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#152a1e]">
            {completedCount} of {totalChallenges} Tasks
          </div>
          <div className="text-xs font-semibold text-[#66776d] uppercase tracking-wider mt-1">
            Challenges Completed
          </div>
        </div>
      </div>

      {/* Mission title badge */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#f0ebdE] border border-[#ded5c5] text-xs sm:text-sm font-medium text-[#2d3b32]">
          <span>🌲</span>
          <span>Completed Mission: <strong>{missionTitle}</strong></span>
        </span>
      </div>

      {/* Mindful Reflection Section (Session-only, zero tracking) */}
      <div className="bg-[#f8f5ee] border border-[#e3ded2] rounded-3xl p-6 sm:p-8 mb-10 shadow-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#e9f2ec] text-[#1b3b2b] flex items-center justify-center text-lg">
            ✍️
          </div>
          <div>
            <h2 className="text-base font-bold text-[#152a1e]">
              What did you notice outside?
            </h2>
            <p className="text-xs text-[#6e7f75]">
              Optional personal reflection (kept only in your active browser session).
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
              placeholder="e.g., Felt tensions ease. Noticed the smell of rain on the grass and the wind in the trees..."
              className="w-full p-4 rounded-2xl bg-[#fbf9f5] border border-[#ded8cc] text-sm text-[#152a1e] placeholder-[#8d9e94] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26533c] resize-none"
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
          className="w-full sm:w-auto shadow-sm font-semibold"
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
