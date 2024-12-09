const CHARACTERS_REGEX = /\s+/;

export const pickCharacters = (input: string, length = 2): string => {
  const words = input.split(CHARACTERS_REGEX);

  if (words.length > 1) {
    return words
      .slice(0, length)
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  }
  return input.slice(0, length).toUpperCase();
};
