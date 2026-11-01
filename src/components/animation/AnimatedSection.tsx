import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TIMINGS, EASINGS } from './motionVariants';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  id,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: TIMINGS.section,
        delay,
        ease: EASINGS.luxuryEase,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};
