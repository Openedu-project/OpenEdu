'use client';
import { type Editor, EditorContent, type JSONContent } from '@tiptap/react';

// import './styles.css';

import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import { type Ref, useEffect, useImperativeHandle } from 'react';
import { BubbleMenu } from './components/bubble-menu';
import { FloatingMenu } from './components/floating-menu';
import { MenuBar } from './components/menu-bar';
import type { MenuItem } from './components/menu-items';
import { type TRichTextFont, fonts as defaultFonts } from './fonts';
import { useRichTextEditor } from './useRichTextEditor';

export interface RichTextEditorProps {
  defaultValue?: string;
  className?: string;
  menuBarClassName?: string;
  value?: string;
  onChange?: (value: string, json?: JSONContent) => void;
  ref?: Ref<RichTextEditorRef>;
  menuBarItems?: MenuItem[];
  bubbleMenuItems?: MenuItem[];
  floatingMenuItems?: MenuItem[];
  aiParams?: Record<string, string>;
  onAIApply?: () => void;
  aiButton?: boolean;
  placeholder?: string;
  maxHeight?: string;
  fonts?: TRichTextFont[];
}

export interface RichTextEditorRef {
  value: string;
  setValue: (value: string) => void;
}

export const RichTextEditor = ({
  defaultValue,
  className,
  menuBarClassName,
  value,
  menuBarItems,
  bubbleMenuItems,
  floatingMenuItems,
  aiParams,
  onAIApply,
  aiButton,
  onChange,
  placeholder,
  ref,
  maxHeight,
  fonts = defaultFonts,
}: RichTextEditorProps) => {
  const tRichText = useTranslations('richText');
  const editor = useRichTextEditor({
    content: defaultValue || value,
    placeholder: placeholder || tRichText('placeholder'),
    onUpdate: (editor: Editor) => {
      onChange?.(editor.getHTML(), editor.getJSON());
    },
    maxHeight,
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
      <MenuBar
        editor={editor}
        menuItems={menuBarItems}
        aiParams={aiParams}
        onAIApply={onAIApply}
        aiButton={aiButton}
        className={menuBarClassName}
        fonts={fonts}
      />
      <div className="relative z-50 grow overflow-hidden">
        <EditorContent editor={editor} className="scrollbar flex h-full min-h-40 overflow-auto [&>div]:grow" />
        <BubbleMenu
          editor={editor}
          menuItems={bubbleMenuItems}
          aiParams={aiParams}
          onAIApply={onAIApply}
          aiButton={aiButton}
          fonts={fonts}
        />
        <FloatingMenu
          editor={editor}
          menuItems={floatingMenuItems}
          aiParams={aiParams}
          onAIApply={onAIApply}
          fonts={fonts}
        />
      </div>
    </div>
  );
};
