import {
  AFFILIATE_ROUTES,
  AI_ROUTES,
  BLOG_ROUTES,
  LAUNCHPAD_ROUTES,
  PLATFORM_ROUTES,
} from "@oe/core";
import { MainLayout } from "@oe/ui";
import { getTranslations } from "next-intl/server";

import type { ReactNode } from "react";

export default async function OpeneduLayout({
  children,
  hasFooter,
}: {
  children: ReactNode;
  hasFooter?: boolean;
}) {
  const t = await getTranslations("headerMenu");
  const sidebarItems = [
    {
      id: "ai-assistant",
      label: t("aiAgent"),
      href: AI_ROUTES.assistant,
      isHighlight: true,
      isLoginRequired: false,
      version: "BETA",
    },
    {
      id: "courses",
      label: t("courses"),
      href: PLATFORM_ROUTES.courses,
      isLoginRequired: false,
    },
    {
      id: "newsFeed",
      label: t("newsFeed"),
      href: BLOG_ROUTES.blog,
      isLoginRequired: false,
    },
    {
      id: "launchpad",
      label: t("launchpad"),
      href: LAUNCHPAD_ROUTES.launchpad,
      isLoginRequired: false,
    },
    {
      id: "Affiliate",
      label: t("affiliate"),
      href: AFFILIATE_ROUTES.campaigns,
      isLoginRequired: true,
    },
  ];
  const subSidebarItems = [
    {
      id: "learners",
      label: t("subSidebar.forLearners"),
      href: "#",
    },
    {
      id: "educators",
      label: t("subSidebar.forEducators"),
      href: "#",
    },
    {
      id: "forOrganizations",
      label: t("subSidebar.forOrganizations"),
      href: "#",
    },
  ];

  return (
    <MainLayout
      sidebarItems={sidebarItems}
      subSidebarItems={subSidebarItems}
      hasFooter={hasFooter}
    >
      {children}
    </MainLayout>
  );
}

// export default withLocale(OpeneduLayout);
