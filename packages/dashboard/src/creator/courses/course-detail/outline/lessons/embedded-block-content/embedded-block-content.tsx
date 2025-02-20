import { AccordionQuiz } from '../quiz-editor';

import type { IQuizItemResponse } from '@oe/api/types/course/quiz';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { useWatch } from 'react-hook-form';

export function EmbeddedBlockContent({ order }: { order: number }) {
  const quizzes: IQuizItemResponse[] = useWatch({
    name: `contents.${order}.quizzes`,
  });

  return (
    <div className="space-y-4 rounded-lg bg-muted/50 p-2">
      <FormFieldWithLabel name={`contents.${order}.content`} showErrorMessage>
        <Input type="text" placeholder="Enter embed video URL" />
      </FormFieldWithLabel>

      {quizzes && quizzes.length > 0 && <AccordionQuiz quizzes={quizzes} order={order} />}
    </div>
  );
}
