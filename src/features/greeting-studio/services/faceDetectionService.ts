import { FilesetResolver, FaceDetector } from '@mediapipe/tasks-vision';

export interface DetectedFace {
  box: {
    originX: number; // 0 to 1 normalized (relative to image width)
    originY: number; // 0 to 1 normalized (relative to image height)
    width: number;   // 0 to 1 normalized
    height: number;  // 0 to 1 normalized
  };
  center: { x: number; y: number }; // normalized center (0 to 1)
  confidence: number;
}

export type SubjectOrientation = 'portrait' | 'landscape' | 'square';

export interface SubjectDetectionResult {
  faces: DetectedFace[];
  primaryFace?: DetectedFace;
  combinedBox?: {
    originX: number;
    originY: number;
    width: number;
    height: number;
    centerX: number;
    centerY: number;
  };
  imageWidth: number;
  imageHeight: number;
  aspectRatio: number;
  orientation: SubjectOrientation;
  suggestedMode: 'single' | 'couple' | 'group' | 'fullBody';
  status: 'applied' | 'fallback';
  engine: 'mediapipe' | 'saliency-heuristic';
  messageEn: string;
  messageHi: string;
  messageHinglish: string;
}

// MediaPipe FaceDetector Singleton Cache
let detectorInstance: FaceDetector | null = null;
let initPromise: Promise<FaceDetector | null> | null = null;
let isWasmFailed = false;

const MEDIAPIPE_WASM_CDN = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm';
const MODEL_ASSET_PATH =
  'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite';

/**
 * Initializes and caches the MediaPipe FaceDetector instance asynchronously.
 * Prevents multiple concurrent initializations and fails gracefully if offline or CDN is blocked.
 */
export async function getOrInitFaceDetector(): Promise<FaceDetector | null> {
  if (detectorInstance) return detectorInstance;
  if (isWasmFailed) return null;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      // 5-second timeout to avoid stalling UI if network is offline or CDN is unreachable
      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error('MediaPipe loading timed out')), 5000)
      );

      const loadTask = async (): Promise<FaceDetector> => {
        const vision = await FilesetResolver.forVisionTasks(MEDIAPIPE_WASM_CDN);
        return await FaceDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: MODEL_ASSET_PATH,
            delegate: 'GPU',
          },
          runningMode: 'IMAGE',
          minDetectionConfidence: 0.38,
        });
      };

      const detector = (await Promise.race([loadTask(), timeoutPromise])) as FaceDetector;
      detectorInstance = detector;
      return detector;
    } catch (err) {
      console.warn('MediaPipe FaceDetector initialization fallback to heuristic engine:', err);
      isWasmFailed = true;
      detectorInstance = null;
      return null;
    } finally {
      initPromise = null;
    }
  })();

  return initPromise;
}

/**
 * Detects faces and subject composition from an image element.
 * Tries MediaPipe neural detector first; if unavailable or no face detected,
 * activates intelligent canvas saliency and skin chrominance heuristic.
 */
export async function detectFacesInImage(
  img: HTMLImageElement
): Promise<SubjectDetectionResult> {
  const imgW = img.naturalWidth || img.width || 1;
  const imgH = img.naturalHeight || img.height || 1;
  const aspectRatio = imgW / imgH;
  const orientation: SubjectOrientation =
    aspectRatio > 1.15 ? 'landscape' : aspectRatio < 0.85 ? 'portrait' : 'square';

  // 1. Try MediaPipe Neural Face Detector
  try {
    const detector = await getOrInitFaceDetector();
    if (detector) {
      const detectionResult = detector.detect(img);

      if (detectionResult && detectionResult.detections && detectionResult.detections.length > 0) {
        const rawDetections = detectionResult.detections;
        const faces: DetectedFace[] = rawDetections.map((det) => {
          const bb = det.boundingBox || { originX: 0, originY: 0, width: 0, height: 0 };
          const normX = Math.max(0, Math.min(1, bb.originX / imgW));
          const normY = Math.max(0, Math.min(1, bb.originY / imgH));
          const normW = Math.max(0.01, Math.min(1 - normX, bb.width / imgW));
          const normH = Math.max(0.01, Math.min(1 - normY, bb.height / imgH));
          const score = det.categories?.[0]?.score || 0.9;

          return {
            box: {
              originX: normX,
              originY: normY,
              width: normW,
              height: normH,
            },
            center: {
              x: normX + normW / 2,
              y: normY + normH / 2,
            },
            confidence: score,
          };
        });

        // Sort faces by area descending (primary face first)
        faces.sort((a, b) => b.box.width * b.box.height - a.box.width * a.box.height);
        const primaryFace = faces[0];

        // Combined bounding box enclosing all faces
        const minX = Math.min(...faces.map((f) => f.box.originX));
        const minY = Math.min(...faces.map((f) => f.box.originY));
        const maxX = Math.max(...faces.map((f) => f.box.originX + f.box.width));
        const maxY = Math.max(...faces.map((f) => f.box.originY + f.box.height));

        const combinedBox = {
          originX: minX,
          originY: minY,
          width: maxX - minX,
          height: maxY - minY,
          centerX: minX + (maxX - minX) / 2,
          centerY: minY + (maxY - minY) / 2,
        };

        const count = faces.length;
        let suggestedMode: 'single' | 'couple' | 'group' | 'fullBody' = 'single';
        let messageEn = 'Smart framing applied (1 face detected)';
        let messageHi = 'स्मार्ट फ्रेमिंग लागू (१ चेहरा मिला)';
        let messageHinglish = 'Smart framing lagayi (1 face mila)';

        if (count === 2) {
          suggestedMode = 'couple';
          messageEn = 'Smart framing applied (Couple detected)';
          messageHi = 'स्मार्ट फ्रेमिंग लागू (कपल चेहरे मिले)';
          messageHinglish = 'Smart framing lagayi (Couple detected)';
        } else if (count >= 3) {
          suggestedMode = 'group';
          messageEn = `Smart framing applied (${count} faces detected)`;
          messageHi = `स्मार्ट फ्रेमिंग लागू (${count} चेहरे मिले)`;
          messageHinglish = `Smart framing lagayi (${count} faces mile)`;
        }

        return {
          faces,
          primaryFace,
          combinedBox,
          imageWidth: imgW,
          imageHeight: imgH,
          aspectRatio,
          orientation,
          suggestedMode,
          status: 'applied',
          engine: 'mediapipe',
          messageEn,
          messageHi,
          messageHinglish,
        };
      }
    }
  } catch (err) {
    console.warn('Face detection error during inference:', err);
  }

  // 2. Intelligent Canvas-Based Saliency & Skin Tone Heuristic Fallback
  return detectSubjectFromCanvasSaliency(img, imgW, imgH, orientation, aspectRatio);
}

