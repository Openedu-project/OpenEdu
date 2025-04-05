'use client';

// import * as React from "react"
import {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Menu,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
} from '@radix-ui/react-menubar';
import { Check, ChevronRight, Circle } from 'lucide-react';

import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react';
import { cn } from '#utils/cn';

const MenubarMenu = Menu;

const MenubarGroup = Group;

const MenubarPortal = Portal;

const MenubarSub = Sub;

const MenubarRadioGroup = RadioGroup;

function Menubar({ className, ...props }: ComponentPropsWithoutRef<typeof Root>) {
  return (
    <Root
      data-slot="menubar"
      className={cn('flex h-10 items-center space-x-1 rounded-md border bg-background p-1', className)}
      {...props}
    />
  );
}

function MenubarTrigger({ className, ...props }: ComponentPropsWithoutRef<typeof Trigger>) {
  return (
    <Trigger
      data-slot="trigger"
      className={cn(
        'flex cursor-default select-none items-center rounded-xs px-3 py-1.5 font-medium text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        className
      )}
      {...props}
    />
  );
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <SubTrigger
      data-slot="sub-trigger"
      className={cn(
        'flex cursor-default select-none items-center rounded-xs px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        inset && 'pl-8',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </SubTrigger>
  );
}

function MenubarSubContent({ className, ...props }: ComponentPropsWithoutRef<typeof SubContent>) {
  return (
    <SubContent
      data-slot="sub-content"
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      {...props}
    />
  );
}

function MenubarContent({
  className,
  align = 'start',
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: ComponentPropsWithoutRef<typeof Content>) {
  return (
    <Portal>
      <Content
        data-slot="content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in',
          className
        )}
        {...props}
      />
    </Portal>
  );
}

function MenubarItem({
  className,
  inset,
  ...props
}: ComponentPropsWithoutRef<typeof Item> & {
  inset?: boolean;
}) {
  return (
    <Item
      data-slot="item"
      className={cn(
        'relative flex cursor-default select-none items-center rounded-xs px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  );
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: ComponentPropsWithoutRef<typeof CheckboxItem>) {
  return (
    <CheckboxItem
      data-slot="checkbox-item"
      className={cn(
        'relative flex cursor-default select-none items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ItemIndicator>
          <Check className="h-4 w-4" />
        </ItemIndicator>
      </span>
      {children}
    </CheckboxItem>
  );
}

function MenubarRadioItem({ className, children, ...props }: ComponentPropsWithoutRef<typeof RadioItem>) {
  return (
    <RadioItem
      data-slot="radio-item"
      className={cn(
        'relative flex cursor-default select-none items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </ItemIndicator>
      </span>
      {children}
    </RadioItem>
  );
}

function MenubarLabel({
  className,
  inset,
  ...props
}: ComponentPropsWithoutRef<typeof Label> & {
  inset?: boolean;
}) {
  return (
    <Label
      data-slot="label"
      className={cn('px-2 py-1.5 font-semibold text-sm', inset && 'pl-8', className)}
      {...props}
    />
  );
}

function MenubarSeparator({ className, ...props }: ComponentPropsWithoutRef<typeof Separator>) {
  return <Separator data-slot="separator" className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />;
}

function MenubarShortcut({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="shortcut"
      className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
      {...props}
    />
  );
}

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
