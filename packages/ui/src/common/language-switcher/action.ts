'use server';
import { getLocale } from 'next-intl/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function changeLanguage(locale: string) {
  const headersList = await headers();
  const currentLocale = await getLocale();
  const headerUrl = headersList.get('x-user-url') ?? '/';
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

  // Do openedu.net co "en" nên khi xài hàm replace openedu.net/en với locale khác sẽ thành op{locale}edu.net/en
  // Solution: thay vì replace "en", thì replace "/en"

  // redirect(headerUrl.replace(currentLocale, locale));
  redirect(headerUrl.replace(`/${currentLocale}`, `/${locale}`));
}
