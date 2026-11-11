import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { SEOHead } from '../../components/common/SEOHead';
import {
  Sparkles,
  Heart,
  Shield,
  Palette,
  BookOpen,
  Compass,
  Award,
  User,
  Calendar,
  Mail,
  Code2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { isHindi, loc, language } = useLanguage();

  const seoTitle = loc(
    'About FestiveWala — Independent Indian Festival Culture & Greeting Studio',
    'फेस्टिववाला के बारे में — भारतीय उत्सव, शुभकामनाएं और डिजिटल ग्रीटिंग स्टूडियो',
    'FestiveWala Ke Baare Mein — Indian Festivals, Wishes Aur Greeting Studio'
  );

  const seoDescription = loc(
    'Learn about FestiveWala, an independent project built by Shailendra Pathak in India to preserve Indian festival traditions, trilingual wishes, Rangoli inspiration, and private browser-based greeting card creation.',
    'शैलेंद्र पाठक द्वारा निर्मित स्वतंत्र प्रोजेक्ट फेस्टिववाला के बारे में जानें — भारतीय त्योहार गाइड, त्रिभाषी शुभकामनाएं, रंगोली प्रेरणा और ब्राउज़र-आधारित ग्रीटिंग कार्ड स्टूडियो।',
    'Shailendra Pathak dwara banaye gaye independent project FestiveWala ke baare mein jaanein — Indian festival guides, trilingual wishes aur private greeting card studio.'
  );

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: seoTitle,
    description: seoDescription,
    url: 'https://festivewala.in/about/',
    inLanguage: language === 'hi' ? 'hi' : language === 'hinglish' ? 'hi-Latn' : 'en',
    mainEntity: {
      '@type': 'Organization',
      name: 'FestiveWala',
      url: 'https://festivewala.in/',
      email: 'mailto:Pandit979212@gmail.com',
      founder: {
        '@type': 'Person',
        name: 'Shailendra Pathak',
      },
      foundingLocation: {
        '@type': 'Country',
        name: 'India',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'founder and support',
        email: 'Pandit979212@gmail.com',
        availableLanguage: ['English', 'Hindi', 'Hinglish'],
      },
    },
  };

  return (
    <div className="py-12 md:py-16 bg-[#FAF7F0] min-h-screen text-brand-dark pb-24">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords="about festivewala, shailendra pathak, indian festival website, digital greeting cards, festival guides, diwali chhath wishes"
        canonicalUrl="https://festivewala.in/about/"
        jsonLd={aboutJsonLd}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-deep/10 border border-brand-deep/20 text-brand-deep text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} className="text-brand-gold-dark" />
            <span>
              {loc(
                'Our Story & Independent Craft',
                'हमारी कहानी व स्वतंत्र पहल',
                'Hamari Kahani & Craft'
              )}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-deep">
            {loc(
              'About FestiveWala',
              'फेस्टिववाला के बारे में',
              'FestiveWala Ke Baare Mein'
            )}
          </h1>

          <p className="text-base sm:text-lg text-brand-dark/75 font-sans max-w-3xl mx-auto leading-relaxed">
            {loc(
              'FestiveWala is an independent Indian celebration web platform created by Shailendra Pathak to share clean, thoughtful festival guides, 1,300 curated wishes across English, Hindi, and Hinglish, and a privacy-first browser Greeting Studio.',
              'फेस्टिववाला भारत से शैलेंद्र पाठक द्वारा निर्मित एक स्वतंत्र डिजिटल पहल है, जो सरल व प्रामाणिक त्योहार मार्गदर्शिका, हिंदी, अंग्रेज़ी व हिंग्लिश में १,३०० संकलित शुभकामनाएं और निजता-सुरक्षित ग्रीटिंग कार्ड स्टूडियो प्रदान करता है।',
              'FestiveWala India se Shailendra Pathak dwara banaya gaya ek independent project hai jahan authentic festival guides, English-Hindi-Hinglish mein 1,300 curated wishes aur privacy-first Greeting Studio milta hai.'
            )}
          </p>
        </div>

        {/* Mission Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#2B124C] via-[#1C0B33] to-[#24103B] text-[#FAF7F0] border border-brand-gold/40 shadow-2xl relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F2D98B]">
              {loc(
                'Why FestiveWala Was Built',
                'फेस्टिववाला बनाने का उद्देश्य',
                'FestiveWala Kyon Banaya Gaya'
              )}
            </h2>
            <p className="text-sm sm:text-base text-[#FAF7F0]/90 font-sans leading-relaxed">
              {loc(
                'During major celebrations like Diwali, Dhanteras, Chhath Puja, and Holi, families often had to dig through cluttered forwarded messages, watermarked downloads, or confusing apps just to send a warm card or check simple puja timings. FestiveWala was built so anyone can find calm, respectful writing and craft a personal greeting card right in their browser without sign-ups, uploads, or intrusive popups.',
                'दीपावली, धनतेरस, छठ पूजा और होली जैसे पावन अवसरों पर परिवारों को अक्सर बिखरे हुए फॉरवर्ड संदेशों, वॉटरमार्क वाले कार्ड्स और जटिल ऐप्स से जूझना पड़ता था। फेस्टिववाला इस उद्देश्य से बनाया गया है कि कोई भी व्यक्ति बिना लॉग-इन या फोटो अपलोड किए अपने ब्राउज़र में ही सुंदर कार्ड और सरल सांस्कृतिक जानकारी पा सके।',
                'Diwali, Dhanteras, Chhath Puja aur Holi par aksar family wishes aur puja timings dhoondhne ke liye cluttered forwarded messages ya watermarked apps use karne padte the. FestiveWala isi kami ko door karne ke liye bana hai taaki aap bina login ya photo upload kiye browser mein hi clean cards bana sakein.'
              )}
            </p>
          </div>
        </div>

        {/* Meet the Founder Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-brand-gold/30 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-brand-gold/20 pb-5">
            <div className="w-14 h-14 rounded-2xl bg-brand-deep text-[#F2D98B] flex items-center justify-center flex-shrink-0 shadow-sm">
              <User size={28} />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold-dark">
                {loc('Independent Creator', 'स्वतंत्र निर्माता', 'Independent Developer')}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
                {loc(
                  'Meet the Founder — Shailendra Pathak',
                  'संस्थापक परिचय — शैलेंद्र पाठक',
                  'Meet the Founder — Shailendra Pathak'
                )}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-brand-dark/80 font-sans leading-relaxed">
            <p>
              {loc(
                'FestiveWala is designed, developed, and maintained independently by Shailendra Pathak in India. Every route, trilingual wording check, Rangoli SVG illustration, and HTML5 Canvas greeting renderer on this website is crafted personally rather than outsourced to an automated content farm.',
                'फेस्टिववाला को भारत में शैलेंद्र पाठक द्वारा स्वतंत्र रूप से डिज़ाइन, विकसित और संचालित किया जाता है। इस वेबसाइट के सभी पृष्ठ, हिंदी-अंग्रेज़ी-हिंग्लिश संदेश, रंगोली डिज़ाइन और ग्रीटिंग कार्ड रेंडरर स्वयं व्यक्तिगत रूप से तैयार व परीक्षित किए गए हैं।',
                'FestiveWala ko India mein Shailendra Pathak ne khud design, develop aur maintain kiya hai. Is website ka har guide, trilingual wish collection, Rangoli SVG aur Greeting Studio code khud likha aur review kiya gaya hai.'
              )}
            </p>
            <p>
              {loc(
                'Instead of pretending to be a large newsroom or editorial syndicate, this project stays transparent about how it works: clean code, honest cultural context grounded in lived Indian traditions, and steady improvements driven directly by reader feedback.',
                'किसी बड़े मीडिया समूह या छद्म संपादकीय मंडल का दावा करने के बजाय, यह मंच अपनी कार्यप्रणाली में पूरी पारदर्शिता रखता है—सरल तकनीकी संरचना, पारंपरिक भारतीय अनुभवों पर आधारित सामग्री और पाठकों के सुझावों से निरंतर सुधार।',
                'Kisi fake agency ya bade editorial syndicate ka claim karne ke bajay, FestiveWala bilkul transparent project hai—clean web technology, real Indian family traditions aur reader feedback ke hisab se regular updates.'
              )}
            </p>
          </div>
        </div>

        {/* Three Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-brand-gold/30 shadow-sm space-y-3">
            <div className="w-11 h-11 rounded-xl bg-brand-deep text-[#F2D98B] flex items-center justify-center">
              <Palette size={22} />
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-deep">
              {loc('Greeting Studio Craft', 'ग्रीटिंग स्टूडियो शिल्प', 'Greeting Studio Craft')}
            </h3>
            <p className="text-xs sm:text-sm text-brand-dark/75 font-sans leading-relaxed">
              {loc(
                '184 classic and photo-frame card templates rendered locally with crisp typography, custom recipient names, and instant PNG export without watermarks.',
                '१८४ क्लासिक व फोटो-फ्रेम कार्ड टेम्पलेट्स, जिनमें स्पष्ट टाइपोग्राफी, व्यक्तिगत नाम और बिना वॉटरमार्क के तुरंत पीएनजी डाउनलोड की सुविधा मिलती है।',
                '184 classic aur photo-frame card templates jo crisp typography, custom name aur bina watermark instant PNG download dete hain.'
              )}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-gold/30 shadow-sm space-y-3">
            <div className="w-11 h-11 rounded-xl bg-brand-deep text-[#F2D98B] flex items-center justify-center">
              <Heart size={22} />
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-deep">
              {loc('Trilingual Wishes Hub', 'त्रिभाषी शुभकामनाएं संग्रह', 'Trilingual Wishes Hub')}
            </h3>
            <p className="text-xs sm:text-sm text-brand-dark/75 font-sans leading-relaxed">
              {loc(
                '1,300 curated festival and everyday occasion wishes written cleanly across English, Hindi (Devanagari), and Hinglish for immediate copying and sharing.',
                'त्योहारों और जीवन के खास अवसरों के लिए अंग्रेज़ी, हिंदी (देवनागरी) और हिंग्लिश में तैयार १,३०० संकलित संदेश, जिन्हें एक क्लिक में कॉपी किया जा सकता है।',
                'Festivals aur special occasions ke liye English, Hindi aur Hinglish mein 1,300 curated wishes jo one-click copy aur share ke liye ready hain.'
              )}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-gold/30 shadow-sm space-y-3">
            <div className="w-11 h-11 rounded-xl bg-brand-deep text-[#F2D98B] flex items-center justify-center">
              <Shield size={22} />
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-deep">
              {loc('Privacy-First Architecture', 'निजता-सुरक्षित प्रणाली', 'Privacy-First Design')}
            </h3>
            <p className="text-xs sm:text-sm text-brand-dark/75 font-sans leading-relaxed">
              {loc(
                'Photos placed into FestiveWala photo greeting cards stay completely inside your browser via HTML5 Canvas. We do not collect user accounts or store personal uploads on any server.',
                'फोटो ग्रीटिंग कार्ड में जोड़ी गई आपकी तस्वीरें HTML5 Canvas द्वारा पूरी तरह आपके ब्राउज़र में ही प्रोसेस होती हैं। हम कोई फोटो सर्वर पर अपलोड या सेव नहीं करते।',
                'Aapki uploaded photos sirf aapke browser mein HTML5 Canvas par process hoti hain. FestiveWala kisi server par personal photos upload ya store nahi karta.'
              )}
            </p>
          </div>
        </div>

        {/* How Content & Dates Are Created */}
        <div className="rounded-3xl bg-white border border-brand-gold/30 p-8 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-semibold uppercase tracking-wider">
              <BookOpen size={14} className="text-brand-gold-dark" />
              <span>
                {loc(
                  'Content & Technical Process',
                  'सामग्री निर्माण व सत्यापन प्रक्रिया',
                  'Content & Creation Process'
                )}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
              {loc(
                'How FestiveWala Content & Cards Are Created',
                'फेस्टिववाला की सामग्री व कार्ड कैसे तैयार किए जाते हैं',
                'FestiveWala Content & Cards Kaise Banaye Jaate Hain'
              )}
            </h2>
            <p className="text-sm text-brand-dark/75 font-sans leading-relaxed">
              {loc(
                'Every section on FestiveWala combines practical festival planning with transparent, handcrafted web engineering.',
                'फेस्टिववाला का हर अनुभाग व्यावहारिक पारिवारिक परंपराओं और पारदर्शी वेब इंजीनियरिंग के मेल से तैयार किया गया है।',
                'FestiveWala ka har section real family festival planning aur honest frontend craftsmanship se banaya gaya hai.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-brand-dark/80 font-sans">
            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-brand-gold/20 space-y-2">
              <div className="flex items-center gap-2 text-brand-deep">
                <Calendar size={16} className="text-brand-gold-dark" />
                <h3 className="font-serif font-bold text-base">
                  {loc(
                    '1. Panchang Cross-Checking & Regional Care',
                    '१. पंचांग मिलान व क्षेत्रीय विविधता',
                    '1. Panchang Verification & Regional Context'
                  )}
                </h3>
              </div>
              <p className="leading-relaxed">
                {loc(
                  'Before publishing 2026 festival dates and muhurat windows for hubs like Diwali, Dhanteras, Chhath Puja, and Holi, dates are cross-checked against standard Indian Panchang references such as Drik Panchang. Because sunrise, sunset, and tithi timings shift by city and local tradition, we encourage readers to confirm exact muhurat with their local temple or family priest.',
                  'दीपावली, धनतेरस, छठ पूजा और होली की २०२६ तिथियाँ प्रकाशित करने से पहले दृक पंचांग जैसे मानक भारतीय पंचांग स्रोतों से मिलान किया जाता है। सूर्योदय, सूर्यास्त और स्थानीय परंपराओं के अनुसार समय शहर के हिसाब से बदल सकता है, इसलिए सटीक पूजा मुहूर्त के लिए स्थानीय पंडित जी से परामर्श की सलाह दी जाती है।',
                  'Diwali, Dhanteras, Chhath Puja aur Holi ki 2026 dates publish karne se pehle Drik Panchang jaise standard Indian Panchang references check kiye jaate hain. Har shehar ke sunrise-sunset aur local parampara ke hisab se exact muhurat thoda alag ho sakta hai, isliye hum readers ko local pandit ji se confirm karne ki salah bhi dete hain.'
                )}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-brand-gold/20 space-y-2">
              <div className="flex items-center gap-2 text-brand-deep">
                <Code2 size={16} className="text-brand-gold-dark" />
                <h3 className="font-serif font-bold text-base">
                  {loc(
                    '2. Client-Side Studio & Trilingual Writing',
                    '२. त्रिभाषी लेखन व क्लाइंट-साइड स्टूडियो',
                    '2. Trilingual Writing & Canvas Studio'
                  )}
                </h3>
              </div>
              <p className="leading-relaxed">
                {loc(
                  'Wishes, greeting captions, 8 Rangoli patterns, 8 decor guides, 25 gift ideas, and 14 cultural guides are reviewed across English, Hindi, and Hinglish so wording feels warm and natural rather than machine-stiff. All card composition runs directly on the user device using browser HTML5 Canvas and vector SVGs.',
                  '१,३०० शुभकामनाएं, ८ रंगोली डिज़ाइन, ८ सजावट विचार, २५ उपहार सुझाव और १४ उत्सव गाइड हिंदी, अंग्रेज़ी व हिंग्लिश में सहज भाव के साथ तैयार किए गए हैं। सभी ग्रीटिंग कार्ड ब्राउज़र में HTML5 Canvas व वेक्टर SVG से बनते हैं।',
                  'Wishes, 8 Rangoli patterns, 8 decor ideas, 25 gift guides aur 14 festival guides ko English, Hindi aur Hinglish mein natural wording ke saath curate kiya gaya hai. Card rendering aur download directly aapke device ke browser par hota hai.'
                )}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-gold/20 flex flex-wrap items-center justify-between gap-4 text-xs text-brand-dark/70 font-sans">
            <p>
              {loc(
                'Spotted a regional date nuance, typo, or suggestion? Write directly to the founder — thoughtful corrections are warmly welcomed.',
                'यदि आपको किसी तिथि, वर्तनी या सामग्री में सुधार का सुझाव देना हो, तो कृपया सीधे संपर्क करें।',
                'Agar aapko kisi date, spelling ya guide mein correction suggest karna ho, to direct email ya contact page se likhein.'
              )}
            </p>
            <div className="flex items-center gap-3">
              <Link
                to="/contact/"
                className="text-brand-deep font-semibold underline hover:text-brand-gold-dark"
              >
                {loc('Contact Page →', 'संपर्क पृष्ठ →', 'Contact Page →')}
              </Link>
              <Link
                to="/disclaimer/"
                className="text-brand-deep font-semibold underline hover:text-brand-gold-dark"
              >
                {loc('Cultural Disclaimer →', 'अस्वीकरण देखें →', 'Disclaimer →')}
              </Link>
            </div>
          </div>
        </div>

        {/* Platform Snapshot */}
        <div className="rounded-3xl bg-white border border-brand-gold/30 p-8 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-gold/20 pb-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-deep">
                {loc(
                  'What Is Live on FestiveWala Today',
                  'फेस्टिववाला पर वर्तमान सुविधाएं',
                  'FestiveWala Par Kya Available Hai'
                )}
              </h2>
              <p className="text-xs sm:text-sm text-brand-dark/65 font-sans mt-1">
                {loc(
                  'Verified content library built for families in India and the global diaspora',
                  'भारत व विश्व भर के परिवारों के लिए प्रमाणित सामग्री संग्रह',
                  'India aur global families ke liye curated festival resource library'
                )}
              </p>
            </div>
            <Link
              to="/greeting-cards/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-deep text-[#FAF7F0] text-xs font-semibold hover:bg-brand-deep/90 transition-all shadow-sm"
            >
              <Award size={15} className="text-[#F2D98B]" />
              <span>
                {loc('Open Greeting Studio', 'ग्रीटिंग स्टूडियो खोलें', 'Greeting Studio Kholein')}
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-brand-gold/20">
              <p className="font-serif text-2xl font-bold text-brand-deep">1,300</p>
              <p className="text-xs text-brand-dark/70 mt-1">
                {loc('Curated Wishes', 'संकलित शुभकामनाएं', 'Curated Wishes')}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-brand-gold/20">
              <p className="font-serif text-2xl font-bold text-brand-deep">184</p>
              <p className="text-xs text-brand-dark/70 mt-1">
                {loc('Card & Photo Templates', 'कार्ड व फोटो डिज़ाइन', 'Card Templates')}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-brand-gold/20">
              <p className="font-serif text-2xl font-bold text-brand-deep">7</p>
              <p className="text-xs text-brand-dark/70 mt-1">
                {loc('Festival Detail Hubs', 'प्रमुख त्योहार हब', 'Festival Hubs')}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-brand-gold/20">
              <p className="font-serif text-2xl font-bold text-brand-deep">14</p>
              <p className="text-xs text-brand-dark/70 mt-1">
                {loc('Cultural Guides', 'सांस्कृतिक गाइड', 'Cultural Guides')}
              </p>
            </div>
          </div>
        </div>

        {/* Direct Founder Contact & Feedback */}
        <div className="p-6 sm:p-8 rounded-2xl bg-brand-ivory border border-brand-gold/30 text-center max-w-2xl mx-auto space-y-3">
          <div className="w-10 h-10 mx-auto rounded-full bg-brand-deep/10 text-brand-deep flex items-center justify-center">
            <Mail size={18} />
          </div>
          <h3 className="font-serif text-lg font-bold text-brand-deep">
            {loc(
              'Direct Contact & Feedback',
              'सीधा संपर्क व सुझाव',
              'Direct Contact & Feedback'
            )}
          </h3>
          <p className="text-xs sm:text-sm text-brand-dark/75 font-sans leading-relaxed">
            {loc(
              'For corrections, privacy questions, or suggestions about FestiveWala, email Shailendra Pathak directly at ',
              'सामग्री सुधार, गोपनीयता प्रश्न या किसी सुझाव के लिए सीधे शैलेंद्र पाठक को ईमेल करें: ',
              'Kisi correction, privacy question ya feedback ke liye Shailendra Pathak ko direct email karein: '
            )}
            <a
              href="mailto:Pandit979212@gmail.com"
              className="font-semibold text-brand-deep underline hover:text-brand-gold-dark"
            >
              Pandit979212@gmail.com
            </a>
            {isHindi ? '।' : '.'}
          </p>
          <div className="pt-1 flex items-center justify-center gap-2 text-xs text-brand-dark/60">
            <Compass size={13} className="text-brand-gold-dark" />
            <Link to="/festivals/" className="hover:underline text-brand-deep font-medium">
              {loc('Explore Festivals Hub', 'त्योहार हब देखें', 'Festivals Hub Dekhein')}
            </Link>
            <span>•</span>
            <Link to="/wishes/" className="hover:underline text-brand-deep font-medium">
              {loc('Browse Wishes Hub', 'शुभकामनाएं हब', 'Wishes Hub')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
