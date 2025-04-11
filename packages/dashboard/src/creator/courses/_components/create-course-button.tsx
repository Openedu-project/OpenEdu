'use client';
import { API_ENDPOINT } from '@oe/api';
import { createAICourseService, createCourseService } from '@oe/api';
import type { ICreateBaseCourse, ICreateYoutubeCourse } from '@oe/api';
import { YoutubeIcon } from '@oe/assets';
import { CREATOR_ROUTES, buildUrl } from '@oe/core';
import { toast } from '@oe/ui';
import { useTable } from '@oe/ui';
import { useRouter } from '@oe/ui';
import { ButtonDropdown } from '@oe/ui';
import { useSocketStore } from '@oe/ui';
import { PlusIcon, SparklesIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import { AIStatusModal, type IAIStatus } from './ai-status-modal';
import { CreateCourseModal } from './create-course-modal';
import { CreateCourseYoutubeModal } from './create-course-youtube';

export function CreateCourseButton() {
  const tCourse = useTranslations('course');
  const tAIStatus = useTranslations('aiStatusModal');
  const router = useRouter();
  const { mutate } = useTable();
  const { mutate: globalMutate } = useSWRConfig();

  const [showBasicModal, setShowBasicModal] = useState(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [AIStatus, setAIStatus] = useState<{
    id: string;
    status: IAIStatus;
  } | null>(null);
  const [openAIStatusModal, setOpenAIStatusModal] = useState<boolean>(false);
  const { AICourseStatusData, resetSocketData } = useSocketStore();

  const handleOptionSelect = (value: string) => {
    switch (value) {
      case 'create':
        setShowBasicModal(true);
        break;
      case 'youtube':
        setShowYoutubeModal(true);
        break;
      default:
        break;
    }
  };

  const handleBasicCourseSubmit = async (data: ICreateBaseCourse) => {
    const course = await createCourseService(undefined, data);
    await mutate?.();
    toast.success(
      tCourse('common.toast.createSuccess', {
        item: tCourse('common.courseTitle'),
      })
    );
    router.push(
      buildUrl({
        endpoint: CREATOR_ROUTES.courseSettingUp,
        params: { courseId: course.id },
      })
    );
  };

  const handleYoutubeCourseSubmit = async (data: ICreateYoutubeCourse) => {
    const course = await createAICourseService(undefined, {
      ...data,
      number_of_question: Number(data.number_of_question),
    });
    globalMutate((key: string) => !!key?.includes(API_ENDPOINT.COURSES), undefined, { revalidate: false });
    await mutate?.();
    setAIStatus({ id: course.id, status: 'generating' });
    setOpenAIStatusModal(true);
    toast.success(
      tCourse('common.toast.createSuccess', {
        item: tCourse('common.courseTitle'),
      })
    );
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (AICourseStatusData?.data) {
      if (AIStatus && AICourseStatusData?.data?.course_id === AIStatus.id) {
        if (AICourseStatusData?.data?.status.toLowerCase() === 'completed') {
          setOpenAIStatusModal(false);
        }
        setAIStatus({
          ...AIStatus,
          status: AICourseStatusData?.data?.status as unknown as IAIStatus,
        });
      }
      globalMutate((key: string) => !!key?.includes(API_ENDPOINT.COURSES), undefined, { revalidate: false });
      void mutate?.();
      resetSocketData('ai_course_status');
    }
  }, [AICourseStatusData, AIStatus]);

  return (
    <>
      <ButtonDropdown
        label={tCourse('create.title')}
        icon={<PlusIcon className="mr-2 h-4 w-4" />}
        onClick={() => setShowBasicModal(true)}
        className="ml-auto h-9"
        options={[
          {
            label: tCourse('create.title'),
            value: 'create',
            icon: <PlusIcon className="mr-2 h-4 w-4" />,
            onClick: () => handleOptionSelect('create'),
          },
          {
            label: tCourse('create.youtube'),
            value: 'youtube',
            icon: <YoutubeIcon className="mr-2 h-4 w-4" />,
            onClick: () => handleOptionSelect('youtube'),
          },
          {
            label: tCourse('create.ai'),
            value: 'ai',
            icon: <SparklesIcon className="mr-2 h-4 w-4" />,
            href: buildUrl({
              endpoint: CREATOR_ROUTES.aiCourse,
              params: { id: '' },
            }),
          },
        ]}
      />
      <CreateCourseModal
        open={showBasicModal}
        onClose={() => setShowBasicModal(false)}
        onSubmit={handleBasicCourseSubmit}
      />
      <CreateCourseYoutubeModal
        open={showYoutubeModal}
        onClose={() => setShowYoutubeModal(false)}
        onSubmit={handleYoutubeCourseSubmit}
      />
      <AIStatusModal open={openAIStatusModal} status={AIStatus?.status} title={tAIStatus('genYoutubeTitle')} />
    </>
  );
}
