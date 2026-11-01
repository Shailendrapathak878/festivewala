import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { SEOHead } from '../../components/common/SEOHead';
import { AlertCircle, Calendar, Sparkles, Utensils, ShieldAlert } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  const { isHindi } = useLanguage();

  const seoTitle = isHindi
    ? 'अस्वीकरण — फेस्टिववाला | पंचांग, मुहूर्त व सांस्कृतिक सामग्री स्पष्टीकरण'
    : 'Disclaimer — FestiveWala | Cultural, Panchang Timings & Safety Disclaimers';

  const seoDescription = isHindi
    ? 'फेस्टिववाला अस्वीकरण: पंचांग तिथियों, पूजा मुहूर्त, गृह सज्जा सुरक्षा और पारंपरिक व्यंजनों के संबंध में महत्वपूर्ण स्पष्टीकरण।'
    : 'FestiveWala Disclaimer: Panchang calculation variations, ceremonial timings, DIY craft safety, and editorial recommendations clarity.';

  return (
    <div className="py-12 md:py-16 bg-[#FAF7F0] min-h-screen text-brand-dark pb-24">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalUrl="https://festivewala.in/disclaimer"
        ogType="website"
        lang={isHindi ? 'hi' : 'en'}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-semibold uppercase tracking-wider">
            <AlertCircle size={14} className="text-brand-gold-dark" />
            <span>{isHindi ? 'अस्वीकरण व नीति स्पष्टीकरण' : 'Platform Disclaimers'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-deep">
            {isHindi ? 'फेस्टिववाला अस्वीकरण (Disclaimer)' : 'FestiveWala Disclaimer'}
          </h1>
          <p className="text-xs sm:text-sm text-brand-dark/70 font-sans">
            {isHindi
              ? 'अंतिम संशोधन: नवंबर २०२६ | कृपया इस जानकारी को ध्यानपूर्वक पढ़ें।'
              : 'Last Updated: November 2026 | Important clarity regarding cultural information, timings, and DIY safety.'}
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl border border-brand-gold/30 p-6 sm:p-10 space-y-8 font-sans text-xs sm:text-sm text-brand-dark/85 leading-relaxed">
          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-brand-deep flex items-center gap-2">
              <Calendar size={18} className="text-brand-gold" />
              <span>{isHindi ? '१. पंचांग गणना व मुहूर्त संबंधी स्पष्टीकरण' : '1. Panchang Calculations & Astrological Timings'}</span>
            </h3>
            <p>
              {isHindi
                ? 'फेस्टिववाला पर प्रदर्शित सभी त्योहार तिथियां, शुभ मुहूर्त (जैसे प्रदोष काल, लक्ष्मी पूजन समय, भद्रा काल) मानक वैदिक पंचांग गणनाओं पर आधारित हैं।'
                : 'All festival calendar dates, auspicious muhurats (such as Pradosh Kaal, Lakshmi Puja windows, and Bhadra periods) published on FestiveWala are derived from recognized traditional Vedic Panchang astronomical calculations.'}
            </p>
            <p>
              {isHindi
                ? 'स्थानीय सूर्योदय और सूर्यास्त के समय में विभिन्न शहरों और देशों में कुछ मिनटों का अंतर हो सकता है। अत्यंत कठोर धार्मिक अनुष्ठानों के लिए उपयोगकर्ताओं को अपने स्थानीय शहर के पंचांग या पारिवारिक पुरोहित से परामर्श करने की सलाह दी जाती है।'
                : 'Because exact astronomical sunrise, sunset, and moonrise timings vary slightly across different geographic latitudes and longitudes, localized muhurat minutes may differ between cities. Users performing strict orthodox religious observances are advised to consult their local regional city panchang or family priest.'}
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-brand-deep flex items-center gap-2">
              <ShieldAlert size={18} className="text-brand-gold" />
              <span>{isHindi ? '२. गृह सज्जा व DIY शिल्प सुरक्षा' : '2. DIY Home Decor, Fire & Electrical Safety'}</span>
            </h3>
            <p>
              {isHindi
                ? 'हमारे गृह सज्जा, दीया प्रकाश और तोरण निर्माण के विचार सामान्य रचनात्मक प्रेरणा के लिए हैं। खुले दीपकों (Diyas) और विद्युत फेयरी लाइट्स का उपयोग करते समय हमेशा सुरक्षा सावधानियों का पालन करें।'
                : 'Our festival decoration ideas, diya lighting guides, and DIY paper toran craft instructions are provided for general aesthetic inspiration. Users must exercise standard domestic safety precautions when handling open flames, earthen oil lamps (diyas), and electrical string lighting.'}
            </p>
            <p>
              {isHindi
                ? 'दीयों को ज्वलनशील वस्तुओं, परदों और बच्चों की पहुंच से दूर सुरक्षित दूरी पर रखें।'
                : 'Ensure open diyas are placed safely away from flammable fabrics, curtains, paper decorations, and young children or pets.'}
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-brand-deep flex items-center gap-2">
              <Utensils size={18} className="text-brand-gold" />
              <span>{isHindi ? '३. पारंपरिक व्यंजन व एलर्जी संबंधी जानकारी' : '3. Festive Recipes & Dietary Allergies'}</span>
            </h3>
            <p>
              {isHindi
                ? 'फेस्टिववाला पर साझा की गई पारंपरिक व्यंजन विधियां (जैसे गुजिया, ठंडाई, प्लम केक) सांस्कृतिक खानपान की जानकारी के उद्देश्य से हैं। इनमें मेवे (काजू, बादाम), दुग्ध उत्पाद (खोया, दूध) या मैदा शामिल हो सकते हैं।'
                : 'Culinary recipes shared on FestiveWala (such as Mawa Gujiya, Thandai, or plum cake) reflect traditional festival culinary heritage. These preparations frequently incorporate dairy, tree nuts (almonds, cashews, pistachios), and wheat flour (gluten).'}
            </p>
            <p>
              {isHindi
                ? 'यदि आपको या आपके परिवार के किसी सदस्य को किसी खाद्य सामग्री से एलर्जी है, तो कृपया सावधानी बरतें और उपयुक्त विकल्प चुनें।'
                : 'Individuals with food allergies, dietary restrictions, or medical conditions should evaluate ingredients carefully and substitute as necessary.'}
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-brand-deep flex items-center gap-2">
              <Sparkles size={18} className="text-brand-gold" />
              <span>{isHindi ? '४. उपहार सुझाव व तृतीय-पक्ष स्पष्टीकरण' : '4. Gifting Recommendations & Third-Party Vendors'}</span>
            </h3>
            <p>
              {isHindi
                ? 'हमारे उपहार सुझाव संपादकीय और सांस्कृतिक दृष्टिकोण से तैयार किए गए हैं। फेस्टिववाला किसी विशिष्ट ब्रांड, उत्पादक या विक्रेता के लिए व्यावसायिक उत्तरदायित्व नहीं लेता है।'
                : 'Gift recommendations categorized by relationship and budget tier represent independent editorial inspiration. FestiveWala does not directly manufacture, sell, or guarantee the merchantability of any physical gift items mentioned on our pages.'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;

