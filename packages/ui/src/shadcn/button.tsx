import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { Loader2 } from 'lucide-react';
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '#utils/cn';

const buttonVariants = cva(
  'select-none inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-normal transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-background text-primary border border-primary hover:opacity-80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        xs: 'h-8 rounded px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      disabled,
      loading = false,
      leftSection,
      rightSection,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || disabled}
        type="button"
        {...props}
      >
        {((leftSection && loading) || (!(leftSection || rightSection) && loading)) && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {!loading && leftSection && <div className="mr-2">{leftSection}</div>}
        {children}
        {!loading && rightSection && <div className="ml-2">{rightSection}</div>}
        {rightSection && loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
