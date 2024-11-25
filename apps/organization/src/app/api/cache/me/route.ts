import type { HTTPResponse } from '@oe/api/types/fetch';
import type { IUser } from '@oe/api/types/user';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const accessToken = url.searchParams.get('accessToken') as string;
  const referrer = url.searchParams.get('referrer') as string;
  const origin = url.searchParams.get('origin') as string;

  try {
    const meResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}${API_ENDPOINT.USERS_ME}`, {
      cache: 'force-cache',
      next: {
        tags: [API_ENDPOINT.USERS_ME],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-referrer': referrer,
        Origin: origin,
      },
    });
    const me = (await meResponse.json()) as HTTPResponse<IUser>;
    return NextResponse.json(me.data);
  } catch {
    return NextResponse.json(null);
  }
}
