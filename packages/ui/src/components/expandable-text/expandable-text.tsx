'use client';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';

export interface ICollapseText {
  content: string;
  maxLineLength?: number;
  className?: string;
}

export const ExpandableText = ({ content, maxLineLength = 3, className }: ICollapseText) => {
  const tGeneral = useTranslations('general');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      const element = descriptionRef.current;

      if (!element) {
        return;
      }

      const lineHeight = Number.parseFloat(window.getComputedStyle(element).lineHeight);
      const height = element.scrollHeight;
      const lines = Math.round(height / lineHeight);

      setShowButton(lines > maxLineLength);
    };

    const timer = setTimeout(checkOverflow, 100);

    return () => clearTimeout(timer);
  }, [maxLineLength]);

  return (
    <>
      {content?.length > 0 && (
        <div className={cn(className)}>
          <div
            ref={descriptionRef}
            className={cn(
              'mcaption-regular14 rich-text m-0 text-foreground/90',
              !isExpanded && `line-clamp-${maxLineLength}`
            )}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: content as string | TrustedHTML,
            }}
          />
          {showButton && (
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-fit p-0 text-primary hover:bg-inherit hover:text-primary hover:opacity-75"
            >
              {isExpanded ? tGeneral('showLess') : tGeneral('showMore')}
            </Button>
          )}
        </div>
      )}
    </>
  );
};
