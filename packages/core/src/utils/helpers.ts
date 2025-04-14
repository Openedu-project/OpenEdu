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
