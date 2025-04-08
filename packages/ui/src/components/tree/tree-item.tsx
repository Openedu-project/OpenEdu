import { CheckIcon, PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { DeleteButton } from '#components/delete-button';
import { DndSortableCollapseButton } from '#components/dnd-sortable';
import { DndSortableDragButton } from '#components/dnd-sortable';
import type { IRenderItemProps } from '#components/dnd-sortable';
import { Badge } from '#shadcn/badge';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { cn } from '#utils/cn';
import type { ITreeItem } from './types';

export function TreeItem<TreeItem>({
  dragable,
  collapsible,
  editable,
  addable,
  deleteable,
  labelKey,
  deleteTitle,
  deleteDescription,
  item,
  descendants,
  dragOverlay,
  onAddChild,
  onRemoveItem,
  onUpdateItem,
}: IRenderItemProps<TreeItem, unknown> & ITreeItem<TreeItem>) {
  const tForms = useTranslations('formValidation');
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item?.original[labelKey] as string);
  const [isDeleting, setIsDeleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isInvalid = useMemo(() => {
    return !value;
  }, [value]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (isInvalid) {
      return;
    }

    onUpdateItem?.(value as TreeItem[keyof TreeItem], labelKey, item);
    setIsEditing(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onUpdateItem?.(value as TreeItem[keyof TreeItem], labelKey, item);
  };

  useEffect(() => {
    if (!value) {
      setIsEditing(true);
      inputRef.current?.focus();
    }
  }, [value]);

  return (
    <div className={cn('flex w-full items-center gap-2 bg-background p-2', dragOverlay && 'bg-background shadow-sm')}>
      {dragable && <DndSortableDragButton className="group-hover/field:opacity-100" />}
      {collapsible && <DndSortableCollapseButton />}
      {editable && (isEditing || isInvalid) ? (
        <div className="flex flex-grow flex-col">
          <Input
            ref={inputRef}
            value={value}
            onChange={handleChange}
            className={cn(isInvalid && 'border-destructive')}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSave();
              }
            }}
          />
          {isInvalid && <span className="mt-1 text-destructive text-xs">{tForms('required')}</span>}
        </div>
      ) : (
        <div className="flex-grow">
          <span>{value}</span>
          {(descendants?.length ?? 0) > 0 && item.collapsed ? (
            <Badge variant="outline" className="relative top-[-2px] ml-2">
              {descendants?.length}
            </Badge>
          ) : null}
        </div>
      )}

      {editable ? (
        isEditing ? (
          <Button variant="ghost" size="icon" onClick={handleSave} className="h-6 w-6">
            <CheckIcon className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" onClick={handleEdit} className="h-6 w-6">
            <PencilIcon className="h-4 w-4" />
          </Button>
        )
      ) : null}
      {addable && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() =>
            onAddChild?.({
              id: Math.random().toString(),
              label: `New item ${Math.random().toString()}`,
            })
          }
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      )}
      {deleteable && (
        <DeleteButton
          title={deleteTitle}
          description={deleteDescription}
          disabled={isDeleting}
          className="h-6 w-6"
          onDelete={async onClose => {
            setIsDeleting(true);
            await onRemoveItem?.();
            setIsDeleting(false);
            onClose?.();
          }}
        >
          <Trash2Icon className="h-4 w-4" />
        </DeleteButton>
      )}
    </div>
  );
}
