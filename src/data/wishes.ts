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
import { CHHATH_PUJA_WISHES_DATA } from './wishes/chhathPujaWishes';

// Dedicated Year-Round Occasions Datasets (100 wishes each = 600 total)
import { BIRTHDAY_WISHES } from './wishes/birthdayWishes';
import { ANNIVERSARY_WISHES } from './wishes/anniversaryWishes';
import { LOVE_MESSAGES } from './wishes/loveMessages';
import { FRIENDSHIP_MESSAGES } from './wishes/friendshipMessages';
import { GOOD_MORNING_WISHES } from './wishes/dailyMorningWishes';
import { GOOD_NIGHT_WISHES } from './wishes/dailyNightWishes';

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
  CHHATH_PUJA_WISHES_DATA,
  // New Occasions Exports
  BIRTHDAY_WISHES,
  ANNIVERSARY_WISHES,
  LOVE_MESSAGES,
  FRIENDSHIP_MESSAGES,
  GOOD_MORNING_WISHES,
  GOOD_NIGHT_WISHES,
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
 * FestiveWala Global Curated Festival Wishes Repository:
 * 500 Diwali Wishes + 100 Dhanteras Wishes + 100 Chhath Puja Wishes = 700 Total Curated Festival Wishes.
 */
export const WISHES_DATA: WishMessage[] = [
  ...DIWALI_WISHES_DATA,
  ...DHANTERAS_WISHES_DATA,
  ...CHHATH_PUJA_WISHES_DATA,
];

/**
 * FestiveWala Curated Year-Round Occasions Wishes Repository:
 * 100 Birthday + 100 Anniversary + 100 Love + 100 Friendship + 100 Morning + 100 Night = 600 Total Occasion Wishes.
 */
export const OCCASIONS_WISHES_DATA: WishMessage[] = [
  ...BIRTHDAY_WISHES,
  ...ANNIVERSARY_WISHES,
  ...LOVE_MESSAGES,
  ...FRIENDSHIP_MESSAGES,
  ...GOOD_MORNING_WISHES,
  ...GOOD_NIGHT_WISHES,
];

/**
 * FestiveWala Master Wishes Repository:
 * 700 Festival Wishes + 600 Year-Round Occasion Wishes = 1300 Total Curated Wishes.
 */
export const ALL_WISHES_DATA: WishMessage[] = [
  ...WISHES_DATA,
  ...OCCASIONS_WISHES_DATA,
];
