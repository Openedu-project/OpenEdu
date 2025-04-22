"use client";

import { MagicPen } from "@oe/assets";
import { useTranslations } from "next-intl";
import { type MouseEvent, useState } from "react";
import { Link } from "#common/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "#shadcn/hover-card";
import { AI_SIDEBAR } from "../constants";

export function AgentButton() {
  const tAI = useTranslations("aiAssistant");
  const [isOpen, setIsOpen] = useState(false);

  const handleTriggerClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };
  return (
    <HoverCard
      openDelay={100}
      closeDelay={100}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <HoverCardTrigger
        asChild
        className="group cursor-pointer"
        onClick={handleTriggerClick}
      >
        <div className="flex items-center gap-2 rounded-3xl border border-2 p-1 group-hover:border-primary">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ai-more-feature-gradient">
            <MagicPen width={12} height={12} />
          </div>
          <p className="mcaption-regular10 md:giant-iheading-semibold14 mt-1 text-center">
            {tAI("agent")}
          </p>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        side="right"
        align="start"
        className="flex w-auto flex-col items-start gap-2 rounded-xl bg-background p-2 shadow-shadow-7"
      >
        {AI_SIDEBAR("white").map((item) => (
          <Link
            key={item.value}
            href={item.href}
            disabled={item.isComming}
            className="!no-underline w-full justify-start rounded-2xl p-2 hover:cursor-pointer hover:bg-primary/10"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <div
              className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full md:h-8 md:w-8"
              style={{ background: item.bgColor }}
            >
              {item.icon}
            </div>
            <p className="mcaption-regular10 text-center text-foreground md:font-semibold">
              {tAI(item.lableKey)}
            </p>
          </Link>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
}
