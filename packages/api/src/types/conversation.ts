import type { HTTPPagination } from './fetch';
import type { IFileResponse } from './file';

export interface DocumentInput<Metadata extends Record<string, unknown> = Record<string, unknown>> {
  pageContent: string;
  metadata?: Metadata;
  id?: string;
}

export interface DocumentInterface<Metadata extends Record<string, unknown> = Record<string, unknown>> {
  pageContent: string;
  metadata: Metadata;
  id?: string;
}
export declare class Document<Metadata extends Record<string, unknown> = Record<string, unknown>>
  implements DocumentInput, DocumentInterface
{
  pageContent: string;
  metadata: Metadata;

  id?: string;
  constructor(fields: DocumentInput<Metadata>);
}

export type IRole = 'user' | 'assistant';

export type InputType = 'image_analysis' | 'scrap_from_url' | 'chat';

export type IProvider =
  | 'anthropic.claude-3-5-sonnet-20241022-v2:0'
  | 'us.meta.llama3-2-90b-instruct-v1:0'
  | 'gpt-4o-mini'
  | 'gpt-4o'
  | 'o1-mini';

export interface IAIModel {
  id: string;
  name: IProvider;
  description: string;
  configs: Configs;
  display_name: string;
  thumbnail_url: string;
  org_id: string;
  org_schema: string;
  is_available: boolean;
}

interface Configs {
  image_analysis_enabled: boolean;
  stream_response_enabled: boolean;
}

export interface IChatHistory {
  index?: number;
  id: string;
  is_group: boolean;
  is_ai: boolean;
  type: string;
  context: Context;
  create_at: number;
  update_at: number;
}

export interface IConversationRequest {
  ai_model: IProvider;
  content: string;
  content_type: IContextType;
  is_image_analysis: boolean;
  attachment_ids?: string[];
  ai_conversation_id?: string;
  message_id?: string;
}

export interface IUpdateConversationPayload {
  title: string;
}

export interface IHistoryParams {
  page?: number;
  per_page?: number;
  sort?: string;
  search_term?: string;
}

export interface IMessageData {
  content: string;
  conversation_id: string;
  message_id: string;
  ai_model: IProvider;
  ai_model_display_name: string;
  ai_model_thumbnail_url: string;
  status: IAIStatus;
  error?: null | { code: number; msg: string };
  parent_message_id: string;
  is_image_analysis: boolean;
}

export type IAIStatus = 'generating' | 'pending' | 'completed' | 'failed' | 'stopped';

export type IContextType = 'text';

export type IChatHistoryResponse = HTTPPagination<IChatHistory>;

export type IConversationDetails = IDataPagination<IConversation>;

export interface IConversation {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  is_group: boolean;
  is_ai: boolean;
  type: string;
  org_id: string;
  org_schema: string;
  messages: IMessage[];
  context: Context;
}

interface Context {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  conversation_id: string;
  title: string;
  org_id: string;
  org_schema: string;
}

export interface IMessage {
  id: string;
  create_at: number;
  update_at?: number;
  delete_at?: number;
  sender_id?: string;
  content: string;
  status?: IAIStatus;
  conversation_id: string;
  attachment_ids?: null | string[];
  attachments?: IFileResponse[];
  org_id?: string;
  org_schema?: string;
  error?: null | { code: number; msg: string };
  context_id?: string;
  content_type: IContextType;
  is_edited?: boolean;
  is_ai: boolean;
  configs: IMessageConfigs;
  ai_model: IMessageAIModel;
  sender: IMessageSender;

  // adjust later
  suggestions?: string[];
  sources?: Document[];
}

interface IMessageConfigs {
  is_image_analysis: boolean;
}

interface IMessageAIModel {
  id?: string;
  create_at?: number;
  update_at?: number;
  delete_at?: number;
  name: IProvider;
  description?: string;
  enabled?: boolean;
  configs?: IModelConfigs;
  org_id?: string;
  org_schema?: string;
  thumbnail_url?: string;
  display_name?: string;
}

interface IModelConfigs {
  image_analysis_enabled: boolean;
  stream_response_enabled: boolean;
}

interface IMessageSender {
  id?: string;
  create_at?: number;
  update_at?: number;
  delete_at?: number;
  conversation_id?: string;
  user_id?: string;
  role: IRole;
  permission?: string;
  org_id?: string;
  org_schema?: string;
}
