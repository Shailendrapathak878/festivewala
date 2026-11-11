import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { LoadingState } from '../components/common/LoadingState';

// Lazy-loaded route components for optimal code-splitting and rapid initial page load
const HomePage = lazy(() => import('../pages/HomePage').then((m) => ({ default: m.HomePage })));
const FestivalsPage = lazy(() => import('../pages/FestivalsPage').then((m) => ({ default: m.FestivalsPage })));
const FestivalDetailPage = lazy(() => import('../pages/FestivalDetailPage').then((m) => ({ default: m.FestivalDetailPage })));
const RangoliPage = lazy(() => import('../pages/RangoliPage').then((m) => ({ default: m.RangoliPage })));
const DecorationsPage = lazy(() => import('../pages/DecorationsPage').then((m) => ({ default: m.DecorationsPage })));
const GiftIdeasPage = lazy(() => import('../pages/GiftIdeasPage').then((m) => ({ default: m.GiftIdeasPage })));
const FestivalGuidesPage = lazy(() => import('../pages/FestivalGuidesPage').then((m) => ({ default: m.FestivalGuidesPage })));
const GreetingCardsPreviewPage = lazy(() => import('../pages/GreetingCardsPreviewPage').then((m) => ({ default: m.GreetingCardsPreviewPage })));
const WishesPreviewPage = lazy(() => import('../pages/WishesPreviewPage').then((m) => ({ default: m.WishesPreviewPage })));
const InspirationPreviewPage = lazy(() => import('../pages/InspirationPreviewPage').then((m) => ({ default: m.InspirationPreviewPage })));

// Legal and Trust Pages
const AboutPage = lazy(() => import('../pages/legal/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('../pages/legal/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('../pages/legal/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('../pages/legal/TermsPage').then((m) => ({ default: m.TermsPage })));
const DisclaimerPage = lazy(() => import('../pages/legal/DisclaimerPage').then((m) => ({ default: m.DisclaimerPage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingState className="min-h-screen" />}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="festivals" element={<FestivalsPage />} />
          <Route path="festivals/:festivalId" element={<FestivalDetailPage />} />
          <Route path="rangoli" element={<RangoliPage />} />
          <Route path="decoration-ideas" element={<DecorationsPage />} />
          <Route path="gift-ideas" element={<GiftIdeasPage />} />
          <Route path="festival-guides" element={<FestivalGuidesPage />} />
          <Route path="festival-guides/:guideId" element={<FestivalGuidesPage />} />
                    <Route path="greetings/:festivalId" element={<GreetingCardsPreviewPage />} />
          <Route path="photo-greetings/:festivalId" element={<GreetingCardsPreviewPage defaultMode="photo" />} />
          <Route path="wishes/:festivalId" element={<WishesPreviewPage />} />
          <Route path="gift-ideas/:festivalId" element={<GiftIdeasPage />} />
          <Route path="greeting-cards" element={<GreetingCardsPreviewPage />} />
          <Route path="greeting-studio" element={<Navigate to="/greeting-cards" replace />} />
          <Route path="wishes" element={<WishesPreviewPage />} />
          <Route path="inspiration" element={<InspirationPreviewPage />} />
          {/* Legal and Trust Pages */}
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="privacy" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="terms-of-service" element={<TermsPage />} />
          <Route path="terms" element={<Navigate to="/terms-of-service" replace />} />
          <Route path="disclaimer" element={<DisclaimerPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
