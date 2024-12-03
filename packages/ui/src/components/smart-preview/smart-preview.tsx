'use client';

import { Button } from '@oe/ui/shadcn/button';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
// biome-ignore lint/style/useImportType: <explanation>
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PreviewFrameProps {
  children: React.ReactNode;
  containerPadding?: number;
}

interface ViewportButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const ViewportButton = ({ isActive, onClick, children }: ViewportButtonProps) => (
  <Button variant={isActive ? 'default' : 'ghost'} size="icon" onClick={onClick} className="h-10 w-10">
    {children}
  </Button>
);

export default function SmartPreview({ children, containerPadding = 48 }: PreviewFrameProps) {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [zoom, setZoom] = useState(100);
  const [isAutoZoom, setIsAutoZoom] = useState(true);
  const [iframeBody, setIframeBody] = useState<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const viewportWidths = {
    desktop: window.innerWidth > 1024 ? 1024 : window.innerWidth,
    tablet: 768,
    mobile: 375,
  };

  //   const calculateZoom = () => {
  //     if (!(containerRef.current && iframeRef.current)) {
  //       return;
  //     }

  //     const containerWidth = containerRef.current.clientWidth - containerPadding;
  //     const contentWidth = viewportWidths[viewport];

  //     if (viewport === 'desktop') {
  //       const screenWidth = window.innerWidth - containerPadding;
  //       const contentRatio = (contentWidth / screenWidth) * 100;

  //       if (contentWidth >= screenWidth) {
  //         const newZoom = (containerWidth / contentWidth) * 100;
  //         setZoom(Math.max(30, Math.min(100, newZoom)));
  //       } else {
  //         setZoom(Math.max(30, Math.min(100, contentRatio)));
  //       }
  //     } else {
  //       const newZoom = (containerWidth / contentWidth) * 100;
  //       setZoom(Math.max(30, Math.min(100, newZoom)));
  //     }
  //   };

  const calculateZoom = () => {
    if (!(containerRef.current && iframeRef.current)) {
      return;
    }

    const containerWidth = containerRef.current.clientWidth - containerPadding;
    const contentWidth = viewportWidths[viewport];

    if (viewport === 'desktop') {
      // For desktop, always fit to container width
      const newZoom = (containerWidth / contentWidth) * 100;
      setZoom(Math.max(30, Math.min(100, newZoom)));
    } else {
      const newZoom = (containerWidth / contentWidth) * 100;
      setZoom(Math.max(30, Math.min(100, newZoom)));
    }
  };
  const handleZoomIn = () => {
    setIsAutoZoom(false);
    setZoom(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setIsAutoZoom(false);
    setZoom(prev => Math.max(prev - 10, 30));
  };

  const handleZoomReset = () => {
    setIsAutoZoom(true);
    calculateZoom();
  };

  // Update viewport widths when window resizes
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const updateViewportWidth = () => {
      viewportWidths.desktop = window.innerWidth > 1024 ? 1024 : window.innerWidth;
      if (viewport === 'desktop') {
        calculateZoom();
      }
    };

    window.addEventListener('resize', updateViewportWidth);
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, [viewport]);

  // Effect for handling auto-zoom
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isAutoZoom) {
      calculateZoom();
      const handleResize = () => calculateZoom();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [viewport, isAutoZoom]);

  // Effect for setting up the iframe
  useEffect(() => {
    if (!iframeRef.current) {
      return;
    }

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      return;
    }

    // Copy styles from parent page
    const styles = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (_e) {
          // Handle cross-origin stylesheets
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = sheet.href || '';
          return link.outerHTML;
        }
      })
      .join('\n');

    // Create the iframe content
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>${styles}</style>
          <script>
            window.addEventListener('message', function(event) {
              if (event.data.type === 'viewport-change') {
                document.documentElement.style.width = event.data.width + 'px';
              }
            });
          </script>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `;

    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();

    setIframeBody(iframeDoc.body);
  }, []);

  // Effect for updating iframe viewport
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!iframeRef.current?.contentWindow) {
      return;
    }

    iframeRef.current.contentWindow.postMessage(
      {
        type: 'viewport-change',
        width: viewportWidths[viewport],
      },
      '*'
    );
  }, [viewport]);

  return (
    <div className="flex flex-col">
      {/* Viewport Controls */}
      <div className="flex items-center justify-between border-b bg-background p-4">
        <div className="flex gap-1">
          <ViewportButton isActive={viewport === 'desktop'} onClick={() => setViewport('desktop')}>
            <Monitor className="h-4 w-4" />
          </ViewportButton>
          <ViewportButton isActive={viewport === 'tablet'} onClick={() => setViewport('tablet')}>
            <Tablet className="h-4 w-4" />
          </ViewportButton>
          <ViewportButton isActive={viewport === 'mobile'} onClick={() => setViewport('mobile')}>
            <Smartphone className="h-4 w-4" />
          </ViewportButton>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleZoomOut} className="h-8 w-8" disabled={zoom <= 30}>
            <span className="font-bold">−</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomReset}
            className={`text-xs ${isAutoZoom ? '' : 'text-orange-500'}`}
          >
            {Math.round(zoom)}%
          </Button>
          <Button variant="ghost" size="icon" onClick={handleZoomIn} className="h-8 w-8" disabled={zoom >= 200}>
            <span className="font-bold">+</span>
          </Button>
        </div>
      </div>

      {/* Preview Container */}
      <div ref={containerRef} className="flex-1 overflow-auto bg-slate-100 p-6">
        <div className="flex justify-center">
          <div
            className="overflow-y-scroll rounded-lg bg-white shadow-lg transition-all duration-200"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
            }}
          >
            <iframe
              ref={iframeRef}
              style={{
                width: `${viewportWidths[viewport]}px`,
                height: '90vh',
                border: 'none',
              }}
              title="preview"
            />
            {iframeBody && createPortal(<div style={{ width: '100%', height: '100%' }}>{children}</div>, iframeBody)}
          </div>
        </div>
      </div>
    </div>
  );
}
