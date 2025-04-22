"use client";
import AIMascot from "@oe/assets/images/ai/ai-mascot-2.png";
import { AI_ROUTES } from "@oe/core";
import { CirclePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "#common/navigation";
import { Image } from "#components/image";
import { Badge } from "#shadcn/badge";
import { Separator } from "#shadcn/separator";
import { cn } from "#utils/cn";
import { AIHistoryModal } from "../history/ai-history";
import { AgentButton } from "./agent-button";

export function AISidebar({
  className,
  isLogin,
}: {
  className?: string;
  isLogin?: boolean;
}) {
  const tAI = useTranslations("aiAssistant");

  return (
    <div className={cn("overflow-hidden bg-primary/5 p-1", className)}>
      <div className="scrollbar flex h-full flex-col items-center gap-2 overflow-y-auto md:py-2">
        <div className="flex items-center space-x-1 md:px-2">
          <Link
            href={AI_ROUTES.assistant}
            className="!p-0 !border-0 relative h-12 w-12 rounded-full bg-background"
          >
            <Image
              alt="ai-assistant"
              src={AIMascot.src}
              width={48}
              height={48}
              className="object-contain"
            />
            <Badge
              variant="secondary"
              className="md:-right-1 mbutton-bold10 absolute right-0 bottom-0 px-1 md:bottom-7"
            >
              β
            </Badge>
          </Link>
          <span className="giant-iheading-semibold16">{tAI("freePlan")}</span>
        </div>

        <Separator className="h-0.5 w-full bg-primary/10" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Link
              size="icon"
              variant="default"
              className="m-auto flex h-8 w-8 rounded-full border border-2 bg-gradient-to-b from-turquoise-500 to-violet-500 hover:border-primary"
              activeClassName=""
              href={AI_ROUTES.chat}
            >
              <CirclePlus size={12} />
            </Link>
            <p className="mcaption-regular12 md:giant-iheading-semibold14 mt-1 text-center">
              {tAI("newChat")}
            </p>
          </div>
          <AgentButton />
          {/* <div>
            <Link
              size="icon"
              variant="default"
              className="m-auto flex rounded-full border border-2 bg-ai-more-feature-gradient hover:border-primary hover:bg-ai-more-feature-gradient"
              activeClassName=""
              href="#"
            >
              <Direct width={16} height={16} />
            </Link>
            <p className="mcaption-regular10 mt-1 text-center md:font-semibold">{tAI('workspace')}</p>
          </div> */}
          <AIHistoryModal isLogin={isLogin} />
        </div>
        {/* <Separator className="h-0.5 w-full bg-primary/10" />
        <Link
          href={AI_ROUTES.assistant}
          className="!p-0 !border-0 relative h-10 w-10 shrink-0 rounded-full bg-ai-more-feature-gradient"
        >
          <LayoutGrid className="h-4 w-4 text-primary" />
        </Link> */}
      </div>
    </div>
  );
}
