import React, { useState } from 'react';
import { NavLink, useLocation, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import {
  Home,
  Compass,
  Sparkles,
  MessageSquareHeart,
  Grid,
  X,
  Palette,
  Gift,
  BookOpen,
  Globe,
  ChevronRight,
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { loc, language, setLanguage } = useLanguage();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Hide bottom bar when user is actively in full canvas editor mode to prevent layout clutter
  const isStudioEditor =
    location.pathname.startsWith('/greeting-cards') && searchParams.get('edit') === 'true';

  if (isStudioEditor) {
    return null;
  }

  const MORE_ITEMS = [
    {
      titleEn: 'Rangoli Gallery',
      titleHi: 'रंगोली गैलरी',
      titleHinglish: 'Rangoli Gallery',
      descEn: '60+ step-by-step sacred floor art patterns',
      descHi: '६०+ सुंदर व आसान रंगोली डिजाइन्स',
      descHinglish: '60+ traditional aur floral rangoli designs',
      path: '/rangoli',
      icon: <Palette className="w-5 h-5 text-amber-400" />,
    },
    {
      titleEn: 'Decoration Ideas',
      titleHi: 'सजावट आइडियाज',
      titleHinglish: 'Decor Ideas',
      descEn: 'Eco diyas, fairy lights & festive home styling',
      descHi: 'दीये, तोरण और घर की खूबसूरत सजावट',
      descHinglish: 'Diya, lightings aur home decoration tips',
      path: '/decoration-ideas',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
    },
    {
      titleEn: 'Gift Ideas',
      titleHi: 'उपहार के विचार',
      titleHinglish: 'Gift Ideas',
      descEn: 'Thoughtful traditional & gourmet gifting guides',
      descHi: 'पारंपरिक व आधुनिक उपहारों की सूची',
      descHinglish: 'Sweets, hampers aur personalized gifting ideas',
      path: '/gift-ideas',
      icon: <Gift className="w-5 h-5 text-rose-400" />,
    },
    {
      titleEn: 'Festival Guides',
      titleHi: 'त्योहार गाइड्स',
      titleHinglish: 'Festival Guides',
      descEn: 'Puja vidhi, auspicious muhurat & cultural stories',
      descHi: 'पूजा विधि, शुभ मुहूर्त और पौराणिक कथाएं',
      descHinglish: 'Puja vidhi, shubh muhurat aur festival stories',
      path: '/festival-guides',
      icon: <BookOpen className="w-5 h-5 text-sky-400" />,
    },
  ];

  return (
    <>
      {/* 1. Sticky Mobile Bottom Navigation Bar (Visible only on mobile: md:hidden) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#24113D]/95 backdrop-blur-xl border-t border-[#F2D98B]/30 shadow-[0_-4px_25px_rgba(0,0,0,0.35)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="flex items-center justify-around px-2 pt-1.5 pb-2">
          {/* Item 1: Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[56px] py-1 px-1 rounded-xl transition-all ${
                isActive
                  ? 'text-[#F2D98B] font-bold'
                  : 'text-[#FAF7F0]/65 hover:text-[#FAF7F0]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Home className={`w-5 h-5 ${isActive ? 'text-[#F2D98B]' : 'text-current'}`} />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#F2D98B]" />
                  )}
                </div>
                <span className="text-[10px] mt-1 tracking-tight">
                  {loc('Home', 'होम', 'Home')}
                </span>
              </>
            )}
          </NavLink>

          {/* Item 2: Festivals */}
          <NavLink
            to="/festivals"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[56px] py-1 px-1 rounded-xl transition-all ${
                isActive
                  ? 'text-[#F2D98B] font-bold'
                  : 'text-[#FAF7F0]/65 hover:text-[#FAF7F0]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Compass className={`w-5 h-5 ${isActive ? 'text-[#F2D98B]' : 'text-current'}`} />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#F2D98B]" />
                  )}
                </div>
                <span className="text-[10px] mt-1 tracking-tight">
                  {loc('Festivals', 'त्योहार', 'Festivals')}
                </span>
              </>
            )}
          </NavLink>

          {/* Item 3: Create (Raised Prominent Center Gold Action Button) */}
          <Link
            to="/greeting-cards"
            aria-label="Create Greeting Card"
            className="flex flex-col items-center justify-center -mt-5 min-w-[62px] group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#F2D98B] via-[#D4AF37] to-[#FFF0B3] text-[#24113D] shadow-lg shadow-amber-500/30 flex items-center justify-center border-2 border-[#24113D] group-active:scale-95 transition-transform">
              <Sparkles className="w-6 h-6 text-[#24113D]" />
            </div>
            <span className="text-[10.5px] font-bold text-[#F2D98B] mt-0.5 tracking-tight">
              {loc('Create', 'बनाएं', 'Create')}
            </span>
          </Link>

          {/* Item 4: Wishes */}
          <NavLink
            to="/wishes"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[56px] py-1 px-1 rounded-xl transition-all ${
                isActive
                  ? 'text-[#F2D98B] font-bold'
                  : 'text-[#FAF7F0]/65 hover:text-[#FAF7F0]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <MessageSquareHeart
                    className={`w-5 h-5 ${isActive ? 'text-[#F2D98B]' : 'text-current'}`}
                  />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#F2D98B]" />
                  )}
                </div>
                <span className="text-[10px] mt-1 tracking-tight">
                  {loc('Wishes', 'संदेश', 'Wishes')}
                </span>
              </>
            )}
          </NavLink>

          {/* Item 5: More (Drawer Sheet Trigger) */}
          <button
            type="button"
            onClick={() => setIsMoreOpen(true)}
            aria-expanded={isMoreOpen}
            className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-1 rounded-xl transition-all cursor-pointer ${
              isMoreOpen
                ? 'text-[#F2D98B] font-bold'
                : 'text-[#FAF7F0]/65 hover:text-[#FAF7F0]'
            }`}
          >
            <div className="relative">
              <Grid className="w-5 h-5 text-current" />
              {isMoreOpen && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#F2D98B]" />
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight">
              {loc('More', 'अधिक', 'More')}
            </span>
          </button>
        </div>
      </nav>

      {/* 2. "More" Secondary Experiences Bottom Sheet Drawer */}
      <AnimatePresence>
        {isMoreOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMoreOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Bottom Sheet Card */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full rounded-t-3xl bg-[#1C0B30] border-t-2 border-[#F2D98B]/40 p-5 pb-8 shadow-2xl text-[#FAF7F0] space-y-4 max-h-[85vh] overflow-y-auto"
            >
              {/* Drawer Handle & Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#24113D] border border-brand-gold/30 flex items-center justify-center">
                    <Grid className="w-4 h-4 text-[#F2D98B]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#F2D98B]">
                      {loc('More Celebrations', 'अन्य उत्सव अनुभव', 'More Experiences')}
                    </h3>
                    <p className="text-[11px] text-[#FAF7F0]/65">
                      {loc('Rangoli, decor, gifts & guides', 'रंगोली, सजावट, गिफ्ट्स व गाइड्स', 'Rangoli, decor, gifts & guides')}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMoreOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 text-[#FAF7F0] flex items-center justify-center hover:bg-white/20 active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Grid of Secondary Experiences */}
              <div className="grid grid-cols-1 gap-2.5">
                {MORE_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMoreOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#250F3E] border border-white/10 hover:border-[#F2D98B]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#FAF7F0]">
                          {loc(item.titleEn, item.titleHi, item.titleHinglish)}
                        </h4>
                        <p className="text-[11px] text-[#FAF7F0]/65">
                          {loc(item.descEn, item.descHi, item.descHinglish)}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#F2D98B] opacity-70" />
                  </Link>
                ))}
              </div>

              {/* Quick Language Switcher Inside More Drawer */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#FAF7F0]/70 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#F2D98B]" />
                  <span>{loc('Language', 'भाषा', 'Language')}:</span>
                </span>
                <div className="flex items-center gap-1 bg-[#120520] p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      language === 'en'
                        ? 'bg-[#F2D98B] text-[#24113D] font-bold'
                        : 'text-[#FAF7F0]/70 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('hi')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      language === 'hi'
                        ? 'bg-[#F2D98B] text-[#24113D] font-bold'
                        : 'text-[#FAF7F0]/70 hover:text-white'
                    }`}
                  >
                    हिन्दी
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('hinglish')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      language === 'hinglish'
                        ? 'bg-[#F2D98B] text-[#24113D] font-bold'
                        : 'text-[#FAF7F0]/70 hover:text-white'
                    }`}
                  >
                    Hinglish
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
