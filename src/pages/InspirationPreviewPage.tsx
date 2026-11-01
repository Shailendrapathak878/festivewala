import React from 'react';
import { SectionHeading } from '../components/common/SectionHeading';
import { EditorialSection } from '../components/layout/EditorialSection';
import { useLanguage } from '../hooks/useLanguage';

export const InspirationPreviewPage: React.FC = () => {
  const { t, isHindi } = useLanguage();

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="mb-8 p-4 rounded-xl bg-brand-light border border-brand-gold/30 text-center">
          <span className="text-xs uppercase tracking-widest-luxury font-bold text-brand-royal">
            {t.common.phase1Notice}
          </span>
          <p className="text-xs sm:text-sm text-brand-dark/80 mt-1">
            {isHindi
              ? 'रंगोली कला, उत्सव खानपान और सांस्कृतिक कहानियों का विस्तृत संग्रह फेज़ ५ में प्रदर्शित होगा।'
              : 'Rangoli inspirations, celebratory rituals, and editorial stories will arrive in Phase 5.'}
          </p>
        </div>

        <SectionHeading
          badge={t.nav.inspiration}
          title={isHindi ? 'सांस्कृतिक प्रेरणा और विरासत' : 'Cultural Heritage & Inspiration'}
          subtitle={
            isHindi
              ? 'भारतीय उत्सवों की समृद्ध परंपराओं और कला रूपों का उत्सव'
              : 'Honoring ancient traditions through contemporary aesthetic exploration'
          }
        />
      </div>

      <EditorialSection />
    </div>
  );
};

