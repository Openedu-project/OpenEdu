import type { LanguageCode } from '@oe/i18n';
// import type { ThemeSystem } from '../../../themes/src/_types';

export interface IThemeSystemConfigPayload {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  config: any;
  id?: string;
  locale?: LanguageCode;
  domain?: string;
}
