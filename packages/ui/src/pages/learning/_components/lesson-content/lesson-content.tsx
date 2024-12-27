import type { ILessonContent } from '@oe/api/types/course/segment';
import type { HTMLAttributes } from 'react';
import { ScrollArea } from '#shadcn/scroll-area';
import { cn } from '#utils/cn';
import LessonContentBlocks from './lesson-content-blocks';

interface ILessonContentProps extends HTMLAttributes<HTMLDivElement> {
  courseId: string;
  contents?: ILessonContent[];
}

const LessonContent = ({ className, courseId, contents, ...props }: ILessonContentProps) => {
  return (
    <div className={cn(className)} {...props}>
      <ScrollArea>
        <LessonContentBlocks courseId={courseId} contents={contents} />
      </ScrollArea>
    </div>
  );
};

export default LessonContent;
