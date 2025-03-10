import { cancelConversation } from '@oe/api/services/conversation';
import type { IMessage } from '@oe/api/types/conversation';
import type { z } from '@oe/api/utils/zod';
import LampCharge from '@oe/assets/icons/lamp-charge';
import Microphone from '@oe/assets/icons/microphone';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
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
  const { status, addMessage, resetGenMessage, genMessage } = useConversationStore();
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

  const disableButton = useMemo(
    () => !form.formState.isValid || loading || GENERATING_STATUS.includes(status ?? ''),
    [form, status, loading]
  );

  const deepResearch = AI_SIDEBAR('hsl(var(--foreground))', 16).find(agent => agent.lableKey === 'deepResearch');

  return (
    <div className="flex w-full flex-wrap justify-between gap-2">
      <div className="flex items-center gap-2">
        <InputFile />
        <Button variant="outline" className="!p-2 rounded-full" disabled>
          {deepResearch?.icon}
          <span className="mcaption-semibold12 ml-2 hidden md:inline-block">{tAI(deepResearch?.lableKey)}</span>
        </Button>
        <Button variant="outline" className="!p-2 rounded-full" disabled>
          <LampCharge />
          <span className="mcaption-semibold12 ml-2 hidden md:inline-block">{tAI('reasoning')}</span>
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
                fill="hsl(var(--primary-foreground))"
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
