import { Link } from '@oe/ui';
import { cn } from '@oe/ui';

export function BlogNavigateLink({
  active = false,
  label,
  href,
}: {
  active: boolean;
  label: string;
  href: string;
}) {
  return (
    <div className={cn('py-1', active && 'border-primary border-b')}>
      <Link
        variant="ghost"
        size="xs"
        className={cn(active && 'border border-primary text-primary')}
        activeClassName=""
        href={href}
      >
        {label}
      </Link>
    </div>
  );
}
