import { createContext, useContext } from 'react';
import type { SortableContextValue } from './types';

export const SortableItemContext = createContext<SortableContextValue>({
  attributes: {},
  listeners: {},
  ref: null,
  isDragging: false,
  isClone: false,
});

export const useSortableContext = () => useContext(SortableItemContext);
