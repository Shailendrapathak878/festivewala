import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  variant?: 'ivory' | 'glass';
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  onClick,
  to,
  href,
  icon,
  iconPosition = 'right',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  className = '',
  variant = 'ivory',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-semibold tracking-wider',
    md: 'px-6 py-2.5 text-sm font-semibold tracking-wide',
    lg: 'px-8 py-3.5 text-base font-semibold tracking-wide',
  }[size];

  const variantClasses = {
    ivory:
      'bg-brand-white/90 text-brand-deep border border-brand-gold/40 shadow-sm hover:border-brand-gold hover:bg-white hover:shadow-gold-glow/50',
    glass:
      'bg-brand-white/10 backdrop-blur-md text-brand-champagne border border-brand-champagne/30 hover:border-brand-champagne hover:bg-brand-white/20',
  }[variant];

  const baseClasses = `relative inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 font-sans cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${sizeClasses} ${variantClasses} ${
    fullWidth ? 'w-full' : ''
  } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && <span className="flex-shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (to && !disabled) {
    return (
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        className={fullWidth ? 'w-full inline-block' : 'inline-block'}
      >
        <Link to={to} className={`group ${baseClasses}`}>
          {buttonContent}
        </Link>
      </motion.div>
    );
  }

  if (href && !disabled) {
    return (
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        className={fullWidth ? 'w-full inline-block' : 'inline-block'}
      >
        <a href={href} target="_blank" rel="noopener noreferrer" className={`group ${baseClasses}`}>
          {buttonContent}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${baseClasses}`}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
    >
      {buttonContent}
    </motion.button>
  );
};
