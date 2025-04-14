'use client';
import type { ICertificate } from '@oe/api';
import type { ICourseOutline } from '@oe/api';
import type { ILesson } from '@oe/api';
import { useMediaQuery } from '@oe/core';
import { ArrowLeft, ChevronDown, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { CourseFormTriggerModal } from '#components/course-form-trigger';
import { Button } from '#shadcn/button';
import { Sheet, SheetContent, SheetTitle } from '#shadcn/sheet';
import { cn } from '#utils/cn';
import { useCurrentLesson } from '../_context';
import { ContentSection } from './content-section';
import { CourseOutline } from './course-sidebar-section';
import { CourseTabs } from './course-tabs/course-tabs';
import { ReceiveCertificateModal } from './receive-certificate/receive-cert-modal';

interface ICourseLearning {
  course: ICourseOutline;
  section_uid: string;
  lesson_uid: string;
  certificate?: ICertificate | null;
  lessonData?: ILesson | null;
}

function CourseLearningInternal({ course, section_uid, lesson_uid, certificate, lessonData }: ICourseLearning) {
  const tLearningPage = useTranslations('learningPage');

  const { currentSection, currentLesson } = useCurrentLesson();
  const containerRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const activeSectionUid = currentSection || section_uid;
  const activeLessonUid = currentLesson || lesson_uid;

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const toggleSheet = useCallback(() => {
    setSheetOpen(prev => !prev);
  }, []);

  const renderDesktopTabs = isDesktop && <CourseTabs course_data={course} className="px-3 pb-4" />;

  const renderSidebar = isDesktop && (
    <div
      className={cn(
        'sticky top-[var(--header-with-sub-item-height)] right-0 z-30',
        'flex h-[calc(100dvh-var(--header-with-sub-item-height))] flex-col gap-2 overflow-y-auto bg-white py-2 pr-4 pl-3 transition-all duration-300 ease-in-out lg:w-1/3',
        sidebarOpen ? 'translate-x-0' : 'hidden translate-x-full'
      )}
    >
      <div className="flex items-center justify-between shadow-2xs">
        <h3 className="mbutton-semibold16 mb-0">{tLearningPage('courseContent')}</h3>
        <Button
          variant="ghost"
          className="flex h-8 w-8 items-center justify-center rounded-full p-0"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          <X size={16} />
        </Button>
      </div>
      <CourseOutline className="scrollbar h-full w-full flex-1 overflow-y-auto lg:block" />
    </div>
  );

  const renderSidebarToggle = isDesktop && !sidebarOpen && (
    <Button
      onClick={toggleSidebar}
      className="group fixed right-0 z-10 mt-4 items-center transition-all duration-300 ease-in-out"
    >
      <ArrowLeft size={16} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-1 group-hover:max-w-xs group-hover:opacity-100">
        {tLearningPage('courseContent')}
      </span>
    </Button>
  );

  const renderMobileSheet = !isDesktop && (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent hasCloseButton={false} side="bottom" className="h-[96dvh] rounded-t-[20px] p-4 pr-2">
        <SheetTitle hidden />
        <Button
          className="-translate-x-1/2 -translate-y-1/3 absolute top-0 left-1/2 h-fit w-16 rounded-3xl p-0 py-1"
          onClick={toggleSheet}
        >
          <ChevronDown size={16} />
        </Button>
        <CourseTabs
          course_data={course}
          active_section={activeSectionUid}
          activeLesson={activeLessonUid}
          className="pt-3"
        />
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      <div ref={containerRef} className={cn('flex h-full w-full gap-1 bg-muted', isDesktop ? 'flex-row' : 'flex-col')}>
        <div
          className={cn(
            'relative mx-auto my-0 h-full w-full max-w-[900px] shadow-xs',
            isDesktop && sidebarOpen && 'lg:w-2/3'
          )}
        >
          <ContentSection
            className="bg-white pt-4"
            lessonData={lessonData}
            showButtonDrawer={!isDesktop}
            onOpenDrawer={toggleSheet}
          />
          {renderDesktopTabs}
        </div>

        {renderSidebar}
        {renderSidebarToggle}
      </div>

      {renderMobileSheet}

      {course?.has_certificate && certificate && <ReceiveCertificateModal certificate={certificate} />}

      <CourseFormTriggerModal />
    </>
  );
}

export function useContentHeight() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContentHeight(entry.contentRect.height);
      }
    });

    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return { contentRef, contentHeight };
}

export const CourseLearning = memo(CourseLearningInternal);
