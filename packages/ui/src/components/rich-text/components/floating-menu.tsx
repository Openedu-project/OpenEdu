import type { Editor } from '@tiptap/core';
import { FloatingMenu as TiptapFloatingMenu } from '@tiptap/react';
import type React from 'react';
import { cn } from '#utils/cn';
import type { MenuItem } from './menu-items';
import { useSharedMenu } from './useSharedMenu';

const defaultMenuItems: MenuItem[] = [
  'list',
  'listOrdered',
  'quote',
  'codeBlock',
  'taskList',
  'imagePopover',
  'videoPopover',
  'horizontalRule',
  'hardBreak',
  'table',
];

export const FloatingMenu: React.FC<{
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
    <TiptapFloatingMenu
      className={cn('flex w-44 flex-wrap gap-2 rounded-lg bg-background p-2 shadow-lg', className)}
      editor={editor}
      tippyOptions={{ duration: 100 }}
    >
      {renderMenuItems(aiParams, onAIApply)}
    </TiptapFloatingMenu>
  );
};
