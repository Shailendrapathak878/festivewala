import type { SubjectDetectionResult } from './faceDetectionService';

export type FramingMode = 'single' | 'couple' | 'group' | 'fullBody';

export interface FrameGeometry {
  cx: number;
  cy: number;
  width: number;
  height: number;
  radius: number;
  shape?: string; // circle, oval, arch, jharokha, polaroid, rounded-rect, panoramic, full-bleed, split-half
}

export interface FramingCalculationInput {
  imageWidth: number;
  imageHeight: number;
  detection: SubjectDetectionResult;
  frame: FrameGeometry;
  mode?: FramingMode;
  targetFitMode?: 'cover' | 'contain';
}

export interface FramingCalculationResult {
  zoom: number;
  panX: number;
  panY: number;
  normalizedPanX: number; // canonical horizontal offset fraction (-1.0 to 1.0)
  normalizedPanY: number; // canonical vertical offset fraction (-1.0 to 1.0)
  fitMode: 'cover' | 'contain';
  appliedMode: FramingMode;
  facesIncluded: number;
  focalPoint: { x: number; y: number };
  reason: string;
}

/**
 * Calculates optimal zoom, panX, panY, normalizedPanX, normalizedPanY, and fitMode for an uploaded photo
 * based on detected subject/faces, frame shape, and selected framing mode.
 */
