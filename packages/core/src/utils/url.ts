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
