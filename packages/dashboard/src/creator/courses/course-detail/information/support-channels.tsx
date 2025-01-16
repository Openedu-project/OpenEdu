import { SocialInput } from '@oe/ui/components/social-input';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';

export default function SupportChannels() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'channels',
  });

  return (
    <FormFieldWithLabel
      name="channels"
      label={
        <>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-lg">Support channels</span>
            <span className="text-muted-foreground text-xs">
              Kênh hỗ trợ khách hàng của bạn, bạn có thể thêm nhiều kênh hỗ trợ khác nhau
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => append({ url: '' })}
            className="ml-auto flex items-center gap-2 border-primary text-primary hover:text-primary/90"
          >
            <PlusIcon className="h-4 w-4" />
            Add channel
          </Button>
        </>
      }
      className="space-y-4 rounded-lg bg-background p-4 shadow-sm"
      labelClassName="mb-4 text-lg justify-between mb-0 items-start"
      render={() => (
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <FormFieldWithLabel name={`support_channels.${index}.description`} className="flex-1">
                <SocialInput />
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
