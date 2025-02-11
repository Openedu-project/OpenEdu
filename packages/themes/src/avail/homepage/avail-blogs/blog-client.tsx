"use client";
import { useGetPopularBlogsAtWebsite } from "@oe/api/hooks/useFeaturedContent";
import type { IBlog } from "@oe/api/types/blog";
import type { IFeaturedContent } from "@oe/api/types/featured-contents";
import { getAPIReferrerAndOriginClient } from "@oe/api/utils/referrer-origin";
import { BlogCardServer } from "@oe/ui/components/blog-card";
import { cn } from "@oe/ui/utils/cn";
import { useTranslations } from "next-intl";
import type { SectionComponent } from "../../../_types/theme-page";
import {
  InfoSection,
  type InfoSectionProps,
} from "../../../vbi/_components/info-section";

export interface AvailHomepageBlogsProps extends InfoSectionProps {}

const AvailHomepageBlogsClient: SectionComponent<"homepage", "availBlogs"> = ({
  className,
  props,
}) => {
  const t = useTranslations("themePage.avail.homepage.availBlogs");
  const { host } = getAPIReferrerAndOriginClient();

  const { dataPopularBlogs } = useGetPopularBlogsAtWebsite({
    params: { org_id: host ?? "" },
  });

  return (
    <div className={cn("bg-accent p-4 md:p-8 lg:p-12", className)}>
      <div className="container space-y-4 md:space-y-8">
        <InfoSection
          title={t("title")}
          titleSub={undefined}
          button={{ text: t?.("button.text"), link: props?.button?.link }}
          className="flex flex-col items-center text-center"
        />
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 md:p-8 lg:grid-cols-4">
          {dataPopularBlogs?.map(
            (blog: IFeaturedContent<IBlog>) =>
              blog?.entity && (
                <BlogCardServer key={blog?.entity?.id} blog={blog?.entity} />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailHomepageBlogsClient;
