import { ArrowLeft2, ArrowRight2 } from '@oe/assets';
import { ZoomIn, ZoomOut } from 'lucide-react';
import type { ReactNode } from 'react';
import type React from 'react';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { ZOOM_LEVELS } from './constants';

interface PdfToolbarProps {
  page: number;
  numPages: number;
  scale: number;
  showPerPage: boolean;
  onPageChange: (page: number) => void;
  onZoom: (type: 'in' | 'out') => void;
}

const toolbarButtonStyles = 'h-7 w-7 rounded-full p-0 shadow-shadow-5';

const ToolbarButton = ({
  onClick,
  disabled,
  ariaLabel,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  ariaLabel: string;
  children: ReactNode;
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    size="sm"
    variant="outline"
    className={toolbarButtonStyles}
    aria-label={ariaLabel}
  >
    {children}
  </Button>
);

const PdfToolbar = ({ page, numPages, scale, onPageChange, onZoom, showPerPage }: PdfToolbarProps) => {
  const onSetPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= numPages) {
      onPageChange(value);
    } else if (value < 1) {
      onPageChange(1);
    } else {
      onPageChange(numPages);
    }
  };

  return (
    <div className="w-full border-b bg-white/80 shadow-xs backdrop-blur-xs">
      <div className="mx-auto flex w-full max-w-full flex-row-reverse items-center justify-between gap-2 px-4 py-2">
        {showPerPage && (
          <div className="flex items-center gap-2">
            <ToolbarButton
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page <= 1}
              ariaLabel="Previous page"
            >
              <ArrowLeft2 color="var(--foreground)" width={16} height={16} />
            </ToolbarButton>

            <div className="mcaption-regular14 flex min-w-[80px] items-center text-center">
              <Input
                min={1}
                max={numPages}
                type="number"
                value={page}
                onChange={onSetPage}
                wrapperClassName="w-fit h-fit"
                className="mcaption-regular14 h-fit w-full border-none bg-transparent p-0 text-center focus-visible:ring-0"
              />
              <span>of {numPages}</span>
            </div>

            <ToolbarButton
              onClick={() => onPageChange(Math.min(numPages, page + 1))}
              disabled={page >= numPages}
              ariaLabel="Next page"
            >
              <ArrowRight2 color="var(--foreground)" width={16} height={16} />
            </ToolbarButton>
          </div>
        )}

        <div className="flex items-center gap-2">
          <ToolbarButton onClick={() => onZoom('out')} disabled={scale <= ZOOM_LEVELS.MIN} ariaLabel="Zoom out">
            <ZoomOut width={16} height={16} />
          </ToolbarButton>

          <span className="mcaption-regular14 min-w-[60px] text-center">{Math.round(scale * 100)}%</span>

          <ToolbarButton onClick={() => onZoom('in')} disabled={scale >= ZOOM_LEVELS.MAX} ariaLabel="Zoom in">
            <ZoomIn width={16} height={16} />
          </ToolbarButton>
        </div>
      </div>
    </div>
  );
};

export { PdfToolbar, type PdfToolbarProps };
