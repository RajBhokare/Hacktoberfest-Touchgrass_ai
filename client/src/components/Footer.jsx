/**
 * Footer Component
 */
export default function Footer() {
  return (
    <footer className="w-full border-t border-[#e5dfd2] bg-[#f5f1e8] text-[#55635a] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌿</span>
              <span className="font-bold text-base text-[#1b3b2b]">TouchGrass AI</span>
            </div>
            <p className="text-sm leading-relaxed text-[#617066]">
              Personalized outdoor micro-adventures designed to help you disconnect from digital noise and reconnect with the natural world.
            </p>
          </div>

          {/* AI Architecture Note */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1b3b2b]">
              Local Intelligence
            </h4>
            <ul className="text-sm space-y-1.5 text-[#5e6c62]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#347051]" />
                Built with local open-weight AI.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#347051]" />
                Powered by Ollama + Qwen.
              </li>
              <li className="flex items-center gap-2 text-xs text-[#7e8e84]">
                Private inference running right on your machine.
              </li>
            </ul>
          </div>

          {/* Hacktoberfest & Open Source */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1b3b2b]">
              Hacktoberfest 2026
            </h4>
            <p className="text-sm text-[#5e6c62] leading-relaxed">
              Created for the Open-Source AI Challenge Week 1: <em>Touch Grass</em>.
            </p>
            <div className="text-xs text-[#7e8e84]">
              Open-source software designed with intention.
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#e2dccf] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78887e]">
          <p>© {new Date().getFullYear()} TouchGrass AI. Leave the screen, enjoy the world.</p>
          <div className="flex items-center gap-4">
            <span>JavaScript + React</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Express</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
