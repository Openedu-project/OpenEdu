import { formMessages } from './form';
import { resendEmailMessage } from './resend-email';
import { richTextMessages } from './rich-text';
import { tableMessages } from './table';
import { uploaderMessages } from './uploader';

export const componentMessages = {
  ...formMessages,
  ...richTextMessages,
  ...tableMessages,
  ...uploaderMessages,
  ...resendEmailMessage,
};
