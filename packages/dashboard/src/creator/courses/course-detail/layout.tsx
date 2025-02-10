// "use client";
// import { updateCourseService } from "@oe/api/services/course";
// import type { ICourse } from "@oe/api/types/course/course";
// import {
//   FormNestedProvider,
//   type INestedFormsValues,
// } from "@oe/ui/components/form-wrapper";
import type { ReactNode } from 'react';
import { CourseDetailHeader } from './_components/course-detail-header';
// import { useCourse } from "./_hooks/useCourse";
// import { COURSE_DETAIL_FORM_IDS } from "./_utils/constants";

export function CourseDetailLayout({ children }: { children: ReactNode }) {
  // const { courseOutline, courseLoading, mutateCourseOutline } = useCourse();

  // biome-ignore lint/suspicious/useAwait: <explanation>
  // const handleSubmit = async (values: INestedFormsValues) => {
  //   console.log("submit", values);

  //   // if (!courseOutline) {
  //   //   return;
  //   // }

  //   // let coursePayload: ICourse = courseOutline;

  //   // if (
  //   //   values[COURSE_DETAIL_FORM_IDS.courseName] &&
  //   //   values[COURSE_DETAIL_FORM_IDS.information]
  //   // ) {
  //   //   coursePayload = {
  //   //     ...courseOutline,
  //   //     ...values[COURSE_DETAIL_FORM_IDS.information],
  //   //     name: values[COURSE_DETAIL_FORM_IDS.courseName]?.name,
  //   //   };
  //   // } else if (
  //   //   values[COURSE_DETAIL_FORM_IDS.courseName]?.name &&
  //   //   values[COURSE_DETAIL_FORM_IDS.courseName]?.name !== courseOutline?.name
  //   // ) {
  //   //   coursePayload = {
  //   //     ...courseOutline,
  //   //     name: values[COURSE_DETAIL_FORM_IDS.courseName]?.name,
  //   //   } as ICourse;
  //   // } else if (values[COURSE_DETAIL_FORM_IDS.information]) {
  //   //   coursePayload = {
  //   //     ...courseOutline,
  //   //     ...values[COURSE_DETAIL_FORM_IDS.information],
  //   //   } as ICourse;
  //   // }

  //   // const transformedCoursePayload = {
  //   //   ...coursePayload,
  //   //   thumbnail_id: coursePayload.thumbnail?.id,
  //   //   medias:
  //   //     coursePayload.props?.preview_lessons?.map((item) => ({
  //   //       id: item.file_id ?? "",
  //   //     })) ?? [],
  //   // };

  //   // const updatedCourseOutline = await updateCourseService(
  //   //   undefined,
  //   //   transformedCoursePayload
  //   // );
  //   // mutateCourseOutline(updatedCourseOutline);
  // };

  // const handleChange = (values: INestedFormsValues) => {
  //   console.log("change", values);
  // };

  return (
    // <FormNestedProvider
    //   onSubmit={handleSubmit}
    //   className="flex h-full flex-col"
    //   onChange={handleChange}
    // >
    // </FormNestedProvider>
    <div className="flex h-full flex-col">
      <CourseDetailHeader />
      <div className="flex-1 overflow-hidden rounded">{children}</div>
    </div>
  );
}
