import type { IMessage, IRole, TAgentType } from '@oe/api/types/conversation';
import type { IFileResponse } from '@oe/api/types/file';
import type { ChangeEvent, KeyboardEventHandler, ReactNode, RefObject } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

export interface AISidebarItem {
  lableKey: string;
  descKey: string;
  value: string;
  icon: ReactNode;
  href: string;
  isComming?: boolean;
  bgColor: string;
}

export interface ISendMessageParams {
  messageInput?: string;
  type: TAgentType;
  url?: string;
  images?: IFileResponse[];
  message_id?: string;
  role?: IRole;
  status?: string;
}

export interface IInputButton {
  type: TAgentType;
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
  type?: TAgentType;
  showInputOption?: boolean;
  messageType?: TAgentType[];
  images?: IFileResponse[];
  resetOnSuccess?: boolean;
}

export type InputFieldProps<TFormValues extends FieldValues> = {
  form?: UseFormReturn<TFormValues>;
  type?: TAgentType;
  handleKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  setInputType?: (value: TAgentType) => void;
  inputRef: RefObject<null | HTMLTextAreaElement>;
  canChangeType?: boolean;
  className?: string;
  handleInputChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
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
  messageType?: TAgentType[];
}
export interface IAIMessageProps {
  message: IMessage;
  loading: boolean;
  rewrite?: () => void;
}
