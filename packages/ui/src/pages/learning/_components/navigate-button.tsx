'use client';

import ArrowLeft2 from '@oe/assets/icons/arrow-left-2';
import ArrowRight2 from '@oe/assets/icons/arrow-right-2';
import { useTranslations } from 'next-intl';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';

type TDirection = 'prev' | 'next';

const NavigateButton = () => {
  const t = useTranslations('learningPage.navigation');
  // const router = useRouter();

  // Common button styles
  const buttonBaseStyles = 'mbutton-bold12 !text-sm border border-primary bg-transparent text-primary hover:bg-inherit';

  const handleNavigateLesson = (direction: TDirection) => {
    console.log(direction, 'onClick');
    // let newIndex = currentLessonIndex;

    // if (direction === "prev") {
    //   newIndex =
    //     currentLessonIndex > 0 ? currentLessonIndex - 1 : lessonIds.length - 1;
    // } else if (direction === "next") {
    //   newIndex =
    //     currentLessonIndex < lessonIds.length - 1 ? currentLessonIndex + 1 : 0;
    // }

    // setCurrentLessonIndex(newIndex);
    // const newLessonUid = lessonIds[newIndex];
    // const newSectionUid= outlineItems[newIndex].sectionUid ?? "";

    //   const learningPageUrl = createAPIUrl({
    //     endpoint: PLATFORM_ROUTES.courseLearning,
    //     params: {
    //       slug: courseSlug,
    //       section: newSectionUid,
    //       lesson: newLessonUid,
    //     },
    //   });

    // router.push(learningPageUrl);
  };

  const renderNavigationButton = (direction: TDirection) => {
    const isPrev = direction === 'prev';
    const Icon = isPrev ? ArrowLeft2 : ArrowRight2;

    return (
      <Button
        size="xs"
        className={cn(buttonBaseStyles)}
        // disabled={isPrev
        //   ? currentLessonIndex === 0 || !checkPreviousLesson
        //   : !checkNextLesson || currentLessonIndex === lessonIds.length - 1
        // }
        onClick={() => handleNavigateLesson(direction)}
      >
        {isPrev && <Icon className="mr-1" color="hsl(var(--primary))" />}
        {t(direction)}
        {!isPrev && <Icon className="ml-1" color="hsl(var(--primary))" />}
      </Button>
    );
  };

  return (
    <div className="hidden sm:flex sm:justify-end sm:gap-4">
      {renderNavigationButton('prev')}
      {renderNavigationButton('next')}
    </div>
  );
};

export default NavigateButton;
