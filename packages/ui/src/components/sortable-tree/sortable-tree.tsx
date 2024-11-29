'use client';

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  closestCenter,
  defaultDropAnimation,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

import type {
  Announcements,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  DropAnimation,
  // Modifier,
  UniqueIdentifier,
} from '@dnd-kit/core';
import type { FlattenedItem, SensorContext, TreeItem, TreeItems } from './types';

import { useTranslations } from 'next-intl';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { sortableTreeKeyboardCoordinates } from './keyboard-coordinates';
import { SortableTreeItem } from './sortable-tree-item';
import {
  buildTree,
  flattenTree,
  getProjection,
  removeChildrenOf,
  removeItem,
  setProperty,
  updateTree,
} from './utilities';

const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const dropAnimationConfig: DropAnimation = {
  keyframes({ transform }) {
    return [
      { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
      {
        opacity: 0,
        transform: CSS.Transform.toString({
          ...transform.final,
          x: transform.final.x + 5,
          y: transform.final.y + 5,
        }),
      },
    ];
  },
  easing: 'ease-out',
  sideEffects({ active }) {
    active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: defaultDropAnimation.duration,
      easing: defaultDropAnimation.easing,
    });
  },
};

export interface ITreeProps {
  collapsible?: boolean;
  items?: TreeItems;
  indentationWidth?: number;
  indicator?: boolean;
  addable?: boolean;
  editable?: boolean;
  removable?: boolean;
  dragable?: boolean;
  checkable?: boolean;
  searchable?: boolean;
  addParentButtonLabel?: string;
  newParentDefaultLabel?: string;
  newItemDefaultLabel?: string;
  saveButtonLabel?: string;
  selectedId?: string;
  deleteModalTitle?: string;
  deleteModalDescription?: string;
  onChange?: (items: TreeItems) => void;
  onSave?: (items: TreeItems) => Promise<void>;
  onDelete?: (id: UniqueIdentifier) => Promise<void>;
  onSelect?: (item: TreeItem) => void;
  renderItem?: (item: TreeItem) => ReactNode;
}

