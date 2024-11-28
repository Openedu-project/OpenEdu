'use client';

import { ADMIN_ROUTES } from '@oe/core/utils/routes';
import type { TThemeTypeConfig } from '@oe/themes/types';
import { Button } from '@oe/ui/shadcn/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { ToggleGroup, ToggleGroupItem } from '@oe/ui/shadcn/toggle-group';
import { CircleArrowLeft, ComponentIcon, PaletteIcon, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export default function ThemeHeaderContent() {
  const router = useRouter();
  const [menu, setMenu] = useState<TThemeTypeConfig>('theme-setting');

  const handleToggleThemeComponent = useCallback((value: TThemeTypeConfig) => {
    setMenu(value);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const onBack = useCallback(() => {
    router.push(ADMIN_ROUTES.dashboard);
  }, []);

  return (
    <>
      <Button onClick={onBack} title="back" size="sm" variant="ghost">
        <CircleArrowLeft focusable="false" size={20} />
      </Button>
      <Select>
        <SelectTrigger className="w-[200px] border-none">
          <SelectValue placeholder="Page" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <ToggleGroup
        type="single"
        value={menu}
        className="flex-1 justify-start"
        onValueChange={handleToggleThemeComponent}
      >
        <ToggleGroupItem value="themes" aria-label="Select Theme Settings" className="flex h-[32px] gap-1">
          <PaletteIcon size={16} />
          <span className="hidden md:inline">Theme settings</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="components" aria-label="Select Components" className="flex h-[32px] gap-1">
          <ComponentIcon size={16} />
          <span className="hidden md:inline">Components</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="settings" aria-label="Select Theme Settings" className="flex h-[32px] gap-1">
          <Settings size={16} />
          <span className="hidden md:inline"> Site settings</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}
