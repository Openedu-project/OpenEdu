import { createStore } from '@oe/core';
import { COURSES_FIRST_PER_PAGE } from './_constants';

type FeaturedContentsStore = {
  totalCourses?: number;
  setTotalCourses: (count: number) => void;
  resetFeaturedContents: () => void;
};

export const useFeaturedContentsStore = createStore<FeaturedContentsStore>(set => {
  return {
    totalCourses: COURSES_FIRST_PER_PAGE,
    setTotalCourses: (count: number) => set({ totalCourses: count }),
    resetFeaturedContents: () =>
      set({
        totalCourses: COURSES_FIRST_PER_PAGE,
      }),
  };
});
