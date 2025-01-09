"use client";

import { Button } from "@oe/ui/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@oe/ui/shadcn/dropdown-menu";
import { cn } from "@oe/ui/utils/cn";
import { MoreHorizontal } from "lucide-react";
import { type ReactNode, memo, useCallback } from "react";

interface ComboboxMenuItem {
  icon?: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  isActive?: boolean;
}

interface MoreComboboxMenuProps {
  triggerBtn?: ReactNode;
  items: ComboboxMenuItem[];
  itemsNode?: ReactNode;
  side?: "bottom" | "top" | "right" | "left";
}

function MoreCombobox({
  triggerBtn,
  itemsNode,
  items = [],
  side = "bottom",
}: MoreComboboxMenuProps) {
  const handleItemClick = useCallback((onClick: () => void) => {
    onClick();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {triggerBtn ?? (
          <Button variant="outline">
            <MoreHorizontal className="w-6 h-6 text-[#6368DC]" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-0 rounded-[12px] shadow-none border border-[#DBDBDB] flex items-center w-full overflow-hidden bg-white min-w-0"
        align="end"
        side={side}
      >
        <div className="flex flex-col w-full">
          {itemsNode ?? itemsNode}
          {items.map((item, index) => (
            <DropdownMenuItem
              className="p-0 w-full focus:bg-[#F2F1FF]"
              key={index}
              onSelect={() => handleItemClick(item.onClick)}
            >
              <div
                className={cn(
                  "inline-flex w-full gap-3 items-center font-semibold text-sm sm:text-base sm:leading-5 cursor-pointer whitespace-nowrap py-3 px-4 hover:bg-[#F2F1FF] active:bg-[#F2F1FF] text-black bg-transparent",
                  item.className,
                  item.isActive ? "bg-[#E0E0E0]" : ""
                )}
              >
                {item.icon}
                {item.label}
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(MoreCombobox);
