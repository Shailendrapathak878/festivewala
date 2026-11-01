import type { OutputFormat, GreetingTemplate } from './template';

export type FramingMode = 'single' | 'couple' | 'group' | 'fullBody';
export type FramingStatus = 'analyzing' | 'applied' | 'fallback' | 'manual';

export interface UserPhoto {
  file?: File;
  dataUrl?: string;
  fileName?: string;
  zoom: number;       // 1.0 is default, 0.5 to 3.0
  panX: number;       // legacy offset in pixels (-500 to +500)
  panY: number;       // legacy offset in pixels (-500 to +500)
  normalizedPanX?: number; // canonical normalized horizontal offset (-1.0 to +1.0 relative to aperture width)
  normalizedPanY?: number; // canonical normalized vertical offset (-1.0 to +1.0 relative to aperture height)
  rotation?: number;  // degrees (-180 to 180)
  fitMode?: 'cover' | 'contain'; // cover fills aperture, contain letterboxes to show full image
  autoFramingMode?: FramingMode;
  detectedFacesCount?: number;
  isAutoFramed?: boolean;
  framingStatus?: FramingStatus;
  detectedFaceBoxes?: Array<{ originX: number; originY: number; width: number; height: number }>;
}

export interface CardCustomization {
  title: string;
  subtitle: string;
  recipient: string;
  message: string;
  sender: string;
  relationship?: string;
  customRelationship?: string;
  
  // Typography overrides
  fontFamily: string;
  titleFontSize: number;
  bodyFontSize: number;
  textColor: string;
  accentColor: string;
  textAlign: 'center' | 'left' | 'right';
  hasTextShadow: boolean;
  
  // Decorative toggles
  showBorder: boolean;
  showOrnaments: boolean;
  showParticles: boolean;
  borderStyle: 'double-gold' | 'rangoli-dots' | 'royal-filigree' | 'minimal-hairline' | 'festive-toran' | 'brushed-brass';
  bgVariant: 'default' | 'vibrant' | 'minimal' | 'dark';
  bgGradientType?: 'radial' | 'linear-vertical' | 'linear-diagonal' | 'solid';
  
  // Primary Photo & Multi-photo slots
  photo?: UserPhoto;
  photos?: Record<string, UserPhoto>;
  activePhotoSlot?: string;
}

export type EditorTab = 'text' | 'design' | 'photo' | 'presets';

export interface EditorState {
  selectedFestivalId: string;
  activeTemplate: GreetingTemplate;
  format: OutputFormat;
  customization: CardCustomization;
  activeTab: EditorTab;
  isExporting: boolean;
  isSharing: boolean;
}

