import type { ReactNode } from 'react';
import { Card, CardContent } from '#shadcn/card';
import { cn } from '#utils/cn';

interface AssetCardProps {
  highlighted?: boolean;
  icon: ReactNode;
  label: string;
  value?: ReactNode;
  actionBtns?: ReactNode;
  cardContent?: ReactNode;
  className?: string;
}

const AssetCard = ({ highlighted, icon, label, value, actionBtns, cardContent, className }: AssetCardProps) => (
  <Card
    className={cn('p-3 transition-all', highlighted ? 'border border-primary hover:border-primary' : '', className)}
  >
    <CardContent className="flex gap-2 p-0">
      {icon}
      <div className="flex flex-1 flex-col gap-2 font-semibold">
        <span>{label}</span>
        <span className="text-2xl">{cardContent ?? value}</span>
      </div>
      {actionBtns && <div className="flex gap-4">{actionBtns}</div>}
    </CardContent>
  </Card>
);

export { AssetCard };
