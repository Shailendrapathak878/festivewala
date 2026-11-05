import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { GreetingTemplate, OutputFormat } from '../types/template';
import type { CardCustomization, UserPhoto } from '../types/editor';
import { FORMAT_DIMENSIONS } from '../types/template';
import { renderCardToCanvas } from '../services/canvasRenderer';
import { Move, Check } from 'lucide-react';

interface CanvasPreviewProps {
  template: GreetingTemplate;
  customization: CardCustomization;
  format: OutputFormat;
  className?: string;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
  isPhotoAdjusting?: boolean;
  onPhotoUpdate?: (updates: Partial<UserPhoto>, immediate?: boolean) => void;
  isHindi?: boolean;
}

const CanvasPreviewComponent: React.FC<CanvasPreviewProps> = ({
  template,
  customization,
  format,
  className = '',
  onCanvasReady,
  isPhotoAdjusting = false,
  onPhotoUpdate,
  isHindi = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const renderTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const renderSeqRef = useRef<number>(0);
  const prevTemplateIdRef = useRef<string>(template.id);
  const prevFormatRef = useRef<OutputFormat>(format);
  const isInitialRenderRef = useRef<boolean>(true);

  // Direct photo drag manipulation on greeting card preview
  const [isRepositionMode, setIsRepositionMode] = useState(false);
  const [isPhotoDragging, setIsPhotoDragging] = useState(false);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    initialPanX: number;
    initialPanY: number;
    initialNormPanX: number;
    initialNormPanY: number;
    hasExceededThreshold?: boolean;
    pointerId?: number;
  } | null>(null);

  // Reset reposition mode whenever active template, format, or tab changes
  useEffect(() => {
    setIsRepositionMode(false);
    setIsPhotoDragging(false);
    dragStartRef.current = null;
  }, [template.id, format, isPhotoAdjusting]);
  const currentDragPanRef = useRef<{ panX: number; panY: number; normPanX: number; normPanY: number }>({
    panX: 0,
    panY: 0,
    normPanX: 0,
    normPanY: 0,
  });
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef<number>(1.0);

  const executeRender = useCallback(async () => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const formatDims = FORMAT_DIMENSIONS[format];

    // Compute preview scale based on available container width
    const containerWidth = container.clientWidth || 360;
    const maxAvailableHeight = window.innerHeight * 0.58; // Ensure preview doesn't push mobile controls off-screen

    const scaleW = containerWidth / formatDims.width;
    const scaleH = maxAvailableHeight / formatDims.height;
    const scale = Math.min(scaleW, scaleH, 0.65); // Cap preview scale for high performance

    const seq = ++renderSeqRef.current;
    if (isInitialRenderRef.current) {
      setIsRendering(true);
    }

    try {
      await renderCardToCanvas({
        canvas,
        template,
        customization,
        format,
        scale: Math.max(scale, 0.25),
      });

      // Discard if a newer render sequence arrived during processing
      if (renderSeqRef.current !== seq) return;
      if (onCanvasReady) onCanvasReady(canvas);
      isInitialRenderRef.current = false;
    } catch (err) {
      console.error('Error rendering card to preview canvas:', err);
    } finally {
      if (renderSeqRef.current === seq) {
        setIsRendering(false);
      }
    }
  }, [template, customization, format, onCanvasReady]);

  useEffect(() => {
    const isMajorChange =
      isInitialRenderRef.current ||
      prevTemplateIdRef.current !== template.id ||
      prevFormatRef.current !== format;

    prevTemplateIdRef.current = template.id;
    prevFormatRef.current = format;

    if (renderTimerRef.current) {
      clearTimeout(renderTimerRef.current);
      renderTimerRef.current = null;
    }

    if (isMajorChange) {
      requestAnimationFrame(() => {
        executeRender();
      });
    } else {
      // 60ms debounce during continuous typing bursts
      renderTimerRef.current = setTimeout(() => {
        requestAnimationFrame(() => {
          executeRender();
        });
        renderTimerRef.current = null;
      }, 60);
    }

    return () => {
      if (renderTimerRef.current) {
        clearTimeout(renderTimerRef.current);
      }
    };
  }, [executeRender, template.id, format]);

  useEffect(() => {
    const handleResize = () => {
      executeRender();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [executeRender]);

  // Explicit Pointer event handlers for intentional photo repositioning on the greeting card
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Direct dragging on card preview strictly requires intentional Reposition Mode to prevent scroll conflicts
    if (!isRepositionMode || !isPhotoAdjusting || !onPhotoUpdate || !customization.photo?.dataUrl) return;

    const frameBaseW = 440;
    const frameBaseH = 440;
    const initialNormPanX = customization.photo.normalizedPanX !== undefined
      ? customization.photo.normalizedPanX
      : (customization.photo.panX || 0) / frameBaseW;
    const initialNormPanY = customization.photo.normalizedPanY !== undefined
      ? customization.photo.normalizedPanY
      : (customization.photo.panY || 0) / frameBaseH;

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialPanX: customization.photo.panX || 0,
      initialPanY: customization.photo.panY || 0,
      initialNormPanX,
      initialNormPanY,
      hasExceededThreshold: false,
      pointerId: e.pointerId,
    };
    currentDragPanRef.current = {
      panX: customization.photo.panX || 0,
      panY: customization.photo.panY || 0,
      normPanX: initialNormPanX,
      normPanY: initialNormPanY,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isRepositionMode || !dragStartRef.current || !onPhotoUpdate || !customization.photo) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const formatDims = FORMAT_DIMENSIONS[format];
    const scaleFactor = formatDims.width / Math.max(1, rect.width);

    const rawDx = e.clientX - dragStartRef.current.x;
    const rawDy = e.clientY - dragStartRef.current.y;
    const dist = Math.hypot(rawDx, rawDy);

    // Intentional drag threshold: 5px movement required before initiating drag
    if (!dragStartRef.current.hasExceededThreshold) {
      if (dist < 5) return;
      dragStartRef.current.hasExceededThreshold = true;
      setIsPhotoDragging(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }

    const dx = rawDx * scaleFactor;
    const dy = rawDy * scaleFactor;

    const frameBaseW = 440;
    const frameBaseH = 440;
    const deltaNormX = dx / frameBaseW;
    const deltaNormY = dy / frameBaseH;

    const nextNormPanX = parseFloat((dragStartRef.current.initialNormPanX + deltaNormX).toFixed(4));
    const nextNormPanY = parseFloat((dragStartRef.current.initialNormPanY + deltaNormY).toFixed(4));
    const nextPanX = Math.round(nextNormPanX * frameBaseW);
    const nextPanY = Math.round(nextNormPanY * frameBaseH);

    currentDragPanRef.current = {
      panX: nextPanX,
      panY: nextPanY,
      normPanX: nextNormPanX,
      normPanY: nextNormPanY,
    };

    onPhotoUpdate(
      {
        normalizedPanX: nextNormPanX,
        normalizedPanY: nextNormPanY,
        panX: nextPanX,
        panY: nextPanY,
      },
      false
    );
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    if (isPhotoDragging && dragStartRef.current && onPhotoUpdate) {
      onPhotoUpdate(
        {
          normalizedPanX: currentDragPanRef.current.normPanX,
          normalizedPanY: currentDragPanRef.current.normPanY,
          panX: currentDragPanRef.current.panX,
          panY: currentDragPanRef.current.panY,
        },
        true
      );
    }
    setIsPhotoDragging(false);
    dragStartRef.current = null;
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsPhotoDragging(false);
    dragStartRef.current = null;
  };

  // Mouse wheel zoom directly on greeting card canvas (active only when explicitly in reposition mode)
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (!isRepositionMode || !isPhotoAdjusting || !onPhotoUpdate || !customization.photo?.dataUrl) return;
    e.preventDefault();
    const zoomDelta = -e.deltaY * 0.0015;
    const currentZoom = customization.photo.zoom || 1.0;
    const nextZoom = Math.max(0.5, Math.min(3.0, parseFloat((currentZoom + zoomDelta).toFixed(2))));
    onPhotoUpdate({ zoom: nextZoom }, true);
  };

  // Touch Pinch-to-Zoom directly on greeting card preview (active only in reposition mode)
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isRepositionMode || !isPhotoAdjusting || !customization.photo?.dataUrl) return;
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      pinchStartDistRef.current = dist;
      pinchStartZoomRef.current = customization.photo.zoom || 1.0;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isRepositionMode || !isPhotoAdjusting || !onPhotoUpdate || !customization.photo) return;
    if (e.touches.length === 2 && pinchStartDistRef.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / pinchStartDistRef.current;
      const nextZoom = Math.max(0.5, Math.min(3.0, parseFloat((pinchStartZoomRef.current * factor).toFixed(2))));
      onPhotoUpdate({ zoom: nextZoom }, false);
    }
  };

  const handleTouchEnd = () => {
    pinchStartDistRef.current = null;
  };

  const { width, height } = FORMAT_DIMENSIONS[format];
  const aspectRatio = `${width} / ${height}`;
  const hasActivePhoto = Boolean(customization.photo?.dataUrl);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center w-full max-w-lg mx-auto p-2 sm:p-4 rounded-2xl bg-[#160B26]/80 backdrop-blur-md border border-[#F2D98B]/20 shadow-2xl transition-all duration-300 ${className}`}
    >
      <div
        className="relative overflow-hidden rounded-xl shadow-2xl transition-all duration-300 flex items-center justify-center"
        style={{
          aspectRatio,
          maxHeight: '58vh',
        }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`block w-full h-full object-contain rounded-xl select-none transition-shadow ${
            isRepositionMode
              ? isPhotoDragging
                ? 'cursor-grabbing ring-2 ring-[#F2D98B]'
                : 'cursor-grab ring-2 ring-[#F2D98B]/80'
              : ''
          }`}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            touchAction: isRepositionMode ? 'none' : 'pan-y',
          }}
          title={
            isPhotoAdjusting && hasActivePhoto
              ? isRepositionMode
                ? (isHindi ? 'फोटो ड्रैग करें या पिंच से ज़ूम करें' : 'Drag photo to position • Pinch/Wheel to zoom')
                : (isHindi ? 'फोटो रीपोजिशन बटन दबाकर एडजस्ट करें' : 'Tap Reposition Photo to adjust')
              : undefined
          }
        />

        {/* Explicit Reposition Mode Controls */}
        {isPhotoAdjusting && hasActivePhoto && (
          <>
            {!isRepositionMode ? (
              <button
                type="button"
                onClick={() => setIsRepositionMode(true)}
                className="absolute top-2.5 right-2.5 z-20 px-3 py-1.5 rounded-full bg-[#24113D]/95 hover:bg-[#38165E] border border-[#F2D98B]/50 hover:border-[#F2D98B] text-[#F2D98B] text-xs font-semibold shadow-xl backdrop-blur-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                title={isHindi ? 'फोटो रीपोजिशन मोड चालू करें' : 'Tap to reposition photo inside frame'}
                aria-label={isHindi ? 'फोटो रीपोजिशन मोड चालू करें' : 'Reposition Photo'}
              >
                <Move className="w-3.5 h-3.5 text-[#F2D98B]" />
                <span>{isHindi ? 'फोटो रीपोजिशन करें' : 'Reposition Photo'}</span>
              </button>
            ) : (
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#24113D]/95 border-2 border-[#F2D98B] shadow-2xl backdrop-blur-md animate-in fade-in">
                <div className="flex items-center gap-1.5 text-xs text-[#F2D98B] font-medium pr-1">
                  <Move className="w-3.5 h-3.5 animate-pulse text-[#F2D98B]" />
                  <span>{isHindi ? 'फोटो ड्रैग करें • पिंच से ज़ूम करें' : 'Drag photo • Pinch to zoom'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsRepositionMode(false);
                    setIsPhotoDragging(false);
                    dragStartRef.current = null;
                  }}
                  className="px-2.5 py-0.5 rounded-full bg-[#F2D98B] hover:bg-white text-[#24113D] text-xs font-bold shadow transition-colors active:scale-95 flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'संपन्न (Lock)' : 'Done'}</span>
                </button>
              </div>
            )}
          </>
        )}

        {isRendering && (
          <div className="absolute inset-0 bg-[#24113D]/30 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-200 pointer-events-none">
            <div className="w-8 h-8 rounded-full border-2 border-[#F2D98B] border-t-transparent animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export const CanvasPreview = React.memo(CanvasPreviewComponent);
