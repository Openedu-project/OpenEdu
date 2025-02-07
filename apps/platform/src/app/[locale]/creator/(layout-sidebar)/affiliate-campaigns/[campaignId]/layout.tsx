import AffiliateCampaignDetailLayout from '@oe/dashboard/creator/affiliate-campaign/affiliate-campaign-detail/layout';
import type { Metadata } from 'next';
import type React from 'react';

export const metadata: Metadata = {
  title: 'Affiliate Campaign',
  description: 'Manage your affiliate campaign details',
};

interface LayoutProps {
  children: React.ReactNode;
  params: {
    campaignId: string;
  };
}

export default async function AffiliateCampaignLayout({ children, params }: LayoutProps) {
  const { campaignId } = await params;
  return <AffiliateCampaignDetailLayout campaignId={campaignId}>{children}</AffiliateCampaignDetailLayout>;
}
