export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const urlRegex = /[\s,]+/;
export const validateMultipleUrls = (input: string): boolean => {
  const urls = input.split(urlRegex).filter(Boolean);
  return urls.every(isValidUrl);
};

interface IBuildUrl {
  endpoint: string;
  params?: Record<string, unknown>;
  queryParams?: Record<string, unknown>;
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
