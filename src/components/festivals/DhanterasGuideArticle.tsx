import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  Calendar,
  BookOpen,
  ArrowRight,
  Clock,
  ShieldCheck,
  Gift,
  Coins,
} from 'lucide-react';
import type { FestivalDetail } from '../../data/festivals/types';
import { TrilingualFAQSection } from '../common/TrilingualFAQSection';

interface DhanterasGuideArticleProps {
  festival: FestivalDetail;
  isHindi: boolean;
  isHinglish?: boolean;
}

export const DhanterasGuideArticle: React.FC<DhanterasGuideArticleProps> = ({
  festival,
  isHindi,
  isHinglish = false,
}) => {
  const [activeRegionTab, setActiveRegionTab] = useState<string>('north');

  // Navigation Items for Table of Contents
  const navItems = isHindi
    ? [
        { id: 'sec-what-is-dhanteras', label: '१. धनतेरस क्या है?' },
        { id: 'sec-meaning-origin', label: '२. नाम की उत्पत्ति व अर्थ' },
        { id: 'sec-why-celebrated', label: '३. क्यों मनाया जाता है धनतेरस?' },
        { id: 'sec-lord-dhanvantari', label: '४. भगवान धन्वंतरि का प्राकट्य' },
        { id: 'sec-lakshmi-kubera', label: '५. मां लक्ष्मी व कुबेर देव' },
        { id: 'sec-buying-metals', label: '६. धातु व बर्तन खरीद का शगुन' },
        { id: 'sec-importance-health', label: '७. पहला सुख निरोगी काया' },
        { id: 'sec-yamadeepdaan', label: '८. यम दीपदान की पावन परंपरा' },
        { id: 'sec-puja-rituals', label: '९. पारंपरिक पूजन विधि व मुहूर्त' },
        { id: 'sec-family-celebration', label: '१०. भारतीय परिवारों में उत्सव' },
        { id: 'sec-decor-rangoli', label: '११. दीप, रंगोली व तोरण सज्जा' },
        { id: 'sec-traditional-foods', label: '१२. पारंपरिक पकवान व नैवेद्य' },
        { id: 'sec-regional-traditions', label: '१३. क्षेत्रीय परंपराएं' },
        { id: 'sec-spiritual-significance', label: '१४. आध्यात्मिक व सांस्कृतिक दर्शन' },
        { id: 'sec-modern-celebration', label: '१५. आधुनिक उत्सव स्वरूप' },
        { id: 'sec-eco-friendly', label: '१६. पर्यावरण-अनुकूल धनतेरस' },
        { id: 'sec-gift-ideas', label: '१७. सार्थक उपहार विचार' },
        { id: 'sec-fascinating-facts', label: '१८. रोचक व प्रामाणिक तथ्य' },
        { id: 'sec-dhanteras-faqs', label: '१९. प्रश्नोत्तरी (FAQs)' },
      ]
    : [
        { id: 'sec-what-is-dhanteras', label: '1. What is Dhanteras?' },
        { id: 'sec-meaning-origin', label: '2. Meaning & Etymology' },
        { id: 'sec-why-celebrated', label: '3. Why We Celebrate' },
        { id: 'sec-lord-dhanvantari', label: '4. Lord Dhanvantari' },
        { id: 'sec-lakshmi-kubera', label: '5. Lakshmi & Lord Kubera' },
        { id: 'sec-buying-metals', label: '6. Buying Gold, Silver & Metals' },
        { id: 'sec-importance-health', label: '7. Health as Prime Wealth' },
        { id: 'sec-yamadeepdaan', label: '8. Sacred Yamadeepdaan' },
        { id: 'sec-puja-rituals', label: '9. Traditional Puja Rituals' },
        { id: 'sec-family-celebration', label: '10. Family Celebrations' },
        { id: 'sec-decor-rangoli', label: '11. Diyas, Toran & Rangoli' },
        { id: 'sec-traditional-foods', label: '12. Festive Foods & Naivedyam' },
        { id: 'sec-regional-traditions', label: '13. Regional Customs' },
        { id: 'sec-spiritual-significance', label: '14. Spiritual Significance' },
        { id: 'sec-modern-celebration', label: '15. Modern Celebrations' },
        { id: 'sec-eco-friendly', label: '16. Eco-Friendly Practices' },
        { id: 'sec-gift-ideas', label: '17. Meaningful Gift Ideas' },
        { id: 'sec-fascinating-facts', label: '18. Fascinating Facts' },
        { id: 'sec-dhanteras-faqs', label: '19. Frequently Asked Questions' },
      ];

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-[#24113D]">
      {/* Editorial Header Badge */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24113D] text-[#F2D98B] border border-[#F2D98B]/40 shadow-sm text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
          <BookOpen size={15} className="text-[#F2D98B]" />
          <span>{isHindi ? 'विस्तृत उत्सव संदर्शिका • २४००+ शब्द' : 'Comprehensive Festival Guide • 2,200+ Words'}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#24113D] leading-[1.2] max-w-4xl mx-auto">
          {isHindi
            ? 'धनतेरस (धनत्रयोदशी) २०२६: महत्व, धन्वंतरि जयंती, यम दीपदान, धातु खरीद व संपूर्ण उत्सव मार्गदर्शिका'
            : 'Dhanteras (Dhanatrayodashi) 2026: Significance, Dhanvantari Jayanti, Yamadeepdaan, Metal Traditions & Complete Celebration Guide'}
        </h1>

        <p className="font-sans text-sm sm:text-base md:text-lg text-[#24113D]/80 max-w-2xl mx-auto mt-4 leading-relaxed font-light">
          {isHindi
            ? 'दीपोत्सव के प्रथम पावन पर्व का आध्यात्मिक मर्म, आयुर्वेदिक विरासत, खरीदारी के नियम और परंपरागत अनुष्ठानों का प्रामाणिक व शोधपरक विवरण।'
            : 'An authoritative, culturally authentic exploration of Deepavali’s opening festival: where ancient Ayurvedic healing meets timeless prosperity and family harmony.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#45216B]/80 font-medium mt-6 pt-4 border-t border-[#F2D98B]/40">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-[#D4AF37]" />
            <span>{isHindi ? 'कार्तिक कृष्ण त्रयोदशी • ६ नवंबर २०२६' : 'Kartik Krishna Trayodashi • 6 Nov 2026'}</span>
          </span>
          <span className="hidden sm:inline text-[#D4AF37]">•</span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-[#D4AF37]" />
            <span>{isHindi ? '१० मिनट विस्तृत पठन' : '10 Min Comprehensive Read'}</span>
          </span>
          <span className="hidden sm:inline text-[#D4AF37]">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>{isHindi ? 'वैदिक व पौराणिक शोध द्वारा प्रमाणित' : 'Vedic & Purana Verified'}</span>
          </span>
        </div>
      </div>

      {/* Table of Contents Sticky / Jump Drawer */}
      <div className="my-8 sm:my-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#24113D] to-[#160B26] text-[#FAF7F0] border-2 border-[#F2D98B]/35 shadow-xl">
        <div className="flex items-center gap-2.5 mb-4 sm:mb-6">
          <BookOpen className="w-5 h-5 text-[#F2D98B]" />
          <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-[#F2D98B]">
            {isHindi ? 'विषय-सूची (Table of Contents)' : 'Table of Contents'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#FAF7F0]/80 mb-5 leading-relaxed">
          {isHindi
            ? 'अपनी पसंद के विषय पर सीधे पहुंचने के लिए नीचे दिए गए किसी भी शीर्षक पर क्लिक करें:'
            : 'Click any section title below to jump directly to detailed cultural explanations:'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs sm:text-sm">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-[#F2D98B]/20 text-[#FAF7F0]/90 hover:text-[#F2D98B] border border-white/10 hover:border-[#F2D98B]/40 transition-all font-medium truncate block min-h-[40px] flex items-center"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Main Prose Content */}
      <div className="space-y-12 sm:space-y-16 text-sm sm:text-base leading-relaxed text-[#24113D]/90">
        {/* SECTION 1 */}
        <section id="sec-what-is-dhanteras" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग १' : 'Section 1'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '१. धनतेरस क्या है? (What is Dhanteras?)' : '1. What is Dhanteras?'}
          </h2>
          <p>
            {isHindi
              ? 'धनतेरस, जिसे शास्त्रों में धनत्रयोदशी अथवा धन्वंतरि त्रयोदशी भी कहा जाता है, भारतवर्ष के सबसे बड़े प्रकाश पर्व दीपोत्सव का प्रथम और अत्यंत पावन दिन है। यह पावन तिथि कार्तिक मास के कृष्ण पक्ष की त्रयोदशी को आती है। भारतीय जनमानस में इस दिन का स्थान केवल एक पर्व के रूप में नहीं, बल्कि जीवन की दो सर्वाधिक महत्वपूर्ण उपलब्धियों — स्वास्थ्य और संपन्नता — के पुनर्नवीकरण के रूप में है।'
              : 'Dhanteras, celebrated in classical Sanskrit scriptures as Dhanatrayodashi or Dhanvantari Trayodashi, represents the grand inaugural celebration of the five-day Deepavali festival. Observed on the thirteenth lunar day (Trayodashi) of the waning fortnight (Krishna Paksha) in the sacred month of Kartik, Dhanteras stands as a foundational milestone where spiritual wisdom, preventive health, and cosmic prosperity converge.'}
          </p>
          <p>
            {isHindi
              ? 'इस पावन दिन से ही घरों, आंगनों और बाजारों में दीपोत्सव की असली जगमगाहट प्रारंभ होती है। लोग सायंकाल में अपने घरों के प्रवेश द्वार पर दीप जलाते हैं, जिसे यम दीपदान कहा जाता है। इसके साथ ही नए बर्तनों, सोने, चांदी और शुभ वस्तुओं का क्रय कर घर में मां लक्ष्मी और धनाधिपति भगवान कुबेर के शुभागमन की तैयारी की जाती है।'
              : 'From this auspicious twilight forward, the streets, homes, and temple corridors across India burst into radiant illumination. Millions of families clean their homes, polish brassware, illuminate their thresholds with the sacred Yama Deepam, and purchase new vessels or precious metals to prepare for the descent of Goddess Mahalakshmi during the upcoming Diwali night.'}
          </p>
        </section>

        {/* SECTION 2 */}
        <section id="sec-meaning-origin" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग २' : 'Section 2'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '२. नाम की उत्पत्ति व शाब्दिक अर्थ (Meaning & Etymology)' : '2. Meaning and Origin of the Word Dhanteras'}
          </h2>
          <p>
            {isHindi
              ? 'धनतेरस शब्द संस्कृत और प्राकृत भाषा के दो स्वतंत्र शब्दों के मेल से बना है: "धन" और "तेरस"। सामान्य धारणा में लोग "धन" का अर्थ केवल भौतिक संपत्ति, मुद्रा, सोने अथवा चांदी से लगाते हैं। परंतु वैदिक और पौराणिक संदर्भ में "धन" का अर्थ अत्यंत व्यापक है। इसमें स्वास्थ्य रूपी धन (आरोग्य धन), ज्ञान रूपी धन (विद्या धन), सद्विवेक और परिवार के सुखद संबंधों का धन भी सम्मिलित है।'
              : 'The word "Dhanteras" is an etymological amalgamation of two Sanskrit and Prakrit terms: "Dhan" (meaning wealth, nourishment, and abundance) and "Teras" (referring to Trayodashi, the thirteenth lunar day). While contemporary culture often interprets "Dhan" strictly as currency, gold, or silver, ancient philosophical texts define Dhan far more holistically: encompassing vital bodily health (Arogya Dhan), righteous wisdom (Vidya Dhan), ethical conduct (Dharma Dhan), and familial harmony.'}
          </p>
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border-l-4 border-[#D4AF37] shadow-sm my-4">
            <p className="font-serif italic text-sm sm:text-base text-[#45216B]">
              {isHindi
                ? '॥ आरोग्यं परमं धनम्, स्वास्थ्यं सर्वार्थसाधनम् ॥ — अर्थात्, उत्तम स्वास्थ्य ही संसार का सर्वोच्च धन है, और स्वस्थ काया से ही जीवन के समस्त धर्म, अर्थ, काम और मोक्ष सिद्ध होते हैं।'
                : '“Arogyam Paramam Dhanam, Swasthyam Sarvartha Sadhanam” — Good health is the supreme wealth, and a vitalized physical body is the sacred instrument for fulfilling all earthly and spiritual purposes.'}
            </p>
          </div>
          <p>
            {isHindi
              ? 'दूसरी ओर "तेरस" शब्द त्रयोदशी तिथि का लोकबोली रूप है। अतः धनतेरस का शुद्ध अर्थ है: वह पावन त्रयोदशी जब हम अपने जीवन में स्वास्थ्य और संपन्नता दोनों के संवर्धन का संकल्प लेते हैं।'
              : 'Thus, Dhanteras translates literally into the sacred celebration of the thirteenth tithi where humanity honors the holistic interplay between bodily vitality and material sustainability.'}
          </p>
        </section>

        {/* SECTION 3 */}
        <section id="sec-why-celebrated" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग ३' : 'Section 3'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '३. क्यों मनाया जाता है धनतेरस? (Why is Dhanteras Celebrated?)' : '3. Why is Dhanteras Celebrated?'}
          </h2>
          <p>
            {isHindi
              ? 'धनतेरस के मनाए जाने के पीछे मुख्य रूप से दो प्रमुख पौराणिक और ऐतिहासिक आख्यान जुड़े हैं। पहला आख्यान क्षीरसागर के मंथन से जुड़ा है, जहां देवताओं और असुरों के अमृत मंथन के समय भगवान धन्वंतरि का अवतार हुआ। दूसरा आख्यान राजा हिम के सोलह वर्षीय पुत्र और उनकी विदुषी वधू से जुड़ा है, जिन्होंने अपनी सूझबूझ से पति के प्राणों की रक्षा की थी।'
              : 'The celebration of Dhanteras is deeply rooted in two classical scriptural narratives found across ancient Indian literature. The foremost narrative details the cosmic churning of the cosmic ocean (Samudra Manthan), from which Lord Dhanvantari manifested bearing the golden urn of divine immortality (Amrita). The second sacred lore revolves around King Hima’s young prince, whose foretold demise was ingeniously thwarted by his devoted bride on this very night.'}
          </p>
          <p>
            {isHindi
              ? 'इन दोनों कथाओं का मूल संदेश एक ही है: जीवन की रक्षा, भय से मुक्ति और अंधेरे में आशा का दीप जलाना। धनतेरस हमें यह विश्वास दिलाता है कि चाहे बीमारी हो या विपत्ति, आस्था, सात्विक प्रयास और ज्ञान के प्रकाश से हर संकट पर विजय पाई जा सकती है।'
              : 'At its core, both legends communicate a profound message of human resilience: that through devotion, vigilance, and the pursuit of holistic wellness, one can overcome both physiological ailments and existential dread. Dhanteras is thus a celebration of triumph over disease, darkness, and untimely misfortune.'}
          </p>
        </section>

        {/* SECTION 4 */}
        <section id="sec-lord-dhanvantari" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग ४' : 'Section 4'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '४. भगवान धन्वंतरि का प्राकट्य व महत्व (Lord Dhanvantari)' : '4. The Story and Significance of Lord Dhanvantari'}
          </h2>
          <p>
            {isHindi
              ? 'श्रीमद्भागवत पुराण और विष्णु पुराण के अनुसार जब देवों और दानवों ने मंदराचल पर्वत को मथानी और वासुकि नाग को नेती बनाकर समुद्र मंथन किया, तो उसमें से चौदह दिव्य रत्न निकले। इन चौदह रत्नों में कार्तिक कृष्ण त्रयोदशी के दिन चतुर्भुज रूप में भगवान धन्वंतरि प्रकट हुए। उनके एक हाथ में अमृत से परिपूर्ण स्वर्ण कलश, दूसरे में औषधीय जड़ी-बूटी, तीसरे में शंख और चौथे में चक्र सुशोभित था।'
              : 'According to the Srimad Bhagavata Purana and Vishnu Purana, when the Devas (celestial beings) and Asuras (titans) churned the cosmic ocean of milk using Mount Mandara and the serpent Vasuki, fourteen divine treasures emerged. On the thirteenth lunar tithi of Kartik, Lord Dhanvantari appeared in his magnificent four-armed manifestation. In his hands, he held the golden Kalash brimming with the immortal elixir (Amrita), medicinal herbs, the sacred conch (Shankha), and the protective discus (Chakra).'}
          </p>
          <p>
            {isHindi
              ? 'भगवान धन्वंतरि को भगवान विष्णु का ही बारहवां अवतार और आयुर्वेद का आदि प्रवर्तक माना जाता है। उन्होंने ही संसार में शल्य चिकित्सा, जड़ी-बूटियों का ज्ञान और त्रिदोष (वात, पित्त, कफ) के संतुलन की शिक्षा दी। भारत सरकार ने इसी कारण धनतेरस के दिन को आधिकारिक रूप से "राष्ट्रीय आयुर्वेद दिवस" के रूप में घोषित किया है।'
              : 'Revered as an incarnation of Lord Vishnu and the divine father of Ayurvedic surgery and medicine, Lord Dhanvantari codified the holistic understanding of the Tridoshas (Vata, Pitta, Kapha). Because of this profound legacy, the Government of India officially observes Dhanteras as National Ayurveda Day, bridging ancient holistic wisdom with contemporary preventive healthcare.'}
          </p>
        </section>

        {/* SECTION 5 */}
        <section id="sec-lakshmi-kubera" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग ५' : 'Section 5'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '५. मां लक्ष्मी व धनाधिपति कुबेर देव (Lakshmi & Lord Kubera)' : '5. The Significance of Goddess Lakshmi and Lord Kubera'}
          </h2>
          <p>
            {isHindi
              ? 'जहां भगवान धन्वंतरि स्वास्थ्य के अधिष्ठाता हैं, वहीं धनतेरस की संध्या मां महालक्ष्मी और भगवान कुबेर के पूजन को समर्पित है। समुद्र मंथन से धन्वंतरि जी के प्राकट्य के साथ ही मां महालक्ष्मी का भी कमल पर विराजमान होकर दिव्य शुभागमन हुआ था। इसलिए धनतेरस को लक्ष्मी जी के आगमन का पहला दिन माना जाता है।'
              : 'While Lord Dhanvantari presides over biological vitality, the twilight of Dhanteras is dedicated to Goddess Mahalakshmi (the goddess of fortune and grace) and Lord Kubera (the celestial treasurer of the universe). In Vedic cosmology, Lakshmi represents the dynamic flow of prosperity, while Kubera represents the ethical preservation and accumulation of wealth.'}
          </p>
          <p>
            {isHindi
              ? 'भगवान कुबेर देवताओं के कोषाध्यक्ष हैं। शास्त्रों में मान्यता है कि लक्ष्मी जी धन प्रदान करती हैं, और कुबेर जी उस धन के संरक्षण और सदुपयोग का विवेक देते हैं। धनतेरस के दिन तिजोरियों, गल्ले और नवीन बही-खातों का पूजन कर यह प्रार्थना की जाती है कि परिवार का कोष सदा जनकल्याणकारी और सात्विक धन से परिपूर्ण रहे।'
              : 'Worshipping Kubera on Dhanteras alongside Lakshmi ensures that family assets are shielded from reckless depletion and unfair losses. Business houses perform bahi-khata (ledger) sanctification and locker blessings, affirming that wealth earned will serve righteous societal welfare rather than unbridled ego.'}
          </p>
        </section>

        {/* SECTION 6 */}
        <section id="sec-buying-metals" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग ६' : 'Section 6'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '६. धातु, बर्तन व स्वर्ण खरीद का पावन शगुन (Buying Metals)' : '6. Why Do People Buy Gold, Silver, Brass & Utensils?'}
          </h2>
          <p>
            {isHindi
              ? 'धनतेरस के दिन धातु की वस्तुएं, विशेषकर सोना, चांदी, पीतल और कांसा खरीदना अत्यंत शुभ माना जाता है। इसके पीछे गहरा दार्शनिक और मनोवैज्ञानिक कारण है। धातु को हिंदू परंपरा में शुद्ध, स्थायी और ऊर्जा का संवाहक माना गया है। सोना सूर्य के तेज का प्रतीक है, चांदी चंद्रमा की शीतलता और मानसिक शांति का, पीतल बृहस्पति का और कांसा आरोग्यता का सूचक है।'
              : 'The tradition of purchasing metals on Dhanteras is one of the most visible cultural customs across the Indian subcontinent. In Vedic metaphysics, metals are considered energetic conductors of celestial vibrations. Gold represents solar radiance, purity, and immortal power; silver embodies lunar calm, psychological balance, and cooling clarity; brass resonates with Guru (Jupiter) and auspiciousness; while bell-metal (Kansa) balances the internal humors of the digestive tract.'}
          </p>
          <p>
            {isHindi
              ? 'नए बर्तनों की खरीद का सीधा संबंध गृहस्थ जीवन की संपन्नता से है। परंपरा यह है कि नया बर्तन कभी खाली घर नहीं लाया जाता। उसमें मिश्री, बताशे, चावल अथवा मेवे डालकर घर में प्रवेश कराया जाता है, जिससे यह शगुन बनता है कि परिवार का अन्नपूर्णा भंडार सदा परिपूर्ण रहेगा।'
              : 'Bringing new kitchen utensils into the home signifies that the family hearth will perpetually overflow with nourishing sustenance and gracious hospitality. Tradition strictly advises never bringing an empty vessel across the threshold; it is filled with sugar candies, dry fruits, or unbroken grains of rice (Akshat) to initiate the blessing of perennial abundance.'}
          </p>
        </section>

        {/* SECTION 7 */}
        <section id="sec-importance-health" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग ७' : 'Section 7'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '७. पहला सुख निरोगी काया: धनतेरस व स्वास्थ्य (Health as Prime Wealth)' : '7. Dhanteras and the Paramount Importance of Good Health'}
          </h2>
          <p>
            {isHindi
              ? 'हमारे शास्त्रों में बार-बार दोहराया गया है कि यदि शरीर अस्वस्थ है, तो संसार का समस्त सोना और धन व्यर्थ हो जाता है। धनतेरस का सबसे मौलिक संदेश यही है कि मनुष्य अपने खानपान, दिनचर्या और मानसिक विचारों को शुद्ध रखे। भगवान धन्वंतरि केवल औषधियों के देवता नहीं हैं, वे प्रकृति के नियमों के अनुसार जीवन जीने की प्रेरणा हैं।'
              : 'A foundational axiom of Indian culture states that without physical and mental wellness, all the gold in the universe becomes an unbearable burden. Dhanteras fundamentally reorients our priorities toward preventive health, mindful nutrition, balanced sleep, and emotional peace. Lord Dhanvantari’s emergence before the arrival of Lakshmi reminds us that bodily well-being must always precede the enjoyment of material prosperity.'}
          </p>
          <p>
            {isHindi
              ? 'इस दिन कई परिवारों में नीम के पत्ते, तुलसी की चाय, आंवला और सात्विक आहार ग्रहण करने की परंपरा है। यह पर्व हमें यह संकल्प लेने का अवसर देता है कि हम मिलावटी मिठाइयों और अस्वास्थ्यकर आदतों को त्यागकर अपने शरीर को एक पावन मंदिर मानकर उसकी रक्षा करेंगे।'
              : 'Many traditional households celebrate Dhanteras by consuming bitter neem leaves, brewing fresh holy basil infusions, honoring local herbal healers, and pledging to lead a balanced seasonal lifestyle. It is an annual reminder that a sound immune system and peaceful mind are life’s most precious luxury.'}
          </p>
        </section>

        {/* SECTION 8 */}
        <section id="sec-yamadeepdaan" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग ८' : 'Section 8'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '८. यम दीपदान की पावन परंपरा व विधि (Yamadeepdaan)' : '8. The Tradition and Sacred Significance of Yamadeepdaan'}
          </h2>
          <p>
            {isHindi
              ? 'धनतेरस की शाम का सबसे महत्वपूर्ण आध्यात्मिक अनुष्ठान "यम दीपदान" है। पूरे वर्ष में केवल यही एक ऐसा दिन होता है जब मृत्यु और न्याय के देवता यमराज के निमित्त आदरपूर्वक दीपक प्रज्वलित किया जाता है। स्कंद पुराण के अनुसार, जो व्यक्ति कार्तिक कृष्ण त्रयोदशी के दिन यमराज के लिए दीपदान करता है, उसके घर में अकाल मृत्यु का भय कभी नहीं रहता।'
              : 'The most solemn spiritual rite of Dhanteras evening is Yamadeepdaan—the offering of a sacred lamp to Lord Yama, the divine dispenser of cosmic justice and guardian of transition. Scripturally, this is the sole evening in the Vedic calendar where a dedicated lamp is kindled specifically for Yama to seek protection against premature mortality, sudden tragedies, and debilitating afflictions.'}
          </p>
          <div className="p-4 sm:p-5 rounded-2xl bg-[#24113D]/5 border border-[#24113D]/20 space-y-2">
            <h3 className="font-bold text-[#24113D] text-sm sm:text-base">
              {isHindi ? 'यम दीपदान की प्रामाणिक विधि:' : 'Authentic Yamadeepdaan Procedure:'}
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#24113D]/80">
              <li>{isHindi ? 'गेहूं के आटे में हल्दी मिलाकर चार मुखी बड़ा दीया तैयार करें।' : 'Knead fresh wheat flour with turmeric and form a four-wicked sturdy earthen or flour lamp.'}</li>
              <li>{isHindi ? 'उसमें शुद्ध सरसों का तेल अथवा तिल का तेल भरें और चार बत्तियां लगाएं।' : 'Fill the lamp with pure mustard or sesame oil and position four long cotton wicks.'}</li>
              <li>{isHindi ? 'दीपक के भीतर एक तांबे का सिक्का अथवा पीली कौड़ी रखें।' : 'Place a clean coin or cowrie shell inside the lamp as an auspicious offering.'}</li>
              <li>{isHindi ? 'प्रदोष काल (सूर्यास्त के उपरांत) घर के मुख्य द्वार के बाहर दक्षिण दिशा की ओर मुख करके इसे प्रज्वलित करें।' : 'At twilight (Pradosh Kaal), place the lit lamp outside the main threshold facing strictly toward the south.'}</li>
              <li>{isHindi ? 'दीप प्रज्वलित करते समय पीछे मुड़कर न देखें और यमराज से परिवार की रक्षा की प्रार्थना करें।' : 'Recite prayers for the longevity of all family members and re-enter the home without looking backward.'}</li>
            </ul>
          </div>
        </section>

        {/* SECTION 9 */}
        <section id="sec-puja-rituals" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग ९' : 'Section 9'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '९. धनतेरस पूजन विधि व शुभ मुहूर्त (Puja Rituals & Muhurat)' : '9. Dhanteras Puja: Traditional Rituals and Practices'}
          </h2>
          <p>
            {isHindi
              ? 'धनतेरस के पूजन के लिए सबसे शुभ काल "प्रदोष काल" माना जाता है, जो सूर्यास्त के लगभग दो घंटे चौबीस मिनट तक रहता है। विशेष रूप से जब प्रदोष काल के दौरान स्थिर लग्न (जैसे वृषभ लग्न) विद्यमान हो, तब पूजा करने से मां लक्ष्मी का घर में स्थिर वास होता है।'
              : 'Dhanteras Puja is traditionally observed during Pradosh Kaal (the 2 hours and 24 minutes following local sunset). Classical astrology emphasizes performing prayers during Sthira Lagna (a fixed celestial ascendant, such as Taurus/Vrishabha), which signifies that auspicious fortune and health will remain permanently anchored within the family household.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-sm space-y-2">
              <span className="font-bold text-[#45216B] block">{isHindi ? '१. मंडप व कलश स्थापना' : '1. Mandap & Kalash Setup'}</span>
              <p className="text-[#24113D]/80">
                {isHindi
                  ? 'चौकी पर लाल या पीला वस्त्र बिछाकर चावल की ढेरी पर मंगल कलश स्थापित करें। कलश पर आम के पत्ते और श्रीफल रखें।'
                  : 'Cover a wooden plinth with clean red silk, draw a rice ashtadal mandala, and position the holy brass Kalash with mango leaves and coconut.'}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-sm space-y-2">
              <span className="font-bold text-[#45216B] block">{isHindi ? '२. धन्वंतरि व लक्ष्मी आवाहन' : '2. Divine Invocations'}</span>
              <p className="text-[#24113D]/80">
                {isHindi
                  ? 'भगवान गणेश, भगवान धन्वंतरि, मां लक्ष्मी और कुबेर जी का ध्यान कर अक्षत, पुष्प, रोली, चंदन और मौली अर्पित करें।'
                  : 'Invoke Ganesha first, followed by Bhagwan Dhanvantari, Mahalakshmi, and Kubera with unbroken rice, flowers, chandan, and sacred threads.'}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-sm space-y-2">
              <span className="font-bold text-[#45216B] block">{isHindi ? '३. नैवेद्य व भोग' : '3. Sacred Naivedyam'}</span>
              <p className="text-[#24113D]/80">
                {isHindi
                  ? 'मखाने की खीर, पंचामृत, बताशे और साबुत धनिया का भोग लगाएं। धन्वंतरि जी को तुलसी दल अवश्य अर्पित करें।'
                  : 'Offer traditional makhana kheer, panchamrit, dry whole coriander seeds, and fresh tulsi leaves to the deities.'}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-sm space-y-2">
              <span className="font-bold text-[#45216B] block">{isHindi ? '४. आरती व दीप प्रज्वलन' : '4. Aarti & Deepam'}</span>
              <p className="text-[#24113D]/80">
                {isHindi
                  ? 'कपूर से धन्वंतरि जी और लक्ष्मी जी की आरती करें। इसके उपरांत घर के मुख्य स्थानों पर १३ या २१ दीपक जलाएं।'
                  : 'Sing sacred aartis with pure camphor and brass bells, subsequently distributing 13 or 21 clay lamps across the veranda, kitchen, and rooms.'}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 10 */}
        <section id="sec-family-celebration" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग १०' : 'Section 10'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '१०. भारतीय परिवारों में धनतेरस का उल्लास (Family Celebrations)' : '10. How Families Celebrate Dhanteras in India'}
          </h2>
          <p>
            {isHindi
              ? 'भारतीय परिवारों में धनतेरस का दिन सुबह की पहली किरण से ही उत्साह और गतिशीलता से भर जाता है। घर के सभी सदस्य स्नान ध्यान कर नए परिधान पहनते हैं। महिलाएं मुख्य द्वार पर अल्पना और रंगोली सजाती हैं, जबकि बच्चे और युवा शाम की खरीदारी की योजना बनाते हैं।'
              : 'In homes across India, Dhanteras dawns with brisk anticipation. The morning air carries the crispness of early winter, mingling with the aroma of freshly roasted sweets, brass polishing pastes, and incense. Generations come together: elders recount traditional legends, women weave marigold garlands for doorways, and youth plan evening visits to bustling bazaar lanes.'}
          </p>
          <p>
            {isHindi
              ? 'शाम होते ही बाजारों में रोशनी की अनूठी छटा दिखाई देती है। सराफा बाजार, बर्तन बाजार और इलेक्ट्रॉनिक्स की दुकानें खरीदारों से खचाखच भर जाती हैं। हर कोई अपनी सामर्थ्य के अनुसार कुछ न कुछ नया शगुन अवश्य घर लाता है, चाहे वह एक छोटा चांदी का सिक्का हो, तांबे का लोटा हो, या फिर नई चम्मच।'
              : 'As dusk sets in, local marketplaces come alive in a vibrant sea of lights. Utensil stores and jeweler alleys stay open late into the night. What makes the celebration truly beautiful is its universality: every family, regardless of budget, brings home something new—whether a sovereign gold coin or a humble stainless-steel spoon—affirming mutual joy and gratitude.'}
          </p>
        </section>

        {/* SECTION 11 */}
        <section id="sec-decor-rangoli" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग ११' : 'Section 11'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '११. दीप, रंगोली व तोरण की मनोहारी सज्जा (Decor, Diyas & Rangoli)' : '11. Dhanteras Decorations, Diyas and Rangoli'}
          </h2>
          <p>
            {isHindi
              ? 'धनतेरस पर घर की सज्जा का विशेष महत्व है। मुख्य द्वार पर ताजे आम के पत्तों और गेंदे के फूलों से बना तोरण बांधा जाता है, जो नकारात्मक शक्तियों को रोकता है। दहलीज पर चावल के आटे और लाल कुमकुम से माता लक्ष्मी के चरण-चिह्न (चरण पादुका) बनाए जाते हैं, जो घर के अंदर प्रवेश करने की मुद्रा में होते हैं।'
              : 'Decorative traditions on Dhanteras combine aesthetic splendor with metaphysical intent. Entryways are graced with fresh mango leaf torans and vibrant marigold garlands. At the threshold, tiny sacred footprints (Lakshmi Charan Paduka) are meticulously illustrated with red vermilion and white rice flour, deliberately aligned pointing inward to welcome the goddess of prosperity into the home.'}
          </p>
          <p>
            {isHindi
              ? 'आंगन में पारंपरिक रंगोली के माध्यम से मंगल कलश, श्रीयंत्र, स्वास्तिक और कमल के फूल बनाए जाते हैं। बैठक कक्ष में पीतल की उरुली में स्वच्छ जल भरकर उसमें गेंदे की पंखुड़ियां और तैरते दीपक सजाए जाते हैं, जो घर में सात्विक ऊर्जा का संचार करते हैं।'
              : 'Courtyards showcase intricate geometric rangoli designs depicting the auspicious Kalash, lotus petals, and Swastika motifs. Brass urlis brimming with fresh water, scattered rose petals, and floating earthen tealights illuminate foyers, creating an atmosphere of aristocratic serenity and timeless festive charm.'}
          </p>
        </section>

        {/* SECTION 12 */}
        <section id="sec-traditional-foods" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग १२' : 'Section 12'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '१२. पारंपरिक पकवान व पावन नैवेद्य (Traditional Foods)' : '12. Traditional Foods and Festive Sweets'}
          </h2>
          <p>
            {isHindi
              ? 'धनतेरस पर बनने वाले पकवान न केवल स्वादिष्ट होते हैं, बल्कि वे आयुर्वेदिक दृष्टि से मौसमी बदलाव के अनुकूल भी होते हैं। इस दिन गाय के शुद्ध दूध में मखाने, केसर, बादाम और चावल डालकर धीमी आंच पर खीर बनाई जाती है, जिसे मां लक्ष्मी को नैवेद्य के रूप में अर्पित किया जाता है।'
              : 'The culinary heritage of Dhanteras is carefully calibrated to support digestion and vital immunity during the seasonal shift into North Indian winter. The centerpiece offering is slow-simmered Kheer—prepared using whole milk, roasted lotus seeds (makhana), fragrant Kashmiri saffron, and broken basmati rice—symbolizing purity and nourishment.'}
          </p>
          <p>
            {isHindi
              ? 'इसके अतिरिक्त साबुत धनिया और गुड़ का प्रसाद (धनिया पंजीरी), पंचामृत, खील-बताशे और बेसन के शुद्ध घी में बने लड्डू प्रमुख रूप से बनाए जाते हैं। उत्तर भारत में इस दिन पकाई गई भोजन सामग्री को नए बर्तनों में परोसने का विशेष महत्व माना गया है।'
              : 'Equally significant is the offering of Dhaniya Panjiri (coarsely ground dry coriander roasted in cow ghee with raw sugar), crispy rice puffs (Kheel), and hollow sugar shells (Batashas). Freshly purchased bronze or brass dining sets are traditionally inaugurated by serving this blessed food to elders and children.'}
          </p>
        </section>

        {/* SECTION 13 */}
        <section id="sec-regional-traditions" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग १३' : 'Section 13'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '१३. भारत की विविध क्षेत्रीय परंपराएं (Regional Customs)' : '13. Regional Dhanteras Traditions Across India'}
          </h2>
          <p>
            {isHindi
              ? 'भारत की सांस्कृतिक विविधता धनतेरस के उत्सव में भी स्पष्ट दिखाई देती है। यद्यपि मूल भावना स्वास्थ्य और समृद्धि की ही रहती है, परंतु देश के विभिन्न राज्यों में इसे मनाने की अनूठी रीतियां हैं:'
              : 'India’s geographic and cultural tapestry expresses Dhanteras through diverse regional lenses, each emphasizing different elements of trade, agriculture, metallurgy, and spiritual devotion:'}
          </p>

          {/* Regional Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'north', labelEn: 'North & Central India', labelHi: 'उत्तर व मध्य भारत' },
              { id: 'west', labelEn: 'Western India (Gujarat & Maharashtra)', labelHi: 'पश्चिम भारत (गुजरात व महाराष्ट्र)' },
              { id: 'south', labelEn: 'South India', labelHi: 'दक्षिण भारत' },
              { id: 'east', labelEn: 'Eastern India', labelHi: 'पूर्वी भारत' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveRegionTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[40px] ${
                  activeRegionTab === tab.id
                    ? 'bg-[#24113D] text-[#F2D98B] shadow-md font-bold'
                    : 'bg-white text-[#24113D]/70 border border-[#D4AF37]/30 hover:bg-[#F2D98B]/10'
                }`}
              >
                {isHindi ? tab.labelHi : tab.labelEn}
              </button>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-sm text-xs sm:text-sm leading-relaxed">
            {activeRegionTab === 'north' && (
              <div className="space-y-2">
                <span className="font-bold text-[#45216B] block text-sm sm:text-base">
                  {isHindi ? 'उत्तर भारत: बर्तन, झाड़ू व यम दीपदान' : 'North India: Brassware, Brooms & Yamadeepdaan'}
                </span>
                <p>
                  {isHindi
                    ? 'उत्तर प्रदेश, दिल्ली, पंजाब, हरियाणा, बिहार और राजस्थान में धनतेरस पर नए बर्तन, झाड़ू और सोने-चांदी के सिक्कों की खरीद सबसे प्रमुख होती है। शाम को यम दीपदान अनिवार्य रूप से किया जाता है। व्यापारी वर्ग अपनी दुकानों को विशेष रोशनी से सजाते हैं।'
                    : 'Across Uttar Pradesh, Delhi, Punjab, Haryana, Bihar, and Rajasthan, families prioritize buying brass utensils, brooms (Jhadu), and silver coins. Dusk is invariably marked by the meticulous observance of Yamadeepdaan facing south.'}
                </p>
              </div>
            )}

            {activeRegionTab === 'west' && (
              <div className="space-y-2">
                <span className="font-bold text-[#45216B] block text-sm sm:text-base">
                  {isHindi ? 'पश्चिम भारत: चोपड़ा पूजन व धान-धनिया शगुन' : 'Western India: Chopda Pujan & Dhana Jaggery'}
                </span>
                <p>
                  {isHindi
                    ? 'गुजरात और महाराष्ट्र में व्यापारी समुदाय इस दिन से अपने वित्तीय वर्ष के बही-खातों की शुद्धि और "चोपड़ा पूजन" की तैयारी करते हैं। महाराष्ट्र में सूखे धनिए के बीजों को गुड़ के साथ पीसकर "धने और गूळ" का विशेष नैवेद्य मां लक्ष्मी को चढ़ाया जाता है।'
                    : 'In Gujarat and Maharashtra, the mercantile community prepares for Chopda Pujan (accounting ledger sanctification). In Maharashtra, crushed dry coriander seeds mixed with organic jaggery (Dhane-Gool) are offered as sacred Naivedyam.'}
                </p>
              </div>
            )}

            {activeRegionTab === 'south' && (
              <div className="space-y-2">
                <span className="font-bold text-[#45216B] block text-sm sm:text-base">
                  {isHindi ? 'दक्षिण भारत: धन्वंतरि जयंती व हर्बल तेल स्नान' : 'South India: Dhanvantari Jayanti & Herbal Oil Bath'}
                </span>
                <p>
                  {isHindi
                    ? 'तमिलनाडु, कर्नाटक और केरल में इस दिन को भगवान धन्वंतरि के प्राकट्य दिवस के रूप में श्रद्धापूर्वक मनाया जाता है। कई स्थानों पर अगले दिन नरक चतुर्दशी के तेल स्नान (तैल अभ्यंग) हेतु विशेष औषधीय तेल और उबटन तैयार करने की रस्म शुरू होती है।'
                    : 'Across Tamil Nadu, Karnataka, and Kerala, Dhanvantari Jayanti is observed with deep reverence in Ayurvedic institutions and Vishnu temples. Preparations commence for the auspicious pre-dawn medicated oil bath (Thaila Abhyanga) of Naraka Chaturdashi.'}
                </p>
              </div>
            )}

            {activeRegionTab === 'east' && (
              <div className="space-y-2">
                <span className="font-bold text-[#45216B] block text-sm sm:text-base">
                  {isHindi ? 'पूर्वी भारत: कौड़ी पूजन व लक्ष्मी आगमन' : 'Eastern India: Cowrie Worship & Auspicious Metal'}
                </span>
                <p>
                  {isHindi
                    ? 'पश्चिम बंगाल, ओडिशा और असम में पीतल के बर्तन और चांदी के शगुन खरीदे जाते हैं। घरों में पीली कौड़ियों और तांबे के सिक्कों का पूजन कर लक्ष्मी जी के स्थायी वास की प्रार्थना की जाती है।'
                    : 'In West Bengal, Odisha, and Assam, buying brass utensils and silver coins marks the opening of the festive season. Ancient sea cowries (Kodi) and copper vessels are worshipped as symbols of maritime prosperity and divine grace.'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 14 */}
        <section id="sec-spiritual-significance" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग १४' : 'Section 14'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '१४. आध्यात्मिक व सांस्कृतिक दर्शन (Spiritual Significance)' : '14. Spiritual and Cultural Significance'}
          </h2>
          <p>
            {isHindi
              ? 'धनतेरस केवल बाजारवाद या खरीदारी का उत्सव नहीं है; यह जीवन के संतुलन का गहरा दर्शन है। सनातन परंपरा में पुरुषार्थ चतुष्टय — धर्म, अर्थ, काम और मोक्ष — की अवधारणा है। धनतेरस यह सिखाता है कि अर्थ (धन) का उपार्जन धर्म (नैतिकता) के आधार पर होना चाहिए, और उसका उपभोग समाज तथा स्वास्थ्य के संरक्षण के लिए किया जाना चाहिए।'
              : 'Far beyond transactional consumerism, Dhanteras articulates the classical Vedic doctrine of the Purusharthas: Dharma (righteousness), Artha (material prosperity), Kama (fulfillment), and Moksha (spiritual liberation). The festival insists that Artha is noble only when anchored firmly in Dharma, and that material acquisitions are barren if they undermine human health and compassion.'}
          </p>
          <p>
            {isHindi
              ? 'जब हम यम के निमित्त दीप जलाते हैं, तो हम अपनी मृत्यु के भय को स्वीकार कर उससे पार पाने का साहस जुटाते हैं। जब हम धन्वंतरि की स्तुति करते हैं, तो हम अपने शरीर रूपी मंदिर के प्रति कृतज्ञ होते हैं। और जब हम नए बर्तन घर लाते हैं, तो हम यह संकल्प करते हैं कि हमारे द्वार पर आने वाला कोई भी प्राणी कभी भूखा नहीं लौटेगा।'
              : 'Kindling the southern lamp is a courageous confrontation with mortality; invoking Dhanvantari is an act of reverent gratitude toward the biological miracle of human existence; and bringing new vessels home is a solemn commitment to sustain hospitality and share prosperity with the wider community.'}
          </p>
        </section>

        {/* SECTION 15 */}
        <section id="sec-modern-celebration" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग १५' : 'Section 15'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '१५. आधुनिक उत्सव स्वरूप व डिजिटल युग (Modern Celebrations)' : '15. Modern Ways of Celebrating Dhanteras'}
          </h2>
          <p>
            {isHindi
              ? 'डिजिटल युग और इक्कीसवीं सदी में धनतेरस मनाने के तरीकों में सुखद और व्यावहारिक बदलाव आए हैं। जहां पारंपरिक रूप से भौतिक सोने के आभूषण खरीदे जाते थे, वहीं अब युवा पीढ़ी डिजिटल गोल्ड, सॉवरेन गोल्ड बॉन्ड (SGB), म्यूचुअल फंड एसआईपी (SIP) और स्वास्थ्य बीमा पॉलिसियों की शुरुआत कर आधुनिक रूप से "धन" और "आरोग्य" का स्वागत कर रही है।'
              : 'In the digital twenty-first century, Dhanteras has evolved gracefully to embrace modern convenience without forsaking ancient sanctities. Today’s young professionals often augment physical metal purchases with digital gold, Sovereign Gold Bonds (SGB), initiating mutual fund SIPs, or purchasing comprehensive health insurance coverage for elderly parents—infusing timeless traditions with strategic modern pragmatism.'}
          </p>
          <p>
            {isHindi
              ? 'साथ ही, डिजिटल ग्रीटिंग्स, सोशल मीडिया विशेज और ऑनलाइन फैमिली वीडियो कॉल्स ने दुनिया भर में फैले अनिवासी भारतीयों (NRIs) को अपनी जड़ों से जोड़े रखा है। आधुनिकता ने परंपरा की भावना को कमजोर नहीं, बल्कि और अधिक सुलभ और समावेशी बनाया है।'
              : 'Furthermore, online video calls, instant messaging, and personalized digital greeting studios allow global diasporas to connect seamlessly with ancestral traditions, exchanging sincere blessings of health and prosperity across continents in real time.'}
          </p>
        </section>

        {/* SECTION 16 */}
        <section id="sec-eco-friendly" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग १६' : 'Section 16'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '१६. पर्यावरण-अनुकूल धनतेरस: प्रकृति व परंपरा (Eco-Friendly Celebration)' : '16. Eco-Friendly Dhanteras Celebration'}
          </h2>
          <p>
            {isHindi
              ? 'भगवान धन्वंतरि प्रकृति और आयुर्वेद के स्वामी हैं, अतः धनतेरस का उत्सव पर्यावरण को क्षति पहुंचाए बिना मनाया जाना चाहिए। प्लास्टिक के कृत्रिम दीयों और रासायनिक झालरों के स्थान पर स्थानीय कुम्हारों द्वारा मिट्टी के बने पारंपरिक दीयों का प्रयोग करना चाहिए। इससे पर्यावरण की रक्षा होती है और स्थानीय हस्तशिल्पियों को आजीविका मिलती है।'
              : 'Because Lord Dhanvantari personifies the healing forces of nature, celebrating Dhanteras requires conscientious ecological mindfulness. Replacing cheap plastic lanterns and synthetic single-use decorations with handcrafted terracotta diyas directly supports local rural potters while keeping the environment free from non-biodegradable waste.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-white border border-emerald-600/30 shadow-sm space-y-1">
              <span className="font-bold text-emerald-800 block">{isHindi ? 'शुद्ध तेल व कपास' : 'Pure Oils & Cotton'}</span>
              <p className="text-[#24113D]/80">
                {isHindi
                  ? 'मिट्टी के दीयों में तिल या सरसों का प्राकृतिक तेल और जैविक कपास की बत्तियां जलाएं।'
                  : 'Burn cold-pressed sesame or mustard oil in terracotta lamps using unbleached organic cotton.'}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-emerald-600/30 shadow-sm space-y-1">
              <span className="font-bold text-emerald-800 block">{isHindi ? 'प्राकृतिक रंगोली' : 'Herbal Rangoli'}</span>
              <p className="text-[#24113D]/80">
                {isHindi
                  ? 'रासायनिक रंगों के बजाय हल्दी, चावल का आटा, गेंदे की पंखुड़ियां और गेरू का उपयोग करें।'
                  : 'Craft rangolis from rice flour, turmeric, marigold petals, and natural red ochre (Geru).'}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-emerald-600/30 shadow-sm space-y-1">
              <span className="font-bold text-emerald-800 block">{isHindi ? 'पौधों का उपहार' : 'Living Plant Gifts'}</span>
              <p className="text-[#24113D]/80">
                {isHindi
                  ? 'प्लास्टिक के उपहारों के स्थान पर तुलसी, एलोवेरा या शमी का पवित्र पौधा भेंट करें।'
                  : 'Gift living holy basil, aloe vera, or air-purifying herbs in traditional earthen planters.'}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 17 */}
        <section id="sec-gift-ideas" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग १७' : 'Section 17'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '१७. सार्थक धनतेरस उपहार विचार (Meaningful Gift Ideas)' : '17. Meaningful Dhanteras Gift Ideas'}
          </h2>
          <p>
            {isHindi
              ? 'धनतेरस पर उपहार देना परस्पर प्रेम और सद्भावना को मजबूत करता है। उपहार ऐसा होना चाहिए जो दीर्घकालिक हो और प्राप्तकर्ता के जीवन में स्वास्थ्य व आनंद की वृद्धि करे। शुद्ध चांदी के लक्ष्मी-गणेश सिक्के, पीतल के पूजा पात्र, कांसे की भोजन थाली, आयुर्वेदिक वेलनेस हैंपर और उच्च कोटि के सूखे मेवे सबसे विचारशील उपहार माने जाते हैं।'
              : 'Gifting on Dhanteras is an act of conferring blessings. Rather than disposable novelties or sugary confections, thoughtful Dhanteras gifts prioritize durability, wellness, and aesthetic longevity. Certified pure silver coins, heavy-gauge brass pooja thalis, handcrafted bronze dinnerware, organic wellness hampers, and carved wooden dry-fruit boxes serve as prized family heirlooms for years to come.'}
          </p>
          <div className="pt-2">
            <Link
              to="/gift-ideas/dhanteras"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#24113D] text-[#F2D98B] font-bold text-xs sm:text-sm shadow-md hover:bg-[#381B5E] transition-all"
            >
              <Gift size={16} />
              <span>{isHindi ? '१५ संपूर्ण धनतेरस उपहार संग्रह देखें' : 'View Full 15 Dhanteras Gift Curations'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* SECTION 18 */}
        <section id="sec-fascinating-facts" className="scroll-mt-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase">
            <span>{isHindi ? 'अनुभाग १८' : 'Section 18'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D]">
            {isHindi ? '१८. रोचक व प्रामाणिक तथ्य (Fascinating Facts About Dhanteras)' : '18. Fascinating Facts About Dhanteras'}
          </h2>
          <div className="space-y-3">
            {[
              {
                titleEn: '1. Official National Ayurveda Day',
                titleHi: '१. आधिकारिक राष्ट्रीय आयुर्वेद दिवस',
                descEn: 'The Ministry of AYUSH officially declared Dhanteras as National Ayurveda Day in 2016 to honor Lord Dhanvantari’s contribution to ancient medical science.',
                descHi: 'आयुष मंत्रालय ने २०१६ में धनतेरस को राष्ट्रीय आयुर्वेद दिवस के रूप में अधिसूचित किया, ताकि वैदिक चिकित्सा विज्ञान के प्रति वैश्विक जागरूकता बढ़े।',
              },
              {
                titleEn: '2. The Scientific Logic of Buying Kansa & Copper',
                titleHi: '२. कांसा व तांबा खरीदने का वैज्ञानिक आधार',
                descEn: 'Ancient Indians prioritized brass, copper, and bronze because these oligodynamic metals naturally sanitize drinking water and balance gut flora.',
                descHi: 'प्राचीन काल में तांबे व कांसे के बर्तन खरीदने पर जोर इसलिए था क्योंकि ये धातुएं जल को प्राकृतिक रूप से कीटाणुरहित कर पाचन तंत्र को संतुलित रखती हैं।',
              },
              {
                titleEn: '3. The Legend of King Hima’s Clever Bride',
                titleHi: '३. राजा हिम के पुत्र और वधू की सूझबूझ',
                descEn: 'Folklore recounts that when the god of death approached in the form of a serpent, the blinding brilliance of heaps of gold coins and radiant lamps at the threshold blinded his eyes, causing him to slither away peacefully.',
                descHi: 'कथा के अनुसार जब यमदूत सर्प बनकर राजकुमार के प्राण लेने आए, तो दहलीज़ पर रखे सोने के सिक्कों और दीपों की तीव्र रोशनी से चकाचौंध होकर वे बिना प्राण लिए लौट गए।',
              },
              {
                titleEn: '4. Why Gold Never Corrodes',
                titleHi: '४. स्वर्ण का अक्षत स्वरूप',
                descEn: 'In Sanskrit scriptures, gold is termed "Hiranya" or "Suvarna" (the undecaying light), representing the immutable, immortal aspect of cosmic energy.',
                descHi: 'शास्त्रों में सोने को "हिरण्य" कहा गया है जो कभी क्षय नहीं होता। यह आत्मा के अमर स्वरूप और अटूट समृद्धि का प्रतीक है।',
              },
            ].map((fact, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-sm space-y-1">
                <span className="font-bold text-[#45216B] text-xs sm:text-sm block">
                  {isHindi ? fact.titleHi : fact.titleEn}
                </span>
                <p className="text-xs sm:text-sm text-[#24113D]/80 leading-relaxed">
                  {isHindi ? fact.descHi : fact.descEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 19: FAQ SECTION */}
        <section id="sec-dhanteras-faqs" className="scroll-mt-24 pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2D98B]/30 border border-[#F2D98B] text-xs font-bold text-[#24113D] uppercase mb-4">
            <span>{isHindi ? 'अनुभाग १९' : 'Section 19'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D] mb-6">
            {isHindi ? '१९. धनतेरस से जुड़े महत्वपूर्ण प्रश्नोत्तरी (FAQs)' : '19. Frequently Asked Questions About Dhanteras'}
          </h2>
          {festival.faqs && festival.faqs.length > 0 && (
            <TrilingualFAQSection
              faqs={festival.faqs}
              festivalNameEn={festival.nameEn}
              festivalNameHi={festival.nameHi}
              initialLang={isHindi ? 'hi' : isHinglish ? 'hinglish' : 'en'}
            />
          )}
        </section>
      </div>

      {/* Final Action Cards */}
      <div className="mt-14 sm:mt-20 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#24113D] via-[#351759] to-[#160B26] text-[#FAF7F0] border-2 border-[#F2D98B]/30 shadow-2xl text-center space-y-5">
        <Sparkles size={28} className="text-[#F2D98B] mx-auto animate-pulse" />
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F2D98B]">
          {isHindi ? 'धनतेरस २०२६ की हार्दिक शुभकामनाएं' : 'Celebrate a Radiant Dhanteras 2026'}
        </h3>
        <p className="text-xs sm:text-sm text-[#FAF7F0]/80 max-w-xl mx-auto leading-relaxed">
          {isHindi
            ? 'अपनों को भेजें २५ खास धनतेरस ग्रीटिंग्स, १०० अनमोल शुभकामनाएं और अपनी तस्वीर के साथ तैयार करें शाही फोटो कार्ड।'
            : 'Personalize 25 exclusive Dhanteras greetings, browse 100 curated wishes, and design your custom photo cards in our studio.'}
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/greeting-cards?festival=dhanteras"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#F2D98B] to-[#D4AF37] text-[#24113D] font-bold text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-95 transition-all min-h-[44px] flex items-center gap-2"
          >
            <Coins size={16} />
            <span>{isHindi ? '२५ धनतेरस ग्रीटिंग्स देखें' : 'Explore 25 Dhanteras Greetings'}</span>
          </Link>
          <Link
            to="/wishes?festival=dhanteras"
            className="px-6 py-3 rounded-xl bg-[#45216B] hover:bg-[#5C2B8F] text-[#FAF7F0] border border-[#F2D98B]/40 font-semibold text-xs sm:text-sm shadow-md transition-all min-h-[44px] flex items-center gap-2"
          >
            <Heart size={16} className="text-[#F2D98B]" />
            <span>{isHindi ? '१०० धनतेरस शुभकामनाएं' : 'Read 100 Dhanteras Wishes'}</span>
          </Link>
        </div>
      </div>
    </article>
  );
};
