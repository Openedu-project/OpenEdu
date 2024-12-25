'use client';

import type { ICourseOutline } from '@oe/api/types/course/course';
import type React from 'react';
import { useEffect, useRef } from 'react';
import CourseSidebar from './course-sidebar';

interface Position {
  position: 'static' | 'fixed';
  top?: string;
  width: string;
}

interface StickyCourseSidebarProps {
  courseContentRef: React.RefObject<HTMLElement | null>;
  courseData: ICourseOutline;
}

const HEADER_HEIGHT = 68;
const MOBILE_BREAKPOINT = 768;

const getDefaultPosition = (): Position => {
  return {
    position: 'static',
    width: 'auto',
  };
};

const calculateSidebarPosition = (contentRect: DOMRect, sidebarHeight: number, sidebarWidth: number): Position => {
  const { top: contentTop, bottom: contentBottom, height: contentHeight } = contentRect;

  // Case 1: Content smaller than sidebar
  if (contentHeight < sidebarHeight) {
    return getDefaultPosition();
  }

  // Case 2: Scroll position requires fixed sidebar
  if (contentTop <= 0 && contentBottom > sidebarHeight) {
    return {
      position: 'fixed',
      top: `${HEADER_HEIGHT}px`,
      width: `${sidebarWidth}px`,
    };
  }

  // Case 3: Bottom edge case
  if (contentBottom <= sidebarHeight) {
    return {
      position: 'fixed',
      top: `${contentBottom - sidebarHeight}px`,
      width: `${sidebarWidth}px`,
    };
  }

  // Default case
  return getDefaultPosition();
};

const StickyCourseSidebar = ({ courseContentRef, courseData }: StickyCourseSidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const updateSidebarStyles = (styles: Position) => {
    if (!sidebarRef.current) {
      return;
    }

    Object.assign(sidebarRef.current.style, styles);
  };

  const handleScroll = () => {
    const sidebar = sidebarRef.current;
    const courseContent = courseContentRef.current;

    if (!(sidebar && courseContent) || window.innerWidth < MOBILE_BREAKPOINT) {
      updateSidebarStyles(getDefaultPosition());
      return;
    }

    const contentRect = courseContent.getBoundingClientRect();
    const { height: sidebarHeight } = sidebar.getBoundingClientRect();
    const sidebarWidth = sidebar.parentElement?.offsetWidth || 0;

    const newPosition = calculateSidebarPosition(contentRect, sidebarHeight, sidebarWidth);

    updateSidebarStyles(newPosition);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [courseContentRef]);

  return (
    <div className="relative md:col-span-2 lg:col-span-1">
      <div ref={sidebarRef}>
        <CourseSidebar courseData={courseData} />
      </div>
    </div>
  );
};

export default StickyCourseSidebar;
