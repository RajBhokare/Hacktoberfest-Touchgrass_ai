import React from 'react';

/**
 * Badge Component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'forest' | 'earth' | 'moss' | 'amber'} [props.variant='forest']
 * @param {string} [props.className='']
 */
export default function Badge({ children, variant = 'forest', className = '' }) {
  const variantStyles = {
    forest: 'bg-[#e9f2ec] text-[#1b3b2b] border-[#c8ded0]',
    earth: 'bg-[#f4efe4] text-[#63513b] border-[#decbb4]',
    moss: 'bg-[#ecf4df] text-[#3e5223] border-[#cbdeb0]',
    amber: 'bg-[#fef3e2] text-[#8a5d1b] border-[#f5d5a7]',
  };

  const style = variantStyles[variant] || variantStyles.forest;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${style} ${className}`}
    >
      {children}
    </span>
  );
}
