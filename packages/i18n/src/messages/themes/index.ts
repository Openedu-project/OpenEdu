import { academiaMessage } from './academia';
import { authMessages } from './auth';
import { availMessage } from './avail';
import { headerMessages } from './header';
import { themeNotiMessages } from './noti';
import { pageSettingMessages } from './page-settings';
import { scholarMessage } from './scholar';
import { sidbarMessages } from './sidebar';
import { themeFeaturedContentMessages } from './theme-featured-content';
import { themeInfoMessages } from './theme-info';
import { themeListMessages } from './theme-list';
import { themeMetadataMessages } from './theme-metadata';
import { themeUIMessage } from './theme-ui';
import { vbiMessage } from './vbi';
export const themeMessages = {
  ...headerMessages,
  ...sidbarMessages,
  ...pageSettingMessages,
  ...themeListMessages,
  themePage: {
    labels: {
      // Record<settingKey, string>
      homepage: 'Homepage', //label
      aboutus: 'About Us',
      authLayout: 'Auth / Layout',
      partners: 'Partners',
    },
    ...authMessages,
    ...themeInfoMessages,
    ...academiaMessage,
    ...scholarMessage,
    ...vbiMessage,
    ...availMessage,
  },
  ...themeUIMessage,
  ...themeNotiMessages,
  ...themeFeaturedContentMessages,
  ...themeMetadataMessages,
};
