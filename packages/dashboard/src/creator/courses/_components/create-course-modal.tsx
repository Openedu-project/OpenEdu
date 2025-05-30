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
  const tCourse = useTranslations('course');

  const handleError = () => {
    toast.error(
      tCourse('common.toast.createError', {
        item: tCourse('common.courseTitle'),
      })
    );
  };

  return (
    <Modal
      title={tCourse('create.title')}
      open={open}
      onClose={onClose}
      validationSchema={createBaseCourseSchema}
      onSubmit={onSubmit}
      onError={handleError}
      showSubmit
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
      {() => (
        <>
          <FormFieldWithLabel name="name" label={tCourse('create.form.name')} required>
            <Input />
          </FormFieldWithLabel>
          <FormFieldWithLabel name="description" label={tCourse('create.form.description')} required>
            <RichTextEditor />
          </FormFieldWithLabel>
        </>
      )}
    </Modal>
  );
}
