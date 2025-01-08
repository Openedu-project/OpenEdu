import { Loader, RotateCcw, TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Badge } from '#shadcn/badge';
import { Button } from '#shadcn/button';
import { Tooltip, TooltipProvider } from '#shadcn/tooltip';

export interface IAITag {
  status: 'success' | 'failed' | 'loading' | 'pending' | 'generating' | 'waiting' | 'setting';
  errorMessage?: string;
  toolIcon?: ReactNode;
}
export function AITag({ status, errorMessage, toolIcon }: IAITag) {
  const tErrors = useTranslations('errors');

  return status === 'failed' ? (
    <TooltipProvider>
      <Tooltip
        content={
          <p className="break-word max-w-[150px] text-start md:max-w-[200px]">{errorMessage ?? tErrors('Error')}</p>
        }
      >
        <Button variant="link" className="!p-0">
          <Badge variant="destructive" className="mcaption-regular12 capitalize">
            AI
            <TriangleAlert className="ml-1 h-4 w-4" />
          </Badge>
        </Button>
      </Tooltip>
    </TooltipProvider>
  ) : status === 'setting' ? (
    <Badge variant="outline" className="mcaption-regular12 bg-[#FFBD04] capitalize">
      AI
      <RotateCcw className="ml-1 h-4 w-4" />
    </Badge>
  ) : (
    <Badge variant="success" className="mcaption-regular12 capitalize">
      AI
      {['generating', 'pending', 'loading', 'waiting'].includes(status) ? (
        <Loader className="ml-1 h-4 w-4 animate-spin" />
      ) : (
        (toolIcon ?? '')
      )}
    </Badge>
  );
}
