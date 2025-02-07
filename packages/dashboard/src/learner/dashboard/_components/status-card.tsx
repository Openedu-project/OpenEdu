import { Link } from '@oe/ui/common/navigation';
import type { ReactNode } from 'react';

interface IStatusCardProps {
  label: string;
  amount: number;
  href: string;
  icon?: ReactNode;
  color?: string;
}
export default function StatusCard({ label, amount, href, icon, color }: IStatusCardProps) {
  return (
    <div className="flex-1 rounded-[12px] bg-white p-2 md:p-6">
      <Link href={href} className="flex items-center justify-between gap-4 text-foreground hover:no-underline">
        <div className="flex flex-1 items-center gap-2">
          {icon && (
            <div className="rounded-full p-2" style={{ backgroundColor: color ?? 'white' }}>
              {icon}
            </div>
          )}
          <h3 className="mcaption-bold16 mb-0 line-clamp-2">{label}</h3>
        </div>
        <span className="giant-iheading-bold18 md:giant-iheading-semibold32">{amount}</span>
      </Link>
    </div>
  );
}
