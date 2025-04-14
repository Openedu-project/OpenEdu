import { FormFieldWithLabel } from '@oe/ui';
import { Switch } from '@oe/ui';
import { useTranslations } from 'next-intl';

export function MarkAsCompleted() {
  const tCourse = useTranslations('course');

  return (
    <div className="bg-background p-4 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="font-medium text-lg">{tCourse('information.sections.markAsCompleted.title')}</span>

        <FormFieldWithLabel
          name="mark_as_completed"
          isToggleField
          render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
        />
      </div>
      <span className="text-muted-foreground text-xs">{tCourse('information.sections.markAsCompleted.subtitle')}</span>
    </div>
  );
}
