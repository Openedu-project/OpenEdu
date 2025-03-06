'use client';

import AIBot from '@oe/assets/images/ai-bot.png';
import { AI_ROUTES } from '@oe/core/utils/routes';
import { Image } from '@oe/ui/components/image';
import { LayoutGrid } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Link, usePathname } from '#common/navigation';
import { Badge } from '#shadcn/badge';
import { Separator } from '#shadcn/separator';
import { Tooltip } from '#shadcn/tooltip';
import { cn } from '#utils/cn';
import { AI_SIDEBAR } from './constants';

export function AISidebar({ className }: { className?: string }) {
  const tAI = useTranslations('aiAssistant');
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <remove after have other agent page>
  const activeAgent = useMemo(
    () => (searchParams.get('agent') ? searchParams.get('agent') : pathname.includes('chat') ? 'chat' : ''),
    [searchParams]
  );

  return (
    <div className={cn('scrollbar flex flex-col space-y-2 overflow-y-auto p-1 lg:w-[100px] lg:p-5', className)}>
      <div className="flex h-full flex-col items-center gap-6 rounded-3xl shadow md:p-4">
        <div className="flex items-center space-x-1 md:px-2">
          <Link href={AI_ROUTES.assistant} className="!p-0 !border-0 relative h-12 w-12 rounded-full bg-background">
            <Image alt="ai-assistant" src={AIBot.src} width={48} height={48} className="object-contain" />
            <Badge variant="success" className="-top-2 -right-6 mbutton-bold10 absolute">
              BETA
            </Badge>
          </Link>
        </div>

        <Separator className="h-0.5 w-full bg-primary/10" />

        <div className="flex flex-col items-center gap-2">
          {AI_SIDEBAR().map(item => (
            <div key={item.value}>
              <Tooltip
                content={tAI(item.lableKey)}
                contentProps={{ side: 'right', className: 'bg-primary/10 text-primary mbutton-bold10 rounded-full' }}
                className={cn(
                  '!border-0 rounded-full p-1',
                  activeAgent?.includes(item.value) && 'outline outline-primary outline-offset-1'
                )}
              >
                <Link
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full md:h-8 md:w-8"
                  style={{ background: item.bgColor }}
                  href={item.href}
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
          className="!p-0 !border-0 relative h-10 w-10 rounded-full bg-ai-more-feature-gradient"
        >
          <LayoutGrid className="h-4 w-4 text-primary" />
        </Link>
      </div>
    </div>
  );
}
