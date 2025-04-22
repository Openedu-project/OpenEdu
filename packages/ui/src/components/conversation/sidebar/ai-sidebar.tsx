import AIMascot from "@oe/assets/images/ai/ai-mascot-2.png";
import { AI_ROUTES } from "@oe/core";
import { CirclePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "#common/navigation";
import { Image } from "#components/image";
import { Badge } from "#shadcn/badge";
import { Separator } from "#shadcn/separator";
import { cn } from "#utils/cn";
import { AI_SIDEBAR } from "../constants";
import { AIHistoryModal, SearchHistory } from "../history/ai-history";

export function AISidebar({
  className,
  isLogin,
}: {
  className?: string;
  isLogin?: boolean;
}) {
  const tAI = useTranslations("aiAssistant");

  return (
    <div className={cn("overflow-hidden bg-primary/5 p-1 px-2", className)}>
      <div className="scrollbar flex h-full flex-col gap-2 overflow-y-auto md:p-2">
        <div className="flex items-center space-x-1 md:px-2">
          <Link
            href={AI_ROUTES.assistant}
            className="!p-0 !border-0 relative h-13 w-13 rounded-full bg-background"
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
              variant="ghost"
              activeClassName=""
              className="!no-underline h-auto w-full justify-start rounded-3xl p-1 hover:cursor-pointer hover:bg-primary/10"
              href={AI_ROUTES.chat}
            >
              <div className="mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-turquoise-500 to-violet-500">
                <CirclePlus size={12} color="white" />
              </div>

              <p className="mcaption-regular12 md:giant-iheading-semibold14 mt-1 text-center">
                {tAI("newChat")}
              </p>
            </Link>
          </div>
          {AI_SIDEBAR("var(--primary)", 16)
            .filter((i) => !i.hidden)
            .map((item) => (
              <Link
                key={item.value}
                href={item.href}
                disabled={item.isComming}
                className="!no-underline h-auto w-full justify-start rounded-3xl p-1 hover:cursor-pointer hover:bg-primary/10"
              >
                <div className="mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ai-more-feature-gradient">
                  {item.icon}
                </div>
                <p className="mcaption-semibold14 text-center text-foreground">
                  {tAI(item.lableKey)}
                </p>
                {item.isComming && (
                  <Badge
                    variant="outline"
                    className="ml-2 border-primary text-primary"
                  >
                    {tAI("soon")}
                  </Badge>
                )}
              </Link>
            ))}
        </div>
        <Separator className="h-0.5 w-full bg-primary/10" />
        <div className="flex grow flex-col gap-2">
          <div className="flex w-full items-center justify-between pl-1">
            <p className="mcaption-semibold14">{tAI("history")}</p>
            <AIHistoryModal isLogin={isLogin} />
          </div>
          <SearchHistory
            isLogin={isLogin}
            className="w-full grow p-0"
            hiddenSearch
          />
        </div>
      </div>
    </div>
  );
}
