'use client';

import { Close, Content, Description, Overlay, Portal, Root, Title, Trigger } from '@radix-ui/react-dialog';
import { type VariantProps, cva } from 'class-variance-authority';
import { X } from 'lucide-react';
import { type ComponentPropsWithoutRef, type ComponentRef, type HTMLAttributes, forwardRef } from 'react';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cn } from '#utils/cn';

const Sheet = Root;

const SheetTrigger = Trigger;

const SheetClose = Close;

const SheetPortal = Portal;

const SheetOverlay = forwardRef<ComponentRef<typeof Overlay>, ComponentPropsWithoutRef<typeof Overlay>>(
  ({ className, ...props }, ref) => (
    <Overlay
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      {...props}
      ref={ref}
    />
  )
);
SheetOverlay.displayName = Overlay.displayName;

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

interface SheetContentProps extends ComponentPropsWithoutRef<typeof Content>, VariantProps<typeof sheetVariants> {
  container?: HTMLElement | null;
  overlayClassName?: string;
  hasCloseButton?: boolean;
}

const SheetContent = forwardRef<ComponentRef<typeof Content>, SheetContentProps>(
  ({ side = 'right', className, children, container, overlayClassName, hasCloseButton = true, ...props }, ref) => {
    return (
      <SheetPortal container={container}>
        <SheetOverlay className={overlayClassName} />
        <Content ref={ref} className={cn(sheetVariants({ side }), className)} aria-describedby={undefined} {...props}>
          {children}
          {hasCloseButton && (
            <Close className="absolute top-5 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Close>
          )}
        </Content>
      </SheetPortal>
    );
  }
);
SheetContent.displayName = Content.displayName;

const SheetHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = forwardRef<ComponentRef<typeof Title>, ComponentPropsWithoutRef<typeof Title>>(
  ({ className, hidden, ...props }, ref) =>
    hidden ? (
      <VisuallyHidden asChild>
        <Title ref={ref} className={cn('font-semibold text-foreground text-lg', className)} {...props} />
      </VisuallyHidden>
    ) : (
      <Title ref={ref} className={cn('font-semibold text-foreground text-lg', className)} {...props} />
    )
);
SheetTitle.displayName = Title.displayName;

const SheetDescription = forwardRef<ComponentRef<typeof Description>, ComponentPropsWithoutRef<typeof Description>>(
  ({ className, hidden, ...props }, ref) =>
    hidden ? (
      <VisuallyHidden asChild>
        <Description ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
      </VisuallyHidden>
    ) : (
      <Description ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
    )
);
SheetDescription.displayName = Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
