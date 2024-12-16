'use client';

import VideoSquare from '@oe/assets/icons/video-square';
import { convertSecondsToTimeString } from '@oe/core/utils/datetime';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { Modal } from '#components/modal';
import { Spinner } from '#components/spinner';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';
import { type PreviewVideo, useCourseOutlineDetailStore } from '../_store/useCourseOutlineStore';

interface ICoursePreview {
  medias?: PreviewVideo[];
  open: boolean;
  onClose: () => void;
}
interface IVideo {
  loading: boolean;
  video?: PreviewVideo;
}

export default function CoursePreviewModal({ medias, open = false, onClose }: ICoursePreview) {
  const t = useTranslations('courseOutline.coursePreview');

  const [videoStatus, setVideoStatus] = useState<IVideo>({
    loading: true,
    video: medias && medias?.length > 0 ? medias[0] : undefined,
  });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { courseOutline } = useCourseOutlineDetailStore();
  const { name } = courseOutline;

  const videoContainerRef = useRef<HTMLDivElement>(null);

  const handleVideoClick = (video: PreviewVideo) => {
    setVideoStatus({ loading: true, video });

    // Reset iframe src to trigger a fresh load
    if (iframeRef.current) {
      iframeRef.current.src = video?.url;
    }

    videoContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Modal
      isOpen={open}
      title={t('title')}
      description={name}
      className="min-w-[50vw]"
      onClose={() => {
        setVideoStatus({
          loading: true,
          video: medias && medias?.length > 0 ? medias[0] : undefined,
        });
        onClose();
      }}
    >
      <>
        <div ref={videoContainerRef} className="relative">
          {videoStatus?.loading && (
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-10 flex aspect-video w-full items-center justify-center bg-background/80">
              <Spinner size="sm" />
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={videoStatus?.video?.url}
            title={videoStatus?.video?.name}
            loading="lazy"
            className="aspect-video h-full w-full border-none pt-2"
            allow="fullscreen"
            allowFullScreen
            onLoad={() =>
              setVideoStatus(prev => {
                return { ...prev, loading: false };
              })
            }
          />
        </div>
        <div>
          <span className="giant-iheading-semibold20 mb-2 block">{t('freeSampleVideo')}</span>
          <div className="flex flex-col items-start gap-1">
            {medias?.map(item => (
              <Button
                variant="ghost"
                key={item?.id}
                onClick={() => handleVideoClick(item)}
                className={cn(
                  'w-full justify-between gap-2 shadow-shadow-1',
                  videoStatus?.video?.id === item?.id && 'bg-primary/15'
                )}
              >
                <VideoSquare />
                <span className="line-clamp-1 w-full flex-1 text-left">{item.title}</span>
                <span>{convertSecondsToTimeString(item?.duration)}</span>
              </Button>
            ))}
          </div>
        </div>
      </>
    </Modal>
  );
}
