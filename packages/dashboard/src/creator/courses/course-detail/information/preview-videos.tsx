import type { ICoursePreviewVideo } from '@oe/api/types/course/basic';
import { UploadTrigger, Uploader } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { UploadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function PreviewVideos() {
  const tCourses = useTranslations('courses');

  return (
    <FormFieldWithLabel
      name="props.preview_lessons"
      className="rounded-lg bg-background p-4 shadow-sm"
      render={({ field }) => {
        const { value, onChange } = field;
        return (
          <Uploader
            value={value?.map((item: ICoursePreviewVideo) => ({
              id: item.file_id,
              name: item.title,
              type: item.content_type,
            }))}
            onChange={files => {
              const newFiles = files.map((file, index) => ({
                title: file.name,
                content: '',
                order: index,
                content_type: 'video',
                file_id: file.id,
                video: file,
              }));
              onChange(newFiles as ICoursePreviewVideo[]);
            }}
            accept="video/*"
            maxSizeBytes={10 * 1024 * 1024}
            multiple
            renderTrigger={props => (
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-lg">{tCourses('information.previewVideosTitle')}</div>
                  <span className="text-muted-foreground text-xs">
                    {tCourses('information.previewVideosDescription')}
                  </span>
                </div>
                <UploadTrigger {...props}>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-primary text-primary hover:text-primary/90"
                    size="sm"
                  >
                    <UploadIcon className="mr-2 h-4 w-4" />
                    {tCourses('information.previewVideosUpload')}
                  </Button>
                </UploadTrigger>
              </div>
            )}
            allowRename
            className="h-auto items-stretch justify-start"
          />
        );
      }}
    />
  );
}
