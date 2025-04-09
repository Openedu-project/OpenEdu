'use client';
import { Check, Files } from 'lucide-react';
import { type MouseEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '#shadcn/button';

export const CodeDownloadHydration = ({ id }: { id: string }) => {
  const [copied, setCopied] = useState(false);
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
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
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
            className="h-auto rounded-md bg-background/50 bg-transparent px-2 text-background hover:bg-background/70"
            onClick={e => handleDownload(e, code)}
          >
            {copied ? <Check className="h-4 w-4" /> : <Files className="h-4 w-4" />}
          </Button>,
          element
        );
      })}
    </>
  );
};
