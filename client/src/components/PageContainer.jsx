import React from 'react';

/**
 * PageContainer Component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'sm' | 'md' | 'lg' | 'full'} [props.size='md']
 * @param {string} [props.className='']
 */
export default function PageContainer({
  children,
  size = 'md',
  className = '',
}) {
  const sizeStyles = {
    sm: 'max-w-xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    full: 'max-w-7xl',
  };

  return (
    <main
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ${
        sizeStyles[size] || sizeStyles.md
      } ${className}`}
    >
      {children}
    </main>
  );
}
