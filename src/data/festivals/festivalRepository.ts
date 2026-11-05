import type { GreetingTemplate } from '../../features/greeting-studio/types/template';
import type { WishMessage } from '../types';
import type { GiftIdea } from '../gifts/giftsData';
import type { FestivalDetail } from './types';
import { FESTIVAL_CALENDAR, type FestivalCalendarEntry } from './festivalCalendar';

// Existing Diwali Collections
import { DIWALI_TEMPLATES } from '../../features/greeting-studio/data/templates';
import { PHOTO_TEMPLATES as DIWALI_PHOTO_TEMPLATES } from '../../features/greeting-studio/data/photoTemplates';
import { WISHES_DATA as DIWALI_WISHES_DATA } from '../wishes';
import { GIFTS_DATA as DIWALI_GIFT_IDEAS } from '../gifts/giftsData';
import { FESTIVAL_DETAILS } from './festivalDetails';

// New Dhanteras Collections
import { DHANTERAS_GREETING_TEMPLATES } from '../greetings/dhanterasGreetings';
import { DHANTERAS_PHOTO_TEMPLATES } from '../greetings/dhanterasPhotoTemplates';
import { DHANTERAS_WISHES_DATA } from '../wishes/dhanterasWishes';
import { DHANTERAS_GIFT_IDEAS } from '../gifts/dhanterasGifts';

/**
 * Strict Festival-Aware Repository Architecture.
 * Enforces zero cross-contamination between festivals at data and repository level.
 * Invalid festival IDs return empty collections ([]), never leaking fallback content.
 */

// Centralized Collections Dictionary
const GREETINGS_MAP: Record<string, GreetingTemplate[]> = {
  dhanteras: DHANTERAS_GREETING_TEMPLATES,
  diwali: DIWALI_TEMPLATES,
};

const PHOTO_TEMPLATES_MAP: Record<string, GreetingTemplate[]> = {
  dhanteras: DHANTERAS_PHOTO_TEMPLATES,
  diwali: DIWALI_PHOTO_TEMPLATES,
};

const WISHES_MAP: Record<string, WishMessage[]> = {
  dhanteras: DHANTERAS_WISHES_DATA,
  diwali: DIWALI_WISHES_DATA,
};

const GIFTS_MAP: Record<string, GiftIdea[]> = {
  dhanteras: DHANTERAS_GIFT_IDEAS,
  diwali: DIWALI_GIFT_IDEAS,
};

/**
 * Retrieves standard greeting templates for a specific festival.
 * @param festivalId Unique festival key ('dhanteras' | 'diwali')
 * @returns Array of greeting templates strictly matching festivalId.
 */
export function getGreetingsByFestival(festivalId: string): GreetingTemplate[] {
  if (!festivalId) return [];
  const normalized = festivalId.trim().toLowerCase();
  const list = GREETINGS_MAP[normalized];
  if (!list) return [];
  return list.filter((item) => item.festivalId === normalized);
}

/**
 * Retrieves personalized photo greeting templates for a specific festival.
 * @param festivalId Unique festival key ('dhanteras' | 'diwali')
 * @returns Array of photo templates strictly matching festivalId.
 */
export function getPhotoTemplatesByFestival(festivalId: string): GreetingTemplate[] {
  if (!festivalId) return [];
  const normalized = festivalId.trim().toLowerCase();
  const list = PHOTO_TEMPLATES_MAP[normalized];
  if (!list) return [];
  return list.filter((item) => item.festivalId === normalized);
}

/**
 * Retrieves wishes catalog for a specific festival.
 * @param festivalId Unique festival key ('dhanteras' | 'diwali')
 * @returns Array of wishes strictly matching festivalId.
 */
export function getWishesByFestival(festivalId: string): WishMessage[] {
  if (!festivalId) return [];
  const normalized = festivalId.trim().toLowerCase();
  const list = WISHES_MAP[normalized];
  if (!list) return [];
  return list.filter((item) => item.festivalId === normalized);
}

/**
 * Retrieves gift ideas for a specific festival.
 * @param festivalId Unique festival key ('dhanteras' | 'diwali')
 * @returns Array of gift ideas strictly matching festivalId.
 */
export function getGiftIdeasByFestival(festivalId: string): GiftIdea[] {
  if (!festivalId) return [];
  const normalized = festivalId.trim().toLowerCase();
  const list = GIFTS_MAP[normalized];
  if (!list) return [];
  return list.filter((item) => (item.festivalId || 'diwali') === normalized);
}

/**
 * Retrieves rich editorial festival detail.
 * @param festivalId Unique festival key ('dhanteras' | 'diwali')
 * @returns FestivalDetail record or undefined if nonexistent.
 */
export function getFestivalContent(festivalId: string): FestivalDetail | undefined {
  if (!festivalId) return undefined;
  const normalized = festivalId.trim().toLowerCase();
  return FESTIVAL_DETAILS[normalized];
}

/**
 * Retrieves festival calendar and countdown configuration.
 * @param festivalId Unique festival key ('dhanteras' | 'diwali')
 * @returns FestivalCalendarEntry or undefined.
 */
export function getFestivalCalendarConfig(festivalId: string): FestivalCalendarEntry | undefined {
  if (!festivalId) return undefined;
  const normalized = festivalId.trim().toLowerCase();
  return FESTIVAL_CALENDAR[normalized];
}

/**
 * Combined festival greeting templates (standard + photo) strictly isolated by festivalId.
 */
export function getAllTemplatesByFestival(festivalId: string): GreetingTemplate[] {
  const standard = getGreetingsByFestival(festivalId);
  const photo = getPhotoTemplatesByFestival(festivalId);
  return [...standard, ...photo];
}

