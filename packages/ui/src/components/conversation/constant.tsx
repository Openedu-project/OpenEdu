import type { IAgenConfigs, InputType } from '@oe/api/types/conversation';
import { Image as ImageIcon, PanelsRightBottom, Unlink2 } from 'lucide-react';
import type { IInputButton } from './type';

export const INPUT_BUTTON: IInputButton[] = [
  {
    type: 'image_analysis',
    textKey: 'imageAnalysis',
    icon: <ImageIcon size={16} className="text-[#FD77F3]" />,
  },
  {
    type: 'scrap_from_url',
    textKey: 'scrapURLLink',
    icon: <Unlink2 size={16} className="text-[#FFBD04]" />,
  },
  {
    type: 'ai_slide',
    textKey: 'presentation',
    icon: <PanelsRightBottom size={16} className="text-[#0A8AFF]" />,
  },
];

export const AGENT_OPTIONS: Record<keyof IAgenConfigs, InputType> = {
  image_analysis_enabled: 'image_analysis',
  present_creator_enabled: 'ai_slide',
  code_executor_enabled: 'ai_code',
  image_generator_enabled: 'ai_image',
};

export const CHAT_OPTIONS: InputType[] = ['image_analysis', 'chat', 'chat'];
