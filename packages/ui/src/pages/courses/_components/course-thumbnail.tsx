import type { ICourseOutline } from '@oe/api/types/course/course';
import Eye from '@oe/assets/icons/eye';
import PlayFilled from '@oe/assets/icons/play-filled';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Image } from '#components/image';
import { AspectRatio } from '#shadcn/aspect-ratio';
import { cn } from '#utils/cn';
import { useCourseOutlineDetailStore } from '../_store/useCourseOutlineStore';
import CoursePreviewModal from './preview-video-modal';

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
      <div className="mb-2 grid h-11 w-11 items-center justify-center rounded-full bg-primary-foreground shadow-shadow-2">
        <PlayFilled color="hsl(var(--primary))" />
      </div>
      <div className="flex items-center gap-2 rounded-[32px] bg-primary-foreground px-2 py-1 lg:rounded-[40px] lg:px-3 lg:py-2">
        <Eye color="hsl(var(--primary))" />
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
  />
);

const CourseThumbnail = ({ className, courseOutline }: CourseThumbnailProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getPreviewLessonVideo } = useCourseOutlineDetailStore();

  const thumbnail = courseOutline?.thumbnail;

  const medias = getPreviewLessonVideo();
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

      <CoursePreviewModal medias={medias} open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default CourseThumbnail;
