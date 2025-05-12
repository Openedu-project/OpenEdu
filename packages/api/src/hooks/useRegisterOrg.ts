import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { buildUrl } from '@oe/core';
import { getFormRegisterOrgService, putRejectRegisterOrgService } from '#services/register-org';
import type { IRejectFormRegisterOrgPayload, IRejectFormRegisterOrgRes } from '#types/form';
import { API_ENDPOINT } from '#utils/endpoints';

export function useGetFormRegisterOrg() {
  const { data, isLoading, error, mutate } = useSWR(API_ENDPOINT.FORMS_REGISTER_ORGANIZATION, (endpoint: string) =>
    getFormRegisterOrgService(endpoint, {})
  );

  return {
    dataListFormRegisterOrg: data,
    errorFormRegisterOrg: error,
    mutateListFormRegisterOrg: mutate,
    isLoadingFormRegisterOrg: isLoading,
  };
}

export function useRejectRegisterOrg(id: string) {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.FORM_SESSIONS_ID_REJECT, params: { id } });
  const { trigger, isMutating, error } = useSWRMutation(
    endpointKey,
    async (_endpoint: string, { arg }: { arg: IRejectFormRegisterOrgPayload }): Promise<IRejectFormRegisterOrgRes> =>
      putRejectRegisterOrgService(endpointKey, { payload: arg })
  );
  return {
    triggerRejectRegisterOrg: trigger,
    isLoadingRejectRegisterOrg: isMutating,
    errorRejectRegisterOrg: error,
  };
}
