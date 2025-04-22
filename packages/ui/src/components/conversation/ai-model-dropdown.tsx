'use client';
import Openedu from '@oe/assets/images/openedu.png';
import { Check, ChevronDown } from 'lucide-react';

import type { IAIModel } from '@oe/api';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Image } from '#components/image';
import { Button } from '#shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '#shadcn/dropdown-menu';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { AGENT_OPTIONS } from './constants';

interface ModelDropdownProps {
  onSelectSuccess?: () => void;
  AIModels: IAIModel[];
  isLogin?: boolean;
  className?: string;
}

export function AIModelDropdown({ onSelectSuccess, AIModels, isLogin, className }: ModelDropdownProps) {
  const { selectedModel, setSelectedModel, selectedAgent } = useConversationStore();
  const tAI = useTranslations('aiAssistant');

  const handleSelect = (value: IAIModel) => {
    setSelectedModel(value);
    onSelectSuccess?.();
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (selectedModel) {
      return;
    }
    if (AIModels.length > 0) {
      const defaultModal =
        selectedAgent === 'ai_search'
          ? AIModels.find(model => model.is_available)
          : (AIModels.find(
              model =>
                model.is_available &&
                Object.entries(model.configs).filter(
                  ([key, value]) => value === true && AGENT_OPTIONS[key as keyof typeof AGENT_OPTIONS] === selectedAgent
                ).length > 0
            ) ?? (AIModels[0] as IAIModel));
      setSelectedModel(defaultModal);
    }
  }, [AIModels, selectedAgent]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (AIModels.length > 0) {
      const defaultModal = AIModels.find(model => model.is_available) ?? (AIModels[0] as IAIModel);
      setSelectedModel(defaultModal);
    }
  }, [isLogin]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            '!rounded-full relative w-[130px] justify-start gap-2 truncate border border-primary bg-background outline outline-4 outline-primary/5 md:w-[200px]',
            className
          )}
        >
          <div>
            <Image
              src={selectedModel?.thumbnail_url ?? Openedu.src}
              alt="selected-ai-model"
              aspectRatio="1:1"
              fill
              sizes="20px"
              objectFit="contain"
              className="h-4 w-4 rounded-full bg-background "
              containerHeight="auto"
            />
          </div>
          <p className="mr-4 truncate text-start">{selectedModel?.display_name ?? tAI('aiModel')}</p>
          <ChevronDown className="absolute right-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2 rounded-3xl p-2">
        {AIModels.map(model => (
          <DropdownMenuItem
            key={model.id}
            className={cn(
              'gap-2 rounded-full border',
              selectedModel?.id === model.id && 'border-primary',
              !model.is_available && 'cursor-not-allowed'
            )}
            disabled={!model.is_available}
            onSelect={() => handleSelect(model)}
          >
            <div>
              <Image
                src={model.thumbnail_url ?? Openedu.src}
                alt="ai-model"
                aspectRatio="1:1"
                fill
                sizes="20px"
                objectFit="contain"
                className="h-4 w-4 rounded-full bg-background "
                containerHeight="auto"
              />
            </div>
            <span className="flex-1">{model.display_name}</span>
            {selectedModel?.id === model.id && <Check className="h-4 w-4 text-blue-600" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
