'use client';

import { AI_ROUTES } from '@oe/core/utils/routes';
import { ImageIcon, MessageCircle, Search, SquarePlay } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Link, usePathname } from '#common/navigation';
import { Badge } from '#shadcn/badge';
import { cn } from '#utils/cn';

export interface AISidebarItem {
  lableKey: string;
  descKey: string;
  value: string;
  icon: ReactNode;
  href: string;
  isComming?: boolean;
}

export const aiSidebarItem: AISidebarItem[] = [
  {
    lableKey: 'aiChat',
    descKey: 'aiChatDesc',
    value: 'ai-chat',
    href: AI_ROUTES.chat,
    icon: <MessageCircle className="h-4 w-4 text-white" />,
  },
  {
    lableKey: 'aiImage',
    descKey: 'aiImageDesc',
    value: 'ai-image',
    href: AI_ROUTES.imageGenerator,
    icon: <ImageIcon className="h-4 w-4 text-white" />,
    isComming: true,
  },
  {
    lableKey: 'aiSearch',
    descKey: 'aiSearchDesc',
    value: 'ai-search',
    href: AI_ROUTES.search,
    icon: <Search className="h-4 w-4 text-white" />,
    isComming: true,
  },
  {
    lableKey: 'aiVideo',
    descKey: 'aiVideoDesc',
    value: 'ai-video',
    href: AI_ROUTES.video,
    icon: <SquarePlay className="h-4 w-4 text-white" />,
    isComming: true,
  },
];

export const BG_COLOR = [
  'linear-gradient(#8FF9A4 0%, #11C541 100%)',
  'linear-gradient(#FFB9FA 0%, #FD77F3 100%)',
  'linear-gradient(#FFD591 0%, #EF9E42 100%)',
  'linear-gradient(#86C5FF 0%, #0A8AFF 100%)',
];

export function AIModule({
  className,
  labelClassName,
  showDesc = false,
}: { className?: string; labelClassName?: string; showDesc?: boolean }) {
  const tAI = useTranslations('aiAssistant');
  const pathname = usePathname();

  return (
    <>
      {aiSidebarItem.map((item, index) => (
        <Link
          key={item.lableKey}
          href={item.href}
          className={cn(
            'flex h-auto w-full items-center justify-between gap-3 whitespace-normal rounded-xl border-2 border-transparent bg-white p-2 text-foreground hover:border-primary hover:no-underline',
            item.isComming ? 'pointer-events-none' : 'cursor-pointer',
            className,
            pathname.includes(item.value) && '!border-primary'
          )}
        >
          <div
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full md:h-8 md:w-8"
            style={{ background: BG_COLOR[index % BG_COLOR.length] }}
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
