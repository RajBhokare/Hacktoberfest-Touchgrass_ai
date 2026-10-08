/**
 * Button Component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'primary' | 'secondary' | 'outline' | 'ghost'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.fullWidth=false]
 * @param {boolean} [props.disabled=false]
 * @param {() => void} [props.onClick]
 * @param {'button' | 'submit' | 'reset'} [props.type='button']
 * @param {string} [props.className='']
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...rest
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26533c] focus-visible:ring-offset-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 shadow-sm',
  };

  const variantStyles = {
    primary:
      'bg-[#1b3b2b] text-white hover:bg-[#26533c] active:bg-[#132a1c] border border-[#1b3b2b]',
    secondary:
      'bg-[#f0ece1] text-[#1b3b2b] hover:bg-[#e6e0d3] active:bg-[#ded6c5] border border-[#ded8cb]',
    outline:
      'bg-transparent text-[#1b3b2b] border border-[#1b3b2b]/30 hover:bg-[#1b3b2b]/5 active:bg-[#1b3b2b]/10',
    ghost:
      'bg-transparent text-[#415147] hover:bg-[#1b3b2b]/5 hover:text-[#1b3b2b]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${sizeStyles[size] || sizeStyles.md}
        ${variantStyles[variant] || variantStyles.primary}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
}
