import { uniqueID } from '@oe/core';
import { Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, useRef } from 'react';
import {
  DndSortable,
  DndSortableDragButton,
  type IDndSortableItem,
  type IDndSortableRef,
} from '#components/dnd-sortable';
import type { MultipleChoiceGridOption } from '#components/multiple-choice-grid';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

const GridItemInput = ({
  item,
  onUpdateItem,
  onRemoveItem,
}: {
  item: IDndSortableItem<MultipleChoiceGridOption, unknown>;
  onUpdateItem?: (
    value: string,
    key: keyof MultipleChoiceGridOption,
    item: IDndSortableItem<MultipleChoiceGridOption, unknown>
  ) => void;
  onRemoveItem?: () => void;
}) => {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');

  const handleUpdateItem = (key: keyof MultipleChoiceGridOption, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    onUpdateItem?.(value, key, item);
  };
  return (
    <div className="flex items-center gap-2">
      <DndSortableDragButton className="shrink-0" />
      <div className="flex flex-1 gap-2">
        <Input
          placeholder={tDynamicForms('label')}
          value={item.original.text as string}
          onChange={e => handleUpdateItem('text', e)}
        />
      </div>
      <Button variant="ghost" onClick={onRemoveItem} className="h-6 w-6 shrink-0 p-0">
        <Trash2Icon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export function FormGridRowConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, rows: MultipleChoiceGridOption[]) => void;
}) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  const ref = useRef<IDndSortableRef<MultipleChoiceGridOption, unknown>>(null);
  return (
    <FormFieldWrapper label={tDynamicForms('rows')}>
      <>
        <DndSortable<MultipleChoiceGridOption, unknown>
          data={field?.rows ?? []}
          onChange={items => {
            handleConfigChange('rows', items);
          }}
          dataConfig={{
            idProp: 'id',
            type: 'array',
            direction: 'vertical',
          }}
          className="flex flex-col gap-2"
          renderConfig={{
            renderItem: ({ item, onRemoveItem, onUpdateItem }) => {
              return <GridItemInput item={item} onRemoveItem={onRemoveItem} onUpdateItem={onUpdateItem} />;
            },
          }}
          ref={ref}
        />
        <Button
          onClick={() =>
            ref.current?.addItem({
              text: `${tDynamicForms('row')} ${ref.current?.items.length + 1}`,
              id: uniqueID(),
            })
          }
        >
          {tDynamicForms('addRow')}
        </Button>
      </>
    </FormFieldWrapper>
  );
}

export function FormGridColumnConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, rows: MultipleChoiceGridOption[]) => void;
}) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  const ref = useRef<IDndSortableRef<MultipleChoiceGridOption, unknown>>(null);
  return (
    <FormFieldWrapper label={tDynamicForms('columns')}>
      <>
        <DndSortable<MultipleChoiceGridOption, unknown>
          data={field?.columns ?? []}
          onChange={items => {
            handleConfigChange('columns', items);
          }}
          dataConfig={{
            idProp: 'id',
            type: 'array',
            direction: 'vertical',
          }}
          className="flex flex-col gap-2"
          renderConfig={{
            renderItem: ({ item, onRemoveItem, onUpdateItem }) => {
              return <GridItemInput item={item} onRemoveItem={onRemoveItem} onUpdateItem={onUpdateItem} />;
            },
          }}
          ref={ref}
        />
        <Button
          onClick={() =>
            ref.current?.addItem({
              text: `${tDynamicForms('column')} ${ref.current?.items.length + 1}`,
              id: uniqueID(),
            })
          }
        >
          {tDynamicForms('addColumn')}
        </Button>
      </>
    </FormFieldWrapper>
  );
}
