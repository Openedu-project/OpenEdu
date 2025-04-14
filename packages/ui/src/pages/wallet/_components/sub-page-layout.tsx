import { WALLET_ROUTES } from '@oe/core';
import { ChevronLeft } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { Link } from '#common/navigation';
import { cn } from '#utils/cn';

interface SubPageLayoutProps {
  children: ReactNode;
  backLink?: string;
  title: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export const SubPageLayout: FC<SubPageLayoutProps> = ({ children, backLink, title, actions, className }) => {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className="flex items-center justify-between">
        <Link
          href={backLink ?? WALLET_ROUTES.wallet}
          className="flex justify-start gap-2 p-0 hover:bg-transparent hover:underline"
          variant="ghost"
          activeClassName="border-none text-foreground"
        >
          <ChevronLeft className="size-4" />
          <span className="giant-iheading-semibold18">{title}</span>
        </Link>
        {actions}
      </div>
      {children}
    </div>
  );
};
