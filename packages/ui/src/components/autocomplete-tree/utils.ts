import type { FlattenedItem, TreeItem } from './types';

function flatten(items: TreeItem[], parentId: number | string | null = null, depth = 0): FlattenedItem[] {
  return (
    items?.flatMap((item, index) => [
      { ...item, parentId, depth, index },
      ...flatten(item?.children ?? [], item.id, depth + 1),
    ]) ?? []
  );
}

export function flattenTree(items: TreeItem[]): FlattenedItem[] {
  return flatten(items);
}

export function getParentIds(flattenedItems: FlattenedItem[], itemId: number | string): (number | string)[] {
  const parents: (number | string)[] = [];
  let currentItem = flattenedItems.find(item => item.id === itemId);

  while (currentItem?.parentId) {
    const parent = flattenedItems.find(item => item.id === currentItem?.parentId);
    if (parent) {
      parents.push(parent.id);
      currentItem = parent;
    } else {
      break;
    }
  }

  return parents;
}

export function getDescendantIds(flattenedItems: FlattenedItem[], itemId: number | string): (number | string)[] {
  const descendants: (number | string)[] = [];
  const stack = [flattenedItems.find(item => item.id === itemId)];

  while (stack.length > 0) {
    const currentItem = stack.pop();

    if (currentItem && currentItem.id !== itemId) {
      descendants.push(currentItem.id);
    }
    const children = flattenedItems.filter(i => i.parentId === currentItem?.id);
    stack.push(...children);
  }

  return descendants;
}
