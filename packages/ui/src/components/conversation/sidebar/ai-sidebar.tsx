"use client";
import type { CSSProperties } from "react";
import { Sidebar } from "#shadcn/sidebar";
import { cn } from "#utils/cn";
import { AISidebarContent } from "./ai-sidebar-content";

export const SIDEBAR_WIDTH = "14rem";
export const SIDEBAR_WIDTH_ICON = "5rem";

export function AISidebar({
  isLogin,
  className,
  open,
}: {
  isLogin?: boolean;
  className?: string;
  open?: boolean;
}) {
  return (
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
  );
}
