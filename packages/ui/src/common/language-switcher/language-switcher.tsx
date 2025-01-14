'use client';

import { Button } from '@oe/ui/shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@oe/ui/shadcn/dropdown-menu';
import { Languages } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { changeLanguage } from './action';

const languages = [
  {
    code: 'vi' as const,
    name: 'Tiếng Việt',
  },
  {
    code: 'en' as const,
    name: 'English',
  },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams?.toString();
  const fullPath = query ? `${pathname}?${query}` : pathname;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map(language => (
          <DropdownMenuItem
            key={language.code}
            onClick={async () => {
              await changeLanguage(language.code, fullPath);
            }}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
