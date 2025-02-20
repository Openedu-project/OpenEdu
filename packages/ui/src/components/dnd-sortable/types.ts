import type { DndContextProps, DragEndEvent, DragOverEvent, DragOverlayProps, UniqueIdentifier } from '@dnd-kit/core';
import type { useSortable } from '@dnd-kit/sortable';
import type { Dispatch, HTMLAttributes, ReactNode, Ref, RefObject, SetStateAction } from 'react';
// import type { IDataConfig, ISortableDndRef } from '../sortable-dnd/types';
import type { DataAdapter } from './data-adapter';
// import type { DataAdapter } from '../sortable-dnd/utils/base-adapter';

export interface IDndSortableChildItem<ChildItemType> {
  id: UniqueIdentifier;
  original: ChildItemType;
}

export interface IDndSortableItem<ItemType, ChildItemType = ItemType> {
  id: UniqueIdentifier;
  original: ItemType;
  items?: IDndSortableChildItem<ChildItemType>[];
  parentId?: UniqueIdentifier;
  depth?: number;
  collapsed?: boolean;
}

export interface IDndSortableDataConfig<ItemType, ChildItemType> {
  idProp?: keyof ItemType;
  childrenProp?: keyof ItemType;
  idItemProp?: keyof ChildItemType;
  type: 'tree' | 'array' | 'multiple-container' | 'nested-array';
  direction?: 'vertical' | 'horizontal';
  itemDirection?: 'vertical' | 'horizontal';
  indent?: number;
  childDnDContextProps?: DndContextProps | boolean;
}

export interface IRenderChildItemProps<ChildItemType> {
  item: IDndSortableChildItem<ChildItemType>;
  onRemoveItem?: () => void;
  onUpdateItem?: (
    value: ChildItemType[keyof ChildItemType],
    key: keyof ChildItemType,
    item: IDndSortableChildItem<ChildItemType>
  ) => void;
  onUpdateItemWithNewItem?: (newItem: ChildItemType, currentItem: IDndSortableChildItem<ChildItemType>) => void;
}

export type RenderChildItemFunction<ChildItemType> = ({
  item,
  onRemoveItem,
  onUpdateItem,
  onUpdateItemWithNewItem,
}: IRenderChildItemProps<ChildItemType>) => ReactNode;

export interface IRenderItemProps<ItemType, ChildItemType> {
  items?: ItemType[];
  item: IDndSortableItem<ItemType, ChildItemType>;
  index?: number;
  descendants?: IDndSortableItem<ItemType, ChildItemType>[];
  dragOverlay?: boolean;
  onAddChild?: (defaultItem: ChildItemType) => void;
  onRemoveItem?: () => void;
  onUpdateItem?: (
    value: ItemType[keyof ItemType],
    key: keyof ItemType | keyof ChildItemType,
    item: IDndSortableItem<ItemType, ChildItemType> | IDndSortableChildItem<ChildItemType>
  ) => void;
  onUpdateItemWithNewItem?: (
    newItem: ItemType | ChildItemType,
    currentItem: IDndSortableItem<ItemType, ChildItemType> | IDndSortableChildItem<ChildItemType>
  ) => void;
}

export type RenderItemFunction<ItemType, ChildItemType> = ({
  item,
  index,
  descendants,
  dragOverlay,
  onAddChild,
  onRemoveItem,
  onUpdateItem,
}: IRenderItemProps<ItemType, ChildItemType>) => ReactNode;

export interface IDndSortableRef<ItemType, ChildItemType> {
  items: (ItemType | ChildItemType)[];
  addItem: (defaultItem: ItemType | ChildItemType) => void;
}

export interface IDndSortableProps<ItemType, ChildItemType> {
  data: ItemType[];
  dataConfig: IDndSortableDataConfig<ItemType, ChildItemType>;
  className?: string;
  renderConfig?: HTMLAttributes<HTMLDivElement> & {
    renderItem?: RenderItemFunction<ItemType, ChildItemType>;
    renderChildItem?: RenderChildItemFunction<ChildItemType>;
  };
  dndContextProps?: DndContextProps;
  dragOverlayProps?: DragOverlayProps;
  ref?: Ref<IDndSortableRef<ItemType, ChildItemType>>;
  loading?: boolean;
  onChange?: (items: ItemType[]) => void;
}

export type IDndSortableContextValue<ItemType, ChildItemType> = Partial<ReturnType<typeof useSortable>> & {
  isOverContainer?: boolean;
  items?: IDndSortableItem<ItemType, ChildItemType>[];
  activeItem?: IDndSortableItem<ItemType, ChildItemType>;
  descendants?: IDndSortableItem<ItemType, ChildItemType>[];
  toggleCollapse?: () => void;
};

export interface IDndSortableItemProps<ItemType, ChildItemType>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'content'> {
  id: UniqueIdentifier;
  children: ReactNode;
  item?: IDndSortableItem<ItemType, ChildItemType>;
  adapter?: DataAdapter<ItemType, ChildItemType>;
  descendants?: IDndSortableItem<ItemType, ChildItemType>[];
  toggleCollapse?: () => void;
  content?: ReactNode;
}

export interface IDndSortableChildItemProps<ChildItemType> extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  item: IDndSortableChildItem<ChildItemType>;
  dragOverlay?: boolean;
  children?: ReactNode;
}

export type IHandleDragOverProps<ItemType, ChildItemType> = Partial<DragOverEvent> & {
  items: IDndSortableItem<ItemType, ChildItemType>[];
  recentlyMovedToNewContainer: RefObject<boolean>;
};

export type IHandleDragEndProps<ItemType, ChildItemType> = Partial<DragEndEvent> & {
  items: IDndSortableItem<ItemType, ChildItemType>[];
  clonedItems: IDndSortableItem<ItemType, ChildItemType>[] | null;
  dataConfig: IDndSortableDataConfig<ItemType, ChildItemType>;
  // setContainers: Dispatch<SetStateAction<UniqueIdentifier[]>>;
  // setActiveId: Dispatch<SetStateAction<UniqueIdentifier | null>>;
  setItems: Dispatch<SetStateAction<IDndSortableItem<ItemType, ChildItemType>[]>>;
  onChange?: (items: ItemType[]) => void;
};

export type ICollisionDetectionStrategyProps<ItemType, ChildItemType> = {
  activeId: string | number | null;
  items: IDndSortableItem<ItemType, ChildItemType>[];
  lastOverId: RefObject<string | number | null>;
  recentlyMovedToNewContainer: RefObject<boolean>;
};

export type IToggleCollapseProps<ItemType, ChildItemType> = {
  activeItem: IDndSortableItem<ItemType, ChildItemType>;
  items: IDndSortableItem<ItemType, ChildItemType>[];
  clonedItems: IDndSortableItem<ItemType, ChildItemType>[] | null;
  setItems: (items: IDndSortableItem<ItemType, ChildItemType>[]) => void;
  // setContainers: (containers: UniqueIdentifier[]) => void;
};
