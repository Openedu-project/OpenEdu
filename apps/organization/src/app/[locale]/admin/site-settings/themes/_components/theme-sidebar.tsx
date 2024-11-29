'use client';

import {
  COMPONENTS_MENU,
  PAGE_SECTIONS,
  SITE_SETTINGS_MENU,
  THEME_SETTINGS_MENU,
} from '@oe/themes/config/theme-menu-config';
import { useThemeStore } from '@oe/themes/store/useThemeStore';
import type { MenuItem, TThemeMenuDefinition } from '@oe/themes/types';
import { Button } from '@oe/ui/shadcn/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@oe/ui/shadcn/collapsible';
import { Sidebar, SidebarContent, SidebarGroupContent, SidebarMenu } from '@oe/ui/shadcn/sidebar';
import { cn } from '@oe/ui/utils/cn';
import { ChevronDown } from 'lucide-react';

interface SidebarItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem = ({ label, isActive, onClick }: SidebarItemProps) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className={cn(
      'w-full justify-start px-4 py-2 text-left text-sm transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      isActive && 'bg-accent text-accent-foreground'
    )}
  >
    {label}
  </Button>
);

interface SidebarGroupProps {
  label: string;
  items: MenuItem[];
  activeKey: string | null;
  onItemClick: (key: string) => void;
}

const SidebarGroup = ({ label, items, activeKey, onItemClick }: SidebarGroupProps) => (
  <Collapsible defaultOpen className="group/collapsible space-y-1">
    <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2 hover:bg-accent/50">
      <span className="font-medium text-sm">{label}</span>
      <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
    </CollapsibleTrigger>
    <CollapsibleContent>
      {items.map(item => (
        <SidebarItem
          key={item.key}
          label={item.label}
          isActive={activeKey === item.key}
          onClick={() => onItemClick(item.key)}
        />
      ))}
    </CollapsibleContent>
  </Collapsible>
);

export default function ThemeSidebar() {
  const {
    selectedMenu,
    selectedPage,
    selectedSettingKey,
    // selectedPageSection,
    setSelectedSettingKey,
    // setSelectedPageSection,
  } = useThemeStore();

  const renderMenuContent = () => {
    const menuItems = {
      page: PAGE_SECTIONS[selectedPage],
      components: COMPONENTS_MENU,
      'site-setting': SITE_SETTINGS_MENU,
      'theme-setting': THEME_SETTINGS_MENU,
    };

    if (selectedMenu !== 'page') {
      return menuItems[selectedMenu]?.map(group => (
        <SidebarGroup
          key={group.key}
          label={group.label}
          items={group.items}
          activeKey={selectedSettingKey}
          onItemClick={setSelectedSettingKey}
        />
      ));
    }

    // For Page-specific sections
    const pageSections: TThemeMenuDefinition = PAGE_SECTIONS[selectedPage] || [];
    return pageSections?.map(group => (
      <SidebarGroup
        key={group.key}
        label={group.label}
        items={group.items}
        activeKey={selectedSettingKey}
        onItemClick={setSelectedSettingKey}
      />
    ));
  };

  return (
    <Sidebar className="top-16 mt-2">
      <SidebarContent>
        <SidebarGroupContent>
          <SidebarMenu>{renderMenuContent()}</SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  );
}
