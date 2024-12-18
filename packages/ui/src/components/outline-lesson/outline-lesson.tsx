import type { ILesson } from '@oe/api/types/course/segment';
import { Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { ProgressBar } from '#components/progress-bar';
import { cn } from '#utils/cn';

interface IOutlineLessonProps {
  index: number;
  completedPercentage: number;
  courseSlug: string;
  sectionUid: string;
  isAvailable: boolean;
  isActive: boolean;
  //   lesson: ILessonLearningProgress;
  lesson: ILesson;
}

export const OutlineLesson = ({ completedPercentage, isActive, isAvailable, lesson, index }: IOutlineLessonProps) => {
  const tCourse = useTranslations('courseOutline');

  const { title, count_embed_lesson, count_pdf_lesson, count_video_lesson, count_quiz_lesson, count_text_lesson } =
    lesson;

  const LessonCountDisplay = () => {
    const counts = [
      { count: count_video_lesson, label: 'videoCount' },
      { count: count_quiz_lesson, label: 'quizCount' },
      { count: count_pdf_lesson, label: 'pdfCount' },
      { count: count_embed_lesson, label: 'embedCount' },
      { count: count_text_lesson, label: 'textCount' },
    ];

    const displayCounts = counts.filter(item => item.count > 0);

    return (
      <>
        {displayCounts?.length > 0 && (
          <div className="mcaption-regular12 text-primary">
            {displayCounts.map((item, index) => (
              <span key={item.label}>
                {index > 0 && <span className="mx-1">&#x2022;</span>}
                {tCourse(item.label, { count: item.count })}
              </span>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <li>
      <Link
        href=""
        // href={webRoutes.learning(courseSlug, sectionUid, uid)}
        className={cn(
          'flex h-fit items-center gap-1 whitespace-normal rounded-radius-s border-[0.4px] p-2 shadow-shadow-6',
          'hover:border-primary',
          isActive ? 'border-primary' : 'border-border-neutral-50',
          !isAvailable && 'pointer-events-none'
        )}
      >
        {isAvailable ? <ProgressBar progress={completedPercentage} /> : <Lock size={16} />}

        <div className="flex flex-1 flex-col gap-[2px]">
          <span className="mcaption-semibold12 text-foreground/60">{tCourse('lesson', { index })}</span>
          <span className="mbutton-semibold16 flex-1 text-foreground/90">{title}</span>

          <LessonCountDisplay />
        </div>
      </Link>
    </li>
  );
};
