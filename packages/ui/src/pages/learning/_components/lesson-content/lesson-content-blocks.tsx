import type { ILessonContent } from '@oe/api/types/course/segment';
import type React from 'react';
import { ScrollArea } from '#shadcn/scroll-area';
import { cn } from '#utils/cn';
import type { LessonContentBlockProps } from './_types/types';
import { CONTENT_RENDERERS, ContentElement } from './content-block';

const getWrapperClassName = (contents: ILessonContent[]): string => {
  return cn(
    'flex h-fit max-h-full flex-col gap-6 p-spacing-sm pb-0',
    // contents.every(item => item.type !== 'embedded') && 'flex-1',
    contents.length === 1 && contents[0] && contents[0].type === 'video' && 'overflow-y-hidden'
  );
};

const LessonContentBlocks: React.FC<LessonContentBlockProps> = ({ contents = [], courseId }) => {
  if (contents.length === 0) {
    return <div className={getWrapperClassName([])}>No data</div>;
  }

  return (
    <ScrollArea>
      <div className={getWrapperClassName(contents)}>
        {contents?.map(item => {
          const contentType = item.type;
          const renderer = CONTENT_RENDERERS[contentType];

          if (!renderer) {
            return null;
          }

          return (
            <div key={item.id} className={renderer.getClassName(contents.length === 1)}>
              <ContentElement
                type={contentType}
                courseId={courseId}
                contents={contents}
                data={item}
                isOnlyContent={contents.length === 1}
              />
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default LessonContentBlocks;
