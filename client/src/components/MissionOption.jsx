import React from 'react';

/**
 * MissionOption Component - Selectable pill/card for mood, time, difficulty, preference
 * @param {Object} props
 * @param {string} props.label
 * @param {string} [props.description]
 * @param {React.ReactNode} [props.icon]
 * @param {boolean} props.selected
 * @param {() => void} props.onClick
 * @param {'pill' | 'card'} [props.type='pill']
 * @param {string} [props.className='']
 */
export default function MissionOption({
  label,
  description,
  icon,
  selected = false,
  onClick,
  type = 'pill',
  className = '',
}) {
  if (type === 'card') {
    return (
      <button
        type="button"
        role="radio"
        aria-checked={selected}
        onClick={onClick}
        className={`
          flex flex-col items-start p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26533c] focus-visible:ring-offset-2
          ${
            selected
              ? 'bg-[#1b3b2b] text-white border-[#1b3b2b] shadow-sm'
              : 'bg-[#f8f5ee] text-[#1d2520] border-[#e2ddd0] hover:bg-[#f2eee3] hover:border-[#d2cbbb]'
          }
          ${className}
        `}
      >
        {icon && (
          <span
            className={`text-xl mb-2 ${
              selected ? 'text-emerald-300' : 'text-[#347051]'
            }`}
          >
            {icon}
          </span>
        )}
        <span className="font-semibold text-sm sm:text-base leading-snug">
          {label}
        </span>
        {description && (
          <span
            className={`text-xs mt-1 leading-relaxed ${
              selected ? 'text-emerald-100/80' : 'text-[#617066]'
            }`}
          >
            {description}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26533c] focus-visible:ring-offset-2
        ${
          selected
            ? 'bg-[#1b3b2b] text-white border-[#1b3b2b] shadow-sm'
            : 'bg-[#f8f5ee] text-[#2c3730] border-[#e2ddd0] hover:bg-[#f2eee3] hover:border-[#d2cbbb]'
        }
        ${className}
      `}
    >
      {icon && <span className="text-base">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
