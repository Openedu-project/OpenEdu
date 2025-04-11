'use client';

import { API_ENDPOINT } from '@oe/api';
import type { ICourse } from '@oe/api';
import type { IAICourseStatus } from '@oe/api';
import { CREATOR_ROUTES } from '@oe/core';
import { buildUrl } from '@oe/core';
import { GENERATING_STATUS } from '@oe/core';
import { Link, useRouter } from '@oe/ui';
import { useSocketStore } from '@oe/ui';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import { AIStatusModal } from '../../_components/ai-status-modal';
import { CourseInfoForm } from './course-info-form';

export function SettingCourseInfomation({
  course,
}: {
  course?: ICourse | null;
}) {
  const tAICourse = useTranslations('course.aiCourse');
  const [status, setStatus] = useState<IAICourseStatus>();
  const [openStatusModal, setOpenStatusModal] = useState<boolean>(false);
  const { AICourseStatusData, resetSocketData } = useSocketStore();
  const router = useRouter();
  const { mutate: globalMutate } = useSWRConfig();

  useEffect(() => {
    if (!course) {
      return;
    }
    const { ai_course } = course;

    if (
      (GENERATING_STATUS.includes(ai_course?.status as IAICourseStatus) &&
        !GENERATING_STATUS.includes(course?.ai_course?.thumbnail_status ?? '')) ||
      ai_course?.status !== 'waiting'
    ) {
      handleOpenStatusModal(ai_course?.status ?? 'pending');
    }
  }, [course]);

  useEffect(() => {
    if (AICourseStatusData && AICourseStatusData.data?.course_id === course?.id) {
      setStatus(AICourseStatusData.data?.status as IAICourseStatus);

      globalMutate((key: string) => !!key?.includes(`${API_ENDPOINT.COURSES}?`), undefined, { revalidate: false });

      if (AICourseStatusData.data?.status === 'completed') {
        router.push(
          buildUrl({
            endpoint: CREATOR_ROUTES.courseSettingUp,
            params: { courseId: course.id },
          })
        );
      }
      setStatus(AICourseStatusData.data?.status as IAICourseStatus);
      resetSocketData('ai_course_status');
    }
  }, [AICourseStatusData, router, resetSocketData, course?.id, globalMutate]);

  const handleOpenStatusModal = (status: IAICourseStatus) => {
    setOpenStatusModal(true);
    setStatus(status);
  };

  return (
    <div>
      <div className="flex gap-2">
        <Link
          href={buildUrl({
            endpoint: CREATOR_ROUTES.aiCourseDetail,
            params: { id: course?.id },
          })}
          variant="ghost"
          className="!px-1"
          activeClassName=""
        >
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h2 className="giant-iheading-semibold16 md:giant-iheading-semibold24 mb-2">{tAICourse('setupCourseInfo')}</h2>
      </div>
      <p className="mcaption-regular14 md:mcaption-regular16">{tAICourse('setupCourseInfoDesc')}</p>
      {course && (
        <>
          <CourseInfoForm className="py-4" course={course} handleSubmit={handleOpenStatusModal} />
          <AIStatusModal
            status={status}
            open={openStatusModal}
            title={tAICourse('aiGenerateLoading')}
            content={{
              failed: (
                <>
                  <p className="mcaption-regular14">{tAICourse('failedMessage')}</p>
                  <Link variant="outline" href={CREATOR_ROUTES.courses}>
                    {tAICourse('back')}
                  </Link>
                </>
              ),
            }}
          />
        </>
      )}
    </div>
  );
}
