'use client';

// import * as React from "react"
import {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-alert-dialog';

import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react';
import { buttonVariants } from '#shadcn/button';
import { cn } from '#utils/cn';

const AlertDialog = Root;

const AlertDialogTrigger = Trigger;

const AlertDialogPortal = Portal;

function AlertDialogOverlay({ className, ...props }: ComponentPropsWithoutRef<typeof Overlay>) {
  return (
    <Overlay
      data-slot="overlay"
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      {...props}
    />
  );
}

function AlertDialogContent({ className, ...props }: ComponentPropsWithoutRef<typeof Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <Content
        data-slot="content"
        className={cn(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:rounded-lg',
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="header" className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
  );
}

function AlertDialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="footer"
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...props}
    />
  );
}

function AlertDialogTitle({ className, ...props }: ComponentPropsWithoutRef<typeof Title>) {
  return <Title data-slot="title" className={cn('font-semibold text-lg', className)} {...props} />;
}

function AlertDialogDescription({ className, ...props }: ComponentPropsWithoutRef<typeof Description>) {
  return <Description data-slot="description" className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

function AlertDialogAction({ className, ...props }: ComponentPropsWithoutRef<typeof Action>) {
  return <Action data-slot="action" className={cn(buttonVariants(), className)} {...props} />;
}

function AlertDialogCancel({ className, ...props }: ComponentPropsWithoutRef<typeof Cancel>) {
  return (
    <Cancel
      data-slot="cancel"
      className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
