import type { ICourseCertCondition } from '@oe/api';
import { InfoCircle } from '@oe/assets';
import { CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo, useMemo } from 'react';

type TRequirement = 'content_completed' | 'assignment_score' | 'assignment_completed';

interface RequirementProps {
  type: TRequirement;
  value?: number;
}

const RequirementsItem = memo(({ type, value }: RequirementProps) => {
  const t = useTranslations('courseOutline.certificate');

  const label = useMemo(() => {
    const map: Record<TRequirement, { key: string; params?: Record<string, number> }> = {
      content_completed: {
        key: 'completeAtLeast',
        params: { count: value ?? 0 },
      },
      assignment_score: {
        key: 'completeAssignmentAtScore',
        params: { score: value ?? 0 },
      },
      assignment_completed: {
        key: 'completeAllAssignment',
      },
    };

    const { key, params } = map[type];
    return params ? t(key, params) : t(key);
  }, [type, value, t]);

  return (
    <div className="mcaption-regular14 flex items-center gap-2 border-success border-l border-l-[2px] bg-foreground/5 px-4 py-2">
      <InfoCircle color="var(--success)" />
      <p>{label}</p>
    </div>
  );
});

export function CourseCertificateRequirements({
  certificateCondition,
}: {
  certificateCondition: ICourseCertCondition;
}) {
  const t = useTranslations('courseOutline.certificate');
  const { completed_all_quiz, course_completion_percentage, final_quiz_completion_percentage } = certificateCondition;

  const requirementList: RequirementProps[] = [];

  if (completed_all_quiz) {
    requirementList.push({ type: 'assignment_completed' });
  }

  if (course_completion_percentage) {
    requirementList.push({
      type: 'content_completed',
      value: course_completion_percentage,
    });
  }

  if (final_quiz_completion_percentage) {
    requirementList.push({
      type: 'assignment_score',
      value: final_quiz_completion_percentage,
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <CheckCircle />
        <span className="mcaption-semibold16">{t('requirementsToEarn')}</span>
      </div>

      <div className="space-y-2">
        {requirementList.map((req, idx) => (
          <RequirementsItem key={req.type + idx} type={req.type} value={req.value} />
        ))}
      </div>
    </div>
  );
}
