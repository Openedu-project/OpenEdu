import { type ICreateYoutubeCourse, createYoutubeCourseSchema } from '@oe/api';
import { getCookieClient } from '@oe/core';
import { toast } from '@oe/ui';
import { InputNumber } from '@oe/ui';
import { Modal } from '@oe/ui';
import { SelectLanguage } from '@oe/ui';
import { Selectbox, type SelectboxOption } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { Input } from '@oe/ui';
import { Switch } from '@oe/ui';
import { useTranslations } from 'next-intl';

export function CreateCourseYoutubeModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ICreateYoutubeCourse) => Promise<void>;
}) {
  const tCourse = useTranslations('course');
  const locale = getCookieClient(process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY);

  const toneOptions: SelectboxOption[] = [
    { label: tCourse('tone.normal'), value: 'normal', id: 'normal' },
    { label: tCourse('tone.humorous'), value: 'humorous', id: 'humorous' },
    {
      label: tCourse('tone.professional'),
      value: 'professional',
      id: 'professional',
    },
  ];

  const quizOptions: SelectboxOption[] = [
    {
      label: tCourse('outline.lesson.content.quiz.types.singleChoice'),
      value: 'single_choice',
      id: 'single_choice',
    },
    {
      label: tCourse('outline.lesson.content.quiz.types.multipleChoice'),
      value: 'multiple_choice',
      id: 'multiple_choice',
    },
  ];

  const handleError = () => {
    toast.error(
      tCourse('common.toast.createError', {
        item: tCourse('common.courseTitle'),
      })
    );
  };

  return (
    <Modal
      title={tCourse('create.youtube')}
      open={open}
      onClose={onClose}
      validationSchema={createYoutubeCourseSchema}
      onSubmit={onSubmit}
      onError={handleError}
      showSubmit
      defaultValues={{ language: locale, type: 'youtube_playlist' }}
      buttons={[
        {
          label: tCourse('common.actions.cancel'),
          type: 'button',
          onClick: onClose,
          variant: 'outline',
        },
        { label: tCourse('common.actions.create'), type: 'submit' },
      ]}
    >
      {form => {
        return (
          <>
            <FormFieldWithLabel name="playlist_link" label={tCourse('create.form.playlistLink')} required>
              <Input />
            </FormFieldWithLabel>
            <FormFieldWithLabel name="language" label={tCourse('create.form.language')}>
              <SelectLanguage />
            </FormFieldWithLabel>
            <FormFieldWithLabel
              name="summary_included"
              label={tCourse('create.form.includeSummary')}
              render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
            />
            {form.watch('summary_included') && (
              <FormFieldWithLabel name="tone" label={tCourse('create.form.tone')}>
                <Selectbox options={toneOptions ?? []} />
              </FormFieldWithLabel>
            )}
            <FormFieldWithLabel
              name="quiz_included"
              label={tCourse('create.form.includeQuiz')}
              render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
            />
            {form.watch('quiz_included') && (
              <FormFieldWithLabel name="quiz_type" label={tCourse('create.form.quizType')}>
                <Selectbox options={quizOptions ?? []} />
              </FormFieldWithLabel>
            )}
            {form.watch('quiz_included') && (
              <FormFieldWithLabel name="number_of_question" label={tCourse('create.form.numberOfQuestion')}>
                <InputNumber min={1} />
              </FormFieldWithLabel>
            )}
          </>
        );
      }}
    </Modal>
  );
}
