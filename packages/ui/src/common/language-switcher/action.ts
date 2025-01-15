'use server';

import { type LanguageCode, languages } from '@oe/i18n/languages';
import { redirect } from 'next/navigation';

export async function changeLanguage(locale: LanguageCode, currentPath: string) {
  const [pathname, search] = currentPath.split('?');
  const segments = (pathname ?? '').split('/').filter(Boolean);

  // Check if first segment is a language code
  const isFirstSegmentLanguage = segments[0] && segments[0] in languages;

  // If yes, replace it; if no, add new locale at the start
  if (isFirstSegmentLanguage) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }

  // Reconstruct path with updated locale and add query params if exist
  const newPath = `/${segments.join('/')}${search ? `?${search}` : ''}`;

  await Promise.resolve();

  redirect(newPath);
}
