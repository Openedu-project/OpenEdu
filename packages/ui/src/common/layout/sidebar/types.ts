import type { ReactNode } from 'react';

export interface ISidebarItem {
  id: string;
  label: string;
  href?: string;
  items?: ISidebarItem[];
  icon?: ReactNode;
  isRoot?: boolean;
  isHighlight?: boolean;
  version?: string;
  isLoginRequired?: boolean;
}

export interface ISidebarItemProps {
  item: ISidebarItem;
  disabled?: boolean;
  depth: number;
  maxDepth: number;
  pathname: string;
  isCollapsed: boolean;
  onNavigate?: () => void;
}

export interface ISidebarProps {
  items: ISidebarItem[];
  maxDepth?: number;
  pathnamesNoSidebar?: string[];
  className?: string;
  isDrawer?: boolean;
  isLoggedIn?: boolean;
}
