"use client";
import { type CSSProperties, useState } from "react";
import { Sidebar, SidebarProvider } from "#shadcn/sidebar";
import { cn } from "#utils/cn";
import { AISidebarContent } from "./ai-sidebar-content";

const SIDEBAR_WIDTH = "14rem";
const SIDEBAR_WIDTH_ICON = "5rem";
export function AISidebar({
  isLogin,
  className,
}: {
  isLogin?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider
      className="min-h-[calc(100dvh-var(--header-height))] w-auto"
      open={open}
      onOpenChange={setOpen}
    >
      <Sidebar
        className={cn(
          "top-[var(--header-height)] h-[calc(100dvh-var(--header-height))]",
          className
        )}
        style={
          {
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            "--sidebar-width": SIDEBAR_WIDTH,
          } as CSSProperties
        }
        collapsible="icon"
      >
        <AISidebarContent open={open} isLogin={isLogin} />
      </Sidebar>
    </SidebarProvider>
  );
}
