import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Link } from "#common/navigation";
import { cn } from "#utils/cn";

export default function Section({
  isShow = true,
  title,
  content,
  className,
  viewAll = false,
  url,
}: {
  isShow?: boolean;
  title: string;
  content: ReactNode;
  className?: string;
  viewAll?: boolean;
  url?: string;
}) {
  const t = useTranslations("userProfile.profile");

  return (
    <>
      {isShow && (
        <div className={cn(className)}>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <h3 className="giant-iheading-semibold20 border-primary border-l-[3px] pl-3 text-primary uppercase">
              {title}
            </h3>
            {viewAll && (
              <Link
                href={url ?? ""}
                className="mbutton-semibold16 rounded-2 border border-neutral-600 px-7 py-3 shadow-shadow-2"
              >
                {t("viewAll")}
              </Link>
            )}
          </div>
          {content && (
            <div className="no-scrollbar flex w-full flex-row gap-6 overflow-y-auto py-6">
              {content}
            </div>
          )}
        </div>
      )}
    </>
  );
}
