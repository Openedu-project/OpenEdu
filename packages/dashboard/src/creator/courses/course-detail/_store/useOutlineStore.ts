import type { ILessonContent } from '@oe/api';
import { createStore } from '@oe/core';

interface AccordionState {
  [contentId: string]: string[]; // contentId -> quizIds[]
}

interface OutlineState {
  activeLessonContent: ILessonContent | null;
  accordionStates: AccordionState;
  setActiveLessonContent: (content: ILessonContent | null) => void;
  setAccordionValues: (contentId: string, values: string[]) => void;
  initializeAccordionValues: (contentId: string, quizIds: string[]) => void;
}

export const useOutlineStore = createStore<OutlineState>(set => ({
  activeLessonContent: null,
  accordionStates: {},
  setActiveLessonContent: content => set({ activeLessonContent: content }),
  setAccordionValues: (contentId, values) =>
    set(state => ({
      accordionStates: {
        ...state.accordionStates,
        [contentId]: values,
      },
    })),
  initializeAccordionValues: (contentId, quizIds) =>
    set(state => ({
      accordionStates: {
        ...state.accordionStates,
        [contentId]: quizIds,
      },
    })),
}));
