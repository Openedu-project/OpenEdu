import { type ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';

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

  const setCurrentLessonAndSection = useCallback((sectionUid: string, lessonUid: string) => {
    setCurrentSection(sectionUid);
    setCurrentLesson(lessonUid);
  }, []);

  const value = useMemo(
    () => ({
      currentSection,
      currentLesson,
      setCurrentLesson: setCurrentLessonAndSection,
    }),
    [currentSection, currentLesson, setCurrentLessonAndSection]
  );

  return <LessonContext.Provider value={value}>{children}</LessonContext.Provider>;
}

export function useCurrentLesson() {
  const context = useContext(LessonContext);
  if (context === undefined) {
    throw new Error('useCurrentLesson must be used within a LessonProvider');
  }
  return context;
}
