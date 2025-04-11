'use client';
import { createContext, useContext } from 'react';
import type { IDndSortableContextValue } from './types';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const DndSortableItemContext = createContext<IDndSortableContextValue<any, any>>({
  attributes: undefined,
  listeners: undefined,
  setNodeRef: undefined,
  isOverContainer: false,
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const DndSortableChildItemContext = createContext<IDndSortableContextValue<any, any>>({
  attributes: undefined,
  listeners: undefined,
  setNodeRef: undefined,
  isOverContainer: false,
});

export const useDndSortableItemContext = <ItemType, ChildItemType>() =>
  useContext(DndSortableItemContext) as IDndSortableContextValue<ItemType, ChildItemType>;
export const useDndSortableChildItemContext = <ItemType, ChildItemType>() =>
  useContext(DndSortableChildItemContext) as IDndSortableContextValue<ItemType, ChildItemType>;
