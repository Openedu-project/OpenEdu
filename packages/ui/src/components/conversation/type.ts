import type { IFileResponse } from '@oe/api';
import type { IAIModel, IConversationDetails, IMessage, IRole, TAgentType } from '@oe/api';
import type { ChangeEvent, KeyboardEventHandler, ReactNode, Ref, RefObject } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

export interface AISidebarItem {
  lableKey: string;
  shortLableKey: string;
  descKey: string;
  value: string;
  icon: ReactNode;
  href: string;
  isComming?: boolean;
  bgColor: string;
  agent?: TAgentType;
  detailHref?: string;
  image?: string;
}

export interface ISendMessageParams {
  messageInput?: string;
  type: TAgentType;
  url?: string;
  files?: TFileResponse[];
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
  sendMessage: ({
    messageInput,
    type,
    url,
    files,
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
  files?: IFileResponse[];
  resetOnSuccess?: boolean;
  autoSend?: boolean;
  chatId?: string;
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
  placeholder?: string;
};

export interface MessageFormValues {
  message: string;
  files?: IFileResponse[];
}

export interface IMessageBoxProps extends IAIMessageProps {
  id?: string;
  sendMessage: ({
    messageInput,
    type,
    url,
    files,
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
  content?: string;
  actionsButton?: boolean;
  className?: string;
  hiddenSourceBtn?: boolean;
}

export interface IChatWindowProps {
  id?: string;
  aiModels?: IAIModel[];
  initData?: IConversationDetails;
  agent: TAgentType;
  className?: string;
  inputRef?: Ref<HTMLDivElement>;
}
export type TFileStatus = 'error' | 'finished' | 'generating' | 'completed';
export type TFileResponse = IFileResponse & { status?: TFileStatus; fileId?: string; progress?: number };
