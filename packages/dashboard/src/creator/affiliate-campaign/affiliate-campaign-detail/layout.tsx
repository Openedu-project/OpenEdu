import type { Metadata } from "next";
import type React from "react";

import { DashboardMainPageLayout } from "@oe/ui/common/layout";
import { useTranslations } from "next-intl";
import { AffiliateCampaignNavMenu } from "./campaign-nav-menu";

export const metadata: Metadata = {
  title: "Affiliate Campaign",
  description: "Manage your affiliate campaign details",
};

export default function AffiliateCampaignDetailLayout({
  children,
  campaignId,
}: {
  children: React.ReactNode;
  campaignId: string;
}) {
  const tDashboard = useTranslations("dashboard.affiliateCampaign");

  return (
    <>
      <DashboardMainPageLayout
        breadcrumbs={[
          { label: tDashboard("title") },
          { label: tDashboard("detail"), disabled: true },
        ]}
        dashboard="admin"
        header={
          <div>
            <h1 className="giant-iheading-semibold32 tracking-tight md:text-3xl">
              {tDashboard("detail")}
            </h1>
            <AffiliateCampaignNavMenu id={campaignId} />
          </div>
        }
      >
        {children}
      </DashboardMainPageLayout>
    </>
  );
}
