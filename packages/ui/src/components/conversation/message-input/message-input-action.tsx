import { cancelConversation } from '@oe/api';
import type { z } from '@oe/api';
import type { IMessage } from '@oe/api';
import { LampCharge, Microphone } from '@oe/assets';
import { GENERATING_STATUS } from '@oe/core';
import { LoaderCircle, MoveRight, Pause } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { usePathname } from '#common/navigation';
import { Button } from '#shadcn/button';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { AI_SIDEBAR } from '../constants';
import type { chatSchema } from '../utils';
import { InputFile } from './input-file';

export function MessageInputAction({
  form,
  loading,
}: {
  loading?: boolean;
  form: UseFormReturn<z.infer<typeof chatSchema>>;
}) {
  const pathname = usePathname();
  const tAI = useTranslations('aiAssistant');
  const { status, addMessage, resetGenMessage, genMessage, thinking, setThinking, selectedModel } =
    useConversationStore();
  const [cancelLoading, setCancelLoading] = useState(false);
  const genMessageRef = useRef<IMessage>(undefined);

  useEffect(() => {
    genMessageRef.current = genMessage;
    if (!genMessage) {
      setCancelLoading(false);
    }
  }, [genMessage]);

  const handleCancel = async () => {
    const id = pathname.split('/').pop();
    if (id) {
      setCancelLoading(true);
      await cancelConversation(undefined, id);
    }

    const messageHandler = setInterval(() => {
      const currentGenMessage = genMessageRef.current;

      if (!currentGenMessage) {
        clearInterval(messageHandler);
        return;
      }
      const statusIncluded = GENERATING_STATUS.includes(currentGenMessage?.status ?? '');

      if (!statusIncluded) {
        addMessage(currentGenMessage, resetGenMessage);
        setCancelLoading(false);
        clearInterval(messageHandler);
      }
    }, 500);

    return () => {
      clearInterval(messageHandler);
    };
  };

  const disableButton = useMemo(() => {
    return !form.formState.isValid || loading || GENERATING_STATUS.includes(status ?? '');
  }, [form, status, loading]);

  const deepResearch = AI_SIDEBAR('var(--foreground)', 16).find(agent => agent.lableKey === 'deepResearch');

  return (
    <div className="mt-2 flex w-full flex-wrap justify-between gap-2">
      <div className="flex items-center gap-2">
        <InputFile />
        <Button variant="outline" className="!p-2 h-auto rounded-full" disabled>
          {deepResearch?.icon}
          <span className="mcaption-semibold12 ml-1 hidden md:inline-block">
            {tAI(deepResearch?.lableKey as string)}
          </span>
        </Button>
        <Button
          variant="outline"
          className={cn(
            '!p-2 h-auto rounded-full',
            thinking && 'border-primary bg-primary/5 text-primary hover:text-primary'
          )}
          disabled={!selectedModel?.configs?.extended_thinking_enabled}
          onClick={() => {
            setThinking(!thinking);
          }}
        >
          <LampCharge color={`var(${thinking ? '--primary' : '--foreground'})`} />
          <span className="mcaption-semibold12 ml-1 hidden md:inline-block">{tAI('thinking')}</span>
        </Button>
      </div>
      <div className="flex gap-2">
        <Button size="icon" variant="outline" disabled className="rounded-full">
          <Microphone />
        </Button>
        {GENERATING_STATUS.includes(status ?? '') ? (
          <Button
            type="button"
            size="icon"
            className={cn('group/btn rounded-full')}
            onClick={handleCancel}
            disabled={cancelLoading}
          >
            {cancelLoading ? (
              <LoaderCircle className="animate-spin text-primary-foreground" />
            ) : (
              <Pause
                fill="var(--primary-foreground)"
                className="h-6 w-6 text-primary group-hover/btn:text-primary-foreground"
              />
            )}
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon"
            disabled={disableButton}
            loading={loading}
            className={cn(
              'group/btn rounded-full bg-primary',
              GENERATING_STATUS.includes(status ?? '') && 'cursor-not-allowed opacity-50'
            )}
            aria-label="Send message"
          >
            <MoveRight strokeWidth={3} className="h-6 w-6 text-primary-foreground" />
          </Button>
        )}
      </div>
    </div>
  );
}
