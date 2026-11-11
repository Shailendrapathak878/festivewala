import type { OutputFormat } from '../types/template';
import { FORMAT_DIMENSIONS } from '../types/template';

export interface LayoutBounds {
  width: number;
  height: number;
  borderPadding: number;

  // Decorative Motif Coordinates
  motif: {
    cx: number;
    cy: number;
    radius: number;
  };

  // Photo Frame & Multi-slot Apertures
  photoFrame: {
    cx: number;
    cy: number;
    radius: number;
    width: number;
    height: number;
    shape?: string;
    slots?: Array<{
      id: string;
      cx: number;
      cy: number;
      width: number;
      height: number;
      radius: number;
      shape: string;
    }>;
  };

  // Typography Coordinates & Sizing
  recipient: {
    x: number;
    y: number;
    maxWidth: number;
    defaultFontSize: number;
  };
  title: {
    x: number;
    y: number;
    maxWidth: number;
    defaultFontSize: number;
  };
  titleDivider?: {
    x: number;
    y: number;
    width: number;
  };
  subtitle: {
    x: number;
    y: number;
    maxWidth: number;
    defaultFontSize: number;
  };
  message: {
    x: number;
    y: number;
    maxWidth: number;
    lineHeight: number;
    defaultFontSize: number;
  };
  divider: {
    x: number;
    y: number;
    width: number;
  };
  sender: {
    x: number;
    y: number;
    maxWidth: number;
    defaultFontSize: number;
  };

  isSplitHorizontal: boolean;
}

