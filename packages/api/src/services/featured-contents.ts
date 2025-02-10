import { getOrgByDomainService } from '@oe/api/services/organizations';
import { getCookie } from '@oe/core/utils/cookie';
import type { IBlog } from '#types/blog';
import type { ICourse } from '#types/course/course';
import type {
  FeaturedContentParams,
  IFeaturedContent,
  IFeaturedContentRequest,
  IFeaturedContentResponse,
} from '#types/featured-contents';
import type { IOrganization } from '#types/organizations';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI, postAPI } from '#utils/fetch';

export async function getPopularCoursesServices(
  url: string | undefined,
  { params, init }: { params: Pick<FeaturedContentParams, 'org_id'>; init?: RequestInit }
): Promise<IFeaturedContentResponse<undefined> | undefined> {
  const endpointKey = createAPIUrl({
    endpoint: url || API_ENDPOINT.FEATURED_CONTENT,
    queryParams: {
      ...params,
      type: 'popular',
      entity_type: 'course',
    },
  });

  try {
    const response = await fetchAPI<IFeaturedContentResponse<undefined>>(endpointKey, init);

    return response.data;
  } catch {
    return undefined;
  }
}

export async function getPopularCoursesServicesAtWebsite(
  url: string | undefined,
  { params, init }: { params: Pick<FeaturedContentParams, 'org_id'>; init?: RequestInit }
): Promise<IFeaturedContent<ICourse>[] | undefined> {
  const endpointKey = createAPIUrl({
    endpoint: url || API_ENDPOINT.FEATURED_CONTENT_BY_TYPES,
    queryParams: {
      org_id: params.org_id,
      type: 'popular',
      entity_type: 'course',
    },
  });

  try {
    const response = await fetchAPI<IFeaturedContent<ICourse>[]>(endpointKey, init);

    return response.data;
  } catch {
    return undefined;
  }
}

export async function getPopularBlogsServices(
  url: string | undefined,
  { params, init }: { params: Pick<FeaturedContentParams, 'org_id'>; init?: RequestInit }
): Promise<IFeaturedContentResponse<undefined> | undefined> {
  const endpointKey = createAPIUrl({
    endpoint: url || API_ENDPOINT.FEATURED_CONTENT,
    queryParams: {
      ...params,
      type: 'popular',
      entity_type: 'blog',
    },
  });

  try {
    const response = await fetchAPI<IFeaturedContentResponse<undefined>>(endpointKey, init);

    return response.data;
  } catch {
    return undefined;
  }
}

export async function getPopularBlogsServicesAtWebsite(
  url: string | undefined,
  { params, init }: { params: Pick<FeaturedContentParams, 'org_id'>; init?: RequestInit }
): Promise<IFeaturedContent<IBlog>[] | undefined> {
  const endpointKey = createAPIUrl({
    endpoint: url || API_ENDPOINT.FEATURED_CONTENT_BY_TYPES,
    queryParams: {
      org_id: params.org_id,
      type: 'popular',
      entity_type: 'blog',
    },
  });

  try {
    const response = await fetchAPI<IFeaturedContent<IBlog>[]>(endpointKey, init);

    return response.data;
  } catch {
    return undefined;
  }
}

export async function getFeaturedOrgServicesAtWebsite(
  url: string | undefined,
  { params, init }: { params: Pick<FeaturedContentParams, 'org_id'>; init?: RequestInit }
): Promise<IFeaturedContent<IOrganization>[] | undefined> {
  const endpointKey = createAPIUrl({
    endpoint: url || API_ENDPOINT.FEATURED_CONTENT_BY_TYPES,
    queryParams: {
      org_id: params.org_id,
      type: 'featured',
      entity_type: 'organization',
    },
  });

  try {
    const response = await fetchAPI<IFeaturedContent<IOrganization>[]>(endpointKey, init);

    return response.data;
  } catch {
    return undefined;
  }
}

export const updateFeaturedContent = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IFeaturedContentRequest; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.FEATURED_CONTENT,
    });
  }

  const response = await postAPI<null, IFeaturedContentRequest>(endpointKey, payload, init);

  return !!(response.code === 200);
};

export const getFeaturedOrgs = async () => {
  const domain = (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? '';
  try {
    const orgData = await getOrgByDomainService(undefined, { domain });

    if (!orgData?.id) {
      console.warn('No organization found for domain:', domain);
      return [];
    }

    const featuredOrgs = await getFeaturedOrgServicesAtWebsite(undefined, {
      params: { org_id: orgData?.id ?? '' },
    });

    const organizations = featuredOrgs?.reduce<IOrganization[]>((acc, item) => {
      if (item?.entity) {
        acc.push(item.entity);
      }
      return acc;
    }, []);

    return organizations ?? undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
