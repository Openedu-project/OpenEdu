'use client';

import type { ICourse } from '@oe/api/types/course/course';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { Link, useRouter } from '@oe/ui/common/navigation';
import { useSocketStore } from '@oe/ui/store/socket';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import AIStatusModal, { type IAIStatus } from '../../_components/ai-status-modal';
import { CourseOutlineForm } from './course-outline-form';

export function SettingCourseOutline({ course }: { course: ICourse | null }) {
  const tAICourse = useTranslations('courses.aiCourse');
  const [status, setStatus] = useState<IAIStatus>();
  const [openStatusModal, setOpenStatusModal] = useState<boolean>(false);
  const { AICourseStatusData, resetSocketData } = useSocketStore();
  const router = useRouter();

  useEffect(() => {
    if (!course) {
      return;
    }
    const { ai_course } = course;

    if (GENERATING_STATUS.includes(ai_course?.status as IAIStatus)) {
      setOpenStatusModal(true);
      setStatus(ai_course?.status);
    }
  }, [course]);

  useEffect(() => {
    if (AICourseStatusData && AICourseStatusData.data?.course_id === course?.id) {
      if (AICourseStatusData.data?.general_info_status === 'completed') {
        router.push(
          buildUrl({
            endpoint: CREATOR_ROUTES.aiGeneralInfo,
            params: { id: course.id },
          })
        );
        setOpenStatusModal(false);
      }
      setStatus(AICourseStatusData.data?.status as IAIStatus);
      resetSocketData('ai_course_status');
    }
  }, [AICourseStatusData, router, resetSocketData, course?.id]);

  return (
    <div className="m-auto max-w-3xl rounded-xl bg-background p-4">
      <div>
        <h2 className="giant-iheading-semibold16 md:giant-iheading-semibold24 mb-2">
          {tAICourse('setupCourseOutline')}
        </h2>
        <p className="mcaption-regular14 md:mcaption-regular16">{tAICourse('setupCourseDesc')}</p>
      </div>
      <CourseOutlineForm className="py-4" course={course} />
      {course && (
        <AIStatusModal
          status={status}
          open={openStatusModal}
          title={tAICourse('aiGenerateLoading')}
          content={{
            loading: (
              <>
                <p className="mcaption-regular14">{tAICourse('loadingMessage')}</p>
                <Link variant="outline" target="_blank" href={CREATOR_ROUTES.courses}>
                  {tAICourse('openNewTab')}
                </Link>
              </>
            ),
          }}
        />
      )}
    </div>
  );
}
