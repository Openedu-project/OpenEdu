'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#shadcn/tabs';
import { cn } from '#utils/cn';

interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export interface CustomTabsProps {
  defaultValue?: string;
  items: TabItem[];
  className?: string;
}

const CustomTabs = ({ defaultValue, items, className }: CustomTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue || items[0]?.value);

  useEffect(() => {
    const handleResize = () => {
      // Check if on large screen
      const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;

      // Find the first visible tab for large screens
      const firstVisibleTab = items.find(item => !item.className?.includes('lg:hidden'));

      // If on large screen and current tab is hidden, switch to first visible tab
      if (
        isLargeScreen &&
        activeTab &&
        items.find(item => item.value === activeTab)?.className?.includes('lg:hidden')
      ) {
        setActiveTab(firstVisibleTab?.value || items[0]?.value);
      }
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab, items]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className={cn(className)}>
      <TabsList className="no-scrollbar h-auto max-w-full justify-normal overflow-auto rounded-none bg-transparent p-0">
        {items.map(item => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className={cn(
              'mbutton-semibold14 md:mbutton-semibold16 flex h-auto items-center gap-2 rounded-none bg-transparent px-4 py-2',
              'data-[state=active]:rounded-lg data-[state=active]:border data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none [&>svg>path]:data-[state=active]:fill-primary',
              item.className
            )}
          >
            {item.icon}
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map(item => (
        <TabsContent key={item.value} value={item.value} className={item.className}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
