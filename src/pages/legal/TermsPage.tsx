import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { SEOHead } from '../../components/common/SEOHead';
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, Scale } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { isHindi } = useLanguage();

  const seoTitle = isHindi
    ? 'नियम व शर्तें — फेस्टिववाला | सेवा की शर्तें व उपयोग दिशानिर्देश'
    : 'Terms & Conditions — FestiveWala | Terms of Service & Usage Guidelines';

  const seoDescription = isHindi
    ? 'फेस्टिववाला के उपयोग की नियम व शर्तें: ग्रीटिंग कार्ड्स, संदेशों और उत्सव सामग्री के व्यक्तिगत उपयोग के अधिकार व नियम।'
    : 'FestiveWala Terms and Conditions of Service: Intellectual property, personal non-commercial usage guidelines, and platform policies.';

  return (
    <div className="py-12 md:py-16 bg-[#FAF7F0] min-h-screen text-brand-dark pb-24">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalUrl="https://festivewala.in/terms-of-service/"
        ogType="website"
        lang={isHindi ? 'hi' : 'en'}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-semibold uppercase tracking-wider">
            <Scale size={14} className="text-brand-gold-dark" />
            <span>{isHindi ? 'सेवा की नियम व शर्तें' : 'Terms & Conditions'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-deep">
            {isHindi ? 'फेस्टिववाला उपयोग के नियम व शर्तें' : 'FestiveWala Terms of Service'}
          </h1>
          <p className="text-xs sm:text-sm text-brand-dark/70 font-sans">
            {isHindi
              ? 'अंतिम संशोधन: नवंबर २०२६ | कृपया इस वेबसाइट का उपयोग करने से पूर्व इन शर्तों को ध्यानपूर्वक पढ़ें।'
              : 'Last Updated: November 2026 | Please read these Terms of Service carefully before using our platform.'}
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl border border-brand-gold/30 p-6 sm:p-10 space-y-8 font-sans text-xs sm:text-sm text-brand-dark/85 leading-relaxed">
          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-brand-deep flex items-center gap-2">
              <CheckCircle2 size={18} className="text-brand-gold" />
              <span>{isHindi ? '१. सेवा की स्वीकृति' : '1. Acceptance of Terms'}</span>
            </h3>
            <p>
              {isHindi
                ? 'फेस्टिववाला वेबसाइट का उपयोग करके आप इन नियमों व शर्तों तथा हमारी गोपनीयता नीति से बंधे होने की सहमति देते हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया हमारी सेवाओं का उपयोग न करें।'
                : 'By accessing or using FestiveWala (https://festivewala.in), you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions and our Privacy Policy.'}
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-brand-deep flex items-center gap-2">
              <FileText size={18} className="text-brand-gold" />
              <span>{isHindi ? '२. बौद्धिक संपदा व व्यक्तिगत उपयोग' : '2. Intellectual Property & Personal Use License'}</span>
            </h3>
            <p>
              {isHindi
                ? 'फेस्टिववाला पर उपलब्ध सभी १८४ ग्रीटिंग कार्ड टेम्प्लेट्स, रंगोली आर्टवर्क, उत्सव मार्गदर्शिकाएं और साहित्यिक संदेश फेस्टिववाला की बौद्धिक संपदा हैं।'
                : 'All greeting card layouts, vector Rangoli patterns, editorial guides, and curated festive messages available on FestiveWala are protected by copyright and intellectual property laws.'}
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-brand-dark/75">
              <li>
                <strong>{isHindi ? 'अनुमति:' : 'Permitted Use:'}</strong>{' '}
                {isHindi
                  ? 'आप अपने परिजनों, मित्रों और सहयोगियों को शुभकामना भेजने के लिए कार्ड और संदेशों को व्यक्तिगत व गैर-व्यावसायिक रूप से डाउनलोड, संपादित और साझा कर सकते हैं।'
                  : 'You are granted a non-exclusive, revocable license to personalize, download, and share greeting cards, wishes, and guides for personal, non-commercial festive celebration purposes.'}
              </li>
              <li>
                <strong>{isHindi ? 'प्रतिबंध:' : 'Prohibited Use:'}</strong>{' '}
                {isHindi
                  ? 'हमारी सामग्री, टेम्प्लेट्स या आर्टवर्क को बिना पूर्व लिखित अनुमति के व्यावसायिक रूप से बेचना, अन्य वेबसाइटों पर थोक में दोबारा प्रकाशित करना प्रतिबंधित है।'
                  : 'You may not sell, redistribute for fee, bundle into commercial greeting products, or scrape FestiveWala assets in bulk without express prior written permission.'}
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-brand-deep flex items-center gap-2">
              <ShieldCheck size={18} className="text-brand-gold" />
              <span>{isHindi ? '३. उपयोगकर्ता आचरण व फोटो अपलोड' : '3. User Conduct & Photo Content'}</span>
            </h3>
            <p>
              {isHindi
                ? 'पर्सनल फोटो स्टूडियो का उपयोग करते समय आप पुष्टि करते हैं कि आपके द्वारा अपलोड की गई तस्वीर का उपयोग करने का वैध अधिकार आपके पास है।'
                : 'When utilizing the Personal Photo Wishes Studio, you represent that you own or have obtained lawful consent to use any photograph uploaded into your browser frame.'}
            </p>
            <p>
              {isHindi
                ? 'अपमानजनक, अश्लील, हिंसक या गैरकानूनी सामग्री का उपयोग करके कार्ड बनाना सख्त वर्जित है।'
                : 'You agree not to create, generate, or transmit cards displaying defamatory, obscene, harassing, infringing, or unlawful imagery.'}
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-brand-deep flex items-center gap-2">
              <AlertTriangle size={18} className="text-brand-gold" />
              <span>{isHindi ? '४. सेवा उपलब्धता व दायित्व की सीमा' : '4. Service Availability & Limitation of Liability'}</span>
            </h3>
            <p>
              {isHindi
                ? 'फेस्टिववाला एक निःशुल्क सांस्कृतिक मंच के रूप में "जैसी है" (As-Is) आधार पर उपलब्ध कराई जाती है। हम बिना किसी पूर्व सूचना के किसी भी सुविधा में संशोधन या सुधार करने का अधिकार सुरक्षित रखते हैं।'
                : 'FestiveWala is provided on an "as is" and "as available" basis without warranties of uninterrupted uptime or error-free operation. In no event shall FestiveWala or its creators be liable for indirect, incidental, or consequential damages resulting from site usage.'}
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-brand-deep flex items-center gap-2">
              <Scale size={18} className="text-brand-gold" />
              <span>{isHindi ? '५. शासी कानून' : '5. Governing Law'}</span>
            </h3>
            <p>
              {isHindi
                ? 'ये नियम व शर्तें भारत के कानूनों के अनुसार शासित और व्याख्यायित की जाएंगी।'
                : 'These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;

