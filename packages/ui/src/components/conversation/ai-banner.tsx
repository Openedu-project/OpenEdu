"use client";
import { CrossStar } from "@oe/assets";
import { AI_ROUTES } from "@oe/core";
import { useTranslations } from "next-intl";
import { Link } from "#common/navigation";

export const AIBanner = () => {
  const tAI = useTranslations("aiAssistant");
  return (
    <section className="-mx-4 flex items-center justify-between gap-2 bg-linear-to-br from-turquoise-500 to-violet-500 px-3 py-2 md:hidden">
      <CrossStar color="#8BFADD" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="giant-iheading-semibold16 mb-0 text-center text-background">
          {tAI("exploreOpenEdu")}
        </h3>
        <Link
          href={AI_ROUTES.assistant}
          variant="default"
          className="h-8 rounded-full bg-background"
        >
          <span className="giant-iheading-semibold16 bg-ai-gradient bg-clip-text text-transparent">
            {tAI("title")}
          </span>
        </Link>
      </div>
      <CrossStar color="#8BFADD" />
    </section>
  );
};
