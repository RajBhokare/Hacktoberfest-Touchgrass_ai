/**
 * ProgressIndicator Component - Visual step indicator for mission progression
 * @param {Object} props
 * @param {Array<{ key: string, label: string }>} [props.steps]
 * @param {string} props.currentStepKey
 * @param {(key: string) => void} [props.onStepClick]
 */
export default function ProgressIndicator({
  steps = [
    { key: 'generate', label: '1. Setup' },
    { key: 'mission', label: '2. Mission' },
    { key: 'complete', label: '3. Complete' },
  ],
  currentStepKey = 'generate',
  onStepClick,
}) {
  const currentIndex = steps.findIndex((s) => s.key === currentStepKey);

  return (
    <nav aria-label="Progress" className="w-full max-w-md mx-auto my-4">
      <ol className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const isCurrent = step.key === currentStepKey;
          const isDone = idx < currentIndex;

          return (
            <li key={step.key} className="flex-1 relative flex items-center">
              <button
                type="button"
                disabled={!onStepClick}
                onClick={() => onStepClick && onStepClick(step.key)}
                className={`flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26533c] rounded-md ${
                  onStepClick ? 'cursor-pointer' : 'cursor-default'
                }`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-150 ${
                    isCurrent
                      ? 'bg-[#1b3b2b] text-white ring-4 ring-[#e3ece5]'
                      : isDone
                      ? 'bg-[#26533c] text-white'
                      : 'bg-[#e7e1d5] text-[#717d74]'
                  }`}
                >
                  {isDone ? '✓' : idx + 1}
                </span>
                <span
                  className={`text-xs font-medium hidden sm:inline ${
                    isCurrent
                      ? 'text-[#1b3b2b] font-semibold'
                      : isDone
                      ? 'text-[#345341]'
                      : 'text-[#87938a]'
                  }`}
                >
                  {step.label}
                </span>
              </button>

              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 sm:mx-3 transition-colors duration-150 ${
                    idx < currentIndex ? 'bg-[#26533c]' : 'bg-[#e2dcce]'
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
