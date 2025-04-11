import { Uploader } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { useTranslations } from 'next-intl';

export function Thumbnail() {
  const tCourse = useTranslations('course');

  return (
    <FormFieldWithLabel
      name="thumbnail"
      data-field="thumbnail"
      label={
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg">
            {tCourse('information.sections.thumbnail.title')}
            <span className="text-red-500">*</span>
          </span>
          <span className="text-muted-foreground text-xs">{tCourse('information.sections.thumbnail.subtitle')}</span>
        </div>
      }
      className="rounded-lg bg-background p-4 shadow-xs"
      labelClassName="mb-4 text-lg"
      render={({ field }) => {
        const { onChange, value } = field;

        return (
          <Uploader
            accept="image/*"
            listType="picture"
            className="h-48"
            fileListVisible={false}
            value={value}
            onChange={onChange}
          />
        );
      }}
    />
  );
}
