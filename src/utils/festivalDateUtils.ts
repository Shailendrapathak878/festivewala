/**
 * Centralized Indian Standard Time (IST) Date Utilities.
 * Guarantees consistent festival date calculations and formatting across all
 * visitor timezones (Asia/Kolkata, UTC, US Eastern, etc.).
 */

export const IST_TIMEZONE = 'Asia/Kolkata';

/**
 * Returns the current Gregorian year according to Asia/Kolkata (IST).
 * Prevents year rollover desynchronization when visitor browser is in UTC/US timezones.
 */
export function getISTYear(date: Date = new Date()): number {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: IST_TIMEZONE,
    year: 'numeric',
  });
  return parseInt(formatter.format(date), 10);
}

/**
 * Formats a Date or ISO date string in Indian Standard Time (IST).
 */
export function formatDateInIST(
  date: Date | string | number,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {}
): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    timeZone: IST_TIMEZONE,
    ...options,
  });
}

/**
 * Checks whether the current moment falls within the festival start and end boundaries in IST.
 */
export function isFestivalActive(
  startDateIso: string,
  endDateIso?: string,
  nowMs: number = Date.now()
): boolean {
  const startTime = new Date(startDateIso).getTime();
  const endTime = endDateIso
    ? new Date(endDateIso).getTime()
    : startTime + 24 * 60 * 60 * 1000 - 1;
  return nowMs >= startTime && nowMs <= endTime;
}

