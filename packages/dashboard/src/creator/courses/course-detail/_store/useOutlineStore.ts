import type { ILessonContent } from '@oe/api/types/course/segment';
import { createStore } from '@oe/core/store';

interface OutlineState {
  activeLessonContent: ILessonContent | null;
  setActiveLessonContent: (content: ILessonContent | null) => void;
}

export const useOutlineStore = createStore<OutlineState>(set => ({
  activeLessonContent: null,
  setActiveLessonContent: content => set({ activeLessonContent: content }),
}));
