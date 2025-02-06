'use client';

import AIBot from '@oe/assets/images/ai-bot.png';
import { AI_ROUTES } from '@oe/core/utils/routes';
import { Image } from '@oe/ui/components/image';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { cn } from '#utils/cn';
import { AIModule } from './ai-module';

export function AISidebar({ className }: { className?: string }) {
  const aiAssistant = useTranslations('aiAssistant');

  return (
    <div className={cn('scrollbar flex flex-col space-y-2 overflow-y-auto p-1 lg:w-1/5 lg:p-3', className)}>
      <div className="mb-3 flex items-center space-x-1 md:px-2">
        <Link href={AI_ROUTES.assistant} className="!p-0 !border-0 h-12 w-12 rounded-full bg-white">
          <Image alt="ai-assistant" src={AIBot.src} width={48} height={48} className="object-contain" />
        </Link>
        <span className="mcaption-semibold20 hidden text-foreground lg:block">{aiAssistant('title')}</span>
      </div>

      <AIModule labelClassName="hidden lg:flex" />
    </div>
  );
}
