import React from 'react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import PageContainer from '../components/PageContainer';

/**
 * HomePage Component
 * @param {Object} props
 * @param {(page: string) => void} props.onNavigate
 */
export default function HomePage({ onNavigate }) {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* Hero Section */}
      <section className="pt-8 sm:pt-16 text-center max-w-3xl mx-auto px-4">
        <Badge variant="forest" className="mb-6">
          LOCAL AI • REAL-WORLD ADVENTURES
        </Badge>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#152a1e] tracking-tight leading-[1.15] mb-6">
          Your next adventure starts when you put your phone down.
        </h1>

        <p className="text-base sm:text-xl text-[#4f5f55] leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto font-normal">
          TouchGrass AI creates personalized outdoor missions using local open-weight AI — so the screen helps you leave the screen.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate('generate')}
            className="w-full sm:w-auto shadow-md"
          >
            <span>🌿</span>
            <span>Create My Mission</span>
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={scrollToHowItWorks}
            className="w-full sm:w-auto"
          >
            How It Works
          </Button>
        </div>
      </section>

      {/* Visual Flow Representation: AI → Mission → Outside */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#f4efe4] border border-[#e1dacd] rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5c6e62]">
              The Antidote to Screen Fatigue
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1b3b2b] mt-1">
              A Thoughtful Loop Built for the Real World
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-[#fbf9f5] border border-[#e3ded2] rounded-2xl p-6 flex flex-col items-center text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#e9f2ec] text-[#1b3b2b] flex items-center justify-center text-2xl font-bold mb-4">
                🧠
              </div>
              <div className="text-xs font-semibold text-[#347051] uppercase tracking-wider mb-1">
                Step 1: Local AI
              </div>
              <h3 className="text-base font-bold text-[#1b3b2b] mb-2">
                Context-Aware Intelligence
              </h3>
              <p className="text-xs sm:text-sm text-[#5f6f65] leading-relaxed">
                Runs completely on your device with Ollama & Qwen. It evaluates your current energy, mood, and available time.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#fbf9f5] border border-[#e3ded2] rounded-2xl p-6 flex flex-col items-center text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#fef3e2] text-[#8a5d1b] flex items-center justify-center text-2xl font-bold mb-4">
                📋
              </div>
              <div className="text-xs font-semibold text-[#8a5d1b] uppercase tracking-wider mb-1">
                Step 2: Mission
              </div>
              <h3 className="text-base font-bold text-[#1b3b2b] mb-2">
                Focused Micro-Challenges
              </h3>
              <p className="text-xs sm:text-sm text-[#5f6f65] leading-relaxed">
                You receive 3 actionable, sensory outdoor challenges with a simple rule: pocket your phone during the walk.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#fbf9f5] border border-[#e3ded2] rounded-2xl p-6 flex flex-col items-center text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#ecf4df] text-[#3e5223] flex items-center justify-center text-2xl font-bold mb-4">
                🌲
              </div>
              <div className="text-xs font-semibold text-[#3e5223] uppercase tracking-wider mb-1">
                Step 3: Outside
              </div>
              <h3 className="text-base font-bold text-[#1b3b2b] mb-2">
                Real World Presence
              </h3>
              <p className="text-xs sm:text-sm text-[#5f6f65] leading-relaxed">
                Breathe fresh air, feel the earth beneath your feet, and return with a refreshed mind and restored focus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge variant="moss" className="mb-3">
            GUIDED SIMPLICITY
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#152a1e] tracking-tight">
            How TouchGrass AI Works
          </h2>
          <p className="text-sm sm:text-base text-[#59695f] mt-2 max-w-xl mx-auto">
            No infinite feeds. No addictive gamification algorithms. Just a gentle nudge out the door.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl bg-[#f8f5ee] border border-[#e5dfd2]">
            <div className="w-10 h-10 rounded-xl bg-[#1b3b2b] text-white flex items-center justify-center font-bold text-sm shrink-0">
              01
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1b3b2b] mb-1">
                Tell us how much time and energy you have
              </h3>
              <p className="text-sm text-[#5a6a60] leading-relaxed">
                Whether you have 15 minutes between meetings or 2 hours on a Sunday morning, the generator shapes a realistic, non-overwhelming itinerary.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl bg-[#f8f5ee] border border-[#e5dfd2]">
            <div className="w-10 h-10 rounded-xl bg-[#1b3b2b] text-white flex items-center justify-center font-bold text-sm shrink-0">
              02
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1b3b2b] mb-1">
                Local AI crafts your tailored mission
              </h3>
              <p className="text-sm text-[#5a6a60] leading-relaxed">
                Qwen 3 4B synthesizes creative prompts that stimulate sensory curiosity — like spotting specific bark textures or tracking bird calls.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl bg-[#f8f5ee] border border-[#e5dfd2]">
            <div className="w-10 h-10 rounded-xl bg-[#1b3b2b] text-white flex items-center justify-center font-bold text-sm shrink-0">
              03
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1b3b2b] mb-1">
                Pocket your device & touch grass
              </h3>
              <p className="text-sm text-[#5a6a60] leading-relaxed">
                The UI switches to Mission Mode with a minimal timer. When you return, mark your challenges complete and reflect on your walk.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="mt-12 text-center p-8 sm:p-10 rounded-3xl bg-[#1b3b2b] text-white shadow-md">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
            Ready to take your first break?
          </h3>
          <p className="text-emerald-100/80 text-sm sm:text-base max-w-md mx-auto mb-6">
            Generate an outdoor mission in 5 seconds and experience the benefits of green space.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => onNavigate('generate')}
            className="shadow-sm"
          >
            Create My Mission Now
          </Button>
        </div>
      </section>
    </div>
  );
}
