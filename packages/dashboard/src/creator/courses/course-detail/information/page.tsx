'use client';
import { updateCourseService } from '@oe/api';
import type { ICourse } from '@oe/api';
import { useGetCourseById } from '@oe/api';
import type { IFileResponse } from '@oe/api';
import { type ICreateCourse, courseFormSchema } from '@oe/api';
import { FormWrapper } from '@oe/ui';
import { toast } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { COURSE_DETAIL_FORM_IDS } from '../_utils/constants';
import { Category } from './category';
import { Description } from './description';
import { Header } from './header';
import { Level } from './level';
import { MarkAsCompleted } from './mark-as-completed';
import { Outcomes } from './outcomes';
import { PreviewVideos } from './preview-videos';
import { References } from './references';
import { ShortDescription } from './short-description';
import { SupportChannels } from './support-channels';
import { Thumbnail } from './thumbnail';

export function CourseDetailInformationPage() {
  const tCourse = useTranslations("course");
  const { courseId } = useParams<{ courseId: string }>();
  const { course, mutateCourse } = useGetCourseById(courseId);

  const handleSubmit = async (data: ICreateCourse) => {
    if (!course) {
      return;
    }
    const thumbnail =
      (data.thumbnail as IFileResponse) ?? course.thumbnail ?? null;
    await updateCourseService(undefined, {
      ...course,
      ...data,
      thumbnail,
      thumbnail_id: thumbnail?.id,
    } as ICourse);
    await mutateCourse();
    toast.success(
      tCourse("common.toast.updateSuccess", {
        item: tCourse("common.courseTitle"),
      })
    );
  };

  return (
    <div className="mx-auto h-full max-w-[900px] px-1 py-4">
      <FormWrapper
        id={COURSE_DETAIL_FORM_IDS.information}
        schema={courseFormSchema}
        useFormProps={{
          defaultValues: course as ICreateCourse,
        }}
        onSubmit={handleSubmit}
        onError={() => {
          toast.error(
            tCourse("common.toast.updateError", {
              item: tCourse("common.courseTitle"),
            })
          );
        }}
        className="flex h-full flex-col gap-4 space-y-0"
      >
        {({ loading, watch }) => {
          const shortDesc = watch('short_desc');
          return (
            <>
              <Header loading={loading} />
              <div className="scrollbar h-[calc(100vh-var(--header-course-detail-height))] space-y-4 overflow-auto">
                <ShortDescription initialValue={shortDesc} />
                <Description />
                <Outcomes />
                <Thumbnail />
                <PreviewVideos />
                <References />
                <Category />
                <Level />
                <SupportChannels />
                <MarkAsCompleted />
              </div>
            </>
          );
        }}
      </FormWrapper>
    </div>
  );
}
