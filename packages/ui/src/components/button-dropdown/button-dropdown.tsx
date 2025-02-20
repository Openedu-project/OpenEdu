import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from '#common/navigation';
import { Button } from '#shadcn/button';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '#shadcn/dropdown-menu';
import { DropdownMenu } from '#shadcn/dropdown-menu';
import { cn } from '#utils/cn';

interface ButtonDropdownProps {
  type?: 'default' | 'outline';
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  options: {
    label: string;
    value: string;
    href?: string;
    icon?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }[];
}

export default function ButtonDropdown({
  type = 'default',
  label,
  icon,
  href,
  onClick,
  options,
  className,
}: ButtonDropdownProps) {
  return (
    <div className={cn('inline-flex items-center rounded-r-none', className)}>
      {href ? (
        <Link href={href} variant={type} className="h-full rounded-r-none" activeClassName="">
          {icon}
          {label}
        </Link>
      ) : (
        <Button variant={type} className="h-full rounded-r-none" onClick={onClick}>
          {icon}
          {label}
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={type}
            className="before:-translate-y-1/2 relative h-full rounded-l-none border-l-0 px-2 before:absolute before:inset-0 before:top-1/2 before:left-0 before:h-1/2 before:w-px before:bg-border"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {options.map(option =>
            option.href ? (
              <DropdownMenuItem asChild key={option.value} disabled={option.disabled}>
                <Link
                  href={option.href}
                  variant="ghost"
                  className="h-8 justify-start rounded font-medium"
                  activeClassName=""
                  disabled={option.disabled}
                >
                  {option.icon}
                  {option.label}
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem key={option.value} onSelect={option.onClick} disabled={option.disabled}>
                {option.icon}
                {option.label}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
