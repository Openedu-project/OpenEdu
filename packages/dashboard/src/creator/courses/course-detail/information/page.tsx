'use client';
import { useGetCourseById } from '@oe/api/hooks/useCourse';
import { type ICreateCourse, courseFormSchema } from '@oe/api/schemas/courses/createCourseSchema';
import { FormWrapper } from '@oe/ui/components/form-wrapper';
import { useParams } from 'next/navigation';
import { COURSE_DETAIL_FORM_IDS } from '../_utils/constants';
import Category from './category';
import Description from './description';
import Level from './level';
import Outcomes from './outcomes';
import PreviewVideos from './preview-videos';
import Referrence from './referrence';
import SupportChannels from './support-channels';
import Thumbnail from './thumbnail';

export default function CourseDetailInformationPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { course } = useGetCourseById(courseId);

  return (
    <div className="scrollbar mx-auto h-full max-w-[900px] overflow-auto px-1 py-4">
      <FormWrapper
        id={COURSE_DETAIL_FORM_IDS.information}
        schema={courseFormSchema}
        useFormProps={{
          defaultValues: course as ICreateCourse,
        }}
      >
        <Description />
        <Outcomes />
        <Thumbnail />
        <PreviewVideos />
        <Referrence />
        <Category />
        <Level />
        <SupportChannels />
      </FormWrapper>
    </div>
  );
}
