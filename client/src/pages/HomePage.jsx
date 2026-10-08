import Badge from '../components/Badge';
import Button from '../components/Button';

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
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* Hero Section */}
      <section className="pt-10 sm:pt-20 text-center max-w-3xl mx-auto px-4 sm:px-6">
        <Badge variant="forest" className="mb-6">
          LOCAL OPEN-WEIGHT AI • PRIVACY FIRST
        </Badge>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#152a1e] tracking-tight leading-[1.12] mb-6">
          Your next adventure starts when you put your phone down.
        </h1>

        <p className="text-lg sm:text-xl text-[#4a5b51] leading-relaxed mb-10 max-w-2xl mx-auto font-normal">
          Personalized outdoor missions powered by local open-weight AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate('generate')}
            className="w-full sm:w-auto shadow-sm"
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

        {/* Quiet assurance banner */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#627368]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#347051]" />
          <span>Runs 100% locally with Qwen 3 4B. No cloud tracking.</span>
        </div>
      </section>

      {/* Visual Flow Representation: AI → Mission → Outside */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#f5f1e8] border border-[#e2ddd0] rounded-3xl p-6 sm:p-12">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#536459]">
              The Real-World Loop
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#152a1e] mt-2">
              From Blue Light to Fresh Air
            </h2>
            <p className="text-sm sm:text-base text-[#5c6d62] mt-2 max-w-xl mx-auto">
              Technology should give you back your attention, not steal more of it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1: AI */}
            <div className="bg-[#fbf9f5] border border-[#e5dfd2] rounded-2xl p-7 flex flex-col items-center text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#e9f2ec] text-[#1b3b2b] flex items-center justify-center text-2xl font-bold mb-4">
                🧠
              </div>
              <div className="text-xs font-bold text-[#347051] uppercase tracking-wider mb-1">
                Phase 1: Local AI
              </div>
              <h3 className="text-lg font-bold text-[#152a1e] mb-2">
                Context-Aware Generation
              </h3>
              <p className="text-sm text-[#5a6b60] leading-relaxed">
                Evaluates your mood, available time, and outdoor conditions using local Qwen 3 4B on Ollama. Private and instantaneous.
              </p>
            </div>

            {/* Step 2: Mission */}
            <div className="bg-[#fbf9f5] border border-[#e5dfd2] rounded-2xl p-7 flex flex-col items-center text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#fef3e2] text-[#8a5d1b] flex items-center justify-center text-2xl font-bold mb-4">
                📋
              </div>
              <div className="text-xs font-bold text-[#8a5d1b] uppercase tracking-wider mb-1">
                Phase 2: The Mission
              </div>
              <h3 className="text-lg font-bold text-[#152a1e] mb-2">
                Three Sensory Tasks
              </h3>
              <p className="text-sm text-[#5a6b60] leading-relaxed">
                Receive three achievable, non-repetitive challenges and an explicit phone-down rule before you step outside.
              </p>
            </div>

            {/* Step 3: Outside */}
            <div className="bg-[#fbf9f5] border border-[#e5dfd2] rounded-2xl p-7 flex flex-col items-center text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#ecf4df] text-[#3e5223] flex items-center justify-center text-2xl font-bold mb-4">
                🌲
              </div>
              <div className="text-xs font-bold text-[#3e5223] uppercase tracking-wider mb-1">
                Phase 3: Outside
              </div>
              <h3 className="text-lg font-bold text-[#152a1e] mb-2">
                Real World Presence
              </h3>
              <p className="text-sm text-[#5a6b60] leading-relaxed">
                Pocket your phone, breathe the outdoor air, observe nature directly, and return refreshed without screen fatigue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explanation of Local AI Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#f8f5ee] border border-[#e3ded2] rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#1b3b2b] text-white flex items-center justify-center text-3xl shrink-0">
              🔒
            </div>
            <div>
              <Badge variant="moss" className="mb-2">
                WHY LOCAL AI MATTERS
              </Badge>
              <h2 className="text-xl sm:text-2xl font-bold text-[#152a1e] tracking-tight">
                Zero Cloud Tracking. 100% On-Device.
              </h2>
              <p className="text-sm sm:text-base text-[#56685d] mt-2 leading-relaxed">
                Unlike cloud AI services that log your personal routines, TouchGrass AI uses <strong>Qwen 3 4B</strong> running locally inside your machine through <strong>Ollama</strong>. Your emotions, location context, and outdoor habits stay entirely on your computer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge variant="forest" className="mb-3">
            SIMPLE & INTENTIONAL
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#152a1e] tracking-tight">
            How TouchGrass AI Works
          </h2>
          <p className="text-sm sm:text-base text-[#596a5f] mt-2 max-w-xl mx-auto">
            No infinite feeds. No streaks. No points. Just a healthy nudge into the physical world.
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl bg-[#f8f5ee] border border-[#e5dfd2]">
            <div className="w-10 h-10 rounded-xl bg-[#1b3b2b] text-white flex items-center justify-center font-bold text-sm shrink-0">
              01
            </div>
            <div>
              <h3 className="text-base font-bold text-[#152a1e] mb-1">
                Select your time and state of mind
              </h3>
              <p className="text-sm text-[#57685e] leading-relaxed">
                Whether you have 15 minutes between tasks or 60 minutes after work, pick your mood, duration, difficulty, and preferred activity.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl bg-[#f8f5ee] border border-[#e5dfd2]">
            <div className="w-10 h-10 rounded-xl bg-[#1b3b2b] text-white flex items-center justify-center font-bold text-sm shrink-0">
              02
            </div>
            <div>
              <h3 className="text-base font-bold text-[#152a1e] mb-1">
                Local AI crafts a safe, grounded mission
              </h3>
              <p className="text-sm text-[#57685e] leading-relaxed">
                Qwen synthesizes 3 sensory challenges adapted to your weather, duration, and nearby green spaces with practical safety guidance.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl bg-[#f8f5ee] border border-[#e5dfd2]">
            <div className="w-10 h-10 rounded-xl bg-[#1b3b2b] text-white flex items-center justify-center font-bold text-sm shrink-0">
              03
            </div>
            <div>
              <h3 className="text-base font-bold text-[#152a1e] mb-1">
                Activate Mission Mode & pocket your phone
              </h3>
              <p className="text-sm text-[#57685e] leading-relaxed">
                The screen transforms into a distraction-free timer with large, readable challenge text so you can focus completely on your surroundings.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="mt-12 text-center p-8 sm:p-12 rounded-3xl bg-[#1b3b2b] text-white border border-[#274f39] shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
            Ready to reconnect with the outdoors?
          </h3>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
            Generate an outdoor mission in seconds and enjoy the calming benefits of nature.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => onNavigate('generate')}
            className="shadow-sm font-semibold"
          >
            Create My Mission Now
          </Button>
        </div>
      </section>
    </div>
  );
}
