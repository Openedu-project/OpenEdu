'use client';
import { AccordionQuiz } from '../quiz-editor';

import type { IQuizItemResponse } from '@oe/api';
import { Uploader } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { useWatch } from 'react-hook-form';

export function VideoBlockContent({ order }: { order: number }) {
  const quizzes: IQuizItemResponse[] = useWatch({
    name: `contents.${order}.quizzes`,
  });

  return (
    <div className="space-y-4 rounded-lg bg-muted/50 p-2">
      <FormFieldWithLabel name={`contents.${order}.files`} showErrorMessage>
        <Uploader
          accept="video/*"
          listType="text"
          multiple
          maxSizeBytes={1024 * 1024 * 5120} // 5GB
        />
      </FormFieldWithLabel>

      {quizzes && quizzes.length > 0 && <AccordionQuiz quizzes={quizzes} order={order} />}
    </div>
  );
}
