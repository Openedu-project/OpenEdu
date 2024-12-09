import { useSortable } from '@dnd-kit/sortable';
import { GripVertical, Trash2 } from 'lucide-react';
import type { MouseEvent } from 'react';
import { Button } from '#shadcn/button';
import type { SortableItemProps } from '../types';
import FormFieldItem from './form-field-item';

export function FormFieldSortItem({ field, form, shouldSort, onSelect, onRemove }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field.name });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) scaleX(${transform.scaleX}) scaleY(1)`
      : undefined,
    transition,
  };

  const handleClick = () => onSelect(field.name);
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove(field.name);
  };

  return (
    <div
      {...(shouldSort && { ref: setNodeRef })}
      {...(shouldSort && { style })}
      className="group/field relative flex-1 cursor-pointer rounded-lg hover:ring-2 hover:ring-primary/50 hover:ring-inset"
      onClick={handleClick}
      onKeyDown={() => {
        void 0;
      }}
    >
      <div className="-top-3 absolute right-0 flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="z-10 h-6 w-6 bg-muted opacity-0 transition-opacity group-hover/field:opacity-100"
          {...(shouldSort && attributes)}
          {...(shouldSort && listeners)}
        >
          <GripVertical className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="z-10 h-6 w-6 bg-muted opacity-0 transition-opacity group-hover/field:opacity-100"
          onClick={handleRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <FormFieldItem field={field} form={form} />
    </div>
  );
}
