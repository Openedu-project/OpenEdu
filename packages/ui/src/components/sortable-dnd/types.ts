import type {
  DndContextProps,
  DragEndEvent,
  DragOverEvent,
  DragOverlayProps,
  DraggableAttributes,
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from '@dnd-kit/core';
import type { Dispatch, HTMLAttributes, ReactNode, RefObject, SetStateAction } from 'react';
import type { DataAdapter } from './utils/base-adapter';

export interface ISortableItem<T> {
  id: UniqueIdentifier;
  original: T;
}

export interface IContainerItem<T, K> {
  id: UniqueIdentifier;
  original: T;
  items?: ISortableItem<K>[];
  parentId?: UniqueIdentifier;
  depth?: number;
  index?: number;
}

export interface IDataConfig<T, K> {
  idProp?: keyof T;
  childrenProp?: keyof T;
  idItemProp?: keyof K;
  type: 'tree' | 'array' | 'multiple-container' | 'nested-array';
  direction?: 'vertical' | 'horizontal';
  itemDirection?: 'vertical' | 'horizontal';
  indent?: number;
  childDnDContextProps?: DndContextProps | boolean;
}

export type RenderChildItemFunction<T> = ({
  item,
}: {
  item: ISortableItem<T>;
}) => ReactNode;

export type RenderItemFunction<T, K> = ({
  item,
  count,
}: {
  item: IContainerItem<T, K>;
  count?: number;
}) => ReactNode;

export interface IMultipleSortableProps<T, K> {
  data: T[];
  dataConfig: IDataConfig<T, K>;
  className?: string;
  renderConfig?: HTMLAttributes<HTMLDivElement> & {
    renderItem?: RenderItemFunction<T, K>;
    renderChildItem?: RenderChildItemFunction<K>;
  };
  dndContextProps?: DndContextProps;
  dragOverlayProps?: DragOverlayProps;
  onSort: (items: T[]) => void;
}

export type ISortableContextValue = {
  attributes: Partial<DraggableAttributes>;
  listeners: Partial<DraggableSyntheticListeners>;
  isOverContainer?: boolean;
  ref: ((node: HTMLElement | null) => void) | null;
};

export interface IContainerProps<T, K> extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  id: UniqueIdentifier;
  children: ReactNode;
  item?: IContainerItem<T, K>;
  adapter?: DataAdapter<T, K>;
  count?: number;
  renderItem?: RenderItemFunction<T, K>;
  ref?: ((node: HTMLElement | null) => void) | null;
}

export interface ISortableItemProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  item: ISortableItem<T>;
  dragOverlay?: boolean;
  renderChildItem?: RenderChildItemFunction<T>;
}

export type IHandleDragOverProps<T, K> = Partial<DragOverEvent> & {
  items: IContainerItem<T, K>[];
  recentlyMovedToNewContainer: RefObject<boolean>;
};

export type IHandleDragEndProps<T, K> = Partial<DragEndEvent> & {
  items: IContainerItem<T, K>[];
  clonedItems: IContainerItem<T, K>[] | null;
  dataConfig: IDataConfig<T, K>;
  setContainers: Dispatch<SetStateAction<UniqueIdentifier[]>>;
  setActiveId: Dispatch<SetStateAction<UniqueIdentifier | null>>;
  setItems: Dispatch<SetStateAction<IContainerItem<T, K>[]>>;
  onSort: (items: T[]) => void;
};

export type ICollisionDetectionStrategyProps<T, K> = {
  activeId: string | number | null;
  items: IContainerItem<T, K>[];
  lastOverId: RefObject<string | number | null>;
  recentlyMovedToNewContainer: RefObject<boolean>;
};
