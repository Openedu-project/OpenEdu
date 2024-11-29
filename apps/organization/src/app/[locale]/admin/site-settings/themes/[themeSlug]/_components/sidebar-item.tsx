import { Button } from '@oe/ui/shadcn/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@oe/ui/shadcn/collapsible';
import { SidebarGroup, SidebarGroupLabel, SidebarMenuButton, SidebarMenuItem } from '@oe/ui/shadcn/sidebar';
import { cn } from '@oe/ui/utils/cn';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface BaseItem {
  key: string;
  label: string;
  icon?: ReactNode;
}

interface MenuItem extends BaseItem {
  onClick?: () => void;
}

interface CollapsibleMenuItemProps {
  label: string;
  items: MenuItem[];
  icon?: ReactNode;
  defaultOpen?: boolean;
}

interface SingleMenuItemProps extends MenuItem {
  isActive?: boolean;
}

export const CollapsibleMenuItem = ({ label, items, icon, defaultOpen = true }: CollapsibleMenuItemProps) => {
  return (
    <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="flex w-full items-center justify-between p-2">
            <div className="flex items-center gap-2">
              {icon}
              <span className="font-medium">{label}</span>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          {items.map(item => (
            <SidebarMenuItem key={item.key}>
              <SidebarMenuButton
                asChild
                onClick={item.onClick}
                className={cn(
                  'group flex w-full items-start justify-start gap-2 rounded-md p-2',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus-visible:outline-none focus-visible:ring-1',
                  'focus-visible:ring-ring focus-visible:ring-offset-2',
                  'disabled:pointer-events-none disabled:opacity-50'
                )}
              >
                <Button variant="ghost" className="flex w-full items-center justify-start gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export const SingleMenuItem = ({ key, label, icon, onClick, isActive = false }: SingleMenuItemProps) => {
  return (
    <SidebarMenuItem key={key}>
      <SidebarMenuButton
        asChild
        onClick={onClick}
        className={cn(
          'group flex w-full items-center justify-start gap-2 rounded-md p-2',
          'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-1',
          'focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          isActive && 'bg-accent text-accent-foreground'
        )}
      >
        <Button variant="ghost" className="flex w-full items-center justify-start gap-2">
          {icon}
          <span>{label}</span>
        </Button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
