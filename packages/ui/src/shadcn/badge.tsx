import { type VariantProps, cva } from 'class-variance-authority';

import type { HTMLAttributes } from 'react';
import { cn } from '#utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:opacity-80',
        secondary: 'bg-secondary text-secondary-foreground hover:opacity-80',
        success: 'bg-success text-success-foreground hover:opacity-80',
        warning: 'bg-warning text-warning-foreground hover:opacity-80',
        destructive: 'bg-destructive text-destructive-foreground hover:opacity-80',
        muted: 'bg-muted text-muted-foreground hover:opacity-80',
        outline: 'text-foreground',
        outline_primary: 'text-primary border-primary hover:opacity-80',
        outline_secondary: 'text-secondary border-secondary hover:opacity-80',
        outline_success: 'text-success border-success hover:opacity-80',
        outline_warning: 'text-warning border-warning hover:opacity-80',
        outline_destructive: 'text-destructive border-destructive hover:opacity-80',
        outline_muted: 'text-muted border-muted hover:opacity-80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

export interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
