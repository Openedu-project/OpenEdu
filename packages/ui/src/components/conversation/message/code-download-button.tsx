'use client';
import { Check, Files } from 'lucide-react';
import { type MouseEvent, memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '#shadcn/button';
import { useConversationStore } from '#store/conversation-store';

export const CodeDownloadHydration = memo(() => {
  const { messages } = useConversationStore();

  const [buttonData, setButtonData] = useState<{ code: string; element: HTMLElement }[]>([]);

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }
    const wrappers = document?.getElementsByClassName('code-title-wrapper');

    const previewsData = Array.from(wrappers).map(wrapper => {
      const codeData = wrapper.getAttribute('data-code');
      return {
        code: decodeURIComponent(codeData ?? ''),
        element: wrapper as HTMLElement,
      };
    });
    setButtonData(previewsData);
  }, [messages]);

  const handleDownload = (e: MouseEvent<HTMLButtonElement>, code: string) => {
    e.preventDefault();
    const button = e.currentTarget;
    navigator.clipboard.writeText(code).then(() => {
      button.dataset.active = 'true';
      setTimeout(() => {
        button.dataset.active = 'false';
      }, 2000);
    });
  };

  return (
    <>
      {buttonData.map(({ code, element }) => {
        if (!code) {
          return null;
        }
        return createPortal(
          <Button
            variant="outline"
            className="group h-auto rounded-md bg-background/50 bg-transparent px-2 text-background hover:bg-background/70"
            data-active="false"
            onClick={e => handleDownload(e, code)}
          >
            <Check className="hidden h-4 w-4 group-data-[active=true]:block" />

            <Files className="hidden h-4 w-4 group-data-[active=false]:block" />
          </Button>,
          element
        );
      })}
    </>
  );
});
