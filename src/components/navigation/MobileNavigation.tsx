import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { PrimaryButton } from '../common/PrimaryButton';
import { BrandLogo } from '../common/BrandLogo';
import {
  X,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Home,
  MessageSquareHeart,
  Compass,
  Quote,
  Lightbulb,
  Camera,
  Flame,
  Wand2,
  Cake,
  Heart,
  Smile,
  Sun,
  Moon,
  Calendar,
  Palette,
  Gift,
  BookOpen,
  Info,
  Mail,
  ShieldCheck,
  FileText,
  AlertCircle,
  MoreHorizontal,
} from 'lucide-react';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DrawerSubItem {
  key: string;
  path: string;
  labelEn: string;
  labelHi: string;
  labelHinglish: string;
  icon: React.ReactNode;
}

interface DrawerCategory {
  key: string;
  labelEn: string;
  labelHi: string;
  labelHinglish: string;
  icon: React.ReactNode;
  path?: string; // Direct link
  items?: DrawerSubItem[];
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const { loc, t, isHindi } = useLanguage();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    create: true, // Default Create open for high engagement
    wishes: false,
    explore: false,
    daily: false,
    more: false,
  });

  // 1. Lock background scrolling while open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // 2. Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleCategory = (key: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const primaryCategories = [
    { key: 'home', path: '/', labelEn: 'Home', labelHi: 'होम', labelHinglish: 'Home', icon: <Home className="w-4 h-4 text-brand-gold" /> },
    { key: 'cards', path: '/greeting-cards/', labelEn: 'Cards', labelHi: 'कार्ड्स', labelHinglish: 'Cards', icon: <Sparkles className="w-4 h-4 text-brand-gold" /> },
    { key: 'wishes', path: '/wishes/', labelEn: 'Wishes', labelHi: 'संदेश', labelHinglish: 'Wishes', icon: <MessageSquareHeart className="w-4 h-4 text-rose-400" /> },
    { key: 'festivals', path: '/festivals/', labelEn: 'Festivals', labelHi: 'त्योहार', labelHinglish: 'Festivals', icon: <Calendar className="w-4 h-4 text-sky-400" /> },
    { key: 'rangoli', path: '/rangoli/', labelEn: 'Rangoli', labelHi: 'रंगोली', labelHinglish: 'Rangoli', icon: <Palette className="w-4 h-4 text-amber-400" /> },
    { key: 'decorations', path: '/decoration-ideas/', labelEn: 'Decor', labelHi: 'सजावट', labelHinglish: 'Decor', icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
    { key: 'gifts', path: '/gift-ideas/', labelEn: 'Gifts', labelHi: 'गिफ्ट्स', labelHinglish: 'Gifts', icon: <Gift className="w-4 h-4 text-rose-400" /> },
    { key: 'guides', path: '/festival-guides/', labelEn: 'Guides', labelHi: 'गाइड्स', labelHinglish: 'Guides', icon: <BookOpen className="w-4 h-4 text-teal-400" /> },
    { key: 'inspiration', path: '/inspiration/', labelEn: 'Inspiration', labelHi: 'प्रेरणा', labelHinglish: 'Inspiration', icon: <Compass className="w-4 h-4 text-brand-gold" /> },
  ];

  const categories: DrawerCategory[] = [
    {
      key: 'home',
      labelEn: 'Home',
      labelHi: 'होम',
      labelHinglish: 'Home',
      icon: <Home className="w-5 h-5 text-brand-gold" />,
      path: '/',
    },
    {
      key: 'create',
      labelEn: 'Create & Design',
      labelHi: 'रचना व कार्ड निर्माण',
      labelHinglish: 'Create & Design',
      icon: <Sparkles className="w-5 h-5 text-brand-gold" />,
      items: [
        {
          key: 'greeting-cards',
          path: '/greeting-cards/',
          labelEn: 'Greeting Cards Maker',
          labelHi: 'ग्रीटिंग कार्ड्स मेकर',
          labelHinglish: 'Greeting Cards Maker',
          icon: <Sparkles className="w-4 h-4 text-brand-gold" />,
        },
        {
          key: 'photo-greetings',
          path: '/greeting-cards/?mode=photo',
          labelEn: 'Photo Greetings Studio',
          labelHi: 'फोटो ग्रीटिंग्स स्टूडियो',
          labelHinglish: 'Photo Greetings Studio',
          icon: <Camera className="w-4 h-4 text-emerald-400" />,
        },
        {
          key: 'festival-greetings',
          path: '/greetings/diwali/',
          labelEn: 'Festival Greeting Cards',
          labelHi: 'त्योहार ग्रीटिंग कार्ड्स',
          labelHinglish: 'Festival Greeting Cards',
          icon: <Flame className="w-4 h-4 text-amber-400" />,
        },
        {
          key: 'creative-studio',
          path: '/greeting-cards/',
          labelEn: 'Creative Canvas Studio',
          labelHi: 'क्रिएटिव कैनवास स्टूडियो',
          labelHinglish: 'Creative Canvas Studio',
          icon: <Wand2 className="w-4 h-4 text-purple-300" />,
        },
      ],
    },
    {
      key: 'wishes',
      labelEn: 'Wishes & Messages',
      labelHi: 'शुभकामनाएं व संदेश',
      labelHinglish: 'Wishes & Messages',
      icon: <MessageSquareHeart className="w-5 h-5 text-rose-400" />,
      items: [
        {
          key: 'wishes-hub',
          path: '/wishes/',
          labelEn: 'All Wishes Hub (1,300)',
          labelHi: 'शुभकामना संग्रह (१,३००)',
          labelHinglish: 'All Wishes Hub (1,300)',
          icon: <MessageSquareHeart className="w-4 h-4 text-rose-400" />,
        },
        {
          key: 'birthday-wishes',
          path: '/wishes/?category=birthday',
          labelEn: 'Birthday Blessings',
          labelHi: 'जन्मदिन की शुभकामनाएं',
          labelHinglish: 'Birthday Wishes',
          icon: <Cake className="w-4 h-4 text-amber-300" />,
        },
        {
          key: 'anniversary-wishes',
          path: '/wishes/?category=anniversary',
          labelEn: 'Anniversary Wishes',
          labelHi: 'विवाह वर्षगांठ बधाई',
          labelHinglish: 'Anniversary Wishes',
          icon: <Heart className="w-4 h-4 text-pink-400" />,
        },
        {
          key: 'love-messages',
          path: '/wishes/?category=love',
          labelEn: 'Love Messages',
          labelHi: 'प्रेम संदेश',
          labelHinglish: 'Love Messages',
          icon: <Heart className="w-4 h-4 text-rose-500" />,
        },
        {
          key: 'friendship-messages',
          path: '/wishes/?category=friendship',
          labelEn: 'Friendship Messages',
          labelHi: 'मित्रता संदेश',
          labelHinglish: 'Friendship Messages',
          icon: <Smile className="w-4 h-4 text-sky-400" />,
        },
        {
          key: 'good-morning-wishes',
          path: '/wishes/?category=good-morning',
          labelEn: 'Good Morning Wishes',
          labelHi: 'सुप्रभात संदेश',
          labelHinglish: 'Good Morning Wishes',
          icon: <Sun className="w-4 h-4 text-yellow-300" />,
        },
        {
          key: 'good-night-wishes',
          path: '/wishes/?category=good-night',
          labelEn: 'Good Night Wishes',
          labelHi: 'शुभ रात्रि संदेश',
          labelHinglish: 'Good Night Wishes',
          icon: <Moon className="w-4 h-4 text-indigo-300" />,
        },
        {
          key: 'festival-wishes',
          path: '/wishes/?category=festival',
          labelEn: 'Festival Greetings',
          labelHi: 'त्योहार विशेष संदेश',
          labelHinglish: 'Festival Wishes',
          icon: <Flame className="w-4 h-4 text-amber-400" />,
        },
      ],
    },
    {
      key: 'explore',
      labelEn: 'Explore & Discover',
      labelHi: 'उत्सव व प्रेरणा खोजें',
      labelHinglish: 'Explore & Discover',
      icon: <Compass className="w-5 h-5 text-sky-400" />,
      items: [
        {
          key: 'festivals',
          path: '/festivals/',
          labelEn: 'Festival Calendar',
          labelHi: 'त्योहार कैलेंडर',
          labelHinglish: 'Festival Calendar',
          icon: <Calendar className="w-4 h-4 text-sky-400" />,
        },
        {
          key: 'rangoli',
          path: '/rangoli/',
          labelEn: 'Rangoli Gallery',
          labelHi: 'रंगोली कला गैलरी',
          labelHinglish: 'Rangoli Gallery',
          icon: <Palette className="w-4 h-4 text-amber-400" />,
        },
        {
          key: 'decorations',
          path: '/decoration-ideas/',
          labelEn: 'Decoration Ideas',
          labelHi: 'गृह सज्जा आइडियाज',
          labelHinglish: 'Decoration Ideas',
          icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
        },
        {
          key: 'gifts',
          path: '/gift-ideas/',
          labelEn: 'Gift Recommendations',
          labelHi: 'उपहार सुझाव व गाइड्स',
          labelHinglish: 'Gift Ideas',
          icon: <Gift className="w-4 h-4 text-rose-400" />,
        },
        {
          key: 'guides',
          path: '/festival-guides/',
          labelEn: 'Cultural Festival Guides',
          labelHi: 'सांस्कृतिक त्योहार गाइड्स',
          labelHinglish: 'Festival Guides',
          icon: <BookOpen className="w-4 h-4 text-teal-400" />,
        },
        {
          key: 'inspiration',
          path: '/inspiration/',
          labelEn: 'Creative Inspiration Hub',
          labelHi: 'सांस्कृतिक प्रेरणा संगम',
          labelHinglish: 'Inspiration Hub',
          icon: <Compass className="w-4 h-4 text-brand-gold" />,
        },
      ],
    },
    {
      key: 'daily',
      labelEn: 'Daily Wisdom',
      labelHi: 'दैनिक सुविचार',
      labelHinglish: 'Daily Wisdom',
      icon: <Quote className="w-5 h-5 text-amber-300" />,
      items: [
        {
          key: 'quote-of-the-day',
          path: '/#quote-of-the-day',
          labelEn: 'Quote of the Day',
          labelHi: 'आज का सुविचार',
          labelHinglish: 'Quote of the Day',
          icon: <Quote className="w-4 h-4 text-brand-gold" />,
        },
        {
          key: 'thought-of-the-day',
          path: '/#thought-of-the-day',
          labelEn: 'Thought of the Day',
          labelHi: 'आज का चिंतन',
          labelHinglish: 'Thought of the Day',
          icon: <Lightbulb className="w-4 h-4 text-amber-300" />,
        },
      ],
    },
    {
      key: 'more',
      labelEn: 'About & Information',
      labelHi: 'जानकारी व नीतियां',
      labelHinglish: 'About & Info',
      icon: <MoreHorizontal className="w-5 h-5 text-brand-champagne" />,
      items: [
        {
          key: 'about',
          path: '/about/',
          labelEn: 'About FestiveWala',
          labelHi: 'फेस्टिववाला के बारे में',
          labelHinglish: 'About FestiveWala',
          icon: <Info className="w-4 h-4 text-brand-gold" />,
        },
        {
          key: 'contact',
          path: '/contact/',
          labelEn: 'Contact Us',
          labelHi: 'संपर्क करें',
          labelHinglish: 'Contact Us',
          icon: <Mail className="w-4 h-4 text-emerald-400" />,
        },
        {
          key: 'privacy-policy',
          path: '/privacy-policy/',
          labelEn: 'Privacy Policy',
          labelHi: 'गोपनीयता नीति',
          labelHinglish: 'Privacy Policy',
          icon: <ShieldCheck className="w-4 h-4 text-sky-400" />,
        },
        {
          key: 'terms-of-service',
          path: '/terms-of-service/',
          labelEn: 'Terms of Service',
          labelHi: 'सेवा की शर्तें',
          labelHinglish: 'Terms of Service',
          icon: <FileText className="w-4 h-4 text-amber-300" />,
        },
        {
          key: 'disclaimer',
          path: '/disclaimer/',
          labelEn: 'Disclaimer',
          labelHi: 'अस्वीकरण',
          labelHinglish: 'Disclaimer',
          icon: <AlertCircle className="w-4 h-4 text-rose-400" />,
        },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menuOpen}
          className="fixed inset-0 z-50 flex justify-end"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
            data-testid="mobile-drawer-backdrop"
          />

          {/* Drawer Content Panel */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-[86vw] sm:w-full max-w-md h-full bg-[#1C0B30] text-[#FAF7F0] flex flex-col justify-between overflow-hidden shadow-2xl border-l border-brand-gold/20"
          >
            {/* Subtle Background Mandala Texture */}
            <div
              className="absolute inset-0 bg-mandala opacity-[0.05] pointer-events-none"
              aria-hidden="true"
            />

            {/* 1. Top Bar with Brand Logo and Close Button */}
            <div className="relative z-10 px-4 sm:px-6 py-3.5 border-b border-brand-gold/25 flex items-center justify-between bg-[#24113D]/95 backdrop-blur-md">
              <BrandLogo variant="light" size="sm" showTagline={false} linkToHome={false} />

              <button
                type="button"
                onClick={onClose}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 text-brand-champagne hover:bg-white/20 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold cursor-pointer"
                aria-label={t.nav.menuClose}
              >
                <X size={22} />
              </button>
            </div>

          {/* 2. Scrollable Navigation Categories & Expandable Menus */}
          <div className="relative z-10 px-4 sm:px-6 py-4 flex-grow overflow-y-auto space-y-4">
            {/* Primary Navigation Categories */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest-luxury font-bold text-brand-gold/70 px-2 block">
                {isHindi ? 'त्वरित नेविगेशन' : 'Quick Navigation'}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {primaryCategories.map((item) => {
                  const isItemActive =
                    item.path === '/'
                      ? location.pathname === '/' && !location.hash
                      : location.pathname === item.path;
                  return (
                    <Link
                      key={item.key}
                      to={item.path}
                      onClick={onClose}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl text-center transition-all ${
                        isItemActive
                          ? 'bg-brand-royal text-brand-champagne border border-brand-gold/40 shadow-sm font-bold'
                          : 'bg-black/25 border border-white/10 hover:bg-white/10 text-[#FAF7F0]'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-black/40 flex items-center justify-center mb-1 text-brand-gold">
                        {item.icon}
                      </div>
                      <span className="text-[11px] font-serif tracking-wide truncate w-full">
                        {loc(item.labelEn, item.labelHi, item.labelHinglish)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-widest-luxury font-bold text-brand-gold/70 px-2 pb-2">
                {isHindi ? 'विस्तृत मेन्यू व श्रेणियां' : 'All Platform Categories'}
              </div>

              <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation Drawer">
              {categories.map((category) => {
                // If direct link (Home)
                if (category.path && !category.items) {
                  const isActive = location.pathname === category.path && !location.hash;
                  return (
                    <NavLink
                      key={category.key}
                      to={category.path}
                      onClick={onClose}
                      className={`flex items-center justify-between min-h-[48px] px-4 py-3 rounded-2xl transition-all duration-200 active:scale-[0.98] ${
                        isActive
                          ? 'bg-brand-royal text-brand-champagne font-bold border border-brand-gold/40 shadow-royal'
                          : 'text-[#FAF7F0]/90 hover:bg-white/10 hover:text-white border border-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center">
                          {category.icon}
                        </div>
                        <span className="font-serif text-base tracking-wide">
                          {loc(category.labelEn, category.labelHi, category.labelHinglish)}
                        </span>
                      </div>
                      <ChevronRight size={18} className="text-brand-gold/50" />
                    </NavLink>
                  );
                }

                // Expandable Accordion Menu
                const isExpanded = !!expandedCategories[category.key];
                return (
                  <div
                    key={category.key}
                    className="rounded-2xl border border-brand-gold/20 bg-[#250F3E]/70 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.key)}
                      aria-expanded={isExpanded}
                      aria-controls={`subnav-${category.key}`}
                      className="w-full flex items-center justify-between min-h-[48px] px-4 py-3 text-left transition-colors hover:bg-white/5 active:scale-[0.99] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center">
                          {category.icon}
                        </div>
                        <span className="font-serif text-base font-bold text-white tracking-wide">
                          {loc(category.labelEn, category.labelHi, category.labelHinglish)}
                        </span>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-brand-gold transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && category.items && (
                        <motion.div
                          id={`subnav-${category.key}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="px-3 pb-3 pt-1 space-y-1 bg-black/20 border-t border-white/10"
                        >
                          {category.items.map((subItem) => {
                            const isSubActive =
                              subItem.path.startsWith('/#')
                                ? location.hash === subItem.path.substring(1)
                                : subItem.path.includes('?')
                                ? `${location.pathname}${location.search}` === subItem.path
                                : location.pathname === subItem.path;

                            return (
                              <Link
                                key={subItem.key}
                                to={subItem.path}
                                onClick={onClose}
                                className={`flex items-center justify-between min-h-[44px] px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 active:scale-[0.98] ${
                                  isSubActive
                                    ? 'bg-brand-royal text-brand-champagne font-bold border border-brand-gold/30'
                                    : 'text-[#FAF7F0]/80 hover:bg-white/10 hover:text-white'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="w-6 h-6 rounded-lg bg-black/30 flex items-center justify-center text-brand-gold">
                                    {subItem.icon}
                                  </div>
                                  <span className="font-sans font-medium">
                                    {loc(subItem.labelEn, subItem.labelHi, subItem.labelHinglish)}
                                  </span>
                                </div>
                                {isSubActive ? (
                                  <span
                                    className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-gold-glow"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <ChevronRight size={14} className="text-brand-gold/40" />
                                )}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
            </div>
          </div>

          {/* 3. Bottom Action Footer with Language Selector & Start Creating CTA */}
          <div className="relative z-10 px-5 py-4 border-t border-brand-gold/25 bg-[#24113D]/95 space-y-3 shadow-[0_-8px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans text-brand-champagne/80 font-semibold">
                {t.nav.switchLanguage}
              </span>
              <LanguageSwitcher variant="dark" />
            </div>

            <PrimaryButton
              to="/greeting-cards/"
              onClick={onClose}
              fullWidth
              size="lg"
              variant="gold"
              icon={<Sparkles size={16} className="text-[#24113D]" />}
            >
              {isHindi ? 'कार्ड बनाना शुरू करें' : 'Start Creating Card'}
            </PrimaryButton>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
