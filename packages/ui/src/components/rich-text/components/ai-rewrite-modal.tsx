import { usePostAIBlog } from '@oe/api/hooks/useBlog';
import { type Editor, getHTMLFromFragment } from '@tiptap/core';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useState } from 'react';
import { Button } from '#shadcn/button';
import { AIModal, type IAIStatus } from './ai-modal';

export const AIRewriteModal: React.FC<{
  editor: Editor;
  aiParams?: Record<string, string>;
  handleAIApply?: () => void;
}> = ({ editor, aiParams, handleAIApply }) => {
  const t = useTranslations('richText.ai');
  const { postAIBlog } = usePostAIBlog();
  const [rewriteId, setRewriteId] = useState<string>('');
  const [status, setStatus] = useState<IAIStatus>();
  const [isModalOpen, setModalOpen] = useState(false);

  const onOpenAIResult = async () => {
    setModalOpen(true);
    await handleAIRewrite();
  };

  const handleAIRewrite = async () => {
    setRewriteId('');
    setStatus(undefined);
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
        ai_blog_request_type: 'rewrite_paragraph',
        text: selectionContainsText,
      });
      setRewriteId(res.rewrite_id);
      setStatus((res.status ?? 'generating') as IAIStatus);
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

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;
    const contentLength = tempDiv.textContent?.length || 0;
    editor.commands.setTextSelection({ from, to: from + contentLength + htmlText.split('\n').length - 1 });
    editor.chain().focus();

    handleAIApply?.();
    setModalOpen(false);
  };

  return (
    <>
      <Button type="button" variant="secondary" onClick={onOpenAIResult}>
        {t('rewriteButton')}
      </Button>
      <AIModal
        open={isModalOpen}
        status={status}
        onClose={() => setModalOpen(false)}
        onConfirm={handleApply}
        onRewrite={handleAIRewrite}
        rewriteId={rewriteId}
      />
    </>
  );
};
