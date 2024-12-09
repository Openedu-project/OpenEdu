'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Combobox } from '#components/combobox';
import { Button } from '#shadcn/button';
import { formComponents } from '../form-components';
import { config } from '../form-components/config';
import { useFormEditorStore } from '../store';

export function Components() {
  const tComponents = useTranslations('dynamicForms.components');
  const components = Object.values(config);
  const { addField } = useFormEditorStore();

  return (
    <div className="flex min-w-40 flex-1 flex-col gap-2">
      <p className="font-medium text-sm">{tComponents('title')}</p>
      <Combobox
        placeholder={tComponents('placeholder')}
        searchPlaceholder={tComponents('searchPlaceholder')}
        options={components.map(component => ({
          value: component.fieldType,
          label: component.label,
        }))}
        className="md:hidden"
      />
      <div className="hidden flex-col gap-2 md:flex">
        {components.map(component => {
          const Icon = formComponents[component.fieldType]?.icon;
          return (
            <Button key={component.fieldType} onClick={() => addField(component)} className="justify-start gap-2">
              {Icon && <Icon className="h-4 w-4" />}
              <span>{tComponents(`${component.fieldType}`)}</span>
              <Plus className="ml-auto h-4 w-4" />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
