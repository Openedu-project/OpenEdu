"use client";
import { useTheme } from "next-themes";
import type { ComponentProps } from "react";
import { Toaster as Sonner, type ToasterProps, toast } from "sonner";

function Toaster({ ...props }: ComponentProps<typeof Sonner>) {
  const { theme = "light" } = useTheme();

  return (
    <Sonner
      data-slot="toaster"
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        // unstyled: true,
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          // description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error:
            "group toast group-[.toaster]:!bg-destructive group-[.toaster]:!text-destructive-foreground",
          success:
            "group toast group-[.toaster]:!bg-success group-[.toaster]:!text-success-foreground",
          warning:
            "group toast group-[.toaster]:!bg-warning group-[.toaster]:!text-warning-foreground",
          info: "group toast group-[.toaster]:!bg-info group-[.toaster]:!text-info-foreground",
        },
      }}
      position="top-right"
      {...props}
    />
  );
}

export { Toaster, toast };
