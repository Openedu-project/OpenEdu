'use client';

import type { IQuizSubmissionAnswer, IQuizSubmissionQuestions } from '@oe/api';
import { CircleCheck, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ReactNode, useState } from 'react';
import { Button } from '#shadcn/button';
import { ScrollArea } from '#shadcn/scroll-area';
import { cn } from '#utils/cn';
import { NavigationButtons } from '../../navigate-button';

interface AnswerResultProps {
  onFinish: () => void;
  answers: IQuizSubmissionAnswer[];
}

interface ResultCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

const ResultCard = ({ title, children, className, icon }: ResultCardProps) => (
  <div className={cn('rounded-2xl border border-primary bg-white p-4 text-center shadow-shadow-3', className)}>
    {icon}
    <span className="mcaption-regular16 text-neutral-900">{title}</span>
    {children}
  </div>
);

const DetailAnswerResult = ({ onFinish, answers }: AnswerResultProps) => {
  const [quesIndex, setQuesIndex] = useState(0);
  const tQuizResult = useTranslations('learningPage.quiz.quizResult');

  const handleGetQuesAnswer = (type: 'prev' | 'next') => {
    if (type === 'prev') {
      setQuesIndex(prev => prev - 1);
    } else {
      setQuesIndex(prev => prev + 1);
    }
  };
  const currentAnswer = answers[quesIndex];
  if (!currentAnswer) {
    return null;
  }

  const { questions, answered_item_sets, correct } = currentAnswer;
  const { title, correct_item_sets, explanation } = questions as IQuizSubmissionQuestions;

  const correctItems = correct_item_sets[0];
  const answerItems = answered_item_sets?.[0];

  const statusIcon = correct ? (
    <CircleCheck className="absolute top-2 right-2" color="#33C639" />
  ) : (
    <Info className="absolute top-2 right-2" color="#FA0013" />
  );

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ScrollArea className="z-10 mx-auto mb-5 flex h-full max-h-[50dvh] w-[80%] flex-1 flex-col justify-center gap-4 md:max-w-[400px] md:px-3 [&>[data-radix-scroll-area-viewport]>div]:h-full">
        <div className="flex h-full flex-col justify-center space-y-4">
          <ResultCard title={tQuizResult('questionNum', { questionNum: quesIndex + 1 })}>
            <div
              className="rich-text mcaption-semibold16 text-content-basic-dark"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{
                __html: title as string | TrustedHTML,
              }}
            />
          </ResultCard>

          <ResultCard
            title={tQuizResult('answer')}
            className={cn('relative border-[2px]', correct ? 'border-green-500' : 'border-red-500')}
            icon={statusIcon}
          >
            {answerItems?.map(item => (
              <p key={item.id} className="mcaption-semibold16">
                {item.text}
              </p>
            ))}
          </ResultCard>

          <ResultCard title={tQuizResult('correctAnswer')}>
            {correctItems?.map(item => (
              <p key={item.id} className="mcaption-semibold16">
                {item.text}
              </p>
            ))}
            <p className="mcaption-regular12 mt-4">
              {tQuizResult('explanation')}: {explanation}
            </p>
          </ResultCard>
        </div>
      </ScrollArea>

      <Button onClick={onFinish}>{tQuizResult('finishQuiz')}</Button>

      {answers?.length > 0 ? (
        <NavigationButtons
          mode="quiz"
          currentIndex={quesIndex}
          totalItems={answers.length}
          onNavigate={handleGetQuesAnswer}
          t={tQuizResult}
        />
      ) : null}
    </div>
  );
};

export { DetailAnswerResult };
