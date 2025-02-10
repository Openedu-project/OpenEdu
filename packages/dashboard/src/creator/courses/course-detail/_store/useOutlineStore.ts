import type { ILesson, ILessonContent, ISection, ISegment } from '@oe/api/types/course/segment';
import { createStore } from '@oe/core/store';
import { uniqueID } from '@oe/core/utils/unique';

interface OutlineState {
  // courseOutline: ICourseOutline;
  // setCourseOutline: (courseOutline: ICourseOutline) => void;
  segments: ISegment[];
  setSegments: (segments: ISegment[]) => void;

  sections: ISection[];
  setSections: (sections: ISection[]) => void;
  // Drawer state
  openSectionDrawer: boolean;
  setOpenSectionDrawer: (open: boolean) => void;

  // Active states
  activeSegment?: ISegment;
  setActiveSegment: (segment: ISegment) => void;
  activeSection?: ISection;
  setActiveSection: (section: ISection) => void;
  activeLesson?: ILesson;
  setActiveLesson: (lesson?: ILesson) => void;
  activeLessons: ILesson[];
  setActiveLessons: (lessons: ILesson[]) => void;
  activeLessonContents: ILessonContent[];
  setActiveLessonContents: (contents: ILessonContent[]) => void;
  activeLessonContent?: ILessonContent;
  setActiveLessonContent: (content?: ILessonContent) => void;

  // Helper methods
  addSegment: () => void;
  updateSegment: (segmentId: string, data: ISegment) => void;
  removeSegment: (segmentId: string) => void;

  addLesson: (segmentId: string) => void;
  updateLesson: (segmentId: string, lessonId: string, data: ILesson) => void;
  removeLesson: (segmentId: string, lessonId: string) => void;

  addLessonContent: (lessonId: string) => void;
  updateLessonContent: (lessonId: string, contentId: string, data: ILessonContent) => void;
  removeLessonContent: (lessonId: string, contentId: string) => void;
}

export const defaultLessonContent: ILessonContent = {
  id: `lesson-content-${uniqueID()}`,
  type: 'text',
  title: 'New content',
  status: 'draft',
  content: '',
  free: false,
  order: 1,
  note: '',
  duration: 0,
  files: [],
};

