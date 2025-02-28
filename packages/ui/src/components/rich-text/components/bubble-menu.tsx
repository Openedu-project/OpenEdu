import { cn } from '@oe/ui/utils/cn';
import type { Editor } from '@tiptap/core';
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react';
import type React from 'react';
import type { TRichTextFont } from '../fonts';
import type { MenuItem } from './menu-items';
import { useSharedMenu } from './useSharedMenu';

const defaultMenuItems: MenuItem[] = ['bold', 'italic', 'strikethrough', 'underline', 'textColor', 'linkPopover'];

export const BubbleMenu: React.FC<{
  editor: Editor | null;
  className?: string;
  aiParams?: Record<string, string>;
  onAIApply?: () => void;
  menuItems?: MenuItem[];
  aiButton?: boolean;
  fonts: TRichTextFont[];
}> = ({ editor, className, aiParams, onAIApply, menuItems = [], aiButton, fonts }) => {
  const defaultItems = aiButton ? ([...defaultMenuItems, 'aiRewrite'] as MenuItem[]) : defaultMenuItems;
  const { renderMenuItems } = useSharedMenu({
    editor,
    menuItems,
    defaultMenuItems: defaultItems,
  });

  if (!(editor && renderMenuItems)) {
    return null;
  }
  return (
    <TiptapBubbleMenu
      className={cn('flex items-center gap-2 rounded bg-background p-1 shadow-md', className)}
      editor={editor}
    >
      {renderMenuItems({
        aiParams,
        onAIApply,
        fonts,
      })}
    </TiptapBubbleMenu>
  );
};
