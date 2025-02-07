import useSWRMutation from 'swr/mutation';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';
import {
  deleteCoursesFromAffiliateCampaignService,
  postCoursesToAffiliateCampaignService,
} from '../services/course-campaign';
import type { IAddCoursesPayload, IAffiliateCampaignCourseListRes } from '../types/campaign-course';

export const usePostCoursesToAffiliateCampaign = (campaignId: string) => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.AFFILIATE_CAMPAIGNS_ID_COURSES,
    async (_endpoint: string, { arg }: { arg: IAddCoursesPayload }): Promise<IAffiliateCampaignCourseListRes> =>
      postCoursesToAffiliateCampaignService(
        createAPIUrl({
          endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS_ID_COURSES,
          params: { id: campaignId },
        }),
        {
          params: {
            campaignId,
          },
          payload: arg,
        }
      )
  );

  return {
    triggerPostCourses: trigger,
    isLoadingPostCourses: isMutating,
    errorPostCourses: error,
  };
};

export const useDeleteCoursesFromAffiliateCampaign = (campaignId: string) => {
  const url = createAPIUrl({
    endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS_ID_COURSES,
    params: { id: campaignId },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    url,
    async (_endpoint: string, { arg }: { arg: string[] }): Promise<void> =>
      deleteCoursesFromAffiliateCampaignService(url, { params: { campaignId }, payload: { courseIds: arg } })
  );

  return {
    triggerDeleteCourses: trigger,
    isLoadingDeleteCourses: isMutating,
    errorDeleteCourses: error,
  };
};
