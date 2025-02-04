import type { IMessage, IRole, InputType } from '@oe/api/types/conversation';
import type { IFileResponse } from '@oe/api/types/file';
import type { KeyboardEventHandler, ReactNode, RefObject } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

export interface AISidebarItem {
  lableKey: string;
  descKey: string;
  value: string;
  icon: ReactNode;
  href: string;
  isComming?: boolean;
}

export interface ISendMessageParams {
  messageInput?: string;
  type: InputType;
  url?: string;
  images?: IFileResponse[];
  message_id?: string;
  role?: IRole;
  status?: string;
}

export interface IInputButton {
  type: InputType;
  textKey: string;
  icon: ReactNode;
}

export interface MessageInputProps {
  generating?: boolean;
  sendMessage: ({
    messageInput,
    type,
    url,
    images,
    message_id,
    role,
    // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  }: ISendMessageParams) => void | Promise<unknown>;
  className?: string;
  placeholder?: string;
  initialMessage?: string;
  messageId?: string;
  hiddenBtn?: boolean;
  type?: InputType;
  showInputOption?: boolean;
  messageType?: InputType[];
  images?: IFileResponse[];
  resetOnSuccess?: boolean;
}

export type InputFieldProps<TFormValues extends FieldValues> = {
  form?: UseFormReturn<TFormValues>;
  type?: InputType;
  handleKeyDown?: KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  setInputType?: (value: InputType) => void;
  inputRef: RefObject<null | HTMLTextAreaElement>;
  canChangeType?: boolean;
  className?: string;
};

export interface MessageFormValues {
  message: string;
  images?: IFileResponse[];
}

export interface IMessageBoxProps extends IAIMessageProps {
  id?: string;
  sendMessage: ({
    messageInput,
    type,
    url,
    images,
    message_id,
    role,
    // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  }: ISendMessageParams) => void | Promise<unknown>;
  messageType?: InputType[];
}
export interface IAIMessageProps {
  message: IMessage;
  loading: boolean;
  rewrite?: () => void;
}
