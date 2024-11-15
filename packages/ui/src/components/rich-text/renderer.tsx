'use client';
import { EditorContent } from '@tiptap/react';
import { useEffect } from 'react';
import { useRichTextEditor } from './useRichTextEditor';

export function RichTextRenderer({ content }: { content: string }) {
  const editor = useRichTextEditor({
    content,
    editable: false,
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return <EditorContent editor={editor} />;
}
