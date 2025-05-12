'use client';

import type { TAgentType } from '@oe/api';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Modal } from '#components/modal';
import { Button } from '#shadcn/button';
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area';
import { useConversationStore } from '#store/conversation-store';
import { PromptGrid } from './prompt-grid';

export function PromptPopup({
  categoryId,
  name,
  agent,
  checkExpandSide,
}: {
  categoryId?: string;
  name?: string;
  agent?: TAgentType;
  checkExpandSide?: boolean;
}) {
  const { selectedAgent } = useConversationStore();
  const tAI = useTranslations('aiAssistant');
  const tGeneral = useTranslations('general');
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="link"
        onClick={() => {
          setOpen(true);
        }}
      >
        {tGeneral('viewAll')}
      </Button>
      {open && (
        <Modal
          title={tAI('allPromptingWithName', { name: name ?? '' })}
          hasCancelButton={false}
          hasCloseIcon
          open={true}
          className="md:max-w-[80dvw] xl:max-w-[60dvw]"
          onClose={() => {
            setOpen(false);
          }}
        >
          <ScrollArea className="h-[70dvh]">
            <div className="h-full w-full px-2 pb-4">
              <PromptGrid
                categoryId={categoryId}
                agent={agent === 'ai_search' ? selectedAgent : agent}
                perPage={50}
                callbackFn={() => {
                  setOpen(false);
                }}
                checkExpandSide={checkExpandSide}
              />
            </div>
            <ScrollBar className="ml-4" />
          </ScrollArea>
        </Modal>
      )}
    </>
  );
}
