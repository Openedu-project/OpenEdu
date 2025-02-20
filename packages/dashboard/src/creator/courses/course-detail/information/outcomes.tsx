'use client';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { PlusIcon } from 'lucide-react';
import { TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';

export default function Outcomes() {
  const tCourse = useTranslations('course');

  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'props.achievements',
  });

  return (
    <FormFieldWithLabel
      name="props.achievements"
      label={
        <>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-lg">{tCourse('information.sections.outcomes.title')}</span>
            <span className="text-muted-foreground text-xs">{tCourse('information.sections.outcomes.subtitle')}</span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append('')}
            className="flex items-center gap-2 border-primary text-primary hover:text-primary/90"
          >
            <PlusIcon className="h-4 w-4" />
            {tCourse('information.sections.outcomes.addButton')}
          </Button>
        </>
      }
      className="rounded-lg bg-background p-4 shadow-sm"
      labelClassName="mb-4 text-lg justify-between mb-0 items-start"
      render={() => (
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <FormFieldWithLabel name={`props.achievements.${index}`} className="flex-1">
                <Input placeholder={tCourse('information.sections.outcomes.placeholder')} />
              </FormFieldWithLabel>
              <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    />
  );
}
