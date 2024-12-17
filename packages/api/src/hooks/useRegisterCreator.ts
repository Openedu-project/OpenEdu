import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { getFormRegisterCreatorService, putRejectRegisterCreatorService } from '#services/register-creator';
import type { IRejectFormRegisterCreatorPayload, IRejectFormRegisterCreatorRes } from '#types/form';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetFormRegisterCreator() {
  const { data, isLoading, error, mutate } = useSWR(API_ENDPOINT.FORMS_REGISTER_CREATOR, (endpoint: string) =>
    getFormRegisterCreatorService(endpoint, {})
  );

  return {
    dataListFormRegisterCreator: data,
    errorFormRegisterCreator: error,
    mutateListFormRegisterCreator: mutate,
    isLoadingFormRegisterCreator: isLoading,
  };
}

export function useRejectRegisterCreator(id: string) {
  const endpointKey = createAPIUrl({ endpoint: API_ENDPOINT.FORM_SESSIONS_ID_REJECT, params: { id } });
  const { trigger, isMutating, error } = useSWRMutation(
    endpointKey,
    async (
      _endpoint: string,
      { arg }: { arg: IRejectFormRegisterCreatorPayload }
    ): Promise<IRejectFormRegisterCreatorRes> => putRejectRegisterCreatorService(endpointKey, { payload: arg })
  );
  return {
    triggerRejectRegisterCreator: trigger,
    isLoadingRejectRegisterCreator: isMutating,
    errorRejectRegisterCreator: error,
  };
}
