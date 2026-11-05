import type { WishMessage } from './types';
import { TRADITIONAL_WISHES } from './wishes/traditional';
import { FAMILY_WISHES } from './wishes/family';
import { FRIENDS_WISHES } from './wishes/friends';
import { LOVE_WISHES } from './wishes/love';
import { PROFESSIONAL_WISHES } from './wishes/professional';
import { FUNNY_WISHES } from './wishes/funny';
import { EMOTIONAL_WISHES } from './wishes/emotional';
import { SHORT_WISHES } from './wishes/short';
import { CAPTIONS_WISHES } from './wishes/captions';
import { BUSINESS_WISHES } from './wishes/business';
import { DHANTERAS_WISHES_DATA } from './wishes/dhanterasWishes';

export {
  TRADITIONAL_WISHES,
  FAMILY_WISHES,
  FRIENDS_WISHES,
  LOVE_WISHES,
  PROFESSIONAL_WISHES,
  FUNNY_WISHES,
  EMOTIONAL_WISHES,
  SHORT_WISHES,
  CAPTIONS_WISHES,
  BUSINESS_WISHES,
  DHANTERAS_WISHES_DATA,
};

/**
 * Diwali Curated Wishes: Exactly 500 wishes
 */
export const DIWALI_WISHES_DATA: WishMessage[] = [
  ...TRADITIONAL_WISHES,   // 50
  ...FAMILY_WISHES,        // 60
  ...FRIENDS_WISHES,       // 60
  ...LOVE_WISHES,          // 50
  ...PROFESSIONAL_WISHES,  // 50
  ...FUNNY_WISHES,         // 40
  ...EMOTIONAL_WISHES,     // 50
  ...SHORT_WISHES,         // 60
  ...CAPTIONS_WISHES,      // 40
  ...BUSINESS_WISHES,      // 40
];

/**
 * FestiveWala Global Curated Wishes Repository:
 * 500 Diwali Wishes + 100 Dhanteras Wishes = 600 Total Curated Wishes.
 */
export const WISHES_DATA: WishMessage[] = [
  ...DIWALI_WISHES_DATA,
  ...DHANTERAS_WISHES_DATA,
];
