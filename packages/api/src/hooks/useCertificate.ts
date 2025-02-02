import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';
import {
  createCertHtmlTemplateService,
  getCertByIdService,
  getCertByUserIdService,
  getCertLayerByCourseIdService,
  getCertLayersService,
  getTemplatesService,
  receiveCertService,
  removeCertLayerService,
  selectTemplateService,
  updateCertHtmlTemplateService,
} from '../services/certificate';
import type {
  ICertificateRequest,
  ICertificateUpdate,
  IReceiveCertificateRequest,
  IRequestSelectTemplate,
} from '../types/certificate';

export function useGetCertLayers({ courseId, params }: { courseId: string; params?: IFilter }) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.COURSES_ID_HTML_TEMPLATES,
    params: { id: courseId },
    queryParams: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (url: string) =>
    getCertLayersService(url, { params: { courseId, ...params } })
  );

  return {
    dataCertLayers: data,
    isLoadingCertLayers: isLoading,
    errorCertLayers: error,
    mutateCertLayers: mutate,
  };
}

export function useGetCertTemplates(params?: IFilter) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.HTML_TEMPLATES,
    queryParams: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (url: string) => getTemplatesService(url, { params }));

  return {
    dataCertTemplates: data,
    isLoadingCertTemplates: isLoading,
    errorCertTemplates: error,
    mutateCertTemplates: mutate,
  };
}

export function useSelectHtmlTemplate(courseId: string) {
  const { trigger, isMutating, error } = useSWRMutation(
    createAPIUrl({
      endpoint: API_ENDPOINT.COURSES_ID_CERTIFICATES_ENABLE,
      params: { id: courseId },
    }),
    async (url: string, { arg }: { arg: IRequestSelectTemplate }) =>
      selectTemplateService(url, { payload: { ...arg, courseId } })
  );

  return {
    triggerSelectTemplate: trigger,
    isLoadingSelectTemplate: isMutating,
    errorSelectTemplate: error,
  };
}

export function useCreateCertLayer() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.HTML_TEMPLATES,
    async (url: string, { arg }: { arg: ICertificateRequest }) => createCertHtmlTemplateService(url, { payload: arg })
  );

  return {
    triggerCreateCertLayer: trigger,
    isLoadingCreateCertLayer: isMutating,
    errorCreateCertLayer: error,
  };
}

export function useUpdateCertLayer(id: string) {
  const { trigger, isMutating, error } = useSWRMutation(
    createAPIUrl({
      endpoint: API_ENDPOINT.HTML_TEMPLATES_ID,
      params: { id },
    }),
    async (url: string, { arg }: { arg: ICertificateUpdate }) => updateCertHtmlTemplateService(url, { payload: arg })
  );

  return {
    triggerUpdateCertLayer: trigger,
    isLoadingUpdateCertLayer: isMutating,
    errorUpdateCertLayer: error,
  };
}

export function useReceiveCertificate() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.CERTIFICATES,
    async (url: string, { arg }: { arg: IReceiveCertificateRequest }) => receiveCertService(url, { payload: arg })
  );

  return {
    triggerReceiveCert: trigger,
    isLoadingReceiveCert: isMutating,
    errorReceiveCert: error,
  };
}

export function useGetCertByUserId(userId: string) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.CERTIFICATES,
    queryParams: { userId },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (url: string) =>
    getCertByUserIdService(url, { params: { userId } })
  );

  return {
    dataCertByUser: data,
    isLoadingCertByUser: isLoading,
    errorCertByUser: error,
    mutateCertByUser: mutate,
  };
}

export function useRemoveCertLayer() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.HTML_TEMPLATES,
    async (url: string, { arg }: { arg: string }) => removeCertLayerService(url, { params: { id: arg } })
  );

  return {
    triggerRemoveCertLayer: trigger,
    isLoadingRemoveCertLayer: isMutating,
    errorRemoveCertLayer: error,
  };
}

export function useGetCertLayerByCourseId(courseId: string) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.COURSES_ID_CERTIFICATES,
    params: { id: courseId },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (url: string) =>
    getCertLayerByCourseIdService(url, { params: { courseId } })
  );

  return {
    dataCertLayerByCourse: data,
    isLoadingCertLayerByCourse: isLoading,
    errorCertLayerByCourse: error,
    mutateCertLayerByCourse: mutate,
  };
}

export function useGetCertById(id: string) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.CERTIFICATES_ID,
    params: { id },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (url: string) =>
    getCertByIdService(url, { params: { id } })
  );

  return {
    dataCertById: data,
    isLoadingCertById: isLoading,
    errorCertById: error,
    mutateCertById: mutate,
  };
}
