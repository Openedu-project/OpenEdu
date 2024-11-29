'use client';

import { ADMIN_ROUTES } from '@oe/core/utils/routes';
import { useThemeStore } from '@oe/themes/store/useThemeStore';

import type { TThemeTypeConfig } from '@oe/themes/types';
import { Button } from '@oe/ui/shadcn/button';
import { CircleArrowLeft, PanelTop } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { ToggleGroup, ToggleGroupItem } from '@oe/ui/shadcn/toggle-group';
import { ComponentIcon, PaletteIcon, Settings } from 'lucide-react';

import type React from 'react';

const PAGE_OPTIONS = [
  { value: 'homepage', label: 'Homepage' },
  { value: 'contact-us', label: 'Contact Us' },
  { value: 'about', label: 'About' },
  { value: 'terms-n-policys', label: 'Terms and Policies' },
] as const;

const TOGGLE_OPTIONS = [
  {
    value: 'page' as const,
    label: 'Page settings',
    icon: PanelTop,
    ariaLabel: 'Select Page Settings',
  },
  {
    value: 'theme-setting' as const,
    label: 'Theme settings',
    icon: PaletteIcon,
    ariaLabel: 'Select Theme Settings',
  },
  {
    value: 'components' as const,
    label: 'Components',
    icon: ComponentIcon,
    ariaLabel: 'Select Components',
  },
  {
    value: 'site-setting' as const,
    label: 'Site settings',
    icon: Settings,
    ariaLabel: 'Select Site Settings',
  },
] as const;

interface PageSelectorProps {
  selectedPage?: string;
  onPageChange: (page: string) => void;
}

export const PageSelector = ({ selectedPage, onPageChange }: PageSelectorProps) => {
  return (
    <Select value={selectedPage} onValueChange={onPageChange}>
      <SelectTrigger className="w-[200px] border-none">
        <SelectValue placeholder="Page" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {PAGE_OPTIONS.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

interface MenuToggleGroupProps {
  selectedMenu: TThemeTypeConfig;
  onMenuChange: (value: TThemeTypeConfig) => void;
}

export const MenuToggleGroup: React.FC<MenuToggleGroupProps> = ({ selectedMenu, onMenuChange }) => {
  return (
    <ToggleGroup type="single" value={selectedMenu} className="flex-1 justify-start" onValueChange={onMenuChange}>
      {TOGGLE_OPTIONS.map(({ value, label, icon: Icon, ariaLabel }) => (
        <ToggleGroupItem key={value} value={value} aria-label={ariaLabel} className="flex h-[32px] gap-1">
          <Icon size={16} />
          <span className="hidden md:inline">{label}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default function ThemeHeaderContent() {
  const { selectedMenu, setSelectedMenu, selectedPage, setSelectedPage } = useThemeStore();
  const router = useRouter();

  const handleMenuChange = useCallback(
    (value: TThemeTypeConfig) => {
      setSelectedMenu(value);
    },
    [setSelectedMenu]
  );

  const handleBack = useCallback(() => {
    router.push(ADMIN_ROUTES.dashboard);
  }, [router]);

  const handlePageChange = useCallback(
    (page: string) => {
      setSelectedPage(page);
    },
    [setSelectedPage]
  );

  return (
    <>
      <Button onClick={handleBack} title="Back to Dashboard" size="sm" variant="ghost">
        <CircleArrowLeft focusable="false" size={20} />
      </Button>

      <PageSelector selectedPage={selectedPage} onPageChange={handlePageChange} />

      <MenuToggleGroup selectedMenu={selectedMenu} onMenuChange={handleMenuChange} />
    </>
  );
}
