import type { IAgenConfigs, TAgentType } from '@oe/api';
import { Direct, DocumentText, Gallery, Grid3, SearchZoomIn, VideoSquare } from '@oe/assets';
import AIChat from '@oe/assets/images/ai/ai-chat.png';
import AIImage from '@oe/assets/images/ai/ai-image.png';
import AISlide from '@oe/assets/images/ai/ai-slide.png';
import { AI_ROUTES } from '@oe/core';
import { MessageCircle } from 'lucide-react';
import type { AISidebarItem, IInputButton } from './type';

export const MAX_SIZE_BYTES = 200 * 1024 * 1024;
export const MAX_FILES = 10;

export const AI_SIDEBAR: (color?: string, size?: number) => AISidebarItem[] = (color, size = 12) => [
  {
    lableKey: 'generalChat',
    shortLableKey: 'chat',
    descKey: 'aiChatDesc',
    value: 'chat',
    href: AI_ROUTES.chat,
    icon: <MessageCircle size={size} color={color ?? 'var(--warning-500)'} />,
    bgColor: 'var(--ai-agent-green-background)',
    image: AIChat.src,
    agent: 'ai_search',
    detailHref: AI_ROUTES.chatDetail,
  },
  {
    lableKey: 'presentation',
    shortLableKey: 'present',
    descKey: 'aiSlideDesc',
    value: 'slide',
    agent: 'ai_slide',
    href: AI_ROUTES.slide,
    icon: <Grid3 width={size} height={size} color={color ?? 'var(--info-500)'} />,
    bgColor: 'var(--ai-agent-aqua-background)',
    image: AISlide.src,
    detailHref: AI_ROUTES.slideDetail,
  },
  {
    lableKey: 'imageGenerator',
    shortLableKey: 'image',
    descKey: 'aiImageDesc',
    value: 'image-generator',
    agent: 'ai_image_generate',
    href: AI_ROUTES.imageGenerator,
    icon: <Gallery width={size} height={size} color={color ?? 'var(--pink-500)'} />,
    bgColor: 'var(--ai-agent-pink-background)',
    image: AIImage.src,
    detailHref: AI_ROUTES.imageGeneratorDetail,
  },
  {
    lableKey: 'slideToVideo',
    shortLableKey: 'video',
    descKey: 'aiVideoDesc',
    value: 'video',
    href: AI_ROUTES.video,
    icon: <VideoSquare width={size} height={size} color={color} />,
    bgColor: 'var(--ai-agent-blue-background)',
    isComming: true,
    hidden: true,
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
    hidden: true,
  },
  {
    lableKey: 'project',
    shortLableKey: 'project',
    descKey: '',
    value: 'project',
    href: AI_ROUTES.search,
    icon: <DocumentText width={size} height={size} color={color} />,
    bgColor: 'var(--ai-agent-orange-background)',
    isComming: true,
  },
  {
    lableKey: 'prompt',
    shortLableKey: 'prompt',
    descKey: '',
    value: 'prompt',
    href: AI_ROUTES.search,
    icon: <Direct width={size} height={size} color={color} />,
    bgColor: 'var(--ai-agent-orange-background)',
    isComming: true,
  },
];

export const INPUT_BUTTON: IInputButton[] = [
  {
    type: 'ai_image_generate',
    textKey: 'imageGenerator',
    icon: <Gallery width={16} height={16} color="var(--pink-500)" />,
  },
  {
    type: 'ai_slide',
    textKey: 'presentation',
    icon: <Grid3 width={16} height={16} color="var(--info-500)" />,
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
