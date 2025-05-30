import { UploadTrigger, Uploader } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { UploadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function References() {
  const tCourse = useTranslations('course');
  return (
    <FormFieldWithLabel
      name="docs"
      className="rounded-lg bg-background p-4 shadow-sm"
      render={({ field }) => (
        <Uploader
          value={field.value}
          onChange={field.onChange}
          accept="image/*,application/pdf"
          maxSizeBytes={10 * 1024 * 1024}
          multiple
          renderTrigger={props => (
            <div className="flex justify-between">
              <div>
                <div className="font-medium text-lg">{tCourse('information.sections.reference.title')}</div>
                <span className="text-muted-foreground text-xs">
                  {tCourse('information.sections.reference.subtitle')}
                </span>
              </div>
              <UploadTrigger {...props}>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-primary text-primary hover:text-primary/90"
                  size="sm"
                >
                  <UploadIcon className="mr-2 h-4 w-4" />
                  {tCourse('information.sections.reference.uploadButton')}
                </Button>
              </UploadTrigger>
            </div>
          )}
          className="h-auto items-stretch justify-start"
        />
      )}
    />
  );
}
