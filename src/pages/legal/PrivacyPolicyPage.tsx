import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { SEOHead } from '../../components/common/SEOHead';
import { Shield, Lock, Eye, Database, Cookie, Mail } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { isHindi, loc } = useLanguage();

  const seoTitle = isHindi
    ? 'गोपनीयता नीति — फेस्टिववाला | १००% निजी व सुरक्षित फोटो प्रोसेसिंग'
    : 'Privacy Policy — FestiveWala | Client-Side Photo Privacy & Data Practices';

  const seoDescription = isHindi
    ? 'फेस्टिववाला की गोपनीयता नीति: आपकी तस्वीरें कभी हमारे सर्वर पर अपलोड नहीं होतीं। १००% सुरक्षित क्लाइंट-साइड फोटो प्रोसेसिंग और पारदर्शी नीतियां।'
    : 'FestiveWala Privacy Policy: Client-side browser photo processing, zero server photo storage, local storage usage, and transparent privacy commitments.';

  return (
    <div className="py-12 md:py-16 bg-[#FAF7F0] min-h-screen text-brand-dark pb-24">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalUrl="https://festivewala.in/privacy-policy/"
        ogType="website"
        lang={isHindi ? 'hi' : 'en'}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-semibold uppercase tracking-wider">
            <Shield size={14} className="text-brand-gold-dark" />
            <span>{isHindi ? 'गोपनीयता नीति व डेटा सुरक्षा' : 'Privacy Policy & Trust'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-deep">
            {isHindi ? 'आपकी निजता और सुरक्षा हमारा सर्वोच्च संकल्प है' : 'FestiveWala Privacy Policy'}
          </h1>
          <p className="text-xs sm:text-sm text-brand-dark/70 font-sans">
            {isHindi
              ? 'अंतिम संशोधन: नवंबर २०२६ | प्रभावी तिथि: नवंबर २०२६'
              : 'Last Updated: November 2026 | Effective Date: November 2026'}
          </p>
        </div>

        {/* Highlight Callout Box: 100% Client-Side Processing */}
        <div className="p-6 sm:p-8 rounded-3xl bg-brand-deep text-[#FAF7F0] border border-brand-gold/40 shadow-xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F2D98B] text-[#24113D] flex items-center justify-center flex-shrink-0">
              <Lock size={20} />
            </div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#F2D98B]">
              {isHindi
                ? 'महत्वपूर्ण गारंटी: आपकी तस्वीरें कभी हमारे सर्वर पर अपलोड नहीं होतीं'
                : 'Core Guarantee: Zero Server Upload of Your Personal Photos'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-brand-white/85 font-sans leading-relaxed">
            {isHindi
              ? 'जब आप फेस्टिववाला के "पर्सनल फोटो विशेज स्टूडियो" में अपनी पारिवारिक तस्वीर अपलोड करते हैं, तो वह छवि केवल आपके फोन या कंप्यूटर की स्थानीय मेमोरी (HTML5 Canvas) में प्रोसेस होती है। आपकी तस्वीर कभी भी हमारे सर्वर, डेटाबेस या किसी तीसरे पक्ष को प्रेषित नहीं की जाती है।'
              : 'When you create a customized greeting using the Personal Photo Wishes Studio, your photograph is loaded and cropped strictly inside your device\'s local browser memory using HTML5 Canvas technology. Your photographs are never transmitted, stored, inspected, or processed on any remote server.'}
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white rounded-3xl border border-brand-gold/30 p-6 sm:p-10 space-y-8 font-sans text-xs sm:text-sm text-brand-dark/85 leading-relaxed">
          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-brand-deep flex items-center gap-2">
              <Database size={18} className="text-brand-gold" />
              <span>{isHindi ? '१. हम क्या जानकारी एकत्र करते हैं?' : '1. Information We Collect'}</span>
            </h3>
            <p>
              {isHindi
                ? 'फेस्टिववाला को सामान्य रूप से उपयोग करने के लिए किसी खाते के पंजीकरण, लॉगिन, फोन नंबर या व्यक्तिगत पहचान पत्र की आवश्यकता नहीं है।'
                : 'FestiveWala is designed to be fully usable without mandatory account registration, passwords, phone numbers, or credit card information.'}
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-brand-dark/75">
              <li>
                <strong>{isHindi ? 'स्थानीय प्राथमिकताएं (Local Storage):' : 'Local Browser Preferences:'}</strong>{' '}
                {isHindi
                  ? 'आपके द्वारा चुने गए पसंदीदा रंगोली डिजाइन, सजावट आइडिया और भाषा विकल्प आपके अपने डिवाइस के localStorage में सुरक्षित रहते हैं।'
                  : 'Your bookmarked Rangoli patterns, favorite decoration guides, saved wishes, and selected language (English/Hindi) are stored exclusively in your browser\'s local storage.'}
              </li>
              <li>
                <strong>{isHindi ? 'स्वैच्छिक संपर्क विवरण:' : 'Voluntary Communications:'}</strong>{' '}
                {isHindi
                  ? 'यदि आप हमारे संपर्क फॉर्म के माध्यम से संदेश भेजते हैं, तो हम केवल आपके द्वारा प्रदान किया गया नाम और ईमेल पता आपकी सहायता के लिए उपयोग करते हैं।'
                  : 'If you contact us via email or the support form, we collect the name, email address, and message content solely to respond to your inquiry.'}
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-brand-deep flex items-center gap-2">
              <Cookie size={18} className="text-brand-gold" />
              <span>{isHindi ? '२. कुकीज व वेब एनालिटिक्स' : '2. Cookies & Analytics'}</span>
            </h3>
            <p>
              {isHindi
                ? 'हम प्लेटफॉर्म के प्रदर्शन और उपयोगकर्ता अनुभव को बेहतर बनाने के लिए गोपनीयता-अनुकूल Google Analytics का उपयोग कर सकते हैं। यह डेटा पूरी तरह से अज्ञात (Anonymous) होता है।'
                : 'We may utilize privacy-conscious web analytics tools (such as Google Analytics 4) to monitor aggregate traffic trends, top-viewed festival pages, and platform performance. This data is collected in aggregate, anonymized form and does not track personal message contents or user photos.'}
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-brand-deep flex items-center gap-2">
              <Eye size={18} className="text-brand-gold" />
              <span>{isHindi ? '३. विज्ञापन नीति व तृतीय-पक्ष कुकीज' : '3. Advertising Policies & Third-Party Cookies'}</span>
            </h3>
            <p>
              {isHindi
                ? 'वर्तमान में फेस्टिववाला पूर्णतः विज्ञापन-मुक्त है और हमारी वेबसाइट पर कोई भी विज्ञापन कुकी या विज्ञापन ट्रैकिंग कोड सक्रिय नहीं है। भविष्य में मंच को निःशुल्क बनाए रखने हेतु यदि हम Google AdSense जैसे स्वीकृत विज्ञापन नेटवर्क से साझेदारी करते हैं, तो तृतीय-पक्ष कुकीज निम्नलिखित नीति के अनुसार कार्य करेंगी:'
                : 'FestiveWala is currently 100% ad-free, and no advertising cookies, tags, or commercial ad scripts are active on our platform at this time. In the future, to sustain our cultural mission as a free public resource, we may partner with certified ad networks such as Google AdSense. In that event, third-party vendor cookies will operate under the following standard disclosures:'}
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-brand-dark/75">
              <li>
                {isHindi
                  ? 'गूगल सहित तृतीय-पक्ष विक्रेता (Third-party vendors) हमारी वेबसाइट या अन्य वेबसाइटों पर उपयोगकर्ता की पिछली यात्राओं के आधार पर विज्ञापन परोसने के लिए कुकीज (Cookies) का उपयोग करते हैं।'
                  : 'Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to FestiveWala or other websites across the Internet.'}
              </li>
              <li>
                {isHindi
                  ? 'गूगल द्वारा विज्ञापन कुकीज का उपयोग उसे और उसके भागीदारों को इंटरनेट पर आपकी यात्राओं के आधार पर प्रासंगिक विज्ञापन दिखाने में सक्षम बनाता है।'
                  : 'Google’s use of advertising cookies enables it and its partners to serve personalized ads to users based on their visits to our site and/or other sites on the Internet.'}
              </li>
              <li>
                {isHindi
                  ? 'उपयोगकर्ता Google Ad Settings (https://adssettings.google.com) पर जाकर व्यक्तिगत विज्ञापनों को नियंत्रित या बंद कर सकते हैं। इसके अतिरिक्त, उपयोगकर्ता www.aboutads.info पर जाकर तृतीय-पक्ष कुकीज से ऑप्ट-आउट कर सकते हैं।'
                  : 'Users may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com) or by visiting www.aboutads.info to opt out of third-party vendor cookie usage.'}
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-brand-deep flex items-center gap-2">
              <Shield size={18} className="text-brand-gold" />
              <span>{isHindi ? '४. बच्चों की गोपनीयता' : '4. Children\'s Privacy'}</span>
            </h3>
            <p>
              {isHindi
                ? 'फेस्टिववाला एक पारिवारिक उत्सव मंच है। हम १३ वर्ष से कम आयु के बच्चों से जानबूझकर कोई व्यक्तिगत जानकारी एकत्र नहीं करते हैं।'
                : 'FestiveWala is a family celebration platform suitable for all ages. We do not knowingly collect or solicit personal identifiable information from children under the age of 13.'}
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-brand-deep flex items-center gap-2">
              <Mail size={18} className="text-brand-gold" />
              <span>{isHindi ? '५. संपर्क व शिकायत निवारण' : '5. Contact & Privacy Inquiries'}</span>
            </h3>
            <p>
              {loc(
                'If you have questions, feedback, or requests regarding this Privacy Policy or your data, please contact Shailendra Pathak (Founder, FestiveWala):',
                'यदि आपके पास इस गोपनीयता नीति या अपने डेटा के संबंध में कोई प्रश्न है, तो कृपया फेस्टिववाला के संस्थापक शैलेंद्र पाठक से संपर्क करें:',
                'Agar is Privacy Policy ya aapke data ke baare mein koi question hai, to FestiveWala ke founder Shailendra Pathak se sampark karein:'
              )}
            </p>
            <div className="p-4 rounded-xl bg-brand-ivory border border-brand-gold/20 font-mono text-xs text-brand-deep">
              Email:{' '}
              <a
                href="mailto:Pandit979212@gmail.com"
                className="text-brand-deep font-semibold underline hover:text-brand-gold-dark"
              >
                Pandit979212@gmail.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

