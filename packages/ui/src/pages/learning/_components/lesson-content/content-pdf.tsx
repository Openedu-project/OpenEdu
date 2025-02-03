'use client';

import { useEffect, useState } from 'react';
import { PdfViewer } from '#components/pdf-viewer';

const ContentPdf = ({
  url,
  onComplete,
}: {
  url: string;
  onComplete?: () => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (currentPage === totalPages && onComplete) {
      onComplete?.();
    }
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setTotalPages(numPages);
  };

  return (
    <PdfViewer
      className="aspect-video pb-4"
      files={url}
      showPerPage
      hasToolbar
      onPageChange={handlePageChange}
      onLoadSuccess={handleDocumentLoadSuccess}
    />
  );
};

export default ContentPdf;
