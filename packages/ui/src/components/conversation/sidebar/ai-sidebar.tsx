'use client';
import { CircleChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type CSSProperties, useState } from 'react';
import { Button } from '#shadcn/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '#shadcn/sheet';
import { Sidebar } from '#shadcn/sidebar';
import { useIsMobile } from '#shadcn/use-mobile';
import { cn } from '#utils/cn';
import { AISidebarContent } from './ai-sidebar-content';

export const SIDEBAR_WIDTH = '14rem';
export const SIDEBAR_WIDTH_ICON = '5rem';

const MobileSidebarSheet = ({ isLogin }: { isLogin?: boolean }) => {
  const [openSheet, setOpenSheet] = useState(false);
  const tAI = useTranslations('aiAssistant');

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button className="fixed left-0 z-50 h-14 flex-col rounded-none rounded-r-full border border-2 bg-gradient-to-b from-turquoise-500 to-violet-500 p-2">
          <CircleChevronLeft size={16} />
          <span className="mcaption-regular12">{tAI('menu')}</span>
        </Button>
      </SheetTrigger>
      <SheetTitle hidden />
      <SheetContent side="left" hasCloseButton={false} className="rounded-r-lg p-0">
        <AISidebarContent
          isLogin={isLogin}
          handleCloseSidebar={() => {
            setOpenSheet(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};

export function AISidebar({
  isLogin,
  className,
}: {
  isLogin?: boolean;
  className?: string;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileSidebarSheet isLogin={isLogin} />;
  }

  return (
    <Sidebar
      className={cn('top-[var(--header-height)] h-[calc(100dvh-var(--header-height))]', className)}
      style={
        {
          '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
          '--sidebar-width': SIDEBAR_WIDTH,
        } as CSSProperties
      }
      collapsible="icon"
    >
      <AISidebarContent isLogin={isLogin} />
    </Sidebar>
  );
}
