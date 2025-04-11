'use client';
import { Check, Copy } from 'lucide-react';
import { type RefObject, useState } from 'react';
import { Button } from '#shadcn/button';

const CopyButton = ({
  disabled,
  initialMessage,
  contentRef,
}: {
  disabled?: boolean;
  initialMessage: string;
  contentRef: RefObject<HTMLDivElement | null>;
}) => {
  const [copied, setCopied] = useState(false);

  const copyRenderedContent = async () => {
    if (!contentRef.current) {
      return;
    }

    try {
      const htmlContent = contentRef.current.innerHTML;
      const plainText = contentRef.current.textContent ?? '';

      const clipboardItem = new ClipboardItem({
        'text/plain': new Blob([plainText], { type: 'text/plain' }),
        'text/html': new Blob([htmlContent], { type: 'text/html' }),
      });

      await navigator.clipboard.write([clipboardItem]);

      // Show success state
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback to basic text copying if rich copy fails
      try {
        await navigator.clipboard.writeText(initialMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
    }
  };

  return (
    <Button variant="ghost" size="icon" disabled={disabled} className="h-6 w-6 p-1" onClick={copyRenderedContent}>
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
};

export { CopyButton };
