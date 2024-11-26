import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { Loader2 } from 'lucide-react';
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '#utils/cn';

const buttonVariants = cva(
  'giant-iheading-semibold16 select-none inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        primary: 'bg-primary text-primary-foreground mbutton-regular12 md:mbutton-regular14 hover:bg-primary/80',
        neutral:
          'bg-bg-neutral-600 mbutton-regular12 md:mbutton-regular14 hover:bg-bg-neutral-500 content-base-on-tertiary',
        outlinePrimary:
          'bg-transparent border border-solid border-primary text-primary mbutton-regular12 md:mbutton-regular14 hover:text-primary/80',
        outlineNeutral:
          'bg-transparent border border-solid border-border-neutral-600 text-bg-neutral-600 mbutton-regular12 md:mbutton-regular14 hover:text-bg-primary-500',
        outlineSecondary:
          'bg-transparent border border-solid border-border-secondary-600 text-bg-secondary-600 mbutton-regular12 md:mbutton-regular14 hover:text-bg-primary-500',
        danger:
          'border border-border-negative-600 text-bg-negative-600 hover:bg-bg-base-canvas hover:border-bg-negative-500 hover:text-bg-negative-500',
      },
      size: {
        default: 'h-12 px-4 py-2',
        superLarge: `h-[56px]
          rounded-[4px] md:rounded-[8px] lg:rounded-[12px]
          px-[16px] py-[12px] lg:px-[32px] lg:py-[32px]`,
        large: `h-[44px]
          rounded-[4px] md:rounded-[8px] lg:rounded-[12px]
          p-[12px]`,
        medium: 'h-[32px] p-[8px] rounded-[4px] md:rounded-[8px]',
        small: 'h-[20px] p-[4px] rounded-[4px]',
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
