import { FESTIVALS_DATA } from '../data/festivals';
import { FESTIVAL_CALENDAR, type FestivalCalendarEntry } from '../data/festivals/festivalCalendar';
import type { FestivalItem } from '../data/types';
import { getISTYear } from '../utils/festivalDateUtils';

export interface FestivalFeatureAvailability {
  hasGreetings: boolean;
  greetingsCount: number;
  greetingsUrl?: string;
  hasPhotoGreetings: boolean;
  photoCount: number;
  photoGreetingsUrl?: string;
  hasWishes: boolean;
  wishesCount: number;
  wishesUrl?: string;
  hasGifts: boolean;
  giftsCount: number;
  giftsUrl?: string;
  hasGuide: boolean;
  guideUrl?: string;
  hasRangoli: boolean;
  rangoliUrl?: string;
  hasDecorations: boolean;
  decorationsUrl?: string;
}

export interface UpcomingFestival {
  festival: FestivalItem;
  calendar: FestivalCalendarEntry;
  targetDate: Date;
  startDateIso: string;
  endDateIso: string;
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  secondsRemaining: number;
  totalMsRemaining: number;
  isCountdownActive: boolean; // True when <= 7 days away and not yet celebrating
  isCelebrating: boolean;     // True when current time is between start and end
  isPassed: boolean;          // True when current time is after end
  priority: number;           // 1 for nearest upcoming, 2 for second upcoming
  features: FestivalFeatureAvailability;
}

/**
 * Known feature catalog per festival.
 * Prevents dead/empty links across the website.
 */
