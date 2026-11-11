import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { GreetingTemplate, OutputFormat } from '../types/template';
import type { CardCustomization, EditorTab } from '../types/editor';
import { ALL_GREETING_TEMPLATES } from '../data/templates';
import { getGreetingsByFestival, getPhotoTemplatesByFestival } from '../../../data/festivals/festivalRepository';
import { getUpcomingFestivals } from '../../../services/festivalPriorityEngine';
import { computeLayout } from '../services/layoutEngine';
import { useEditorHistory } from '../hooks/useEditorHistory';
import { exportCardToBlob, downloadCard, shareCard } from '../services/exportService';
import { CanvasPreview } from './CanvasPreview';
import { FormatSelector } from './FormatSelector';
import { TextControls } from './TextControls';
import { DesignControls } from './DesignControls';
import { PhotoControls } from './PhotoControls';
import { TemplateGallery } from './TemplateGallery';
import { FestivalSelector } from './FestivalSelector';
import { useLanguage } from '../../../hooks/useLanguage';
import {
  Undo,
  Redo,
  RotateCcw,
  Download,
  Share2,
  ChevronLeft,
  Type,
  Palette,
  Camera,
  Sparkles,
  CheckCircle2,
  LayoutGrid,
} from 'lucide-react';

interface GreetingStudioProps {
  defaultFestivalId?: string;
  defaultGreetingMode?: 'simple' | 'photo';
}

