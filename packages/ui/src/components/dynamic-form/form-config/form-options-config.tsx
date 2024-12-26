import { uniqueID } from '@oe/core/utils/unique';
import { Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, useRef } from 'react';
import {
  DndSortable,
  DndSortableDragButton,
  type IDndSortableItem,
  type IDndSortableRef,
} from '#components/dnd-sortable';
import type { SelectboxOption } from '#components/selectbox';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import type { FormFieldType } from '../types';
import { FormFieldWrapper } from './form-field-wrapper';

const OptionsInput = ({
  item,
  onUpdateItem,
  onRemoveItem,
}: {
  item: IDndSortableItem<SelectboxOption, unknown>;
  onUpdateItem?: (value: string, key: keyof SelectboxOption, item: IDndSortableItem<SelectboxOption, unknown>) => void;
  onRemoveItem?: () => void;
}) => {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');

  const handleUpdateItem = (key: keyof SelectboxOption, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    onUpdateItem?.(value, key, item);
  };
  return (
    <div className="flex items-center gap-2">
      <DndSortableDragButton className="shrink-0" />
      <div className="flex flex-1 gap-2">
        <Input
          placeholder={tDynamicForms('label')}
          value={item.original.label}
          onChange={e => handleUpdateItem('label', e)}
        />
        <Input
          placeholder={tDynamicForms('value')}
          value={item.original.value}
          onChange={e => handleUpdateItem('value', e)}
        />
      </div>
      <Button variant="ghost" onClick={onRemoveItem} className="h-6 w-6 shrink-0 p-0">
        <Trash2Icon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default function FormOptionsConfig({
  field,
  handleConfigChange,
}: { field: FormFieldType; handleConfigChange: (key: keyof FormFieldType, value: SelectboxOption[]) => void }) {
  const tDynamicForms = useTranslations('dynamicForms.fieldConfig');
  const ref = useRef<IDndSortableRef<SelectboxOption, unknown>>(null);
  return (
    <FormFieldWrapper label={tDynamicForms('options')}>
      <>
        <DndSortable<SelectboxOption, unknown>
          data={field?.options ?? []}
          onChange={items => {
            handleConfigChange('options', items);
          }}
          dataConfig={{
            idProp: 'id',
            type: 'array',
            direction: 'vertical',
          }}
          className="flex flex-col gap-2"
          renderConfig={{
            renderItem: ({ item, onRemoveItem, onUpdateItem }) => {
              return <OptionsInput item={item} onRemoveItem={onRemoveItem} onUpdateItem={onUpdateItem} />;
            },
          }}
          ref={ref}
        />
        <Button
          onClick={() =>
            ref.current?.addItem({
              label: `${tDynamicForms('optionLabel')} ${ref.current?.items.length + 1}`,
              value: `${tDynamicForms('optionValue')}-${ref.current?.items.length + 1}`,
              id: uniqueID(),
            })
          }
        >
          {tDynamicForms('addOption')}
        </Button>
      </>
    </FormFieldWrapper>
  );
}