export const FESTIVAL_FEATURE_CATALOG: Record<string, FestivalFeatureAvailability> = {
  dhanteras: {
    hasGreetings: true,
    greetingsCount: 25,
    greetingsUrl: '/greetings/dhanteras/',
    hasPhotoGreetings: true,
    photoCount: 10,
    photoGreetingsUrl: '/photo-greetings/dhanteras/',
    hasWishes: true,
    wishesCount: 100,
    wishesUrl: '/wishes/dhanteras/',
    hasGifts: true,
    giftsCount: 15,
    giftsUrl: '/festivals/dhanteras/#sec-gift-ideas',
    hasGuide: true,
    guideUrl: '/festivals/dhanteras/',
    hasRangoli: false,
    hasDecorations: false,
  },
  diwali: {
    hasGreetings: true,
    greetingsCount: 100,
    greetingsUrl: '/greeting-cards/',
    hasPhotoGreetings: true,
    photoCount: 14,
    photoGreetingsUrl: '/greeting-cards/?mode=photo',
    hasWishes: true,
    wishesCount: 500,
    wishesUrl: '/wishes/',
    hasGifts: true,
    giftsCount: 30,
    giftsUrl: '/gift-ideas/',
    hasGuide: true,
    guideUrl: '/festivals/diwali/',
    hasRangoli: true,
    rangoliUrl: '/rangoli/',
    hasDecorations: true,
    decorationsUrl: '/decoration-ideas/',
  },
  'chhath-puja': {
    hasGreetings: true,
    greetingsCount: 25,
    greetingsUrl: '/greetings/chhath-puja/',
    hasPhotoGreetings: true,
    photoCount: 10,
    photoGreetingsUrl: '/photo-greetings/chhath-puja/',
    hasWishes: true,
    wishesCount: 100,
    wishesUrl: '/wishes/chhath-puja/',
    hasGifts: true,
    giftsCount: 12,
    giftsUrl: '/festivals/chhath-puja/#sec-gift-ideas',
    hasGuide: true,
    guideUrl: '/festivals/chhath-puja/',
    hasRangoli: false,
    hasDecorations: false,
  },
  christmas: {
    hasGreetings: false,
    greetingsCount: 0,
    hasPhotoGreetings: false,
    photoCount: 0,
    hasWishes: true,
    wishesCount: 0,
    hasGifts: true,
    giftsCount: 0,
    hasGuide: true,
    guideUrl: '/festivals/christmas/',
    hasRangoli: false,
    hasDecorations: true,
    decorationsUrl: '/decoration-ideas/',
  },
  'new-year': {
    hasGreetings: false,
    greetingsCount: 0,
    hasPhotoGreetings: false,
    photoCount: 0,
    hasWishes: true,
    wishesCount: 0,
    wishesUrl: '/wishes/?festival=new-year',
    hasGifts: false,
    giftsCount: 0,
    hasGuide: true,
    guideUrl: '/festivals/new-year/',
    hasRangoli: false,
    hasDecorations: false,
  },
  'makar-sankranti': {
    hasGreetings: false,
    greetingsCount: 0,
    hasPhotoGreetings: false,
    photoCount: 0,
    hasWishes: true,
    wishesCount: 0,
    wishesUrl: '/wishes/?festival=makar-sankranti',
    hasGifts: false,
    giftsCount: 0,
    hasGuide: true,
    guideUrl: '/festivals/makar-sankranti/',
    hasRangoli: false,
    hasDecorations: false,
  },
  'maha-shivratri': {
    hasGreetings: false,
    greetingsCount: 0,
    hasPhotoGreetings: false,
    photoCount: 0,
    hasWishes: true,
    wishesCount: 0,
    wishesUrl: '/wishes/?festival=maha-shivratri',
    hasGifts: false,
    giftsCount: 0,
    hasGuide: true,
    guideUrl: '/festivals/maha-shivratri/',
    hasRangoli: false,
    hasDecorations: false,
  },
  holi: {
    hasGreetings: false,
    greetingsCount: 0,
    hasPhotoGreetings: false,
    photoCount: 0,
    hasWishes: true,
    wishesCount: 0,
    wishesUrl: '/wishes/?festival=holi',
    hasGifts: false,
    giftsCount: 0,
    hasGuide: true,
    guideUrl: '/festivals/holi/',
    hasRangoli: false,
    hasDecorations: false,
  },
  'raksha-bandhan': {
    hasGreetings: false,
    greetingsCount: 0,
    hasPhotoGreetings: false,
    photoCount: 0,
    hasWishes: true,
    wishesCount: 0,
    wishesUrl: '/wishes/?festival=raksha-bandhan',
    hasGifts: false,
    giftsCount: 0,
    hasGuide: true,
    guideUrl: '/festivals/raksha-bandhan/',
    hasRangoli: false,
    hasDecorations: false,
  },
  navratri: {
    hasGreetings: false,
    greetingsCount: 0,
    hasPhotoGreetings: false,
    photoCount: 0,
    hasWishes: true,
    wishesCount: 0,
    wishesUrl: '/wishes/?festival=navratri',
    hasGifts: false,
    giftsCount: 0,
    hasGuide: true,
    guideUrl: '/festivals/navratri/',
    hasRangoli: false,
    hasDecorations: false,
  },
};

/**
 * Returns festival features availability.
 */
export function getFestivalFeatures(festivalId: string): FestivalFeatureAvailability {
  const norm = (festivalId || '').toLowerCase().trim();
  return (
    FESTIVAL_FEATURE_CATALOG[norm] || {
      hasGreetings: false,
      greetingsCount: 0,
      hasPhotoGreetings: false,
      photoCount: 0,
      hasWishes: true,
      wishesCount: 0,
      wishesUrl: `/wishes/?festival=${norm}`,
      hasGifts: false,
      giftsCount: 0,
      hasGuide: true,
      guideUrl: `/festivals/${norm}/`,
      hasRangoli: false,
      hasDecorations: false,
    }
  );
}

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Unified Festival Priority Engine.
 * Reads festival records, determines next upcoming dates, sorts chronologically,
 * filters passed events, and calculates 7-day automatic countdown activation.
 * 
 * @param festivals List of festivals (defaults to FESTIVALS_DATA)
 * @param currentDate Current reference date (defaults to new Date())
 * @param limit Number of upcoming festivals to return (defaults to 5)
 */
