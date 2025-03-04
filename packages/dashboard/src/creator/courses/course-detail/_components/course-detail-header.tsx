'use client';
import { useGetCourseById, useGetSegments } from '@oe/api/hooks/useCourse';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { ButtonDropdown } from '@oe/ui/components/button-dropdown';
import { StatusBadge, type TStatus } from '@oe/ui/components/status-badge';
import { Badge } from '@oe/ui/shadcn/badge';
import { FileDown, FileUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { isCourseValid } from '../_utils/validation';
import CourseNameForm from './course-name-form';
import { CourseRequestPublishModal } from './course-request-publish-modal';
import CourseTabs from './course-tabs';
import { CourseUnpublishModal } from './course-unpublish-modal';
import CourseValidateModal from './course-validate-modal';

export function CourseDetailHeader() {
  const tCourse = useTranslations('course');
  const { courseId } = useParams<{ courseId: string }>();
  const { course } = useGetCourseById(courseId);
  const { segments } = useGetSegments({
    course_id: courseId as string,
  });

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isRequestPublish, setIsRequestPublish] = useState(false);
  const [isUnPublish, setIsUnPublish] = useState(false);

  const handlePublish = () => {
    const courseValid = isCourseValid({ course, segments, tCourse });
    if (!courseValid) {
      setIsPublishModalOpen(true);
      return;
    }
    setIsRequestPublish(true);
  };

  const confirmUnPublish = () => {
    setIsUnPublish(true);
  };

  return (
    <DashboardHeaderCard
      dashboard="creator"
      breadcrumbs={[
        { label: tCourse('common.coursesTitle'), path: CREATOR_ROUTES.courses },
        { label: course?.name || tCourse('common.noName') },
      ]}
      className="mb-0 flex flex-col gap-2 pb-0"
    >
      <div className="flex items-center justify-between gap-4">
        <CourseNameForm />
        <div className="flex items-center gap-2">
          <Badge variant="outline_primary">v{course?.version}.0</Badge>
          {course?.status && <StatusBadge status={course?.status as TStatus} />}
          <ButtonDropdown
            className="h-9"
            label={tCourse('common.actions.publish')}
            icon={<FileUp className="mr-2 h-4 w-4" />}
            options={[
              {
                label: tCourse('common.actions.unpublish'),
                value: 'unpublish',
                icon: <FileDown className="mr-2 h-4 w-4" />,
                onClick: () => confirmUnPublish(),
                disabled: course?.status === 'draft',
              },
            ]}
            onClick={handlePublish}
          />
        </div>
      </div>

      <CourseTabs segments={segments} />
      {isPublishModalOpen && (
        <CourseValidateModal
          course={course}
          segments={segments}
          open={isPublishModalOpen}
          onClose={() => setIsPublishModalOpen(false)}
        />
      )}
      <CourseRequestPublishModal isOpen={isRequestPublish} onClose={() => setIsRequestPublish(false)} />
      {isUnPublish && <CourseUnpublishModal isOpen={isUnPublish} onClose={() => setIsUnPublish(false)} />}
    </DashboardHeaderCard>
  );
}
