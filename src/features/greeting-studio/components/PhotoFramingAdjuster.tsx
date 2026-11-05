import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { UserPhoto, FramingMode } from '../types/editor';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
  RefreshCw,
  Move,
  Maximize2,
  Minimize2,
  Trash2,
  Upload,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Target,
  Sliders,
  Sparkles,
  User,
  Users,
  Compass,
} from 'lucide-react';
import { loadImage } from '../services/photoRenderer';
import type { FrameGeometry } from '../services/autoFramingEngine';

interface PhotoFramingAdjusterProps {
  photo: UserPhoto;
  frameShape?: string;
  frameAspect?: number;
  frameGeometry?: FrameGeometry;
  slotLabel?: string;
  onUpdate: (updates: Partial<UserPhoto>, immediate?: boolean) => void;
  onReplace: () => void;
  onRemove: () => void;
  onApply?: () => void;
  onCancel?: () => void;
  onAutoFrame?: (mode?: FramingMode) => void;
  isHindi: boolean;
}

// Trace aperture path helper
function traceAperture(
  ctx: CanvasRenderingContext2D,
  shape: string,
  cx: number,
  cy: number,
  w: number,
  h: number,
  r: number
) {
  const left = cx - w / 2;
  const top = cy - h / 2;

  switch (shape) {
    case 'circle': {
      const circleR = r > 0 ? r : Math.min(w, h) / 2;
      ctx.arc(cx, cy, circleR, 0, Math.PI * 2);
      break;
    }
    case 'oval': {
      const rx = w > 0 ? w / 2 : (r || 100);
      const ry = h > 0 ? h / 2 : (r || 100);
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      break;
    }
    case 'arch': {
      const archR = w / 2;
      ctx.moveTo(left, cy + h / 2);
      ctx.lineTo(left, top + archR);
      ctx.arc(cx, top + archR, archR, Math.PI, 0, false);
      ctx.lineTo(left + w, cy + h / 2);
      ctx.closePath();
      break;
    }
    case 'jharokha': {
      const baseTop = top + h * 0.25;
      ctx.moveTo(left, cy + h / 2);
      ctx.lineTo(left, baseTop);
      ctx.quadraticCurveTo(left, top + h * 0.1, cx - w * 0.18, top + h * 0.08);
      ctx.quadraticCurveTo(cx - w * 0.08, top, cx, top);
      ctx.quadraticCurveTo(cx + w * 0.08, top, cx + w * 0.18, top + h * 0.08);
      ctx.quadraticCurveTo(left + w, top + h * 0.1, left + w, baseTop);
      ctx.lineTo(left + w, cy + h / 2);
      ctx.closePath();
      break;
    }
    case 'polaroid': {
      const bottomMargin = h * 0.22;
      ctx.roundRect(left, top, w, h - bottomMargin, 8);
      break;
    }
    case 'full-bleed':
    case 'split-half':
      ctx.rect(left, top, w, h);
      break;
    case 'rounded-rect':
    default:
      ctx.roundRect(left, top, w, h, 18);
      break;
  }
}

