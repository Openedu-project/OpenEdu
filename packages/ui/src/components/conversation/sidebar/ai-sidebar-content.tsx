import { useGetMe } from '@oe/api';
import { MessageTime } from '@oe/assets';
import AIMascot from '@oe/assets/images/ai/ai-mascot-2.png';
import { AI_ROUTES } from '@oe/core';
import { CircleChevronLeft, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { Link, usePathname } from '#common/navigation';
import { Image } from '#components/image';
import { Badge } from '#shadcn/badge';
import { Separator } from '#shadcn/separator';
import { SidebarContent, SidebarTrigger } from '#shadcn/sidebar';
import { cn } from '#utils/cn';
import { AI_SIDEBAR } from '../constants';

const TopLastestHistory = dynamic(() => import('../history/top-lastest-history').then(mod => mod.TopLastestHistory), {
  ssr: false,
});

export function AISidebarContent({
  open,
  isLogin,
  onClick,
  handleCloseSidebar,
}: {
  open?: boolean;
  className?: string;
  isLogin?: boolean;
  onClick?: () => void;
  handleCloseSidebar?: () => void;
}) {
  const tAI = useTranslations('aiAssistant');
  const pathname = usePathname();
  const { dataMe } = useGetMe();

  return (
    <SidebarContent className="scrollbar flex h-full flex-col gap-2 overflow-y-auto bg-primary/5 p-2">
      <div className={cn('flex items-center justify-center', open && 'justify-end')}>
        <SidebarTrigger className="size-6 text-primary hover:text-primary" onClick={onClick}>
          <CircleChevronLeft size={20} />
        </SidebarTrigger>
      </div>
      <div className={cn('-mt-2 flex flex-wrap items-center justify-center', open && '-mt-6 w-fit justify-start')}>
        <Link
          href={AI_ROUTES.assistant}
          onClick={handleCloseSidebar}
          className="!p-0 !border-0 relative mr-1 h-10 w-10 rounded-full bg-background md:h-12 md:w-12"
        >
          <Image alt="ai-assistant" src={AIMascot.src} width={48} height={48} className="object-contain" />
          <Badge variant="secondary" className="md:-right-1 mbutton-bold10 absolute right-0 bottom-0 px-1 md:bottom-7">
            β
          </Badge>
        </Link>
        <span className={cn('giant-iheading-semibold12 ml-1 text-foreground', open && 'giant-iheading-semibold14')}>
          {!dataMe?.pricing_plan || dataMe?.pricing_plan === 'free' ? tAI('freePlan') : tAI('proPlan')}
        </span>
      </div>

      <Separator className="h-0.5 w-full bg-primary/10" />

      <div className="flex flex-col gap-1">
        {AI_SIDEBAR('var(--primary)', 14)
          .filter(i => !i.hidden)
          .map(item => (
            <Link
              key={item.value}
              href={item.href}
              disabled={item.isComming}
              activeClassName={open && item.agent !== 'ai_search' ? undefined : ''}
              className={cn(
                '!no-underline h-auto flex-wrap justify-center rounded-3xl p-0.5 hover:cursor-pointer hover:bg-primary/10',
                open ? 'justify-start' : 'flex-col'
              )}
              onClick={handleCloseSidebar}
            >
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ai-more-feature-gradient',
                  pathname?.includes(item.value) && !open && 'border border-primary'
                )}
              >
                {item.icon}
              </div>
              <p
                className={cn(
                  'giant-iheading-semibold12 truncate text-center text-foreground',
                  open && 'giant-iheading-semibold14 ml-2'
                )}
              >
                {item.agent === 'ai_search' ? tAI('newChat') : open ? tAI(item.lableKey) : tAI(item.shortLableKey)}
              </p>
              {open && item.isComming && (
                <Badge variant="outline" className="ml-2 border-primary text-primary">
                  {tAI('soon')}
                </Badge>
              )}
            </Link>
          ))}
      </div>
      <Separator className="h-0.5 w-full bg-primary/10" />
      {open ? (
        <div className="flex grow flex-col gap-2">
          <div className="flex w-full items-center justify-between pl-1">
            <p className="mcaption-semibold14 text-foreground">{tAI('history')}</p>
            <Link href={AI_ROUTES.history} activeClassName="" onClick={handleCloseSidebar}>
              <Search size={16} color="var(--foreground)" />
            </Link>
          </div>
          {isLogin ? (
            <TopLastestHistory onClickHistory={handleCloseSidebar} />
          ) : (
            <div className="mcaption-regular14 text-center">{tAI('noHistory')}</div>
          )}
        </div>
      ) : (
        <div>
          <Link
            href={AI_ROUTES.history}
            className={cn(
              'm-auto flex h-8 w-8 rounded-full bg-ai-more-feature-gradient hover:border-primary hover:bg-ai-more-feature-gradient'
            )}
            size="icon"
            onClick={handleCloseSidebar}
          >
            <MessageTime color="var(--primary)" width={14} height={14} />
          </Link>
          <p className="mcaption-semibold12 mt-1 text-center text-foreground">{tAI('history')}</p>
        </div>
      )}
    </SidebarContent>
  );
}
