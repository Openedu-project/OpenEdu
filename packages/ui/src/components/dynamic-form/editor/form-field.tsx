'use client';
import { useSortable } from '@dnd-kit/sortable';
import { GripVertical, Plus } from 'lucide-react';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '#shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '#shadcn/dropdown-menu';
import { formComponents } from '../form-components';
import { config as components } from '../form-components/config';
import { useFormEditorStore } from '../store';
import type { FormFieldProps, FormFieldType } from '../types';
import { FormFieldSortableContainer } from './form-field-sort-container';
import { FormFieldSortItem } from './form-field-sort-item';

const MAX_GROUP_ITEMS = 3;

export function FormField({ config, index }: FormFieldProps) {
  const { setSelectedField, addField, removeField } = useFormEditorStore();
  const form = useFormContext();

  const isFieldGroup = Array.isArray(config);
  const groupItemCount = isFieldGroup ? config.length : 1;
  const canAddMore = groupItemCount < MAX_GROUP_ITEMS;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: Array.isArray(config) ? (config[0]?.name ?? '') : (config?.name ?? ''),
  });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) scaleX(${transform.scaleX}) scaleY(1)`
      : undefined,
    transition,
  };

  const handleAddField = useCallback(
    (component: FormFieldType) => {
      addField(component, index);
    },
    [addField, index]
  );

  return (
    <div style={style} ref={setNodeRef} className="group relative flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="-translate-y-1/2 absolute top-1/2 left-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </Button>

      <div className="flex flex-1 gap-2 px-10">
        {isFieldGroup ? (
          <FormFieldSortableContainer
            fields={config}
            form={form}
            onSelect={setSelectedField}
            onRemove={removeField}
            index={index}
          />
        ) : (
          <FormFieldSortItem
            shouldSort={false}
            field={config}
            form={form}
            onSelect={setSelectedField}
            onRemove={removeField}
          />
        )}
      </div>

      {canAddMore && (
        <div className="-translate-y-1/2 absolute top-1/2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.values(components).map(component => {
                const Icon = formComponents[component.fieldType]?.icon;
                if (!Icon) {
                  return null;
                }

                return (
                  <DropdownMenuItem
                    key={component.fieldType}
                    onClick={() => handleAddField(component)}
                    className="justify-start gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{component.label}</span>
                    <Plus className="ml-auto h-4 w-4" />
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
