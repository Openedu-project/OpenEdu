import type { ReactNode } from 'react';
import type { SelectboxOption } from '../selectbox';

export interface TabOption extends SelectboxOption {
  icon?: ReactNode;
  content: ReactNode | ((option: TabOption, index: number) => ReactNode);
}

export interface TabItem {
  id: string;
  value: string; // thêm value để map với option
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

export interface TabContentHeaderProps {
  tab: TabItem;
  options: TabOption[];
  onOptionSelect: (tabId: string, option: TabOption) => void;
  onRemove: (tabId: string) => void;
}

export interface SortableTabsProps {
  defaultTabs?: TabItem[];
  options: TabOption[];
  onTabsChange?: (tabs: TabItem[]) => void;
  className?: string;
}
