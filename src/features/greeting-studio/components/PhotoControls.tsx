import React, { useRef, useState } from 'react';
import type { CardCustomization, UserPhoto, FramingMode } from '../types/editor';
import {
  Upload,
  ShieldCheck,
  Layers,
  Camera,
} from 'lucide-react';
import { PhotoFramingAdjuster } from './PhotoFramingAdjuster';
import { loadImage } from '../services/photoRenderer';
import { detectFacesInImage } from '../services/faceDetectionService';
import { calculateAutoFraming, type FrameGeometry } from '../services/autoFramingEngine';

interface PhotoControlsProps {
  customization: CardCustomization;
  onChange: (updates: Partial<CardCustomization>, immediate?: boolean) => void;
  isHindi: boolean;
  photoSlotCount?: number;
  frameShape?: string;
  frameAspect?: number;
  photoFrameGeometry?: FrameGeometry & { slots?: Array<FrameGeometry & { id: string }> };
}

export const PhotoControls: React.FC<PhotoControlsProps> = ({
  customization,
  onChange,
  isHindi,
  photoSlotCount = 1,
  frameShape = 'rounded-rect',
  frameAspect = 1.0,
  photoFrameGeometry,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeSlot, setActiveSlot] = useState<string>('slot-0');

  // Determine current active photo based on slot
  const isMultiSlot = photoSlotCount > 1;
  const currentPhoto: UserPhoto | undefined = isMultiSlot
    ? customization.photos?.[activeSlot] || (activeSlot === 'slot-0' ? customization.photo : undefined)
    : customization.photo;

  const activeSlotIndex = parseInt(activeSlot.replace('slot-', '')) || 0;
  const slotName = isMultiSlot ? (isHindi ? `Photo ${activeSlotIndex + 1}` : `Photo ${activeSlotIndex + 1}`) : undefined;

  // Retrieve accurate frame geometry for the active slot
  const getActiveSlotGeometry = (): FrameGeometry => {
    if (photoFrameGeometry?.slots && photoFrameGeometry.slots[activeSlotIndex]) {
      const s = photoFrameGeometry.slots[activeSlotIndex];
      return {
        cx: s.cx,
        cy: s.cy,
        width: s.width,
        height: s.height,
        radius: s.radius,
        shape: s.shape || frameShape,
      };
    }
    if (photoFrameGeometry) {
      return {
        cx: photoFrameGeometry.cx,
        cy: photoFrameGeometry.cy,
        width: photoFrameGeometry.width,
        height: photoFrameGeometry.height,
        radius: photoFrameGeometry.radius,
        shape: photoFrameGeometry.shape || frameShape,
      };
    }
    return {
      cx: 540,
      cy: 350,
      width: 600,
      height: Math.round(600 / Math.max(0.4, frameAspect)),
      radius: 120,
      shape: frameShape,
    };
  };

  /**
   * Executes AI subject detection & auto-framing calculation on a photo.
   */
  const processAutoFraming = async (
    photoToFrame: UserPhoto,
    slotKey: string,
    requestedMode?: FramingMode
  ) => {
    if (!photoToFrame.dataUrl) return;

    // 1. Indicate analysis in progress
    updatePhotoSlot(slotKey, { ...photoToFrame, framingStatus: 'analyzing' }, true);

    try {
      const img = await loadImage(photoToFrame.dataUrl);
      const detection = await detectFacesInImage(img);
      const slotGeo = getActiveSlotGeometry();

      const framingResult = calculateAutoFraming({
        imageWidth: img.naturalWidth || img.width || 800,
        imageHeight: img.naturalHeight || img.height || 600,
        detection,
        frame: slotGeo,
        mode: requestedMode || photoToFrame.autoFramingMode || detection.suggestedMode,
      });

      const framedPhoto: UserPhoto = {
        ...photoToFrame,
        zoom: framingResult.zoom,
        panX: framingResult.panX,
        panY: framingResult.panY,
        normalizedPanX: framingResult.normalizedPanX,
        normalizedPanY: framingResult.normalizedPanY,
        fitMode: framingResult.fitMode,
        autoFramingMode: framingResult.appliedMode,
        detectedFacesCount: framingResult.facesIncluded,
        isAutoFramed: true,
        framingStatus: detection.status,
        detectedFaceBoxes: detection.faces.map((f) => f.box),
      };

      updatePhotoSlot(slotKey, framedPhoto, true);
    } catch (err) {
      console.warn('Smart auto-framing encountered an issue, applying smart fallback:', err);
      const fallbackPhoto: UserPhoto = {
        ...photoToFrame,
        zoom: 1.0,
        panX: 0,
        panY: 0,
        normalizedPanX: 0,
        normalizedPanY: 0,
        fitMode: 'cover',
        isAutoFramed: true,
        framingStatus: 'fallback',
      };
      updatePhotoSlot(slotKey, fallbackPhoto, true);
    }
  };

  const updatePhotoSlot = (slotKey: string, updated: UserPhoto, immediate = true) => {
    if (isMultiSlot) {
      const updatedPhotos = { ...(customization.photos || {}) };
      updatedPhotos[slotKey] = updated;
      onChange(
        {
          photos: updatedPhotos,
          photo: slotKey === 'slot-0' ? updated : customization.photo,
        },
        immediate
      );
    } else {
      onChange({ photo: updated }, immediate);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg(isHindi ? 'Kripya 15MB se chhoti photo chunein.' : 'Please choose an image under 15MB.');
      return;
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase()) && !file.type.startsWith('image/')) {
      setErrorMsg(
        isHindi
          ? 'Kripya JPG, PNG ya WebP photo upload karein.'
          : 'Unsupported format. Please upload JPG, PNG, or WebP.'
      );
      return;
    }

    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;

      const initialPhoto: UserPhoto = {
        file,
        dataUrl,
        fileName: file.name,
        zoom: 1.0,
        panX: 0,
        panY: 0,
        normalizedPanX: 0,
        normalizedPanY: 0,
        rotation: 0,
        fitMode: 'cover',
        framingStatus: 'analyzing',
      };

      // Run browser-side smart auto framing immediately
      processAutoFraming(initialPhoto, activeSlot);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    if (isMultiSlot) {
      const updatedPhotos = { ...(customization.photos || {}) };
      delete updatedPhotos[activeSlot];
      onChange({ photos: updatedPhotos, photo: activeSlot === 'slot-0' ? undefined : customization.photo }, true);
    } else {
      onChange({ photo: undefined }, true);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const updateActiveTransform = (updates: Partial<UserPhoto>, immediate = true) => {
    if (!currentPhoto) return;
    const merged: UserPhoto = {
      ...currentPhoto,
      ...updates,
      // If user manually changed pan/zoom/rotation, update status to manual unless explicitly specified
      framingStatus: updates.framingStatus || 'manual',
    };

    updatePhotoSlot(activeSlot, merged, immediate);
  };

  const handleAutoFrameTrigger = (mode?: FramingMode) => {
    if (!currentPhoto?.dataUrl) return;
    processAutoFraming(currentPhoto, activeSlot, mode);
  };

  return (
    <div className="space-y-4 text-sm">
      {/* Strict Privacy Guarantee Badge */}
      {!currentPhoto?.dataUrl ? (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#24113D]/80 border border-[#F2D98B]/25 text-[#FAF7F0]">
          <ShieldCheck className="w-5 h-5 text-[#F2D98B] flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold text-[#F2D98B] block mb-0.5">
              {isHindi ? '१००% Private • Device AI Processing' : '100% Client-Side Privacy Guarantee'}
            </span>
            <p className="text-[#FAF7F0]/85">
              {isHindi
                ? 'Aapki photos aapke phone/browser mein hi analyze aur frame hoti hain. Kisi server par upload nahi hoti hain.'
                : 'Face detection and auto-framing run 100% locally in your browser. Your photos are never sent to external servers.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between text-[11px] text-[#F2D98B]/80 px-1 font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F2D98B]" />
            <span>{isHindi ? '१००% Private • Local Browser Processing' : '100% Client-Side Device Privacy'}</span>
          </div>
          <span className="text-[#FAF7F0]/50 text-[10px]">
            {isHindi ? 'Zero Server Upload' : 'Zero Server Upload'}
          </span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center justify-between">
          <span>{errorMsg}</span>
          <button type="button" onClick={() => setErrorMsg(null)} className="underline ml-2 text-red-100">
            {isHindi ? 'Hataayein' : 'Dismiss'}
          </button>
        </div>
      )}

      {/* Multi-Slot Selector (for 2-photo and 4-photo collage templates) */}
      {isMultiSlot && (
        <div className="p-3 rounded-xl bg-[#1A0E2E] border border-[#F2D98B]/25 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#F2D98B]">
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>{isHindi ? 'Collage Photo Slots:' : 'Collage Photo Slots:'}</span>
            </div>
            <span className="text-[10px] text-[#FAF7F0]/60">
              {isHindi ? 'Har photo alag frame hogi' : 'Each photo frames independently'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Array.from({ length: photoSlotCount }).map((_, idx) => {
              const slotKey = `slot-${idx}`;
              const slotPhoto = customization.photos?.[slotKey] || (idx === 0 ? customization.photo : undefined);
              const hasPhoto = Boolean(slotPhoto?.dataUrl);
              const isSelected = activeSlot === slotKey;

              return (
                <button
                  key={slotKey}
                  type="button"
                  onClick={() => setActiveSlot(slotKey)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-semibold transition-all min-h-[54px] border ${
                    isSelected
                      ? 'bg-[#F2D98B] text-[#24113D] border-[#F2D98B] shadow-lg font-bold scale-[1.03]'
                      : hasPhoto
                      ? 'bg-[#2A1545] text-[#FAF7F0] border-[#F2D98B]/40 hover:bg-[#341A55]'
                      : 'bg-[#180B2D] text-[#FAF7F0]/60 border-dashed border-[#F2D98B]/25 hover:text-[#FAF7F0]'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5" />
                    <span>{isHindi ? `Photo ${idx + 1}` : `Photo ${idx + 1}`}</span>
                  </div>
                  <span className="text-[10px] opacity-80 mt-0.5">
                    {hasPhoto ? (isHindi ? 'Set hai' : 'Ready') : (isHindi ? 'Khaali' : 'Empty')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        id="photo-file-upload-input"
        name="photoFileUpload"
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/*"
        aria-label={isHindi ? 'Photo file chunein' : 'Choose photo file'}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Zone (when no photo in active slot) */}
      {!currentPhoto?.dataUrl ? (
        <div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed border-[#F2D98B]/45 hover:border-[#F2D98B] bg-[#1A0E2E]/80 hover:bg-[#24113D] transition-all cursor-pointer group min-h-[160px] shadow-lg"
          >
            <div className="w-14 h-14 rounded-full bg-[#F2D98B]/15 border border-[#F2D98B]/40 flex items-center justify-center text-[#F2D98B] group-hover:scale-110 transition-transform shadow-md">
              <Upload className="w-6 h-6" />
            </div>
            <div className="text-center">
              <span className="text-sm font-bold text-[#FAF7F0] block">
                {isHindi
                  ? `${isMultiSlot ? `Photo ${activeSlotIndex + 1} ke liye ` : ''}Photo Lagayein`
                  : `Add Photo ${isMultiSlot ? `for Slot ${activeSlotIndex + 1}` : ''}`}
              </span>
              <span className="text-xs text-[#FAF7F0]/70 mt-1 block">
                {isHindi
                  ? 'Smart AI Auto-Framing • Portrait, Couple, Family ya Friends photo'
                  : 'Smart AI Auto-Framing • Portrait, Couple, Family, or Group photo'}
              </span>
            </div>
          </button>
        </div>
      ) : (
        /* Dedicated Smart Photo Framing & Adjustment Interface */
        <PhotoFramingAdjuster
          photo={currentPhoto}
          frameShape={frameShape}
          frameAspect={frameAspect}
          frameGeometry={getActiveSlotGeometry()}
          slotLabel={slotName}
          onUpdate={updateActiveTransform}
          onReplace={() => fileInputRef.current?.click()}
          onRemove={handleRemovePhoto}
          onAutoFrame={handleAutoFrameTrigger}
          isHindi={isHindi}
        />
      )}
    </div>
  );
};
