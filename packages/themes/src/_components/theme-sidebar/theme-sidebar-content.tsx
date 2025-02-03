import {
  getComponentsMenu,
  getGlobalThemeMenu,
  getMetadataMenu,
  getPagesMenu,
} from '@oe/themes/config/theme-sidebar-config';
import type {
  AllGroupSidebarKeys,
  AllSidebarKeys,
  GroupMenuItem,
  SimpleMenuItem,
  ThemeConfigKey,
  ThemeName,
  ThemePageKey,
} from '@oe/themes/types/index';
import { Sidebar, SidebarContent, SidebarGroupContent, SidebarMenu } from '@oe/ui/shadcn/sidebar';
import { SidebarGroup } from './sidebar-group';
import { SidebarItem } from './sidebar-item';

interface ThemeSidebarProps {
  themeName: ThemeName;
  configKey: ThemeConfigKey; //menu key
  activedSidbarKey: AllSidebarKeys;
  pageKey?: ThemePageKey;
}

export default function ThemeSidebar({ themeName, configKey, activedSidbarKey, pageKey }: ThemeSidebarProps) {
  const renderMenuContent = () => {
    const menuItems = {
      pages: getPagesMenu(themeName),
      components: getComponentsMenu(themeName),
      metadata: getMetadataMenu(themeName),
      globals: getGlobalThemeMenu(themeName),
    };

    return menuItems[configKey]?.map(
      (item: SimpleMenuItem<AllSidebarKeys> | GroupMenuItem<AllGroupSidebarKeys, AllSidebarKeys>) =>
        item.type === 'group' ? (
          <SidebarGroup
            key={item.key}
            label={item.label}
            items={item.items}
            activeKey={activedSidbarKey}
            isCurrentGroup={pageKey === item.key}
          />
        ) : (
          <SidebarItem key={item.key} label={item.label} isActive={activedSidbarKey === item.key} href={item.href} />
        )
    );
  };

  return (
    <Sidebar className="top-[var(--header-small-height)] bg-background p-4 md:top-[var(--header-height)]">
      <SidebarContent>
        <SidebarGroupContent>
          <SidebarMenu>{renderMenuContent()}</SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  );
}
