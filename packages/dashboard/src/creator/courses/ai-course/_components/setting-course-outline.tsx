'use client';

import { API_ENDPOINT } from '@oe/api';
import type { ICourse } from '@oe/api';
import type { IAICourseStatus } from '@oe/api';
import { CREATOR_ROUTES } from '@oe/core';
import { buildUrl } from '@oe/core';
import { Link, useRouter } from '@oe/ui';
import { useSocketStore } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import { AIStatusModal, type IAIStatus } from '../../_components/ai-status-modal';
import { CourseOutlineForm } from './course-outline-form';

export function SettingCourseOutline({ course }: { course: ICourse | null }) {
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

    if (ai_course?.general_info_status !== 'completed') {
      setOpenStatusModal(true);
      setStatus(ai_course?.general_info_status);
    }
  }, [course]);

  useEffect(() => {
    if (AICourseStatusData && AICourseStatusData.data?.course_id === course?.id) {
      globalMutate((key: string) => !!key?.includes(API_ENDPOINT.COURSES), undefined, { revalidate: false });

      if (AICourseStatusData.data?.general_info_status === 'completed') {
        router.push(
          buildUrl({
            endpoint: CREATOR_ROUTES.aiGeneralInfo,
            params: { id: course.id },
          })
        );
      }
      setStatus(AICourseStatusData.data?.status as IAIStatus);
      resetSocketData('ai_course_status');
    }
  }, [AICourseStatusData, router, resetSocketData, course?.id, globalMutate]);

  return (
    <div>
      <h2 className="giant-iheading-semibold16 md:giant-iheading-semibold24 mb-2">{tAICourse('setupCourseOutline')}</h2>
      <p className="mcaption-regular14 md:mcaption-regular16">{tAICourse('setupCourseOutlineDesc')}</p>
      <CourseOutlineForm className="py-4" course={course} />
      {course && (
        <AIStatusModal
          status={status}
          open={openStatusModal}
          title={tAICourse('aiGenerateLoading')}
          hasCloseIcon={false}
          content={{
            loading: (
              <>
                <p className="mcaption-regular14">{tAICourse('loadingMessage')}</p>
                <Link variant="outline" target="_blank" href={CREATOR_ROUTES.courses}>
                  {tAICourse('openNewTab')}
                </Link>
              </>
            ),
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
      )}
    </div>
  );
}
