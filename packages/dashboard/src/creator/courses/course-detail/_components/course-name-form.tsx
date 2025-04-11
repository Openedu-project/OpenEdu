import { updateCourseService } from '@oe/api';
import type { ICourse } from '@oe/api';
import { useGetCourseById } from '@oe/api';
import { courseNameSchema } from '@oe/api';
import type { ICourseNameSchema } from '@oe/api';
import { DashboardHeaderCard } from '@oe/ui';
import { Button } from '@oe/ui';
import { FormWrapper } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { Input } from '@oe/ui';
import { Check, PencilLine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { COURSE_DETAIL_FORM_IDS } from '../_utils/constants';

export function CourseNameForm() {
  const tCourse = useTranslations('course');
  const { courseId } = useParams<{ courseId: string }>();
  const { course, mutateCourse } = useGetCourseById(courseId);
  const [edit, setEdit] = useState(false);

  const handleSubmit = async (data: ICourseNameSchema) => {
    if (!course) {
      return;
    }
    if (course.name === data.name) {
      setEdit(false);
      return;
    }

    await updateCourseService(undefined, {
      ...course,
      name: data.name,
      thumbnail_id: course?.thumbnail?.id,
    });
    mutateCourse();
    setEdit(false);
  };

  return edit ? (
    <FormWrapper
      id={COURSE_DETAIL_FORM_IDS.courseName}
      schema={courseNameSchema}
      useFormProps={{
        defaultValues: course as ICourse,
      }}
      className="flex flex-1 items-center gap-2 space-y-0"
      onSubmit={handleSubmit}
    >
      {({ loading, form }) => {
        const courseName = form.watch('name') || tCourse('common.noName');

        return (
          <>
            <DashboardHeaderCard.UpdateBreadcrumb index={1} label={courseName} />

            <FormFieldWithLabel name="name" className="flex-1 space-y-0">
              <Input
                disabled={loading}
                autoFocus
                className="h-8 rounded-none border-0 border-b-2 p-0 text-2xl focus:border-primary focus:border-b-2 focus-visible:ring-0"
              />
            </FormFieldWithLabel>
            <Button
              type="submit"
              className="flex h-8 w-8 items-center gap-2 border-primary p-0"
              // variant="outline"
              disabled={loading}
              loading={loading}
            >
              <Check className="h-4 w-4" />
              {/* Save */}
            </Button>
          </>
        );
      }}
    </FormWrapper>
  ) : (
    <div className="flex items-center gap-2">
      <h1 className="giant-iheading-semibold20 mb-0">{course?.name}</h1>
      <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setEdit(true)}>
        <PencilLine className="h-4 w-4" />
      </Button>
    </div>
  );
}
