import { type ICreateYoutubeCourse, createYoutubeCourseSchema } from '@oe/api/schemas/courses/createCourseSchema';
import { getCookieClient } from '@oe/core/utils/cookie';
import { InputNumber } from '@oe/ui/components/input-number';
import { Modal } from '@oe/ui/components/modal';
import { SelectLanguage } from '@oe/ui/components/select-language';
import { Selectbox, type SelectboxOption } from '@oe/ui/components/selectbox';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { toast } from '@oe/ui/shadcn/sonner';
import { Switch } from '@oe/ui/shadcn/switch';
import { useTranslations } from 'next-intl';

export default function CreateCourseYoutubeModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ICreateYoutubeCourse) => Promise<void>;
}) {
  const tCourses = useTranslations('courses');
  const locale = getCookieClient(process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY);

  const toneOptions: SelectboxOption[] = [
    { label: tCourses('tone.normal'), value: 'normal', id: 'normal' },
    { label: tCourses('tone.humorous'), value: 'humorous', id: 'humorous' },
    {
      label: tCourses('tone.professional'),
      value: 'professional',
      id: 'professional',
    },
  ];

  const quizOptions: SelectboxOption[] = [
    {
      label: tCourses('quiz.singleChoice'),
      value: 'single_choice',
      id: 'single_choice',
    },
    {
      label: tCourses('quiz.multipleChoice'),
      value: 'multiple_choice',
      id: 'multiple_choice',
    },
  ];

  const handleError = () => {
    toast.error(tCourses('formValidation.createCourseError'));
  };

  return (
    <Modal
      title={tCourses('create.youtube')}
      open={open}
      onClose={onClose}
      validationSchema={createYoutubeCourseSchema}
      onSubmit={onSubmit}
      onError={handleError}
      showSubmit
      defaultValues={{ language: locale, type: 'youtube_playlist' }}
      buttons={[
        {
          label: tCourses('form.cancel'),
          type: 'button',
          onClick: onClose,
          variant: 'outline',
        },
        { label: tCourses('form.create'), type: 'submit' },
      ]}
    >
      {form => {
        return (
          <>
            <FormFieldWithLabel name="playlist_link" label={tCourses('form.playlistLink')} required>
              <Input />
            </FormFieldWithLabel>
            <FormFieldWithLabel name="language" label={tCourses('form.language')}>
              <SelectLanguage />
            </FormFieldWithLabel>
            <FormFieldWithLabel
              name="summary_included"
              label={tCourses('form.includeSummary')}
              render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
            />
            {form.watch('summary_included') && (
              <FormFieldWithLabel name="tone" label={tCourses('form.tone')}>
                <Selectbox options={toneOptions ?? []} />
              </FormFieldWithLabel>
            )}
            <FormFieldWithLabel
              name="quiz_included"
              label={tCourses('form.includeQuiz')}
              render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
            />
            {form.watch('quiz_included') && (
              <FormFieldWithLabel name="quiz_type" label={tCourses('form.quizType')}>
                <Selectbox options={quizOptions ?? []} />
              </FormFieldWithLabel>
            )}
            {form.watch('quiz_included') && (
              <FormFieldWithLabel name="number_of_question" label={tCourses('form.numberOfQuestion')}>
                <InputNumber />
              </FormFieldWithLabel>
            )}
          </>
        );
      }}
    </Modal>
  );
}
