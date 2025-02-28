'use client';
import { EditorContent } from '@tiptap/react';
import { type HTMLProps, useEffect } from 'react';
import { useRichTextEditor } from './useRichTextEditor';

interface RichTextRendererProps extends HTMLProps<HTMLDivElement> {
  content: string;
}

export function RichTextRenderer({ content, ...props }: RichTextRendererProps) {
  const editor = useRichTextEditor({
    content,
    editable: false,
    hasRichTextClass: false,
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return <EditorContent editor={editor} {...props} />;
}
