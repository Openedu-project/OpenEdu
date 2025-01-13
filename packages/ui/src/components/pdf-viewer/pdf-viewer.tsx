import type { PDFDocumentProxy } from 'pdfjs-dist';
import { type ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { cn } from '#utils/cn';
import useResizeObserver from './_hooks';
import PdfToolbar from './pdf-toolbar';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
};

const resizeObserverOptions = {};
const maxWidth = 800;

export const ZOOM_LEVELS = {
  MIN: 0.5,
  MAX: 2.0,
  STEP: 0.1,
};

type PDFFile = string | File | null;

export interface IPdfViewerProps {
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
  className,
  showPerPage = false,
  onPageChange,
  onDocumentHeightChange,
  onLoadSuccess,
}: IPdfViewerProps) {
  const [file, setFile] = useState<PDFFile>(files);
  const [numPages, setNumPages] = useState<number>(0);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [scale, setScale] = useState(1);
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

  function onFileChange(event: ChangeEvent<HTMLInputElement>): void {
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

  const handleZoom = (type: 'in' | 'out') => {
    setScale(current => {
      const newScale = type === 'in' ? current + ZOOM_LEVELS.STEP : current - ZOOM_LEVELS.STEP;
      return Math.min(Math.max(newScale, ZOOM_LEVELS.MIN), ZOOM_LEVELS.MAX);
    });
  };

  return (
    <div className={cn('flex max-w-full flex-col items-center gap-4', className)}>
      <div className="sticky top-0 left-0 z-10 w-full">
        <PdfToolbar
          page={page}
          numPages={numPages}
          scale={scale}
          onPageChange={setPage}
          onZoom={handleZoom}
          showPerPage={showPerPage}
        />
      </div>

      <div className="w-full max-w-full px-4">
        {uploadFile && (
          <div className="mb-4">
            <label htmlFor="file">Load from file:</label>
            <input onChange={onFileChange} type="file" />
          </div>
        )}

        <div className="relative flex w-full justify-center" ref={setContainerRef}>
          <div
            ref={documentRef}
            className="scrollbar overflow-x-auto"
            style={{
              maxWidth: containerWidth || maxWidth,
              width: '100%',
            }}
          >
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
              className="inline-block min-w-full"
            >
              {showPerPage ? (
                <Page
                  key={`page_${page}`}
                  pageNumber={page}
                  scale={scale}
                  width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                  className="flex justify-center"
                />
              ) : (
                Array.from(Array.from({ length: numPages || 0 }), (_, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    scale={scale}
                    width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                    className="flex justify-center"
                  />
                ))
              )}
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
}
