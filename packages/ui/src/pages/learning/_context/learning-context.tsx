'use client';
import type { ICourseOutline } from '@oe/api';
import type { ISectionLearningProgress } from '@oe/api';
import type { ReactNode } from 'react';
import { CourseProvider } from './course-context';
import { LessonProvider } from './lesson-context';
import { ProgressProvider } from './progress-context';
import { QuizProvider } from './quiz-context';

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
          <LessonProvider initialSection={initialSection} initialLesson={initialLesson}>
            {children}
          </LessonProvider>
        </QuizProvider>
      </ProgressProvider>
    </CourseProvider>
  );
}
