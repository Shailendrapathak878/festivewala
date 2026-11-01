import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';

interface NavItem {
  key: string;
  path: string;
  label: string;
}

export const DesktopNavigation: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { t } = useLanguage();

  const navItems: NavItem[] = [
    { key: 'home', path: '/', label: t.nav.home },
    { key: 'festivals', path: '/festivals', label: t.nav.festivals },
    { key: 'rangoli', path: '/rangoli', label: t.nav.rangoli },
    { key: 'decorations', path: '/decoration-ideas', label: t.nav.decorations },
    { key: 'gifts', path: '/gift-ideas', label: t.nav.gifts },
    { key: 'guides', path: '/festival-guides', label: t.nav.guides },
    { key: 'greetingCards', path: '/greeting-cards', label: t.nav.greetingCards },
    { key: 'wishes', path: '/wishes', label: t.nav.wishes },
  ];

  return (
    <nav className={`hidden xl:flex items-center space-x-0.5 lg:space-x-1 ${className}`} aria-label="Main Navigation">
      {navItems.map((item) => (
        <NavLink
          key={item.key}
          to={item.path}
          className={({ isActive }) =>
            `relative px-2.5 lg:px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors duration-200 rounded-lg group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${
              isActive
                ? 'text-brand-deep font-semibold'
                : 'text-brand-dark/80 hover:text-brand-deep'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className="relative z-10 tracking-wide">{item.label}</span>
              {/* Subtle hover background highlight */}
              <span
                className="absolute inset-0 rounded-lg bg-brand-light/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-hidden="true"
              />

              {/* Active Golden Underline Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-brand-gold via-brand-champagne to-brand-gold rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  aria-hidden="true"
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

