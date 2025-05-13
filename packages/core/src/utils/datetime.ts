import { getLocaleFromPathname } from '@oe/i18n';
import {
  type Locale,
  differenceInDays,
  format,
  formatRelative,
  fromUnixTime,
  getDate,
  getDay,
  getDaysInMonth,
} from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { enUS } from 'date-fns/locale';

export const TIME_ZONE = 'Asia/Bangkok';
// Format patterns for consistent date formatting
const FORMAT_PATTERNS = {
  DATE: 'PP', // e.g., "Apr 29, 2023"
  DATE_TIME: 'PPpp', // e.g., "Apr 29, 2023, 12:00 PM"
  DATE_HOUR_MINUTE: 'Pp', // e.g., "Apr 29, 2023, 12:00 PM"
  HOUR_MINUTE: 'p', // e.g., "12:00 PM"
  DAY_HOUR_MINUTE: 'eeee p', // e.g., "Monday 12:00 PM"
  MONTH_DAY_TIME: 'MMM d p', // e.g., "Apr 29 12:00 PM"
  DATE_TIME_ZONE: 'PPppxx', // e.g., "Apr 29, 2023, 12:00 PM GMT+07:00"
  DATE_SLASH: 'dd/MM/yyyy', // e.g., "29/04/2023"
};

/**
 * Singleton class to manage date-fns locale
 */
class LocaleManager {
  private static instance: LocaleManager;
  private currentLocale: Locale = enUS;
  private loadingPromise: Promise<void> | null = null;

  private constructor() {}

  static getInstance(): LocaleManager {
    if (!LocaleManager.instance) {
      LocaleManager.instance = new LocaleManager();
    }
    return LocaleManager.instance;
  }

  getLocale(): Locale {
    return this.currentLocale;
  }

  private async loadLocale(localeCode: string): Promise<void> {
    try {
      const normalizedCode = localeCode
        .toLowerCase()
        .split('-')
        .filter(Boolean)
        .map((part, index) => (index === 0 ? part : part.toUpperCase()))
        .join('');

      try {
        const { vi, enUS, ...otherLocales } = await import('date-fns/locale');
        const localeModule = { vi, enUS, ...otherLocales };
        const selectedLocale = localeModule[normalizedCode as keyof typeof localeModule];

        if (selectedLocale) {
          this.currentLocale = selectedLocale as Locale;
          return;
        }
      } catch (normalizedError) {
        console.error('Failed to load normalized locale:', normalizedError);
      }

      // Safe base locale code extraction
      const parts = localeCode.toLowerCase().split('-');
      const baseLocaleCode = parts[0] || '';

      if (baseLocaleCode && baseLocaleCode !== normalizedCode) {
        try {
          const { vi, enUS, ...otherLocales } = await import('date-fns/locale');
          const localeModule = { vi, enUS, ...otherLocales };
          const selectedLocale = localeModule[baseLocaleCode as keyof typeof localeModule];

          if (selectedLocale) {
            this.currentLocale = selectedLocale as Locale;
            return;
          }
        } catch (baseError) {
          console.error('Failed to load base locale:', baseError);
        }
      }

      console.info('All locale loading attempts failed, using default locale');
    } catch (error) {
      console.error('Unexpected error in loadLocale:', error);
    }
  }

  async initializeLocale(): Promise<void> {
    if (!this.loadingPromise) {
      // const browserLocale = navigator.language;
      // Create and store the promise
      this.loadingPromise = (async () => {
        try {
          const locale = getLocaleFromPathname(new URL(window.location.href).pathname);
          await this.loadLocale(locale);
        } catch (error) {
          console.error('Failed to initialize locale:', error);
          // Reset the promise on error so we can try again
          this.loadingPromise = null;
          throw error;
        }
      })();
    }
    // Await and return the cached promise
    await this.loadingPromise;
  }
}

// Initialize locale loading if in browser environment
if (typeof window !== 'undefined') {
  LocaleManager.getInstance().initializeLocale();
}

/**
 * Formats a timestamp to a date string according to the current locale
 */
export function formatDate(timestamp: number): string {
  const locale = LocaleManager.getInstance().getLocale();
  const date = fromUnixTime((timestamp ?? 0) / 1000);
  const zonedDate = toZonedTime(date, TIME_ZONE);
  return format(zonedDate, FORMAT_PATTERNS.DATE, { locale });
}

/**
 * Formats a timestamp to a date-time string according to the current locale
 */
export function formatDateTime(timestamp: number): string {
  const locale = LocaleManager.getInstance().getLocale();
  const date = fromUnixTime((timestamp ?? 0) / 1000);
  const zonedDate = toZonedTime(date, TIME_ZONE); // Using your defined TIME_ZONE
  return format(zonedDate, FORMAT_PATTERNS.DATE_TIME, { locale });
}

/**
 * Formats a timestamp to a date with hour and minute according to the current locale
 */
