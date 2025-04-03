'use client';

// import * as React from "react"
import type { DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';

import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react';
import { Dialog, DialogContent } from '#shadcn/dialog';
import { cn } from '#utils/cn';

function Command({ className, ...props }: ComponentPropsWithoutRef<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
        className
      )}
      {...props}
    />
  );
}

interface CommandDialogProps extends DialogProps {}

function CommandDialog({ children, ...props }: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  wrapperClassName,
  ...props
}: ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & {
  wrapperClassName?: string;
}) {
  return (
    <div
      className={cn('flex items-center border-b px-3', wrapperClassName)}
      cmdk-input-wrapper=""
      data-slot="input-wrapper"
    >
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="input"
        className={cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({ className, ...props }: ComponentPropsWithoutRef<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="list"
      className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
      {...props}
    />
  );
}

function CommandEmpty(props: ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty data-slot="empty" className="py-6 text-center text-sm" {...props} />;
}

function CommandGroup({ className, ...props }: ComponentPropsWithoutRef<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="group"
      className={cn(
        'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs',
        className
      )}
      {...props}
    />
  );
}

function CommandSeparator({ className, ...props }: ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator data-slot="separator" className={cn('-mx-1 h-px bg-border', className)} {...props} />
  );
}

function CommandItem({ className, ...props }: ComponentPropsWithoutRef<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-xs px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function CommandShortcut({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="shortcut"
      className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
