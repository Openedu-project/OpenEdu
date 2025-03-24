import { Selectbox, type SelectboxOption } from '@oe/ui/components/selectbox';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useGetSection } from '../../_hooks/useGetSection';

export const EntityIdSelector = () => {
  const t = useTranslations('course');
  const triggerType = useWatch({ name: 'start_when.type' });
  const { sections, allLessons } = useGetSection();
  const { setValue } = useFormContext();

  let options: SelectboxOption[] = [];
  let labelKey = 'form.trigger.entityId';

  if (triggerType === 'started_lesson' || triggerType === 'completed_lesson') {
    options = allLessons.map(lesson => ({
      value: lesson.uid,
      label: lesson.title,
      id: lesson.uid,
    }));
    labelKey = 'form.trigger.selectLesson';
  } else if (triggerType === 'completed_section') {
    options = sections.map(section => ({
      value: section.uid,
      label: section.title,
      id: section.uid,
    }));
    labelKey = 'form.trigger.selectSection';
  } else if (triggerType === 'clicked_on') {
    options = [
      {
        value: 'enroll_course',
        label: t('form.trigger.enrollCourse'),
        id: 'enroll_course',
      },
      {
        value: 'get_certificate',
        label: t('form.trigger.getCertificate'),
        id: 'get_certificate',
      },
      {
        value: 'add_book_mark',
        label: t('form.trigger.addBookMark'),
        id: 'add_book_mark',
      },
    ];
    labelKey = 'form.trigger.clickTrigger';
  }

  useEffect(() => {
    if (triggerType === 'started_lesson' || triggerType === 'completed_lesson') {
      setValue('start_when.entity_type', 'lesson');
    } else if (triggerType === 'completed_section') {
      setValue('start_when.entity_type', 'section');
    } else if (triggerType === 'clicked_on') {
      setValue('start_when.entity_type', 'course');
    }
  }, [triggerType, setValue]);

  return (
    <>
      <FormFieldWithLabel name="start_when.entity_id" label={t(labelKey)} required>
        <Selectbox placeholder={t('form.trigger.selectEntity')} options={options} />
      </FormFieldWithLabel>
      <FormFieldWithLabel name="start_when.entity_type" className="hidden">
        <Selectbox placeholder={t('form.trigger.selectEntity')} options={options} />
      </FormFieldWithLabel>
    </>
  );
};
