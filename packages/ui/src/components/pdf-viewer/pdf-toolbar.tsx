import ArrowLeft2 from '@oe/assets/icons/arrow-left-2';
import ArrowRight2 from '@oe/assets/icons/arrow-right-2';
import { ZoomIn, ZoomOut } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '#shadcn/button';
import { ZOOM_LEVELS } from './pdf-viewer';

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
  return (
    <div className="w-full border-b bg-white/80 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-full items-center justify-between px-4 py-2">
        {showPerPage && (
          <div className="flex items-center gap-2">
            <ToolbarButton
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page <= 1}
              ariaLabel="Previous page"
            >
              <ArrowLeft2 color="hsl(var(--foreground))" width={16} height={16} />
            </ToolbarButton>

            <div className="mcaption-regular14 min-w-[100px] text-center">
              {page} of {numPages}
            </div>

            <ToolbarButton
              onClick={() => onPageChange(Math.min(numPages, page + 1))}
              disabled={page >= numPages}
              ariaLabel="Next page"
            >
              <ArrowRight2 color="hsl(var(--foreground))" width={16} height={16} />
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

export default PdfToolbar;
