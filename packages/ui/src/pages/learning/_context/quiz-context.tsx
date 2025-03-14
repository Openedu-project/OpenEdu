import type { IQuizSubmissionResponse } from '@oe/api/types/quiz';
import { type ReactNode, createContext, useContext, useMemo, useState } from 'react';

type QuizContextType = {
  quizResult: IQuizSubmissionResponse | undefined;
  setQuizResult: (result?: IQuizSubmissionResponse) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizResult, setQuizResult] = useState<IQuizSubmissionResponse | undefined>(undefined);

  const value = useMemo(
    () => ({
      quizResult,
      setQuizResult,
    }),
    [quizResult]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
