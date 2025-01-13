import { UploadTrigger, Uploader } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { UploadIcon } from 'lucide-react';

export default function Referrence() {
  return (
    <FormFieldWithLabel
      name="referrence"
      className="rounded-lg bg-background p-4 shadow-sm"
      render={({ field }) => (
        <Uploader
          value={field.value}
          onChange={field.onChange}
          accept="video/*"
          maxSizeBytes={10 * 1024 * 1024}
          multiple
          renderTrigger={props => (
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-lg">Tài liệu tham khảo</div>
                <span className="text-muted-foreground text-xs">File PDF dung lượng không quá 10MB</span>
              </div>
              <UploadTrigger {...props}>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-primary text-primary hover:text-primary/90"
                >
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Tải lên tài liệu
                </Button>
              </UploadTrigger>
            </div>
          )}
          allowRename
          className="h-auto items-stretch justify-start"
        />
      )}
    />
  );
}
