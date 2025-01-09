'use client';

import Openedu from '@oe/assets/images/openedu-white.png';
import { AI_ROUTES } from '@oe/core/utils/routes';
import { Image } from '@oe/ui/components/image';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { cn } from '#utils/cn';
import { AIModule } from './ai-module';

export function AISidebar({ className }: { className?: string }) {
  const aiAssistant = useTranslations('aiAssistant');

  return (
    <div className={cn('horizontal-scrollbar flex flex-col space-y-4 overflow-y-auto p-1 lg:w-1/5 lg:p-3', className)}>
      <div className="mb-3 flex items-center space-x-3 md:px-2">
        <Link
          href={AI_ROUTES.assistant}
          className="!p-1 flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white"
          style={{
            background: 'linear-gradient(144deg, #2CDEE9 18.7%, #7B5AFF 82.64%)',
          }}
        >
          <Image alt="ai-assistant" src={Openedu.src} width={22} height={16} className="object-contain" />
        </Link>
        <span className="mcaption-semibold20 hidden text-foreground lg:block">{aiAssistant('title')}</span>
      </div>

      <AIModule labelClassName="hidden lg:flex" />
    </div>
  );
}
