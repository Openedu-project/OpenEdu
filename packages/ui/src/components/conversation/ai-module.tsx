'use client';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Link, usePathname } from '#common/navigation';
import { Badge } from '#shadcn/badge';
import { cn } from '#utils/cn';
import { AI_SIDEBAR } from './constants';

export function AIModule({
  className,
  labelClassName,
  showDesc = false,
}: { className?: string; labelClassName?: string; showDesc?: boolean }) {
  const tAI = useTranslations('aiAssistant');
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <remove after have other agent page>
  const activeAgent = useMemo(
    () => (searchParams.get('agent') ? searchParams.get('agent') : pathname.includes('chat') ? 'chat' : ''),
    [searchParams]
  );

  return (
    <>
      {AI_SIDEBAR.map(item => (
        <Link
          key={item.lableKey}
          href={item.href}
          className={cn(
            'flex h-auto w-full items-center justify-between gap-3 whitespace-normal rounded-xl border-2 border-transparent bg-background p-2 text-foreground hover:border-primary hover:no-underline',
            item.isComming ? 'pointer-events-none' : 'cursor-pointer',
            className,
            // pathname.includes(item.value) && '!border-primary'
            activeAgent?.includes(item.value) && '!border-primary'
          )}
          activeClassName=""
        >
          <div
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full md:h-8 md:w-8"
            style={{ background: item.bgColor }}
          >
            {item.icon}
          </div>
          <div className={cn('grow', labelClassName)}>
            <div className="flex flex-wrap justify-between gap-2">
              <span className="mcaption-semibold14 text-foreground">{tAI(item.lableKey)}</span>
              {item.isComming && (
                <Badge variant="outline_primary" className="mcaption-regular10 capitalize">
                  {tAI('commingSoon')}
                </Badge>
              )}
            </div>
            {showDesc && <p className="mcaption-regular14 mt-2">{tAI(item.descKey)}</p>}
          </div>
        </Link>
      ))}
    </>
  );
}
