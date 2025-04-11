import { cn } from '#utils/cn';

import { Link } from '#common/navigation';

export interface SidebarLinks {
  href: string;
  label: string;
}

export function Sidebar({ links }: { links: SidebarLinks[] }) {
  return (
    <nav className="p-2">
      <ul className="flex flex-col gap-2 font-medium md:flex-row">
        {links.map(link => {
          return (
            <li key={`${link.label}-${link.href}`}>
              <Link className={cn('flex justify-start space-x-2 hover:text-primary')} variant="ghost" href={link.href}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
