import type {
  DndContextProps,
  DragOverlayProps,
  DraggableAttributes,
  DraggableSyntheticListeners,
} from '@dnd-kit/core';
import type { CSSProperties } from 'react';
import type { ReactNode } from 'react';
import type { DataAdapter } from './utils';

export interface IDndSortableBaseItem {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
}

export interface SortableContextValue {
  attributes: Partial<DraggableAttributes>;
  listeners: Partial<DraggableSyntheticListeners>;
  ref: ((node: HTMLElement | null) => void) | null;
  isDragging: boolean;
  isClone: boolean;
}

export interface IDndSortableDataAdapterConfig<T extends IDndSortableBaseItem> {
  idPath?: keyof T | ((item: T) => string | number);
  childrenPath?: keyof T;
  type?: 'tree' | 'array' | 'nested-array' | 'custom';
  indent?: number;
  getChildren?: (item: T) => T[];
  setChildren?: (item: T, children: T[]) => T;
  normalize?: (items: T[], depth?: number) => IDndSortableNormalizedItem<T>[];
  denormalize?: (items: IDndSortableNormalizedItem<T>[]) => T[];
  updateItems?: (
    items: IDndSortableNormalizedItem<T>[],
    activeId: string | number,
    overId: string | number
  ) => IDndSortableNormalizedItem<T>[];
}

export interface IDndSortableNormalizedItem<T extends IDndSortableBaseItem> extends IDndSortableBaseItem {
  depth: number;
  type?: 'group';
  items?: IDndSortableNormalizedItem<T>[];
  originalData: T;
  parentId?: string | number | null;
  index?: number;
}

export interface IDndSortableDragHandleProps {
  children?: ReactNode;
  className?: string;
}

export interface IDndSortableItemProps<T extends IDndSortableBaseItem> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  isClone?: boolean;
  depth?: number;
  data: T;
  adapter: DataAdapter<T>;
}

export interface IDndSortableContainerProps<T extends IDndSortableBaseItem> {
  items: IDndSortableNormalizedItem<T>[];
  direction?: 'vertical' | 'horizontal';
  renderItem: ({
    item,
    isClone,
    adapter,
    depth,
  }: {
    item: IDndSortableNormalizedItem<T>;
    isClone: boolean;
    adapter: DataAdapter<T>;
    depth: number;
  }) => ReactNode;
  className?: string;
  adapter: DataAdapter<T>;
}

export interface IDndSortableProps<T extends IDndSortableBaseItem> extends DndContextProps {
  items: T[];
  onSort: (items: T[]) => void;
  renderItem: ({
    item,
    isClone,
    adapter,
    depth,
  }: { item: IDndSortableNormalizedItem<T>; isClone: boolean; adapter: DataAdapter<T>; depth: number }) => ReactNode;
  className?: string;
  containerProps?: IDndSortableContainerProps<T>;
  dragOverlayProps?: DragOverlayProps;
  dataConfig?: IDndSortableDataAdapterConfig<T>;
  useDragOverlay?: boolean;
}