export const useOutlineStore = createStore<OutlineState>((set, get) => ({
  // courseOutline: {} as ICourseOutline,
  // setCourseOutline: courseOutline => set({ courseOutline }),
  segments: [] as ISegment[],
  setSegments: segments => set({ segments }),

  sections: [] as ISection[],
  setSections: sections => set({ sections }),

  openSectionDrawer: false,
  setOpenSectionDrawer: open => set({ openSectionDrawer: open }),

  activeSegment: undefined,
  setActiveSegment: segment => set({ activeSegment: segment }),

  activeSection: undefined,
  setActiveSection: section => set({ activeSection: section }),

  activeLesson: undefined,
  setActiveLesson: lesson => set({ activeLesson: lesson }),
  // setActiveLesson: lesson => {
  //   if (!lesson) {
  //     set({
  //       activeLesson: undefined,
  //       activeLessonContents: [],
  //       activeLessonContent: undefined,
  //     });
  //     return;
  //   }

  //   // Nếu lesson không có contents, tạo content mặc định
  //   const contents =
  //     (lesson.contents?.length ?? 0) > 0 ? lesson.contents : ([{ ...defaultLessonContent }] as ILessonContent[]);

  //   set({
  //     activeLesson: {
  //       ...lesson,
  //       contents,
  //     },
  //     activeLessonContents: contents as ILessonContent[],
  //     activeLessonContent: contents?.[0] as ILessonContent,
  //   });
  // },

  activeLessons: [],
  setActiveLessons: lessons => set({ activeLessons: lessons }),

  activeLessonContents: [defaultLessonContent],
  setActiveLessonContents: contents => set({ activeLessonContents: contents }),

  activeLessonContent: defaultLessonContent,
  setActiveLessonContent: content => set({ activeLessonContent: content }),

  // Helper methods for segments
  addSegment: () => {
    const { segments } = get();
    const newSegment: Partial<ISegment> = {
      id: `segment-${uniqueID()}`,
      title: 'New segment',
      lessons: [],
      order: (segments.length || 0) + 1,
      free: false,
      status: 'draft',
    };

    const newActiveLessons = newSegment.lessons || [];
    const newActiveLesson = newActiveLessons[0];
    const newActiveLessonContents = newActiveLesson?.contents || [defaultLessonContent];
    const newActiveLessonContent = newActiveLessonContents[0];

    set({
      segments: [...segments, newSegment as ISegment],
      activeSegment: newSegment as ISegment,
      activeLessons: newActiveLessons,
      activeLesson: newActiveLesson,
      activeLessonContents: newActiveLessonContents,
      activeLessonContent: newActiveLessonContent,
    });
  },

  updateSegment: (segmentId, data) => {
    const { segments } = get();
    const newActiveLessons = data.lessons || [];
    const newActiveLesson = newActiveLessons[0];
    const newActiveLessonContents = newActiveLesson?.contents || [defaultLessonContent];
    const newActiveLessonContent = newActiveLessonContents[0];

    set({
      segments: segments.map(segment => (segment.id === segmentId ? { ...segment, ...data } : segment)) as ISegment[],
      activeSegment: data,
      activeLessons: newActiveLessons,
      activeLesson: newActiveLesson,
      activeLessonContents: newActiveLessonContents,
      activeLessonContent: newActiveLessonContent,
    });
  },

  removeSegment: segmentId => {
    const { segments } = get();

    const newSegments = segments.filter(segment => segment.id !== segmentId);

    const newActiveSegment = newSegments[newSegments.length - 1];

    set({
      segments: newSegments,
      activeSegment: newActiveSegment,
      activeLessons: newActiveSegment?.lessons || [],
    });
  },

  // Helper methods for lessons
  addLesson: segmentId => {
    const { segments } = get();
    const newLesson: ILesson = {
      id: `lesson-${uniqueID()}`,
      title: 'New lesson',
      status: 'draft',
      contents: [{ ...defaultLessonContent }], // Thêm content mặc định
    } as ILesson;

    const newActiveSegment = segments.find(segment => segment.id === segmentId);
    if (newActiveSegment?.lessons) {
      newActiveSegment.lessons = [...newActiveSegment.lessons, newLesson];
    }

    const newSegments = segments.map(segment => (segment.id === segmentId ? newActiveSegment : segment));

    set({
      segments: newSegments as ISegment[],
      activeSegment: newActiveSegment,
      activeLesson: newLesson,
      activeLessons: newActiveSegment?.lessons || [],
      activeLessonContents: newLesson.contents || [],
      activeLessonContent: newLesson.contents?.[newLesson.contents?.length - 1],
    });
  },

  updateLesson: (segmentId, lessonId, data) => {
    const { segments, activeLessonContent } = get();
    let newActiveSegment: ISegment | undefined;
    let newActiveLesson: ILesson | undefined;

    const newSegments = segments.map(segment => {
      if (segment.id === segmentId) {
        const lessons = segment.lessons?.map(lesson => {
          if (lesson.id === lessonId) {
            // Giữ nguyên contents nếu không được cập nhật
            newActiveLesson = {
              ...lesson,
              ...data,
              contents: data.contents || lesson.contents || [{ ...defaultLessonContent }],
            };
            return newActiveLesson;
          }
          return lesson;
        });
        newActiveSegment = { ...segment, lessons: lessons || [] };
        return newActiveSegment;
      }
      return segment;
    });

    set({
      segments: newSegments as ISegment[],
      activeSegment: newActiveSegment,
      activeLessons: newActiveSegment?.lessons || [],
      activeLesson: newActiveLesson,
      activeLessonContents: newActiveLesson?.contents || [],
      activeLessonContent: activeLessonContent || newActiveLesson?.contents?.[0],
    });
  },

  removeLesson: (segmentId, lessonId) => {
    const { segments } = get();
    const newActiveSegment = segments.find(segment => segment.id === segmentId);
    if (newActiveSegment?.lessons) {
      newActiveSegment.lessons = newActiveSegment.lessons.filter(lesson => lesson.id !== lessonId);
    }
    const newSegments = segments.map(segment => (segment.id === segmentId ? newActiveSegment : segment));
    const newActiveLesson = newActiveSegment?.lessons?.[newActiveSegment.lessons.length - 1];
    const newActiveLessonContent = newActiveLesson?.contents?.[newActiveLesson.contents.length - 1];

    set({
      segments: newSegments as ISegment[],
      activeLesson: newActiveLesson,
      activeSegment: newActiveSegment,
      activeLessons: newActiveSegment?.lessons || [],
      activeLessonContents: newActiveLesson?.contents || [],
      activeLessonContent: newActiveLessonContent,
    });
  },

  addLessonContent: lessonId => {
    const { segments, activeLessonContents } = get();
    const newLessonContent: ILessonContent = {
      ...defaultLessonContent,
      id: `lesson-content-${uniqueID()}`,
      order: (activeLessonContents.length || 0) + 1,
    };

    let newActiveSegment: ISegment | undefined;
    let newActiveLesson: ILesson | undefined;

    const newSegments = segments.map(segment => {
      const lessons = segment.lessons?.map(lesson => {
        if (lesson.id === lessonId) {
          const contents = [...(lesson.contents || [defaultLessonContent]), newLessonContent];
          newActiveLesson = { ...lesson, contents };
          newActiveSegment = segment;
          return newActiveLesson;
        }
        return lesson;
      });
      return { ...segment, lessons };
    });

    set({
      segments: newSegments as ISegment[],
      activeSegment: newActiveSegment,
      activeLesson: newActiveLesson,
      activeLessons: newActiveSegment?.lessons || [],
      activeLessonContents: newActiveLesson?.contents || [],
      activeLessonContent: newLessonContent,
    });
  },

  updateLessonContent: (lessonId, contentId, data) => {
    const { segments, activeLessonContents } = get();
    let newActiveSegment: ISegment | undefined;
    let newActiveLesson: ILesson | undefined;

    const newSegments = segments.map(segment => {
      const lessons = segment.lessons?.map(lesson => {
        if (lesson.id === lessonId) {
          const contents = (lesson.contents || [defaultLessonContent])?.map(content =>
            content.id === contentId ? { ...content, ...data } : content
          );
          newActiveLesson = { ...lesson, contents };
          newActiveSegment = segment;
          return newActiveLesson;
        }
        return lesson;
      });
      return { ...segment, lessons };
    });

    const newActiveLessonContents = activeLessonContents.map(content =>
      content.id === contentId ? { ...content, ...data } : content
    );

    set({
      segments: newSegments as ISegment[],
      activeSegment: newActiveSegment,
      activeLesson: newActiveLesson,
      activeLessons: newActiveSegment?.lessons || [],
      activeLessonContents: newActiveLessonContents,
      activeLessonContent: data as ILessonContent,
    });
  },

  removeLessonContent: (lessonId, contentId) => {
    const { segments, activeLessonContents } = get();

    // Không cho phép xóa nếu chỉ còn 1 content
    if (activeLessonContents.length <= 1) {
      return;
    }

    let newActiveSegment: ISegment | undefined;
    let newActiveLesson: ILesson | undefined;

    const newSegments = segments.map(segment => {
      const lessons = segment.lessons?.map(lesson => {
        if (lesson.id === lessonId) {
          const contents = lesson.contents?.filter(content => content.id !== contentId);
          newActiveLesson = { ...lesson, contents };
          newActiveSegment = segment;
          return newActiveLesson;
        }
        return lesson;
      });
      return { ...segment, lessons };
    });

    const newContents = activeLessonContents.filter(content => content.id !== contentId);

    set({
      segments: newSegments as ISegment[],
      activeSegment: newActiveSegment,
      activeLesson: newActiveLesson,
      activeLessons: newActiveSegment?.lessons || [],
      activeLessonContents: newContents,
      activeLessonContent: newContents[newContents.length - 1],
    });
  },
}));
