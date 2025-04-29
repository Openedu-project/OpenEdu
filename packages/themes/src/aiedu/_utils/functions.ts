/**
 * Formats a number with commas as thousand separators
 * @param {number|string} number - The number to format
 * @param {string} [locale='en-US'] - The locale to use for formatting
 * @returns {string} The formatted number string with commas
 */
export const formatNumber = (number?: number, locale = 'en-US') => {
  // Check if it's a valid number
  if (!number) {
    return 0;
  }

  // Format the number with commas
  return number.toLocaleString(locale);
};
