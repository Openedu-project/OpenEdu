"use client";
import type { ICertificate } from "@oe/api";
import type { ICourseOutline } from "@oe/api";
import type { ILesson } from "@oe/api";
import { useMediaQuery } from "@oe/core";
import { ArrowLeft, ChevronDown, X } from "lucide-react";
import {
  type CSSProperties,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CourseFormTriggerModal } from "#components/course-form-trigger";
import { Button } from "#shadcn/button";
import { Sheet, SheetContent, SheetTitle } from "#shadcn/sheet";
import { useCurrentLesson } from "../_context";
import { ContentSection } from "./content-section";
import { CourseOutline } from "./course-sidebar-section";
import { CourseTabs } from "./course-tabs/course-tabs";
import { ReceiveCertificateModal } from "./receive-certificate/receive-cert-modal";

interface ICourseLearning {
  course: ICourseOutline;
  section_uid: string;
  lesson_uid: string;
  certificate?: ICertificate | null;
  lessonData?: ILesson | null;
}

function CourseLearningInternal({
  course,
  section_uid,
  lesson_uid,
  certificate,
  lessonData,
}: ICourseLearning) {
  const { currentSection, currentLesson } = useCurrentLesson();
  const containerRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Get actual section and lesson UIDs
  const activeSectionUid = currentSection || section_uid;
  const activeLessonUid = currentLesson || lesson_uid;

  // Toggle functions with useCallback to prevent unnecessary re-renders
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const toggleSheet = useCallback(() => {
    setSheetOpen((prev) => !prev);
  }, []);

  // Memoized styles to avoid recalculation on every render
  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: isDesktop ? "row" : "column",
    gap: "0.25rem",
    height: "100%",
    width: "100%",
    position: "relative",
  };

  const contentContainerStyle: CSSProperties = {
    height: "100%",
    margin: "0 auto",
  };

  const sidebarStyle: CSSProperties = {
    transition: "width 0.3s ease",
  };

  // Rendering optimizations
  const renderDesktopTabs = isDesktop && (
    <CourseTabs
      course_data={course}
      active_section={activeSectionUid}
      activeLesson={activeLessonUid}
    />
  );

  const renderSidebar = isDesktop && sidebarOpen && (
    <div
      className="sticky top-[var(--header-with-sub-item-height)] py-4 lg:w-1/3"
      style={{
        ...sidebarStyle,
        height: "calc(100dvh - var(--header-with-sub-item-height))",
        maxHeight: "calc(100dvh - var(--header-with-sub-item-height))",
        overflowY: "auto",
      }}
    >
      <CourseOutline className="scrollbar h-full w-full overflow-y-auto pr-4 pl-3 lg:block" />
      <Button
        variant="ghost"
        className="absolute top-0 right-0 h-fit p-0"
        onClick={toggleSidebar}
      >
        <X size={16} />
      </Button>
    </div>
  );

  const renderSidebarToggle = isDesktop && !sidebarOpen && (
    <Button
      onClick={toggleSidebar}
      className="group fixed top-[calc(var(--header-with-sub-item-height)+1rem)] right-0 z-10 items-center transition-all duration-300 ease-in-out"
      style={{
        transition: "right 0.3s ease",
      }}
    >
      <ArrowLeft size={16} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-1 group-hover:max-w-xs group-hover:opacity-100">
        Course content
      </span>
    </Button>
  );

  const renderMobileSheet = !isDesktop && (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent
        hasCloseButton={false}
        side="bottom"
        className="h-[96dvh] rounded-t-[20px]"
      >
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
        />
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      <div ref={containerRef} style={containerStyle}>
        <div
          className="relative w-full max-w-[900px] lg:w-2/3"
          style={contentContainerStyle}
        >
          <ContentSection
            className="pt-4"
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

      {course?.has_certificate && certificate && (
        <ReceiveCertificateModal certificate={certificate} />
      )}

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

    const observer = new ResizeObserver((entries) => {
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
