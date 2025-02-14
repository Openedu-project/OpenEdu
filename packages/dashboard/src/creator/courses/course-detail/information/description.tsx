import { RichTextEditor } from '@oe/ui/components/rich-text';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { useTranslations } from 'next-intl';

export default function Description() {
  const tCourses = useTranslations('courses');

  return (
    <FormFieldWithLabel
      name="description"
      label={
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg">
            {tCourses('information.descriptionTitle')}
            <span className="text-red-500">*</span>
          </span>
          <span className="text-muted-foreground text-xs">{tCourses('information.description')}</span>
        </div>
      }
      className="rounded-lg bg-background p-4 shadow-sm"
      labelClassName="mb-4 text-lg"
    >
      <RichTextEditor placeholder={tCourses('information.descriptionPlaceholder')} />
    </FormFieldWithLabel>
  );
}