export const PhotoFramingAdjuster: React.FC<PhotoFramingAdjusterProps> = ({
  photo,
  frameShape = 'rounded-rect',
  frameAspect = 1.0,
  frameGeometry,
  slotLabel,
  onUpdate,
  onReplace,
  onRemove,
  onApply,
  onCancel,
  onAutoFrame,
  isHindi,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    initialPanX: number;
    initialPanY: number;
    initialNormPanX: number;
    initialNormPanY: number;
    hasExceededThreshold?: boolean;
    pointerId?: number;
    pointerType?: string;
  } | null>(null);
  const currentDragPanRef = useRef<{ panX: number; panY: number; normPanX: number; normPanY: number }>({
    panX: 0,
    panY: 0,
    normPanX: 0,
    normPanY: 0,
  });
  const [imageLoaded, setImageLoaded] = useState<HTMLImageElement | null>(null);

  // Pinch-to-zoom tracking
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef<number>(1.0);

  // Accordion state for manual adjustment controls (collapsed by default for clean UX)
  const [showManualControls, setShowManualControls] = useState(false);

  // Positive feedback indicator when user clicks Apply Changes
  const [appliedFeedback, setAppliedFeedback] = useState(false);

  // Sync current drag pan with photo props when not actively dragging
  useEffect(() => {
    if (!isDragging) {
      const frameBaseW = frameGeometry?.width || 440;
      const frameBaseH = frameGeometry?.height || 440;
      const normX = photo.normalizedPanX !== undefined ? photo.normalizedPanX : (photo.panX || 0) / frameBaseW;
      const normY = photo.normalizedPanY !== undefined ? photo.normalizedPanY : (photo.panY || 0) / frameBaseH;
      currentDragPanRef.current = {
        panX: photo.panX || 0,
        panY: photo.panY || 0,
        normPanX: normX,
        normPanY: normY,
      };
    }
  }, [photo.panX, photo.panY, photo.normalizedPanX, photo.normalizedPanY, isDragging, frameGeometry]);

  // Load image object whenever dataUrl changes
  useEffect(() => {
    let cancelled = false;
    if (!photo.dataUrl) {
      setImageLoaded(null);
      return;
    }

    loadImage(photo.dataUrl)
      .then((img) => {
        if (!cancelled) setImageLoaded(img);
      })
      .catch((err) => {
        console.error('Failed to load image for framing adjuster:', err);
      });

    return () => {
      cancelled = true;
    };
  }, [photo.dataUrl]);

  // Viewport display dimensions (adaptive to frame aspect ratio)
  const viewW = 320;
  const viewH = Math.round(viewW / Math.max(0.55, Math.min(1.85, frameAspect)));

  // Render the interactive framing preview
  const drawFramingCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = viewW * dpr;
    canvas.height = viewH * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, viewW, viewH);

    // Deep festive ambient background
    const bgGrad = ctx.createRadialGradient(viewW / 2, viewH / 2, 20, viewW / 2, viewH / 2, viewW);
    bgGrad.addColorStop(0, '#1E0E38');
    bgGrad.addColorStop(1, '#0C0318');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, viewW, viewH);

    const apertureMargin = 16;
    const apW = viewW - apertureMargin * 2;
    const apH = viewH - apertureMargin * 2;
    const apCX = viewW / 2;
    const apCY = viewH / 2;
    const apR = Math.min(apW, apH) / 2;

    const imgW = imageLoaded.naturalWidth || 1;
    const imgH = imageLoaded.naturalHeight || 1;

    // Calculate scale
    const fitMode = photo.fitMode || 'cover';
    const scaleCover = Math.max(apW / imgW, apH / imgH);
    const scaleContain = Math.min(apW / imgW, apH / imgH);
    const baseScale = fitMode === 'contain' ? scaleContain : scaleCover;
    const zoom = photo.zoom || 1.0;
    const finalScale = baseScale * zoom;

    const drawW = imgW * finalScale;
    const drawH = imgH * finalScale;

    // Canonical normalized pan offset: guarantees 100% mathematical match across preview, adjuster, and export PNG
    const frameBaseW = frameGeometry?.width || 440;
    const frameBaseH = frameGeometry?.height || 440;
    const effectivePanX = photo.normalizedPanX !== undefined
      ? photo.normalizedPanX * apW
      : (photo.panX || 0) * (apW / frameBaseW);
    const effectivePanY = photo.normalizedPanY !== undefined
      ? photo.normalizedPanY * apH
      : (photo.panY || 0) * (apH / frameBaseH);

    // 1. Draw photo strictly clipped inside aperture
    ctx.save();
    ctx.beginPath();
    traceAperture(ctx, frameShape, apCX, apCY, apW, apH, apR);
    ctx.clip();

    ctx.save();
    ctx.translate(apCX + effectivePanX, apCY + effectivePanY);
    if (photo.rotation) {
      ctx.rotate((photo.rotation * Math.PI) / 180);
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(imageLoaded, -drawW / 2, -drawH / 2, drawW, drawH);

    // Subtle AI Subject / Face Focus Brackets (visual reassurance that subject is detected)
    if (photo.detectedFaceBoxes && photo.detectedFaceBoxes.length > 0) {
      ctx.save();
      for (const box of photo.detectedFaceBoxes) {
        const faceX = -drawW / 2 + box.originX * drawW;
        const faceY = -drawH / 2 + box.originY * drawH;
        const faceW = box.width * drawW;
        const faceH = box.height * drawH;

        const bLen = Math.min(12, faceW * 0.25);
        ctx.strokeStyle = 'rgba(242, 217, 139, 0.7)';
        ctx.lineWidth = 1.75;

        // Top-left
        ctx.beginPath();
        ctx.moveTo(faceX, faceY + bLen);
        ctx.lineTo(faceX, faceY);
        ctx.lineTo(faceX + bLen, faceY);
        ctx.stroke();

        // Top-right
        ctx.beginPath();
        ctx.moveTo(faceX + faceW - bLen, faceY);
        ctx.lineTo(faceX + faceW, faceY);
        ctx.lineTo(faceX + faceW, faceY + bLen);
        ctx.stroke();

        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(faceX, faceY + faceH - bLen);
        ctx.lineTo(faceX, faceY + faceH);
        ctx.lineTo(faceX + bLen, faceY + faceH);
        ctx.stroke();

        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(faceX + faceW - bLen, faceY + faceH);
        ctx.lineTo(faceX + faceW, faceY + faceH);
        ctx.lineTo(faceX + faceW, faceY + faceH - bLen);
        ctx.stroke();
      }
      ctx.restore();
    }

    ctx.restore(); // Exit transform
    ctx.restore(); // Exit aperture clip

    // 2. Draw Translucent Outer Mask outside the aperture
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, viewW, viewH);
    traceAperture(ctx, frameShape, apCX, apCY, apW, apH, apR);
    ctx.fillStyle = 'rgba(8, 2, 16, 0.88)';
    ctx.fill('evenodd');
    ctx.restore();

    // 3. Draw Ornate Aperture Frame Border
    ctx.save();
    ctx.beginPath();
    traceAperture(ctx, frameShape, apCX, apCY, apW, apH, apR);
    ctx.strokeStyle = '#F2D98B';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(242, 217, 139, 0.55)';
    ctx.shadowBlur = 8;
    ctx.stroke();

    // Secondary inner highlight line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }, [imageLoaded, photo, viewW, viewH, frameShape, frameGeometry]);

  useEffect(() => {
    drawFramingCanvas();
  }, [drawFramingCanvas]);

  // Direct Pointer Drag Handlers with Touch vs Scroll Separation
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const frameBaseW = frameGeometry?.width || 440;
    const frameBaseH = frameGeometry?.height || 440;
    const initialNormPanX = photo.normalizedPanX !== undefined
      ? photo.normalizedPanX
      : (photo.panX || 0) / frameBaseW;
    const initialNormPanY = photo.normalizedPanY !== undefined
      ? photo.normalizedPanY
      : (photo.panY || 0) / frameBaseH;

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialPanX: photo.panX || 0,
      initialPanY: photo.panY || 0,
      initialNormPanX,
      initialNormPanY,
      hasExceededThreshold: false,
      pointerId: e.pointerId,
      pointerType: e.pointerType,
    };
    currentDragPanRef.current = {
      panX: photo.panX || 0,
      panY: photo.panY || 0,
      normPanX: initialNormPanX,
      normPanY: initialNormPanY,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const dist = Math.hypot(dx, dy);

    // Intentional drag activation: separate scroll gestures from intentional drags
    if (!dragStartRef.current.hasExceededThreshold) {
      if (dragStartRef.current.pointerType === 'touch') {
        if (dist < 8) return; // Small touch deadzone
        // Vertical swipe on mobile touch is interpreted as page scrolling
        if (Math.abs(dy) > Math.abs(dx) * 1.4) {
          return;
        }
      } else {
        if (dist < 3) return; // Mouse deadzone
      }

      dragStartRef.current.hasExceededThreshold = true;
      setIsDragging(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }

    const apertureMargin = 16;
    const apW = Math.max(10, viewW - apertureMargin * 2);
    const apH = Math.max(10, viewH - apertureMargin * 2);
    const frameBaseW = frameGeometry?.width || 440;
    const frameBaseH = frameGeometry?.height || 440;

    // 1:1 natural pointer tracking: pointer movement maps directly to aperture fraction
    const deltaNormX = dx / apW;
    const deltaNormY = dy / apH;

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

    onUpdate(
      {
        normalizedPanX: nextNormPanX,
        normalizedPanY: nextNormPanY,
        panX: nextPanX,
        panY: nextPanY,
        framingStatus: 'manual',
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
    if (dragStartRef.current?.hasExceededThreshold) {
      onUpdate(
        {
          normalizedPanX: currentDragPanRef.current.normPanX,
          normalizedPanY: currentDragPanRef.current.normPanY,
          panX: currentDragPanRef.current.panX,
          panY: currentDragPanRef.current.panY,
          framingStatus: 'manual',
        },
        true
      );
    }
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDragging(false);
    dragStartRef.current = null;
  };

  // Mouse Wheel Zoom (Desktop)
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomDelta = -e.deltaY * 0.0015;
    const currentZoom = photo.zoom || 1.0;
    const nextZoom = Math.max(0.5, Math.min(3.0, parseFloat((currentZoom + zoomDelta).toFixed(2))));
    onUpdate({ zoom: nextZoom, framingStatus: 'manual' }, true);
  };

  // Touch Pinch-to-Zoom (Mobile & Touch Devices)
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      pinchStartDistRef.current = dist;
      pinchStartZoomRef.current = photo.zoom || 1.0;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2 && pinchStartDistRef.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / pinchStartDistRef.current;
      const nextZoom = Math.max(0.5, Math.min(3.0, parseFloat((pinchStartZoomRef.current * factor).toFixed(2))));
      onUpdate({ zoom: nextZoom, framingStatus: 'manual' }, false);
    }
  };

  const handleTouchEnd = () => {
    pinchStartDistRef.current = null;
  };

  // Keyboard Navigation for Accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    let handled = false;
    const frameBaseW = frameGeometry?.width || 440;
    const frameBaseH = frameGeometry?.height || 440;
    const currentNormX = photo.normalizedPanX !== undefined ? photo.normalizedPanX : (photo.panX || 0) / frameBaseW;
    const currentNormY = photo.normalizedPanY !== undefined ? photo.normalizedPanY : (photo.panY || 0) / frameBaseH;
    const step = e.shiftKey ? 40 : 12;

    if (e.key === 'ArrowUp') {
      const nextNormY = parseFloat((currentNormY - step / frameBaseH).toFixed(4));
      onUpdate(
        {
          normalizedPanY: nextNormY,
          panY: Math.round(nextNormY * frameBaseH),
          framingStatus: 'manual',
        },
        true
      );
      handled = true;
    } else if (e.key === 'ArrowDown') {
      const nextNormY = parseFloat((currentNormY + step / frameBaseH).toFixed(4));
      onUpdate(
        {
          normalizedPanY: nextNormY,
          panY: Math.round(nextNormY * frameBaseH),
          framingStatus: 'manual',
        },
        true
      );
      handled = true;
    } else if (e.key === 'ArrowLeft') {
      const nextNormX = parseFloat((currentNormX - step / frameBaseW).toFixed(4));
      onUpdate(
        {
          normalizedPanX: nextNormX,
          panX: Math.round(nextNormX * frameBaseW),
          framingStatus: 'manual',
        },
        true
      );
      handled = true;
    } else if (e.key === 'ArrowRight') {
      const nextNormX = parseFloat((currentNormX + step / frameBaseW).toFixed(4));
      onUpdate(
        {
          normalizedPanX: nextNormX,
          panX: Math.round(nextNormX * frameBaseW),
          framingStatus: 'manual',
        },
        true
      );
      handled = true;
    } else if (e.key === '+' || e.key === '=') {
      handleZoomChange((photo.zoom || 1.0) + 0.1);
      handled = true;
    } else if (e.key === '-' || e.key === '_') {
      handleZoomChange((photo.zoom || 1.0) - 0.1);
      handled = true;
    }
    if (handled) {
      e.preventDefault();
    }
  };

  // Zoom Steppers
  const handleZoomChange = (newZoom: number, immediate = true) => {
    const clamped = Math.max(0.5, Math.min(3.0, parseFloat(newZoom.toFixed(2))));
    onUpdate({ zoom: clamped, framingStatus: 'manual' }, immediate);
  };

  // Nudge Steppers for Fine Adjustments
  const handleNudge = (dx: number, dy: number) => {
    const frameBaseW = frameGeometry?.width || 440;
    const frameBaseH = frameGeometry?.height || 440;
    const currentNormX = photo.normalizedPanX !== undefined ? photo.normalizedPanX : (photo.panX || 0) / frameBaseW;
    const currentNormY = photo.normalizedPanY !== undefined ? photo.normalizedPanY : (photo.panY || 0) / frameBaseH;
    const nextNormX = parseFloat((currentNormX + dx / frameBaseW).toFixed(4));
    const nextNormY = parseFloat((currentNormY + dy / frameBaseH).toFixed(4));

    onUpdate(
      {
        normalizedPanX: nextNormX,
        normalizedPanY: nextNormY,
        panX: Math.round(nextNormX * frameBaseW),
        panY: Math.round(nextNormY * frameBaseH),
        framingStatus: 'manual',
      },
      true
    );
  };

  // Rotation Steppers (90° Increments)
  const handleRotate = (delta: number) => {
    let nextRot = ((photo.rotation || 0) + delta) % 360;
    if (nextRot > 180) nextRot -= 360;
    if (nextRot < -180) nextRot += 360;
    onUpdate({ rotation: nextRot, framingStatus: 'manual' }, true);
  };

  // Trigger auto-framing in a specific mode
  const handleModeChange = (mode: FramingMode) => {
    if (onAutoFrame) {
      onAutoFrame(mode);
    }
  };

  // Reset to initial auto-framing
  const handleResetAutoFraming = () => {
    if (onAutoFrame) {
      onAutoFrame(photo.autoFramingMode || 'single');
    } else {
      onUpdate(
        {
          zoom: 1.0,
          panX: 0,
          panY: 0,
          normalizedPanX: 0,
          normalizedPanY: 0,
          rotation: 0,
          fitMode: 'cover',
        },
        true
      );
    }
  };

  // Apply Changes Action Handler
  const handleApplyChanges = () => {
    setAppliedFeedback(true);
    setTimeout(() => {
      setAppliedFeedback(false);
    }, 1800);
    if (onApply) {
      onApply();
    }
  };

  const currentZoom = photo.zoom || 1.0;
  const currentFitMode = photo.fitMode || 'cover';
  const activeMode: FramingMode = photo.autoFramingMode || 'single';
  const status = photo.framingStatus || 'applied';

  return (
    <div className="space-y-3.5 rounded-2xl bg-[#170929] border border-[#F2D98B]/35 p-3.5 sm:p-4 shadow-xl text-sm">
      {/* 1. Header with Active Slot & Smart Status Indicator */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#F2D98B]/20">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              status === 'analyzing'
                ? 'bg-amber-400 animate-ping'
                : status === 'applied'
                ? 'bg-emerald-400'
                : status === 'fallback'
                ? 'bg-amber-400'
                : 'bg-indigo-400'
            }`}
          />
          <span className="font-bold text-[#F2D98B] text-xs sm:text-sm">
            {slotLabel || (isHindi ? 'Smart Photo Framing' : 'Smart Photo Framing')}
          </span>
        </div>

        {/* Status Badge */}
        <div>
          {status === 'analyzing' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
              <Sparkles className="w-3 h-3" />
              <span>{isHindi ? 'Analyzing Photo...' : 'Analyzing Photo...'}</span>
            </span>
          ) : status === 'applied' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Check className="w-3 h-3" />
              <span>
                {photo.detectedFacesCount && photo.detectedFacesCount > 1
                  ? isHindi
                    ? `${photo.detectedFacesCount} चेहरे मिले`
                    : `${photo.detectedFacesCount} Faces Framed`
                  : isHindi
                  ? 'स्मार्ट फ्रेमिंग लागू'
                  : 'Smart Framed'}
              </span>
            </span>
          ) : status === 'fallback' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <Compass className="w-3 h-3" />
              <span>{isHindi ? 'स्मार्ट सेंटर फॉलबैक' : 'Smart Fallback'}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Sliders className="w-3 h-3" />
              <span>{isHindi ? 'मैन्युअल एडजस्ट' : 'Custom Manual'}</span>
            </span>
          )}
        </div>
      </div>

      {/* 2. Direct Photo Preview Canvas (with subtle subject focus brackets) */}
      <div
        ref={containerRef}
        className="relative flex flex-col items-center justify-center p-2 rounded-xl bg-black/50 border border-[#F2D98B]/25 overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          style={{ width: `${viewW}px`, height: `${viewH}px`, touchAction: 'pan-y' }}
          className={`block rounded-lg cursor-grab active:cursor-grabbing select-none transition-shadow outline-none ${
            isDragging ? 'ring-2 ring-[#F2D98B] shadow-lg' : 'hover:ring-1 hover:ring-[#F2D98B]/40'
          }`}
          title={isHindi ? 'Photo ko drag karein ya wheel se zoom karein' : 'Drag to reposition • Scroll to zoom'}
          aria-label={isHindi ? 'Photo positioning canvas' : 'Interactive photo positioning canvas'}
        />

        {/* Compact Hint */}
        <div className="mt-2 text-center text-[10.5px] text-[#F2D98B]/90 font-medium flex items-center justify-center gap-1.5 pointer-events-none">
          <Move className="w-3 h-3 text-[#F2D98B]" />
          <span>
            {isHindi
              ? 'Drag karke photo ghumayein • Pinch/Wheel se zoom karein'
              : 'Drag to adjust position • Pinch / Wheel to zoom'}
          </span>
        </div>
      </div>

      {/* 3. Four Smart Framing Mode Chips */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold text-[#F2D98B] px-0.5">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F2D98B]" />
            <span>{isHindi ? 'फ्रेमिंग का प्रकार चुनें:' : 'Framing Mode:'}</span>
          </span>
          <span className="text-[10px] text-[#FAF7F0]/60 font-normal">
            {isHindi ? 'एक क्लिक में सेट करें' : 'One-tap auto crop'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {/* Mode 1: Single Person */}
          <button
            type="button"
            onClick={() => handleModeChange('single')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              activeMode === 'single'
                ? 'bg-gradient-to-r from-[#F2D98B] to-[#D4AF37] text-[#24113D] border-[#F2D98B] font-bold shadow-md shadow-amber-500/20 scale-[1.02]'
                : 'bg-[#140624] text-[#FAF7F0]/80 border-[#F2D98B]/20 hover:border-[#F2D98B]/45 hover:text-[#FAF7F0]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{isHindi ? 'सिंगल' : 'Single'}</span>
          </button>

          {/* Mode 2: Couple */}
          <button
            type="button"
            onClick={() => handleModeChange('couple')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              activeMode === 'couple'
                ? 'bg-gradient-to-r from-[#F2D98B] to-[#D4AF37] text-[#24113D] border-[#F2D98B] font-bold shadow-md shadow-amber-500/20 scale-[1.02]'
                : 'bg-[#140624] text-[#FAF7F0]/80 border-[#F2D98B]/20 hover:border-[#F2D98B]/45 hover:text-[#FAF7F0]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{isHindi ? 'कपल' : 'Couple'}</span>
          </button>

          {/* Mode 3: Group / Family */}
          <button
            type="button"
            onClick={() => handleModeChange('group')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              activeMode === 'group'
                ? 'bg-gradient-to-r from-[#F2D98B] to-[#D4AF37] text-[#24113D] border-[#F2D98B] font-bold shadow-md shadow-amber-500/20 scale-[1.02]'
                : 'bg-[#140624] text-[#FAF7F0]/80 border-[#F2D98B]/20 hover:border-[#F2D98B]/45 hover:text-[#FAF7F0]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{isHindi ? 'ग्रुप / परिवार' : 'Group'}</span>
          </button>

          {/* Mode 4: Full Body */}
          <button
            type="button"
            onClick={() => handleModeChange('fullBody')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              activeMode === 'fullBody'
                ? 'bg-gradient-to-r from-[#F2D98B] to-[#D4AF37] text-[#24113D] border-[#F2D98B] font-bold shadow-md shadow-amber-500/20 scale-[1.02]'
                : 'bg-[#140624] text-[#FAF7F0]/80 border-[#F2D98B]/20 hover:border-[#F2D98B]/45 hover:text-[#FAF7F0]'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>{isHindi ? 'फुल बॉडी' : 'Full Body'}</span>
          </button>
        </div>
      </div>

      {/* 4. Simple Quick Action Strip */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#140624] border border-[#F2D98B]/20">
        {/* Auto Frame (Recalculate) */}
        <button
          type="button"
          onClick={() => handleModeChange(activeMode)}
          className="flex-1 py-2 px-3 rounded-lg bg-[#270E45] hover:bg-[#34135D] border border-[#F2D98B]/30 text-xs font-bold text-[#F2D98B] flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-sm"
          title={isHindi ? 'ऑटो फ्रेमिंग फिर से लगाएं' : 'Re-calculate Auto Framing'}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F2D98B]" />
          <span>{isHindi ? 'Auto Frame' : 'Auto Frame'}</span>
        </button>

        {/* Reset */}
        <button
          type="button"
          onClick={handleResetAutoFraming}
          className="py-2 px-3 rounded-lg bg-[#270E45] hover:bg-[#34135D] border border-[#F2D98B]/20 text-xs font-semibold text-[#FAF7F0] flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
          title={isHindi ? 'शुरू से सेट करें' : 'Reset to Auto'}
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#F2D98B]" />
          <span>{isHindi ? 'Reset' : 'Reset'}</span>
        </button>

        {/* Adjust Manually Toggle */}
        <button
          type="button"
          onClick={() => setShowManualControls(!showManualControls)}
          className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer ${
            showManualControls
              ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B] font-bold'
              : 'bg-[#270E45] hover:bg-[#34135D] text-[#FAF7F0] border-[#F2D98B]/25'
          }`}
          title={isHindi ? 'मैन्युअल टूल्स खोलें/बंद करें' : 'Toggle manual adjustment tools'}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{isHindi ? 'Manual Tools' : 'Adjust Manually'}</span>
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-200 ${
              showManualControls ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* 5. Collapsible "Manual Adjustment Controls" (Optional fallback) */}
      {showManualControls && (
        <div className="p-3 rounded-xl bg-[#11051F] border border-[#F2D98B]/25 space-y-3 animate-in fade-in duration-200">
          {/* Fit vs Fill Segmented Toggle */}
          <div className="space-y-1">
            <div className="flex items-center p-1 rounded-xl bg-[#140624] border border-[#F2D98B]/20 shadow-inner">
              <button
                type="button"
                onClick={() => onUpdate({ fitMode: 'contain', framingStatus: 'manual' }, true)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  currentFitMode === 'contain'
                    ? 'bg-[#F2D98B] text-[#24113D] font-bold shadow-md'
                    : 'text-[#FAF7F0]/75 hover:text-[#FAF7F0]'
                }`}
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>{isHindi ? 'Puri Photo (Fit)' : 'Fit Photo'}</span>
              </button>
              <button
                type="button"
                onClick={() => onUpdate({ fitMode: 'cover', framingStatus: 'manual' }, true)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  currentFitMode === 'cover'
                    ? 'bg-[#F2D98B] text-[#24113D] font-bold shadow-md'
                    : 'text-[#FAF7F0]/75 hover:text-[#FAF7F0]'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isHindi ? 'Poora Frame (Fill)' : 'Fill Frame'}</span>
              </button>
            </div>
          </div>

          {/* Zoom Slider */}
          <div className="p-2.5 rounded-xl bg-[#140624] border border-[#F2D98B]/20">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label
                htmlFor="framing-zoom-slider"
                className="flex items-center gap-1.5 font-semibold text-[#F2D98B]"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{isHindi ? 'Zoom Level' : 'Zoom Level'}</span>
              </label>
              <span className="font-mono text-xs font-bold text-[#F2D98B] bg-[#24113D] px-2 py-0.5 rounded border border-[#F2D98B]/30">
                {Math.round(currentZoom * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleZoomChange(currentZoom - 0.1)}
                disabled={currentZoom <= 0.5}
                title="Zoom Out (-)"
                className="w-7 h-7 rounded-lg bg-[#270E45] hover:bg-[#34135D] text-[#FAF7F0] border border-[#F2D98B]/25 flex items-center justify-center active:scale-95 disabled:opacity-40 transition-all cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <input
                id="framing-zoom-slider"
                type="range"
                min="0.5"
                max="3.0"
                step="0.05"
                value={currentZoom}
                onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                className="flex-1 accent-[#F2D98B] cursor-pointer h-2 bg-[#270E45] rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleZoomChange(currentZoom + 0.1)}
                disabled={currentZoom >= 3.0}
                title="Zoom In (+)"
                className="w-7 h-7 rounded-lg bg-[#270E45] hover:bg-[#34135D] text-[#FAF7F0] border border-[#F2D98B]/25 flex items-center justify-center active:scale-95 disabled:opacity-40 transition-all cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Positioning & Rotation Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onUpdate({ panX: 0, panY: 0, framingStatus: 'manual' }, true)}
              className="flex-1 py-1.5 px-2 rounded-lg bg-[#270E45] hover:bg-[#34135D] border border-[#F2D98B]/20 text-xs font-semibold text-[#FAF7F0] flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
              title="Center Photo"
            >
              <Target className="w-3.5 h-3.5 text-[#F2D98B]" />
              <span>{isHindi ? 'Center' : 'Center'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleRotate(-90)}
              className="py-1.5 px-2.5 rounded-lg bg-[#270E45] hover:bg-[#34135D] border border-[#F2D98B]/20 text-xs font-semibold text-[#FAF7F0] flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
              title="Rotate -90°"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#F2D98B]" />
              <span>-90°</span>
            </button>

            <button
              type="button"
              onClick={() => handleRotate(90)}
              className="py-1.5 px-2.5 rounded-lg bg-[#270E45] hover:bg-[#34135D] border border-[#F2D98B]/20 text-xs font-semibold text-[#FAF7F0] flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
              title="Rotate +90°"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#F2D98B]" />
              <span>+90°</span>
            </button>
          </div>

          {/* Fine Nudge Controls */}
          <div className="pt-2 border-t border-[#F2D98B]/15 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-[#FAF7F0]/80 block">
                {isHindi ? 'Fine Nudge Controls:' : 'Fine Nudge Controls:'}
              </span>
              <span className="text-[10px] text-[#FAF7F0]/50 font-mono block">
                X: {Math.round(photo.panX || 0)}px • Y: {Math.round(photo.panY || 0)}px
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1 max-w-[96px]">
              <div />
              <button
                type="button"
                onClick={() => handleNudge(0, -15)}
                className="w-6 h-6 rounded bg-[#270E45] hover:bg-[#34135D] text-[#FAF7F0] flex items-center justify-center active:scale-95 border border-[#F2D98B]/20"
                title="Nudge Up"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <div />
              <button
                type="button"
                onClick={() => handleNudge(-15, 0)}
                className="w-6 h-6 rounded bg-[#270E45] hover:bg-[#34135D] text-[#FAF7F0] flex items-center justify-center active:scale-95 border border-[#F2D98B]/20"
                title="Nudge Left"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => onUpdate({ panX: 0, panY: 0, framingStatus: 'manual' }, true)}
                className="w-6 h-6 rounded bg-[#1A0930] hover:bg-[#270E45] text-[#F2D98B] flex items-center justify-center active:scale-95 border border-[#F2D98B]/40 text-[8px] font-bold"
                title="Center Position"
              >
                ●
              </button>
              <button
                type="button"
                onClick={() => handleNudge(15, 0)}
                className="w-6 h-6 rounded bg-[#270E45] hover:bg-[#34135D] text-[#FAF7F0] flex items-center justify-center active:scale-95 border border-[#F2D98B]/20"
                title="Nudge Right"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
              <div />
              <button
                type="button"
                onClick={() => handleNudge(0, 15)}
                className="w-6 h-6 rounded bg-[#270E45] hover:bg-[#34135D] text-[#FAF7F0] flex items-center justify-center active:scale-95 border border-[#F2D98B]/20"
                title="Nudge Down"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
              <div />
            </div>
          </div>
        </div>
      )}

      {/* 6. Action Buttons */}
      <div className="pt-2.5 border-t border-[#F2D98B]/20 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {/* Replace Photo */}
          <button
            type="button"
            onClick={onReplace}
            className="px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold text-[#F2D98B] bg-[#270E45] border border-[#F2D98B]/35 hover:bg-[#33135B] transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{isHindi ? 'Photo Badlein' : 'Replace Photo'}</span>
          </button>

          {/* Remove Photo */}
          <button
            type="button"
            onClick={onRemove}
            className="px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold text-red-300 bg-red-950/40 border border-red-500/30 hover:bg-red-900/50 transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isHindi ? 'Photo Hataayein' : 'Remove Photo'}</span>
          </button>
        </div>

        {/* Apply Changes with Positive Feedback State */}
        <div className="flex items-center gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-[#FAF7F0]/80 bg-[#1E0B36] border border-[#F2D98B]/20 hover:text-white cursor-pointer"
            >
              {isHindi ? 'Cancel' : 'Cancel'}
            </button>
          )}

          <button
            type="button"
            onClick={handleApplyChanges}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-md cursor-pointer ${
              appliedFeedback
                ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                : 'bg-gradient-to-r from-[#F2D98B] to-[#D4AF37] text-[#24113D] hover:brightness-105'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>
              {appliedFeedback
                ? isHindi
                  ? '✓ Lag Gayi!'
                  : '✓ Applied!'
                : isHindi
                ? 'Changes Save Karein'
                : 'Apply Changes'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
