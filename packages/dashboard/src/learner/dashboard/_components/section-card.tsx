import { buttonVariants } from '@oe/ui';
import { Link } from '@oe/ui';
import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { HTMLAttributes } from 'react';

interface ISectionCard extends HTMLAttributes<HTMLDivElement> {
  title: string;
  //   children: ReactNode;
  viewAllButtonLink?: string;
}
export function SectionCard({ title, children, viewAllButtonLink, className, ...props }: ISectionCard) {
  const t = useTranslations('general');

  return (
    <div className={cn(className, 'rounded-2xl bg-white p-4 md:p-6')} {...props}>
      <div className="mb-2 flex flex-wrap items-center justify-between">
        <h3 className="mcaption-semibold20">{title}</h3>
        {viewAllButtonLink && (
          <Link
            className={cn(buttonVariants({ variant: 'outline' }), 'py-2 text-accent-foreground hover:no-underline')}
            href={viewAllButtonLink}
          >
            {t('viewAll')}
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
