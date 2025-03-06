import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Switch } from '@oe/ui/shadcn/switch';
import { useTranslations } from 'next-intl';

export default function MarkAsCompleted() {
  const tCourse = useTranslations('course');

  return (
    <div className="bg-background p-4 shadow-sm">
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
