'use client';
import { Check, Files } from 'lucide-react';
import { type MouseEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '#shadcn/button';

export const CodeDownloadHydration = ({ id }: { id: string }) => {
  const [buttonData, setButtonData] = useState<{ code: string; element: HTMLElement }[]>([]);

  useEffect(() => {
    const container = document?.getElementById(id);

    if (!container) {
      return;
    }
    const wrappers = container?.getElementsByClassName('code-title-wrapper');

    const previewsData = Array.from(wrappers).map(wrapper => {
      const codeData = wrapper.getAttribute('data-code');
      return {
        code: decodeURIComponent(codeData ?? ''),
        element: wrapper as HTMLElement,
      };
    });
    setButtonData(previewsData);
  }, [id]);

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
};
