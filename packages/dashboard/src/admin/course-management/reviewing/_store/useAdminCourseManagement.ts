import type { ICourse } from '@oe/api';
import type { IApproval } from '@oe/api';
import type { ICourseOrganizationRequestProps } from '@oe/api';
import { createStore } from '@oe/core';

type CourseRequestStore = {
  selectedCourseRequest?: IApproval<ICourse, ICourseOrganizationRequestProps>;

  setSelectedCourseRequest: (approval: IApproval<ICourse, ICourseOrganizationRequestProps>) => void;

  reset: () => void;
};

export const useCourseRequestStore = createStore<CourseRequestStore>(set => {
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
