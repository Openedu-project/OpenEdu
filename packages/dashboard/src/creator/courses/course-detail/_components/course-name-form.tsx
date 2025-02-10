import { useGetCourseById } from '@oe/api/hooks/useCourse';
import { updateCourseService } from '@oe/api/services/course';
import type { ICourse } from '@oe/api/types/course/course';
import { z } from '@oe/api/utils/zod';
import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { FormWrapper } from '@oe/ui/components/form-wrapper';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { Check, PencilLine } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { COURSE_DETAIL_FORM_IDS } from '../_utils/constants';

const courseNameSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

export default function CourseNameForm() {
  const { courseId } = useParams<{ courseId: string }>();
  const { course, mutateCourse } = useGetCourseById(courseId);
  const [edit, setEdit] = useState(false);

  const handleSubmit = async (data: z.infer<typeof courseNameSchema>) => {
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
        const courseName = form.watch('name') || 'Course Detail';

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
