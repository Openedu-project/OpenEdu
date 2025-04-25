'use client';

import type { ILesson } from '@oe/api';
import { ChevronUp } from 'lucide-react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';
import { useCourse, useCurrentLesson } from '../_context';
import { sortByOrder } from '../_utils/utils';
import { LessonContentBlocks } from './lesson-content/lesson-content-blocks';
import { LessonMetadata } from './lesson-metadata';

interface IContentSectionProps {
  className?: string;
  lessonData?: ILesson | null;
  showButtonDrawer?: boolean;
  onOpenDrawer?: () => void;
}

const ContentSection = ({ className, lessonData, showButtonDrawer, onOpenDrawer }: IContentSectionProps) => {
  const { course } = useCourse();
  const { currentSection, currentLesson } = useCurrentLesson();
  const contentRef = useRef<HTMLDivElement>(null);
  const lessonMetadataRef = useRef<HTMLDivElement>(null);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [lessonMetadataHeight, setLessonMetadataHeight] = useState(0);

  const sortedContents = useMemo(() => {
    return lessonData?.contents?.sort(sortByOrder) ?? [];
  }, [lessonData]);

  // Update LessonMetadata's height to calculate max-height for content
  useLayoutEffect(() => {
    if (lessonMetadataRef.current) {
      const updateMetadataHeight = () => {
        const height = lessonMetadataRef.current?.offsetHeight || 0;
        setLessonMetadataHeight(height);
      };

      updateMetadataHeight();
      window.addEventListener('resize', updateMetadataHeight);

      return () => {
        window.removeEventListener('resize', updateMetadataHeight);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const contentRect = contentRef.current.getBoundingClientRect();
        const contentBottom = contentRect.bottom;

        const threshold = 100;
        setReachedEnd(contentBottom + threshold <= window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={cn('relative flex h-full min-h-[calc(100dvh-var(--header-with-sub-item-height))] flex-col', className)}
    >
      <div ref={contentRef} className="flex flex-grow flex-col md:px-4">
        <LessonContentBlocks
          contents={sortedContents}
          section_uid={currentSection}
          lesson_uid={currentLesson}
          lessonMetadataHeight={lessonMetadataHeight}
        />
      </div>

      <div
        ref={lessonMetadataRef}
        className={cn(
          'relative z-10 w-full bg-white transition-all duration-200',
          reachedEnd ? 'block' : 'sticky bottom-0',
          showButtonDrawer && 'rounded-t-[20px]'
        )}
      >
        {showButtonDrawer && (
          <Button
            className="-translate-x-1/2 -translate-y-1/3 absolute top-0 left-1/2 h-fit w-16 rounded-3xl p-0 py-1"
            onClick={onOpenDrawer}
          >
            <ChevronUp size={16} />
          </Button>
        )}
        <LessonMetadata
          title={lessonData?.title ?? ''}
          courseName={course?.name ?? ''}
          slug={course?.slug ?? ''}
          updateAt={course?.update_at ?? 0}
          className={cn(
            'p-2 pt-4 md:px-4',
            showButtonDrawer && 'rounded-t-[20px] shadow-[10px_0_30px_rgba(196,198,242,0.50)]'
          )}
          lessonUid={currentLesson}
        />
      </div>
    </div>
  );
};

export { ContentSection };
