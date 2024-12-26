const splitWordsRegex = /[\s_-]+/;
const camelCaseRegex = /([a-z])([A-Z])/g;

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
