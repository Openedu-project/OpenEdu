'use client';

import {
  Content,
  Group,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import type { ComponentProps } from 'react';

import { cn } from '#utils/cn';

const Select = Root;

const SelectGroup = Group;

const SelectValue = Value;

function SelectTrigger({
  className,
  hasIcon = true,
  children,
  ...props
}: ComponentProps<typeof Trigger> & { hasIcon?: boolean }) {
  return (
    <Trigger
      data-slot="trigger"
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-0 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-inset disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
        className
      )}
      {...props}
    >
      {children}
      {hasIcon && (
        <Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Icon>
      )}
    </Trigger>
  );
}

function SelectScrollUpButton({ className, ...props }: ComponentProps<typeof ScrollUpButton>) {
  return (
    <ScrollUpButton
      data-slot="scroll-up"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronUp className="h-4 w-4" />
    </ScrollUpButton>
  );
}

function SelectScrollDownButton({ className, ...props }: ComponentProps<typeof ScrollDownButton>) {
  return (
    <ScrollDownButton
      data-slot="scroll-down"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronDown className="h-4 w-4" />
    </ScrollDownButton>
  );
}

function SelectContent({ className, children, position = 'popper', ...props }: ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        data-slot="content"
        className={cn(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in',
          position === 'popper' &&
            'data-[side=left]:-translate-x-1 data-[side=top]:-translate-y-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1',
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <Viewport
          data-slot="viewport"
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
          {children}
        </Viewport>
        <SelectScrollDownButton />
      </Content>
    </Portal>
  );
}

function SelectLabel({ className, ...props }: ComponentProps<typeof Label>) {
  return <Label data-slot="label" className={cn('py-1.5 pr-2 pl-8 font-semibold text-sm', className)} {...props} />;
}

function SelectItem({ className, children, ...props }: ComponentProps<typeof Item>) {
  return (
    <Item
      data-slot="item"
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ItemIndicator>
          <Check className="h-4 w-4" />
        </ItemIndicator>
      </span>

      <ItemText>{children}</ItemText>
    </Item>
  );
}

function SelectSeparator({ className, ...props }: ComponentProps<typeof Separator>) {
  return <Separator data-slot="separator" className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />;
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
