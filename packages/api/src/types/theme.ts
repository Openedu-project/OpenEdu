import type { LanguageCode } from '@oe/i18n/languages';
import type { ThemeSystem } from '../../../themes/src/_types';

export interface IThemeSystemConfigPayload {
  config: ThemeSystem;
  id?: string;
  locale?: LanguageCode;
  domain?: string;
}
