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
      {AI_SIDEBAR('hsl(var(--primary))', 24)
        .slice(1)
        .map(item => (
          <Link
            key={item.lableKey}
            href={item.href}
            className={cn(
              'flex h-auto w-full items-center justify-between gap-3 whitespace-normal rounded-2xl border-2 border-transparent bg-background p-2 text-foreground shadow-shadow-7 hover:border-primary hover:no-underline',
              item.isComming ? 'pointer-events-none' : 'cursor-pointer',
              className,
              // pathname.includes(item.value) && '!border-primary'
              activeAgent?.includes(item.value) && '!border-primary'
            )}
            activeClassName=""
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-auth-background md:h-16 md:w-16">
              {item.icon}
            </div>
            <div className={cn('grow', labelClassName)}>
              <div className="flex flex-wrap justify-between gap-2">
                <span className="mcaption-bold16 text-foreground">{tAI(item.lableKey)}</span>
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
