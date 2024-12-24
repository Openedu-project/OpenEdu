import { useEffect, useRef, useState } from 'react';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';

export interface ICollapseText {
  content: string;
  maxLineLength?: number;
  className?: string;
}

export const ExpandableText = ({ content, maxLineLength = 3, className }: ICollapseText) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const fullContentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      const element = descriptionRef.current;

      if (!element) {
        return;
      }

      // Calculate the actual number of lines
      const lineHeight = Number.parseInt(window.getComputedStyle(element).lineHeight, 10);
      const height = element.scrollHeight;
      const lines = Math.round(height / lineHeight);

      // Compare with limit line-clamp-3
      setShowButton(lines > maxLineLength);
    };

    const timer = setTimeout(checkOverflow, 100);

    return () => clearTimeout(timer);
  }, [content]);

  return (
    <>
      {content?.length > 0 && (
        <div className={cn(className)}>
          <div
            ref={descriptionRef}
            className={cn(
              'mcaption-regular16 !min-h-0 rich-text !m-0 text-foreground/90',
              !isExpanded && `line-clamp-${maxLineLength}`
            )}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: content as string | TrustedHTML,
            }}
          />
          {/* Hidden full content for comparison */}
          <div
            ref={fullContentRef}
            className="-top-[9999px] mcaption-regular16 !min-h-0 rich-text !m-0 pointer-events-none absolute opacity-0"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: content as string | TrustedHTML,
            }}
          />
          {showButton && (
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mcaption-semibold16 h-fit p-0 text-primary hover:bg-inherit hover:text-primary hover:opacity-75"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </Button>
          )}
        </div>
      )}
    </>
  );
};
