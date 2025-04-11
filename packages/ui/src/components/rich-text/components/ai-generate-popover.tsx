import type React from 'react';
import { useState } from 'react';

import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '#shadcn/button';

import { usePostAIBlog } from '@oe/api';

import type { Editor } from '@tiptap/react';
import { URLGenerator, defaultURLValue } from '#components/url-generator';
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';
import { AIModal, type IAIStatus } from './ai-modal';

export const AIGeneratePopover: React.FC<{
  editor: Editor;
  aiParams?: Record<string, string>;
}> = ({ editor, aiParams }) => {
  const t = useTranslations('richText.ai');
  const { postAIBlog } = usePostAIBlog();
  const [value, setValue] = useState(defaultURLValue);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<IAIStatus>();
  const [rewriteId, setRewriteId] = useState<string>('');

  const handleOpenChange = (value: boolean) => {
    setPopoverOpen(value);
    setValue(defaultURLValue);
  };

  const handleGenerateClick = async () => {
    setPopoverOpen(false);
    setModalOpen(true);
    await handleAIGenerate();
  };

  const handleAIGenerate = async () => {
    try {
      setRewriteId('');
      setStatus(undefined);

      const res = await postAIBlog({
        ...aiParams,
        ai_blog_request_type: 'rewrite_from_link',
        link: value.urls,
        language: value.locale,
        tone: value.tone,
      });

      setRewriteId(res.rewrite_id);
      setStatus(res.status as IAIStatus);
    } catch (error) {
      setStatus('failed');
      return error;
    }
  };

  const handleApply = (htmlText: string) => {
    const { from } = editor.state.selection;

    editor.commands.insertContent(htmlText, {
      parseOptions: {
        preserveWhitespace: false,
      },
    });

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;
    const contentLength = tempDiv.textContent?.length || 0;
    setTimeout(() => {
      editor.commands.setTextSelection({
        from,
        to: from + contentLength + htmlText.split('\n').length - 1,
      });
      editor.chain().focus();
    });

    setModalOpen(false);
  };

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button variant="secondary" type="button" className="h-8 gap-2" title={t('generateButton')}>
            <Sparkles className="h-4 w-4" />
            {t('generateButton')}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <URLGenerator multiple={false} value={value} onChange={setValue} />
          <div className="mt-2 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setPopoverOpen(false)}>
              {t('cancel')}
            </Button>
            <Button variant="default" onClick={handleGenerateClick}>
              {t('generate')}
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <AIModal
        open={isModalOpen}
        status={status}
        onClose={() => setModalOpen(false)}
        onConfirm={handleApply}
        onRewrite={handleAIGenerate}
        rewriteId={rewriteId}
      />
    </>
  );
};
