const splitWordsRegex = /[\s_-]+/;
const camelCaseRegex = /([a-z])([A-Z])/g;
const pickCharacterRegex = /\s+/;

const splitWords = (str: string): string[] => {
  const string = str.replace(camelCaseRegex, '$1 $2');
  return string.split(splitWordsRegex).filter(word => word.length > 0);
};

const capitalizeWord = (word: string): string => {
  if (word.length === 0) {
    return word;
  }
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export function toTitleCase(input: string): string {
  const words = splitWords(input);

  return words.map(capitalizeWord).join(' ');
}

export const pickCharacters = (input: string): string => {
  const words = input.split(pickCharacterRegex);

  if (words.length > 1) {
    return words
      .slice(0, 2)
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  }
  return input.slice(0, 2).toUpperCase();
};
