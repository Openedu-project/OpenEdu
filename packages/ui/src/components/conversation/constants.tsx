import type { IAgenConfigs, TAgentType } from '@oe/api/types/conversation';
import { AI_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import {
  FileCode,
  Image as ImageIcon,
  ListFilter,
  MessageCircle,
  PanelsRightBottom,
  ScanSearch,
  Search,
  SquarePlay,
} from 'lucide-react';
import type { AISidebarItem, IInputButton } from './type';

export const AI_SIDEBAR: AISidebarItem[] = [
  {
    lableKey: 'generalChat',
    descKey: 'aiChatDesc',
    value: 'chat',
    href: AI_ROUTES.chat,
    icon: <MessageCircle className="h-4 w-4 text-white" />,
    bgColor: 'var(--ai-agent-green-background)',
  },
  {
    lableKey: 'presentation',
    descKey: 'aiSlideDesc',
    value: 'ai_slide',
    href: buildUrl({
      endpoint: AI_ROUTES.chat,
      queryParams: { agent: 'ai_slide' },
    }),
    icon: <ListFilter className="h-4 w-4 text-white" />,
    bgColor: 'var(--ai-agent-aqua-background)',
  },
  {
    lableKey: 'imageGenerator',
    descKey: 'aiImageDesc',
    value: 'ai_image_generate',
    href: buildUrl({
      endpoint: AI_ROUTES.chat,
      queryParams: { agent: 'ai_image_generate' },
    }),
    icon: <ImageIcon className="h-4 w-4 text-white" />,
    bgColor: 'var(--ai-agent-pink-background)',
  },
  {
    lableKey: 'slideToVideo',
    descKey: 'aiVideoDesc',
    value: 'ai-video',
    href: AI_ROUTES.video,
    icon: <SquarePlay className="h-4 w-4 text-white" />,
    bgColor: 'var(--ai-agent-blue-background)',
    isComming: true,
  },
  {
    lableKey: 'deepResearch',
    descKey: 'aiSearchDesc',
    value: 'deepResearch',
    href: AI_ROUTES.search,
    icon: <Search className="h-4 w-4 text-white" />,
    bgColor: 'var(--ai-agent-orange-background)',
    isComming: true,
  },
];

export const INPUT_BUTTON: IInputButton[] = [
  // {
  //   type: 'ai_search',
  //   textKey: 'deepResearch',
  //   icon: <SearchIcon size={16} className="text-orange-500" />,
  // },
  {
    type: 'ai_image_generate',
    textKey: 'imageGenerator',
    icon: <ImageIcon size={16} className="text-pink-500" />,
  },
  {
    type: 'ai_slide',
    textKey: 'presentation',
    icon: <PanelsRightBottom size={16} className="text-info-500" />,
  },
  {
    type: 'ai_code',
    textKey: 'code',
    icon: <FileCode size={16} className="text-positive-500" />,
  },
  {
    type: 'ai_image_analysis',
    textKey: 'imageAnalysis',
    icon: <ScanSearch size={16} className="text-pink-500" />,
  },
];

export const AGENT_OPTIONS: Record<keyof IAgenConfigs, TAgentType> = {
  image_analysis_enabled: 'ai_image_analysis',
  present_creator_enabled: 'ai_slide',
  code_executor_enabled: 'ai_code',
  image_generator_enabled: 'ai_image_generate',
  searcher_enabled: 'ai_search',
};

export const CHAT_OPTIONS: TAgentType[] = ['ai_image_analysis', 'ai_search'];

export const DESKTOP_BREAKPOINT = 1024;
export const HISTORY_PER_PAGE = 50;

export const HISTORY_DEFAULT_PARAMS = {
  page: 1,
  per_page: HISTORY_PER_PAGE,
  sort: 'create_at desc',
  search_term: '',
};
