import type { IQuizItemResponse } from '@oe/api';
import { MessageQuestion } from '@oe/assets';
import { convertSecondsToTimeString, convertTimeStringToSeconds } from '@oe/core';
import { useTranslations } from 'next-intl';
import { Button } from '#shadcn/button';
import type { Player } from './player';

interface IVieoQuizInforProp {
  player: Player;
  quizzes: IQuizItemResponse[];
}
const VideoQuizInfo = ({ player, quizzes }: IVieoQuizInforProp) => {
  const tQuiz = useTranslations('learningPage.quiz.videoQuiz');

  const triggerQuizConditions = () => {
    if (quizzes) {
      return quizzes
        .map(quiz => {
          return {
            id: quiz.id,
            timestamp: quiz.trigger_conditions?.timestamp
              ? convertTimeStringToSeconds(quiz.trigger_conditions.timestamp)
              : null,
          };
        })
        .filter(condition => condition.timestamp !== null);
    }
    return [];
  };
  const triggerConditions = triggerQuizConditions();

  const getCurrentTime = (item: { id: string; timestamp: number | null }) => {
    if (item?.timestamp && player) {
      const targetTime = item.timestamp;

      player.setCurrentTime(targetTime);
    }
  };

  const ButtonTiming = ({
    id,
    timestamp,
  }: {
    id: string;
    timestamp: number | null;
  }) => {
    return (
      <Button
        variant="link"
        className="mcaption-semibold12 md:mcaption-semibold16 ml-1 h-auto p-0 text-primary hover:text-primary"
        onClick={() => getCurrentTime({ id, timestamp })}
      >
        {convertSecondsToTimeString(timestamp ?? 0)}
      </Button>
    );
  };

  return (
    <div className="mx-2 mt-4 flex items-center gap-2 md:mx-0 md:mt-6 md:gap-3">
      <div className="flex items-center justify-center rounded-[12px] border border-foreground/20 p-2 md:p-[10px]">
        <MessageQuestion />
      </div>
      <div className="mcaption-semibold12 md:mcaption-semibold16">
        {tQuiz('des')}
        {triggerConditions.map((item, index) => (
          <div key={index} className="inline-block">
            {index >= 1 && tQuiz('and')}
            <ButtonTiming {...item} />
          </div>
        ))}
        .
        <br />
        {tQuiz('videoQuizRequire')}
      </div>
    </div>
  );
};

export { VideoQuizInfo };
