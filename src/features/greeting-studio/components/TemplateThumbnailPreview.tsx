import React, { useRef, useEffect, useState } from 'react';
import type { GreetingTemplate } from '../types/template';
import type { CardCustomization } from '../types/editor';
import { renderCardToCanvas } from '../services/canvasRenderer';

interface TemplateThumbnailPreviewProps {
  template: GreetingTemplate;
  isHindi: boolean;
  isHinglish?: boolean;
  language?: 'en' | 'hi' | 'hinglish';
  className?: string;
}

// Global in-memory cache for rendered thumbnails to avoid redundant Canvas redraws
const THUMBNAIL_CACHE = new Map<string, string>();

export const TemplateThumbnailPreview: React.FC<TemplateThumbnailPreviewProps> = ({
  template,
  isHindi,
  isHinglish = false,
  language,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeLang = language || (isHindi ? 'hi' : isHinglish ? 'hinglish' : 'en');
  const cacheKey = `${template.id}-${activeLang}`;
  const [cachedUrl, setCachedUrl] = useState<string | null>(() => THUMBNAIL_CACHE.get(cacheKey) || null);
  const [isRendering, setIsRendering] = useState(false);

  useEffect(() => {
    // If already cached in memory, use it directly
    const existing = THUMBNAIL_CACHE.get(cacheKey);
    if (existing) {
      setCachedUrl(existing);
      return;
    }

    let isCancelled = false;
    setIsRendering(true);

    const render = async () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;

      const title =
        activeLang === 'hi'
          ? template.defaultText.titleHi
          : activeLang === 'hinglish'
          ? (template.defaultText.titleHinglish || template.defaultText.titleEn)
          : template.defaultText.titleEn;

      const subtitle =
        activeLang === 'hi'
          ? template.defaultText.subtitleHi
          : activeLang === 'hinglish'
          ? (template.defaultText.subtitleHinglish || template.defaultText.subtitleEn)
          : template.defaultText.subtitleEn;

      const recipient =
        activeLang === 'hi'
          ? template.defaultText.recipientHi
          : activeLang === 'hinglish'
          ? (template.defaultText.recipientHinglish || template.defaultText.recipientEn)
          : template.defaultText.recipientEn;

      const message =
        activeLang === 'hi'
          ? template.defaultText.messageHi
          : activeLang === 'hinglish'
          ? (template.defaultText.messageHinglish || template.defaultText.messageEn)
          : template.defaultText.messageEn;

      const sender =
        activeLang === 'hi'
          ? template.defaultText.senderHi
          : activeLang === 'hinglish'
          ? (template.defaultText.senderHinglish || template.defaultText.senderEn)
          : template.defaultText.senderEn;

      const customization: CardCustomization = {
        title,
        subtitle,
        recipient,
        message,
        sender,
        fontFamily: template.defaultText.fontFamily,
        titleFontSize: template.defaultText.titleFontSize,
        bodyFontSize: template.defaultText.bodyFontSize,
        textColor: template.palette.textPrimary,
        accentColor: template.palette.gold,
        textAlign: template.defaultText.textAlign,
        hasTextShadow: true,
        showBorder: true,
        showOrnaments: true,
        showParticles: template.decorative.hasParticles,
        borderStyle: template.decorative.borderStyle,
        bgVariant: 'default',
      };

      try {
        await renderCardToCanvas({
          canvas,
          template,
          customization,
          format: 'square',
          scale: 0.36, // 388x388 resolution for crisp gallery rendering
        });

        if (!isCancelled) {
          try {
            const dataUrl = canvas.toDataURL('image/webp', 0.88);
            THUMBNAIL_CACHE.set(cacheKey, dataUrl);
            setCachedUrl(dataUrl);
          } catch {
            // If toDataURL fails (e.g. security sandbox), fallback to direct canvas display
          }
          setIsRendering(false);
        }
      } catch (err) {
        console.error(`Failed to render thumbnail for ${template.id}:`, err);
        if (!isCancelled) setIsRendering(false);
      }
    };

    render();

    return () => {
      isCancelled = true;
    };
  }, [template, isHindi, cacheKey]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#160B26] ${className}`}>
      {cachedUrl ? (
        <img
          src={cachedUrl}
          alt={isHindi ? template.nameHi : template.name}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
      ) : (
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            !isRendering ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {isRendering && !cachedUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#24113D]/40">
          <div className="w-6 h-6 border-2 border-[#F2D98B] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