export function SortableTree({
  collapsible,
  items = [],
  indicator = false,
  indentationWidth = 20,
  addable,
  editable,
  removable,
  dragable,
  checkable,
  searchable,
  newParentDefaultLabel = 'New Parent',
  newItemDefaultLabel = 'New Item',
  addParentButtonLabel,
  saveButtonLabel,
  deleteModalTitle,
  deleteModalDescription,
  selectedId,
  onChange,
  onSave,
  onDelete,
  onSelect,
  renderItem,
}: ITreeProps) {
  const tGeneral = useTranslations('general');
  const tErrors = useTranslations('errors');
  const id = useId();
  const [editingId, setEditingId] = useState<UniqueIdentifier | null>(null);
  const [invalidInputs, setInvalidInputs] = useState<Set<UniqueIdentifier>>(new Set());
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState<{
    parentId: UniqueIdentifier | null;
    overId: UniqueIdentifier;
  } | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<UniqueIdentifier>>(new Set());
  const [searchValue, setSearchValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const filteredItems = useMemo(() => {
    if (!searchValue.trim()) {
      return items;
    }

    const filterTreeItems = (items: TreeItems): TreeItems => {
      return items.reduce((acc, item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchValue.toLowerCase());
        let filteredChildren: TreeItems = [];

        if (item.children) {
          filteredChildren = filterTreeItems(item.children);
        }

        if (matchesSearch || filteredChildren.length > 0) {
          acc.push({
            ...item,
            children: filteredChildren,
            collapsed: false,
          });
        }

        return acc;
      }, [] as TreeItems);
    };

    return filterTreeItems(items);
  }, [items, searchValue]);

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(filteredItems);
    const collapsedItems = flattenedTree
      .filter(({ children, collapsed }) => collapsed && (children?.length ?? 0) > 0)
      .map(({ id }) => id);

    return removeChildrenOf(flattenedTree, activeId ? [activeId, ...collapsedItems] : collapsedItems);
  }, [activeId, filteredItems]);

  const projected =
    activeId && overId ? getProjection(flattenedItems, activeId, overId, offsetLeft, indentationWidth) : null;
  const sensorContext: SensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft,
  });
  const [coordinateGetter] = useState(() =>
    sortableTreeKeyboardCoordinates(sensorContext, indicator, indentationWidth)
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  );

  const sortedIds = useMemo(() => flattenedItems.map(({ id }) => id), [flattenedItems]);
  const activeItem = activeId ? flattenedItems.find(({ id }) => id === activeId) : null;
  const isSaveDisabled = useMemo(() => {
    if (invalidInputs.size > 0) {
      return true;
    }
    if (checkable && selectedItems.size === 0) {
      return true;
    }
    if (items.length === 0) {
      return true;
    }
    return false;
  }, [invalidInputs, checkable, selectedItems, items]);

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft,
    };
  }, [flattenedItems, offsetLeft]);

  const announcements: Announcements = {
    onDragStart({ active }) {
      return `Picked up ${active.id}.`;
    },
    onDragMove({ active, over }) {
      return getMovementAnnouncement('onDragMove', active.id, over?.id);
    },
    onDragOver({ active, over }) {
      return getMovementAnnouncement('onDragOver', active.id, over?.id);
    },
    onDragEnd({ active, over }) {
      return getMovementAnnouncement('onDragEnd', active.id, over?.id);
    },
    onDragCancel({ active }) {
      return `Moving was cancelled. ${active.id} was dropped in its original position.`;
    },
  };

  const handleDragStart = ({ active: { id: activeId } }: DragStartEvent) => {
    setActiveId(activeId);
    setOverId(activeId);

    const activeItem = flattenedItems.find(({ id }) => id === activeId);

    if (activeItem) {
      setCurrentPosition({
        parentId: activeItem.parentId,
        overId: activeId,
      });
    }

    document.body.style.setProperty('cursor', 'grabbing');
  };

  const handleDragMove = ({ delta }: DragMoveEvent) => {
    setOffsetLeft(delta.x);
  };

  const handleDragOver = ({ over }: DragOverEvent) => {
    setOverId(over?.id ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    resetState();

    if (projected && over) {
      const { depth, parentId } = projected;
      const clonedItems: FlattenedItem[] = JSON.parse(JSON.stringify(flattenTree(items)));
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];

      if (activeTreeItem) {
        clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };
      }

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
      const newItems = buildTree(sortedItems);

      if (newItems) {
        onChange?.(newItems);
      }
    }
  };

  const handleDragCancel = () => {
    resetState();
  };

  const resetState = () => {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);
    setCurrentPosition(null);

    document.body.style.setProperty('cursor', '');
  };

  const handleRemove = async (id: UniqueIdentifier, onClose?: () => void) => {
    if (invalidInputs.has(id)) {
      setInvalidInputs(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
    onChange?.(removeItem(items, id));
    await onDelete?.(id);
    onClose?.();
  };

  const handleCollapse = useCallback(
    (id: UniqueIdentifier) => {
      onChange?.(setProperty(items, id, 'collapsed', value => !value));
    },
    [items, onChange]
  );

  const getMovementAnnouncement = (eventName: string, activeId: UniqueIdentifier, overId?: UniqueIdentifier) => {
    if (overId && projected) {
      if (eventName !== 'onDragEnd') {
        if (currentPosition && projected.parentId === currentPosition.parentId && overId === currentPosition.overId) {
          return;
        }
        setCurrentPosition({
          parentId: projected.parentId,
          overId,
        });
      }

      const clonedItems: FlattenedItem[] = JSON.parse(JSON.stringify(flattenTree(items)));
      const overIndex = clonedItems.findIndex(({ id }) => id === overId);
      const activeIndex = clonedItems.findIndex(({ id }) => id === activeId);
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);

      const previousItem = sortedItems[overIndex - 1];

      let announcement = '';
      const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved';
      const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested';

      if (previousItem) {
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`;
        } else {
          let previousSibling = previousItem;

          while (previousSibling && projected.depth < previousSibling.depth) {
            const { parentId } = previousSibling;

            previousSibling = sortedItems.find(({ id }) => id === parentId) ?? previousSibling;
          }

          if (previousSibling) {
            announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`;
          }
        }
      } else {
        const nextItem = sortedItems[overIndex + 1];

        announcement = `${activeId} was ${movedVerb} before ${nextItem?.id}.`;
      }

      return announcement;
    }
  };

  const getDescendantIds = useCallback(
    (item: FlattenedItem): UniqueIdentifier[] => {
      const descendants: UniqueIdentifier[] = [];
      const stack = [item];

      while (stack.length > 0) {
        const currentItem = stack.pop();

        if (currentItem && currentItem.id !== item.id) {
          descendants.push(currentItem.id);
        }
        const children = flattenedItems.filter(i => i.parentId === currentItem?.id);

        stack.push(...children);
      }
      return descendants;
    },
    [flattenedItems]
  );

  const areAllDescendantsSelected = useCallback(
    (item: FlattenedItem): boolean => {
      const descendantIds = getDescendantIds(item);

      return descendantIds.every(id => selectedItems.has(id));
    },
    [getDescendantIds, selectedItems]
  );

  const areSomeDescendantsSelected = useCallback(
    (item: FlattenedItem): boolean => {
      const descendantIds = getDescendantIds(item);

      return descendantIds.some(id => selectedItems.has(id));
    },
    [getDescendantIds, selectedItems]
  );

  const getCheckboxState = useCallback(
    (item?: FlattenedItem): 'checked' | 'unchecked' | 'indeterminate' => {
      if (!item) {
        return 'unchecked';
      }
      if (selectedItems.has(item.id)) {
        return areAllDescendantsSelected(item) ? 'checked' : 'indeterminate';
      }
      return areSomeDescendantsSelected(item) ? 'indeterminate' : 'unchecked';
    },
    [selectedItems, areAllDescendantsSelected, areSomeDescendantsSelected]
  );

  const handleCheckboxChange = useCallback(
    (id: UniqueIdentifier, checked: boolean) => {
      const item = flattenedItems.find(item => item.id === id);

      if (!item) {
        return;
      }

      setSelectedItems(prev => {
        const next = new Set(prev);
        const descendantIds = getDescendantIds(item);

        if (checked) {
          next.add(id);
          for (const descId of descendantIds) {
            next.add(descId);
          }
        } else {
          next.delete(id);
          for (const descId of descendantIds) {
            next.delete(descId);
          }
        }

        // Update ancestor states
        let currentItem = item;

        while (currentItem.parentId) {
          const parentItem = flattenedItems.find(i => i.id === currentItem.parentId);

          if (parentItem) {
            const parentDescendants = getDescendantIds(parentItem);
            const allDescendantsSelected = parentDescendants.every(descId => next.has(descId));
            const someDescendantsSelected = parentDescendants.some(descId => next.has(descId));

            if (allDescendantsSelected) {
              next.add(parentItem.id);
            } else if (!someDescendantsSelected) {
              next.delete(parentItem.id);
            }

            currentItem = parentItem;
          } else {
            break;
          }
        }

        return next;
      });
    },
    [flattenedItems, getDescendantIds]
  );

  const handleAddItem = useCallback(
    (parentId: UniqueIdentifier | null) => {
      const newItem: TreeItem = {
        id: Date.now(),
        title: newItemDefaultLabel,
      };

      if (parentId === null) {
        onChange?.([...items, newItem]);
      } else {
        const childItem = () => {
          const updatedItems = JSON.parse(JSON.stringify(items)) as TreeItems;
          const addChildToParent = (items: TreeItems): boolean => {
            for (const item of items) {
              if (item.id === parentId) {
                item.children = item.children ? [...item.children, newItem] : [newItem];
                return true;
              }
              if (item.children && addChildToParent(item.children)) {
                return true;
              }
            }
            return false;
          };

          addChildToParent(updatedItems);
          return updatedItems;
        };

        onChange?.(childItem());
      }
      setEditingId(newItem.id);
    },
    [items, newItemDefaultLabel, onChange]
  );

  const handleEdit = useCallback((id: UniqueIdentifier) => {
    setEditingId(prevId => (prevId === id ? null : id));
    setInvalidInputs(prev => {
      const next = new Set(prev);

      next.delete(id);
      return next;
    });
  }, []);

  const handleChange = useCallback(
    (id: UniqueIdentifier, value: string) => {
      const updatedItems = updateTree(items, id, {
        title: value,
      });

      onChange?.(updatedItems);
      if (value.trim() === '') {
        setInvalidInputs(prev => new Set(prev).add(id));
      } else {
        setInvalidInputs(prev => {
          const next = new Set(prev);

          next.delete(id);
          return next;
        });
      }
    },
    [items, onChange]
  );

  const handleAddParent = useCallback(() => {
    const newItem: TreeItem = {
      id: Date.now(),
      title: newParentDefaultLabel,
    };

    onChange?.([...items, newItem]);
    setEditingId(newItem.id);
  }, [items, newParentDefaultLabel, onChange]);

  const handleSave = useCallback(async () => {
    const validateItems = (items: TreeItems): boolean => {
      for (const item of items) {
        if (item.title.trim() === '') {
          setInvalidInputs(prev => new Set(prev).add(item.id));
          return false;
        }
        if (item.children && !validateItems(item.children)) {
          return false;
        }
      }
      return true;
    };

    if (!validateItems(items)) {
      toast.error(tErrors('fillContentSaving'));
      return;
    }

    if (checkable) {
      const filterSelectedItemsWithParents = (items: TreeItems): TreeItems =>
        items.reduce((acc, item) => {
          const shouldInclude = selectedItems.has(item.id) || item.children?.some(child => selectedItems.has(child.id));

          if (shouldInclude) {
            const newItem: TreeItem = { ...item };

            if (item.children) {
              newItem.children = filterSelectedItemsWithParents(item.children);
            }
            acc.push(newItem);
          }
          return acc;
        }, [] as TreeItems);

      const selectedTreeItems = filterSelectedItemsWithParents(items);

      setIsSaving(true);
      await onSave?.(selectedTreeItems);
      setIsSaving(false);
    } else {
      setIsSaving(true);
      await onSave?.(items);
      setIsSaving(false);
    }
  }, [items, selectedItems, checkable, onSave, tErrors]);

  return (
    <>
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center">
        {searchable && (
          <Input
            placeholder={tGeneral('search')}
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="order-2 mr-auto max-w-sm md:order-1"
          />
        )}
        {(addParentButtonLabel || saveButtonLabel) && (
          <div className="order-1 flex gap-2">
            {addParentButtonLabel && <Button onClick={handleAddParent}>{addParentButtonLabel}</Button>}
            {saveButtonLabel && onSave && (
              <Button onClick={handleSave} disabled={isSaveDisabled || isSaving} loading={isSaving}>
                {saveButtonLabel}
              </Button>
            )}
          </div>
        )}
      </div>

      <DndContext
        accessibility={{ announcements }}
        sensors={sensors}
        id={id}
        collisionDetection={closestCenter}
        measuring={measuring}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
          <div>
            {flattenedItems.map(item => (
              <SortableTreeItem
                key={item.id}
                id={item.id}
                title={item.title}
                depth={item.id === activeId && projected ? projected.depth : item.depth}
                indentationWidth={indentationWidth}
                deleteModalTitle={deleteModalTitle}
                deleteModalDescription={deleteModalDescription}
                collapsed={Boolean(item.collapsed && (item.children?.length ?? 0) > 0)}
                onCollapse={collapsible && (item.children?.length ?? 0) > 0 ? () => handleCollapse(item.id) : undefined}
                onCheckboxChange={handleCheckboxChange}
                checkboxState={getCheckboxState(item)}
                checkable={checkable}
                onChange={handleChange}
                dragable={dragable}
                onRemove={removable ? (onClose?: () => void) => handleRemove(item.id, onClose) : undefined}
                onEdit={editable ? handleEdit : undefined}
                onAddItem={addable ? handleAddItem : undefined}
                isEditing={editingId === item.id}
                isInvalid={invalidInputs.has(item.id)}
                isSelected={selectedId === item.id}
                onSelect={() => onSelect?.(item)}
              >
                {renderItem?.(item)}
              </SortableTreeItem>
            ))}
          </div>
          <DragOverlay dropAnimation={dropAnimationConfig}>
            {activeId && activeItem ? (
              <SortableTreeItem
                id={activeId}
                depth={0}
                title={activeItem.title}
                indentationWidth={indentationWidth}
                deleteModalTitle={deleteModalTitle}
                deleteModalDescription={deleteModalDescription}
                collapsed={Boolean(activeItem.collapsed && (activeItem.children?.length ?? 0) > 0)}
                onCollapse={
                  collapsible && (activeItem.children?.length ?? 0) > 0 ? () => handleCollapse(id) : undefined
                }
                dragable={dragable}
                onRemove={removable ? (onClose?: () => void) => handleRemove(id, onClose) : undefined}
                checkboxState={getCheckboxState(flattenedItems.find(item => item.id === activeId))}
                checkable={checkable}
                onCheckboxChange={handleCheckboxChange}
                onEdit={handleEdit}
                onChange={handleChange}
                onAddItem={handleAddItem}
                isEditing={false}
                isInvalid={false}
              />
            ) : null}
          </DragOverlay>
        </SortableContext>
      </DndContext>
    </>
  );
}

// const adjustTranslate: Modifier = ({ transform }) => {
//   return {
//     ...transform,
//     y: transform.y - 25,
//   };
// };
