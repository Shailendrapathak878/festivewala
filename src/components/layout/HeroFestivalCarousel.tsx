import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { getUpcomingFestivals, type UpcomingFestival } from '../../services/festivalPriorityEngine';
import { FESTIVALS_DATA } from '../../data/festivals';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Palette,
  Heart,
  Flame,
  Gift,
  PartyPopper,
  Pause,
  Play,
  Coins,
  Sun,
  BookOpen,
  Clock,
} from 'lucide-react';

interface FestivalVisualMeta {
  taglineEn: string;
  taglineHi: string;
  taglineHinglish: string;
  tagEn: string;
  tagHi: string;
  tagHinglish: string;
  accentColor: string;
  secondaryColor: string;
  bgGradient: string;
  cardTheme: string;
  motto: string;
  icon: React.ReactNode;
  renderArtwork: () => React.ReactNode;
}

const FESTIVAL_VISUAL_CATALOG: Record<string, FestivalVisualMeta> = {
  dhanteras: {
    taglineEn: 'Celebrate Prosperity, Health & Divine Light',
    taglineHi: 'आरोग्य, समृद्धि व लक्ष्मी-धन्वंतरि कृपा का महापर्व',
    taglineHinglish: 'Arogya, Dhan & Divine Blessings ka Shubh Utsav',
    tagEn: 'Day 1 of Diwali • Shubh Muhurat',
    tagHi: 'दीपावली का प्रथम दिवस • शुभ मुहूर्त',
    tagHinglish: 'Diwali Day 1 • Shubh Muhurat',
    accentColor: '#F59E0B',
    secondaryColor: '#D97706',
    bgGradient: 'from-[#291702] via-[#3E2104] to-[#170C01]',
    cardTheme: 'from-[#251503] to-[#3A2006]',
    motto: '"Arogyam Dhana Sampada"',
    icon: <Coins className="w-4 h-4 text-amber-400" />,
    renderArtwork: () => (
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-2xl">
        <circle cx="80" cy="80" r="72" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="80" cy="80" r="54" stroke="#F2D98B" strokeWidth="0.75" opacity="0.5" />
        {/* Golden Kalash Vessel */}
        <ellipse cx="80" cy="50" rx="22" ry="4" fill="#F59E0B" />
        <path d="M58 50 Q48 78 54 104 Q60 120 80 122 Q100 120 106 104 Q112 78 102 50 Z" fill="url(#dhanterasGoldPot)" />
        <rect x="68" y="120" width="24" height="6" rx="2" fill="#B45309" />
        {/* Sacred Coconut */}
        <circle cx="80" cy="42" r="10" fill="#78350F" />
        {/* Mango Leaves */}
        <path d="M72 44 C62 34 60 24 68 22 C74 26 74 36 72 44 Z" fill="#15803D" />
        <path d="M88 44 C98 34 100 24 92 22 C86 26 86 36 88 44 Z" fill="#15803D" />
        <path d="M80 40 C77 26 80 16 80 16 C80 16 83 26 80 40 Z" fill="#16A34A" />
        {/* Gold Coins Radiance */}
        <circle cx="54" cy="68" r="5" fill="#FBBF24" stroke="#B45309" strokeWidth="0.75" />
        <circle cx="106" cy="68" r="5" fill="#FBBF24" stroke="#B45309" strokeWidth="0.75" />
        <circle cx="48" cy="90" r="4.5" fill="#FDE68A" stroke="#B45309" strokeWidth="0.75" />
        <circle cx="112" cy="90" r="4.5" fill="#FDE68A" stroke="#B45309" strokeWidth="0.75" />
        <defs>
          <linearGradient id="dhanterasGoldPot" x1="54" y1="50" x2="106" y2="122" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE68A" />
            <stop offset="0.3" stopColor="#F59E0B" />
            <stop offset="0.7" stopColor="#D97706" />
            <stop offset="1" stopColor="#78350F" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  diwali: {
    taglineEn: 'Celebrate the Festival of Lights',
    taglineHi: 'दीपोत्सव का पावन महापर्व मनाएं',
    taglineHinglish: 'Diwali — Roshni aur khushiyon ka mahaparv',
    tagEn: 'Festival of Lights • Deepotsav',
    tagHi: 'दीपोत्सव • महापर्व',
    tagHinglish: 'Lights Festival',
    accentColor: '#D4AF37',
    secondaryColor: '#E65100',
    bgGradient: 'from-[#24113D] via-[#351759] to-[#120524]',
    cardTheme: 'from-[#1E0B36] to-[#2B104C]',
    motto: '"Tamaso Mā Jyotirgamaya"',
    icon: <Flame className="w-4 h-4 text-[#F2D98B]" />,
    renderArtwork: () => (
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-xl">
        <circle cx="80" cy="80" r="70" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="80" cy="80" r="52" stroke="#F2D98B" strokeWidth="0.75" opacity="0.5" />
        {/* Clay Diya */}
        <path
          d="M40 95C40 120 58 128 80 128C102 128 120 120 120 95C120 92 116 90 114 90C96 93 64 93 46 90C44 90 40 92 40 95Z"
          fill="url(#diwaliGoldGradHero)"
        />
        <ellipse cx="80" cy="92" rx="38" ry="4" fill="#B8860B" opacity="0.8" />
        {/* Flame */}
        <path
          d="M80 34C80 34 64 56 64 74C64 83 71.2 90 80 90C88.8 90 96 83 96 74C96 56 80 34 80 34Z"
          fill="url(#diwaliFlameGradHero)"
        />
        <circle cx="80" cy="74" r="6" fill="#FFFFFF" opacity="0.9" />
        <defs>
          <linearGradient id="diwaliGoldGradHero" x1="40" y1="90" x2="120" y2="128" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2D98B" />
            <stop offset="0.5" stopColor="#D4AF37" />
            <stop offset="1" stopColor="#996515" />
          </linearGradient>
          <linearGradient id="diwaliFlameGradHero" x1="64" y1="34" x2="96" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.3" stopColor="#F2D98B" />
            <stop offset="0.7" stopColor="#D4AF37" />
            <stop offset="1" stopColor="#E65100" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  'chhath-puja': {
    taglineEn: 'Salute the Sun God with Faith & Devotion',
    taglineHi: 'भगवान सूर्य और षष्ठी मैया की पावन उपासना',
    taglineHinglish: 'Surya Bhagwan aur Chhathi Maiya ki shubh aradhana',
    tagEn: 'Solar Devotion • Mahaparv',
    tagHi: 'सूर्य उपासना • महापर्व',
    tagHinglish: 'Solar Devotion',
    accentColor: '#F97316',
    secondaryColor: '#EA580C',
    bgGradient: 'from-[#3A1400] via-[#5C2300] to-[#1A0A02]',
    cardTheme: 'from-[#361301] to-[#4F1A02]',
    motto: '"Om Suryaya Namaha"',
    icon: <Sun className="w-4 h-4 text-amber-400" />,
    renderArtwork: () => (
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-xl">
        <circle cx="80" cy="80" r="70" stroke="#F97316" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        {/* Radiant Sun Rising */}
        <circle cx="80" cy="75" r="32" fill="url(#chhathSunGrad)" />
        {/* Sun Rays */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 80 + Math.cos(angle) * 36;
          const y1 = 75 + Math.sin(angle) * 36;
          const x2 = 80 + Math.cos(angle) * 48;
          const y2 = 75 + Math.sin(angle) * 48;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />;
        })}
        {/* Sacred River Water Waves */}
        <path d="M20 115 Q50 105 80 115 T140 115 L140 140 L20 140 Z" fill="#1E3A8A" opacity="0.75" />
        <path d="M20 122 Q50 114 80 122 T140 122 L140 140 L20 140 Z" fill="#2563EB" opacity="0.85" />
        {/* Sacred Soop with Offerings */}
        <path d="M60 102 L100 102 L95 118 L65 118 Z" fill="#D97706" />
        <circle cx="75" cy="100" r="4" fill="#EF4444" />
        <circle cx="85" cy="100" r="4" fill="#FBBF24" />
        <defs>
          <linearGradient id="chhathSunGrad" x1="80" y1="43" x2="80" y2="107" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF08A" />
            <stop offset="0.4" stopColor="#F97316" />
            <stop offset="1" stopColor="#DC2626" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  christmas: {
    taglineEn: 'Share the Joy of Peace & Togetherness',
    taglineHi: 'अपनों संग खुशियां, शांति और प्रेम बांटें',
    taglineHinglish: 'Apno ke saath peace aur happiness share karein',
    tagEn: 'Season of Peace • Winter Joy',
    tagHi: 'प्रेम व शांति • शीतकालीन पर्व',
    tagHinglish: 'Peace & Joy',
    accentColor: '#10B981',
    secondaryColor: '#059669',
    bgGradient: 'from-[#0A1A12] via-[#122E20] to-[#06120C]',
    cardTheme: 'from-[#0D2318] to-[#173B29]',
    motto: '"Peace on Earth, Goodwill to All"',
    icon: <Gift className="w-4 h-4 text-emerald-400" />,
    renderArtwork: () => (
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-xl">
        <circle cx="80" cy="80" r="68" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        {/* Christmas Pine Tree */}
        <path d="M80 25 L98 55 H88 L104 85 H92 L110 115 H50 L68 85 H56 L72 55 H62 Z" fill="url(#xmasTreeGradHero)" />
        {/* Trunk */}
        <rect x="74" y="115" width="12" height="15" fill="#8B5A2B" rx="2" />
        {/* Star of Bethlehem */}
        <polygon points="80,14 83,23 92,23 85,28 87,37 80,31 73,37 75,28 68,23 77,23" fill="#F2D98B" />
        {/* Baubles */}
        <circle cx="70" cy="70" r="4" fill="#E11D48" />
        <circle cx="90" cy="75" r="4" fill="#F2D98B" />
        <circle cx="65" cy="100" r="5" fill="#F2D98B" />
        <circle cx="85" cy="98" r="5" fill="#E11D48" />
        <circle cx="100" cy="104" r="4" fill="#38BDF8" />
        <defs>
          <linearGradient id="xmasTreeGradHero" x1="80" y1="25" x2="80" y2="115" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34D399" />
            <stop offset="0.6" stopColor="#059669" />
            <stop offset="1" stopColor="#064E3B" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  'new-year': {
    taglineEn: 'Welcome 2027 with Radiant Horizons',
    taglineHi: 'नवीन आशाओं और असीम अवसरों का अभिनंदन',
    taglineHinglish: 'Nayi umeedon aur naye shuruat ka welcome karein',
    tagEn: 'New Horizons 2027 • Fresh Dawn',
    tagHi: 'नवीन आरंभ २०२७',
    tagHinglish: 'New Beginnings',
    accentColor: '#38BDF8',
    secondaryColor: '#2563EB',
    bgGradient: 'from-[#0B1528] via-[#122345] to-[#070D18]',
    cardTheme: 'from-[#0E1A34] to-[#162A54]',
    motto: '"New Horizons, Endless Light"',
    icon: <PartyPopper className="w-4 h-4 text-sky-400" />,
    renderArtwork: () => (
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-xl">
        <circle cx="80" cy="80" r="68" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        {/* Clock Face at 12 */}
        <circle cx="80" cy="80" r="44" fill="#181E36" stroke="#F2D98B" strokeWidth="2.5" />
        <line x1="80" y1="80" x2="80" y2="48" stroke="#F2D98B" strokeWidth="3" strokeLinecap="round" />
        <line x1="80" y1="80" x2="80" y2="56" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="80" cy="80" r="4" fill="#F2D98B" />
        {/* Celebration Sparkler Bursts */}
        <path d="M25 35 L35 45 M135 35 L125 45 M30 125 L40 115 M130 125 L120 115" stroke="#F2D98B" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="30" cy="40" r="2" fill="#FFFFFF" />
        <circle cx="130" cy="40" r="2" fill="#FFFFFF" />
        <circle cx="80" cy="22" r="3" fill="#F2D98B" />
      </svg>
    ),
  },
  'makar-sankranti': {
    taglineEn: 'Soar High with Sweetness & Uttarayan Glory',
    taglineHi: 'पतंगों की उड़ान, तिल-गुड़ की मिठास व सूर्य का उत्तरायण',
    taglineHinglish: 'Patangon ki udaan aur mithas ke sath celebrate karein',
    tagEn: 'Uttarayan Festival • Harvest Joy',
    tagHi: 'उत्तरायण पर्व • मकर संक्रांति',
    tagHinglish: 'Uttarayan Festival',
    accentColor: '#EAB308',
    secondaryColor: '#CA8A04',
    bgGradient: 'from-[#291E04] via-[#423108] to-[#1A1302]',
    cardTheme: 'from-[#281F08] to-[#3E300D]',
    motto: '"Uttarayan Blessings & Joy"',
    icon: <Sun className="w-4 h-4 text-yellow-400" />,
    renderArtwork: () => (
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-xl">
        <circle cx="80" cy="80" r="70" stroke="#EAB308" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        {/* Flying Kite 1 */}
        <polygon points="80,30 105,55 80,80 55,55" fill="#EF4444" stroke="#F2D98B" strokeWidth="1.5" />
        <line x1="80" y1="30" x2="80" y2="80" stroke="#F2D98B" strokeWidth="1" />
        <path d="M55 55 Q80 70 105 55" stroke="#F2D98B" strokeWidth="1" fill="none" />
        <polygon points="75,80 85,80 80,92" fill="#FBBF24" />
        {/* Flying Kite 2 (Smaller) */}
        <polygon points="120,65 135,80 120,95 105,80" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1" />
        {/* Sesame-Jaggery Bowl at base */}
        <ellipse cx="60" cy="125" rx="25" ry="8" fill="#B45309" />
        <circle cx="55" cy="120" r="5" fill="#FDE68A" />
        <circle cx="65" cy="120" r="5" fill="#FDE68A" />
      </svg>
    ),
  },
  'maha-shivratri': {
    taglineEn: 'Immerse in the Luminous Grace of Lord Shiva',
    taglineHi: 'महादेव की कृपा, आत्म-शांति व पावन जागरण',
    taglineHinglish: 'Mahadev ki kripa aur divya shanti ka mahaparv',
    tagEn: 'Night of Shiva • Sacred Jagran',
    tagHi: 'शिव कृपा • महाशिवरात्रि',
    tagHinglish: 'Night of Shiva',
    accentColor: '#818CF8',
    secondaryColor: '#4F46E5',
    bgGradient: 'from-[#141228] via-[#201D40] to-[#0A0915]',
    cardTheme: 'from-[#181630] to-[#25224D]',
    motto: '"Om Namah Shivaya"',
    icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
    renderArtwork: () => (
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-xl">
        <circle cx="80" cy="80" r="70" stroke="#818CF8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        {/* Crescent Moon */}
        <path d="M80 30 A24 24 0 0 0 98 48 A28 28 0 0 1 80 30 Z" fill="#F2D98B" />
        {/* Sacred Trishul (Trident) */}
        <line x1="80" y1="35" x2="80" y2="135" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
        <path d="M55 45 Q80 75 80 85 Q80 75 105 45" stroke="#D4AF37" strokeWidth="3" fill="none" />
        <path d="M80 30 L85 45 L75 45 Z" fill="#D4AF37" />
        {/* Damru Drum */}
        <path d="M70 85 L90 85 L70 102 L90 102 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
        <circle cx="80" cy="93.5" r="3" fill="#FFFFFF" />
      </svg>
    ),
  },
  holi: {
    taglineEn: 'Add Colours of Love to Every Connection',
    taglineHi: 'हर रिश्ते में खुशियों और प्रेम के रंग भरें',
    taglineHinglish: 'Har rishte mein rang aur khushiyan bharein',
    tagEn: 'Festival of Colors • Rangotsav',
    tagHi: 'रंगोत्सव • फाल्गुन उत्सव',
    tagHinglish: 'Colors Festival',
    accentColor: '#EC4899',
    secondaryColor: '#BE185D',
    bgGradient: 'from-[#2A081C] via-[#481132] to-[#160410]',
    cardTheme: 'from-[#260B1C] to-[#3B112D]',
    motto: '"Ullās & Rangotsav"',
    icon: <Palette className="w-4 h-4 text-pink-400" />,
    renderArtwork: () => (
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-xl">
        <circle cx="80" cy="80" r="68" stroke="#EC4899" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
        <ellipse cx="80" cy="115" rx="55" ry="16" fill="#D4AF37" />
        <ellipse cx="80" cy="112" rx="50" ry="13" fill="#3D0A24" />
        <circle cx="60" cy="100" r="18" fill="#EC4899" opacity="0.9" />
        <circle cx="100" cy="100" r="18" fill="#FBBF24" opacity="0.9" />
        <circle cx="80" cy="88" r="22" fill="#10B981" opacity="0.95" />
        <path d="M80 30 Q70 60 50 65 Q70 70 80 85 Q90 70 110 65 Q90 60 80 30Z" fill="url(#holiSplashGradHero)" />
        <defs>
          <linearGradient id="holiSplashGradHero" x1="50" y1="30" x2="110" y2="85" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EC4899" />
            <stop offset="0.5" stopColor="#FBBF24" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  'raksha-bandhan': {
    taglineEn: 'Celebrate the Sacred Bond That Lasts Forever',
    taglineHi: 'भाई-बहन के अटूट स्नेह और विश्वास का उत्सव',
    taglineHinglish: 'Bhai-behen ke anmol pyaar ka celebration',
    tagEn: 'Bond of Protection • Sacred Thread',
    tagHi: 'स्नेह बंधन • रक्षाबंधन',
    tagHinglish: 'Sibling Bond',
    accentColor: '#D81B60',
    secondaryColor: '#AD1457',
    bgGradient: 'from-[#240A1F] via-[#3E1136] to-[#140512]',
    cardTheme: 'from-[#220B1D] to-[#36132F]',
    motto: '"Yen Baddho Bali Rājā"',
    icon: <Heart className="w-4 h-4 text-pink-400" />,
    renderArtwork: () => (
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-xl">
        <circle cx="80" cy="80" r="68" stroke="#D81B60" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        <path d="M10 80 Q80 75 150 80" stroke="#F2D98B" strokeWidth="3" />
        <path d="M10 80 Q80 85 150 80" stroke="#DC2626" strokeWidth="2" strokeDasharray="6 4" />
        <circle cx="80" cy="80" r="32" fill="#240A1F" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="80" cy="80" r="24" fill="#DC2626" />
        <circle cx="80" cy="80" r="8" fill="#F2D98B" />
        <circle cx="80" cy="80" r="4" fill="#FFFFFF" />
      </svg>
    ),
  },
  navratri: {
    taglineEn: 'Embrace Nine Divine Nights of Shakti & Grace',
    taglineHi: 'मां भगवती की नौ पावन रात्रियों का आराधना पर्व',
    taglineHinglish: 'Maa Durga ki 9 divya nights ka celebration',
    tagEn: 'Nine Divine Nights • Navotsav',
    tagHi: 'नवरात्रि • शक्ति वंदना',
    tagHinglish: 'Nine Nights of Shakti',
    accentColor: '#EF4444',
    secondaryColor: '#B91C1C',
    bgGradient: 'from-[#280B0B] via-[#421212] to-[#150505]',
    cardTheme: 'from-[#280C0C] to-[#3E1414]',
    motto: '"Ya Devi Sarvabhuteshu"',
    icon: <Sparkles className="w-4 h-4 text-rose-400" />,
    renderArtwork: () => (
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-xl">
        <circle cx="80" cy="80" r="70" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        {/* Garba Diya Pot */}
        <circle cx="80" cy="85" r="34" fill="#7F1D1D" stroke="#F59E0B" strokeWidth="2" />
        <circle cx="80" cy="70" r="6" fill="#F59E0B" />
        <path d="M80 40 Q70 60 75 70 Q80 60 80 40 Z" fill="#FBBF24" />
        <ellipse cx="80" cy="118" rx="28" ry="6" fill="#B91C1C" />
      </svg>
    ),
  },
};

export const HeroFestivalCarousel: React.FC = () => {
  const { isHindi, loc } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  // Tick state to keep countdowns and priorities accurate across midnight and visibility
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Touch Swipe coordinates
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Real-time second tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 1. Central Festival Priority Engine: Dynamically retrieve next 5 upcoming festivals
  const upcomingList: UpcomingFestival[] = useMemo(() => {
    return getUpcomingFestivals(FESTIVALS_DATA, currentDate, 5);
  }, [currentDate]);

  // Ensure currentIndex stays within bounds if list shrinks
  useEffect(() => {
    if (currentIndex >= upcomingList.length && upcomingList.length > 0) {
      setCurrentIndex(0);
    }
  }, [upcomingList.length, currentIndex]);

  const activeItem: UpcomingFestival | undefined = upcomingList[currentIndex] || upcomingList[0];

  const nextSlide = useCallback(() => {
    if (upcomingList.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % upcomingList.length);
  }, [upcomingList.length]);

  const prevSlide = useCallback(() => {
    if (upcomingList.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + upcomingList.length) % upcomingList.length);
  }, [upcomingList.length]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  // Automatic Carousel Transition (6.0s interval)
  useEffect(() => {
    if (isPaused || userPaused || shouldReduceMotion || upcomingList.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, userPaused, shouldReduceMotion, nextSlide, upcomingList.length]);

  // Pause carousel when browser tab is inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 40;
    if (diffX > threshold) {
      nextSlide();
    } else if (diffX < -threshold) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!activeItem) return null;

  const { festival, calendar, isCountdownActive, isCelebrating, daysRemaining, hoursRemaining, minutesRemaining, secondsRemaining, features } = activeItem;
  const visualMeta = FESTIVAL_VISUAL_CATALOG[festival.id.toLowerCase()] || {
    taglineEn: festival.descEn,
    taglineHi: festival.descHi,
    taglineHinglish: festival.descEn,
    tagEn: 'Cultural Celebration',
    tagHi: 'पावन महापर्व',
    tagHinglish: 'Celebration',
    accentColor: festival.accentColor,
    secondaryColor: '#D4AF37',
    bgGradient: festival.bgGradient,
    cardTheme: 'from-[#1E0B36] to-[#2B104C]',
    motto: '"Joy, Peace & Light"',
    icon: <Sparkles className="w-4 h-4 text-amber-300" />,
    renderArtwork: () => <Flame className="w-24 h-24 text-amber-400 drop-shadow-xl" />,
  };

  const countdownUnits = [
    { labelEn: 'Days', labelHi: 'दिन', value: daysRemaining },
    { labelEn: 'Hours', labelHi: 'घंटे', value: hoursRemaining },
    { labelEn: 'Mins', labelHi: 'मिनट', value: minutesRemaining },
    { labelEn: 'Secs', labelHi: 'सेकंड', value: secondsRemaining },
  ];

  const festivalName = isHindi ? festival.nameHi : festival.nameEn;
  const festivalTagline = loc(visualMeta.taglineEn, visualMeta.taglineHi, visualMeta.taglineHinglish);
  const festivalDesc = isHindi ? festival.descHi : festival.descEn;
  const festivalDateStr = isHindi ? calendar.tithiHi : calendar.tithiEn;
  const festivalTagStr = loc(visualMeta.tagEn, visualMeta.tagHi, visualMeta.tagHinglish);

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative w-full overflow-hidden transition-colors duration-700 bg-brand-deep focus:outline-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label={isHindi ? 'आगामी ५ प्रमुख त्योहार कैरोसेल' : 'Upcoming 5 Festivals Carousel'}
      data-testid="hero-festival-carousel"
    >
      {/* Dynamic Background Atmosphere Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${visualMeta.bgGradient} opacity-95 transition-all duration-700 pointer-events-none`}
      />

      {/* Subtle Ambient Mandala Watermark */}
      <div
        className="absolute inset-0 bg-mandala opacity-[0.05] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Carousel Frame Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={festival.id}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
            data-testid={`carousel-active-slide-${activeItem.priority}`}
          >
            {/* Left Content Column (7 cols desktop) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left order-2 lg:order-1">
              {/* Badges Strip: Priority + Tag + Date */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-royal text-[#F2D98B] border border-brand-gold/40 shadow-sm">
                  <Clock size={12} className="text-brand-gold" />
                  <span>
                    {isHindi
                      ? `आगामी पर्व #${activeItem.priority}`
                      : `Upcoming Festival #${activeItem.priority}`}
                  </span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-gold/20 text-[#F2D98B] border border-brand-gold/35 shadow-sm">
                  {visualMeta.icon}
                  <span>{festivalTagStr}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-black/35 text-[#FAF7F0]/85 border border-white/10 backdrop-blur-sm">
                  <Calendar size={12} className="text-[#F2D98B]" />
                  <span>{festivalDateStr}</span>
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1 sm:space-y-2">
                <span
                  data-testid="carousel-slide-title"
                  className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F2D98B]/90 block"
                >
                  {festivalName} • {isHindi ? 'विशेष उत्सव' : 'Signature Celebration'}
                </span>
                <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#FAF7F0] tracking-tight leading-[1.18]">
                  {festivalTagline}
                </h1>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm md:text-base text-[#FAF7F0]/85 max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed">
                {festivalDesc}
              </p>

              {/* Countdown or Status Indicator */}
              <div className="pt-1">
                {isCelebrating ? (
                  <div
                    data-testid="carousel-slide-celebrating"
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold"
                  >
                    <Sparkles size={14} className="animate-pulse" />
                    <span>{isHindi ? '✨ पावन पर्व आज जारी है! ✨' : '✨ Sacred Celebration is Live Today! ✨'}</span>
                  </div>
                ) : isCountdownActive ? (
                  <div data-testid="carousel-slide-countdown" className="space-y-1.5 max-w-sm mx-auto lg:mx-0">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#F2D98B]/80 block text-center lg:text-left">
                      {isHindi ? 'सजीव उलटी गिनती (Live Countdown)' : 'Live Countdown to Celebration'}
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {countdownUnits.map((u, i) => (
                        <div
                          key={i}
                          className="p-1.5 sm:p-2 rounded-xl bg-[#140824]/90 border border-brand-gold/30 backdrop-blur-md shadow-card-luxury flex flex-col items-center justify-center"
                        >
                          <span className="font-display text-base sm:text-xl font-bold text-gold-gradient tracking-tight">
                            {String(u.value).padStart(2, '0')}
                          </span>
                          <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold text-brand-champagne/80 mt-0.5">
                            {isHindi ? u.labelHi : u.labelEn}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div
                    data-testid="carousel-slide-status"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/10 text-brand-champagne/90 border border-white/15 text-xs font-medium"
                  >
                    <Clock size={12} className="text-[#F2D98B]" />
                    <span>
                      {isHindi
                        ? `${daysRemaining} दिन शेष • सजीव उलटी गिनती ७ दिन पूर्व स्वतः प्रारंभ होगी`
                        : `In ${daysRemaining} Days • Live countdown starts 7 days prior`}
                    </span>
                  </div>
                )}
              </div>

              {/* Mandatory Action Buttons: Button 1 (Greetings) + Button 2 (Wishes) + Guide */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                {/* Button 1: Explore Greetings */}
                {features.hasGreetings ? (
                  <Link
                    to={`/greeting-cards?festival=${festival.id}`}
                    data-testid="carousel-btn-greetings"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#F2D98B] via-[#D4AF37] to-[#F2D98B] text-[#24113D] font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.98] transition-all min-h-[46px]"
                    aria-label={`Explore greetings for ${festival.nameEn}`}
                  >
                    <Palette size={16} className="text-[#24113D]" />
                    <span>{isHindi ? `${festival.nameHi} ग्रीटिंग्स` : `Explore ${festival.nameEn} Greetings`}</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    data-testid="carousel-btn-greetings-disabled"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/10 text-[#FAF7F0]/60 border border-white/15 font-semibold text-xs min-h-[46px] cursor-not-allowed opacity-75"
                    aria-label={`Greetings coming soon for ${festival.nameEn}`}
                  >
                    <Palette size={15} className="text-white/40" />
                    <span>{isHindi ? 'ग्रीटिंग्स शीघ्र उपलब्ध' : 'Greetings Coming Soon'}</span>
                  </button>
                )}

                {/* Button 2: Explore Wishes */}
                <Link
                  to={`/wishes?festival=${festival.id}`}
                  data-testid="carousel-btn-wishes"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#24113D] hover:bg-[#341857] text-[#F2D98B] border border-[#F2D98B]/50 font-bold text-xs sm:text-sm tracking-wide shadow-md active:scale-[0.98] transition-all min-h-[46px]"
                  aria-label={`Explore wishes for ${festival.nameEn}`}
                >
                  <BookOpen size={16} className="text-[#F2D98B]" />
                  <span>{isHindi ? `${festival.nameHi} शुभकामनाएं` : `Explore ${festival.nameEn} Wishes`}</span>
                </Link>

                {/* Optional Guide Link */}
                <Link
                  to={features.guideUrl || `/festivals/${festival.id}`}
                  data-testid="carousel-btn-guide"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-[#F2D98B] hover:text-white hover:underline transition-colors"
                  aria-label={`Explore festival guide for ${festival.nameEn}`}
                >
                  <span>{isHindi ? 'पूरा उत्सव विवरण' : 'Festival Guide'}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Right Column: Original Cultural Artwork Emblem Card (5 cols desktop) */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <div
                className={`relative w-64 sm:w-72 lg:w-80 h-72 sm:h-80 lg:h-92 rounded-3xl bg-gradient-to-br ${visualMeta.cardTheme} p-1 border-2 border-[#F2D98B]/40 shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between`}
              >
                {/* Background Mandala Watermark */}
                <div className="absolute inset-0 bg-mandala opacity-[0.06] pointer-events-none" aria-hidden="true" />

                {/* Ambient Top Glow */}
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-35 pointer-events-none"
                  style={{ backgroundColor: visualMeta.accentColor }}
                />

                <div className="relative z-10 p-5 flex flex-col items-center justify-between h-full text-center">
                  {/* Top Bar inside emblem */}
                  <div className="w-full flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-[#F2D98B]/80 border-b border-[#F2D98B]/20 pb-2">
                    <span>FestiveWala Signature</span>
                    <span className="font-mono text-amber-300">#0{activeItem.priority}</span>
                  </div>

                  {/* Cultural Artwork SVGs */}
                  <div className="relative w-32 sm:w-36 h-32 sm:h-36 flex items-center justify-center my-auto">
                    {visualMeta.renderArtwork()}
                  </div>

                  {/* Card Title & Sacred Motto */}
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F2D98B] tracking-wide">
                      {festivalName}
                    </h3>
                    <p className="text-[11px] text-[#FAF7F0]/80 italic font-serif">
                      {visualMeta.motto}
                    </p>
                  </div>

                  {/* Card Bottom Bar Link */}
                  <div className="w-full pt-2 border-t border-[#F2D98B]/20 flex items-center justify-between text-xs">
                    <span className="text-[#FAF7F0]/60 text-[10px] font-sans">
                      {calendar.panchangSource}
                    </span>
                    <Link
                      to={features.guideUrl || `/festivals/${festival.id}`}
                      className="text-[#F2D98B] hover:underline font-bold text-[11px] flex items-center gap-1"
                    >
                      <span>{isHindi ? 'विवरण' : 'Explore'}</span>
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Bar (Bottom Controls) */}
        <div className="mt-8 flex items-center justify-between gap-4 pt-4 border-t border-white/10">
          {/* Slide Indicator Dots (5 Upcoming Festivals) */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label={isHindi ? 'त्योहार कैरोसेल स्लाइड्स' : 'Upcoming 5 festival slide indicators'}
            data-testid="carousel-indicators"
          >
            {upcomingList.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={item.festival.id}
                  type="button"
                  role="tab"
                  data-testid="carousel-indicator-dot"
                  aria-selected={isActive}
                  aria-current={isActive ? 'true' : 'false'}
                  aria-label={`Go to slide ${idx + 1}: ${item.festival.nameEn}`}
                  onClick={() => goToSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-8 bg-[#F2D98B] shadow-md shadow-amber-500/30'
                      : 'w-2.5 bg-white/30 hover:bg-white/50'
                  }`}
                />
              );
            })}
          </div>

          {/* Festival Name Preview / Progress */}
          <div
            data-testid="carousel-progress-text"
            className="hidden sm:flex items-center gap-2 text-xs font-serif text-[#F2D98B]"
          >
            <Sparkles size={13} className="text-[#F2D98B]" />
            <span>
              {currentIndex + 1} / {upcomingList.length} • {festivalName}
            </span>
          </div>

          {/* Previous / Next / Pause Manual Control Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-testid="carousel-pause-toggle"
              onClick={() => setUserPaused(!userPaused)}
              aria-label={userPaused ? 'Resume autoplay' : 'Pause autoplay'}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF7F0] border border-white/15 transition-colors cursor-pointer"
              title={userPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
            >
              {userPaused ? <Play size={15} /> : <Pause size={15} />}
            </button>

            <button
              type="button"
              data-testid="carousel-prev-btn"
              onClick={prevSlide}
              aria-label="Previous festival"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF7F0] border border-white/15 transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              data-testid="carousel-next-btn"
              onClick={nextSlide}
              aria-label="Next festival"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF7F0] border border-white/15 transition-colors cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