export function calculateAutoFraming(
  input: FramingCalculationInput
): FramingCalculationResult {
  const { imageWidth: imgW, imageHeight: imgH, detection, frame } = input;
  const frameW = frame.width;
  const frameH = frame.height;
  const shape = frame.shape || 'rounded-rect';

  // Determine effective mode (user override or auto-suggested)
  const appliedMode: FramingMode = input.mode || detection.suggestedMode || 'single';

  // Target cover scale
  const scaleCover = Math.max(frameW / imgW, frameH / imgH);
  const scaleContain = Math.min(frameW / imgW, frameH / imgH);

  let desiredZoom = 1.0;
  let desiredPanX = 0;
  let desiredPanY = 0;
  let fitMode: 'cover' | 'contain' = input.targetFitMode || 'cover';
  let facesIncluded = 0;
  let focalPoint = { x: 0.5, y: 0.5 };
  let reason = '';

  // Determine top headroom safety requirement based on frame geometry/mask
  let topHeadroomRatio = 0.12; // Balanced 12% default headroom
  if (shape === 'arch' || shape === 'jharokha') {
    // Arch and Jharokha have narrowing cusps at top 20%, requiring safe clearance
    topHeadroomRatio = 0.16;
  } else if (shape === 'circle' || shape === 'oval') {
    // In circles, 13% headroom ensures head stays in the wide upper arc without leaving an empty upper void
    topHeadroomRatio = 0.13;
  } else if (shape === 'polaroid') {
    topHeadroomRatio = 0.12;
  }

  // --- MODE A: Single Person ---
  if (appliedMode === 'single') {
    const face = detection.primaryFace || detection.faces[0];
    if (face) {
      facesIncluded = 1;
      focalPoint = { ...face.center };

      // Estimated head boundaries (including hair and chin)
      const headTopNorm = Math.max(0, face.box.originY - face.box.height * 0.15);
      const headBottomNorm = Math.min(1, face.box.originY + face.box.height * 1.05);
      const headHeightNorm = headBottomNorm - headTopNorm;

      // Desired face size: face should comfortably occupy ~38% to 46% of frame height
      const targetFacePx = frameH * (shape === 'circle' || shape === 'oval' ? 0.42 : shape === 'arch' || shape === 'jharokha' ? 0.40 : 0.38);
      const currentFacePx = headHeightNorm * imgH * scaleCover;

      if (currentFacePx > 0) {
        const rawZoom = targetFacePx / currentFacePx;
        // Keep zoom moderate: 1.05 to 1.85 so photo fills the aperture gracefully
        desiredZoom = Math.max(1.05, Math.min(1.85, parseFloat(rawZoom.toFixed(2))));
      } else {
        desiredZoom = shape === 'circle' || shape === 'oval' ? 1.15 : 1.05;
      }

      const drawW = imgW * scaleCover * desiredZoom;
      const drawH = imgH * scaleCover * desiredZoom;

      // Horizontal: Center the face horizontally
      desiredPanX = -(face.center.x - 0.5) * drawW;

      // Vertical: Position top of head with comfortable, non-empty headroom
      const targetHeadTopInAperture = -frameH / 2 + frameH * topHeadroomRatio;
      const headTopFromCenter = (headTopNorm - 0.5) * drawH;
      desiredPanY = targetHeadTopInAperture - headTopFromCenter;

      reason = `Single portrait framed with ${Math.round(topHeadroomRatio * 100)}% headroom`;
    } else {
      // Fallback if no face detected in single mode: subtle zoom + upper aesthetic centering
      desiredZoom = shape === 'circle' || shape === 'oval' ? 1.15 : 1.08;
      desiredPanX = 0;
      desiredPanY = -frameH * 0.05;
      reason = 'Single mode fallback with upper rule-of-thirds centering';
    }
  }

  // --- MODE B: Couple ---
  else if (appliedMode === 'couple') {
    const faces = detection.faces.slice(0, 2);
    if (faces.length >= 2) {
      facesIncluded = 2;
      const f1 = faces[0];
      const f2 = faces[1];

      const minX = Math.min(f1.box.originX, f2.box.originX);
      const maxX = Math.max(f1.box.originX + f1.box.width, f2.box.originX + f2.box.width);
      const minY = Math.min(f1.box.originY, f2.box.originY);
      const maxY = Math.max(f1.box.originY + f1.box.height, f2.box.originY + f2.box.height);

      const coupleWNorm = maxX - minX;
      const coupleHNorm = maxY - minY;
      const centerX = minX + coupleWNorm / 2;
      const centerY = minY + coupleHNorm / 2;
      focalPoint = { x: centerX, y: centerY };

      // Ensure both faces fit within 75% frame width and 55% frame height
      const fitZoomW = (frameW * 0.72) / (coupleWNorm * imgW * scaleCover);
      const fitZoomH = (frameH * 0.55) / (coupleHNorm * imgH * scaleCover);
      const targetZoom = Math.min(fitZoomW, fitZoomH);
      desiredZoom = Math.max(1.0, Math.min(1.65, parseFloat(targetZoom.toFixed(2))));

      const drawW = imgW * scaleCover * desiredZoom;
      const drawH = imgH * scaleCover * desiredZoom;

      desiredPanX = -(centerX - 0.5) * drawW;

      // Position taller person's head safely below top margin
      const tallerHeadTopNorm = Math.max(0, minY - 0.15 * coupleHNorm);
      const targetTopY = -frameH / 2 + frameH * (topHeadroomRatio + 0.02);
      desiredPanY = targetTopY - (tallerHeadTopNorm - 0.5) * drawH;

      reason = 'Couple framing: balanced both faces with side safe margins';
    } else if (detection.primaryFace) {
      // Only 1 face found for couple mode: use wide portrait zoom
      facesIncluded = 1;
      desiredZoom = 1.05;
      const f = detection.primaryFace;
      const drawW = imgW * scaleCover * desiredZoom;
      const drawH = imgH * scaleCover * desiredZoom;
      desiredPanX = -(f.center.x - 0.5) * drawW;
      desiredPanY = -(f.center.y - 0.5) * drawH;
      reason = 'Couple mode with single detected subject';
    }
  }

  // --- MODE C: Family / Group ---
  else if (appliedMode === 'group') {
    const faces = detection.faces;
    facesIncluded = faces.length;

    if (faces.length > 0) {
      const minX = Math.min(...faces.map((f) => f.box.originX));
      const maxX = Math.max(...faces.map((f) => f.box.originX + f.box.width));
      const minY = Math.min(...faces.map((f) => f.box.originY));
      const maxY = Math.max(...faces.map((f) => f.box.originY + f.box.height));

      const groupWNorm = maxX - minX;
      const groupHNorm = maxY - minY;
      const centerX = minX + groupWNorm / 2;
      const centerY = minY + groupHNorm / 2;
      focalPoint = { x: centerX, y: centerY };

      // Keep zoom close to 1.0 so edge people are never clipped
      desiredZoom = 1.0;

      // If group is wider than frame, suggest or adapt contain mode if needed
      if (groupWNorm * imgW * scaleCover > frameW * 0.95 && scaleContain < scaleCover * 0.8) {
        // Subtle contain or minimal cover
        desiredZoom = 1.0;
      }

      const drawW = imgW * scaleCover * desiredZoom;
      const drawH = imgH * scaleCover * desiredZoom;

      desiredPanX = -(centerX - 0.5) * drawW;
      desiredPanY = -(centerY - 0.5) * drawH * 0.85; // Slightly lower pan for group balance

      reason = `Group framing: all ${faces.length} faces included with wide field-of-view`;
    } else {
      desiredZoom = 1.0;
      desiredPanX = 0;
      desiredPanY = 0;
      reason = 'Group mode fallback with natural full-frame centering';
    }
  }

  // --- MODE D: Full Body ---
  else if (appliedMode === 'fullBody') {
    desiredZoom = 1.0;
    const face = detection.primaryFace;

    if (face) {
      facesIncluded = 1;
      focalPoint = { ...face.center };
      const drawW = imgW * scaleCover * desiredZoom;
      const drawH = imgH * scaleCover * desiredZoom;

      desiredPanX = -(face.center.x - 0.5) * drawW;
      // Position face in upper third so torso and dress/attire fills lower aperture
      const targetFaceY = -frameH * 0.22;
      desiredPanY = targetFaceY - (face.center.y - 0.5) * drawH;

      reason = 'Full body framing: aligned face to upper quadrant to show attire';
    } else {
      desiredPanX = 0;
      desiredPanY = 0;
      reason = 'Full body framing: centered entire photo';
    }
  }

  // Strict Boundary Clamping:
  // Ensure the image completely fills the aperture without exposing blank borders.
  const activeScale = (fitMode === 'contain' ? scaleContain : scaleCover) * desiredZoom;
  const drawW = imgW * activeScale;
  const drawH = imgH * activeScale;

  if (fitMode === 'cover') {
    const maxPanX = Math.max(0, (drawW - frameW) / 2);
    const maxPanY = Math.max(0, (drawH - frameH) / 2);

    desiredPanX = Math.max(-maxPanX, Math.min(maxPanX, desiredPanX));
    desiredPanY = Math.max(-maxPanY, Math.min(maxPanY, desiredPanY));
  } else {
    // In contain mode, image may be smaller than frame, clamp to zero when at 1.0 zoom
    const maxPanX = Math.max(0, (drawW - frameW) / 2);
    const maxPanY = Math.max(0, (drawH - frameH) / 2);
    desiredPanX = Math.max(-maxPanX, Math.min(maxPanX, desiredPanX));
    desiredPanY = Math.max(-maxPanY, Math.min(maxPanY, desiredPanY));
  }

  // Calculate canonical normalized offsets relative to aperture dimensions
  const normalizedPanX = frameW > 0 ? parseFloat((desiredPanX / frameW).toFixed(4)) : 0;
  const normalizedPanY = frameH > 0 ? parseFloat((desiredPanY / frameH).toFixed(4)) : 0;

  return {
    zoom: desiredZoom,
    panX: Math.round(desiredPanX),
    panY: Math.round(desiredPanY),
    normalizedPanX,
    normalizedPanY,
    fitMode,
    appliedMode,
    facesIncluded,
    focalPoint,
    reason,
  };
}

