import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { GreetingTemplate, OutputFormat } from '../types/template';
import type { CardCustomization, UserPhoto } from '../types/editor';
import { FORMAT_DIMENSIONS } from '../types/template';
import { renderCardToCanvas } from '../services/canvasRenderer';
import { Move } from 'lucide-react';

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

export const CanvasPreview: React.FC<CanvasPreviewProps> = ({
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

  // Direct photo drag manipulation on greeting card preview
  const [isPhotoDragging, setIsPhotoDragging] = useState(false);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    initialPanX: number;
    initialPanY: number;
    initialNormPanX: number;
    initialNormPanY: number;
  } | null>(null);
  const currentDragPanRef = useRef<{ panX: number; panY: number; normPanX: number; normPanY: number }>({
    panX: 0,
    panY: 0,
    normPanX: 0,
    normPanY: 0,
  });
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef<number>(1.0);

  const render = useCallback(async () => {
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

    setIsRendering(true);
    try {
      await renderCardToCanvas({
        canvas,
        template,
        customization,
        format,
        scale: Math.max(scale, 0.25),
      });
      if (onCanvasReady) onCanvasReady(canvas);
    } catch (err) {
      console.error('Error rendering card to preview canvas:', err);
    } finally {
      setIsRendering(false);
    }
  }, [template, customization, format, onCanvasReady]);

  useEffect(() => {
    render();

    const handleResize = () => {
      render();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [render]);

  // Pointer event handlers for direct photo repositioning on the greeting card
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPhotoAdjusting || !onPhotoUpdate || !customization.photo?.dataUrl) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsPhotoDragging(true);
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
    };
    currentDragPanRef.current = {
      panX: customization.photo.panX || 0,
      panY: customization.photo.panY || 0,
      normPanX: initialNormPanX,
      normPanY: initialNormPanY,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPhotoDragging || !dragStartRef.current || !onPhotoUpdate || !customization.photo) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const formatDims = FORMAT_DIMENSIONS[format];
    const scaleFactor = formatDims.width / Math.max(1, rect.width);

    const dx = (e.clientX - dragStartRef.current.x) * scaleFactor;
    const dy = (e.clientY - dragStartRef.current.y) * scaleFactor;

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
    if (dragStartRef.current && onPhotoUpdate) {
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

  // Mouse wheel zoom directly on greeting card canvas
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (!isPhotoAdjusting || !onPhotoUpdate || !customization.photo?.dataUrl) return;
    e.preventDefault();
    const zoomDelta = -e.deltaY * 0.0015;
    const currentZoom = customization.photo.zoom || 1.0;
    const nextZoom = Math.max(0.5, Math.min(3.0, parseFloat((currentZoom + zoomDelta).toFixed(2))));
    onPhotoUpdate({ zoom: nextZoom }, true);
  };

  // Touch Pinch-to-Zoom directly on greeting card preview
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isPhotoAdjusting || !customization.photo?.dataUrl) return;
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
    if (!isPhotoAdjusting || !onPhotoUpdate || !customization.photo) return;
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
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`block w-full h-full object-contain rounded-xl select-none ${
            isPhotoAdjusting && hasActivePhoto
              ? isPhotoDragging
                ? 'cursor-grabbing'
                : 'cursor-grab ring-2 ring-[#F2D98B]/60'
              : ''
          }`}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            touchAction: isPhotoAdjusting && hasActivePhoto ? 'none' : 'auto',
          }}
          title={
            isPhotoAdjusting && hasActivePhoto
              ? isHindi
                ? 'Card par photo drag karein ya scroll se zoom karein'
                : 'Drag photo directly on card • Scroll to zoom'
              : undefined
          }
        />

        {/* Floating Helper Pill in Photo Mode */}
        {isPhotoAdjusting && hasActivePhoto && (
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-10 px-2.5 py-1 rounded-full bg-[#24113D]/90 border border-[#F2D98B]/40 text-[#F2D98B] text-[10.5px] font-medium shadow-lg backdrop-blur-sm pointer-events-none flex items-center gap-1.5 transition-opacity">
            <Move className="w-3 h-3 text-[#F2D98B]" />
            <span>
              {isHindi ? 'Card par photo drag karein' : 'Drag photo to position • Wheel to zoom'}
            </span>
          </div>
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
