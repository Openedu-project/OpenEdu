import { cn } from '@oe/ui/utils/cn';
import type { Editor } from '@tiptap/core';
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react';
import type React from 'react';
import type { MenuItem } from './menu-items';
import { useSharedMenu } from './useSharedMenu';

const defaultMenuItems: MenuItem[] = ['bold', 'italic', 'strikethrough', 'underline', 'textColor', 'linkPopover'];

export const BubbleMenu: React.FC<{
  editor: Editor | null;
  className?: string;
  aiParams?: Record<string, string>;
  onAIApply?: () => void;
  menuItems?: MenuItem[];
}> = ({ editor, className, aiParams, onAIApply, menuItems = [] }) => {
  const { renderMenuItems } = useSharedMenu({ editor, menuItems, defaultMenuItems });

  if (!(editor && renderMenuItems)) {
    return null;
  }
  return (
    <TiptapBubbleMenu
      className={cn('flex items-center gap-2 rounded bg-background p-1 shadow-md', className)}
      editor={editor}
    >
      {renderMenuItems(aiParams, onAIApply)}
    </TiptapBubbleMenu>
  );
};
