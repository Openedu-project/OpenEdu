const removeAccents = (str: string) => str.normalize('NFD').replace(/\p{Diacritic}/gu, '');

export type AccessorAttributes = {
  threshold?: Ranking;
  maxRanking: Ranking;
  minRanking: Ranking;
};

export interface RankingInfo {
  rankedValue: unknown;
  rank: Ranking;
  accessorIndex: number;
  accessorThreshold: Ranking | undefined;
  passed: boolean;
}

export interface AccessorOptions<TItem> {
  accessor: AccessorFn<TItem>;
  threshold?: Ranking;
  maxRanking?: Ranking;
  minRanking?: Ranking;
}

export type AccessorFn<TItem> = (item: TItem) => string | string[];

export type Accessor<TItem> = AccessorFn<TItem> | AccessorOptions<TItem>;

export interface RankItemOptions<TItem = unknown> {
  accessors?: readonly Accessor<TItem>[];
  threshold?: Ranking;
  keepDiacritics?: boolean;
}

export const rankings = {
  CASE_SENSITIVE_EQUAL: 7,
  EQUAL: 6,
  STARTS_WITH: 5,
  WORD_STARTS_WITH: 4,
  CONTAINS: 3,
  ACRONYM: 2,
  MATCHES: 1,
  NO_MATCH: 0,
} as const;

export type Ranking = (typeof rankings)[keyof typeof rankings];

/**
 * Gets the highest ranking for value for the given item based on its values for the given keys
 * @param {*} item - the item to rank
 * @param {String} value - the value to rank against
 * @param {Object} options - options to control the ranking
 * @return {{rank: Number, accessorIndex: Number, accessorThreshold: Number}} - the highest ranking
 */
export function rankItem<TItem>(item: TItem, value: string, initialOptions?: RankItemOptions<TItem>): RankingInfo {
  const options = initialOptions || {};
  const threshold = options.threshold ?? rankings.MATCHES;

  if (!options.accessors) {
    // if keys is not specified, then we assume the item given is ready to be matched
    const rank = getMatchRanking(item as unknown as string, value, options);
    return {
      // ends up being duplicate of 'item' in matches but consistent
      rankedValue: item,
      rank,
      accessorIndex: -1,
      accessorThreshold: threshold,
      passed: rank >= threshold,
    };
  }

  const valuesToRank = getAllValuesToRank(item, options.accessors);

  const rankingInfo: RankingInfo = {
    rankedValue: item,
    rank: rankings.NO_MATCH as Ranking,
    accessorIndex: -1,
    accessorThreshold: threshold,
    passed: false,
  };

  for (let i = 0; i < valuesToRank.length; i++) {
    const rankValue = valuesToRank[i];
    if (!rankValue) {
      continue;
    }

    let newRank = getMatchRanking(rankValue.itemValue, value, options);

    const { minRanking, maxRanking, threshold: rankThreshold = threshold } = rankValue.attributes;

    if (newRank < minRanking && newRank >= rankings.MATCHES) {
      newRank = minRanking;
    } else if (newRank > maxRanking) {
      newRank = maxRanking;
    }

    newRank = Math.min(newRank, maxRanking) as Ranking;

    if (newRank >= rankThreshold && newRank > rankingInfo.rank) {
      rankingInfo.rank = newRank;
      rankingInfo.passed = true;
      rankingInfo.accessorIndex = i;
      rankingInfo.accessorThreshold = rankThreshold;
      rankingInfo.rankedValue = rankValue.itemValue;
    }
  }

  return rankingInfo;
}

/**
 * Gives a rankings score based on how well the two strings match.
 * @param {String} testString - the string to test against
 * @param {String} stringToRank - the string to rank
 * @param {Object} options - options for the match (like keepDiacritics for comparison)
 * @returns {Number} the ranking for how well stringToRank matches testString
 */
function getMatchRanking<TItem>(
  initialTestString: string,
  initialStringToRank: string,
  options: RankItemOptions<TItem>
): Ranking {
  let testString = prepareValueForComparison(initialTestString, options);
  let stringToRank = prepareValueForComparison(initialStringToRank, options);

  // too long
  if (stringToRank.length > testString.length) {
    return rankings.NO_MATCH;
  }

  // case sensitive equals
  if (testString === stringToRank) {
    return rankings.CASE_SENSITIVE_EQUAL;
  }

  // Lower casing before further comparison
  testString = testString.toLowerCase();
  stringToRank = stringToRank.toLowerCase();

  // case insensitive equals
  if (testString === stringToRank) {
    return rankings.EQUAL;
  }

  // starts with
  if (testString.startsWith(stringToRank)) {
    return rankings.STARTS_WITH;
  }

  // word starts with
  if (testString.includes(` ${stringToRank}`)) {
    return rankings.WORD_STARTS_WITH;
  }

  // contains
  if (testString.includes(stringToRank)) {
    return rankings.CONTAINS;
  }

  if (stringToRank.length === 1) {
    // If the only character in the given stringToRank
    //   isn't even contained in the testString, then
    //   it's definitely not a match.
    return rankings.NO_MATCH;
  }

  // acronym
  if (getAcronym(testString).includes(stringToRank)) {
    return rankings.ACRONYM;
  }

  // will return a number between rankings.MATCHES and
  // rankings.MATCHES + 1 depending  on how close of a match it is.
  return getClosenessRanking(testString, stringToRank);
}

