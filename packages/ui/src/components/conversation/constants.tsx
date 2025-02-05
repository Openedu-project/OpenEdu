import type { IAgenConfigs, InputType } from "@oe/api/types/conversation";
import { AI_ROUTES } from "@oe/core/utils/routes";
import {
  FileCode,
  Image as ImageIcon,
  MessageCircle,
  PanelsRightBottom,
  Search,
  SquarePlay,
} from "lucide-react";
import type { AISidebarItem, IInputButton } from "./type";

export const AI_SIDEBAR: AISidebarItem[] = [
  {
    lableKey: 'aiChat',
    descKey: 'aiChatDesc',
    value: 'ai-chat',
    href: AI_ROUTES.chat,
    icon: <MessageCircle className="h-4 w-4 text-white" />,
  },
  {
    lableKey: 'aiImage',
    descKey: 'aiImageDesc',
    value: 'ai-image',
    href: AI_ROUTES.imageGenerator,
    icon: <ImageIcon className="h-4 w-4 text-white" />,
    isComming: true,
  },
  {
    lableKey: 'aiSearch',
    descKey: 'aiSearchDesc',
    value: 'ai-search',
    href: AI_ROUTES.search,
    icon: <Search className="h-4 w-4 text-white" />,
    isComming: true,
  },
  {
    lableKey: 'aiVideo',
    descKey: 'aiVideoDesc',
    value: 'ai-video',
    href: AI_ROUTES.video,
    icon: <SquarePlay className="h-4 w-4 text-white" />,
    isComming: true,
  },
];

export const BG_COLOR = [
  "var(--ai-agent-green-background)",
  "var(--ai-agent-pink-background)",
  "var(--ai-agent-orange-background)",
  "var(--ai-agent-blue-background)",
];

export const INPUT_BUTTON: IInputButton[] = [
  {
    type: "ai_image_analysis",
    textKey: "imageAnalysis",
    icon: <ImageIcon size={16} className="text-[var(--pink-500)]" />,
  },
  {
    type: 'ai_image_generate',
    textKey: 'imageGenerator',
    icon: <ImageIcon size={16} className="text-[var(--pink-500)]" />,
  },
  {
    type: 'ai_code',
    textKey: 'code',
    icon: <FileCode size={16} className="text-[var(--positive-500)]" />,
  },
  {
    type: "ai_slide",
    textKey: "presentation",
    icon: <PanelsRightBottom size={16} className="text-[var(--info-500)]" />,
  },
];

export const AGENT_OPTIONS: Record<keyof IAgenConfigs, InputType> = {
  image_analysis_enabled: "ai_image_analysis",
  present_creator_enabled: "ai_slide",
  code_executor_enabled: "ai_code",
  image_generator_enabled: "ai_image_generate",
};

export const CHAT_OPTIONS: InputType[] = ["ai_image_analysis", "ai_chat"];
