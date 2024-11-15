import type { Editor } from '@tiptap/core';
import { type MenuItem, menuItemsMap } from './menu-items';

export interface SharedMenuProps {
  editor: Editor | null;
  className?: string;
  aiParams?: Record<string, string>;
  onAIApply?: () => void;
  menuItems?: MenuItem[];
  defaultMenuItems: MenuItem[];
}

export const useSharedMenu = ({ editor, menuItems = [], defaultMenuItems }: SharedMenuProps) => {
  if (!editor) {
    return { finalMenuItems: [], renderMenuItems: null };
  }

  const finalMenuItems = [...defaultMenuItems];

  for (const item of menuItems) {
    if (item.startsWith('-')) {
      const index = finalMenuItems.indexOf(item.slice(1) as MenuItem);
      if (index !== -1) {
        finalMenuItems.splice(index, 1);
      }
    } else if (!finalMenuItems.includes(item as MenuItem)) {
      finalMenuItems.push(item as MenuItem);
    }
  }

  const renderMenuItems = (aiParams?: Record<string, string>, onAIApply?: () => void) => (
    <>
      {finalMenuItems.map(item => {
        const MenuItemComponent = menuItemsMap[item as keyof typeof menuItemsMap];
        return MenuItemComponent ? (
          <MenuItemComponent key={item} editor={editor} aiParams={aiParams} onAIApply={onAIApply} />
        ) : null;
      })}
    </>
  );

  return { finalMenuItems, renderMenuItems };
};
