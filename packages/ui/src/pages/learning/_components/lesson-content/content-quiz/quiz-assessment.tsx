import { useTranslations } from 'next-intl';

import type { IQuizSettings } from '@oe/api';
import type { ICurrentQuestion } from '@oe/api';
import { FormWrapper } from '#components/form-wrapper';
import { Image } from '#components/image';
import { Button } from '#shadcn/button';
import { Progress } from '#shadcn/progress';
import { ScrollArea } from '#shadcn/scroll-area';
import type { TAnswerInput } from '../_types/types';
import { QuizAnswers, quizAnswerSchema } from './quiz-answers';
import { QuizHeader } from './quiz-header';

interface IQuestionProps {
  data: ICurrentQuestion;
  submissionId?: string;
  numQuestion: number;
  settings?: IQuizSettings;
  quizStartAt: number;
  onSubmitAnswer: (value: TAnswerInput) => void;
}

const QuizAssessment = ({ numQuestion, data, settings, quizStartAt, onSubmitAnswer }: IQuestionProps) => {
  const tContentQuiz = useTranslations('learningPage.quiz');

  const { question, has_next_question, current_question_index, start_at } = data;

  return (
    <div className="flex h-full max-h-full max-w-full flex-col lg:flex-row">
      <div className="relative z-10 flex h-fit max-h-[50%] w-full flex-col rounded-2xl bg-muted p-4 lg:h-full lg:max-h-full lg:w-1/2 lg:p-6">
        <QuizHeader
          timeLimit={settings?.time_limit_type === 'per_question' ? question.settings.time_limit : settings?.time_limit}
          startAt={settings?.time_limit_type === 'per_question' ? start_at : quizStartAt}
          curQuesIndex={current_question_index}
          numQuestion={numQuestion}
          timeLimitType={settings?.time_limit_type ?? 'overall'}
          onTimeUp={() => settings?.time_limit_enabled && onSubmitAnswer({ answers: '' })}
          timeLimitEnabled={settings?.time_limit_enabled}
        />

        <Progress className="mt-3 mb-4 h-1" value={(current_question_index / numQuestion) * 100} />

        <div className="scrollbar h-fit w-full flex-1 flex-col items-center justify-center gap-4 overflow-y-auto lg:flex lg:gap-6">
          <div className="h-fit w-full rounded-2xl bg-background p-4 text-center shadow-shadow-6 md:p-6">
            <span className="mcaption-regular16 h-full">
              {tContentQuiz('questionNum', {
                questionNum: current_question_index,
              })}
            </span>
            <div
              className="rich-text mcaption-semibold16 h-full text-current"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{
                __html: question?.title as string | TrustedHTML,
              }}
            />
          </div>

          {question?.files?.length > 0 && (
            <div className="aspect-video h-full max-h-[174px] w-full rounded-2xl bg-background p-3 text-center shadow-shadow-6">
              <Image
                src={question?.files[0]?.url ?? ''}
                alt={question?.files[0]?.name ?? ''}
                width={361}
                height={174}
                noContainer
                className="aspect-video max-w-full"
              />
            </div>
          )}
        </div>
      </div>

      <ScrollArea className="mt-auto mb-auto flex h-full max-h-full w-full flex-1 flex-col items-center justify-center p-6 lg:w-1/2 [&>[data-radix-scroll-area-viewport]>div]:h-full">
        {question?.items?.length > 0 && (
          <FormWrapper
            id={`quiz_ans_${question.id}`}
            schema={quizAnswerSchema}
            useFormProps={{
              defaultValues: {
                answers: question.type === 'single_choice' ? '' : [],
              },
            }}
            onSubmit={values => {
              onSubmitAnswer(values as TAnswerInput);
            }}
            className="flex h-full w-full flex-col justify-center"
          >
            {({ loading }) => (
              <>
                <QuizAnswers questionType={question.type} items={question.items} />
                <Button className="mx-auto mt-4 w-fit md:mt-6" type="submit" loading={loading}>
                  {has_next_question ? tContentQuiz('next') : tContentQuiz('finish')}
                </Button>
              </>
            )}
          </FormWrapper>
        )}
      </ScrollArea>
    </div>
  );
};

export { QuizAssessment };
