'use client';
import { AccordionQuiz } from '../quiz-editor';

import type { IQuizItemResponse } from '@oe/api';
import { RichTextEditor } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useWatch } from 'react-hook-form';

export function TextBlockContent({ order }: { order: number }) {
  const tCourseLesson = useTranslations('course.outline.lesson');
  const quizzes: IQuizItemResponse[] = useWatch({
    name: `contents.${order}.quizzes`,
  });

  return (
    <div className="space-y-4 rounded-lg bg-muted/50 p-2">
      <FormFieldWithLabel name={`contents.${order}.content`} showErrorMessage>
        <RichTextEditor
          className="h-full bg-background shadow-xs"
          menuBarClassName="bg-background rounded-t-md"
          maxHeight="100%"
          placeholder={tCourseLesson('content.textEditor.placeholder')}
        />
      </FormFieldWithLabel>

      {quizzes && quizzes.length > 0 && <AccordionQuiz quizzes={quizzes} order={order} />}
    </div>
  );
}
