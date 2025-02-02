import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { Button } from '@oe/ui/shadcn/button';

import ArrowLeft2 from '@oe/assets/icons/arrow-left2';
import ArrowRight2 from '@oe/assets/icons/arrow-right2';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import useResizeObserver from '#hooks/useResizeObserver';
import { cn } from '#utils/cn';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

interface IPdfViewerProps {
  files: PDFFile;
  title?: string;
  uploadFile?: boolean;
  className?: string;
  showPerPage?: boolean;
  onPageChange?: (page: number) => void;
  onDocumentHeightChange?: (height: number) => void;
  onLoadSuccess?: (pdf: PDFDocumentProxy) => void;
}

export default function PdfViewer({
  files,
  uploadFile,
  title,
  className,
  showPerPage = false,
  onPageChange,
  onDocumentHeightChange,
  onLoadSuccess,
}: IPdfViewerProps) {
  const [file, setFile] = useState<PDFFile>(files);
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const documentRef = useRef<HTMLDivElement>(null);

  const onResize = useCallback<ResizeObserverCallback>(entries => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  useEffect(() => {
    if (documentRef.current && onDocumentHeightChange) {
      const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          onDocumentHeightChange(entry.contentRect.height);
        }
      });

      resizeObserver.observe(documentRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [onDocumentHeightChange]);

  useEffect(() => {
    if (onPageChange) {
      onPageChange(page);
    }
  }, [page, onPageChange]);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    const nextFile = files?.[0];

    if (nextFile) {
      setFile(nextFile);
    }
  }

  function onDocumentLoadSuccess(pdf: PDFDocumentProxy): void {
    setNumPages(pdf.numPages);
    if (onLoadSuccess) {
      onLoadSuccess(pdf);
    }
  }

  return (
    <div className={cn('PDF', className)}>
      {title && (
        <header>
          <h1>PDF</h1>
        </header>
      )}
      <div className="Example__container w-full">
        {uploadFile && (
          <div className="Example__container__load">
            <label htmlFor="file">Load from file:</label>&nbsp;
            <input onChange={onFileChange} type="file" />
          </div>
        )}
        <div className="Example__container__document relative flex w-full justify-center" ref={setContainerRef}>
          <div ref={documentRef}>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
              {showPerPage ? (
                <Page
                  key={`page_${page}`}
                  pageNumber={page}
                  width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                />
              ) : (
                Array.from(Array.from({ length: numPages || 0 }), (_, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                  />
                ))
              )}
            </Document>
          </div>

          {showPerPage && (numPages || 0) > 1 && (
            <div className="absolute top-1/2 left-0 z-10 flex w-full translate-y-1/2 justify-between">
              <Button
                size="sm"
                variant="ghost"
                disabled={page === 1}
                className="h-7 w-7 rounded-full shadow-shadow-5"
                onClick={() => setPage(prev => prev - 1)}
              >
                <ArrowLeft2 />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                disabled={page === numPages}
                className="h-7 w-7 rounded-full shadow-shadow-5"
                onClick={() => setPage(prev => prev + 1)}
              >
                <ArrowRight2 />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
