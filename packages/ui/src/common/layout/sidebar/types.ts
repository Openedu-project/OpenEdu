import type { ReactNode } from 'react';

export interface ISidebarItem {
  id: string;
  label: string;
  href?: string;
  items?: ISidebarItem[];
  icon?: ReactNode;
  isRoot?: boolean;
}

export interface ISidebarItemProps {
  item: ISidebarItem;
  depth: number;
  maxDepth: number;
  pathname: string;
  isCollapsed: boolean;
}

export interface ISidebarProps {
  items: ISidebarItem[];
  maxDepth?: number;
  pathnamesNoSidebar?: string[];
  className?: string;
  isDrawer?: boolean;
}
