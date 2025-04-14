'use client';

import type { ICertificateData, ICertificateTemplate } from '@oe/api';
import { useEffect, useRef, useState } from 'react';
import { cn } from '#utils/cn';
import { CertificateRenderer } from './certificate-renderer';

export const TemplateScalePreview = ({
  template,
  data,
  className,
}: {
  template: ICertificateTemplate;
  data?: ICertificateData;
  className?: string;
}) => {
  const [scale, setScale] = useState(0.25);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) {
        return;
      }

      const container = containerRef.current.getBoundingClientRect();

      if (template?.frame?.width && template?.frame?.height) {
        const frameWidth = template.frame.width;
        const frameHeight = template.frame.height;

        const scaleX = container.width / frameWidth;
        const scaleY = container.height / frameHeight;
        const newScale = Math.min(scaleX, scaleY) * 0.9;

        setScale(newScale);
        return;
      }

      if (!contentRef.current) {
        return;
      }

      const content = contentRef.current.getBoundingClientRect();
      if (content.width === 0 || content.height === 0) {
        return;
      }

      const scaleX = container.width / content.width;
      const scaleY = container.height / content.height;
      const newScale = Math.min(scaleX, scaleY) * 0.9;

      setScale(newScale);
    };

    const timer = setTimeout(updateScale, 100);

    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      const resizeObserver = new ResizeObserver(updateScale);
      resizeObserver.observe(containerRef.current);

      if (contentRef.current) {
        resizeObserver.observe(contentRef.current);
      }

      return () => {
        resizeObserver.disconnect();
        clearTimeout(timer);
      };
    }

    return () => clearTimeout(timer);
  }, [template]);

  return (
    <div
      className={cn(
        'relative mb-2 flex h-40 w-full items-center justify-center overflow-hidden rounded-md border bg-muted',
        className
      )}
      ref={containerRef}
    >
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="transform-gpu" style={{ transform: `scale(${scale})` }} ref={contentRef}>
            <CertificateRenderer template={template} showPlaceholder={true} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};
