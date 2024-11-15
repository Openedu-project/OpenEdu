'use client';
import { type Editor, EditorContent } from '@tiptap/react';

import './styles.css';

import { cn } from '@oe/ui/utils/cn';
import { type Ref, useEffect, useImperativeHandle } from 'react';
import { BubbleMenu } from './components/bubble-menu';
import { FloatingMenu } from './components/floating-menu';
import { MenuBar } from './components/menu-bar';
import type { MenuItem } from './components/menu-items';
import { useRichTextEditor } from './useRichTextEditor';

export interface RichTextEditorProps {
  defaultValue?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  ref?: Ref<RichTextEditorRef>;
  menuBarItems?: MenuItem[];
  bubbleMenuItems?: MenuItem[];
  floatingMenuItems?: MenuItem[];
  aiParams?: Record<string, string>;
  onAIApply?: () => void;
}

export interface RichTextEditorRef {
  value: string;
  setValue: (value: string) => void;
}

export const RichTextEditor = ({
  defaultValue,
  className,
  value,
  menuBarItems,
  bubbleMenuItems,
  floatingMenuItems,
  aiParams,
  onAIApply,
  onChange,
  ref,
}: RichTextEditorProps) => {
  const editor = useRichTextEditor({
    content: defaultValue || value,
    onUpdate: (editor: Editor) => {
      onChange?.(editor.getHTML());
    },
  });

  useImperativeHandle(ref, () => ({
    get value() {
      return editor?.getHTML() ?? '';
    },
    setValue: (value: string) => editor?.commands.setContent(value),
  }));

  useEffect(() => {
    if (value !== undefined && editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className={cn('flex flex-col overflow-hidden rounded-lg border', className)}>
      <MenuBar editor={editor} menuItems={menuBarItems} aiParams={aiParams} onAIApply={onAIApply} />
      <div className="relative z-10 grow overflow-hidden">
        <EditorContent editor={editor} className="scrollbar flex h-full min-h-40 overflow-auto [&>div]:grow" />
        <BubbleMenu editor={editor} menuItems={bubbleMenuItems} aiParams={aiParams} onAIApply={onAIApply} />
        <FloatingMenu editor={editor} menuItems={floatingMenuItems} aiParams={aiParams} onAIApply={onAIApply} />
      </div>
    </div>
  );
};
