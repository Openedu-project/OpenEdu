import type { IAgenConfigs, TAgentType } from '@oe/api/types/conversation';
import Gallery from '@oe/assets/icons/gallery';
import Grid3 from '@oe/assets/icons/grid-3';
import SearchZoomIn from '@oe/assets/icons/search-zoom-in';
import { VideoSquare } from '@oe/assets/icons/video-square';
import { AI_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { MessageCircle } from 'lucide-react';
import type { AISidebarItem, IInputButton } from './type';

export const AI_SIDEBAR: (color?: string, size?: number) => AISidebarItem[] = (color = 'white', size = 12) => [
  {
    lableKey: 'generalChat',
    shortLableKey: 'chat',
    descKey: 'aiChatDesc',
    value: 'chat',
    href: AI_ROUTES.chat,
    icon: <MessageCircle size={size} color={color} />,
    bgColor: 'var(--ai-agent-green-background)',
  },
  {
    lableKey: 'presentation',
    shortLableKey: 'slide',
    descKey: 'aiSlideDesc',
    value: 'ai_slide',
    href: buildUrl({
      endpoint: AI_ROUTES.chat,
      queryParams: { agent: 'ai_slide' },
    }),
    icon: <Grid3 width={size} height={size} color={color} />,
    bgColor: 'var(--ai-agent-aqua-background)',
  },
  {
    lableKey: 'imageGenerator',
    shortLableKey: 'image',
    descKey: 'aiImageDesc',
    value: 'ai_image_generate',
    href: buildUrl({
      endpoint: AI_ROUTES.chat,
      queryParams: { agent: 'ai_image_generate' },
    }),
    icon: <Gallery width={size} height={size} color={color} />,
    bgColor: 'var(--ai-agent-pink-background)',
  },
  {
    lableKey: 'slideToVideo',
    shortLableKey: 'video',
    descKey: 'aiVideoDesc',
    value: 'ai-video',
    href: AI_ROUTES.video,
    icon: <VideoSquare width={size} height={size} color={color} />,
    bgColor: 'var(--ai-agent-blue-background)',
    isComming: true,
  },
  {
    lableKey: 'deepResearch',
    shortLableKey: 'search',
    descKey: 'aiSearchDesc',
    value: 'deepResearch',
    href: AI_ROUTES.search,
    icon: <SearchZoomIn width={size} height={size} color={color} />,
    bgColor: 'var(--ai-agent-orange-background)',
    isComming: true,
  },
];

export const INPUT_BUTTON: IInputButton[] = [
  {
    type: 'ai_image_generate',
    textKey: 'imageGenerator',
    icon: <Gallery width={16} height={16} color="hsl(var(--pink-500))" />,
  },
  {
    type: 'ai_slide',
    textKey: 'presentation',
    icon: <Grid3 width={16} height={16} color="hsl(var(--info-500))" />,
  },
  // {
  //   type: 'ai_code',
  //   textKey: 'code',
  //   icon: <FileCode size={16} className="text-positive-500" />,
  // },
];

export const AGENT_OPTIONS: Partial<Record<keyof IAgenConfigs, TAgentType>> = {
  present_creator_enabled: 'ai_slide',
  code_executor_enabled: 'ai_code',
  image_generator_enabled: 'ai_image_generate',
  searcher_enabled: 'ai_search',
};

export const DESKTOP_BREAKPOINT = 1024;
export const HISTORY_PER_PAGE = 50;

export const HISTORY_DEFAULT_PARAMS = {
  page: 1,
  per_page: HISTORY_PER_PAGE,
  sort: 'create_at desc',
  search_term: '',
};

export const TRANSLATE_AGENT_KEY = {
  ai_slide: 'presentation',
  ai_code: 'code',
  ai_image_generate: 'imageGenerator',
  ai_search: 'generalChat',
};