export function formatDateHourMinute(timestamp: number): string {
  const locale = LocaleManager.getInstance().getLocale();
  const date = fromUnixTime((timestamp ?? 0) / 1000);
  const zonedDate = toZonedTime(date, TIME_ZONE);
  return format(zonedDate, FORMAT_PATTERNS.DATE_HOUR_MINUTE, { locale });
}

/**
 * Formats a Unix timestamp into a date string with slash separators: 30/04/2025
 */
export function formatDateSlash(timestamp: number): string {
  const locale = LocaleManager.getInstance().getLocale();
  const date = fromUnixTime((timestamp ?? 0) / 1000);
  const zonedDate = toZonedTime(date, TIME_ZONE);
  return format(zonedDate, FORMAT_PATTERNS.DATE_SLASH, { locale });
}

/**
 * Formats a timestamp to time with contextual format based on how recent it is
 */
export function formatTimeHourMinute(timestamp: number): string {
  const date = fromUnixTime((timestamp ?? 0) / 1000);
  const zonedDate = toZonedTime(date, TIME_ZONE);
  const now = toZonedTime(new Date(), TIME_ZONE); // Also convert current time to same timezone
  const diffDays = differenceInDays(now, zonedDate);
  const locale = LocaleManager.getInstance().getLocale();

  if (diffDays === 0) {
    return format(zonedDate, FORMAT_PATTERNS.HOUR_MINUTE, { locale });
  }
  if (diffDays > 0 && diffDays < 7) {
    return format(zonedDate, FORMAT_PATTERNS.DAY_HOUR_MINUTE, { locale });
  }
  return format(zonedDate, FORMAT_PATTERNS.MONTH_DAY_TIME, { locale });
}

/**
 * Formats a timestamp to a date-time with timezone according to the current locale
 */
export function formatDateTimeZone(timestamp: number): string {
  const locale = LocaleManager.getInstance().getLocale();
  const date = fromUnixTime((timestamp ?? 0) / 1000);
  const zonedDate = toZonedTime(date, TIME_ZONE);
  return format(zonedDate, FORMAT_PATTERNS.DATE_TIME_ZONE, { locale });
}

/**
 * Formats a timestamp to a relative time string according to the current locale
 */
export function formatRelativeTime(timestamp: number): string {
  const locale = LocaleManager.getInstance().getLocale();
  return formatRelative(fromUnixTime((timestamp ?? 0) / 1000), new Date(), { locale });
}

/**
 * Converts a string in "HH:MM:SS" or "MM:SS" format to total seconds
 */
export function convertTimeStringToSeconds(timeString: string): number {
  const parts = timeString.split(':').map(Number);

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts as [number, number, number];
    if (isTimeValid(hours, minutes, seconds)) {
      return hours * 3600 + minutes * 60 + seconds;
    }
  }
  if (parts.length === 2) {
    const [minutes, seconds] = parts as [number, number];
    if (isTimeValid(0, minutes, seconds)) {
      return minutes * 60 + seconds;
    }
  }
  throw new Error('Invalid time format. Use "HH:MM:SS" or "MM:SS" with valid values');
}

/**
 * Validates time components
 */
function isTimeValid(hours: number, minutes: number, seconds: number): boolean {
  return (
    !(Number.isNaN(hours) || Number.isNaN(minutes) || Number.isNaN(seconds)) &&
    hours >= 0 &&
    minutes >= 0 &&
    minutes < 60 &&
    seconds >= 0 &&
    seconds < 60
  );
}

/**
 * Converts total seconds to "MM:SS" format
 */
export function convertSecondsToTimeString(totalSeconds: number): string {
  if (totalSeconds < 0 || !Number.isInteger(totalSeconds)) {
    throw new Error('Seconds must be a non-negative integer');
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Calculates remaining time in seconds from a start timestamp and time limit
 */
export function calculateRemainingTime(startAt: number, limitTime: string): number {
  const currentTime = Date.now();
  const elapsedSeconds = Math.floor((currentTime - startAt) / 1000);
  const timeLimitSeconds = convertTimeStringToSeconds(limitTime);

  return Math.max(0, timeLimitSeconds - elapsedSeconds);
}

/**
 * Converts an ISO date string to timestamp
 */
export function convertToTimeStamp(dateString: string): number {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date string format');
  }
  return date.getTime();
}

export const calculateRemainingDays = (endTimestamp: number) => {
  const endDate = new Date(endTimestamp);
  const currentDate = new Date();

  const diffTime = endDate.getTime() - currentDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(diffDays, 0);
};

export const getRemainingDaysInWeek = () => {
  const currentDate = new Date();
  const dayOfWeek: number = getDay(currentDate);

  const daysRemaining: number = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

  return daysRemaining;
};

export const getRemainingDaysInMonth = () => {
  const currentDate = new Date();

  const currentDay: number = getDate(currentDate);

  const totalDaysInMonth: number = getDaysInMonth(currentDate);

  // Tính số ngày còn lại trong tháng
  const daysRemaining: number = totalDaysInMonth - currentDay;

  return daysRemaining;
};
