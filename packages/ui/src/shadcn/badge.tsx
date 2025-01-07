import { type VariantProps, cva } from 'class-variance-authority';

import type { HTMLAttributes } from 'react';
import { cn } from '#utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-primary bg-background text-primary hover:opacity-80',
        secondary: 'border-secondary bg-background text-secondary hover:opacity-80',
        success: 'border-success bg-background text-success hover:opacity-80',
        destructive: 'border-destructive bg-background text-destructive hover:opacity-80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
