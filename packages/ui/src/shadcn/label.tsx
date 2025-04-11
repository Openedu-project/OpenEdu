'use client';

import { Root } from '@radix-ui/react-label';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '#utils/cn';

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');

function Label({ className, ...props }: ComponentProps<typeof Root> & VariantProps<typeof labelVariants>) {
  return <Root data-slot="label" className={cn(labelVariants(), className)} {...props} />;
}

// const LabelWithInfo = ({
//   children,
//   infoText,
//   className,
//   ...rest
// }: {
//   children: ReactNode;
//   infoText?: ReactNode;
//   ref?: Ref<HTMLLabelElement>;
// } & ComponentPropsWithoutRef<typeof Root> &
//   VariantProps<typeof labelVariants>) => (
//   <FormLabel {...rest} className={cn('flex items-center space-x-2', className)}>
//     {children}
//     {infoText ? (
//       <Tooltip content={infoText} className="ml-1">
//         <Info className="h-4 w-4 cursor-help text-muted-foreground" />
//       </Tooltip>
//     ) : null}
//   </FormLabel>
// );

export { Label, labelVariants };
