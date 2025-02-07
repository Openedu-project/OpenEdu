// import type { ISegment } from '@oe/api/types/course/segment';
// import type { ILesson, ISection } from '@oe/api/schemas/courseSchema';
import type { TLessonContent } from '@oe/api/types/course/basic';
import type { ILesson, ISegment } from '@oe/api/types/course/segment';
import { createStore } from '@oe/core/store';

interface OutlineState {
  openSectionDrawer: boolean;
  setOpenSectionDrawer: (open: boolean) => void;
  segments: ISegment[];
  setSegments: (segments: ISegment[]) => void;
  activeSegment?: ISegment;
  setActiveSegment: (segment: ISegment) => void;
  activeLessons: ILesson[];
  setActiveLessons: (lessons: ILesson[]) => void;
  activeLesson?: ILesson;
  setActiveLesson: (lesson?: ILesson) => void;
  activeLessonType: TLessonContent;
  setActiveLessonType: (type: TLessonContent) => void;

  // sections: Partial<ISegment>[];
  // activeSection: string | null;
  // activeLesson: string | null;
  // isAddingSectionMode: boolean;
  // setAddingSectionMode: (mode: boolean) => void;
  // setSections: (sections: ISegment[]) => void;
  // setActiveSection: (sectionId: string | null) => void;
  // setActiveLesson: (lessonId: string | null) => void;
  // updateSectionTitle: (sectionId: string, title: string) => void;
  // updateSectionStatus: (sectionId: string, status: TCourseStatus) => void;
  // addNewSection: (section: Partial<ISegment>) => void;
  // addNewLesson: (sectionId: string, lesson: Partial<ILesson>) => void;
}

export const useOutlineStore = createStore<OutlineState>(set => ({
  openSectionDrawer: false,
  setOpenSectionDrawer: open => set({ openSectionDrawer: open }),
  segments: [],
  setSegments: segments => set({ segments }),
  activeSegment: undefined,
  setActiveSegment: segment => set({ activeSegment: segment }),
  activeLessons: [],
  setActiveLessons: lessons => set({ activeLessons: lessons }),
  activeLesson: undefined,
  setActiveLesson: lesson => set({ activeLesson: lesson }),
  activeLessonType: 'text',
  setActiveLessonType: type => set({ activeLessonType: type }),

  // sections: [],
  // activeSection: null,
  // activeLesson: null,
  // isAddingSectionMode: false,
  // setAddingSectionMode: mode => set({ isAddingSectionMode: mode }),
  // setSections: sections => set({ sections }),
  // setActiveSection: sectionId => set({ activeSection: sectionId }),
  // setActiveLesson: lessonId => set({ activeLesson: lessonId }),
  // updateSectionTitle: (sectionId, title) => {
  //   const sections = [...get().sections];
  //   const sectionIndex = sections.findIndex(s => s.id === sectionId);
  //   if (sectionIndex > -1 && sections[sectionIndex]) {
  //     sections[sectionIndex] = { ...sections[sectionIndex], title };
  //     set({ sections });
  //   }
  // },
  // updateSectionStatus: (sectionId, status) => {
  //   const sections = [...get().sections];
  //   const sectionIndex = sections.findIndex(s => s.id === sectionId);
  //   if (sectionIndex > -1 && sections[sectionIndex]) {
  //     sections[sectionIndex] = { ...sections[sectionIndex], status };
  //     set({ sections });
  //   }
  // },
  // addNewSection: section => {
  //   set(state => ({
  //     sections: [...state.sections, { id: `temp-${Date.now()}`, ...section }],
  //   }));
  // },
  // addNewLesson: (sectionId, lesson) => {
  //   const sections = [...get().sections];
  //   const sectionIndex = sections.findIndex(s => s.id === sectionId);
  //   if (sectionIndex > -1 && sections[sectionIndex] && sections[sectionIndex].lessons) {
  //     sections[sectionIndex].lessons = [
  //       ...sections[sectionIndex].lessons,
  //       { id: `temp-${Date.now()}`, ...lesson } as ILesson,
  //     ];
  //     set({ sections });
  //   }
  // },
}));
