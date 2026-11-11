import React from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import {
  Home,
  Sparkles,
  MessageSquareHeart,
  Compass,
  Menu,
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { loc } = useLanguage();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Hide bottom bar when user is actively in full canvas editor mode to prevent layout clutter
  const isStudioEditor =
    location.pathname.startsWith('/greeting-cards') && searchParams.get('edit') === 'true';

  if (isStudioEditor) {
    return null;
  }

  const handleOpenDrawer = () => {
    window.dispatchEvent(new CustomEvent('open-mobile-menu'));
  };

  const isCreateActive =
    location.pathname.startsWith('/greeting-cards') ||
    location.pathname.startsWith('/greeting-studio') ||
    location.pathname.startsWith('/greetings') ||
    location.pathname.startsWith('/photo-greetings');

  const isWishesActive = location.pathname.startsWith('/wishes');

  const isExploreActive =
    location.pathname.startsWith('/festivals') ||
    location.pathname.startsWith('/rangoli') ||
    location.pathname.startsWith('/decoration-ideas') ||
    location.pathname.startsWith('/gift-ideas') ||
    location.pathname.startsWith('/festival-guides') ||
    location.pathname.startsWith('/inspiration');

  const isHomeActive = location.pathname === '/' && !location.hash;

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#24113D]/95 backdrop-blur-xl border-t border-[#F2D98B]/30 shadow-[0_-4px_25px_rgba(0,0,0,0.35)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-around px-2 pt-1.5 pb-2">
        {/* Item 1: Home */}
        <NavLink
          to="/"
          end
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-1 rounded-xl transition-all ${
            isHomeActive
              ? 'text-[#F2D98B] font-bold'
              : 'text-[#FAF7F0]/65 hover:text-[#FAF7F0]'
          }`}
        >
          <div className="relative">
            <Home className={`w-5 h-5 ${isHomeActive ? 'text-[#F2D98B]' : 'text-current'}`} />
            {isHomeActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F2D98B] shadow-gold-glow" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-medium">
            {loc('Home', 'होम', 'Home')}
          </span>
        </NavLink>

        {/* Item 2: Create (Raised Prominent Gold Button) */}
        <NavLink
          to="/greeting-cards"
          className={`flex flex-col items-center justify-center min-w-[58px] py-1 px-1 rounded-xl transition-all ${
            isCreateActive
              ? 'text-[#F2D98B] font-bold'
              : 'text-[#FAF7F0]/75 hover:text-[#FAF7F0]'
          }`}
          aria-label={loc('Create Greeting Card', 'ग्रीटिंग कार्ड बनाएं', 'Create Card')}
        >
          <div className="relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isCreateActive
                  ? 'bg-gradient-to-tr from-[#F2D98B] via-[#D4AF37] to-[#FFF0B3] text-[#24113D] shadow-lg shadow-amber-500/30 ring-2 ring-[#F2D98B]'
                  : 'bg-brand-royal text-[#F2D98B] border border-[#F2D98B]/40'
              }`}
            >
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[10.5px] mt-0.5 tracking-tight font-bold text-[#F2D98B]">
            {loc('Create', 'रचें', 'Create')}
          </span>
        </NavLink>

        {/* Item 3: Wishes */}
        <NavLink
          to="/wishes"
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-1 rounded-xl transition-all ${
            isWishesActive
              ? 'text-[#F2D98B] font-bold'
              : 'text-[#FAF7F0]/65 hover:text-[#FAF7F0]'
          }`}
        >
          <div className="relative">
            <MessageSquareHeart
              className={`w-5 h-5 ${isWishesActive ? 'text-[#F2D98B]' : 'text-current'}`}
            />
            {isWishesActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F2D98B] shadow-gold-glow" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-medium">
            {loc('Wishes', 'संदेश', 'Wishes')}
          </span>
        </NavLink>

        {/* Item 4: Explore */}
        <NavLink
          to="/festivals"
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-1 rounded-xl transition-all ${
            isExploreActive
              ? 'text-[#F2D98B] font-bold'
              : 'text-[#FAF7F0]/65 hover:text-[#FAF7F0]'
          }`}
        >
          <div className="relative">
            <Compass
              className={`w-5 h-5 ${isExploreActive ? 'text-[#F2D98B]' : 'text-current'}`}
            />
            {isExploreActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F2D98B] shadow-gold-glow" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-medium">
            {loc('Explore', 'खोजें', 'Explore')}
          </span>
        </NavLink>

        {/* Item 5: More (Triggers Unified Mobile Drawer) */}
        <button
          type="button"
          onClick={handleOpenDrawer}
          aria-label={loc('Open Navigation Menu', 'मेन्यू खोलें', 'Open Menu')}
          className="flex flex-col items-center justify-center min-w-[56px] py-1 px-1 rounded-xl transition-all text-[#FAF7F0]/65 hover:text-[#FAF7F0] cursor-pointer"
        >
          <div className="relative">
            <Menu className="w-5 h-5 text-current" />
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-medium">
            {loc('More', 'अधिक', 'More')}
          </span>
        </button>
      </div>
    </nav>
  );
};
