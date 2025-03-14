"use client";

import type { ICourseOutline } from "@oe/api";
import type { ISectionLearningProgress } from "@oe/api";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";

// -------------------------------------------------------------------------
// 1. CourseContext
// -------------------------------------------------------------------------
type CourseContextType = {
  course: ICourseOutline | null;
};

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({
  children,
  course,
}: {
  children: ReactNode;
  course: ICourseOutline | null;
}) {
  const value = useMemo(() => ({ course }), [course]);

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
}

// -------------------------------------------------------------------------
// 2. ProgressContext
// -------------------------------------------------------------------------
type ProgressState = {
  sectionsProgressData: ISectionLearningProgress[];
};

type ProgressAction =
  | { type: "SET_PROGRESS_DATA"; payload: ISectionLearningProgress[] }
  | {
      type: "UPDATE_LESSON_STATUS";
      payload: { lessonId: string; status: string; progress: number };
    };

type ProgressContextType = {
  state: ProgressState;
  getLessonStatus: (lessonUid: string) => boolean;
  setSectionsProgressData: (data: ISectionLearningProgress[]) => void;
  updateLessonStatus: (
    lessonId: string,
    status: string,
    progress: number
  ) => void;
};

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

const progressReducer = (
  state: ProgressState,
  action: ProgressAction
): ProgressState => {
  switch (action.type) {
    case "SET_PROGRESS_DATA":
      return {
        ...state,
        sectionsProgressData: action.payload,
      };
    case "UPDATE_LESSON_STATUS": {
      const { lessonId, progress } = action.payload;

      const updatedSections = JSON.parse(
        JSON.stringify(state.sectionsProgressData)
      ) as ISectionLearningProgress[];

      for (const section of updatedSections) {
        if (!section.lessons) {
          continue;
        }

        const lessonIndex = section.lessons.findIndex(
          (l) => l.uid === lessonId
        );
        if (lessonIndex >= 0 && section.lessons[lessonIndex]) {
          section.lessons[lessonIndex].completed_percent = progress;
          break;
        }
      }

      return {
        ...state,
        sectionsProgressData: updatedSections,
      };
    }
    default:
      return state;
  }
};

export function ProgressProvider({
  children,
  initialProgressData,
}: {
  children: ReactNode;
  initialProgressData?: ISectionLearningProgress[];
}) {
  const [state, dispatch] = useReducer(progressReducer, {
    sectionsProgressData: initialProgressData || [],
  });

  const getLessonStatus = useCallback(
    (lessonUid: string): boolean => {
      if (state.sectionsProgressData.length === 0) {
        return false;
      }

      for (const section of state.sectionsProgressData) {
        if (!section.lessons) {
          continue;
        }

        const lesson = section.lessons.find((l) => l.uid === lessonUid);
        if (lesson) {
          return lesson.available ?? false;
        }
      }

      return false;
    },
    [state.sectionsProgressData]
  );

  const setSectionsProgressData = useCallback(
    (data: ISectionLearningProgress[]) => {
      dispatch({ type: "SET_PROGRESS_DATA", payload: data });
    },
    []
  );

  const updateLessonStatus = useCallback(
    (lessonId: string, status: string, progress: number) => {
      dispatch({
        type: "UPDATE_LESSON_STATUS",
        payload: { lessonId, status, progress },
      });
    },
    []
  );

  const value = useMemo(
    () => ({
      state,
      getLessonStatus,
      setSectionsProgressData,
      updateLessonStatus,
    }),
    [state, getLessonStatus, setSectionsProgressData, updateLessonStatus]
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}

// -------------------------------------------------------------------------
// 3. LessonContext - current lesson data
// -------------------------------------------------------------------------
type LessonContextType = {
  currentSection: string;
  currentLesson: string;
  setCurrentLesson: (sectionUid: string, lessonUid: string) => void;
};

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export function LessonProvider({
  children,
  initialSection,
  initialLesson,
}: {
  children: ReactNode;
  initialSection: string;
  initialLesson: string;
}) {
  const [currentSection, setCurrentSection] = useState(initialSection);
  const [currentLesson, setCurrentLesson] = useState(initialLesson);

  const setCurrentLessonAndSection = useCallback(
    (sectionUid: string, lessonUid: string) => {
      setCurrentSection(sectionUid);
      setCurrentLesson(lessonUid);
    },
    []
  );

  const value = useMemo(
    () => ({
      currentSection,
      currentLesson,
      setCurrentLesson: setCurrentLessonAndSection,
    }),
    [currentSection, currentLesson, setCurrentLessonAndSection]
  );

  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  );
}

export function useCurrentLesson() {
  const context = useContext(LessonContext);
  if (context === undefined) {
    throw new Error("useCurrentLesson must be used within a LessonProvider");
  }
  return context;
}

// -------------------------------------------------------------------------
// 4. Combined Provider for convenience
// -------------------------------------------------------------------------

export function LearningProviders({
  children,
  course,
  initialProgressData,
  initialSection,
  initialLesson,
}: {
  children: ReactNode;
  course: ICourseOutline | null;
  initialProgressData?: ISectionLearningProgress[];
  initialSection: string;
  initialLesson: string;
}) {
  return (
    <CourseProvider course={course}>
      <ProgressProvider initialProgressData={initialProgressData}>
        <LessonProvider
          initialSection={initialSection}
          initialLesson={initialLesson}
        >
          {children}
        </LessonProvider>
      </ProgressProvider>
    </CourseProvider>
  );
}
