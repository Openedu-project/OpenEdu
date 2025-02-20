import type { ICourse } from '@oe/api/types/course/course';
import type { ISegment } from '@oe/api/types/course/segment';
import { Modal } from '@oe/ui/components/modal';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { validateCourse } from '../_utils/validation';

interface CourseValidateModalProps {
  course?: ICourse | null;
  segments?: ISegment[] | null;
  open: boolean;
  onClose: () => void;
}

export default function CourseValidateModal({ course, segments, open, onClose }: CourseValidateModalProps) {
  const tCourse = useTranslations('course');

  const validationState = useMemo(() => validateCourse({ course, segments, tCourse }), [course, segments, tCourse]);

  return (
    <Modal
      title={tCourse('validation.errors')}
      description={tCourse('validation.publishRequired')}
      open={open}
      hasCancelButton
      onClose={onClose}
      className="max-w-2xl"
    >
      <div className="space-y-4">
        {validationState.informationErrors.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-base">{tCourse('tabs.courseInformation')}:</h3>
            {validationState.informationErrors.map(error => (
              <div key={error} className="ml-4 text-destructive text-sm">
                - {error}
              </div>
            ))}
          </div>
        )}

        {validationState.outlineErrors.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-base">{tCourse('tabs.courseOutline')}:</h3>
            {validationState.outlineErrors.map(error => (
              <div key={error} className="ml-4 text-destructive text-sm">
                - {error}
              </div>
            ))}
          </div>
        )}

        {validationState.priceErrors.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-base">{tCourse('tabs.coursePrice')}:</h3>
            {validationState.priceErrors.map(error => (
              <div key={error} className="ml-4 text-destructive text-sm">
                - {error}
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
