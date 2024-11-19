import type { I18nMessage } from '../types';
import { commonMessages } from './common';
import { componentMessages } from './components';
import { featuresMessages } from './features';
import { pageMessages } from './pages';

export const messages: I18nMessage = {
  ...commonMessages,
  ...componentMessages,
  ...pageMessages,
  ...featuresMessages,
};
