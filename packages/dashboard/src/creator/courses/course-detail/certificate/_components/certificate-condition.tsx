import { InputNumber } from '@oe/ui';
import { Checkbox } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { useTranslations } from 'next-intl';

export const CertificateCondition = () => {
  const tCertificate = useTranslations('certificate');

  return (
    <div className="space-y-4 p-4">
      <FormFieldWithLabel
        name="props.certificate_condition.completed_all_quiz"
        label={tCertificate('conditions.completedAllQuizzes')}
        isToggleField
        render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />}
      />

      <div className="flex items-center gap-2">
        <FormFieldWithLabel
          name="props.certificate_condition.completed_course"
          label={tCertificate('conditions.completeCourseAt')}
          isToggleField
          render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />}
        />
        <div className="flex items-center gap-2">
          <FormFieldWithLabel name="props.certificate_condition.course_completion_percentage">
            <InputNumber className="h-8 w-24" min={0} max={100} />
          </FormFieldWithLabel>
          <span>%</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <FormFieldWithLabel
          name="props.certificate_condition.completed_final_quiz"
          label={tCertificate('conditions.completeFinalQuizAt')}
          isToggleField
          render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} />}
        />
        <div className="flex items-center gap-2">
          <FormFieldWithLabel name="props.certificate_condition.final_quiz_completion_percentage">
            <InputNumber className="h-8 w-24" min={0} max={100} />
          </FormFieldWithLabel>
          <span>%</span>
        </div>
      </div>
    </div>
  );
};
