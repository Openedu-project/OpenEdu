import { buildUrl } from '@oe/core';
import type { ILesson } from '#types/course/segment';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI } from '#utils/fetch';

export async function getLessonLearnService(
  url: string | undefined,
  { id, cid, init }: { id: string; cid: string; init?: RequestInit }
): Promise<ILesson | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.LESSONS_ID_COURSES_CID,
      params: {
        id,
        cid,
      },
    });
  }

  try {
    const response = await fetchAPI<ILesson>(endpointKey, {
      ...init,
      cache: 'no-store',
    });

    return response.data;
  } catch {
    return null;
  }
}
