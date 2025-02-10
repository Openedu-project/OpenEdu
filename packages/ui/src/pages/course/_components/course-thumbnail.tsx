'use client';
import type { ICoursePreviewVideo } from '@oe/api/types/course/basic';
import type { ICourseOutline } from '@oe/api/types/course/course';
import type { IFileResponse } from '@oe/api/types/file';
import { CirclePlayIcon, EyeIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Image } from '#components/image';
import { AspectRatio } from '#shadcn/aspect-ratio';
import { cn } from '#utils/cn';
import type { PreviewVideo } from '../_store/useCourseOutlineStore';
import CoursePreviewModal from './preview-video-modal';

const mapMediaToPreviewVideo = (media: IFileResponse, previewLessons?: ICoursePreviewVideo[]): PreviewVideo => {
  const matchingLesson = previewLessons?.find(lesson => lesson?.file_id === media.id);

  return matchingLesson
    ? {
        ...media,
        title: matchingLesson.title,
      }
    : { ...media, title: '' };
};

const getPreviewLessonVideo = (courseData: ICourseOutline) => {
  const { medias, props } = courseData;

  if (!medias) {
    return undefined;
  }

  return medias.map(media => mapMediaToPreviewVideo(media as IFileResponse, props?.preview_lessons ?? undefined));
};

interface CourseThumbnailProps {
  className?: string;
  courseOutline: ICourseOutline;
}

interface PreviewOverlayProps {
  totalMedias: number;
}

const PreviewOverlay = ({ totalMedias }: PreviewOverlayProps) => {
  const t = useTranslations('courseOutline.coursePreview');

  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex w-full flex-col items-center">
      <div className="mb-2 grid h-8 w-8 items-center justify-center rounded-full bg-primary-foreground shadow-shadow-2">
        {/* <PlayFilled color="hsl(var(--primary))" /> */}
        <CirclePlayIcon className="h-6 w-6 text-primary" />
      </div>
      <div className="flex items-center gap-2 rounded-[32px] bg-primary-foreground px-2 py-1 lg:rounded-[40px] lg:px-3 lg:py-2">
        <EyeIcon className="h-5 w-5 text-primary" />
        <p className="giant-iheading-semibold14 text-primary">{t('previewLesson', { total: totalMedias })}</p>
      </div>
    </div>
  );
};

const ThumbnailImage = ({
  url,
  name,
  hasOverlay = false,
}: {
  url: string;
  name: string;
  hasOverlay?: boolean;
}) => (
  <Image
    src={url}
    alt={name}
    height={222}
    width={390}
    className={cn('h-full w-full bg-transparent object-cover', hasOverlay && 'opacity-75')}
    rounded="lg"
    priority
  />
);

const CourseThumbnail = ({ className, courseOutline }: CourseThumbnailProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const { getPreviewLessonVideo } = useCourseOutlineDetailStore();

  const thumbnail = courseOutline?.thumbnail;

  const medias = getPreviewLessonVideo(courseOutline);
  const hasOverlay = medias && medias?.length > 0;

  const thumbnailUrl = thumbnail?.mime?.includes('image') && thumbnail?.url ? thumbnail.url : '';
  const thumbnailName = thumbnail?.name ?? '';

  return (
    <>
      <div className={cn('mb-5 w-full overflow-hidden', !medias && 'max-h-[222px]', className)}>
        <AspectRatio
          ratio={16 / 9}
          className={cn('rounded-lg bg-muted', hasOverlay && 'relative hover:cursor-pointer')}
          onClick={() => {
            if (medias && medias?.length > 0) {
              setIsOpen(true);
            }
          }}
        >
          <ThumbnailImage url={thumbnailUrl} name={thumbnailName} hasOverlay={hasOverlay} />
          {medias && medias?.length > 0 && <PreviewOverlay totalMedias={medias.length} />}
        </AspectRatio>
      </div>

      <CoursePreviewModal
        courseOutline={courseOutline}
        medias={medias}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default CourseThumbnail;
