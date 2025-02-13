import type { IApproval } from '@oe/api/types/approvals';
import type { ICourse } from '@oe/api/types/course/course';
import type { ICourseOrganizationRequestProps } from '@oe/api/types/course/org-request';
import { create } from 'zustand';

type CourseRequestStore = {
  selectedCourseRequest?: IApproval<ICourse, ICourseOrganizationRequestProps>;

  setSelectedCourseRequest: (approval: IApproval<ICourse, ICourseOrganizationRequestProps>) => void;

  reset: () => void;
};

export const useCourseRequestStore = create<CourseRequestStore>(set => {
  return {
    selectedCourseRequest: undefined,

    setSelectedCourseRequest: (selectedCourseRequest: IApproval<ICourse, ICourseOrganizationRequestProps>) =>
      set({ selectedCourseRequest }),

    reset: () =>
      set({
        selectedCourseRequest: undefined,
      }),
  };
});
