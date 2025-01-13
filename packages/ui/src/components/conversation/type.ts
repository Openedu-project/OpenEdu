import type { IRole, InputType } from '@oe/api/types/conversation';
import type { IFileResponse } from '@oe/api/types/file';

export interface ISendMessageParams {
  messageInput?: string;
  type: InputType;
  url?: string;
  images?: IFileResponse[];
  message_id?: string;
  role?: IRole;
  status?: string;
}
