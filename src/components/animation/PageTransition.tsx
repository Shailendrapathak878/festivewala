import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { pageTransitionVariants } from './motionVariants';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  // Scroll to top on route change if no anchor hash is present
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  if (shouldReduceMotion) {
    return <main className={`w-full ${className}`}>{children}</main>;
  }

  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitionVariants}
      className={`w-full ${className}`}
    >
      {children}
    </motion.main>
  );
};
