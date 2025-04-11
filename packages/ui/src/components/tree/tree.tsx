'use client';
import { useTranslations } from 'next-intl';
import { useMemo, useRef, useState } from 'react';
import { DndSortable, type IDndSortableProps, type IDndSortableRef } from '#components/dnd-sortable';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { toast } from '#shadcn/sonner';
import { TreeItem } from './tree-item';
import type { ITreeItem } from './types';

export function Tree<T>({
  searchable,
  addParentButtonLabel,
  saveButtonLabel,
  labelKey,
  onSave,
  defaultItem,
  onDelete,
  ...props
}: Omit<IDndSortableProps<T, unknown>, 'onChange'> & ITreeItem<T>) {
  const tGeneral = useTranslations('general');
  const tErrors = useTranslations('errors');
  const [searchValue, setSearchValue] = useState('');
  const [items, setItems] = useState<T[]>();
  const dndSortableRef = useRef<IDndSortableRef<T, unknown>>(null);
  const [isSaving, setIsSaving] = useState(false);

  const isSaveDisabled = useMemo(() => {
    return !items || items.length === 0;
  }, [items]);

  const handleAddParent = () => {
    const newItem = {
      ...defaultItem,
      [labelKey]: '',
    };
    dndSortableRef.current?.addItem?.(newItem);
  };

  const handleSave = async () => {
    if (!items || items.length === 0) {
      return;
    }

    if (!items.some(item => item[labelKey])) {
      toast.error(tErrors('fillContentSaving'));
      return;
    }

    setIsSaving(true);
    await onSave?.(items);
    setIsSaving(false);
  };

  const handleChange = (items: T[]) => {
    setItems(items);
  };

  const handleRemoveItem = async (item: T, descendants: T[]) => {
    await onDelete?.(item, descendants);
  };

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
      <DndSortable<T, unknown>
        className="flex flex-col gap-2"
        {...props}
        ref={dndSortableRef}
        renderConfig={{
          renderItem: ({ item, descendants, dragOverlay, onAddChild, onRemoveItem, onUpdateItem }) => {
            return (
              <TreeItem
                {...props}
                item={item}
                labelKey={labelKey}
                descendants={descendants}
                dragOverlay={dragOverlay}
                onAddChild={() => {
                  const newItem = {
                    ...defaultItem,
                    [labelKey]: '',
                  };
                  onAddChild?.(newItem);
                }}
                onRemoveItem={async () => {
                  onRemoveItem?.();
                  await handleRemoveItem(item.original, descendants?.map(descendant => descendant.original) || []);
                }}
                onUpdateItem={onUpdateItem}
              />
            );
          },
        }}
        onChange={handleChange}
      />
    </>
  );
}
