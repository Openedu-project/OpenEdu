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
import { SidebarContent, SidebarTrigger, useSidebar } from '#shadcn/sidebar';
import { TooltipLink } from '#shadcn/tooltip';
import { cn } from '#utils/cn';
import { AI_SIDEBAR } from '../constants';

const TopLastestHistory = dynamic(() => import('../history/top-lastest-history').then(mod => mod.TopLastestHistory), {
  ssr: false,
});

export function AISidebarContent({
  isLogin,
  handleCloseSidebar,
}: {
  className?: string;
  isLogin?: boolean;
  handleCloseSidebar?: () => void;
}) {
  const tAI = useTranslations('aiAssistant');
  const pathname = usePathname();
  const { open } = useSidebar();
  const { dataMe } = useGetMe();

  return (
    <SidebarContent className="scrollbar flex h-full flex-col gap-2 overflow-y-auto bg-primary/5 p-2">
      <div className={cn('flex items-center justify-center', open && 'justify-end')}>
        <SidebarTrigger className="size-6 text-primary hover:text-primary" onClick={handleCloseSidebar}>
          <CircleChevronLeft size={20} />
        </SidebarTrigger>
      </div>
      <div className={cn('flex items-center justify-center', open ? '-mt-6 w-fit justify-start' : 'flex-col')}>
        <Link
          href={AI_ROUTES.assistant}
          onClick={handleCloseSidebar}
          className={cn('!p-0 !border-0 relative mr-1 h-10 w-10 rounded-full bg-background', open && 'md:h-12 md:w-12')}
        >
          <Image alt="ai-assistant" src={AIMascot.src} width={48} height={48} className="object-contain" />
          <Badge variant="secondary" className="md:-right-1 mbutton-bold10 absolute right-0 bottom-0 px-1 md:bottom-6">
            β
          </Badge>
        </Link>
        <span className={cn('giant-iheading-semibold12 ml-1 text-foreground', open && 'giant-iheading-semibold14')}>
          {!dataMe?.pricing_plan || dataMe?.pricing_plan === 'free' ? tAI('freePlan') : tAI('proPlan')}
        </span>
      </div>

      <Separator className="h-0.5 w-full bg-primary/10" />

      {open ? (
        <>
          <div className="flex flex-col gap-1">
            {AI_SIDEBAR('var(--primary)', 14)
              .filter(i => !i.hidden)
              .map(item => (
                <Link
                  key={item.value}
                  href={item.href}
                  disabled={item.isComming}
                  activeClassName={pathname !== item.href ? '' : undefined}
                  className="!no-underline h-auto flex-wrap justify-start rounded-3xl p-0.5 hover:cursor-pointer hover:bg-primary/10"
                  onClick={handleCloseSidebar}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ai-more-feature-gradient">
                    {item.icon}
                  </div>
                  <p className="giant-iheading-semibold14 ml-2 truncate text-center text-foreground">
                    {item.agent === 'ai_search' ? tAI('newChat') : tAI(item.lableKey)}
                  </p>
                  {item.isComming && (
                    <Badge variant="outline" className="ml-2 border-primary text-primary">
                      {tAI('soon')}
                    </Badge>
                  )}
                </Link>
              ))}
          </div>
          <Separator className="h-0.5 w-full bg-primary/10" />
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
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-2">
            {AI_SIDEBAR('var(--primary)', 14)
              .filter(i => !i.hidden)
              .map(item => (
                <TooltipLink
                  key={item.value}
                  name={item.icon}
                  href={item.href}
                  disabled={item.isComming}
                  content={item.agent === 'ai_search' ? tAI('newChat') : tAI(item.lableKey)}
                  activeClassName={pathname !== item.href ? '' : undefined}
                  contentProps={{
                    className: 'rounded-full text-primary border border-primary !mcaption-regular10 p-1',
                    side: 'right',
                    align: 'start',
                  }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ai-more-feature-gradient"
                />
              ))}
          </div>
          <Separator className="h-0.5 w-full bg-primary/10" />
          <TooltipLink
            name={<MessageTime color="var(--primary)" width={14} height={14} />}
            href={AI_ROUTES.history}
            content={tAI('history')}
            contentProps={{
              className: 'rounded-full text-primary border border-primary !mcaption-regular10 p-1',
              side: 'right',
              align: 'start',
            }}
            className="mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ai-more-feature-gradient"
          />
        </>
      )}
    </SidebarContent>
  );
}
