import { Button } from '@oe/ui';
import { SocialInput } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';

export function SupportChannels() {
  const tCourse = useTranslations('course');
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'props.support_channel.channels',
  });

  return (
    <div className="space-y-4 rounded-lg bg-background p-4 shadow-xs">
      <div className="mb-4 flex items-start justify-between text-lg">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg">{tCourse('information.sections.supportChannels.title')}</span>
          <span className="text-muted-foreground text-xs">
            {tCourse('information.sections.supportChannels.subtitle')}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => append('')}
          className="ml-auto flex items-center gap-2 border-primary text-primary hover:text-primary/90"
        >
          <PlusIcon className="h-4 w-4" />
          {tCourse('information.sections.supportChannels.addButton')}
        </Button>
      </div>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <FormFieldWithLabel
              name={`props.support_channel.channels.${index}`}
              className="flex-1"
              render={({ field }) => <SocialInput {...field} />}
            />
            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