function computePhotoLayout(
  format: OutputFormat,
  templateId: string,
  width: number,
  height: number
): LayoutBounds {
  const isFamily =
    templateId === 'photo-parivar-panoramic' ||
    templateId === 'photo-hearth-and-home' ||
    templateId.includes('panoramic');
  const isFriends =
    templateId === 'photo-yaari-sparklers' ||
    templateId === 'photo-rooftop-gang' ||
    templateId.includes('polaroid');
  const isDuo = templateId === 'photo-festive-duet-collage' || templateId.includes('duet');
  const isQuad = templateId === 'photo-quad-memories-collage' || templateId.includes('quad');
  const isFullBleed =
    templateId === 'photo-cinematic-scrim' ||
    templateId === 'photo-golden-hour-full' ||
    templateId.includes('full-bleed');
  const isSplit = templateId === 'photo-modern-split-duo' || templateId.includes('split');
  const isJharokha = templateId === 'photo-traditional-jharokha' || templateId.includes('jharokha');

  const motif = { cx: width / 2, cy: 120, radius: 40 };

  // 1. Square (1080 x 1080)
  if (format === 'square') {
    if (isFullBleed) {
      return {
        width, height, borderPadding: 32, motif,
        photoFrame: { cx: 540, cy: 540, width: 1080, height: 1080, radius: 540, shape: 'full-bleed' },
        recipient: { x: 540, y: 640, maxWidth: 900, defaultFontSize: 28 },
        title: { x: 540, y: 720, maxWidth: 920, defaultFontSize: 78 },
        titleDivider: { x: 540, y: 775, width: 300 },
        subtitle: { x: 540, y: 815, maxWidth: 860, defaultFontSize: 26 },
        message: { x: 540, y: 905, maxWidth: 860, lineHeight: 44, defaultFontSize: 26 },
        divider: { x: 540, y: 990, width: 280 },
        sender: { x: 540, y: 1030, maxWidth: 800, defaultFontSize: 28 },
        isSplitHorizontal: false,
      };
    }
    if (isSplit) {
      return {
        width, height, borderPadding: 32, motif,
        photoFrame: { cx: 270, cy: 540, width: 540, height: 1080, radius: 270, shape: 'split-half' },
        recipient: { x: 810, y: 260, maxWidth: 460, defaultFontSize: 24 },
        title: { x: 810, y: 350, maxWidth: 460, defaultFontSize: 54 },
        titleDivider: { x: 810, y: 410, width: 240 },
        subtitle: { x: 810, y: 460, maxWidth: 460, defaultFontSize: 22 },
        message: { x: 810, y: 600, maxWidth: 460, lineHeight: 42, defaultFontSize: 24 },
        divider: { x: 810, y: 780, width: 240 },
        sender: { x: 810, y: 840, maxWidth: 460, defaultFontSize: 26 },
        isSplitHorizontal: true,
      };
    }
    if (isDuo) {
      return {
        width, height, borderPadding: 44, motif,
        photoFrame: {
          cx: 540, cy: 360, width: 780, height: 420, radius: 210, shape: 'multi-duo',
          slots: [
            { id: 'slot-0', cx: 330, cy: 360, width: 360, height: 420, radius: 180, shape: 'rounded-rect' },
            { id: 'slot-1', cx: 750, cy: 360, width: 360, height: 420, radius: 180, shape: 'rounded-rect' },
          ],
        },
        recipient: { x: 540, y: 630, maxWidth: 840, defaultFontSize: 26 },
        title: { x: 540, y: 700, maxWidth: 880, defaultFontSize: 68 },
        titleDivider: { x: 540, y: 750, width: 280 },
        subtitle: { x: 540, y: 790, maxWidth: 840, defaultFontSize: 24 },
        message: { x: 540, y: 875, maxWidth: 840, lineHeight: 40, defaultFontSize: 25 },
        divider: { x: 540, y: 965, width: 280 },
        sender: { x: 540, y: 1010, maxWidth: 800, defaultFontSize: 28 },
        isSplitHorizontal: false,
      };
    }
    if (isQuad) {
      return {
        width, height, borderPadding: 44, motif,
        photoFrame: {
          cx: 540, cy: 350, width: 780, height: 460, radius: 230, shape: 'multi-quad',
          slots: [
            { id: 'slot-0', cx: 340, cy: 230, width: 350, height: 210, radius: 105, shape: 'rounded-rect' },
            { id: 'slot-1', cx: 740, cy: 230, width: 350, height: 210, radius: 105, shape: 'rounded-rect' },
            { id: 'slot-2', cx: 340, cy: 460, width: 350, height: 210, radius: 105, shape: 'rounded-rect' },
            { id: 'slot-3', cx: 740, cy: 460, width: 350, height: 210, radius: 105, shape: 'rounded-rect' },
          ],
        },
        recipient: { x: 540, y: 625, maxWidth: 840, defaultFontSize: 26 },
        title: { x: 540, y: 690, maxWidth: 880, defaultFontSize: 66 },
        titleDivider: { x: 540, y: 740, width: 280 },
        subtitle: { x: 540, y: 780, maxWidth: 840, defaultFontSize: 24 },
        message: { x: 540, y: 865, maxWidth: 840, lineHeight: 40, defaultFontSize: 25 },
        divider: { x: 540, y: 955, width: 280 },
        sender: { x: 540, y: 1005, maxWidth: 800, defaultFontSize: 28 },
        isSplitHorizontal: false,
      };
    }
    if (isFamily) {
      return {
        width, height, borderPadding: 44, motif,
        photoFrame: { cx: 540, cy: 350, width: 720, height: 440, radius: 260, shape: 'panoramic' },
        recipient: { x: 540, y: 625, maxWidth: 860, defaultFontSize: 26 },
        title: { x: 540, y: 695, maxWidth: 880, defaultFontSize: 70 },
        titleDivider: { x: 540, y: 750, width: 280 },
        subtitle: { x: 540, y: 790, maxWidth: 840, defaultFontSize: 24 },
        message: { x: 540, y: 880, maxWidth: 860, lineHeight: 42, defaultFontSize: 26 },
        divider: { x: 540, y: 975, width: 280 },
        sender: { x: 540, y: 1015, maxWidth: 800, defaultFontSize: 28 },
        isSplitHorizontal: false,
      };
    }
    const shape = isJharokha ? 'jharokha' : isFriends ? 'polaroid' : templateId === 'photo-gilded-heritage' ? 'arch' : templateId === 'photo-royal-portrait' ? 'circle' : templateId === 'photo-starlight-romance' ? 'oval' : 'rounded-rect';
    return {
      width, height, borderPadding: 44, motif,
      photoFrame: { cx: 540, cy: 360, width: 440, height: 440, radius: 220, shape },
      recipient: { x: 540, y: 630, maxWidth: 840, defaultFontSize: 26 },
      title: { x: 540, y: 705, maxWidth: 880, defaultFontSize: 72 },
      titleDivider: { x: 540, y: 760, width: 280 },
      subtitle: { x: 540, y: 800, maxWidth: 840, defaultFontSize: 24 },
      message: { x: 540, y: 890, maxWidth: 840, lineHeight: 42, defaultFontSize: 26 },
      divider: { x: 540, y: 980, width: 280 },
      sender: { x: 540, y: 1020, maxWidth: 800, defaultFontSize: 28 },
      isSplitHorizontal: false,
    };
  }

  // 2. Story (1080 x 1920)
  if (format === 'story') {
    if (isFullBleed) {
      return {
        width, height, borderPadding: 52, motif,
        photoFrame: { cx: 540, cy: 960, width: 1080, height: 1920, radius: 540, shape: 'full-bleed' },
        recipient: { x: 540, y: 1140, maxWidth: 900, defaultFontSize: 30 },
        title: { x: 540, y: 1240, maxWidth: 920, defaultFontSize: 84 },
        titleDivider: { x: 540, y: 1300, width: 320 },
        subtitle: { x: 540, y: 1350, maxWidth: 880, defaultFontSize: 28 },
        message: { x: 540, y: 1480, maxWidth: 880, lineHeight: 48, defaultFontSize: 28 },
        divider: { x: 540, y: 1610, width: 320 },
        sender: { x: 540, y: 1670, maxWidth: 840, defaultFontSize: 32 },
        isSplitHorizontal: false,
      };
    }
    if (isSplit) {
      return {
        width, height, borderPadding: 44, motif,
        photoFrame: { cx: 540, cy: 480, width: 1080, height: 960, radius: 480, shape: 'split-half' },
        recipient: { x: 540, y: 1080, maxWidth: 880, defaultFontSize: 28 },
        title: { x: 540, y: 1180, maxWidth: 900, defaultFontSize: 78 },
        titleDivider: { x: 540, y: 1245, width: 320 },
        subtitle: { x: 540, y: 1295, maxWidth: 860, defaultFontSize: 26 },
        message: { x: 540, y: 1430, maxWidth: 860, lineHeight: 46, defaultFontSize: 28 },
        divider: { x: 540, y: 1560, width: 320 },
        sender: { x: 540, y: 1640, maxWidth: 840, defaultFontSize: 30 },
        isSplitHorizontal: false,
      };
    }
    if (isDuo) {
      return {
        width, height, borderPadding: 52, motif,
        photoFrame: {
          cx: 540, cy: 620, width: 880, height: 820, radius: 410, shape: 'multi-duo',
          slots: [
            { id: 'slot-0', cx: 540, cy: 420, width: 800, height: 380, radius: 190, shape: 'rounded-rect' },
            { id: 'slot-1', cx: 540, cy: 840, width: 800, height: 380, radius: 190, shape: 'rounded-rect' },
          ],
        },
        recipient: { x: 540, y: 1120, maxWidth: 880, defaultFontSize: 30 },
        title: { x: 540, y: 1220, maxWidth: 920, defaultFontSize: 80 },
        titleDivider: { x: 540, y: 1285, width: 320 },
        subtitle: { x: 540, y: 1335, maxWidth: 880, defaultFontSize: 28 },
        message: { x: 540, y: 1470, maxWidth: 880, lineHeight: 48, defaultFontSize: 28 },
        divider: { x: 540, y: 1600, width: 320 },
        sender: { x: 540, y: 1670, maxWidth: 840, defaultFontSize: 32 },
        isSplitHorizontal: false,
      };
    }
    if (isQuad) {
      return {
        width, height, borderPadding: 52, motif,
        photoFrame: {
          cx: 540, cy: 640, width: 880, height: 760, radius: 380, shape: 'multi-quad',
          slots: [
            { id: 'slot-0', cx: 330, cy: 460, width: 380, height: 340, radius: 170, shape: 'rounded-rect' },
            { id: 'slot-1', cx: 750, cy: 460, width: 380, height: 340, radius: 170, shape: 'rounded-rect' },
            { id: 'slot-2', cx: 330, cy: 820, width: 380, height: 340, radius: 170, shape: 'rounded-rect' },
            { id: 'slot-3', cx: 750, cy: 820, width: 380, height: 340, radius: 170, shape: 'rounded-rect' },
          ],
        },
        recipient: { x: 540, y: 1100, maxWidth: 880, defaultFontSize: 30 },
        title: { x: 540, y: 1200, maxWidth: 920, defaultFontSize: 78 },
        titleDivider: { x: 540, y: 1265, width: 320 },
        subtitle: { x: 540, y: 1315, maxWidth: 880, defaultFontSize: 28 },
        message: { x: 540, y: 1450, maxWidth: 880, lineHeight: 48, defaultFontSize: 28 },
        divider: { x: 540, y: 1580, width: 320 },
        sender: { x: 540, y: 1650, maxWidth: 840, defaultFontSize: 32 },
        isSplitHorizontal: false,
      };
    }
    if (isFamily) {
      return {
        width, height, borderPadding: 52, motif,
        photoFrame: { cx: 540, cy: 550, width: 880, height: 560, radius: 280, shape: 'panoramic' },
        recipient: { x: 540, y: 950, maxWidth: 880, defaultFontSize: 30 },
        title: { x: 540, y: 1050, maxWidth: 920, defaultFontSize: 82 },
        titleDivider: { x: 540, y: 1115, width: 320 },
        subtitle: { x: 540, y: 1165, maxWidth: 880, defaultFontSize: 28 },
        message: { x: 540, y: 1310, maxWidth: 880, lineHeight: 48, defaultFontSize: 28 },
        divider: { x: 540, y: 1460, width: 320 },
        sender: { x: 540, y: 1540, maxWidth: 840, defaultFontSize: 32 },
        isSplitHorizontal: false,
      };
    }
    const shape = isJharokha ? 'jharokha' : isFriends ? 'polaroid' : templateId === 'photo-gilded-heritage' ? 'arch' : templateId === 'photo-royal-portrait' ? 'circle' : templateId === 'photo-starlight-romance' ? 'oval' : 'rounded-rect';
    return {
      width, height, borderPadding: 52, motif,
      photoFrame: { cx: 540, cy: 560, width: 560, height: 580, radius: 280, shape },
      recipient: { x: 540, y: 960, maxWidth: 880, defaultFontSize: 30 },
      title: { x: 540, y: 1060, maxWidth: 920, defaultFontSize: 82 },
      titleDivider: { x: 540, y: 1125, width: 320 },
      subtitle: { x: 540, y: 1175, maxWidth: 880, defaultFontSize: 28 },
      message: { x: 540, y: 1320, maxWidth: 880, lineHeight: 48, defaultFontSize: 28 },
      divider: { x: 540, y: 1470, width: 320 },
      sender: { x: 540, y: 1540, maxWidth: 840, defaultFontSize: 32 },
      isSplitHorizontal: false,
    };
  }

  // 3. Portrait (1080 x 1350)
  if (format === 'portrait') {
    if (isFullBleed) {
      return {
        width, height, borderPadding: 44, motif,
        photoFrame: { cx: 540, cy: 675, width: 1080, height: 1350, radius: 540, shape: 'full-bleed' },
        recipient: { x: 540, y: 780, maxWidth: 900, defaultFontSize: 28 },
        title: { x: 540, y: 870, maxWidth: 920, defaultFontSize: 80 },
        titleDivider: { x: 540, y: 930, width: 320 },
        subtitle: { x: 540, y: 975, maxWidth: 880, defaultFontSize: 26 },
        message: { x: 540, y: 1090, maxWidth: 880, lineHeight: 46, defaultFontSize: 28 },
        divider: { x: 540, y: 1205, width: 300 },
        sender: { x: 540, y: 1255, maxWidth: 840, defaultFontSize: 30 },
        isSplitHorizontal: false,
      };
    }
    if (isDuo) {
      return {
        width, height, borderPadding: 44, motif,
        photoFrame: {
          cx: 540, cy: 440, width: 800, height: 460, radius: 230, shape: 'multi-duo',
          slots: [
            { id: 'slot-0', cx: 330, cy: 440, width: 370, height: 460, radius: 185, shape: 'rounded-rect' },
            { id: 'slot-1', cx: 750, cy: 440, width: 370, height: 460, radius: 185, shape: 'rounded-rect' },
          ],
        },
        recipient: { x: 540, y: 750, maxWidth: 860, defaultFontSize: 28 },
        title: { x: 540, y: 835, maxWidth: 900, defaultFontSize: 72 },
        titleDivider: { x: 540, y: 890, width: 300 },
        subtitle: { x: 540, y: 935, maxWidth: 860, defaultFontSize: 26 },
        message: { x: 540, y: 1045, maxWidth: 860, lineHeight: 44, defaultFontSize: 26 },
        divider: { x: 540, y: 1150, width: 300 },
        sender: { x: 540, y: 1205, maxWidth: 840, defaultFontSize: 30 },
        isSplitHorizontal: false,
      };
    }
    if (isFamily) {
      return {
        width, height, borderPadding: 44, motif,
        photoFrame: { cx: 540, cy: 430, width: 780, height: 480, radius: 240, shape: 'panoramic' },
        recipient: { x: 540, y: 750, maxWidth: 860, defaultFontSize: 28 },
        title: { x: 540, y: 835, maxWidth: 900, defaultFontSize: 74 },
        titleDivider: { x: 540, y: 895, width: 300 },
        subtitle: { x: 540, y: 940, maxWidth: 860, defaultFontSize: 26 },
        message: { x: 540, y: 1050, maxWidth: 860, lineHeight: 44, defaultFontSize: 26 },
        divider: { x: 540, y: 1155, width: 300 },
        sender: { x: 540, y: 1210, maxWidth: 840, defaultFontSize: 30 },
        isSplitHorizontal: false,
      };
    }
    const shape = isJharokha ? 'jharokha' : isFriends ? 'polaroid' : templateId === 'photo-gilded-heritage' ? 'arch' : templateId === 'photo-royal-portrait' ? 'circle' : templateId === 'photo-starlight-romance' ? 'oval' : 'rounded-rect';
    return {
      width, height, borderPadding: 44, motif,
      photoFrame: { cx: 540, cy: 440, width: 480, height: 500, radius: 240, shape },
      recipient: { x: 540, y: 760, maxWidth: 860, defaultFontSize: 28 },
      title: { x: 540, y: 845, maxWidth: 900, defaultFontSize: 74 },
      titleDivider: { x: 540, y: 905, width: 300 },
      subtitle: { x: 540, y: 950, maxWidth: 860, defaultFontSize: 26 },
      message: { x: 540, y: 1060, maxWidth: 860, lineHeight: 44, defaultFontSize: 26 },
      divider: { x: 540, y: 1165, width: 300 },
      sender: { x: 540, y: 1220, maxWidth: 840, defaultFontSize: 30 },
      isSplitHorizontal: false,
    };
  }

  // 4. Landscape (1920 x 1080) — Two-column open booklet!
  let photoAperture = { cx: 480, cy: 540, width: 620, height: 620, radius: 310, shape: 'rounded-rect' as string, slots: undefined as any };

  if (isFamily) {
    photoAperture = { cx: 480, cy: 540, width: 800, height: 540, radius: 270, shape: 'panoramic', slots: undefined };
  } else if (isDuo) {
    photoAperture = {
      cx: 480, cy: 540, width: 780, height: 540, radius: 270, shape: 'multi-duo',
      slots: [
        { id: 'slot-0', cx: 280, cy: 540, width: 360, height: 540, radius: 180, shape: 'rounded-rect' },
        { id: 'slot-1', cx: 680, cy: 540, width: 360, height: 540, radius: 180, shape: 'rounded-rect' },
      ],
    };
  } else if (isQuad) {
    photoAperture = {
      cx: 480, cy: 540, width: 780, height: 560, radius: 280, shape: 'multi-quad',
      slots: [
        { id: 'slot-0', cx: 280, cy: 380, width: 360, height: 260, radius: 130, shape: 'rounded-rect' },
        { id: 'slot-1', cx: 680, cy: 380, width: 360, height: 260, radius: 130, shape: 'rounded-rect' },
        { id: 'slot-2', cx: 280, cy: 680, width: 360, height: 260, radius: 130, shape: 'rounded-rect' },
        { id: 'slot-3', cx: 680, cy: 680, width: 360, height: 260, radius: 130, shape: 'rounded-rect' },
      ],
    };
  } else if (isFullBleed) {
    photoAperture = { cx: 960, cy: 540, width: 1920, height: 1080, radius: 540, shape: 'full-bleed', slots: undefined };
  } else if (isJharokha) {
    photoAperture = { cx: 480, cy: 540, width: 560, height: 640, radius: 280, shape: 'jharokha', slots: undefined };
  } else if (templateId === 'photo-royal-portrait') {
    photoAperture = { cx: 480, cy: 540, width: 540, height: 540, radius: 270, shape: 'circle', slots: undefined };
  } else if (templateId === 'photo-starlight-romance') {
    photoAperture = { cx: 480, cy: 540, width: 540, height: 620, radius: 270, shape: 'oval', slots: undefined };
  }

  return {
    width, height, borderPadding: 52, motif: { cx: 1440, cy: 180, radius: 40 },
    photoFrame: photoAperture,
    recipient: { x: 1440, y: 270, maxWidth: 840, defaultFontSize: 28 },
    title: { x: 1440, y: 370, maxWidth: 860, defaultFontSize: 76 },
    titleDivider: { x: 1440, y: 440, width: 340 },
    subtitle: { x: 1440, y: 495, maxWidth: 820, defaultFontSize: 28 },
    message: { x: 1440, y: 640, maxWidth: 820, lineHeight: 48, defaultFontSize: 28 },
    divider: { x: 1440, y: 780, width: 340 },
    sender: { x: 1440, y: 860, maxWidth: 800, defaultFontSize: 32 },
    isSplitHorizontal: true,
  };
}

