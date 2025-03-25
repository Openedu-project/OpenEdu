'use client';

// import type { ThemeGlobal } from '@oe/themes/types';
import { Button } from '@oe/ui/shadcn/button';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PreviewFrameProps {
  children: React.ReactNode;
  containerPadding?: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  themeGlobal?: Record<string, any>;
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

export default function SmartPreview({ children, containerPadding = 48, themeGlobal }: PreviewFrameProps) {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [zoom, setZoom] = useState(100);
  const [isAutoZoom, setIsAutoZoom] = useState(true);
  const [iframeBody, setIframeBody] = useState<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const viewportWidths = {
    desktop: 1026,
    tablet: 768,
    mobile: 375,
  };

  const calculateZoom = () => {
    if (!(containerRef.current && iframeRef.current)) {
      return;
    }

    const containerWidth = containerRef.current.clientWidth - containerPadding;
    const contentWidth = viewportWidths[viewport];

    if (viewport === 'desktop') {
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

  // Update iframe theme
  const updateIframeTheme = () => {
    if (!(iframeRef.current?.contentWindow && themeGlobal)) {
      return;
    }

    const iframeDoc = iframeRef.current.contentDocument;
    if (!iframeDoc) {
      return;
    }

    const updateThemeInIframe = `
      (function() {
        const setRootCSSVariable = (name, value, options = {}) => {
          const { prefix = '', unit = '' } = options;
          const variableName = prefix ? \`--\${prefix}-\${name}\` : name.startsWith('--') ? name : \`--\${name}\`;
          const formattedValue = \`\${value}\${unit}\`;
          document.documentElement.style.setProperty(variableName, formattedValue);
        };

        const setColorScheme = (variables) => {
          for (const [name, value] of Object.entries(variables)) {
            setRootCSSVariable(name, value);
          }
        };

        const setFontVariable = (key, value) => {
          setRootCSSVariable(key, value, { prefix: 'font' });
        };

        const setRadiusVariable = (value) => {
          setRootCSSVariable('radius', value, { unit: 'rem' });
        };

        const themeGlobal = ${JSON.stringify(themeGlobal)};
        const { colorVariables, radius, fonts } = themeGlobal;

        setColorScheme(colorVariables.light);
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
              // setColorScheme(colorVariables.dark);
              // TODO: only use light theme
              setColorScheme(colorVariables.light);
            } else {
              setColorScheme(colorVariables.light);
            }

        setRadiusVariable(radius.default);

        for (const [key, value] of Object.entries(fonts)) {
          setFontVariable(key, value);
        }
      })();
    `;

    const script = iframeDoc.createElement('script');
    script.textContent = updateThemeInIframe;
    iframeDoc.head.appendChild(script);
  };

  // Effect for setting up the iframe
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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

    // Apply theme after iframe is loaded
    if (themeGlobal) {
      updateIframeTheme();
    }
  }, [themeGlobal]);

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isAutoZoom) {
      calculateZoom();
      const handleResize = () => calculateZoom();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [viewport, isAutoZoom]);

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
