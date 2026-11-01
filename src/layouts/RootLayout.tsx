import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BackToTop } from '../components/common/BackToTop';
import { PageTransition } from '../components/animation/PageTransition';
import { FirstVisitLanguageModal } from '../components/common/FirstVisitLanguageModal';
import { MobileBottomNav } from '../components/navigation/MobileBottomNav';

export const RootLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-dark selection:bg-brand-gold-light/40 selection:text-brand-deep pb-16 md:pb-0">
      <Header />
      <PageTransition key={location.pathname} className="flex-grow">
        <Outlet />
      </PageTransition>
      <Footer />
      <BackToTop />
      <FirstVisitLanguageModal />
      <MobileBottomNav />
    </div>
  );
};