export function computeLayout(
  format: OutputFormat,
  hasPhoto: boolean = false,
  templateId?: string,
  compositionStyle?: string
): LayoutBounds {
  const { width, height } = FORMAT_DIMENSIONS[format];

  // Dedicated Photo Studio Layout Engine
  if (templateId?.startsWith('photo-')) {
    return computePhotoLayout(format, templateId, width, height);
  }

  // Resolve archetype
  const style =
    compositionStyle ||
    (templateId === 'elegant-corporate-diwali'
      ? 'corporate-letterhead'
      : templateId === 'minimal-champagne'
      ? 'minimal-invitation'
      : templateId === 'floral-celebration'
      ? 'floral-border'
      : templateId === 'joyful-festive'
      ? 'joyful-celebratory'
      : templateId === 'diwali-story-special'
      ? 'vertical-story'
      : templateId === 'royal-diya' || templateId === 'golden-petals'
      ? 'hero-artwork'
      : 'traditional-ornamental');

  switch (format) {
    case 'story': { // 1080 x 1920 (9:16)
      return {
        width,
        height,
        borderPadding: 52,
        motif: {
          cx: width / 2,
          cy: hasPhoto ? 380 : 440,
          radius: hasPhoto ? 140 : 190,
        },
        photoFrame: {
          cx: width / 2,
          cy: 480,
          radius: 175,
          width: 350,
          height: 350,
        },
        recipient: {
          x: width / 2,
          y: hasPhoto ? 760 : 730,
          maxWidth: 880,
          defaultFontSize: 32,
        },
        title: {
          x: width / 2,
          y: hasPhoto ? 870 : 850,
          maxWidth: 920,
          defaultFontSize: 82, // Grand mobile readability
        },
        titleDivider: {
          x: width / 2,
          y: hasPhoto ? 940 : 920,
          width: 320,
        },
        subtitle: {
          x: width / 2,
          y: hasPhoto ? 995 : 975,
          maxWidth: 880,
          defaultFontSize: 28,
        },
        message: {
          x: width / 2,
          y: hasPhoto ? 1160 : 1140,
          maxWidth: 840,
          lineHeight: 52,
          defaultFontSize: 30,
        },
        divider: {
          x: width / 2,
          y: 1390,
          width: 440,
        },
        sender: {
          x: width / 2,
          y: 1540,
          maxWidth: 880,
          defaultFontSize: 34,
        },
        isSplitHorizontal: false,
      };
    }

    case 'portrait': { // 1080 x 1350 (4:5)
      return {
        width,
        height,
        borderPadding: 44,
        motif: {
          cx: width / 2,
          cy: hasPhoto ? 240 : 285,
          radius: hasPhoto ? 120 : 155,
        },
        photoFrame: {
          cx: width / 2,
          cy: 330,
          radius: 145,
          width: 290,
          height: 290,
        },
        recipient: {
          x: width / 2,
          y: hasPhoto ? 530 : 500,
          maxWidth: 860,
          defaultFontSize: 28,
        },
        title: {
          x: width / 2,
          y: hasPhoto ? 630 : 600,
          maxWidth: 880,
          defaultFontSize: 74,
        },
        titleDivider: {
          x: width / 2,
          y: hasPhoto ? 690 : 660,
          width: 260,
        },
        subtitle: {
          x: width / 2,
          y: hasPhoto ? 740 : 710,
          maxWidth: 840,
          defaultFontSize: 26,
        },
        message: {
          x: width / 2,
          y: hasPhoto ? 870 : 840,
          maxWidth: 820,
          lineHeight: 48,
          defaultFontSize: 28,
        },
        divider: {
          x: width / 2,
          y: 1040,
          width: 380,
        },
        sender: {
          x: width / 2,
          y: 1190,
          maxWidth: 840,
          defaultFontSize: 32,
        },
        isSplitHorizontal: false,
      };
    }

    case 'landscape': { // 1920 x 1080 (16:9) - Split Chamber Composition
      return {
        width,
        height,
        borderPadding: 48,
        motif: {
          cx: hasPhoto ? 480 : 500,
          cy: height / 2,
          radius: hasPhoto ? 170 : 230,
        },
        photoFrame: {
          cx: 500,
          cy: height / 2,
          radius: 200,
          width: 400,
          height: 400,
        },
        recipient: {
          x: 1330,
          y: 220,
          maxWidth: 820,
          defaultFontSize: 30,
        },
        title: {
          x: 1330,
          y: 335,
          maxWidth: 860,
          defaultFontSize: 72,
        },
        titleDivider: {
          x: 1330,
          y: 400,
          width: 260,
        },
        subtitle: {
          x: 1330,
          y: 450,
          maxWidth: 820,
          defaultFontSize: 26,
        },
        message: {
          x: 1330,
          y: 590,
          maxWidth: 800,
          lineHeight: 48,
          defaultFontSize: 28,
        },
        divider: {
          x: 1330,
          y: 740,
          width: 380,
        },
        sender: {
          x: 1330,
          y: 875,
          maxWidth: 820,
          defaultFontSize: 32,
        },
        isSplitHorizontal: true,
      };
    }

    case 'square': // 1080 x 1080 (1:1)
    default: {
      if (style === 'corporate-letterhead') {
        // Corporate Executive Letterhead Layout
        return {
          width,
          height,
          borderPadding: 44,
          motif: {
            cx: width / 2,
            cy: hasPhoto ? 165 : 185,
            radius: hasPhoto ? 80 : 95,
          },
          photoFrame: {
            cx: width / 2,
            cy: 220,
            radius: 115,
            width: 230,
            height: 230,
          },
          recipient: {
            x: width / 2,
            y: hasPhoto ? 370 : 310,
            maxWidth: 860,
            defaultFontSize: 30,
          },
          title: {
            x: width / 2,
            y: hasPhoto ? 470 : 405,
            maxWidth: 900,
            defaultFontSize: 68,
          },
          titleDivider: {
            x: width / 2,
            y: hasPhoto ? 530 : 465,
            width: 240,
          },
          subtitle: {
            x: width / 2,
            y: hasPhoto ? 575 : 510,
            maxWidth: 840,
            defaultFontSize: 24,
          },
          message: {
            x: width / 2,
            y: hasPhoto ? 700 : 640,
            maxWidth: 820,
            lineHeight: 46,
            defaultFontSize: 26,
          },
          divider: {
            x: width / 2,
            y: 805,
            width: 340,
          },
          sender: {
            x: width / 2,
            y: 915,
            maxWidth: 860,
            defaultFontSize: 32,
          },
          isSplitHorizontal: false,
        };
      }

      if (style === 'minimal-invitation') {
        // Minimal Luxury Invitation Layout (Generous Breathing Room)
        return {
          width,
          height,
          borderPadding: 44,
          motif: {
            cx: width / 2,
            cy: hasPhoto ? 180 : 205,
            radius: hasPhoto ? 85 : 60,
          },
          photoFrame: {
            cx: width / 2,
            cy: 230,
            radius: 120,
            width: 240,
            height: 240,
          },
          recipient: {
            x: width / 2,
            y: hasPhoto ? 400 : 320,
            maxWidth: 820,
            defaultFontSize: 28,
          },
          title: {
            x: width / 2,
            y: hasPhoto ? 505 : 425,
            maxWidth: 880,
            defaultFontSize: 74,
          },
          titleDivider: {
            x: width / 2,
            y: hasPhoto ? 570 : 490,
            width: 220,
          },
          subtitle: {
            x: width / 2,
            y: hasPhoto ? 620 : 540,
            maxWidth: 800,
            defaultFontSize: 24,
          },
          message: {
            x: width / 2,
            y: hasPhoto ? 735 : 670,
            maxWidth: 780,
            lineHeight: 50,
            defaultFontSize: 28,
          },
          divider: {
            x: width / 2,
            y: 825,
            width: 320,
          },
          sender: {
            x: width / 2,
            y: 920,
            maxWidth: 800,
            defaultFontSize: 30,
          },
          isSplitHorizontal: false,
        };
      }

      if (style === 'floral-border') {
        // Floral Toran Framing Composition
        return {
          width,
          height,
          borderPadding: 40,
          motif: {
            cx: width / 2,
            cy: hasPhoto ? 210 : 230,
            radius: hasPhoto ? 95 : 90,
          },
          photoFrame: {
            cx: width / 2,
            cy: 250,
            radius: 120,
            width: 240,
            height: 240,
          },
          recipient: {
            x: width / 2,
            y: hasPhoto ? 420 : 370,
            maxWidth: 840,
            defaultFontSize: 28,
          },
          title: {
            x: width / 2,
            y: hasPhoto ? 520 : 470,
            maxWidth: 880,
            defaultFontSize: 72,
          },
          titleDivider: {
            x: width / 2,
            y: hasPhoto ? 580 : 530,
            width: 240,
          },
          subtitle: {
            x: width / 2,
            y: hasPhoto ? 630 : 580,
            maxWidth: 840,
            defaultFontSize: 24,
          },
          message: {
            x: width / 2,
            y: hasPhoto ? 740 : 700,
            maxWidth: 820,
            lineHeight: 46,
            defaultFontSize: 26,
          },
          divider: {
            x: width / 2,
            y: 845,
            width: 340,
          },
          sender: {
            x: width / 2,
            y: 940,
            maxWidth: 840,
            defaultFontSize: 30,
          },
          isSplitHorizontal: false,
        };
      }

      if (style === 'joyful-celebratory') {
        // Joyful Lanterns & Celebratory Layout
        return {
          width,
          height,
          borderPadding: 40,
          motif: {
            cx: width / 2,
            cy: hasPhoto ? 215 : 240,
            radius: hasPhoto ? 95 : 105,
          },
          photoFrame: {
            cx: width / 2,
            cy: 260,
            radius: 125,
            width: 250,
            height: 250,
          },
          recipient: {
            x: width / 2,
            y: hasPhoto ? 430 : 405,
            maxWidth: 840,
            defaultFontSize: 28,
          },
          title: {
            x: width / 2,
            y: hasPhoto ? 530 : 505,
            maxWidth: 880,
            defaultFontSize: 72,
          },
          titleDivider: {
            x: width / 2,
            y: hasPhoto ? 590 : 565,
            width: 240,
          },
          subtitle: {
            x: width / 2,
            y: hasPhoto ? 640 : 615,
            maxWidth: 840,
            defaultFontSize: 24,
          },
          message: {
            x: width / 2,
            y: hasPhoto ? 745 : 725,
            maxWidth: 820,
            lineHeight: 46,
            defaultFontSize: 26,
          },
          divider: {
            x: width / 2,
            y: 855,
            width: 340,
          },
          sender: {
            x: width / 2,
            y: 950,
            maxWidth: 840,
            defaultFontSize: 30,
          },
          isSplitHorizontal: false,
        };
      }

      // Default: Traditional Ornamental & Hero Artwork
      return {
        width,
        height,
        borderPadding: 42,
        motif: {
          cx: width / 2,
          cy: hasPhoto ? 215 : 245,
          radius: hasPhoto ? 105 : 138,
        },
        photoFrame: {
          cx: width / 2,
          cy: 265,
          radius: 130,
          width: 260,
          height: 260,
        },
        recipient: {
          x: width / 2,
          y: hasPhoto ? 440 : 425,
          maxWidth: 840,
          defaultFontSize: 28,
        },
        title: {
          x: width / 2,
          y: hasPhoto ? 540 : 525,
          maxWidth: 880,
          defaultFontSize: 72,
        },
        titleDivider: {
          x: width / 2,
          y: hasPhoto ? 600 : 585,
          width: 250,
        },
        subtitle: {
          x: width / 2,
          y: hasPhoto ? 650 : 635,
          maxWidth: 840,
          defaultFontSize: 24,
        },
        message: {
          x: width / 2,
          y: hasPhoto ? 755 : 740,
          maxWidth: 820,
          lineHeight: 46,
          defaultFontSize: 26,
        },
        divider: {
          x: width / 2,
          y: 865,
          width: 340,
        },
        sender: {
          x: width / 2,
          y: 960,
          maxWidth: 840,
          defaultFontSize: 32,
        },
        isSplitHorizontal: false,
      };
    }
  }
}
