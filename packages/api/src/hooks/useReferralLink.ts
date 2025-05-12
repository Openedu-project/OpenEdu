import useSWRMutation from 'swr/mutation';

import { buildUrl } from '@oe/core';
import { postExtendReferralLink, postReferralLink } from '#services/referral-link';
import type { IReferralLinkPayload, IReferralLinkRes } from '#types/referral-link';
import { API_ENDPOINT } from '#utils/endpoints';

export const usePostReferralLink = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.REFERRAL_LINKS,
    async (endpoint: string, { arg }: { arg: IReferralLinkPayload }): Promise<IReferralLinkRes> =>
      postReferralLink(endpoint, arg)
  );

  return {
    triggerPostReferralLink: trigger,
    isLoadingPostReferralLink: isMutating,
    errorPostReferralLink: error,
  };
};

export const usePostExtendReferralLink = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.REFERRAL_LINKS_ID_EXTEND,
    async (_endpoint: string, { arg }: { arg: { id: string } }): Promise<IReferralLinkRes> =>
      postExtendReferralLink(
        buildUrl({
          endpoint: API_ENDPOINT.REFERRAL_LINKS_ID_EXTEND,
          params: {
            id: arg.id,
          },
        }),
        null
      )
  );

  return {
    triggerPostExtendReferralLink: trigger,
    isLoadingPostExtendReferralLink: isMutating,
    errorPostExtendReferralLink: error,
  };
};
