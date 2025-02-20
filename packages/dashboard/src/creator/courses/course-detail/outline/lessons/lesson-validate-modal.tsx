import type { ILessonSchema } from '@oe/api/schemas/courses/segmentSchema';
import { Modal } from '@oe/ui/components/modal';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';
import { validateForm } from './utils';

export default function LessonValidateModal({
  lesson,
  open,
  onClose,
}: {
  lesson: ILessonSchema;
  open: boolean;
  onClose: () => void;
}) {
  const tCourse = useTranslations('course');

  const validationState = useMemo(() => validateForm(lesson, tCourse), [lesson, tCourse]);

  const getContentTypeLabel = useCallback(
    (idx: number) => {
      const contentType = lesson.contents?.[idx]?.type;
      if (!contentType) {
        return '';
      }
      return tCourse(`outline.lesson.contentTypes.${contentType}`);
    },
    [lesson, tCourse]
  );

  return (
    <Modal
      title={tCourse('validation.errors')}
      description={tCourse('validation.pleaseFixErrors')}
      open={open}
      hasCancelButton
      onClose={onClose}
      className="max-w-2xl"
    >
      <div className="space-y-4">
        {validationState.lessonErrors.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-base">{tCourse('outline.lesson.title')}:</h3>
            {validationState.lessonErrors.map(error => (
              <div key={error} className="ml-4 text-destructive text-sm">
                - {error}
              </div>
            ))}
          </div>
        )}

        {Object.keys(validationState.contentErrors).length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-base">{tCourse('outline.lesson.contentTitle')}:</h3>
            {Object.entries(validationState.contentErrors).map(([idx, errors]) => (
              <div key={idx} className="ml-4">
                <div className="font-semibold text-sm">{getContentTypeLabel(Number(idx))}:</div>
                {errors.map(error => (
                  <div key={error} className="ml-4 text-destructive text-sm">
                    - {error}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {Object.keys(validationState.quizErrors).length > 0 && (
          <div className="space-y-4">
            {/* <h3 className="font-semibold text-base">
              {tCourse("outline.lesson.content.quiz.label")}:
            </h3> */}
            {Object.entries(validationState.quizErrors).map(([key, errors]) => {
              const [contentIdx, quizIdx] = key.split('-');
              return (
                <div key={key} className="ml-4">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <span>{getContentTypeLabel(Number(contentIdx))}</span>-
                    <span>{tCourse('outline.lesson.content.quiz.label')}</span>
                    <span>{Number(quizIdx) + 1}:</span>
                  </div>
                  {errors.map(error => (
                    <div key={`${key}-${error}`} className="ml-4 text-destructive text-sm">
                      - {error}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
}
