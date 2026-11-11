import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import {
  ChevronDown,
  Sparkles,
  Camera,
  Flame,
  Wand2,
  MessageSquareHeart,
  Cake,
  Heart,
  Smile,
  Sun,
  Moon,
  Calendar,
  Palette,
  Gift,
  BookOpen,
  Compass,
  Quote,
  Lightbulb,
  Info,
  Mail,
  ShieldCheck,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface DropdownItem {
  key: string;
  path: string;
  labelEn: string;
  labelHi: string;
  labelHinglish: string;
  descEn?: string;
  descHi?: string;
  descHinglish?: string;
  icon: React.ReactNode;
  badge?: string;
}

interface NavGroup {
  key: string;
  labelEn: string;
  labelHi: string;
  labelHinglish: string;
  path?: string; // If direct link
  items?: DropdownItem[];
  isActive: (pathname: string, hash: string, search: string) => boolean;
}

export const DesktopNavigation: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { loc } = useLanguage();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [prevLocationKey, setPrevLocationKey] = useState(location.key);
  if (location.key !== prevLocationKey) {
    setPrevLocationKey(location.key);
    setOpenDropdown(null);
  }

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // Click outside listener to dismiss open dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Escape key listener to close open dropdown
  useEffect(() => {
    if (!openDropdown) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openDropdown]);

  const handleMouseEnter = (key: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  const navGroups: NavGroup[] = [
    {
      key: 'home',
      labelEn: 'Home',
      labelHi: 'होम',
      labelHinglish: 'Home',
      path: '/',
      isActive: (pathname, hash) => pathname === '/' && !hash,
    },
    {
      key: 'create',
      labelEn: 'Create',
      labelHi: 'रचें',
      labelHinglish: 'Create',
      isActive: (pathname) =>
        pathname.startsWith('/greeting-cards') ||
        pathname.startsWith('/greeting-studio') ||
        pathname.startsWith('/greetings') ||
        pathname.startsWith('/photo-greetings'),
      items: [
        {
          key: 'greeting-cards',
          path: '/greeting-cards',
          labelEn: 'Greeting Cards',
          labelHi: 'ग्रीटिंग कार्ड्स',
          labelHinglish: 'Greeting Cards',
          descEn: '100+ luxury festive card templates',
          descHi: '१००+ सुंदर व उत्सव कार्ड टेम्पलेट्स',
          descHinglish: '100+ festive cards with photo & name',
          icon: <Sparkles className="w-4 h-4 text-brand-gold" />,
        },
        {
          key: 'photo-greetings',
          path: '/greeting-cards?mode=photo',
          labelEn: 'Photo Greetings',
          labelHi: 'फोटो ग्रीटिंग्स',
          labelHinglish: 'Photo Greetings',
          descEn: 'Private on-device photo frames',
          descHi: 'अपनी फोटो के साथ सुंदर कार्ड बनाएं',
          descHinglish: 'Frame personal photos 100% privately',
          icon: <Camera className="w-4 h-4 text-emerald-400" />,
        },
        {
          key: 'festival-greetings',
          path: '/greetings/diwali',
          labelEn: 'Festival Greetings',
          labelHi: 'त्योहार ग्रीटिंग्स',
          labelHinglish: 'Festival Greetings',
          descEn: 'Diwali, Dhanteras, Holi & New Year cards',
          descHi: 'दीपावली, धनतेरस, होली व नववर्ष कार्ड्स',
          descHinglish: 'All traditional Indian festival themes',
          icon: <Flame className="w-4 h-4 text-amber-400" />,
        },
        {
          key: 'creative-studio',
          path: '/greeting-studio',
          labelEn: 'Creative Studio',
          labelHi: 'क्रिएटिव स्टूडियो',
          labelHinglish: 'Creative Studio',
          descEn: 'Full canvas custom card designer',
          descHi: 'मनचाहे डिजाइन्स के लिए पूरा कैनवास एडिटर',
          descHinglish: 'Custom canvas with motifs & colors',
          icon: <Wand2 className="w-4 h-4 text-purple-300" />,
        },
      ],
    },
    {
      key: 'wishes',
      labelEn: 'Wishes',
      labelHi: 'शुभकामनाएं',
      labelHinglish: 'Wishes',
      isActive: (pathname) => pathname.startsWith('/wishes'),
      items: [
        {
          key: 'wishes-hub',
          path: '/wishes',
          labelEn: 'Wishes Hub',
          labelHi: 'शुभकामना संग्रह',
          labelHinglish: 'Wishes Hub',
          descEn: '1,200+ curated quotes in Hindi & English',
          descHi: '१२००+ पावन संदेश, सुभाषित व शायरी',
          descHinglish: '1,200+ heartfelt festival & occasion wishes',
          icon: <MessageSquareHeart className="w-4 h-4 text-rose-400" />,
        },
        {
          key: 'birthday-wishes',
          path: '/wishes?category=birthday',
          labelEn: 'Birthday Wishes',
          labelHi: 'जन्मदिन की शुभकामनाएं',
          labelHinglish: 'Birthday Wishes',
          descEn: '100 heartfelt blessings for family & friends',
          descHi: 'दीर्घायु व मंगलमय जीवन की शुभकामनाएं',
          descHinglish: '100 warm blessings for loved ones',
          icon: <Cake className="w-4 h-4 text-amber-300" />,
        },
        {
          key: 'anniversary-wishes',
          path: '/wishes?category=anniversary',
          labelEn: 'Anniversary Wishes',
          labelHi: 'विवाह वर्षगांठ संदेश',
          labelHinglish: 'Anniversary Wishes',
          descEn: '100 romantic & auspicious wedding anniversary quotes',
          descHi: 'दांपत्य प्रेम व सुखद वैवाहिक जीवन की बधाई',
          descHinglish: 'Celebrate love and lifelong togetherness',
          icon: <Heart className="w-4 h-4 text-pink-400" />,
        },
        {
          key: 'love-messages',
          path: '/wishes?category=love',
          labelEn: 'Love Messages',
          labelHi: 'प्रेम संदेश',
          labelHinglish: 'Love Messages',
          descEn: '100 heartfelt romantic notes for spouse & partner',
          descHi: 'जीवनसाथी व प्रियतम के लिए आत्मीय प्रेम संदेश',
          descHinglish: 'Romantic expressions for your partner',
          icon: <Heart className="w-4 h-4 text-rose-500" />,
        },
        {
          key: 'friendship-messages',
          path: '/wishes?category=friendship',
          labelEn: 'Friendship Messages',
          labelHi: 'मित्रता संदेश',
          labelHinglish: 'Friendship Messages',
          descEn: '100 meaningful words for best friends & buddies',
          descHi: 'सच्चे मित्रों व जिगरी दोस्तों के लिए अनमोल संदेश',
          descHinglish: 'Meaningful words for best friends',
          icon: <Smile className="w-4 h-4 text-sky-400" />,
        },
        {
          key: 'good-morning-wishes',
          path: '/wishes?category=good-morning',
          labelEn: 'Good Morning Wishes',
          labelHi: 'सुप्रभात संदेश',
          labelHinglish: 'Good Morning Wishes',
          descEn: '100 positive morning blessings & thoughts',
          descHi: 'सकारात्मक शुरुआत व मंगलमय दिन के संदेश',
          descHinglish: '100 inspiring morning thoughts',
          icon: <Sun className="w-4 h-4 text-yellow-300" />,
        },
        {
          key: 'good-night-wishes',
          path: '/wishes?category=good-night',
          labelEn: 'Good Night Wishes',
          labelHi: 'शुभ रात्रि संदेश',
          labelHinglish: 'Good Night Wishes',
          descEn: '100 peaceful bedtime blessings & sweet dreams',
          descHi: 'सुकून भरी नींद व मंगलमय रात्रि के संदेश',
          descHinglish: 'Peaceful bedtime blessings',
          icon: <Moon className="w-4 h-4 text-indigo-300" />,
        },
        {
          key: 'festival-wishes',
          path: '/wishes?category=festival',
          labelEn: 'Festival Wishes',
          labelHi: 'त्योहार विशेष संदेश',
          labelHinglish: 'Festival Wishes',
          descEn: '600 traditional Sanskrit shlokas & Hindi greetings',
          descHi: 'वैदिक श्लोक व पारंपरिक उत्सव शुभकामनाएं',
          descHinglish: '600 traditional festive greetings',
          icon: <Flame className="w-4 h-4 text-amber-400" />,
        },
      ],
    },
    {
      key: 'explore',
      labelEn: 'Explore',
      labelHi: 'खोजें',
      labelHinglish: 'Explore',
      isActive: (pathname) =>
        pathname.startsWith('/festivals') ||
        pathname.startsWith('/rangoli') ||
        pathname.startsWith('/decoration-ideas') ||
        pathname.startsWith('/gift-ideas') ||
        pathname.startsWith('/festival-guides') ||
        pathname.startsWith('/inspiration'),
      items: [
        {
          key: 'festivals',
          path: '/festivals',
          labelEn: 'Festivals',
          labelHi: 'त्योहार कैलेंडर',
          labelHinglish: 'Festivals',
          descEn: 'Year-round Indian celebration guide',
          descHi: 'सभी भारतीय पर्वों की तिथियां व विवरण',
          descHinglish: 'Comprehensive festive calendar',
          icon: <Calendar className="w-4 h-4 text-sky-400" />,
        },
        {
          key: 'rangoli',
          path: '/rangoli',
          labelEn: 'Rangoli Designs',
          labelHi: 'रंगोली कला',
          labelHinglish: 'Rangoli Designs',
          descEn: '60+ traditional & floral patterns',
          descHi: '६०+ चरणबद्ध आसान व सुंदर रंगोली',
          descHinglish: 'Step-by-step rangoli patterns',
          icon: <Palette className="w-4 h-4 text-amber-400" />,
        },
        {
          key: 'decorations',
          path: '/decoration-ideas',
          labelEn: 'Decoration Ideas',
          labelHi: 'सजावट आइडियाज',
          labelHinglish: 'Decoration Ideas',
          descEn: 'Eco diyas, torans & festive lighting',
          descHi: 'दीये, तोरण व घर की सुरुचिपूर्ण सज्जा',
          descHinglish: 'Eco diyas, torans & home decor',
          icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
        },
        {
          key: 'gifts',
          path: '/gift-ideas',
          labelEn: 'Gift Ideas',
          labelHi: 'उपहार सुझाव',
          labelHinglish: 'Gift Ideas',
          descEn: '5 price tiers & 10 relationship categories',
          descHi: '१० रिश्तों व ५ बजट श्रेणियों के अनुसार गिफ्ट्स',
          descHinglish: 'Thoughtful festive gifts for everyone',
          icon: <Gift className="w-4 h-4 text-rose-400" />,
        },
        {
          key: 'guides',
          path: '/festival-guides',
          labelEn: 'Festival Guides',
          labelHi: 'त्योहार गाइड्स',
          labelHinglish: 'Festival Guides',
          descEn: 'Puja vidhis, auspicious muhurats & lore',
          descHi: 'पूजा विधि, शुभ मुहूर्त व पौराणिक कथाएं',
          descHinglish: 'Authentic rituals & cultural guides',
          icon: <BookOpen className="w-4 h-4 text-teal-400" />,
        },
        {
          key: 'inspiration',
          path: '/inspiration',
          labelEn: 'Inspiration Hub',
          labelHi: 'प्रेरणा संगम',
          labelHinglish: 'Inspiration Hub',
          descEn: 'Cultural heritage & celebratory wisdom',
          descHi: 'सांस्कृतिक परंपराओं व विचारों का संगम',
          descHinglish: 'Artisan wisdom & cultural essays',
          icon: <Compass className="w-4 h-4 text-brand-gold" />,
        },
      ],
    },
    {
      key: 'daily',
      labelEn: 'Daily',
      labelHi: 'दैनिक',
      labelHinglish: 'Daily',
      isActive: (_pathname, hash) =>
        hash === '#quote-of-the-day' ||
        hash === '#thought-of-the-day' ||
        hash === '#todays-inspiration',
      items: [
        {
          key: 'quote-of-the-day',
          path: '/#quote-of-the-day',
          labelEn: 'Quote of the Day',
          labelHi: 'आज का सुविचार',
          labelHinglish: 'Quote of the Day',
          descEn: 'Daily cultural wisdom & Sanskrit quotes',
          descHi: 'दैनिक पावन सुभाषित व प्रेरक विचार',
          descHinglish: 'Daily cultural wisdom & quotes',
          icon: <Quote className="w-4 h-4 text-brand-gold" />,
        },
        {
          key: 'thought-of-the-day',
          path: '/#thought-of-the-day',
          labelEn: 'Thought of the Day',
          labelHi: 'आज का चिंतन',
          labelHinglish: 'Thought of the Day',
          descEn: 'Mindful reflections on celebration & values',
          descHi: 'उत्सव दर्शन व आत्मीय जीवन चिंतन',
          descHinglish: 'Mindful reflections on celebrations',
          icon: <Lightbulb className="w-4 h-4 text-amber-300" />,
        },
      ],
    },
    {
      key: 'more',
      labelEn: 'More',
      labelHi: 'अधिक',
      labelHinglish: 'More',
      isActive: (pathname) =>
        pathname === '/about' ||
        pathname === '/contact' ||
        pathname === '/privacy-policy' ||
        pathname === '/terms-of-service' ||
        pathname === '/disclaimer',
      items: [
        {
          key: 'about',
          path: '/about',
          labelEn: 'About FestiveWala',
          labelHi: 'फेस्टिववाला के बारे में',
          labelHinglish: 'About FestiveWala',
          descEn: 'Our mission, heritage philosophy & team',
          descHi: 'हमारा उद्देश्य, परंपरा व सांस्कृतिक दर्शन',
          descHinglish: 'Our cultural mission & dedication',
          icon: <Info className="w-4 h-4 text-brand-gold" />,
        },
        {
          key: 'contact',
          path: '/contact',
          labelEn: 'Contact Us',
          labelHi: 'संपर्क करें',
          labelHinglish: 'Contact Us',
          descEn: 'Direct inquiries, suggestions & feedback',
          descHi: 'हमसे संपर्क करें व सुझाव साझा करें',
          descHinglish: 'Reach out to our platform team',
          icon: <Mail className="w-4 h-4 text-emerald-400" />,
        },
        {
          key: 'privacy-policy',
          path: '/privacy-policy',
          labelEn: 'Privacy Policy',
          labelHi: 'गोपनीयता नीति',
          labelHinglish: 'Privacy Policy',
          descEn: '100% on-device client-side privacy',
          descHi: 'फोटो व डेटा की पूर्ण सुरक्षा नीति',
          descHinglish: 'Private, on-device image processing',
          icon: <ShieldCheck className="w-4 h-4 text-sky-400" />,
        },
        {
          key: 'terms-of-service',
          path: '/terms-of-service',
          labelEn: 'Terms of Service',
          labelHi: 'सेवा की शर्तें',
          labelHinglish: 'Terms of Service',
          descEn: 'Platform fair use guidelines',
          descHi: 'मंच के उपयोग के नियम व शर्तें',
          descHinglish: 'Platform usage terms & conditions',
          icon: <FileText className="w-4 h-4 text-amber-300" />,
        },
        {
          key: 'disclaimer',
          path: '/disclaimer',
          labelEn: 'Disclaimer',
          labelHi: 'अस्वीकरण',
          labelHinglish: 'Disclaimer',
          descEn: 'Content & cultural informational notices',
          descHi: 'सांस्कृतिक सामग्री व सूचनात्मक विवरण',
          descHinglish: 'Information & content transparency',
          icon: <AlertCircle className="w-4 h-4 text-rose-400" />,
        },
      ],
    },
  ];

  return (
    <nav
      ref={navRef}
      className={`hidden xl:flex items-center space-x-1 ${className}`}
      aria-label="Main Navigation"
    >
      {navGroups.map((group) => {
        const isCurrentActive = group.isActive(
          location.pathname,
          location.hash,
          location.search
        );
        const isOpen = openDropdown === group.key;

        // If direct link (e.g. Home)
        if (group.path && !group.items) {
          return (
            <NavLink
              key={group.key}
              to={group.path}
              end
              className={({ isActive }) =>
                `relative px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors duration-200 rounded-lg group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${
                  isActive
                    ? 'text-brand-deep font-bold bg-brand-gold/15'
                    : 'text-brand-dark/80 hover:text-brand-deep hover:bg-brand-light/60'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10 tracking-wide">
                    {loc(group.labelEn, group.labelHi, group.labelHinglish)}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0.5 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-brand-gold via-brand-champagne to-brand-gold rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        }

        // Group with Dropdown
        return (
          <div
            key={group.key}
            className="relative"
            onMouseEnter={() => handleMouseEnter(group.key)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              data-nav-group={group.key}
              onClick={() => setOpenDropdown(isOpen ? null : group.key)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setOpenDropdown(null);
              }}
              aria-expanded={isOpen}
              aria-haspopup="true"
              className={`relative px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors duration-200 rounded-lg inline-flex items-center gap-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold cursor-pointer ${
                isCurrentActive || isOpen
                  ? 'text-brand-deep font-bold bg-brand-gold/15'
                  : 'text-brand-dark/80 hover:text-brand-deep hover:bg-brand-light/60'
              }`}
            >
              <span className="tracking-wide">
                {loc(group.labelEn, group.labelHi, group.labelHinglish)}
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 text-brand-gold/80 ${
                  isOpen ? 'rotate-180 text-brand-gold' : 'group-hover:translate-y-0.5'
                }`}
              />

              {isCurrentActive && (
                <div
                  className="absolute bottom-0.5 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-brand-gold via-brand-champagne to-brand-gold rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>

            {/* Dropdown Menu (Always in DOM for crawlers & accessibility; smoothly animated via CSS) */}
            {group.items && (
              <div
                data-dropdown={group.key}
                className={`absolute top-full left-0 mt-1.5 z-50 bg-[#24113D] text-[#FAF7F0] border border-[#F2D98B]/35 shadow-[0_12px_40px_rgba(0,0,0,0.45)] rounded-2xl p-2 min-w-[280px] sm:min-w-[320px] backdrop-blur-xl transition-all duration-200 ${
                  isOpen
                    ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                    : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                }`}
                role="menu"
                aria-label={loc(group.labelEn, group.labelHi, group.labelHinglish)}
                aria-hidden={!isOpen}
              >
                {/* Subtle Top Gold Highlight */}
                <div
                  className="absolute -top-1.5 left-6 w-3 h-3 bg-[#24113D] border-t border-l border-[#F2D98B]/35 transform rotate-45 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="flex flex-col space-y-1">
                  {group.items.map((item) => {
                    const isItemActive =
                      item.path.startsWith('/#')
                        ? location.hash === item.path.substring(1)
                        : item.path.includes('?')
                        ? `${location.pathname}${location.search}` === item.path
                        : location.pathname === item.path;

                    return (
                      <Link
                        key={item.key}
                        to={item.path}
                        role="menuitem"
                        onClick={() => setOpenDropdown(null)}
                        className={`group/item flex items-center justify-between p-2.5 rounded-xl transition-all duration-150 ${
                          isItemActive
                            ? 'bg-brand-royal text-[#F2D98B] font-bold border border-brand-gold/30'
                            : 'text-[#FAF7F0]/90 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-black/30 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 group-hover/item:border-brand-gold/50 transition-all">
                            {item.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="font-serif text-xs sm:text-sm font-semibold tracking-wide truncate group-hover/item:text-[#F2D98B] transition-colors">
                              {loc(item.labelEn, item.labelHi, item.labelHinglish)}
                            </div>
                            {item.descEn && (
                              <div className="text-[10.5px] text-[#FAF7F0]/60 truncate group-hover/item:text-[#FAF7F0]/80">
                                {loc(item.descEn, item.descHi, item.descHinglish)}
                              </div>
                            )}
                          </div>
                        </div>

                        {isItemActive && (
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-gold-glow flex-shrink-0 ml-2"
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};