/**
 * Generates an acronym for a string.
 *
 * @param {String} string the string for which to produce the acronym
 * @returns {String} the acronym
 */
function getAcronym(string: string): string {
  let acronym = '';
  const wordsInString = string.split(' ');
  for (const wordInString of wordsInString) {
    const splitByHyphenWords = wordInString.split('-');
    for (const splitByHyphenWord of splitByHyphenWords) {
      acronym += splitByHyphenWord.substr(0, 1);
    }
  }
  return acronym;
}

/**
 * Returns a score based on how spread apart the
 * characters from the stringToRank are within the testString.
 * A number close to rankings.MATCHES represents a loose match. A number close
 * to rankings.MATCHES + 1 represents a tighter match.
 * @param {String} testString - the string to test against
 * @param {String} stringToRank - the string to rank
 * @returns {Number} the number between rankings.MATCHES and
 * rankings.MATCHES + 1 for how well stringToRank matches testString
 */
function getClosenessRanking(testString: string, stringToRank: string): Ranking {
  let matchingInOrderCharCount = 0;
  let charNumber = 0;
  function findMatchingCharacter(matchChar: undefined | string, string: string, index: number) {
    for (let j = index, J = string.length; j < J; j++) {
      const stringChar = string[j];
      if (stringChar === matchChar) {
        matchingInOrderCharCount += 1;
        return j + 1;
      }
    }
    return -1;
  }
  function getRanking(spread: number) {
    const spreadPercentage = 1 / spread;
    const inOrderPercentage = matchingInOrderCharCount / stringToRank.length;
    const ranking = rankings.MATCHES + inOrderPercentage * spreadPercentage;
    return ranking as Ranking;
  }
  const firstIndex = findMatchingCharacter(stringToRank[0], testString, 0);
  if (firstIndex < 0) {
    return rankings.NO_MATCH;
  }
  charNumber = firstIndex;
  for (let i = 1, I = stringToRank.length; i < I; i++) {
    const matchChar = stringToRank[i];
    charNumber = findMatchingCharacter(matchChar, testString, charNumber);
    const found = charNumber > -1;
    if (!found) {
      return rankings.NO_MATCH;
    }
  }

  const spread = charNumber - firstIndex;
  return getRanking(spread);
}

/**
 * Sorts items that have a rank, index, and accessorIndex
 * @param {Object} a - the first item to sort
 * @param {Object} b - the second item to sort
 * @return {Number} -1 if a should come first, 1 if b should come first, 0 if equal
 */
export function compareItems(a: RankingInfo, b: RankingInfo): number {
  return a.rank === b.rank ? 0 : a.rank > b.rank ? -1 : 1;
}

/**
 * Prepares value for comparison by stringifying it, removing diacritics (if specified)
 * @param {String} value - the value to clean
 * @param {Object} options - {keepDiacritics: whether to remove diacritics}
 * @return {String} the prepared value
 */
function prepareValueForComparison<TItem>(initialValue: string, { keepDiacritics }: RankItemOptions<TItem>): string {
  // value might not actually be a string at this point (we don't get to choose)
  // so part of preparing the value for comparison is ensure that it is a string
  let value = `${initialValue}`; // toString
  if (!keepDiacritics) {
    value = removeAccents(value);
  }
  return value;
}

/**
 * Gets value for key in item at arbitrarily nested keypath
 * @param {Object} item - the item
 * @param {Object|Function} key - the potentially nested keypath or property callback
 * @return {Array} - an array containing the value(s) at the nested keypath
 */
function getItemValues<TItem>(item: TItem, accessor: Accessor<TItem>): string[] {
  let accessorFn = accessor as AccessorFn<TItem>;

  if (typeof accessor === 'object') {
    accessorFn = accessor.accessor;
  }

  const value = accessorFn(item);

  // because `value` can also be undefined
  if (value == null) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  return [String(value)];
}

/**
 * Gets all the values for the given keys in the given item and returns an array of those values
 * @param item - the item from which the values will be retrieved
 * @param keys - the keys to use to retrieve the values
 * @return objects with {itemValue, attributes}
 */
function getAllValuesToRank<TItem>(item: TItem, accessors: readonly Accessor<TItem>[]) {
  const allValues: Array<{
    itemValue: string;
    attributes: AccessorAttributes;
  }> = [];
  for (let j = 0, J = accessors.length; j < J; j++) {
    const accessor = accessors[j];
    if (!accessor) {
      continue;
    }

    const attributes = getAccessorAttributes(accessor);
    const itemValues = getItemValues(item, accessor);
    for (let i = 0, I = itemValues.length; i < I; i++) {
      const itemValue = itemValues[i];
      if (!itemValue) {
        continue;
      }

      allValues.push({
        itemValue,
        attributes,
      });
    }
  }
  return allValues;
}

const defaultKeyAttributes = {
  maxRanking: Number.POSITIVE_INFINITY as Ranking,
  minRanking: Number.NEGATIVE_INFINITY as Ranking,
};
/**
 * Gets all the attributes for the given accessor
 * @param accessor - the accessor from which the attributes will be retrieved
 * @return object containing the accessor's attributes
 */
function getAccessorAttributes<TItem>(accessor: Accessor<TItem>): AccessorAttributes {
  if (typeof accessor === 'function') {
    return defaultKeyAttributes;
  }
  return { ...defaultKeyAttributes, ...accessor };
}
