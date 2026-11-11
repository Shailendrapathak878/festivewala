import type { GreetingTemplate } from '../types/template';
import { PURPLE_GOLD_TEMPLATES } from './templates/purpleGold';
import { TRADITIONAL_TEMPLATES } from './templates/traditional';
import { MINIMAL_TEMPLATES } from './templates/minimal';
import { FLORAL_TEMPLATES } from './templates/floral';
import { CREATIVE_TEMPLATES } from './templates/creative';
import { CORPORATE_TEMPLATES } from './templates/corporate';
import { FAMILY_TEMPLATES } from './templates/family';
import { STORY_TEMPLATES } from './templates/story';
import { PHOTO_TEMPLATES as DIWALI_PHOTO_TEMPLATES } from './photoTemplates';
import { DHANTERAS_GREETING_TEMPLATES } from '../../../data/greetings/dhanterasGreetings';
import { DHANTERAS_PHOTO_TEMPLATES } from '../../../data/greetings/dhanterasPhotoTemplates';
import { CHHATH_PUJA_GREETING_TEMPLATES } from '../../../data/greetings/chhathPujaGreetings';
import { CHHATH_PUJA_PHOTO_TEMPLATES } from '../../../data/greetings/chhathPujaPhotoTemplates';

export {
  DIWALI_PHOTO_TEMPLATES as PHOTO_TEMPLATES,
  DHANTERAS_GREETING_TEMPLATES,
  DHANTERAS_PHOTO_TEMPLATES,
  CHHATH_PUJA_GREETING_TEMPLATES,
  CHHATH_PUJA_PHOTO_TEMPLATES,
};

export const DIWALI_TEMPLATES: GreetingTemplate[] = [
  ...PURPLE_GOLD_TEMPLATES,
  ...TRADITIONAL_TEMPLATES,
  ...MINIMAL_TEMPLATES,
  ...FLORAL_TEMPLATES,
  ...CREATIVE_TEMPLATES,
  ...CORPORATE_TEMPLATES,
  ...FAMILY_TEMPLATES,
  ...STORY_TEMPLATES,
];

export const ALL_GREETING_TEMPLATES: GreetingTemplate[] = [
  ...DIWALI_TEMPLATES,
  ...DIWALI_PHOTO_TEMPLATES,
  ...DHANTERAS_GREETING_TEMPLATES,
  ...DHANTERAS_PHOTO_TEMPLATES,
  ...CHHATH_PUJA_GREETING_TEMPLATES,
  ...CHHATH_PUJA_PHOTO_TEMPLATES,
];

export const FESTIVALS_LIST = [
  { id: 'dhanteras', name: 'Dhanteras 2026', nameHi: 'धनतेरस २०२६', status: 'available', templateCount: 35 },
  { id: 'diwali', name: 'Diwali 2026', nameHi: 'दिवाली २०२६', status: 'available', templateCount: 114 },
  { id: 'chhath-puja', name: 'Chhath Puja 2026', nameHi: 'छठ पूजा २०२६', status: 'available', templateCount: 35 },
  { id: 'christmas', name: 'Christmas', nameHi: 'क्रिसमस', status: 'coming-soon', templateCount: 0 },
  { id: 'new-year', name: 'New Year 2027', nameHi: 'नव वर्ष २०२७', status: 'coming-soon', templateCount: 0 },
  { id: 'makar-sankranti', name: 'Makar Sankranti', nameHi: 'मकर संक्रांति', status: 'coming-soon', templateCount: 0 },
  { id: 'maha-shivratri', name: 'Maha Shivratri', nameHi: 'महाशिवरात्रि', status: 'coming-soon', templateCount: 0 },
  { id: 'holi', name: 'Holi 2027', nameHi: 'होली २०२७', status: 'coming-soon', templateCount: 0 },
  { id: 'raksha-bandhan', name: 'Raksha Bandhan', nameHi: 'रक्षाबंधन', status: 'coming-soon', templateCount: 0 },
];
