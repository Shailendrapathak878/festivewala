import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface PrimaryButtonProps {
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
  variant?: 'gold' | 'royal';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
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
  variant = 'royal',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-semibold tracking-wider',
    md: 'px-6 py-2.5 text-sm font-semibold tracking-wide',
    lg: 'px-8 py-3.5 text-base font-semibold tracking-wide',
  }[size];

  const variantClasses = {
    royal:
      'bg-brand-deep text-brand-champagne border border-brand-gold/40 shadow-royal hover:shadow-gold-glow hover:border-brand-gold',
    gold:
      'bg-gradient-to-r from-brand-champagne via-brand-gold to-[#B8860B] text-brand-deep font-bold border border-brand-gold-light/60 shadow-md hover:shadow-gold-glow',
  }[variant];

  const baseClasses = `relative inline-flex items-center justify-center gap-2.5 rounded-full transition-all duration-300 font-sans cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${sizeClasses} ${variantClasses} ${
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
