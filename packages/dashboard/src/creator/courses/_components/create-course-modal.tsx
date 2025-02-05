import { type ICreateBaseCourse, createBaseCourseSchema } from '@oe/api/schemas/courses/createCourseSchema';
import { Modal } from '@oe/ui/components/modal';
import { RichTextEditor } from '@oe/ui/components/rich-text';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';

export default function CreateCourseModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ICreateBaseCourse) => Promise<void>;
}) {
  const tCourses = useTranslations('courses');

  const handleError = () => {
    toast.error(tCourses('formValidation.createCourseError'));
  };

  return (
    <Modal
      title={tCourses('create.title')}
      open={open}
      onClose={onClose}
      validationSchema={createBaseCourseSchema}
      onSubmit={onSubmit}
      onError={handleError}
      showSubmit
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
      {() => (
        <>
          <FormFieldWithLabel name="name" label={tCourses('form.name')} required>
            <Input />
          </FormFieldWithLabel>
          <FormFieldWithLabel name="description" label={tCourses('form.description')} required>
            <RichTextEditor />
          </FormFieldWithLabel>
        </>
      )}
    </Modal>
  );
}
