import type { IQuizItemResponse } from '@oe/api/types/course/quiz';
import MessageQuestion from '@oe/assets/icons/message-question';
import { convertSecondsToTimeString, convertTimeStringToSeconds } from '@oe/core/utils/datetime';
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

  const ButtonTiming = ({ id, timestamp }: { id: string; timestamp: number | null }) => {
    return (
      <Button
        variant="link"
        className="!mcaption-semibold16 ml-1 h-auto p-0 text-primary hover:text-primary"
        onClick={() => getCurrentTime({ id, timestamp })}
      >
        {convertSecondsToTimeString(timestamp ?? 0)}
      </Button>
    );
  };

  return (
    <div className="mt-spacing-mml flex items-center gap-spacing-sm">
      <div className="flex items-center justify-center rounded-[12px] border border-content-neutral-strong-900 p-[10px]">
        <MessageQuestion />
      </div>
      <div className="mcaption-semibold16">
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

export default VideoQuizInfo;
