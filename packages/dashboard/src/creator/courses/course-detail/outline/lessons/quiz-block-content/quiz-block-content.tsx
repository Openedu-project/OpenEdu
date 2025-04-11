'use client';
import { AccordionQuiz } from '../quiz-editor';

import type { IQuizItemResponse } from '@oe/api';
import { Alert, AlertDescription, AlertTitle } from '@oe/ui';
import { CircleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useWatch } from 'react-hook-form';

export function QuizBlockContent({ order }: { order: number }) {
  const tCourse = useTranslations('course');
  const quizzes: IQuizItemResponse[] = useWatch({
    name: `contents.${order}.quizzes`,
  });

  return (
    <div className="space-y-4 rounded-lg bg-muted/50 p-2">
      <Alert className="flex gap-2 border-warning">
        <AlertTitle className="text-sm text-warning">
          <CircleAlert className="h-4 w-4" />
        </AlertTitle>
        <AlertDescription className="text-sm italic">{tCourse('outline.lesson.content.quiz.alert')}</AlertDescription>
      </Alert>
      {quizzes && quizzes.length > 0 && <AccordionQuiz quizzes={quizzes} order={order} />}
    </div>
  );
}
