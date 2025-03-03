export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const urlRegex = /[\s,]+/;
export const getURLs = (input: string) => input.split(urlRegex).filter(Boolean);

export const validateMultipleUrls = (input: string): boolean => {
  const urls = getURLs(input);
  return urls.every(isValidUrl);
};

interface IBuildUrl {
  endpoint: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  params?: Record<string, any>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  queryParams?: Record<string, any>;
}

export const buildQueryParams = <T extends Record<string, unknown>>(obj: T): string =>
  Object.entries(obj)
    .flatMap(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        return [];
      }
      if (Array.isArray(value)) {
        return value.map(item => `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`);
      }
      return [`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`];
    })
    .join('&');

export const buildUrl = ({ endpoint, params, queryParams }: IBuildUrl) => {
  let url = endpoint;

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`:${key}`, value as string);
    }
  }

  if (queryParams) {
    url += `?${buildQueryParams(queryParams)}`;
  }

  return url;
};

export function buildQueryParam({
  currentParams,
  params,
  resetPage = false,
}: {
  currentParams: URLSearchParams | string;
  params: Array<{ name: string; value: string }>;
  resetPage?: boolean;
}): string {
  const urlParams = new URLSearchParams(currentParams);

  // Set multiple parameter values
  for (const { name, value } of params) {
    urlParams.set(name, value);
  }

  // Reset page to 1 if needed (typically when changing filters)
  if (resetPage) {
    urlParams.set('page', '1');
  }

  return urlParams.toString();
}
