import type { IFileResponse } from '@oe/api/types/file';
import { Image } from '@oe/ui/components/image';
import { Uploader } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui/shadcn/form';
import { Trash2 } from 'lucide-react';
import {
  type FieldPath,
  type FieldValues,
  type Path,
  type PathValue,
  type UseFormReturn,
  useWatch,
} from 'react-hook-form';
import { useTranslations } from 'use-intl';

type ThumbnailProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
};

const Thumbnail = <TFormValues extends FieldValues>({ form }: ThumbnailProps<TFormValues>) => {
  const t = useTranslations('creatorSettingLaunchpad.generalInfo');

  const removeThumbnail = () => {
    form.setValue('thumbnail' as Path<TFormValues>, null as PathValue<TFormValues, Path<TFormValues>>);
    form.setValue('thumbnail_id' as Path<TFormValues>, null as PathValue<TFormValues, Path<TFormValues>>);
  };

  const thumbnail = useWatch({
    control: form.control,
    name: 'thumbnail' as FieldPath<TFormValues>,
  });

  return (
    <div>
      <FormField
        control={form.control}
        name={'thumbnail' as FieldPath<TFormValues>}
        rules={{ required: t('thumbnailRequired') }}
        render={() => (
          <FormItem>
            <FormLabel>
              <h2 className="font-semibold text-base">{t('thumbnail')} *</h2>
            </FormLabel>
          </FormItem>
        )}
      />

      {thumbnail ? (
        <div className="relative w-full">
          <Image
            src={form.getValues('thumbnail' as Path<TFormValues>)?.url}
            alt="thumbnail"
            fill
            className="w-full rounded-lg object-cover"
          />
          <Button
            variant="outline"
            className="!p-1 absolute top-4 right-4 aspect-square w-fit rounded-full"
            onClick={removeThumbnail}
          >
            <Trash2 size={20} className="text-neutral-900" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-spacing-m">
          <FormField
            control={form.control}
            name={'thumbnail' as FieldPath<TFormValues>}
            rules={{ required: 'This field is required' }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Uploader
                    accept="image/*"
                    multiple={false}
                    maxSizeBytes={5 * 1024 * 1024 * 1024}
                    value={field.value}
                    onChange={file => {
                      field.onChange(file);

                      if (file) {
                        form.setValue(
                          'thumbnail_id' as FieldPath<TFormValues>,
                          (file as IFileResponse).id as PathValue<TFormValues, Path<TFormValues>>
                        );
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Thumbnail;
