import { CreatorAffiliateReport } from "@oe/dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report",
};

export default function ReportPage() {
  return (
    <div className="w-full">
      <CreatorAffiliateReport />
    </div>
  );
}
