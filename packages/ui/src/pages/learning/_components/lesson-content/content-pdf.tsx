'use client';

import { useEffect, useRef, useState } from 'react';
import { PdfViewer } from '#components/pdf-viewer';
import { useHeaderHeight } from '../../_hooks';

const ContentPdf = ({
  url,
  onComplete,
}: {
  url: string;
  onComplete?: () => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const headerHeight = useHeaderHeight('header');

  useEffect(() => {
    if (!(componentRef.current && onComplete)) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries?.[0]?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 1 }
    );

    observer.observe(componentRef.current);

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, [onComplete]);

  useEffect(() => {
    if (currentPage === totalPages && totalPages > 0 && isVisible && onComplete) {
      onComplete();
    }
  }, [currentPage, totalPages, isVisible, onComplete]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setTotalPages(numPages);
  };

  return (
    <div ref={componentRef}>
      <PdfViewer
        className="pb-4"
        files={url}
        showPerPage
        hasToolbar
        toolbarStyle={{ top: `${headerHeight}px` }}
        onPageChange={handlePageChange}
        onLoadSuccess={handleDocumentLoadSuccess}
      />
    </div>
  );
};

export { ContentPdf };
