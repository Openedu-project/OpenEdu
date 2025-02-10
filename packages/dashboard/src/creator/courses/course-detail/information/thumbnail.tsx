import { Uploader } from '@oe/ui/components/uploader';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { useTranslations } from 'next-intl';

export default function Thumbnail() {
  const tCourses = useTranslations('courses');

  return (
    <FormFieldWithLabel
      name="thumbnail"
      data-field="thumbnail"
      label={
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg">
            {tCourses('information.thumbnailTitle')}
            <span className="text-red-500">*</span>
          </span>
          <span className="text-muted-foreground text-xs">{tCourses('information.thumbnailDescription')}</span>
        </div>
      }
      className="rounded-lg bg-background p-4 shadow-sm"
      labelClassName="mb-4 text-lg"
      render={({ field }) => (
        <Uploader
          accept="image/*"
          listType="picture"
          value={field.value ? [field.value] : []}
          className="h-48"
          fileListVisible={false}
          onChange={files => field.onChange(files[0])}
        />
      )}
    />
  );
}
