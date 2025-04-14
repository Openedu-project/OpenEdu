import type { IQuizSubmissionResponse } from '@oe/api';
import { useTranslations } from 'next-intl';

const DetailScore = ({
  title,
  amount,
}: {
  title: string;
  amount: string | number;
}) => {
  return (
    <div className="flex max-w-60 flex-col items-center justify-center gap-[2px] rounded-[20px] border border-primary/50 px-4 py-2 text-foreground/60">
      <span className="giant-iheading-semibold16 text-center capitalize">{title}</span>
      <span className="giant-iheading-semibold20 md:giant-iheading-semibold28 text-primary">{amount}</span>
    </div>
  );
};

const QuizResultGrid = ({ data }: { data: IQuizSubmissionResponse }) => {
  const tQuizResult = useTranslations('learningPage.quiz.quizResult');

  const QUIZ_RESULT_ITEMS = (data: IQuizSubmissionResponse) => [
    {
      id: 'yourScore',
      title: tQuizResult('yourScore'),
      amount: data.archived_points,
    },
    {
      id: 'correctAnswer',
      title: tQuizResult('correctAnswer'),
      amount: `${data.num_correct_answers} / ${data.num_questions}`,
    },
    {
      id: 'highestStreak',
      title: tQuizResult('highestStreak'),
      amount: data.highest_streak,
    },
    {
      id: 'highestScore',
      title: tQuizResult('highestScore'),
      amount: data.highest_points_on_single_question,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {QUIZ_RESULT_ITEMS(data).map(item => (
        <DetailScore key={item.id} title={item.title} amount={item.amount} />
      ))}
    </div>
  );
};

export { QuizResultGrid };
