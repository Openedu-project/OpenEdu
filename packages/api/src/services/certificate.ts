import type { HTTPPagination } from '#types/fetch';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, deleteAPI, fetchAPI, postAPI, putAPI } from '#utils/fetch';
import type {
  ICertificate,
  ICertificateData,
  ICertificateDetail,
  ICertificateRequest,
  ICertificateUpdate,
  ICertificateUser,
  IReceiveCertificateRequest,
  IRequestSelectTemplate,
} from '../types/certificate';

export async function getCertLayersService(
  url: string,
  { params, init }: { params: { courseId: string } & IFilter; init?: RequestInit }
): Promise<HTTPPagination<ICertificate> | null> {
  let endpointKey = url;

  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COURSES_ID_HTML_TEMPLATES,
      params: { id: params.courseId },
      queryParams: { ...params },
    });
  }

  try {
    const response = await fetchAPI<HTTPPagination<ICertificate>>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export async function getTemplatesService(
  url: string,
  { params, init }: { params?: IFilter; init?: RequestInit }
): Promise<HTTPPagination<ICertificate> | null> {
  let endpointKey = url;

  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.HTML_TEMPLATES,
      queryParams: { ...params },
    });
  }

  try {
    const response = await fetchAPI<HTTPPagination<ICertificate>>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export async function selectTemplateService(
  endpoint: string | null | undefined,
  { payload, init }: { payload: IRequestSelectTemplate & { courseId: string }; init?: RequestInit }
) {
  let endpointKey = endpoint;

  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COURSES_ID_CERTIFICATES_ENABLE,
      params: { id: payload.courseId },
    });
  }

  const response = await putAPI<string, IRequestSelectTemplate>(endpoint ?? endpointKey, payload, init);

  return response.data;
}

export async function createCertHtmlTemplateService(
  endpoint: string | null | undefined,
  { payload, init }: { payload: ICertificateRequest; init?: RequestInit }
) {
  const response = await postAPI<ICertificate, ICertificateRequest>(
    endpoint ?? API_ENDPOINT.HTML_TEMPLATES,
    payload,
    init
  );

  return response.data;
}

export async function getTemplateByIdService(
  endpoint: string | null | undefined,
  { params, init }: { params: { id: string }; init?: RequestInit }
) {
  let endpointKey = endpoint;

  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.HTML_TEMPLATES_ID,
      params: { id: params.id },
    });
  }

  const response = await fetchAPI<ICertificate>(endpointKey, init);

  return response.data;
}

export async function updateCertHtmlTemplateService(
  endpoint: string | null | undefined,
  { payload, init }: { payload: Partial<ICertificateUpdate>; init?: RequestInit }
) {
  let endpointKey = endpoint;

  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.HTML_TEMPLATES_ID,
      params: { id: payload.id },
    });
  }

  const response = await putAPI<ICertificate, Partial<ICertificateUpdate>>(endpointKey, payload, init);

  return response.data;
}

export async function receiveCertService(
  endpoint: string | null | undefined,
  { payload, init }: { payload: IReceiveCertificateRequest; init?: RequestInit }
) {
  const response = await postAPI<string, IReceiveCertificateRequest>(
    endpoint ?? API_ENDPOINT.CERTIFICATES,
    payload,
    init
  );

  return response.data;
}

export async function getCertByUserIdService(
  url: string | null | undefined,
  { params, init }: { params: { user_id: string }; init?: RequestInit }
): Promise<HTTPPagination<ICertificateUser> | null> {
  let endpointKey = url;

  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.CERTIFICATES,
      queryParams: { ...params },
    });
  }

  try {
    const response = await fetchAPI<HTTPPagination<ICertificateUser>>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export async function removeCertLayerService(
  endpoint: string | null | undefined,
  { params, init }: { params: { id: string }; init?: RequestInit }
) {
  let endpointKey = endpoint;

  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: `${API_ENDPOINT.HTML_TEMPLATES}/${params.id}`,
    });
  }

  const response = await deleteAPI(endpointKey, init);

  return response.data;
}

export async function getCertLayerByCourseIdService(
  url: string | null | undefined,
  { params, init }: { params: { courseId: string }; init?: RequestInit }
): Promise<ICertificate | null> {
  let endpointKey = url;

  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COURSES_ID_CERTIFICATES,
      params: { id: params.courseId },
    });
  }

  try {
    const response = await fetchAPI<ICertificate>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export async function getCertByIdService(
  url: string,
  { params, init }: { params: { id: string }; init?: RequestInit }
): Promise<ICertificateDetail | null> {
  let endpointKey = url;

  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.CERTIFICATES_ID,
      params: { id: params.id },
    });
  }

  try {
    const response = await fetchAPI<ICertificateDetail>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export async function updateCertEnableService(
  endpoint: string | null | undefined,
  { payload, init }: { payload: { id: string }; init?: RequestInit }
) {
  let endpointKey = endpoint;

  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.HTML_TEMPLATES_ID_ENABLE,
      params: { id: payload.id },
    });
  }

  const response = await postAPI<ICertificate, unknown>(endpointKey, undefined, init);

  return response.data;
}

export async function updateCourseCertTemplateService(
  url: string | null | undefined,
  {
    params,
    payload,
    init,
  }: { params: { courseId?: string; templateId?: string }; payload: Partial<ICertificateData>; init?: RequestInit }
): Promise<ICertificate | null> {
  let endpointKey = url;

  if (!endpointKey && params.courseId && params.templateId) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COURSES_ID_HTML_TEMPLATES_ID,
      params: { id: params.courseId, template_id: params.templateId },
    });
  }

  const response = await putAPI<ICertificate, Partial<ICertificateData>>(endpointKey ?? '', payload, init);

  return response.data;
}
