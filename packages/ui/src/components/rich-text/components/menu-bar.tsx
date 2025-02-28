'use client';
import type { Editor } from '@tiptap/core';
import type React from 'react';
import { cn } from '#utils/cn';
import type { TRichTextFont } from '../fonts';
import type { MenuItem } from './menu-items';
import { useSharedMenu } from './useSharedMenu';

const defaultMenuItems: MenuItem[] = [
  'bold',
  'italic',
  'strikethrough',
  'underline',
  'codeBlock',
  'quote',
  'alignLeft',
  'alignCenter',
  'alignRight',
  'alignJustify',
  'list',
  'listOrdered',
  'taskList',
  'textColor',
  'highlight',
  'imagePopover',
  'videoPopover',
  'table',
  'linkPopover',
  'heading',
  'fontFamily',
  'fontSize',
  'undo',
  'redo',
];

export const MenuBar: React.FC<{
  editor: Editor | null;
  menuItems?: MenuItem[];
  className?: string;
  aiParams?: Record<string, string>;
  aiButton?: boolean;
  onAIApply?: () => void;
  fonts: TRichTextFont[];
}> = ({ editor, className, aiParams, onAIApply, menuItems = [], aiButton, fonts }) => {
  const defaultItems = aiButton ? ([...defaultMenuItems, 'aiGenerate'] as MenuItem[]) : defaultMenuItems;
  const { renderMenuItems } = useSharedMenu({
    editor,
    menuItems,
    defaultMenuItems: defaultItems,
  });

  if (!(editor && renderMenuItems)) {
    return null;
  }

  return (
    <div className={cn('flex flex-wrap gap-1 border-b bg-muted p-2', className)}>
      {renderMenuItems({
        aiParams,
        onAIApply,
        fonts,
      })}
    </div>
  );
};
