import useSWRMutation from 'swr/mutation';
import { postBookmarkService, removeBookmarkService } from '#services/bookmark';
import type { IBookmark, IBookmarkRequest } from '#types/bookmark';
import { API_ENDPOINT } from '#utils/endpoints';

export const usePostBookmark = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.BOOKMARKS,
    async (endpoint: string, { arg }: { arg: IBookmarkRequest }): Promise<IBookmark> =>
      postBookmarkService(endpoint, { payload: arg })
  );

  return {
    triggerPostBookmark: trigger,
    isLoadingPostBookmark: isMutating,
    errorPostBookmark: error,
  };
};

export const useDeleteBookmark = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.BOOKMARKS_ID,
    async (endpoint: string, { arg }: { arg: { id: string } }): Promise<unknown> =>
      removeBookmarkService(endpoint, { payload: arg })
  );

  return {
    triggerDeleteBookmark: trigger,
    isLoadingDeleteBookmark: isMutating,
    errorDeleteBookmark: error,
  };
};