/**
 * Intelligent client-side heuristic analyzer for images with no detectable faces,
 * difficult lighting, or when offline. Analyzes skin chrominance and center-of-mass saliency.
 */
function detectSubjectFromCanvasSaliency(
  img: HTMLImageElement,
  imgW: number,
  imgH: number,
  orientation: SubjectOrientation,
  aspectRatio: number
): SubjectDetectionResult {
  try {
    const canvas = document.createElement('canvas');
    const sampleW = 160;
    const sampleH = Math.round(sampleW / aspectRatio);
    canvas.width = sampleW;
    canvas.height = sampleH;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (ctx) {
      ctx.drawImage(img, 0, 0, sampleW, sampleH);
      const imgData = ctx.getImageData(0, 0, sampleW, sampleH);
      const data = imgData.data;

      let totalWeight = 0;
      let weightedX = 0;
      let weightedY = 0;
      let minX = sampleW;
      let maxX = 0;
      let minY = sampleH;
      let maxY = 0;

      for (let y = 0; y < sampleH; y++) {
        for (let x = 0; x < sampleW; x++) {
          const idx = (y * sampleW + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          // YCbCr skin tone detection approximation
          const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
          const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;

          const isSkinTone = cb >= 77 && cb <= 127 && cr >= 133 && cr <= 173;
          // Contrast / edge saliency
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          const weight = isSkinTone ? 3.0 : lum > 50 && lum < 220 ? 0.5 : 0.1;

          if (weight > 1.0) {
            weightedX += x * weight;
            weightedY += y * weight;
            totalWeight += weight;

            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (totalWeight > 50 && maxX > minX && maxY > minY) {
        const normCenterX = weightedX / totalWeight / sampleW;
        const normCenterY = weightedY / totalWeight / sampleH;
        const normW = Math.max(0.2, (maxX - minX) / sampleW);
        const normH = Math.max(0.2, (maxY - minY) / sampleH);

        const heuristicBox = {
          originX: Math.max(0, normCenterX - normW / 2),
          originY: Math.max(0, normCenterY - normH / 2),
          width: Math.min(1, normW),
          height: Math.min(1, normH),
          centerX: normCenterX,
          centerY: normCenterY,
        };

        const pseudoFace: DetectedFace = {
          box: heuristicBox,
          center: { x: normCenterX, y: normCenterY },
          confidence: 0.5,
        };

        return {
          faces: [pseudoFace],
          primaryFace: pseudoFace,
          combinedBox: heuristicBox,
          imageWidth: imgW,
          imageHeight: imgH,
          aspectRatio,
          orientation,
          suggestedMode: 'single',
          status: 'applied',
          engine: 'saliency-heuristic',
          messageEn: 'Smart framing applied (Subject detected)',
          messageHi: 'स्मार्ट फ्रेमिंग लागू (सब्जेक्ट मिला)',
          messageHinglish: 'Smart framing lagayi (Subject detected)',
        };
      }
    }
  } catch (err) {
    console.warn('Canvas saliency analysis error:', err);
  }

  // 3. Complete Fallback: Upper-third rule-of-thirds focal center
  const defaultFocalPoint = {
    originX: 0.25,
    originY: 0.18,
    width: 0.5,
    height: 0.45,
    centerX: 0.5,
    centerY: 0.36,
  };

  return {
    faces: [],
    combinedBox: defaultFocalPoint,
    imageWidth: imgW,
    imageHeight: imgH,
    aspectRatio,
    orientation,
    suggestedMode: 'fullBody',
    status: 'fallback',
    engine: 'saliency-heuristic',
    messageEn: 'Face not detected — using smart center fallback',
    messageHi: 'चेहरा नहीं मिला — स्मार्ट सेंटर फ्रेमिंग लागू',
    messageHinglish: 'Face detect nahi hua — smart center framing lagayi',
  };
}

