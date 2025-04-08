// import type { ICoursePreviewVideo } from "@oe/api/types/course/basic";
import type { ICoursePreviewVideo } from '@oe/api/types/course/basic';
import type { IFileResponse } from '@oe/api/types/file';
import { UploadTrigger, Uploader } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { UploadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useFormContext, useWatch } from 'react-hook-form';
// import { useWatch } from "react-hook-form";

export default function PreviewVideos() {
  const tCourse = useTranslations('course');

  const { setValue } = useFormContext();
  const previewLessons: ICoursePreviewVideo[] = useWatch({
    name: 'props.preview_lessons',
  });

  return (
    <FormFieldWithLabel
      name="medias"
      className="rounded-lg bg-background p-4 shadow-xs"
      render={({ field }) => {
        const { value, onChange } = field;

        return (
          <Uploader
            value={value?.map((item: IFileResponse) => ({
              ...item,
              name: previewLessons?.find(lesson => lesson.file_id === item.id)?.title,
            }))}
            onChange={files => {
              onChange(files);
              setValue(
                'props.preview_lessons',
                (files as IFileResponse[]).map(file => {
                  return {
                    title: file.name,
                    content: '',
                    order: 0,
                    content_type: 'video',
                    file_id: file.id,
                    video: file,
                  };
                })
              );
            }}
            accept="video/*"
            maxSizeBytes={100 * 1024 * 1024}
            multiple
            renderTrigger={props => (
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-lg">{tCourse('information.sections.previewVideos.title')}</div>
                  <span className="text-muted-foreground text-xs">
                    {tCourse('information.sections.previewVideos.subtitle')}
                  </span>
                </div>
                <UploadTrigger {...props}>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-primary text-primary hover:text-primary/90"
                    size="sm"
                  >
                    <UploadIcon className="mr-2 h-4 w-4" />
                    {tCourse('information.sections.previewVideos.uploadButton')}
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
