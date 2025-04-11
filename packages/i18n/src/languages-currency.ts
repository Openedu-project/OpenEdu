export type LanguageDetail = {
  name: string;
  currencyCode: string;
};

export type LanguageMap = {
  [key: string]: LanguageDetail;
};

export const languageWithCurrency: LanguageMap = {
  af: {
    name: 'Afrikaans',
    currencyCode: 'ZAR',
  },
  'af-NA': {
    name: 'Afrikaans (Namibia)',
    currencyCode: 'NAD',
  },
  'af-ZA': {
    name: 'Afrikaans (South Africa)',
    currencyCode: 'ZAR',
  },
  ak: {
    name: 'Akan',
    currencyCode: 'GHS',
  },
  'ak-GH': {
    name: 'Akan (Ghana)',
    currencyCode: 'GHS',
  },
  am: {
    name: 'Amharic',
    currencyCode: 'ETB',
  },
  'am-ET': {
    name: 'Amharic (Ethiopia)',
    currencyCode: 'ETB',
  },
  'an-ES': {
    name: 'Aragonese (Spain)',
    currencyCode: 'EUR',
  },
  ar: {
    name: 'Arabic',
    currencyCode: 'SAR',
  },
  'ar-AE': {
    name: 'Arabic (United Arab Emirates)',
    currencyCode: 'AED',
  },
  'ar-BH': {
    name: 'Arabic (Bahrain)',
    currencyCode: 'BHD',
  },
  'ar-DZ': {
    name: 'Arabic (Algeria)',
    currencyCode: 'DZD',
  },
  'ar-EG': {
    name: 'Arabic (Egypt)',
    currencyCode: 'EGP',
  },
  'ar-IN': {
    name: 'Arabic (India)',
    currencyCode: 'INR',
  },
  'ar-IQ': {
    name: 'Arabic (Iraq)',
    currencyCode: 'IQD',
  },
  'ar-JO': {
    name: 'Arabic (Jordan)',
    currencyCode: 'JOD',
  },
  'ar-KW': {
    name: 'Arabic (Kuwait)',
    currencyCode: 'KWD',
  },
  'ar-LB': {
    name: 'Arabic (Lebanon)',
    currencyCode: 'LBP',
  },
  'ar-LY': {
    name: 'Arabic (Libya)',
    currencyCode: 'LYD',
  },
  'ar-MA': {
    name: 'Arabic (Morocco)',
    currencyCode: 'MAD',
  },
  'ar-OM': {
    name: 'Arabic (Oman)',
    currencyCode: 'OMR',
  },
  'ar-QA': {
    name: 'Arabic (Qatar)',
    currencyCode: 'QAR',
  },
  'ar-SA': {
    name: 'Arabic (Saudi Arabia)',
    currencyCode: 'SAR',
  },
  'ar-SD': {
    name: 'Arabic (Sudan)',
    currencyCode: 'SDG',
  },
  'ar-SY': {
    name: 'Arabic (Syria)',
    currencyCode: 'SYP',
  },
  'ar-TN': {
    name: 'Arabic (Tunisia)',
    currencyCode: 'TND',
  },
  'ar-YE': {
    name: 'Arabic (Yemen)',
    currencyCode: 'YER',
  },
  'ast-ES': {
    name: 'Asturian (Spain)',
    currencyCode: 'EUR',
  },
  az: {
    name: 'Azerbaijani',
    currencyCode: 'AZN',
  },
  'az-AZ': {
    name: 'Azerbaijani (Azerbaijan)',
    currencyCode: 'AZN',
  },
  'az-Cyrl': {
    name: 'Azerbaijani (Cyrillic)',
    currencyCode: 'AZN',
  },
  'az-Cyrl-AZ': {
    name: 'Azerbaijani (Cyrillic, Azerbaijan)',
    currencyCode: 'AZN',
  },
  'az-Latn': {
    name: 'Azerbaijani (Latin)',
    currencyCode: 'AZN',
  },
  'az-Latn-AZ': {
    name: 'Azerbaijani (Latin, Azerbaijan)',
    currencyCode: 'AZN',
  },
  be: {
    name: 'Belarusian',
    currencyCode: 'BYN',
  },
  'be-BY': {
    name: 'Belarusian (Belarus)',
    currencyCode: 'BYN',
  },
  bem: {
    name: 'Bemba',
    currencyCode: 'ZMW',
  },
  'bem-ZM': {
    name: 'Bemba (Zambia)',
    currencyCode: 'ZMW',
  },
  bg: {
    name: 'Bulgarian',
    currencyCode: 'BGN',
  },
  'bg-BG': {
    name: 'Bulgarian (Bulgaria)',
    currencyCode: 'BGN',
  },
  bn: {
    name: 'Bangla',
    currencyCode: 'BDT',
  },
  'bn-BD': {
    name: 'Bangla (Bangladesh)',
    currencyCode: 'BDT',
  },
  'bn-IN': {
    name: 'Bangla (India)',
    currencyCode: 'INR',
  },
  'br-FR': {
    name: 'Breton (France)',
    currencyCode: 'EUR',
  },
  bs: {
    name: 'Bosnian',
    currencyCode: 'BAM',
  },
  'bs-BA': {
    name: 'Bosnian (Bosnia & Herzegovina)',
    currencyCode: 'BAM',
  },
  ca: {
    name: 'Catalan',
    currencyCode: 'EUR',
  },
  'ca-AD': {
    name: 'Catalan (Andorra)',
    currencyCode: 'EUR',
  },
  'ca-ES': {
    name: 'Catalan (Spain)',
    currencyCode: 'EUR',
  },
  'ca-FR': {
    name: 'Catalan (France)',
    currencyCode: 'EUR',
  },
  'ca-IT': {
    name: 'Catalan (Italy)',
    currencyCode: 'EUR',
  },
  chr: {
    name: 'Cherokee',
    currencyCode: 'USD',
  },
  'chr-US': {
    name: 'Cherokee (United States)',
    currencyCode: 'USD',
  },
  cs: {
    name: 'Czech',
    currencyCode: 'CZK',
  },
  'cs-CZ': {
    name: 'Czech (Czechia)',
    currencyCode: 'CZK',
  },
  cy: {
    name: 'Welsh',
    currencyCode: 'GBP',
  },
  'cy-GB': {
    name: 'Welsh (United Kingdom)',
    currencyCode: 'GBP',
  },
  da: {
    name: 'Danish',
    currencyCode: 'DKK',
  },
  'da-DK': {
    name: 'Danish (Denmark)',
    currencyCode: 'DKK',
  },
  de: {
    name: 'German',
    currencyCode: 'EUR',
  },
  'de-AT': {
    name: 'Austrian German',
    currencyCode: 'EUR',
  },
  'de-BE': {
    name: 'German (Belgium)',
    currencyCode: 'EUR',
  },
  'de-CH': {
    name: 'Swiss High German',
    currencyCode: 'CHF',
  },
  'de-DE': {
    name: 'German (Germany)',
    currencyCode: 'EUR',
  },
  'de-LI': {
    name: 'German (Liechtenstein)',
    currencyCode: 'CHF',
  },
  'de-LU': {
    name: 'German (Luxembourg)',
    currencyCode: 'EUR',
  },
  ee: {
    name: 'Ewe',
    currencyCode: 'GHS',
  },
  'ee-GH': {
    name: 'Ewe (Ghana)',
    currencyCode: 'GHS',
  },
  'ee-TG': {
    name: 'Ewe (Togo)',
    currencyCode: 'XOF',
  },
  el: {
    name: 'Greek',
    currencyCode: 'EUR',
  },
  'el-CY': {
    name: 'Greek (Cyprus)',
    currencyCode: 'EUR',
  },
  'el-GR': {
    name: 'Greek (Greece)',
    currencyCode: 'EUR',
  },
  en: {
    name: 'English',
    currencyCode: 'USD',
  },
  'en-AG': {
    name: 'English (Antigua & Barbuda)',
    currencyCode: 'XCD',
  },
  'en-AS': {
    name: 'English (American Samoa)',
    currencyCode: 'USD',
  },
  'en-AU': {
    name: 'Australian English',
    currencyCode: 'AUD',
  },
  'en-BE': {
    name: 'English (Belgium)',
    currencyCode: 'EUR',
  },
  'en-BW': {
    name: 'English (Botswana)',
    currencyCode: 'BWP',
  },
  'en-BZ': {
    name: 'English (Belize)',
    currencyCode: 'BZD',
  },
  'en-CA': {
    name: 'Canadian English',
    currencyCode: 'CAD',
  },
  'en-DK': {
    name: 'English (Denmark)',
    currencyCode: 'DKK',
  },
  'en-GB': {
    name: 'British English',
    currencyCode: 'GBP',
  },
  'en-GU': {
    name: 'English (Guam)',
    currencyCode: 'USD',
  },
  'en-HK': {
    name: 'English (Hong Kong)',
    currencyCode: 'HKD',
  },
  'en-IE': {
    name: 'English (Ireland)',
    currencyCode: 'EUR',
  },
  'en-IN': {
    name: 'English (India)',
    currencyCode: 'INR',
  },
  'en-JM': {
    name: 'English (Jamaica)',
    currencyCode: 'JMD',
  },
  'en-MH': {
    name: 'English (Marshall Islands)',
    currencyCode: 'USD',
  },
  'en-MP': {
    name: 'English (Northern Mariana Islands)',
    currencyCode: 'USD',
  },
  'en-MT': {
    name: 'English (Malta)',
    currencyCode: 'EUR',
  },
  'en-MU': {
    name: 'English (Mauritius)',
    currencyCode: 'MUR',
  },
  'en-NA': {
    name: 'English (Namibia)',
    currencyCode: 'NAD',
  },
  'en-NG': {
    name: 'English (Nigeria)',
    currencyCode: 'NGN',
  },
  'en-NZ': {
    name: 'English (New Zealand)',
    currencyCode: 'NZD',
  },
  'en-PH': {
    name: 'English (Philippines)',
    currencyCode: 'PHP',
  },
  'en-PK': {
    name: 'English (Pakistan)',
    currencyCode: 'PKR',
  },
  'en-SG': {
    name: 'English (Singapore)',
    currencyCode: 'SGD',
  },
  'en-TT': {
    name: 'English (Trinidad & Tobago)',
    currencyCode: 'TTD',
  },
  'en-UM': {
    name: 'English (U.S. Outlying Islands)',
    currencyCode: 'USD',
  },
  'en-US': {
    name: 'American English',
    currencyCode: 'USD',
  },
  'en-VI': {
    name: 'English (U.S. Virgin Islands)',
    currencyCode: 'USD',
  },
  'en-ZA': {
    name: 'English (South Africa)',
    currencyCode: 'ZAR',
  },
  'en-ZM': {
    name: 'English (Zambia)',
    currencyCode: 'ZMW',
  },
  'en-ZW': {
    name: 'English (Zimbabwe)',
    currencyCode: 'USD',
  },
  eo: {
    name: 'Esperanto',
    currencyCode: 'EUR',
  },
  es: {
    name: 'Spanish',
    currencyCode: 'EUR',
  },
  'es-419': {
    name: 'Latin American Spanish',
    currencyCode: 'USD',
  },
  'es-AR': {
    name: 'Spanish (Argentina)',
    currencyCode: 'ARS',
  },
  'es-BO': {
    name: 'Spanish (Bolivia)',
    currencyCode: 'BOB',
  },
  'es-CL': {
    name: 'Spanish (Chile)',
    currencyCode: 'CLP',
  },
  'es-CO': {
    name: 'Spanish (Colombia)',
    currencyCode: 'COP',
  },
  'es-CR': {
    name: 'Spanish (Costa Rica)',
    currencyCode: 'CRC',
  },
  'es-CU': {
    name: 'Spanish (Cuba)',
    currencyCode: 'CUP',
  },
  'es-DO': {
    name: 'Spanish (Dominican Republic)',
    currencyCode: 'DOP',
  },
  'es-EC': {
    name: 'Spanish (Ecuador)',
    currencyCode: 'USD',
  },
  'es-ES': {
    name: 'European Spanish',
    currencyCode: 'EUR',
  },
  'es-GQ': {
    name: 'Spanish (Equatorial Guinea)',
    currencyCode: 'XAF',
  },
  'es-GT': {
    name: 'Spanish (Guatemala)',
    currencyCode: 'GTQ',
  },
  'es-HN': {
    name: 'Spanish (Honduras)',
    currencyCode: 'HNL',
  },
  'es-MX': {
    name: 'Mexican Spanish',
    currencyCode: 'MXN',
  },
  'es-NI': {
    name: 'Spanish (Nicaragua)',
    currencyCode: 'NIO',
  },
  'es-PA': {
    name: 'Spanish (Panama)',
    currencyCode: 'PAB',
  },
  'es-PE': {
    name: 'Spanish (Peru)',
    currencyCode: 'PEN',
  },
  'es-PR': {
    name: 'Spanish (Puerto Rico)',
    currencyCode: 'USD',
  },
  'es-PY': {
    name: 'Spanish (Paraguay)',
    currencyCode: 'PYG',
  },
  'es-SV': {
    name: 'Spanish (El Salvador)',
    currencyCode: 'USD',
  },
  'es-US': {
    name: 'Spanish (United States)',
    currencyCode: 'USD',
  },
  'es-UY': {
    name: 'Spanish (Uruguay)',
    currencyCode: 'UYU',
  },
  'es-VE': {
    name: 'Spanish (Venezuela)',
    currencyCode: 'VES',
  },
  et: {
    name: 'Estonian',
    currencyCode: 'EUR',
  },
  'et-EE': {
    name: 'Estonian (Estonia)',
    currencyCode: 'EUR',
  },
  eu: {
    name: 'Basque',
    currencyCode: 'EUR',
  },
  'eu-ES': {
    name: 'Basque (Spain)',
    currencyCode: 'EUR',
  },
  fa: {
    name: 'Persian',
    currencyCode: 'IRR',
  },
  'fa-AF': {
    name: 'Dari',
    currencyCode: 'AFN',
  },
  'fa-IR': {
    name: 'Persian (Iran)',
    currencyCode: 'IRR',
  },
  fi: {
    name: 'Finnish',
    currencyCode: 'EUR',
  },
  'fi-FI': {
    name: 'Finnish (Finland)',
    currencyCode: 'EUR',
  },
  fil: {
    name: 'Filipino',
    currencyCode: 'PHP',
  },
  'fil-PH': {
    name: 'Filipino (Philippines)',
    currencyCode: 'PHP',
  },
  fo: {
    name: 'Faroese',
    currencyCode: 'DKK',
  },
  'fo-FO': {
    name: 'Faroese (Faroe Islands)',
    currencyCode: 'DKK',
  },
  fr: {
    name: 'French',
    currencyCode: 'EUR',
  },
  'fr-BE': {
    name: 'French (Belgium)',
    currencyCode: 'EUR',
  },
  'fr-BF': {
    name: 'French (Burkina Faso)',
    currencyCode: 'XOF',
  },
  'fr-BI': {
    name: 'French (Burundi)',
    currencyCode: 'BIF',
  },
  'fr-BJ': {
    name: 'French (Benin)',
    currencyCode: 'XOF',
  },
  'fr-BL': {
    name: 'French (St. Barthélemy)',
    currencyCode: 'EUR',
  },
  'fr-CA': {
    name: 'Canadian French',
    currencyCode: 'CAD',
  },
  'fr-CD': {
    name: 'French (Congo - Kinshasa)',
    currencyCode: 'CDF',
  },
  'fr-CF': {
    name: 'French (Central African Republic)',
    currencyCode: 'XAF',
  },
  'fr-CG': {
    name: 'French (Congo - Brazzaville)',
    currencyCode: 'XAF',
  },
  'fr-CH': {
    name: 'Swiss French',
    currencyCode: 'CHF',
  },
  'fr-CI': {
    name: "French (Côte d'Ivoire)",
    currencyCode: 'XOF',
  },
  'fr-CM': {
    name: 'French (Cameroon)',
    currencyCode: 'XAF',
  },
  'fr-DJ': {
    name: 'French (Djibouti)',
    currencyCode: 'DJF',
  },
  'fr-FR': {
    name: 'French (France)',
    currencyCode: 'EUR',
  },
  'fr-GA': {
    name: 'French (Gabon)',
    currencyCode: 'XAF',
  },
  'fr-GN': {
    name: 'French (Guinea)',
    currencyCode: 'GNF',
  },
  'fr-GP': {
    name: 'French (Guadeloupe)',
    currencyCode: 'EUR',
  },
  'fr-GQ': {
    name: 'French (Equatorial Guinea)',
    currencyCode: 'XAF',
  },
  'fr-KM': {
    name: 'French (Comoros)',
    currencyCode: 'KMF',
  },
  'fr-LU': {
    name: 'French (Luxembourg)',
    currencyCode: 'EUR',
  },
  'fr-MC': {
    name: 'French (Monaco)',
    currencyCode: 'EUR',
  },
  'fr-MF': {
    name: 'French (St. Martin)',
    currencyCode: 'EUR',
  },
  'fr-MG': {
    name: 'French (Madagascar)',
    currencyCode: 'MGA',
  },
  'fr-ML': {
    name: 'French (Mali)',
    currencyCode: 'XOF',
  },
  'fr-MQ': {
    name: 'French (Martinique)',
    currencyCode: 'EUR',
  },
  'fr-NE': {
    name: 'French (Niger)',
    currencyCode: 'XOF',
  },
  'fr-RE': {
    name: 'French (Réunion)',
    currencyCode: 'EUR',
  },
  'fr-RW': {
    name: 'French (Rwanda)',
    currencyCode: 'RWF',
  },
  'fr-SN': {
    name: 'French (Senegal)',
    currencyCode: 'XOF',
  },
  'fr-TD': {
    name: 'French (Chad)',
    currencyCode: 'XAF',
  },
  'fr-TG': {
    name: 'French (Togo)',
    currencyCode: 'XOF',
  },
  'fy-DE': {
    name: 'Western Frisian (Germany)',
    currencyCode: 'EUR',
  },
  'fy-NL': {
    name: 'Western Frisian (Netherlands)',
    currencyCode: 'EUR',
  },
  ga: {
    name: 'Irish',
    currencyCode: 'EUR',
  },
  'ga-IE': {
    name: 'Irish (Ireland)',
    currencyCode: 'EUR',
  },
  'gd-GB': {
    name: 'Scottish Gaelic (United Kingdom)',
    currencyCode: 'GBP',
  },
  gl: {
    name: 'Galician',
    currencyCode: 'EUR',
  },
  'gl-ES': {
    name: 'Galician (Spain)',
    currencyCode: 'EUR',
  },
  gu: {
    name: 'Gujarati',
    currencyCode: 'INR',
  },
  'gu-IN': {
    name: 'Gujarati (India)',
    currencyCode: 'INR',
  },
  ha: {
    name: 'Hausa',
    currencyCode: 'NGN',
  },
  'ha-Latn': {
    name: 'Hausa (Latin)',
    currencyCode: 'NGN',
  },
  'ha-Latn-GH': {
    name: 'Hausa (Latin, Ghana)',
    currencyCode: 'GHS',
  },
  'ha-Latn-NE': {
    name: 'Hausa (Latin, Niger)',
    currencyCode: 'XOF',
  },
  'ha-Latn-NG': {
    name: 'Hausa (Latin, Nigeria)',
    currencyCode: 'NGN',
  },
  'ha-NG': {
    name: 'Hausa (Nigeria)',
    currencyCode: 'NGN',
  },
  haw: {
    name: 'Hawaiian',
    currencyCode: 'USD',
  },
  'haw-US': {
    name: 'Hawaiian (United States)',
    currencyCode: 'USD',
  },
  he: {
    name: 'Hebrew',
    currencyCode: 'ILS',
  },
  'he-IL': {
    name: 'Hebrew (Israel)',
    currencyCode: 'ILS',
  },
  hi: {
    name: 'Hindi',
    currencyCode: 'INR',
  },
  'hi-IN': {
    name: 'Hindi (India)',
    currencyCode: 'INR',
  },
  hr: {
    name: 'Croatian',
    currencyCode: 'HRK',
  },
  'hr-HR': {
    name: 'Croatian (Croatia)',
    currencyCode: 'HRK',
  },
  'ht-HT': {
    name: 'Haitian Creole (Haiti)',
    currencyCode: 'HTG',
  },
  hu: {
    name: 'Hungarian',
    currencyCode: 'HUF',
  },
  'hu-HU': {
    name: 'Hungarian (Hungary)',
    currencyCode: 'HUF',
  },
  hy: {
    name: 'Armenian',
    currencyCode: 'AMD',
  },
  'hy-AM': {
    name: 'Armenian (Armenia)',
    currencyCode: 'AMD',
  },
  id: {
    name: 'Indonesian',
    currencyCode: 'IDR',
  },
  'id-ID': {
    name: 'Indonesian (Indonesia)',
    currencyCode: 'IDR',
  },
  ig: {
    name: 'Igbo',
    currencyCode: 'NGN',
  },
  'ig-NG': {
    name: 'Igbo (Nigeria)',
    currencyCode: 'NGN',
  },
  is: {
    name: 'Icelandic',
    currencyCode: 'ISK',
  },
  'is-IS': {
    name: 'Icelandic (Iceland)',
    currencyCode: 'ISK',
  },
  it: {
    name: 'Italian',
    currencyCode: 'EUR',
  },
  'it-CH': {
    name: 'Italian (Switzerland)',
    currencyCode: 'CHF',
  },
  'it-IT': {
    name: 'Italian (Italy)',
    currencyCode: 'EUR',
  },
  'iw-IL': {
    name: 'Hebrew (Israel)',
    currencyCode: 'ILS',
  },
  ja: {
    name: 'Japanese',
    currencyCode: 'JPY',
  },
  'ja-JP': {
    name: 'Japanese (Japan)',
    currencyCode: 'JPY',
  },
  ka: {
    name: 'Georgian',
    currencyCode: 'GEL',
  },
  'ka-GE': {
    name: 'Georgian (Georgia)',
    currencyCode: 'GEL',
  },
  kk: {
    name: 'Kazakh',
    currencyCode: 'KZT',
  },
  'kk-Cyrl': {
    name: 'Kazakh (Cyrillic)',
    currencyCode: 'KZT',
  },
  'kk-Cyrl-KZ': {
    name: 'Kazakh (Cyrillic, Kazakhstan)',
    currencyCode: 'KZT',
  },
  'kk-KZ': {
    name: 'Kazakh (Kazakhstan)',
    currencyCode: 'KZT',
  },
  km: {
    name: 'Khmer',
    currencyCode: 'KHR',
  },
  'km-KH': {
    name: 'Khmer (Cambodia)',
    currencyCode: 'KHR',
  },
  kn: {
    name: 'Kannada',
    currencyCode: 'INR',
  },
  'kn-IN': {
    name: 'Kannada (India)',
    currencyCode: 'INR',
  },
  ko: {
    name: 'Korean',
    currencyCode: 'KRW',
  },
  'ko-KR': {
    name: 'Korean (South Korea)',
    currencyCode: 'KRW',
  },
  'ku-TR': {
    name: 'Kurdish (Turkey)',
    currencyCode: 'TRY',
  },
  'ky-KG': {
    name: 'Kyrgyz (Kyrgyzstan)',
    currencyCode: 'KGS',
  },
  'lb-LU': {
    name: 'Luxembourgish (Luxembourg)',
    currencyCode: 'EUR',
  },
  lg: {
    name: 'Ganda',
    currencyCode: 'UGX',
  },
  'lg-UG': {
    name: 'Ganda (Uganda)',
    currencyCode: 'UGX',
  },
  'lo-LA': {
    name: 'Lao (Laos)',
    currencyCode: 'LAK',
  },
  lt: {
    name: 'Lithuanian',
    currencyCode: 'EUR',
  },
  'lt-LT': {
    name: 'Lithuanian (Lithuania)',
    currencyCode: 'EUR',
  },
  lv: {
    name: 'Latvian',
    currencyCode: 'EUR',
  },
  'lv-LV': {
    name: 'Latvian (Latvia)',
    currencyCode: 'EUR',
  },
  mfe: {
    name: 'Morisyen',
    currencyCode: 'MUR',
  },
  'mfe-MU': {
    name: 'Morisyen (Mauritius)',
    currencyCode: 'MUR',
  },
  mg: {
    name: 'Malagasy',
    currencyCode: 'MGA',
  },
  'mg-MG': {
    name: 'Malagasy (Madagascar)',
    currencyCode: 'MGA',
  },
  'mi-NZ': {
    name: 'Māori (New Zealand)',
    currencyCode: 'NZD',
  },
  mk: {
    name: 'Macedonian',
    currencyCode: 'MKD',
  },
  'mk-MK': {
    name: 'Macedonian (North Macedonia)',
    currencyCode: 'MKD',
  },
  ml: {
    name: 'Malayalam',
    currencyCode: 'INR',
  },
  'ml-IN': {
    name: 'Malayalam (India)',
    currencyCode: 'INR',
  },
  'mn-MN': {
    name: 'Mongolian (Mongolia)',
    currencyCode: 'MNT',
  },
  mr: {
    name: 'Marathi',
    currencyCode: 'INR',
  },
  'mr-IN': {
    name: 'Marathi (India)',
    currencyCode: 'INR',
  },
  ms: {
    name: 'Malay',
    currencyCode: 'MYR',
  },
  'ms-BN': {
    name: 'Malay (Brunei)',
    currencyCode: 'BND',
  },
  'ms-MY': {
    name: 'Malay (Malaysia)',
    currencyCode: 'MYR',
  },
  mt: {
    name: 'Maltese',
    currencyCode: 'EUR',
  },
  'mt-MT': {
    name: 'Maltese (Malta)',
    currencyCode: 'EUR',
  },
  my: {
    name: 'Burmese',
    currencyCode: 'MMK',
  },
  'my-MM': {
    name: 'Burmese (Myanmar [Burma])',
    currencyCode: 'MMK',
  },
  nb: {
    name: 'Norwegian Bokmål',
    currencyCode: 'NOK',
  },
  'nb-NO': {
    name: 'Norwegian Bokmål (Norway)',
    currencyCode: 'NOK',
  },
  ne: {
    name: 'Nepali',
    currencyCode: 'NPR',
  },
  'ne-IN': {
    name: 'Nepali (India)',
    currencyCode: 'INR',
  },
  'ne-NP': {
    name: 'Nepali (Nepal)',
    currencyCode: 'NPR',
  },
  nl: {
    name: 'Dutch',
    currencyCode: 'EUR',
  },
  'nl-AW': {
    name: 'Dutch (Aruba)',
    currencyCode: 'AWG',
  },
  'nl-BE': {
    name: 'Flemish',
    currencyCode: 'EUR',
  },
  'nl-NL': {
    name: 'Dutch (Netherlands)',
    currencyCode: 'EUR',
  },
  nn: {
    name: 'Norwegian Nynorsk',
    currencyCode: 'NOK',
  },
  'nn-NO': {
    name: 'Norwegian Nynorsk (Norway)',
    currencyCode: 'NOK',
  },
  'nso-ZA': {
    name: 'Northern Sotho (South Africa)',
    currencyCode: 'ZAR',
  },
  nyn: {
    name: 'Nyankole',
    currencyCode: 'UGX',
  },
  'nyn-UG': {
    name: 'Nyankole (Uganda)',
    currencyCode: 'UGX',
  },
  'oc-FR': {
    name: 'Occitan (France)',
    currencyCode: 'EUR',
  },
  om: {
    name: 'Oromo',
    currencyCode: 'ETB',
  },
  'om-ET': {
    name: 'Oromo (Ethiopia)',
    currencyCode: 'ETB',
  },
  'om-KE': {
    name: 'Oromo (Kenya)',
    currencyCode: 'KES',
  },
  or: {
    name: 'Odia',
    currencyCode: 'INR',
  },
  'or-IN': {
    name: 'Odia (India)',
    currencyCode: 'INR',
  },
  pa: {
    name: 'Punjabi',
    currencyCode: 'INR',
  },
  'pa-Arab': {
    name: 'Punjabi (Arabic)',
    currencyCode: 'PKR',
  },
  'pa-Arab-PK': {
    name: 'Punjabi (Arabic, Pakistan)',
    currencyCode: 'PKR',
  },
  'pa-Guru': {
    name: 'Punjabi (Gurmukhi)',
    currencyCode: 'INR',
  },
  'pa-Guru-IN': {
    name: 'Punjabi (Gurmukhi, India)',
    currencyCode: 'INR',
  },
  'pa-IN': {
    name: 'Punjabi (India)',
    currencyCode: 'INR',
  },
  'pa-PK': {
    name: 'Punjabi (Pakistan)',
    currencyCode: 'PKR',
  },
  pl: {
    name: 'Polish',
    currencyCode: 'PLN',
  },
  'pl-PL': {
    name: 'Polish (Poland)',
    currencyCode: 'PLN',
  },
  ps: {
    name: 'Pashto',
    currencyCode: 'AFN',
  },
  'ps-AF': {
    name: 'Pashto (Afghanistan)',
    currencyCode: 'AFN',
  },
  pt: {
    name: 'Portuguese',
    currencyCode: 'EUR',
  },
  'pt-BR': {
    name: 'Brazilian Portuguese',
    currencyCode: 'BRL',
  },
  'pt-GW': {
    name: 'Portuguese (Guinea-Bissau)',
    currencyCode: 'XOF',
  },
  'pt-MZ': {
    name: 'Portuguese (Mozambique)',
    currencyCode: 'MZN',
  },
  'pt-PT': {
    name: 'European Portuguese',
    currencyCode: 'EUR',
  },
  rm: {
    name: 'Romansh',
    currencyCode: 'CHF',
  },
  'rm-CH': {
    name: 'Romansh (Switzerland)',
    currencyCode: 'CHF',
  },
  ro: {
    name: 'Romanian',
    currencyCode: 'RON',
  },
  'ro-MD': {
    name: 'Moldavian',
    currencyCode: 'MDL',
  },
  'ro-RO': {
    name: 'Romanian (Romania)',
    currencyCode: 'RON',
  },
  ru: {
    name: 'Russian',
    currencyCode: 'RUB',
  },
  'ru-MD': {
    name: 'Russian (Moldova)',
    currencyCode: 'MDL',
  },
  'ru-RU': {
    name: 'Russian (Russia)',
    currencyCode: 'RUB',
  },
  'ru-UA': {
    name: 'Russian (Ukraine)',
    currencyCode: 'UAH',
  },
  rw: {
    name: 'Kinyarwanda',
    currencyCode: 'RWF',
  },
  'rw-RW': {
    name: 'Kinyarwanda (Rwanda)',
    currencyCode: 'RWF',
  },
  'sd-IN': {
    name: 'Sindhi (India)',
    currencyCode: 'INR',
  },
  si: {
    name: 'Sinhala',
    currencyCode: 'LKR',
  },
  'si-LK': {
    name: 'Sinhala (Sri Lanka)',
    currencyCode: 'LKR',
  },
  sk: {
    name: 'Slovak',
    currencyCode: 'EUR',
  },
  'sk-SK': {
    name: 'Slovak (Slovakia)',
    currencyCode: 'EUR',
  },
  sl: {
    name: 'Slovenian',
    currencyCode: 'EUR',
  },
  'sl-SI': {
    name: 'Slovenian (Slovenia)',
    currencyCode: 'EUR',
  },
  sn: {
    name: 'Shona',
    currencyCode: 'USD',
  },
  'sn-ZW': {
    name: 'Shona (Zimbabwe)',
    currencyCode: 'USD',
  },
  so: {
    name: 'Somali',
    currencyCode: 'SOS',
  },
  'so-DJ': {
    name: 'Somali (Djibouti)',
    currencyCode: 'DJF',
  },
  'so-ET': {
    name: 'Somali (Ethiopia)',
    currencyCode: 'ETB',
  },
  'so-KE': {
    name: 'Somali (Kenya)',
    currencyCode: 'KES',
  },
  'so-SO': {
    name: 'Somali (Somalia)',
    currencyCode: 'SOS',
  },
  sq: {
    name: 'Albanian',
    currencyCode: 'ALL',
  },
  'sq-AL': {
    name: 'Albanian (Albania)',
    currencyCode: 'ALL',
  },
  'sq-MK': {
    name: 'Albanian (North Macedonia)',
    currencyCode: 'MKD',
  },
  sr: {
    name: 'Serbian',
    currencyCode: 'RSD',
  },
  'sr-Cyrl': {
    name: 'Serbian (Cyrillic)',
    currencyCode: 'RSD',
  },
  'sr-Cyrl-BA': {
    name: 'Serbian (Cyrillic, Bosnia & Herzegovina)',
    currencyCode: 'BAM',
  },
  'sr-Cyrl-ME': {
    name: 'Montenegrin (Cyrillic)',
    currencyCode: 'EUR',
  },
  'sr-Cyrl-RS': {
    name: 'Serbian (Cyrillic, Serbia)',
    currencyCode: 'RSD',
  },
  'sr-Latn': {
    name: 'Serbian (Latin)',
    currencyCode: 'RSD',
  },
  'sr-Latn-BA': {
    name: 'Serbian (Latin, Bosnia & Herzegovina)',
    currencyCode: 'BAM',
  },
  'sr-Latn-ME': {
    name: 'Montenegrin (Latin)',
    currencyCode: 'EUR',
  },
  'sr-Latn-RS': {
    name: 'Serbian (Latin, Serbia)',
    currencyCode: 'RSD',
  },
  'sr-ME': {
    name: 'Montenegrin',
    currencyCode: 'EUR',
  },
  'sr-RS': {
    name: 'Serbian (Serbia)',
    currencyCode: 'RSD',
  },
  'st-ZA': {
    name: 'Southern Sotho (South Africa)',
    currencyCode: 'ZAR',
  },
  sv: {
    name: 'Swedish',
    currencyCode: 'SEK',
  },
  'sv-FI': {
    name: 'Swedish (Finland)',
    currencyCode: 'EUR',
  },
  'sv-SE': {
    name: 'Swedish (Sweden)',
    currencyCode: 'SEK',
  },
  sw: {
    name: 'Swahili',
    currencyCode: 'TZS',
  },
  'sw-KE': {
    name: 'Swahili (Kenya)',
    currencyCode: 'KES',
  },
  'sw-TZ': {
    name: 'Swahili (Tanzania)',
    currencyCode: 'TZS',
  },
  ta: {
    name: 'Tamil',
    currencyCode: 'INR',
  },
  'ta-IN': {
    name: 'Tamil (India)',
    currencyCode: 'INR',
  },
  'ta-LK': {
    name: 'Tamil (Sri Lanka)',
    currencyCode: 'LKR',
  },
  te: {
    name: 'Telugu',
    currencyCode: 'INR',
  },
  'te-IN': {
    name: 'Telugu (India)',
    currencyCode: 'INR',
  },
  'tg-TJ': {
    name: 'Tajik (Tajikistan)',
    currencyCode: 'TJS',
  },
  th: {
    name: 'Thai',
    currencyCode: 'THB',
  },
  'th-TH': {
    name: 'Thai (Thailand)',
    currencyCode: 'THB',
  },
  ti: {
    name: 'Tigrinya',
    currencyCode: 'ETB',
  },
  'ti-ER': {
    name: 'Tigrinya (Eritrea)',
    currencyCode: 'ERN',
  },
  'ti-ET': {
    name: 'Tigrinya (Ethiopia)',
    currencyCode: 'ETB',
  },
  'tk-TM': {
    name: 'Turkmen (Turkmenistan)',
    currencyCode: 'TMT',
  },
  'tl-PH': {
    name: 'Filipino (Philippines)',
    currencyCode: 'PHP',
  },
  'tn-ZA': {
    name: 'Tswana (South Africa)',
    currencyCode: 'ZAR',
  },
  to: {
    name: 'Tongan',
    currencyCode: 'TOP',
  },
  'to-TO': {
    name: 'Tongan (Tonga)',
    currencyCode: 'TOP',
  },
  tr: {
    name: 'Turkish',
    currencyCode: 'TRY',
  },
  'tr-CY': {
    name: 'Turkish (Cyprus)',
    currencyCode: 'EUR',
  },
  'tr-TR': {
    name: 'Turkish (Turkey)',
    currencyCode: 'TRY',
  },
  'tt-RU': {
    name: 'Tatar (Russia)',
    currencyCode: 'RUB',
  },
  'ug-CN': {
    name: 'Uyghur (China)',
    currencyCode: 'CNY',
  },
  uk: {
    name: 'Ukrainian',
    currencyCode: 'UAH',
  },
  'uk-UA': {
    name: 'Ukrainian (Ukraine)',
    currencyCode: 'UAH',
  },
  ur: {
    name: 'Urdu',
    currencyCode: 'PKR',
  },
  'ur-IN': {
    name: 'Urdu (India)',
    currencyCode: 'INR',
  },
  'ur-PK': {
    name: 'Urdu (Pakistan)',
    currencyCode: 'PKR',
  },
  uz: {
    name: 'Uzbek',
    currencyCode: 'UZS',
  },
  'uz-Arab': {
    name: 'Uzbek (Arabic)',
    currencyCode: 'UZS',
  },
  'uz-Arab-AF': {
    name: 'Uzbek (Arabic, Afghanistan)',
    currencyCode: 'AFN',
  },
  'uz-Cyrl': {
    name: 'Uzbek (Cyrillic)',
    currencyCode: 'UZS',
  },
  'uz-Cyrl-UZ': {
    name: 'Uzbek (Cyrillic, Uzbekistan)',
    currencyCode: 'UZS',
  },
  'uz-Latn': {
    name: 'Uzbek (Latin)',
    currencyCode: 'UZS',
  },
  'uz-Latn-UZ': {
    name: 'Uzbek (Latin, Uzbekistan)',
    currencyCode: 'UZS',
  },
  'uz-UZ': {
    name: 'Uzbek (Uzbekistan)',
    currencyCode: 'UZS',
  },
  vi: {
    name: 'Vietnamese',
    currencyCode: 'VND',
  },
  'wa-BE': {
    name: 'Walloon (Belgium)',
    currencyCode: 'EUR',
  },
  'wo-SN': {
    name: 'Wolof (Senegal)',
    currencyCode: 'XOF',
  },
  'xh-ZA': {
    name: 'Xhosa (South Africa)',
    currencyCode: 'ZAR',
  },
  'yi-US': {
    name: 'Yiddish (United States)',
    currencyCode: 'USD',
  },
  yo: {
    name: 'Yoruba',
    currencyCode: 'NGN',
  },
  'yo-NG': {
    name: 'Yoruba (Nigeria)',
    currencyCode: 'NGN',
  },
  'yue-HK': {
    name: 'Cantonese (Hong Kong)',
    currencyCode: 'HKD',
  },
  zh: {
    name: 'Chinese',
    currencyCode: 'CNY',
  },
  'zh-CN': {
    name: 'Chinese (China)',
    currencyCode: 'CNY',
  },
  'zh-HK': {
    name: 'Chinese (Hong Kong)',
    currencyCode: 'HKD',
  },
  'zh-Hans': {
    name: 'Simplified Chinese',
    currencyCode: 'CNY',
  },
  'zh-Hans-CN': {
    name: 'Simplified Chinese (China)',
    currencyCode: 'CNY',
  },
  'zh-Hans-HK': {
    name: 'Simplified Chinese (Hong Kong)',
    currencyCode: 'HKD',
  },
  'zh-Hans-MO': {
    name: 'Simplified Chinese (Macao)',
    currencyCode: 'MOP',
  },
  'zh-Hans-SG': {
    name: 'Simplified Chinese (Singapore)',
    currencyCode: 'SGD',
  },
  'zh-Hant': {
    name: 'Traditional Chinese',
    currencyCode: 'TWD',
  },
  'zh-Hant-HK': {
    name: 'Traditional Chinese (Hong Kong)',
    currencyCode: 'HKD',
  },
  'zh-Hant-MO': {
    name: 'Traditional Chinese (Macao)',
    currencyCode: 'MOP',
  },
  'zh-Hant-TW': {
    name: 'Traditional Chinese (Taiwan)',
    currencyCode: 'TWD',
  },
  'zh-SG': {
    name: 'Chinese (Singapore)',
    currencyCode: 'SGD',
  },
  'zh-TW': {
    name: 'Chinese (Taiwan)',
    currencyCode: 'TWD',
  },
  zu: {
    name: 'Zulu',
    currencyCode: 'ZAR',
  },
  'zu-ZA': {
    name: 'Zulu (South Africa)',
    currencyCode: 'ZAR',
  },
} as const;

export type LanguageCodeWithCurrency = keyof typeof languageWithCurrency;
export type LanguageWithCurrency = (typeof languageWithCurrency)[LanguageCodeWithCurrency];
