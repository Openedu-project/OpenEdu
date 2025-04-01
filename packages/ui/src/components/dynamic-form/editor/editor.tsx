'use client';

import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useGetForm } from '@oe/api/hooks/useForms';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { FormWrapper } from '#components/form-wrapper';
import { useFormEditorStore } from '../store';
import type { FormEditorAction, FormFieldOrGroup, FormFieldType } from '../types';
import { generateZodSchema } from '../utils';
import { FormField } from './form-field';

export function Editor({ action }: { action?: FormEditorAction }) {
  const { fields, updateFields, reset } = useFormEditorStore();

  const { id } = useParams<{ id: string }>();
  const { dataForm } = useGetForm({ id });
  const formSchema = generateZodSchema(fields);

  useEffect(() => {
    if ((dataForm?.questions?.length ?? 0) > 0) {
      updateFields(
        dataForm?.questions.map(question => question?.settings?.props as FormFieldType).filter(Boolean) ?? []
      );
    } else if (action === 'create') {
      // Reset state at the create mode
      reset();
    }
  }, [dataForm, updateFields, reset, action]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const containerIndex = fields.findIndex(Array.isArray);
      if (containerIndex !== -1) {
        const container = fields[containerIndex] as FormFieldType[];
        const oldItemIndex = container?.findIndex(item => item.name === active.id);
        const newItemIndex = container?.findIndex(item => item.name === over.id);

        if (oldItemIndex !== -1 && newItemIndex !== -1) {
          const newItems = [...fields];
          newItems[containerIndex] = arrayMove(container, oldItemIndex, newItemIndex);
          updateFields(newItems);
        }
      }

      const oldIndex = fields.findIndex(
        field =>
          (Array.isArray(field) && field.some(i => i.name === active.id)) ||
          (!Array.isArray(field) && field.name === active.id)
      );
      const newIndex = fields.findIndex(
        field =>
          (Array.isArray(field) && field.some(i => i.name === over.id)) ||
          (!Array.isArray(field) && field.name === over.id)
      );

      updateFields(arrayMove(fields, oldIndex, newIndex));
    }
  };

  return (
    <FormWrapper id="dynamic-form" schema={formSchema}>
      {/* <form onSubmit={form.handleSubmit(onSubmit)}> */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={fields.map((field: FormFieldOrGroup) => (Array.isArray(field) ? (field[0]?.name ?? '') : field?.name))}
          strategy={verticalListSortingStrategy}
        >
          {fields.map((field: FormFieldOrGroup, index: number) => (
            <FormField key={Array.isArray(field) ? field[0]?.fieldId : field?.name} config={field} index={index} />
          ))}
        </SortableContext>
      </DndContext>
      {/* </form> */}
    </FormWrapper>
  );
}
