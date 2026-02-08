'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';

type IconButtonVariant = 'default' | 'ghost' | 'danger';
type IconButtonSize = 'sm' | 'md' | 'lg';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  label?: string;
}

const variantStyles: Record<IconButtonVariant, string> = {
  default: 'bg-surface hover:bg-surface-secondary text-text-secondary hover:text-text-primary',
  ghost: 'bg-transparent hover:bg-surface-secondary text-text-tertiary hover:text-text-primary',
  danger: 'bg-transparent hover:bg-red-50 text-text-tertiary hover:text-red-600',
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-3',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = 'ghost',
      size = 'md',
      label,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        className={`
          inline-flex items-center justify-center
          rounded-lg transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary-500
          disabled:opacity-60 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
