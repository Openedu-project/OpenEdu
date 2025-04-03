'use client';

import AIMascot from '@oe/assets/images/ai/ai-mascot-2.png';
import { AI_ROUTES } from '@oe/core/utils/routes';
import { Image } from '@oe/ui/components/image';
import { LayoutGrid } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '#common/navigation';
import { Badge } from '#shadcn/badge';
import { Separator } from '#shadcn/separator';
import { Tooltip } from '#shadcn/tooltip';
import { cn } from '#utils/cn';
import { AI_SIDEBAR } from './constants';

export function AISidebar({ className }: { className?: string }) {
  const tAI = useTranslations('aiAssistant');
  const pathname = usePathname();

  return (
    <div className={cn('overflow-hidden p-1 lg:p-5', className)}>
      <div className="scrollbar flex h-full flex-col items-center gap-6 overflow-y-auto rounded-3xl shadow-shadow-7 md:p-4">
        <div className="flex items-center space-x-1 md:px-2">
          <Link href={AI_ROUTES.assistant} className="!p-0 !border-0 relative h-12 w-12 rounded-full bg-background">
            <Image alt="ai-assistant" src={AIMascot.src} width={48} height={48} className="object-contain" />
            <Badge
              variant="secondary"
              className="md:-right-1 mbutton-bold10 absolute right-0 bottom-0 px-1 md:bottom-7"
            >
              β
            </Badge>
          </Link>
        </div>

        <Separator className="h-0.5 w-full bg-primary/10" />

        <div className="flex flex-col items-center gap-2">
          {AI_SIDEBAR('white').map(item => (
            <div key={item.value}>
              <Tooltip
                content={tAI(item.lableKey)}
                contentProps={{
                  side: 'right',
                  className: 'text-primary mbutton-bold10 rounded-full',
                }}
                className={cn(
                  '!border-0 rounded-full p-1',
                  pathname.includes(item.value) && 'outline outline-primary outline-offset-1'
                )}
              >
                <Link
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full md:h-8 md:w-8"
                  style={{ background: item.bgColor }}
                  href={item.href}
                  disabled={item.isComming}
                >
                  {item.icon}
                </Link>
              </Tooltip>
              <p className="mbutton-bold10 mt-2 w-full text-center">{tAI(item.shortLableKey)}</p>
            </div>
          ))}
        </div>
        <Separator className="h-0.5 w-full bg-primary/10" />
        <Link
          href={AI_ROUTES.assistant}
          className="!p-0 !border-0 relative h-10 w-10 shrink-0 rounded-full bg-ai-more-feature-gradient"
        >
          <LayoutGrid className="h-4 w-4 text-primary" />
        </Link>
      </div>
    </div>
  );
}
