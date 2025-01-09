'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { IQuizSubmissionResponse } from '@oe/api/types/quiz';
import backgroundFail from '@oe/assets/images/learning-page/bg-good-luck.png';
import background from '@oe/assets/images/learning-page/bg-whale-done.png';
import { Button } from '#shadcn/button';
import QuizAnsResult from './quiz-ans-result';
import QuizResultGrid from './quiz-detail-score';
import QuizLayout from './quiz-layout';

interface IQuizResultProps {
  result: IQuizSubmissionResponse;
  showCorrectAns?: boolean;
  triggerFunction?: () => void;
  onTryAgain?: () => void;
}

const QuizResult = ({ result, showCorrectAns = false, triggerFunction, onTryAgain }: IQuizResultProps) => {
  const tQuizResult = useTranslations('learningPage.quiz.quizResult');

  // const router = useRouter();
  // const { courseDetail } = useParams();

  const [isShow, setIsShow] = useState<boolean>(false);
  const { answers, passed } = result;

  // const { currentLessonIndex, lessonIds, outlineItems } = useOutlineItemIdsStore();
  // const { getLessonStatus } = useLessonLearningStore();

  // const checkNextLesson = getLessonStatus(currentLessonIndex + 1);

  const onFinishQuiz = () => {
    if (triggerFunction) {
      triggerFunction();
      // } else if (currentLessonIndex < lessonIds.length - 1 && result?.passed && checkNextLesson) {
      //   const newLessonUid = lessonIds[currentLessonIndex + 1];
      //   const newSectionUid = outlineItems[currentLessonIndex + 1].sectionUid ?? '';

      //   router.push(createCourseUrl('detail', {slug: courseDetail as string, section: newSectionUid, lesson: newLessonUid}));
      // } else {
      //   setOpenModal(COMPLETE_COURSE_MODAL, true);
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
        <QuizAnsResult answer={answers} onFinishQuiz={onFinishQuiz} />
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

      {/* <CompleteCourseNotiModal /> */}
    </>
  );
};

export default QuizResult;
