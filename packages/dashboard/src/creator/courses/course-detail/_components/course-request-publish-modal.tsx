import { API_ENDPOINT } from '@oe/api';
import { publishCourseService } from '@oe/api';
import { useGetCourseById } from '@oe/api';
import whaleSuccess from '@oe/assets/images/whale-success.png';
import { CREATOR_ROUTES } from '@oe/core';
import { toast } from '@oe/ui';
// import { useRouter } from "@oe/ui";
import { Image } from '@oe/ui';
import { Modal } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

export function CourseRequestPublishModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const tCourse = useTranslations('course');
  const [isRequestPublishSuccess, setIsRequestPublishSuccess] = useState(false);
  const { courseId } = useParams<{ courseId: string }>();
  const [newCourseId, setNewCourseId] = useState<string | null>(null);
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { mutateCourse } = useGetCourseById(courseId);

  const [isLoading, setIsLoading] = useState(false);

  const handleSendRequest = async () => {
    setIsLoading(true);
    try {
      const newCourse = await publishCourseService(undefined, courseId);
      await Promise.all([
        mutateCourse(),
        mutate((key: string) => !!key?.includes(API_ENDPOINT.COURSES), undefined, { revalidate: false }),
      ]);
      setIsRequestPublishSuccess(true);
      setNewCourseId(newCourse.id);
      toast.success(tCourse('common.toast.requestPublishSuccess'));
    } catch {
      toast.error(tCourse('common.toast.requestPublishError'));
    }
    onClose();
    setIsLoading(false);
  };

  return (
    <>
      <Modal
        title={tCourse('common.modal.requestPublish.title')}
        description={tCourse('common.modal.requestPublish.description')}
        open={isOpen}
        buttons={[
          {
            label: tCourse('common.actions.cancel'),
            variant: 'outline',
            onClick: onClose,
          },
          {
            label: tCourse('common.actions.sendRequest'),
            onClick: handleSendRequest,
            loading: isLoading,
            disabled: isLoading,
          },
        ]}
      />
      {isRequestPublishSuccess && (
        <Modal
          title={
            <div className="flex flex-col items-center gap-4">
              <Image
                src={whaleSuccess}
                alt="success"
                width={200}
                height={200}
                noContainer
                className="h-[200px] w-[200px]"
              />
              {tCourse('common.modal.requestPublishSuccess.title')}
            </div>
          }
          description={tCourse('common.modal.requestPublishSuccess.description')}
          className="md:max-w-[400px]"
          open={isRequestPublishSuccess}
          buttons={[
            {
              label: tCourse('common.actions.cancel'),
              variant: 'outline',
              onClick: () => {
                setIsRequestPublishSuccess(false);
                if (newCourseId) {
                  const newHref =
                    typeof window !== 'undefined' ? window.location.href.replace(courseId, newCourseId) : '';
                  const newPathname = new URL(newHref).pathname;
                  if (newPathname) {
                    router.replace(newPathname);
                  }
                }
              },
              className: 'w-full',
            },
            {
              label: tCourse('common.actions.backToCourseList'),
              onClick: () => {
                setIsRequestPublishSuccess(false);
                router.push(CREATOR_ROUTES.courses);
              },
              className: 'w-full',
            },
          ]}
        />
      )}
    </>
  );
}
