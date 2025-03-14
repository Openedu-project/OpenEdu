"use client";
import type { ICourseOutline } from "@oe/api";
import type { ISectionLearningProgress } from "@oe/api";
import { type ReactNode, createContext, useContext, useMemo } from "react";
import { LessonProvider } from "./lesson-context";
import { ProgressProvider } from "./progress-context";
import { QuizProvider } from "./quiz-context";

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
        <QuizProvider>
          <LessonProvider
            initialSection={initialSection}
            initialLesson={initialLesson}
          >
            {children}
          </LessonProvider>
        </QuizProvider>
      </ProgressProvider>
    </CourseProvider>
  );
}
