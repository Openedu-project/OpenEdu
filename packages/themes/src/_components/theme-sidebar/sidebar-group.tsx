'use client';
import type { AllSidebarKeys, MenuItem } from '@oe/themes/types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@oe/ui/shadcn/collapsible';
import { ChevronDown } from 'lucide-react';
import { SidebarItem } from './sidebar-item';

interface SidebarGroupProps {
  label: string;
  items: MenuItem<AllSidebarKeys>[];
  activeKey?: string;
  isCurrentGroup: boolean;
  onItemClick?: (key: AllSidebarKeys) => void;
}

const SidebarGroup = ({ label, items, activeKey, isCurrentGroup }: SidebarGroupProps) => {
  return (
    <Collapsible defaultOpen={isCurrentGroup} className="group/collapsible space-y-1">
      <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2 hover:bg-accent/50">
        <span className="font-medium text-sm">{label}</span>
        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        {items.map(item => (
          <SidebarItem
            key={item.key}
            label={item.label}
            isActive={isCurrentGroup && activeKey === item.key}
            href={item.href}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
SidebarGroup.displayName = 'SidebarGroup';
export { SidebarGroup, type SidebarGroupProps };
