import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-brand-deep text-brand-champagne border border-brand-gold/60 shadow-royal hover:shadow-gold-glow hover:border-brand-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold transition-colors duration-200"
          aria-label={t.footer.backToTop}
          title={t.footer.backToTop}
        >
          <ArrowUp size={18} className="text-brand-gold" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

