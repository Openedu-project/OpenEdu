import { RichTextEditor } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { useTranslations } from 'next-intl';

export function Description() {
  const tCourse = useTranslations('course');

  return (
    <FormFieldWithLabel
      name="description"
      label={
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg">
            {tCourse('information.sections.description.title')}
            <span className="text-red-500">*</span>
          </span>
          <span className="text-muted-foreground text-xs">{tCourse('information.sections.description.subtitle')}</span>
        </div>
      }
      className="rounded-lg bg-background p-4 shadow-xs"
      labelClassName="mb-4 text-lg"
    >
      <RichTextEditor placeholder={tCourse('information.sections.description.placeholder')} />
    </FormFieldWithLabel>
  );
}
