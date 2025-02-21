import { RichTextEditor } from '@oe/ui/components/rich-text';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { useTranslations } from 'next-intl';

export default function Description() {
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
      className="rounded-lg bg-background p-4 shadow-sm"
      labelClassName="mb-4 text-lg"
    >
      <RichTextEditor placeholder={tCourse('information.sections.description.placeholder')} />
    </FormFieldWithLabel>
  );
}
