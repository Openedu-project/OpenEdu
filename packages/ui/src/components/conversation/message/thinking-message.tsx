'use client';
import { marked } from 'marked';
import { useTranslations } from 'next-intl';
import { memo, useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#shadcn/accordion';

function PureThinkingMessage({
  thinking,
  isGenerating,
}: {
  thinking: string;
  isGenerating?: boolean;
}) {
  const tAI = useTranslations('aiAssistant');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (isGenerating) {
      setValue('thinking');
    } else {
      setValue('');
    }
  }, [isGenerating]);

  return (
    <Accordion type="single" collapsible className="rounded-3xl border" value={value} onValueChange={setValue}>
      <AccordionItem value="thinking" className="border-0">
        <AccordionTrigger headerClassName="m-0" className="mcaption-bold14 p-4">
          {tAI('thinking')} {isGenerating && '...'}
        </AccordionTrigger>
        <AccordionContent className="mcaption-regular14 p-4 pt-0 text-neutral-500">
          <div
            className="rich-text !m-0"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{ __html: marked.parse(thinking) }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export const ThinkingMessage = memo(PureThinkingMessage, (prevProps, nextProps) => {
  if (prevProps.thinking !== nextProps.thinking || prevProps.isGenerating !== nextProps.isGenerating) {
    return false;
  }
  return true;
});
