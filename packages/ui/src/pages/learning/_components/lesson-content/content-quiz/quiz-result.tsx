'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { IQuizSubmissionResponse } from '@oe/api';
import backgroundFail from '@oe/assets/images/learning-page/bg-good-luck.png';
import background from '@oe/assets/images/learning-page/bg-whale-done.png';
import { useParams } from 'next/navigation';
import { useRouter } from '#common/navigation';
import { Button } from '#shadcn/button';
import { createCourseUrl } from '#utils/course-url';
import { useCurrentLesson, useProgress } from '../../../_context';
import { getLessonGlobalIndex, getTotalLessons, getUidByLessonIndex } from '../../../_utils';
import { CompleteCourseNotiModal } from '../../course-noti-modal';
import { QuizAnsResult } from './quiz-ans-result';
import { QuizResultGrid } from './quiz-detail-score';
import { QuizLayout } from './quiz-layout';

interface IQuizResultProps {
  result: IQuizSubmissionResponse;
  showCorrectAns?: boolean;
  courseIsCompleted?: boolean;
  triggerFunction?: (quizResult: IQuizSubmissionResponse) => void;
  onTryAgain?: () => void;
}

const QuizResult = ({
  result,
  showCorrectAns = false,
  courseIsCompleted,
  triggerFunction,
  onTryAgain,
}: IQuizResultProps) => {
  const tQuizResult = useTranslations('learningPage.quiz.quizResult');

  const router = useRouter();
  const { slug, lesson } = useParams();

  const [isShow, setIsShow] = useState<boolean>(false);
  const [openNotiModal, setOpenNotiModal] = useState<boolean>(false);

  const { answers, passed } = result;

  const {
    state: { mergedProgress },
    getLessonStatus,
  } = useProgress();
  const { currentLesson } = useCurrentLesson();

  const lessonUid = currentLesson || (lesson as string);

  const currentLessonIndex = getLessonGlobalIndex(mergedProgress, lessonUid);
  const totalItems = getTotalLessons(mergedProgress);
  const checkNextLesson = getLessonStatus(currentLessonIndex + 1);

  const onFinishQuiz = () => {
    if (triggerFunction) {
      triggerFunction(result);
    } else if (currentLessonIndex < totalItems && result?.passed && checkNextLesson) {
      const lessonInfo = getUidByLessonIndex(mergedProgress, currentLessonIndex + 1);

      router.push(
        createCourseUrl('learning', {
          slug: slug as string,
          section: lessonInfo?.sectionUid as string,
          lesson: lessonInfo?.lessonUid as string,
        })
      );
    } else {
      setOpenNotiModal(true);
    }
  };

  const handleFinishQuiz = () => {
    if (showCorrectAns) {
      setIsShow(true);
    } else {
      onFinishQuiz();
    }
  };

  const onTryQuizAgain = () => {
    onTryAgain?.();
  };

  return (
    <>
      {isShow ? (
        <>{answers?.length > 0 ? <QuizAnsResult answer={answers} onFinishQuiz={onFinishQuiz} /> : null}</>
      ) : (
        <QuizLayout background={passed ? background.src : backgroundFail.src}>
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-5">
            <div className="z-10 flex flex-col gap-3 px-4 py-3 md:px-12">
              {passed ? (
                <div className="giant-iheading-semibold24 md:giant-iheading-bold44 text-center text-secondary">
                  WHALE DONE!!!
                </div>
              ) : (
                <div className="giant-iheading-semibold24 md:giant-iheading-semibold32 max-w-[193px] text-destructive">
                  GOOD LUCK NEXT TIME!
                </div>
              )}

              <QuizResultGrid data={result} />
            </div>

            <div className="z-10 flex w-full flex-col items-center justify-center gap-2 md:flex-row">
              <Button
                variant={`${passed ? 'secondary' : 'destructive'}`}
                className="w-60 capitalize shadow-shadow-3"
                onClick={onTryQuizAgain}
              >
                {tQuizResult('tryAgain')}
              </Button>

              {(triggerFunction || result?.passed) && (
                <Button className="w-60 capitalize shadow-shadow-3" onClick={handleFinishQuiz}>
                  {showCorrectAns ? tQuizResult('viewAnswer') : tQuizResult('finishQuiz')}
                </Button>
              )}
            </div>
          </div>
        </QuizLayout>
      )}

      {openNotiModal && (
        <CompleteCourseNotiModal
          open={openNotiModal}
          currentLessonIndex={currentLessonIndex}
          totalItems={totalItems}
          checkNextLesson={checkNextLesson ?? false}
          courseIsCompleted={courseIsCompleted}
          onReturnToClass={() => setOpenNotiModal(false)}
        />
      )}
    </>
  );
};

export { QuizResult };