export const GreetingStudio: React.FC<GreetingStudioProps> = ({
  defaultFestivalId,
  defaultGreetingMode,
}) => {
  const { isHindi, isHinglish, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Upcoming Festivals Priority Engine (picks nearest upcoming festivals that have templates)
  const upcomingFestivals = useMemo(() => getUpcomingFestivals(), []);
  const availableUpcomingWithTemplates = useMemo(
    () => upcomingFestivals.filter((u) => getGreetingsByFestival(u.festival.id).length > 0),
    [upcomingFestivals]
  );
  const p1FestivalId = availableUpcomingWithTemplates[0]?.festival.id || 'chhath-puja';
  const p2FestivalId =
    availableUpcomingWithTemplates[1]?.festival.id ||
    (p1FestivalId === 'diwali' ? 'dhanteras' : 'diwali');

  const getFestivalHeadingMeta = (festId: string, mode: 'simple' | 'photo') => {
    if (festId === 'chhath-puja') {
      return {
        emoji: '☀️',
        title:
          mode === 'simple'
            ? isHindi
              ? 'छठ पूजा २०२६ सिंपल ग्रीटिंग संग्रह (२५ डिज़ाइन)'
              : 'Chhath Puja 2026 Simple Greetings Collection (25 Designs)'
            : isHindi
            ? 'छठ पूजा २०२६ फोटो ग्रीटिंग संग्रह (१० लेआउट्स)'
            : 'Chhath Puja 2026 Photo Greetings Collection (10 Layouts)',
        badgeCount: mode === 'simple' ? '25 / 25 Ready' : '10 / 10 Ready',
      };
    }
    if (festId === 'dhanteras') {
      return {
        emoji: '🪙',
        title:
          mode === 'simple'
            ? isHindi
              ? 'धनतेरस २०२६ सिंपल ग्रीटिंग संग्रह (२५ डिज़ाइन)'
              : 'Dhanteras 2026 Simple Greetings Collection (25 Designs)'
            : isHindi
            ? 'धनतेरस २०२६ फोटो ग्रीटिंग संग्रह (१० लेआउट्स)'
            : 'Dhanteras 2026 Photo Greetings Collection (10 Layouts)',
        badgeCount: mode === 'simple' ? '25 / 25 Ready' : '10 / 10 Ready',
      };
    }
    return {
      emoji: '🪔',
      title:
        mode === 'simple'
          ? isHindi
            ? 'दीपावली २०२६ सिंपल ग्रीटिंग संग्रह (१०० डिज़ाइन)'
            : 'Diwali 2026 Simple Greetings Collection (100 Designs)'
          : isHindi
          ? 'दीपावली २०२६ फोटो ग्रीटिंग संग्रह (१४ लेआउट्स)'
          : 'Diwali 2026 Photo Greetings Collection (14 Layouts)',
      badgeCount: mode === 'simple' ? '100 / 100 Ready' : '14 / 14 Ready',
    };
  };

  // Selected Festival (defaults to 'auto' so nearest upcoming festival displays first)
  const festivalParam = defaultFestivalId || searchParams.get('festival') || 'auto';
  const [selectedFestivalId, setSelectedFestivalId] = useState<string>(festivalParam);

  useEffect(() => {
    const urlFestival = defaultFestivalId || searchParams.get('festival') || 'auto';
    if (urlFestival !== selectedFestivalId) {
      setSelectedFestivalId(urlFestival);
    }
  }, [searchParams, defaultFestivalId, selectedFestivalId]);

  useEffect(() => {
    if (defaultGreetingMode && defaultGreetingMode !== greetingMode) {
      setGreetingMode(defaultGreetingMode);
    }
  }, [defaultGreetingMode]);

  const activeFestivalKey = selectedFestivalId === 'auto' ? p1FestivalId : selectedFestivalId;

  const currentSimpleTemplates = useMemo(
    () => getGreetingsByFestival(activeFestivalKey),
    [activeFestivalKey]
  );
  const currentPhotoTemplates = useMemo(
    () => getPhotoTemplatesByFestival(activeFestivalKey),
    [activeFestivalKey]
  );

  // Priority 1 and Priority 2 template sets for structured Auto mode
  const p1SimpleTemplates = useMemo(() => getGreetingsByFestival(p1FestivalId), [p1FestivalId]);
  const p1PhotoTemplates = useMemo(() => getPhotoTemplatesByFestival(p1FestivalId), [p1FestivalId]);
  const p2SimpleTemplates = useMemo(() => getGreetingsByFestival(p2FestivalId), [p2FestivalId]);
  const p2PhotoTemplates = useMemo(() => getPhotoTemplatesByFestival(p2FestivalId), [p2FestivalId]);

  // Selected Relationship
  const [selectedRelationship, setSelectedRelationship] = useState<string>('none');

  // Greeting Mode: Simple (100 designs) vs Photo (14 layouts)
  const modeParam = searchParams.get('mode');
  const templateParam = searchParams.get('template');
  const initialMode: 'simple' | 'photo' =
    defaultGreetingMode || (modeParam === 'photo' || (templateParam && templateParam.startsWith('photo-')) ? 'photo' : 'simple');
  const [greetingMode, setGreetingMode] = useState<'simple' | 'photo'>(initialMode);

  // Active Template
  const initialTemplateId = templateParam || (
    activeFestivalKey === 'dhanteras'
      ? (initialMode === 'photo' ? 'photo-dhanteras-royal-portrait' : 'dhanteras-royal-gold-purple')
      : activeFestivalKey === 'chhath-puja'
      ? (initialMode === 'photo' ? 'photo-chhath-surya-halo' : 'chhath-surya-arghya-imperial')
      : (initialMode === 'photo' ? 'photo-royal-portrait' : 'sovereign-lotus')
  );
  const initialTemplate =
    ALL_GREETING_TEMPLATES.find((t) => t.id === initialTemplateId) || ALL_GREETING_TEMPLATES[0];

  const [activeTemplate, setActiveTemplate] = useState<GreetingTemplate>(initialTemplate);
  const [viewMode, setViewMode] = useState<'gallery' | 'editor'>(
    searchParams.get('edit') === 'true' ? 'editor' : 'gallery'
  );
  const [format, setFormat] = useState<OutputFormat>('square');
  const [activeTab, setActiveTab] = useState<EditorTab>(
    initialTemplate.category === 'photo-studio' ? 'photo' : 'text'
  );

  // Status and feedback states
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Layout calculations for active template & format
  const isPhotoTemplate = activeTemplate.category === 'photo-studio' || activeTemplate.id.startsWith('photo-');
  const currentLayout = useMemo(
    () => computeLayout(format, isPhotoTemplate, activeTemplate.id),
    [format, isPhotoTemplate, activeTemplate.id]
  );

  // Initialize customization state from template
  const createDefaultCustomization = useCallback(
    (tpl: GreetingTemplate, relId?: string): CardCustomization => {
      const rel = relId || selectedRelationship;
      const t = tpl.defaultText;
      return {
        title: language === 'hi' ? t.titleHi : language === 'hinglish' ? t.titleHinglish || t.titleHi || t.titleEn : t.titleEn,
        subtitle: language === 'hi' ? t.subtitleHi : language === 'hinglish' ? t.subtitleHinglish || t.subtitleHi || t.subtitleEn : t.subtitleEn,
        recipient: language === 'hi' ? t.recipientHi : language === 'hinglish' ? t.recipientHinglish || t.recipientHi || t.recipientEn : t.recipientEn,
        message: language === 'hi' ? t.messageHi : language === 'hinglish' ? t.messageHinglish || t.messageHi || t.messageEn : t.messageEn,
        sender: language === 'hi' ? t.senderHi : language === 'hinglish' ? t.senderHinglish || t.senderHi || t.senderEn : t.senderEn,
        relationship: rel !== 'none' ? rel : undefined,
        fontFamily: tpl.defaultText.fontFamily,
        titleFontSize: tpl.defaultText.titleFontSize,
        bodyFontSize: tpl.defaultText.bodyFontSize,
        textColor: tpl.palette.textPrimary,
        accentColor: tpl.palette.gold,
        textAlign: tpl.defaultText.textAlign,
        hasTextShadow: true,
        showBorder: true,
        showOrnaments: true,
        showParticles: tpl.decorative.hasParticles,
        borderStyle: tpl.decorative.borderStyle,
        bgVariant: 'default',
      };
    },
    [language, selectedRelationship]
  );

  const {
    customization,
    pushState,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
  } = useEditorHistory(createDefaultCustomization(activeTemplate));

  // Sync with URL query parameter
  const lastTemplateParamRef = React.useRef<string | null>(templateParam);
  const lastModeParamRef = React.useRef<string | null>(modeParam);
  useEffect(() => {
    const currentMode = searchParams.get('mode');
    const currentTemplate = searchParams.get('template');

    if (currentMode && currentMode !== lastModeParamRef.current) {
      lastModeParamRef.current = currentMode;
      if (currentMode === 'photo' || currentMode === 'simple') {
        setGreetingMode(currentMode);
      }
    }

    if (currentTemplate && currentTemplate !== lastTemplateParamRef.current) {
      lastTemplateParamRef.current = currentTemplate;
      const found = ALL_GREETING_TEMPLATES.find((t) => t.id === currentTemplate);
      if (found) {
        setActiveTemplate(found);
        reset(createDefaultCustomization(found));
        if (searchParams.get('edit') === 'true') {
          setViewMode('editor');
        }
        if (found.category === 'photo-studio' || found.id.startsWith('photo-')) {
          setGreetingMode('photo');
          setActiveTab('photo');
        } else {
          setGreetingMode('simple');
          setActiveTab('text');
        }
      }
    }
  }, [searchParams, createDefaultCustomization, reset]);

  // When language switches, update texts if user hasn't heavily customized
  useEffect(() => {
    const t = activeTemplate.defaultText;
    pushState(
      {
        ...customization,
        title: language === 'hi' ? t.titleHi : language === 'hinglish' ? t.titleHinglish || t.titleHi || t.titleEn : t.titleEn,
        subtitle: language === 'hi' ? t.subtitleHi : language === 'hinglish' ? t.subtitleHinglish || t.subtitleHi || t.subtitleEn : t.subtitleEn,
        recipient: language === 'hi' ? t.recipientHi : language === 'hinglish' ? t.recipientHinglish || t.recipientHi || t.recipientEn : t.recipientEn,
        message: language === 'hi' ? t.messageHi : language === 'hinglish' ? t.messageHinglish || t.messageHi || t.messageEn : t.messageEn,
        sender: language === 'hi' ? t.senderHi : language === 'hinglish' ? t.senderHinglish || t.senderHi || t.senderEn : t.senderEn,
      },
      true
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // Available editor tabs based on template type (Strict Simple vs Photo separation)
  const editorTabs = useMemo(() => {
    if (isPhotoTemplate) {
      return [
        { id: 'photo' as const, icon: <Camera className="w-4 h-4" />, labelEn: 'Photo', labelHi: 'तस्वीर' },
        { id: 'text' as const, icon: <Type className="w-4 h-4" />, labelEn: 'Text', labelHi: 'संदेश' },
        { id: 'design' as const, icon: <Palette className="w-4 h-4" />, labelEn: 'Design', labelHi: 'सजावट' },
      ];
    }
    return [
      { id: 'text' as const, icon: <Type className="w-4 h-4" />, labelEn: 'Text', labelHi: 'संदेश' },
      { id: 'design' as const, icon: <Palette className="w-4 h-4" />, labelEn: 'Design', labelHi: 'सजावट' },
    ];
  }, [isPhotoTemplate]);

  // Ensure Simple Greetings never stay on Photo tab
  useEffect(() => {
    if (!isPhotoTemplate && activeTab === 'photo') {
      setActiveTab('text');
    }
  }, [isPhotoTemplate, activeTab]);

  const handleFestivalChange = useCallback(
    (newFestId: string) => {
      setSelectedFestivalId(newFestId);
      const effectiveFestId = newFestId === 'auto' ? p1FestivalId : newFestId;
      const simples = getGreetingsByFestival(effectiveFestId);
      const photos = getPhotoTemplatesByFestival(effectiveFestId);
      const nextTpl =
        greetingMode === 'photo'
          ? (photos[0] || simples[0])
          : (simples[0] || photos[0]);
      if (nextTpl) {
        setActiveTemplate(nextTpl);
        reset(createDefaultCustomization(nextTpl, selectedRelationship));
        if (newFestId === 'auto') {
          const newParams = new URLSearchParams(searchParams);
          newParams.delete('festival');
          newParams.set('mode', greetingMode);
          newParams.set('template', nextTpl.id);
          setSearchParams(newParams);
        } else {
          setSearchParams({ festival: newFestId, mode: greetingMode, template: nextTpl.id });
        }
      } else {
        if (newFestId === 'auto') {
          const newParams = new URLSearchParams(searchParams);
          newParams.delete('festival');
          newParams.set('mode', greetingMode);
          setSearchParams(newParams);
        } else {
          setSearchParams({ festival: newFestId, mode: greetingMode });
        }
      }
    },
    [p1FestivalId, greetingMode, selectedRelationship, reset, createDefaultCustomization, searchParams, setSearchParams]
  );

  const handleSelectTemplate = (template: GreetingTemplate, relId?: string) => {
    const effectiveRel = relId || selectedRelationship;
    if (relId) setSelectedRelationship(relId);
    setActiveTemplate(template);
    reset(createDefaultCustomization(template, effectiveRel));
    setViewMode('editor');
    const isPhoto = template.category === 'photo-studio' || template.id.startsWith('photo-');
    if (isPhoto) {
      setGreetingMode('photo');
      setActiveTab('photo');
      setSearchParams({ mode: 'photo', template: template.id, edit: 'true' });
    } else {
      setGreetingMode('simple');
      setActiveTab('text');
      setSearchParams({ mode: 'simple', template: template.id, edit: 'true' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomizationChange = useCallback(
    (updates: Partial<CardCustomization>, immediate = false) => {
      if (updates.relationship) {
        setSelectedRelationship(updates.relationship);
      }
      pushState(updates, immediate);
    },
    [pushState]
  );

  const handleResetDefaults = () => {
    if (window.confirm(isHindi ? 'क्या आप सभी बदलाव रीसेट करना चाहते हैं?' : 'Reset all changes to template defaults?')) {
      reset(createDefaultCustomization(activeTemplate, selectedRelationship));
      showToast(isHindi ? 'परिवर्तन रीसेट कर दिए गए।' : 'Reset to default template settings.');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // High-Resolution PNG Download
  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const blob = await exportCardToBlob(activeTemplate, customization, format);
      downloadCard(blob, activeTemplate.id, format);
      showToast(isHindi ? 'हाई-रेज़ोल्यूशन कार्ड डाउनलोड हो गया!' : 'High-resolution card downloaded!');
    } catch (err) {
      console.error('Download failed:', err);
      showToast(isHindi ? 'कार्ड रेंडर करने में त्रुटि हुई।' : 'Failed to export greeting card.');
    } finally {
      setIsExporting(false);
    }
  };

  // Web Share API with Clipboard Fallback
  const handleShare = async () => {
    setIsExporting(true);
    try {
      const blob = await exportCardToBlob(activeTemplate, customization, format);
      const res = await shareCard(
        blob,
        activeTemplate.id,
        format,
        customization.title,
        `${customization.title}\n\n${customization.message}\n\n${customization.sender}\n\nCreated on FestiveWala.com`
      );

      if (res.mode === 'native') {
        showToast(isHindi ? 'कार्ड साझा किया गया!' : 'Card shared successfully!');
      } else if (res.mode === 'download_and_copy') {
        showToast(isHindi ? 'कार्ड डाउनलोड हुआ एवं संदेश कॉपी हो गया!' : 'Card downloaded & message copied to clipboard!');
      }
    } catch (err) {
      console.error('Share failed:', err);
      showToast(isHindi ? 'कार्ड साझा करने में असमर्थ।' : 'Unable to share greeting card.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#11071F] text-[#FAF7F0] pt-6 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#F2D98B] text-[#24113D] font-bold text-xs shadow-2xl flex items-center gap-2 border border-white/40 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#24113D]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header / Title Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#F2D98B]/15 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24113D] border border-[#F2D98B]/30 text-xs text-[#F2D98B] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isHindi ? 'शाही ग्रीटिंग स्टूडियो • फेज़ ३' : 'Premium Greeting Studio • Phase 3'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#FAF7F0]">
              {selectedFestivalId === 'dhanteras'
                ? isHindi
                  ? 'धनतेरस २०२६ ग्रीटिंग कार्ड व फोटो मेकर'
                  : 'Free Dhanteras Greeting Card Maker'
                : selectedFestivalId === 'diwali'
                ? isHindi
                  ? 'दिवाली २०२६ ग्रीटिंग कार्ड व फोटो मेकर'
                  : 'Free Diwali Greeting Card Maker'
                : isHindi
                ? 'फ्री ऑनलाइन ग्रीटिंग कार्ड मेकर — फोटो व नाम सहित'
                : 'Free Online Greeting Card Maker — Photo & Name'}
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF7F0]/70 mt-1">
              {isHindi
                ? 'निःशुल्क • बिना लॉगिन • १००% व्यक्तिगत गोपनीयता • तुरंत हाई-रेज़ोल्यूशन डाउनलोड'
                : '100% Free • No Login Required • Client-Side Privacy • High-Resolution PNG Export'}
            </p>
          </div>

          {/* Mode Switcher Button */}
          <div className="flex items-center gap-2">
            {viewMode === 'editor' ? (
              <button
                type="button"
                onClick={() => {
                  setViewMode('gallery');
                  setSearchParams({ mode: greetingMode, template: activeTemplate.id });
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#24113D] hover:bg-[#321752] border border-[#F2D98B]/30 text-xs font-semibold text-[#F2D98B] transition-colors min-h-[44px]"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>
                  {greetingMode === 'simple'
                    ? (isHindi ? 'सभी १०० सिंपल डिज़ाइन देखें' : 'Browse 100 Simple Designs')
                    : (isHindi ? 'सभी १४ फोटो लेआउट देखें' : 'Browse 14 Photo Layouts')}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setViewMode('editor')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F2D98B] text-[#24113D] font-bold text-xs shadow-md transition-colors min-h-[44px]"
              >
                <span>{isHindi ? 'एडिटर खोलें' : 'Open Active Editor'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Festival Selector Bar */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-[#F2D98B] uppercase tracking-wider mb-1.5">
            {isHindi ? 'पर्व चुनें' : 'Select Celebration'}
          </label>
          <FestivalSelector
            selectedFestivalId={selectedFestivalId}
            onSelectFestival={handleFestivalChange}
            isHindi={isHindi}
          />
        </div>

        {/* VIEW 1: TEMPLATE GALLERY */}
        {viewMode === 'gallery' ? (
          selectedFestivalId === 'auto' ? (
            (() => {
              const p1Meta = getFestivalHeadingMeta(p1FestivalId, greetingMode);
              const p2Meta = getFestivalHeadingMeta(p2FestivalId, greetingMode);
              return (
                <div className="space-y-12">
                  {/* SECTION 1: PRIORITY 1 UPCOMING FESTIVAL */}
                  <div data-testid="greeting-priority-1-section" className="rounded-3xl p-4 sm:p-6 bg-[#160B26]/80 border border-[#F2D98B]/30 shadow-xl">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#F2D98B]/20 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#F2D98B]/20 text-[#F2D98B] border border-[#F2D98B]/40 text-[10px] font-bold uppercase tracking-wider">
                          {isHindi ? 'प्रथम आगामी पर्व' : 'Priority 1 • Nearest Festival'}
                        </span>
                        <h2 className="text-lg sm:text-xl font-bold text-[#FAF7F0] flex items-center gap-2">
                          <span>{p1Meta.emoji}</span>
                          <span>{p1Meta.title}</span>
                        </h2>
                      </div>
                      <span className="text-xs text-[#F2D98B] font-mono">{p1Meta.badgeCount}</span>
                    </div>

                    <TemplateGallery
                      greetingMode={greetingMode}
                      onGreetingModeChange={(newMode) => {
                        setGreetingMode(newMode);
                        setSearchParams({ mode: newMode });
                      }}
                      simpleTemplates={p1SimpleTemplates}
                      photoTemplates={p1PhotoTemplates}
                      selectedTemplateId={activeTemplate.id}
                      onSelectTemplate={handleSelectTemplate}
                      isHindi={isHindi}
                      isHinglish={isHinglish}
                      language={language}
                      selectedRelationship={selectedRelationship}
                      onRelationshipChange={setSelectedRelationship}
                    />
                  </div>

                  {/* SECTION 2: PRIORITY 2 UPCOMING FESTIVAL */}
                  <div data-testid="greeting-priority-2-section" className="rounded-3xl p-4 sm:p-6 bg-[#18092E]/80 border border-brand-gold/30 shadow-xl">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-brand-gold/20 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase tracking-wider">
                          {isHindi ? 'द्वितीय आगामी पर्व' : 'Priority 2 • Following Celebration'}
                        </span>
                        <h2 className="text-lg sm:text-xl font-bold text-[#FAF7F0] flex items-center gap-2">
                          <span>{p2Meta.emoji}</span>
                          <span>{p2Meta.title}</span>
                        </h2>
                      </div>
                      <span className="text-xs text-[#F2D98B] font-mono">{p2Meta.badgeCount}</span>
                    </div>

                    <TemplateGallery
                      greetingMode={greetingMode}
                      onGreetingModeChange={(newMode) => {
                        setGreetingMode(newMode);
                        setSearchParams({ mode: newMode });
                      }}
                      simpleTemplates={p2SimpleTemplates}
                      photoTemplates={p2PhotoTemplates}
                      selectedTemplateId={activeTemplate.id}
                      onSelectTemplate={handleSelectTemplate}
                      isHindi={isHindi}
                      isHinglish={isHinglish}
                      language={language}
                      selectedRelationship={selectedRelationship}
                      onRelationshipChange={setSelectedRelationship}
                    />
                  </div>
                </div>
              );
            })()
          ) : (
            (() => {
              const explicitMeta = getFestivalHeadingMeta(selectedFestivalId, greetingMode);
              return (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[#FAF7F0] flex items-center gap-2">
                      <span>{explicitMeta.emoji}</span>
                      <span>{explicitMeta.title}</span>
                    </h2>
                    <span className="text-xs text-[#F2D98B] font-mono">{explicitMeta.badgeCount}</span>
                  </div>

              <TemplateGallery
                greetingMode={greetingMode}
                onGreetingModeChange={(newMode) => {
                  setGreetingMode(newMode);
                  if (newMode === 'simple' && (activeTemplate.category === 'photo-studio' || activeTemplate.id.startsWith('photo-'))) {
                    const defSimple = currentSimpleTemplates[0] || ALL_GREETING_TEMPLATES[0];
                    setActiveTemplate(defSimple);
                    reset(createDefaultCustomization(defSimple, selectedRelationship));
                    setSearchParams({ festival: selectedFestivalId, mode: 'simple' });
                  } else if (newMode === 'photo' && activeTemplate.category !== 'photo-studio' && !activeTemplate.id.startsWith('photo-')) {
                    const defPhoto = currentPhotoTemplates[0] || ALL_GREETING_TEMPLATES[0];
                    setActiveTemplate(defPhoto);
                    reset(createDefaultCustomization(defPhoto, selectedRelationship));
                    setSearchParams({ festival: selectedFestivalId, mode: 'photo' });
                  } else {
                    setSearchParams({ festival: selectedFestivalId, mode: newMode });
                  }
                }}
                simpleTemplates={currentSimpleTemplates}
                photoTemplates={currentPhotoTemplates}
                selectedTemplateId={activeTemplate.id}
                onSelectTemplate={handleSelectTemplate}
                isHindi={isHindi}
                isHinglish={isHinglish}
                language={language}
                selectedRelationship={selectedRelationship}
                onRelationshipChange={setSelectedRelationship}
              />
            </div>
              );
            })()
          )
        ) : (
          /* VIEW 2: FULL PERSONALIZATION STUDIO EDITOR */
          <div className="space-y-6">
            {/* Editor Action Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#1A0E2E]/90 border border-[#F2D98B]/20 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setViewMode('gallery')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#24113D] hover:bg-[#321752] border border-[#F2D98B]/20 text-xs font-semibold text-[#FAF7F0] transition-colors min-h-[44px]"
              >
                <ChevronLeft className="w-4 h-4 text-[#F2D98B]" />
                <span>{isHindi ? 'Wapas Jayein' : isHinglish ? 'Wapas Jayein' : 'Back'}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#FAF7F0] hidden sm:inline">
                  {isHindi ? activeTemplate.nameHi : isHinglish ? (activeTemplate.nameHinglish || activeTemplate.name) : activeTemplate.name}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F2D98B]/10 text-[#F2D98B] border border-[#F2D98B]/30">
                  {isHindi ? activeTemplate.badgeHi : isHinglish ? (activeTemplate.badgeHinglish || activeTemplate.badge) : activeTemplate.badge}
                </span>
              </div>

              {/* History Controls (Undo, Redo, Reset) */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={!canUndo}
                  onClick={undo}
                  title={isHindi ? 'पूर्ववत करें (Undo)' : 'Undo'}
                  className="p-2 rounded-lg bg-[#24113D] border border-[#F2D98B]/20 text-[#FAF7F0] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#321752] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <Undo className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  disabled={!canRedo}
                  onClick={redo}
                  title={isHindi ? 'फिर से करें (Redo)' : 'Redo'}
                  className="p-2 rounded-lg bg-[#24113D] border border-[#F2D98B]/20 text-[#FAF7F0] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#321752] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <Redo className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleResetDefaults}
                  title={isHindi ? 'Dobara Set Karein' : 'Reset'}
                  className="p-2 rounded-lg bg-[#24113D] border border-[#F2D98B]/20 text-[#FAF7F0] hover:bg-[#321752] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <RotateCcw className="w-4 h-4 text-[#F2D98B]" />
                </button>
              </div>
            </div>

            {/* Format Selector Bar */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <FormatSelector
                currentFormat={format}
                onFormatChange={setFormat}
                isHindi={isHindi}
              />
              <span className="text-[11px] text-[#FAF7F0]/60 hidden md:inline">
                {isHindi
                  ? 'स्वरूप बदलते ही डिज़ाइन स्वतः समायोजित होता है'
                  : isHinglish
                    ? 'Format change karte hi design auto-adjust ho jayega'
                    : 'Design auto-adapts without stretching'}
              </span>
            </div>

            {/* Main Editor Work Area: Left Controls + Center Canvas Stage (Desktop: 2-3 col layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left / Bottom Editing Drawer (5 cols on desktop, full width on mobile) */}
              <div className="lg:col-span-5 order-2 lg:order-1 rounded-2xl bg-[#160B26]/90 border border-[#F2D98B]/25 p-4 sm:p-5 backdrop-blur-md shadow-2xl">
                {/* Editor Tab Navigation */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#24113D] border border-[#F2D98B]/20 mb-5">
                  {editorTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all min-h-[44px] ${activeTab === tab.id
                          ? 'bg-[#F2D98B] text-[#24113D] shadow-md font-bold'
                          : 'text-[#FAF7F0]/80 hover:text-[#FAF7F0]'
                        }`}
                    >
                      {tab.icon}
                      <span>{isHindi ? tab.labelHi : tab.labelEn}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content Panels */}
                <div className="space-y-4 max-h-none overflow-visible lg:max-h-[76vh] lg:overflow-y-auto lg:pr-2">
                  {activeTab === 'text' && (
                    <TextControls
                      customization={customization}
                      onChange={handleCustomizationChange}
                      isHindi={isHindi}
                    />
                  )}

                  {activeTab === 'design' && (
                    <DesignControls
                      customization={customization}
                      onChange={handleCustomizationChange}
                      isHindi={isHindi}
                    />
                  )}

                  {activeTab === 'photo' && isPhotoTemplate && (
                    <PhotoControls
                      customization={customization}
                      onChange={handleCustomizationChange}
                      isHindi={isHindi}
                      photoSlotCount={currentLayout.photoFrame.slots?.length || activeTemplate.decorative.photoSlotCount || 1}
                      frameShape={currentLayout.photoFrame.shape || activeTemplate.decorative.photoFrameShape || 'rounded-rect'}
                      frameAspect={currentLayout.photoFrame.width / currentLayout.photoFrame.height}
                      photoFrameGeometry={currentLayout.photoFrame}
                    />
                  )}
                </div>
              </div>

              {/* Center / Top Prominent Canvas Preview Stage (7 cols on desktop, full width on mobile) */}
              <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-center justify-center">
                <CanvasPreview
                  template={activeTemplate}
                  customization={customization}
                  format={format}
                  className="w-full"
                  isPhotoAdjusting={isPhotoTemplate && activeTab === 'photo'}
                  onPhotoUpdate={(updates, immediate) => {
                    const currentPhoto = customization.photo;
                    if (!currentPhoto) return;
                    handleCustomizationChange({ photo: { ...currentPhoto, ...updates } }, immediate);
                  }}
                  isHindi={isHindi}
                />

                {/* Quick Helper Notes */}
                <div className="mt-3 text-center text-xs text-[#FAF7F0]/60 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    {isHindi
                      ? 'लाइव पूर्वावलोकन • डाउनलोड के समय १०८०p+ मूल रिज़ॉल्यूशन पर रेंडर होता है'
                      : isHinglish
                        ? 'Live preview • Download karne par 1080p+ high resolution mein render hoga'
                        : 'Live preview • Exports at native 1080p+ ultra high-resolution'}
                  </span>
                </div>
              </div>
            </div>

            {/* Fixed Bottom Action Floating Bar for Instant Download & Share */}
            <div className="sticky bottom-4 z-40 max-w-xl mx-auto p-2.5 rounded-2xl bg-[#24113D]/95 border-2 border-[#F2D98B] backdrop-blur-xl shadow-2xl flex items-center gap-3">
              <button
                type="button"
                disabled={isExporting}
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#F2D98B] to-[#D4AF37] text-[#24113D] font-bold text-sm shadow-lg hover:brightness-105 active:scale-95 transition-all disabled:opacity-50 min-h-[48px]"
              >
                <Download className="w-4 h-4 text-[#24113D]" />
                <span>
                  {isExporting
                    ? isHindi
                      ? 'डाउनलोड हो रहा है...'
                      : isHinglish
                        ? 'Download ho raha hai...'
                        : 'Generating PNG...'
                    : isHindi
                      ? 'डाउनलोड करें'
                      : isHinglish
                        ? 'Download Karein'
                        : 'Download'}
                </span>
              </button>

              <button
                type="button"
                disabled={isExporting}
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#160B26] hover:bg-[#321752] border border-[#F2D98B]/50 text-[#F2D98B] font-bold text-sm shadow-md active:scale-95 transition-all disabled:opacity-50 min-h-[48px]"
              >
                <Share2 className="w-4 h-4 text-[#F2D98B]" />
                <span>
                  {isHindi
                    ? 'ग्रीटिंग शेयर करें'
                    : isHinglish
                      ? 'Greeting Share Karein'
                      : 'Share Greeting'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

