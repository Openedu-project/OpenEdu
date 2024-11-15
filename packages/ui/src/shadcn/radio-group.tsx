'use client';

import { Indicator, Item, Root } from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from 'react';

import { cn } from '#utils/cn';

const RadioGroup = forwardRef<ComponentRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => {
    return <Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
  }
);
RadioGroup.displayName = Root.displayName;

const RadioGroupItem = forwardRef<ComponentRef<typeof Item>, ComponentPropsWithoutRef<typeof Item>>(
  ({ className, ...props }, ref) => {
    return (
      <Item
        ref={ref}
        className={cn(
          'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        <Indicator className="relative block">
          <Circle className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-2.5 w-2.5 fill-current text-current" />
        </Indicator>
      </Item>
    );
  }
);
RadioGroupItem.displayName = Item.displayName;

export { RadioGroup, RadioGroupItem };
