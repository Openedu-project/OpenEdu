import { createContext, useContext } from 'react';
import type { ISortableContextValue } from '../types';

export const SortableContainerContext = createContext<ISortableContextValue>({
  attributes: {},
  listeners: {},
  ref: null,
  isOverContainer: false,
});

export const SortableItemContext = createContext<ISortableContextValue>({
  attributes: {},
  listeners: {},
  ref: null,
  isOverContainer: false,
});

export const useSortableContainerContext = () => useContext(SortableContainerContext);
export const useSortableItemContext = () => useContext(SortableItemContext);
