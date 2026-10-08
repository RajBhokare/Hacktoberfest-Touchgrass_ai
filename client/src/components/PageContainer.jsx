/**
 * PageContainer Component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'sm' | 'md' | 'lg' | 'full'} [props.size='lg']
 * @param {string} [props.className='']
 */
export default function PageContainer({ children, size = 'lg', className = '' }) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={`mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 ${
        sizeClasses[size] || sizeClasses.lg
      } ${className}`}
    >
      {children}
    </div>
  );
}
