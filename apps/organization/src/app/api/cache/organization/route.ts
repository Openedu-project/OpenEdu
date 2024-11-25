import type { HTTPPagination, HTTPResponse } from '@oe/api/types/fetch';
import type { IOrganization } from '@oe/api/types/organizations';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { type NextRequest, NextResponse } from 'next/server';

// export async function GET(request: NextRequest) {
//   const domain = new URL(request.url).searchParams.get('domain') as string;

//   try {
//     const org = (await domain) ? getOrgByDomainService(undefined, { domain }) : Promise.resolve({});
//     return NextResponse.json(org);
//   } catch {
//     return NextResponse.json({});
//   }
// }
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const referrer = url.searchParams.get('referrer') as string;
  const origin = url.searchParams.get('origin') as string;

  try {
    const endpoint = `${API_ENDPOINT.ADMIN_ORGANIZATIONS}?domain=${origin}`;
    const apiURL = `${process.env.NEXT_PUBLIC_API_ORIGIN}${endpoint}`;
    const organizationResponse = await fetch(apiURL, {
      cache: 'force-cache',
      next: {
        tags: [endpoint],
      },
      headers: {
        'X-referrer': referrer,
        Origin: origin,
      },
    });
    const organization = (await organizationResponse.json()) as HTTPResponse<HTTPPagination<IOrganization>>;

    return NextResponse.json(organization?.data?.results?.[0] ?? {});
  } catch {
    return NextResponse.json({});
  }
}
