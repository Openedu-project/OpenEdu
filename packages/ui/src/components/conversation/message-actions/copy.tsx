import type { IMessage } from '@oe/api/types/conversation';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Button } from '#shadcn/button';

const CopyButton = ({
  disabled,
  message,
  initialMessage,
}: {
  disabled?: boolean;
  message: IMessage;
  initialMessage: string;
}) => {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={disabled}
      className="h-6 w-6 p-1"
      onClick={() => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const contentToCopy = `${initialMessage}${
          message.sources && message.sources.length > 0
            ? `\n\nCitations:\n${message.sources?.map((source, i) => `[${i + 1}] ${source.metadata.url}`).join('\n')}`
            : ''
        }`;

        void navigator.clipboard.writeText(contentToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
};

export default CopyButton;
