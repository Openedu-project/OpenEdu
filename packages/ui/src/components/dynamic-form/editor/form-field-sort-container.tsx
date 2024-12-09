import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useCallback } from 'react';
import { useFormEditorStore } from '../store';
import type { SortableContainerProps } from '../types';
import { FormFieldSortItem } from './form-field-sort-item';

export const FormFieldSortableContainer = ({ fields, form, index, onSelect, onRemove }: SortableContainerProps) => {
  const { updateFields } = useFormEditorStore();
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = fields.findIndex(field => field.name === active.id);
        const newIndex = fields.findIndex(field => field.name === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          const newConfig = [...fields];
          const [movedItem] = newConfig.splice(oldIndex, 1);
          if (movedItem) {
            newConfig.splice(newIndex, 0, movedItem);
          }
          updateFields(newConfig, index);
        }
      }
    },
    [fields, index, updateFields]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
    >
      <SortableContext items={fields.map(item => item.name)} strategy={horizontalListSortingStrategy}>
        <div className="flex gap-4">
          {fields.map(field => (
            <FormFieldSortItem key={field.name} field={field} form={form} onSelect={onSelect} onRemove={onRemove} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
