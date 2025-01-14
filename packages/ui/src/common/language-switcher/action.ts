'use server';

import { redirect } from 'next/navigation';

const languages = ['vi', 'en'] as const;
type Language = (typeof languages)[number];

export async function changeLanguage(locale: Language, currentPath: string) {
  const [pathname, search] = currentPath.split('?');
  const segments = (pathname ?? '').split('/').filter(Boolean);

  // Check if first segment is a language code
  const isFirstSegmentLanguage = languages.includes(segments[0] as Language);

  // If yes, replace it; otherwise, add new locale at the start
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
