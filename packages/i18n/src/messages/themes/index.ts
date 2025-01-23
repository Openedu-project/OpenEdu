import { AcademiaMessage } from './academia';
import { authMessages } from './auth';
import { headerMessages } from './header';
import { ThemeNotiMessages } from './noti';
import { pageSettingMessages } from './page-settings';
import { ScholarMessage } from './scholar';
import { sidbarMessages } from './sidebar';
import { themeListMessages } from './theme-list';
import { ThemeUIMessage } from './theme-ui';
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
      authLayout: 'Auth Layout',
      partners: 'Partners',
    },
    ...AcademiaMessage,
    ...ScholarMessage,
    ...authMessages,
    ...vbiMessage,
  },
  ...ThemeUIMessage,
  ...ThemeNotiMessages,
};
