export const CHARACTERS_REGEX = /\s+/;

export function abbreviateNumber(number: number) {
  const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

  if (number === 0) {
    return number;
  }
  const tier = Math.trunc(Math.log10(Math.abs(number)) / 3);

  if (tier === 0) {
    return number;
  }

  const suffix = SI_SYMBOL[tier];
  const scale = 10 ** (tier * 3);

  const scaled = number / scale;

  return scaled.toFixed(1) + suffix;
}

export const extractHtmlToText = (htmlString: string, maxSize?: number): string => {
  // Remove all HTML tags using regular expression
  const textOnly = htmlString.replaceAll(/<[^>]*>/g, '');

  return textOnly.slice(0, maxSize ?? 160);
};
