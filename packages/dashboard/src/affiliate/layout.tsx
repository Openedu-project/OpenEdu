import { AFFILIATE_ROUTES } from "@oe/core/utils/routes";
import { DashboardLayout } from "@oe/ui/common/layout";
import { Newspaper, Shapes } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const [tDashboard] = await Promise.all([getTranslations("dashboard")]);

  const filteredMenu = [
    {
      id: "category",
      label: tDashboard("userAffiliateDashboard.campaigns"),
      icon: <Shapes className="h-5 w-5" />,
      href: AFFILIATE_ROUTES.campaigns,
    },
    {
      id: "myBlog",
      label: tDashboard("userAffiliateDashboard.reportAffiliateCampaigns"),
      icon: <Newspaper className="h-5 w-5" />,
      href: AFFILIATE_ROUTES.campaignReport,
    },
  ];

  return (
    <DashboardLayout className="p-4 pt-0" sidebarItems={filteredMenu}>
      {children}
    </DashboardLayout>
  );
}
