import type { TLessonContent } from '@oe/api/types/course/basic';
import type { ILessonContent } from '@oe/api/types/course/segment';
import type React from 'react';
import { cn } from '#utils/cn';
import type { LessonContentBlockProps } from './_types/types';
import { CONTENT_RENDERERS, ContentElement } from './content-block';

const getWrapperClassName = (contents: ILessonContent[]): string => {
  return cn(
    'mb-spacing-ml flex h-full max-h-full flex-col gap-spacing-mml overflow-y-auto p-spacing-sm pb-0 last:mb-0',
    contents.every(item => item.type !== 'embedded') && 'flex-1',
    contents.length === 1 && 'flex-1',
    contents.length === 1 && contents[0] && contents[0].type === 'video' && 'overflow-y-hidden'
  );
};

const LessonContentBlocks: React.FC<LessonContentBlockProps> = ({ contents = [], courseId }) => {
  if (contents.length === 0) {
    return <div className={getWrapperClassName([])}>No data</div>;
  }

  return (
    <div className={getWrapperClassName(contents)}>
      {contents?.map(item => {
        const contentType = item.type as TLessonContent;
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
              isOnlyContent={contents.length === 1}
            />
          </div>
        );
      })}
    </div>
  );
};

export default LessonContentBlocks;
