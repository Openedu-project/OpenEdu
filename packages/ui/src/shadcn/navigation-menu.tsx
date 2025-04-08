// import * as React from "react"
import { Content, Indicator, Item, Link, List, Root, Trigger, Viewport } from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';

import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '#utils/cn';

function NavigationMenu({ className, children, ...props }: ComponentPropsWithoutRef<typeof Root>) {
  return (
    <Root
      data-slot="root"
      className={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </Root>
  );
}

function NavigationMenuList({ className, ...props }: ComponentPropsWithoutRef<typeof List>) {
  return (
    <List
      data-slot="list"
      className={cn('group flex flex-1 list-none items-center justify-center space-x-1', className)}
      {...props}
    />
  );
}

const NavigationMenuItem = Item;

const navigationMenuTriggerStyle = cva(
  'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
);

function NavigationMenuTrigger({ className, children, ...props }: ComponentPropsWithoutRef<typeof Trigger>) {
  return (
    <Trigger data-slot="trigger" className={cn(navigationMenuTriggerStyle(), 'group', className)} {...props}>
      {children}
      <ChevronDown
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </Trigger>
  );
}

function NavigationMenuContent({ className, ...props }: ComponentPropsWithoutRef<typeof Content>) {
  return (
    <Content
      data-slot="content"
      className={cn(
        'data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out md:absolute md:w-auto ',
        className
      )}
      {...props}
    />
  );
}

const NavigationMenuLink = Link;

function NavigationMenuViewport({ className, ...props }: ComponentPropsWithoutRef<typeof Viewport>) {
  return (
    <div className={cn('absolute top-full left-0 flex justify-center')}>
      <Viewport
        data-slot="viewport"
        className={cn(
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top-center overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in md:w-[var(--radix-navigation-menu-viewport-width)]',
          className
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuIndicator({ className, ...props }: ComponentPropsWithoutRef<typeof Indicator>) {
  return (
    <Indicator
      data-slot="indicator"
      className={cn(
        'data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=visible]:animate-in',
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </Indicator>
  );
}

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
