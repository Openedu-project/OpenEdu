'use client';
import Openedu from '@oe/assets/images/openedu.png';
import { Check, ChevronDown } from 'lucide-react';

import type { IAIModel } from '@oe/api/types/conversation';
import { useMemo } from 'react';
import { Image } from '#components/image';
import { Button } from '#shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '#shadcn/dropdown-menu';
import { cn } from '#utils/cn';
import { useConversationStore } from '../../_stores/conversation-store';

interface ModelDropdownProps {
  onSelectSuccess?: () => void;
  AIModels: IAIModel[];
}

export function AIModelDropdown({ onSelectSuccess, AIModels }: ModelDropdownProps) {
  const { selectedModel, setSelectedModel } = useConversationStore();

  const handleSelect = (value: IAIModel) => {
    setSelectedModel(value);
    onSelectSuccess?.();
  };

  const AIModel = useMemo(() => {
    if (selectedModel) {
      return selectedModel;
    }
    if (AIModels.length > 0) {
      const defaultModal = AIModels.find(model => model.is_available) ?? (AIModels[0] as IAIModel);
      setSelectedModel(defaultModal);
    }
  }, [selectedModel, AIModels, setSelectedModel]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="!rounded-full relative w-[200px] justify-start gap-2 truncate border-2 bg-white"
        >
          <div>
            <Image
              src={AIModel?.thumbnail_url ?? Openedu.src}
              alt="selected-ai-model"
              aspectRatio="1:1"
              fill
              sizes="20px"
              objectFit="contain"
              className="h-4 w-4 rounded-full bg-background "
              containerHeight="auto"
            />
          </div>
          <p className="mr-4 w-[150px] truncate text-start">{AIModel?.display_name ?? 'AI Assistant'}</p>
          <ChevronDown className="absolute right-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-[200px] flex-col gap-2">
        {AIModels.map(model => (
          <DropdownMenuItem
            key={model.id}
            className={cn(
              'gap-2 rounded-full border',
              AIModel?.id === model.id && 'border-primary',
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
            {AIModel?.id === model.id && <Check className="h-4 w-4 text-blue-600" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
