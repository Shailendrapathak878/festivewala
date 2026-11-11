import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BackToTop } from '../components/common/BackToTop';
import { PageTransition } from '../components/animation/PageTransition';
import { FirstVisitLanguageModal } from '../components/common/FirstVisitLanguageModal';
import { MobileBottomNav } from '../components/navigation/MobileBottomNav';

export const RootLayout: React.FC = () => {
  const location = useLocation();

  // Smoothly scroll to anchor elements (e.g. #quote-of-the-day, #thought-of-the-day)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      let attempts = 0;
      const maxAttempts = 15;

      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(tryScroll, 100);
        }
      };

      const timer = setTimeout(tryScroll, 60);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-dark selection:bg-brand-gold-light/40 selection:text-brand-deep pb-16 md:pb-0 overflow-x-hidden w-full">
      <Header />
      <FirstVisitLanguageModal />
      <PageTransition key={location.pathname} className="flex-grow">
        <Outlet />
      </PageTransition>
      <Footer />
      <BackToTop />
      <MobileBottomNav />
    </div>
  );
};
