import { type ICreateBaseCourse, createBaseCourseSchema } from '@oe/api';
import { Textarea, toast } from '@oe/ui';
import { Modal } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { Input } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { MAX_CHARACTERS } from '../course-detail/_utils/constants';

export function CreateCourseModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ICreateBaseCourse) => Promise<void>;
}) {
  const tCourse = useTranslations('course');

    const [contentLength, setContentLength] = useState<number>(0);

  const handleError = () => {
    toast.error(
      tCourse('common.toast.createError', {
        item: tCourse('common.courseTitle'),
      })
    );
  };

  return (
    <Modal
      title={tCourse("create.title")}
      open={open}
      onClose={onClose}
      validationSchema={createBaseCourseSchema}
      onSubmit={onSubmit}
      onError={handleError}
      showSubmit
      buttons={[
        {
          label: tCourse("common.actions.cancel"),
          type: "button",
          onClick: onClose,
          variant: "outline",
        },
        { label: tCourse("common.actions.create"), type: "submit" },
      ]}
    >
      {() => (
        <>
          <FormFieldWithLabel
            name="name"
            label={tCourse("create.form.name")}
            required
          >
            <Input />
          </FormFieldWithLabel>
          <FormFieldWithLabel
            name="short_desc"
            label={
              <div className='flex w-full justify-between'>
                <div className="flex gap-1">
                  <span>{tCourse('create.form.short_desc')}</span>
                  <span className="text-red-500">*</span>
                </div>
                <span className="text-muted-foreground text-xs">
                  {contentLength}/{MAX_CHARACTERS} {tCourse("information.sections.short_desc.characters")}
                </span>
              </div>
            }
            // required
          >
            <Textarea
              onChange={(e) => setContentLength(e.target.value.length)}
            />
          </FormFieldWithLabel>
        </>
      )}
    </Modal>
  );
}
