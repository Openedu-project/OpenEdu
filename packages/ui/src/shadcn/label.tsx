'use client';

import { Root } from '@radix-ui/react-label';
import { type VariantProps, cva } from 'class-variance-authority';

import { Info } from 'lucide-react';
import { type ComponentPropsWithoutRef, type ComponentRef, type ReactNode, type Ref, forwardRef } from 'react';
import { cn } from '#utils/cn';
import { Tooltip } from './tooltip';

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');

const Label = forwardRef<
  ComponentRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => <Root ref={ref} className={cn(labelVariants(), className)} {...props} />);
Label.displayName = Root.displayName;

const LabelWithInfo = ({
  children,
  infoText,
  ref,
  ...rest
}: {
  children: ReactNode;
  infoText?: ReactNode;
  ref?: Ref<HTMLLabelElement>;
} & ComponentPropsWithoutRef<typeof Root> &
  VariantProps<typeof labelVariants>) => (
  <div className="flex items-center space-x-2">
    <Label ref={ref} {...rest}>
      {children}
    </Label>
    {infoText ? (
      <Tooltip content={infoText}>
        <Info className="h-4 w-4 cursor-help text-muted-foreground" />
      </Tooltip>
    ) : null}
  </div>
);

export { Label, LabelWithInfo };
