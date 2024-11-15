import type React from 'react';
import { useState } from 'react';

import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '#shadcn/button';

import { usePostAIBlog } from '@oe/api/hooks/useBlog';

import type { Editor } from '@tiptap/react';
import { InputURL } from '#components/input-url';
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';
import { AIModal } from './ai-modal';

export const AIGeneratePopover: React.FC<{
  editor: Editor;
  aiParams?: Record<string, string>;
}> = ({ editor, aiParams }) => {
  const t = useTranslations('richText.ai');
  const { postAIBlog, isLoading } = usePostAIBlog();
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleGenerateClick = async () => {
    setPopoverOpen(false);
    setModalOpen(true);
    await handleAIGenerate(url);
  };

  const handleAIGenerate = async (link: string) => {
    setResult('');

    try {
      const res = await postAIBlog({
        ...aiParams,
        ai_blog_request_type: 'rewrite_from_link',
        link,
      });

      setResult(res?.content ?? '');
    } catch (error) {
      return error;
    }
  };

  const handleApply = (htmlText: string) => {
    const { from } = editor.state.selection;

    editor.chain().focus().clearNodes().unsetAllMarks().run();
    editor.commands.blur();

    editor.commands.insertContent(htmlText, {
      parseOptions: {
        preserveWhitespace: false,
      },
    });

    editor.commands.setTextSelection({ from, to: from + result.length });
    editor.chain().focus();

    setModalOpen(false);
  };

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" type="button" className="h-8 gap-2" title={t('generateButton')}>
            <Sparkles className="h-4 w-4" />
            {t('generateButton')}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <InputURL multiple={false} value={url} onChange={e => setUrl(e.target.value)} />
          <div className="mt-spacing-xs flex justify-end gap-spacing-xs">
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
        loading={isLoading}
        onConfirm={handleApply}
        onRewrite={() => handleAIGenerate(url)}
        text={result}
      />
    </>
  );
};
