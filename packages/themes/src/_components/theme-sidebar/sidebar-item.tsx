import { Link } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';
import { cn } from '@oe/ui/utils/cn';

interface SidebarItemProps {
  label: string;
  isActive: boolean;
  href: string;
}

const SidebarItem = ({ label, isActive, href }: SidebarItemProps) => (
  <Link href={href} className="w-full border-none p-0 text-accent-foreground hover:no-underline ">
    <Button
      variant="ghost"
      className={cn(
        'w-full justify-start px-4 py-2 text-left text-accent-foreground text-sm transition-colors ',
        'hover:bg-accent hover:text-accent-foreground',
        isActive && 'bg-accent text-accent-foreground'
      )}
    >
      {label}
    </Button>
  </Link>
);

SidebarItem.displayName = 'SidebarItem';

export { SidebarItem, type SidebarItemProps };
