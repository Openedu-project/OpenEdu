import type { ILessonContent } from '@oe/api/types/course/segment';
import type { HTMLAttributes } from 'react';
import { cn } from '#utils/cn';
import LessonContentBlocks from './lesson-content-blocks';

interface ILessonContentProps extends HTMLAttributes<HTMLDivElement> {
  courseId: string;
  contents?: ILessonContent[];
}

const LessonContent = ({ className, courseId, contents, ...props }: ILessonContentProps) => {
  return (
    <div className={cn(className)} {...props}>
      <LessonContentBlocks courseId={courseId} contents={contents} />
    </div>
  );
};

export default LessonContent;
