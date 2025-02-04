import type { ICourse } from '#types/course/course';
import type {
  FeaturedContentParams,
  IFeaturedContent,
  IFeaturedContentRequest,
  IFeaturedContentResponse,
} from '#types/featured-contents';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI, postAPI } from '#utils/fetch';

export async function getPopularCoursesServices(
  url: string | undefined,
  { params, init }: { params: Pick<FeaturedContentParams, 'org_id'>; init?: RequestInit }
): Promise<IFeaturedContentResponse<undefined> | undefined> {
  const endpointKey = createAPIUrl({
    endpoint: url || API_ENDPOINT.FEATURED_CONTENT,
    queryParams: {
      org_id: params.org_id,
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
