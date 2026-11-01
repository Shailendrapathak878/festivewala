import React from 'react';
import { SectionHeading } from '../components/common/SectionHeading';
import { FestivalFeaturePreview } from '../components/layout/FestivalFeaturePreview';
import { useLanguage } from '../hooks/useLanguage';

export const FestivalsPreviewPage: React.FC = () => {
  const { t, isHindi } = useLanguage();

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Phase 1 Scope Notice */}
        <div className="mb-8 p-4 rounded-xl bg-brand-light border border-brand-gold/30 text-center">
          <span className="text-xs uppercase tracking-widest-luxury font-bold text-brand-royal">
            {t.common.phase1Notice}
          </span>
          <p className="text-xs sm:text-sm text-brand-dark/80 mt-1">
            {isHindi
              ? 'सम्पूर्ण त्योहार निर्देशिका और कैलेंडर फेज़ २ में विस्तृत रूप से उपलब्ध होगी। वर्तमान में दीपावली २०२६ का पूर्वावलोकन नीचे प्रस्तुत है।'
              : 'The comprehensive festivals encyclopedia and interactive calendar will arrive in Phase 2. Below is the spotlight showcase for Diwali 2026.'}
          </p>
        </div>

        <SectionHeading
          badge={t.nav.festivals}
          title={isHindi ? 'पर्व और पावन उत्सव' : 'Sacred Indian Festivals'}
          subtitle={isHindi ? 'परंपरा, उल्लास और सांस्कृतिक भव्यता का संगम' : 'A curated celebration of traditions, seasons, and eternal devotion'}
        />
      </div>

      <FestivalFeaturePreview />
    </div>
  );
};
