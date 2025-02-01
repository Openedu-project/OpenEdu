'use server';
import { getLocale } from 'next-intl/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function changeLanguage(locale: string) {
  const headersList = await headers();
  const currentLocale = await getLocale();
  const headerUrl = headersList.get('x-url') ?? '/';
  // const url = new URL(headerUrl);
  // const segments = url.pathname.split('/').filter(Boolean);

  // // Kiểm tra và thay đổi locale trong URL
  // if (segments[0] && segments[0] in languages) {
  //   segments[0] = locale;
  // } else {
  //   segments.unshift(locale);
  // }

  // // Tạo URL mới với locale đã cập nhật
  // const newPath = `/${segments.join('/')}${url.search}`;

  redirect(headerUrl.replace(currentLocale, locale));
}
