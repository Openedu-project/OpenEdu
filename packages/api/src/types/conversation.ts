import type { HTTPPagination } from './fetch';
import type { IFileResponse } from './file';
import type { IDataPagination } from './pagination';

export type IRole = 'user' | 'assistant';

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
export interface IAgenConfigs {
  image_analysis_enabled: boolean;
  image_generator_enabled: boolean;
  present_creator_enabled: boolean;
  code_executor_enabled: boolean;
  searcher_enabled: boolean;
}
export interface Configs extends IAgenConfigs {
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

export type TAgentType = 'ai_search' | 'ai_slide' | 'ai_image_generate' | 'ai_image_analysis' | 'ai_code';
export interface IConversationRequest {
  ai_agent_type: TAgentType;
  message_ai_agent_type?: TAgentType;
  ai_model?: IProvider;
  content: string;
  content_type: IContextType;
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
  ai_agent_type: TAgentType;
  message_ai_agent_type: TAgentType;
}

export type IAIStatus = 'generating' | 'pending' | 'completed' | 'failed' | 'stopped' | 'tool_ended';

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
  ai_model: IMessageAIModel;
  sender: IMessageSender;
  ai_agent_type: TAgentType;
  props?: IMessageProps | null;
}

export interface IMessageProps {
  source_results: ISourceProps[];
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

export interface ISourceProps {
  url: string;
  title: string;
  content: string;
}
