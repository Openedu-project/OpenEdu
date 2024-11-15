import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronDown, Edit, GripVertical, Plus, Trash } from 'lucide-react';
import { memo } from 'react';

import type { UniqueIdentifier } from '@dnd-kit/core';
import type { AnimateLayoutChanges } from '@dnd-kit/sortable';
import type { CSSProperties, ReactNode } from 'react';

import { Button } from '#shadcn/button';
import { Checkbox } from '#shadcn/checkbox';
import { Input } from '#shadcn/input';
import { cn } from '#utils/cn';

// import { iOS } from './utilities';

interface Props {
  id: UniqueIdentifier;
  collapsed?: boolean;
  depth: number;
  indentationWidth: number;
  title: string;
  children?: ReactNode;
  style?: CSSProperties;
  checkboxState: 'checked' | 'unchecked' | 'indeterminate';
  checkable?: boolean;
  isEditing?: boolean;
  isInvalid?: boolean;
  dragable?: boolean;
  isSelected?: boolean;
  onCollapse?: () => void;
  onRemove?: () => void;
  onCheckboxChange?: (id: UniqueIdentifier, checked: boolean) => void;
  onEdit?: (id: UniqueIdentifier) => void;
  onChange?: (id: UniqueIdentifier, value: string) => void;
  onAddItem?: (parentId: UniqueIdentifier) => void;
  onSelect?: () => void;
}

const animateLayoutChanges: AnimateLayoutChanges = ({ isSorting, wasDragging }) => !(isSorting || wasDragging);

export function SortableTreeItemNotMemoized({
  id,
  depth,
  indentationWidth,
  collapsed,
  onCollapse,
  onRemove,
  title,
  children,
  checkboxState,
  checkable = false,
  onCheckboxChange,
  onEdit,
  onChange,
  onSelect,
  onAddItem,
  isEditing = false,
  isInvalid = false,
  isSelected = false,
  dragable,
  ...props
}: Props) {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    // setDraggableNodeRef,
    // setDroppableNodeRef,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
  });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    marginLeft: `${indentationWidth * depth}px`,
  };

  return (
    <div
      {...attributes}
      className={cn(
        'flex items-center p-2',
        // clone && 'inline-block pointer-events-none pl-[10px] pt-[5px]',
        isDragging && 'opacity-50',
        // isDragging && indicator && 'opacity-100 relative z-[1] mb-[-1px]',
        // iOS && 'select-none',
        isSorting && 'pointer-events-none',
        isSelected && 'bg-primary text-primary-foreground'
      )}
      style={style}
      ref={setNodeRef}
      onClick={() => onSelect?.()}
      onKeyDown={() => {
        void 0;
      }}
      aria-hidden
      {...props}
    >
      {children ?? (
        <>
          {dragable && (
            <Button variant="ghost" size="icon" className="cursor-grab" {...listeners}>
              <GripVertical className="h-4 w-4" />
            </Button>
          )}
          {checkable && (
            <Checkbox
              checked={checkboxState === 'indeterminate' ? 'indeterminate' : checkboxState === 'checked'}
              onCheckedChange={checked => onCheckboxChange?.(id, checked as boolean)}
              className="mr-2"
            />
          )}
          {onCollapse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onCollapse}
              className={cn('transition-transform duration-250', collapsed && 'rotate-[-90deg]')}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
          {isEditing ? (
            <div className="flex flex-col">
              <Input
                value={title}
                onChange={e => onChange?.(id, e.target.value)}
                className={`w-40 ${isInvalid ? 'border-red-500' : ''}`}
              />
              {/* {isInvalid && <span className="text-red-500 text-xs mt-1">This field is required</span>} */}
            </div>
          ) : (
            <span className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap pl-2">{title}</span>
          )}
          {onAddItem && (
            <Button variant="ghost" size="icon" onClick={() => onAddItem?.(id)} className="ml-auto">
              <Plus className="h-4 w-4" />
            </Button>
          )}
          {onEdit && (
            <Button variant="ghost" size="icon" onClick={() => onEdit?.(id)} className="mr-1">
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onRemove && (
            <Button variant="ghost" size="icon" onClick={onRemove}>
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </>
      )}
    </div>
  );
}

export const SortableTreeItem = memo(SortableTreeItemNotMemoized) as typeof SortableTreeItemNotMemoized;
