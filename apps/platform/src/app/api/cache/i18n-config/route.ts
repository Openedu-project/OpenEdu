import type { HTTPResponse } from '@oe/api/types/fetch';
import type { ISystemConfigRes } from '@oe/api/types/system-config';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { systemConfigKeys } from '@oe/api/utils/system-config';
import type { LanguageCode } from '@oe/i18n/languages';
import { type NextRequest, NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     const i18nConfigResponse = await getSystemConfig<{ locales: LanguageCode[]; defaultLocale: LanguageCode }>(
//       undefined,
//       {
//         key: systemConfigKeys.i18nConfig,
//       }
//     );
//     return NextResponse.json(i18nConfigResponse?.value);
//   } catch {
//     return NextResponse.json({});
//   }
// }
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const referrer = url.searchParams.get('referrer') as string;
  const origin = url.searchParams.get('origin') as string;
  try {
    const endpoint = `${API_ENDPOINT.SYSTEM_CONFIGS}?keys=${systemConfigKeys.i18nConfig}&domains=${origin}`;
    const apiURL = `${process.env.NEXT_PUBLIC_API_ORIGIN}${endpoint}`;
    const i18nConfigResponse = await fetch(apiURL, {
      cache: 'no-cache',
      next: {
        tags: [endpoint],
      },
      headers: {
        'X-referrer': referrer,
        Origin: origin,
      },
    });
    const i18nConfig = (await i18nConfigResponse.json()) as HTTPResponse<
      ISystemConfigRes<{ locales: LanguageCode[]; locale: LanguageCode }>[]
    >;
    return NextResponse.json(i18nConfig?.data?.[0]?.value ?? {});
  } catch {
    return NextResponse.json({});
  }
}