export function getUpcomingFestivals(
  festivals: FestivalItem[] = FESTIVALS_DATA,
  currentDate: Date = new Date(),
  limit: number = 5
): UpcomingFestival[] {
  const nowMs = currentDate.getTime();

  // 1. Map festivals to their calendar entries and timing metrics
  const mapped = festivals.map((fest) => {
    const calendar: FestivalCalendarEntry =
      FESTIVAL_CALENDAR[fest.id.toLowerCase()] || {
        festivalId: fest.id,
        displayNameEn: fest.nameEn,
        displayNameHi: fest.nameHi,
        startDateIso: fest.dateIso,
        endDateIso: new Date(new Date(fest.dateIso).getTime() + ONE_DAY_MS - 1).toISOString(),
        timezone: 'Asia/Kolkata',
        tithiEn: fest.tithiEn,
        tithiHi: fest.tithiHi,
        countdownEnabled: true,
        countdownLabelEn: `Upcoming Celebration: ${fest.nameEn}`,
        countdownLabelHi: `आगामी महापर्व: ${fest.nameHi}`,
        celebrationMessageEn: `✨ Happy ${fest.nameEn}! May this celebration bring you boundless happiness! ✨`,
        celebrationMessageHi: `✨ शुभ ${fest.nameHi}! यह पावन पर्व आपके जीवन में सुख-शांति लाए! ✨`,
        eventEndedMessageEn: `${fest.nameEn} celebrations have concluded.`,
        eventEndedMessageHi: `${fest.nameHi} का पर्व संपन्न हुआ।`,
        panchangSource: 'Vedic Panchang Calendar',
        year: getISTYear(new Date(fest.dateIso)),
      };

    let startTime = new Date(calendar.startDateIso).getTime();
    let endTime = calendar.endDateIso
      ? new Date(calendar.endDateIso).getTime()
      : startTime + ONE_DAY_MS - 1;

    // Support year transition for passed annual festivals using Asia/Kolkata (IST) year
    const currentIstYear = getISTYear(currentDate);
    if (nowMs > endTime && calendar.year < currentIstYear) {
      const yearDiff = currentIstYear - calendar.year;
      const nextStartIso = calendar.startDateIso.replace(/^\d{4}/, String(calendar.year + yearDiff));
      startTime = new Date(nextStartIso).getTime();
      const nextEndIso = calendar.endDateIso
        ? calendar.endDateIso.replace(/^\d{4}/, String(calendar.year + yearDiff))
        : new Date(startTime + ONE_DAY_MS - 1).toISOString();
      endTime = new Date(nextEndIso).getTime();
    }

    const diff = startTime - nowMs;
    const isCelebrating = nowMs >= startTime && nowMs <= endTime;
    const isPassed = nowMs > endTime;
    const isCountdownActive = diff > 0 && diff <= SEVEN_DAYS_MS;

    const daysRemaining = Math.max(0, Math.floor(diff / ONE_DAY_MS));
    const hoursRemaining = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
    const minutesRemaining = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
    const secondsRemaining = Math.max(0, Math.floor((diff / 1000) % 60));

    return {
      festival: fest,
      calendar,
      targetDate: new Date(startTime),
      startDateIso: calendar.startDateIso,
      endDateIso: calendar.endDateIso || new Date(endTime).toISOString(),
      daysRemaining,
      hoursRemaining,
      minutesRemaining,
      secondsRemaining,
      totalMsRemaining: diff,
      isCountdownActive,
      isCelebrating,
      isPassed,
      priority: 0,
      features: getFestivalFeatures(fest.id),
      _startTime: startTime,
    };
  });

  // 2. Filter out festivals that have already passed (keep ongoing celebrating + future)
  const activeOrUpcoming = mapped.filter((f) => !f.isPassed);

  // 3. Sort strictly ascending by start time (same-day festivals preserve calendar order)
  activeOrUpcoming.sort((a, b) => a._startTime - b._startTime);

  // 4. Assign priorities 1, 2, ...
  const prioritized = activeOrUpcoming.slice(0, limit).map((item, idx) => ({
    ...item,
    priority: idx + 1,
  }));

  // Fallback: If all festivals in list passed, wrap to first upcoming cycle
  if (prioritized.length === 0 && mapped.length > 0) {
    return [
      {
        ...mapped[0],
        priority: 1,
      },
    ];
  }

  return prioritized;
}

/**
 * Returns single nearest upcoming festival (Priority 1).
 */
export function getPriorityFestival(currentDate: Date = new Date()): UpcomingFestival {
  const list = getUpcomingFestivals(FESTIVALS_DATA, currentDate, 1);
  return list[0];
}

