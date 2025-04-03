'use client';

import type { ComponentProps } from 'react';

import { Content, List, Root, Trigger } from '@radix-ui/react-tabs';

import { cn } from '#utils/cn';

const Tabs = Root;

function TabsList({ className, ...props }: ComponentProps<typeof List>) {
  return (
    <List
      data-slot="list"
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: ComponentProps<typeof Trigger>) {
  return (
    <Trigger
      data-slot="trigger"
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1.5 font-medium text-sm ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs',
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: ComponentProps<typeof Content>) {
  return (
    <Content
      data-slot="content"
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
