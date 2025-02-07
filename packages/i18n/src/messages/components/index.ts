import { AIGenerateMessages } from './ai-generate-modal';
import { blogFormMessages } from './blog-form';
import { certificateMessages } from './certificate';
import { courseComingSoonMessages } from './course-coming-soon';
import { courseTimelineMessages } from './course-timeline';
import { dateTimePickerMessages } from './date-time-picker';
import { dialogMessages } from './dialog';
import { footerMessages } from './footer';
import { formValidationMessages } from './form-validation';
import { headerMenuMessages } from './header-menu';
import { loginRequiredMessages } from './login-required-modal';
import { noDataAvailableMessages } from './no-data-available';
import { paymentButtonMessages } from './payment-button';
import { confirmPublishMessages } from './publish-button';
import { richTextMessages } from './rich-text';
import { tableMessages } from './table';
import { uploaderMessages } from './uploader';
import { userMenuMessages } from './user-menu';
import { webviewHandlerMessages } from './webview-handler';

export const componentMessages = {
  ...formValidationMessages,
  ...richTextMessages,
  ...tableMessages,
  ...uploaderMessages,
  ...dateTimePickerMessages,
  ...blogFormMessages,
  ...dialogMessages,
  ...blogFormMessages,
  ...dialogMessages,
  ...loginRequiredMessages,
  ...paymentButtonMessages,
  ...userMenuMessages,
  ...headerMenuMessages,
  ...footerMessages,
  ...AIGenerateMessages,
  ...confirmPublishMessages,
  ...noDataAvailableMessages,
  ...courseComingSoonMessages,
  ...certificateMessages,
  ...courseTimelineMessages,
  ...webviewHandlerMessages,
};
