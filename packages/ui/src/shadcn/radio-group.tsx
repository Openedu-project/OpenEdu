'use client';

import { Indicator, Item, Root } from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '#utils/cn';

function RadioGroup({ className, ...props }: ComponentPropsWithoutRef<typeof Root>) {
  return <Root data-slot="root" className={cn('grid gap-2', className)} {...props} />;
}

function RadioGroupItem({ className, ...props }: ComponentPropsWithoutRef<typeof Item>) {
  return (
    <Item
      data-slot="item"
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <Indicator data-slot="indicator" className="relative block">
        <Circle className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-2.5 w-2.5 fill-current text-current" />
      </Indicator>
    </Item>
  );
}

export { RadioGroup, RadioGroupItem };
