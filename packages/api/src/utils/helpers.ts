export type QueryParams = { [key: string]: unknown };

export const objectToQueryParams = (obj: QueryParams): string =>
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
