import type { UniqueIdentifier } from '@dnd-kit/core';
import type { FlattenedItem } from '../sortable-tree/types';

export function getParentIds(flattenedItems: FlattenedItem[], itemId: UniqueIdentifier): UniqueIdentifier[] {
  const parents: UniqueIdentifier[] = [];
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

export function getDescendantIds(flattenedItems: FlattenedItem[], itemId: UniqueIdentifier): UniqueIdentifier[] {
  const descendants: UniqueIdentifier[] = [];
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
