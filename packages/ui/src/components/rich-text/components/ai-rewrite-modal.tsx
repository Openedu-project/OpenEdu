import { usePostAIBlog } from '@oe/api/hooks/useBlog';
import { type Editor, getHTMLFromFragment } from '@tiptap/core';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useState } from 'react';
import { Button } from '#shadcn/button';
import { AIModal } from './ai-modal';

export const AIRewriteModal: React.FC<{
  editor: Editor;
  aiParams?: Record<string, string>;
  handleAIApply?: () => void;
}> = ({ editor, aiParams, handleAIApply }) => {
  const t = useTranslations('richText.ai');
  const { postAIBlog, isLoading } = usePostAIBlog();
  const [result, setResult] = useState('');

  const onOpenAIResult = async () => {
    await handleAIRewrite();
  };

  const handleAIRewrite = async () => {
    setResult('');
    let selectionContainsText = '';

    editor
      .chain()
      .focus()
      .command(({ tr }) => {
        selectionContainsText = getHTMLFromFragment(
          tr.doc.slice(tr.selection.from, tr.selection.to).content,
          editor.schema
        );
        return true;
      })
      .run();

    try {
      const res = await postAIBlog({
        ...aiParams,
        ai_blog_request_type: 'rewrite_blog',
        text: selectionContainsText,
      });

      setResult(res?.content);
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

    editor.commands.setTextSelection({ from, to: from + result.length + 2 });
    editor.chain().focus();

    handleAIApply?.();
  };

  return (
    <>
      <Button type="button" variant="secondary" onClick={onOpenAIResult}>
        {t('rewriteButton')}
      </Button>

      <AIModal loading={isLoading} open={false} onConfirm={handleApply} onRewrite={handleAIRewrite} text={result} />
    </>
  );
};
