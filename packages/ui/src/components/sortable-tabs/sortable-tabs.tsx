'use client';

import { PlusIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '#shadcn/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#shadcn/tabs';
import { cn } from '#utils/cn';
import { DndSortable, DndSortableDragButton } from '../dnd-sortable';
import { TabContentHeader } from './tab-content-header';
import type { SortableTabsProps, TabItem, TabOption } from './types';
import { createTabFromOption } from './utils';

export function SortableTabs({ defaultTabs = [], options, onTabsChange, className }: SortableTabsProps) {
  const [tabs, setTabs] = useState<TabItem[]>(() => {
    if (defaultTabs.length > 0) {
      return defaultTabs;
    }

    const firstOption = options[0];
    return [createTabFromOption(firstOption)] as TabItem[];
  });

  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || '');

  const handleTabsChange = useCallback(
    (newTabs: TabItem[]) => {
      setTabs(newTabs);
      onTabsChange?.(newTabs);
    },
    [onTabsChange]
  );

  const handleAddTab = useCallback(() => {
    const defaultOption = options[0];
    const newTab: TabItem = createTabFromOption(defaultOption);
    handleTabsChange([...tabs, newTab]);
    setActiveTab(newTab.id);
  }, [tabs, options, handleTabsChange]);

  const handleRemoveTab = useCallback(
    (tabId: string) => {
      const newTabs = tabs.filter(tab => tab.id !== tabId);
      handleTabsChange(newTabs);
      if (activeTab === tabId) {
        setActiveTab(newTabs[0]?.id || '');
      }
    },
    [tabs, activeTab, handleTabsChange]
  );

  const handleOptionSelect = useCallback(
    (tabId: string, option: TabOption) => {
      const newTabs = tabs.map(tab =>
        tab.id === tabId
          ? {
              ...tab,
              value: option.value,
              label: option.label as string,
              icon: option.icon,
              content: typeof option.content === 'function' ? option.content(option) : option.content,
            }
          : tab
      );
      handleTabsChange(newTabs);
    },
    [tabs, handleTabsChange]
  );

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className={cn('w-full', className)}>
      <div className="scrollbar flex items-center overflow-x-auto">
        {/* <ScrollArea className="max-w-[calc(100%-40px)]"> */}
        {/* <div className="max-w-[calc(100%-40px)]"> */}
        <DndSortable<TabItem, TabItem>
          data={tabs}
          dataConfig={{
            idProp: 'id',
            type: 'array',
            direction: 'horizontal',
          }}
          className="gap-0"
          renderConfig={{
            className: 'flex-1',
            renderItem: ({ item }) => (
              <TabsList className="h-auto items-center justify-start p-0">
                <TabsTrigger value={item.original.id} asChild>
                  <div className="relative h-8 cursor-pointer rounded-b-none border-t border-r border-l bg-background data-[state=active]:rounded-b-none data-[state=active]:border data-[state=active]:border-primary data-[state=active]:border-b-0 data-[state=active]:bg-muted data-[state=active]:text-primary">
                    <DndSortableDragButton className="mr-1 h-4 w-4" />
                    <div className="flex items-center gap-2">
                      {item.original.icon}
                      <span>{item.original.label}</span>
                    </div>
                  </div>
                </TabsTrigger>
              </TabsList>
            ),
          }}
          onChange={handleTabsChange}
        />
        {/* </div> */}
        {/* <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea> */}
        <Button
          variant="default"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-md rounded-b-none border-b-0"
          onClick={handleAddTab}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
      {tabs.map(tab => (
        <TabsContent key={tab.id} value={tab.id} className="mt-0 flex flex-1 flex-col overflow-hidden">
          <TabContentHeader
            tab={tab}
            options={options}
            onOptionSelect={handleOptionSelect}
            onRemove={handleRemoveTab}
          />
          <div className="overflow-hidden border border-primary border-t-0">{tab.content}</div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
