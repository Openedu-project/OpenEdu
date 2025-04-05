'use client';

import { Item, Root } from '@radix-ui/react-toggle-group';
import type { VariantProps } from 'class-variance-authority';

import { type ComponentProps, createContext, useContext } from 'react';
import { cn } from '#utils/cn';
import { toggleVariants } from './toggle';

const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>({
  size: 'default',
  variant: 'default',
});

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: ComponentProps<typeof Root> & VariantProps<typeof toggleVariants>) {
  return (
    <Root data-slot="toggle-group" className={cn('flex items-center justify-center gap-1', className)} {...props}>
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: ComponentProps<typeof Item> & VariantProps<typeof toggleVariants>) {
  const context = useContext(ToggleGroupContext);

  return (
    <Item
      data-slot="toggle-group-item"
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: (context.size as 'default' | 'sm' | 'lg' | undefined | null) || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
