import type { IAdminLaunchpadDetailRes, IAdminLaunchpadInvestmentRes } from '@oe/api/types/admin-launchpad';
import Telegram from '@oe/assets/icons/social-icon/telegram';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { formatNumber } from '@oe/core/utils/utils';
import { CourseTimeline } from '@oe/ui/components/course-time-line';
import { Image } from '@oe/ui/components/image';
import { Card, CardContent } from '@oe/ui/shadcn/card';
import { Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type React from 'react';
import { ContactCopyButton } from './contact-copy-field';

interface LaunchpadInfoProps {
  data: IAdminLaunchpadDetailRes;
}

async function LaunchpadInfo({ data }: LaunchpadInfoProps) {
  const t = await getTranslations('adminLaunchpadApproved.info');

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="relative h-[122px] w-[200px]">
            <Image
              src={data.thumbnail?.url}
              alt={data.name}
              fill
              containerHeight={122}
              className="w-full rounded-md object-cover"
            />
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="giant-iheading-semibold20">{data.name}</h2>
            <div className="space-y-1">
              <p className="mcaption-regular12 flex items-end gap-1">
                <span>{t('createdBy')}</span>
                <span className="mcaption-semibold14">{data.owner?.display_name || data.user_id}</span>
              </p>
              <div className="mcaption-regular12 flex items-end gap-1">
                <span>{t('createdAt')}</span>
                <span className="mcaption-semibold14">{formatDateHourMinute(data?.create_at)}</span>
              </div>
            </div>
            <div className="mcaption-bold20">
              {t('fundingRange', {
                target: formatNumber(data.funding_goal.target_funding),
                min: formatNumber(data.funding_goal.min_pledge),
                currency: data.funding_goal.currency,
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

async function FundingCard({ data }: LaunchpadInfoProps) {
  const t = await getTranslations('adminLaunchpadApproved.fundingCard');

  return (
    <Card className="w-full bg-gray-50">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-between">
          <div className="relative h-[122px] w-[200px]">
            <Image
              src={data.thumbnail?.url}
              alt={t('visualization')}
              fill
              containerHeight={122}
              className="w-full rounded-md object-cover"
            />
          </div>
          <div className="mt-5 flex w-full items-end gap-1">
            <p className="giant-iheading-semibold28">
              {t('amount', {
                amount: formatNumber(data.funding_goal.target_funding),
                currency: data.funding_goal.currency,
              })}
            </p>
            <p className="giant-iheading-regular16 mb-1">{t('target')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ContactFieldProps {
  icon: React.ReactNode;
  value: string;
}

function ContactField({ icon, value }: ContactFieldProps) {
  return (
    <Card>
      <CardContent className="bg-neutral-100 p-4">
        <div className="flex items-center gap-2">
          {icon}
          <p className="flex-1 select-all rounded p-2">{value}</p>
          <ContactCopyButton value={value} />
        </div>
      </CardContent>
    </Card>
  );
}

export default async function LaunchpadApprovedDetail({
  data,
  backerData,
}: {
  data: IAdminLaunchpadDetailRes | null;
  backerData: IAdminLaunchpadInvestmentRes | null;
}) {
  const t = await getTranslations('adminLaunchpadApproved.page');

  if (!data) {
    return null;
  }

  const timelineItems =
    data.voting_milestones?.map((milestone, index) => ({
      number: index + 1,
      sections: milestone.target_section,
      description: new Date(milestone.estimated_open_vote_date).toLocaleDateString(),
    })) || [];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left section - 2/3 */}
        <div className="space-y-6 lg:col-span-2">
          <LaunchpadInfo data={data} />
          <CourseTimeline items={timelineItems} />

          <div className="space-y-4">
            {data?.user?.props?.telegram && (
              <>
                <h3 className="mbutton-semibold16">{t('ownerTelegramLink')}</h3>
                <ContactField icon={<Telegram />} value={data?.user?.props?.telegram} />
              </>
            )}

            <h3 className="mbutton-semibold16">{t('verificationEmail')}</h3>
            <ContactField icon={<Mail />} value={data?.owner?.email ?? ''} />
          </div>
          {backerData && backerData.results.length > 0 && (
            <div className="mt-6">
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {backerData.results.map(backer => (
                      <div key={backer.id} className="flex items-center gap-3">
                        <div className="relative h-8 w-8">
                          <Image
                            src={backer.user?.avatar}
                            alt={backer.user?.display_name || ''}
                            fill
                            containerHeight={32}
                            className="min-w-8 rounded-full bg-gray-200 object-cover"
                          />
                        </div>
                        <span className="mbutton-semibold16 flex-1">
                          {backer.user?.display_name || backer.user_id} -&nbsp;
                          {backer.amount} {backer.currency}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Right section - 1/3 */}
        <div className="lg:col-span-1">
          <FundingCard data={data} />
        </div>
      </div>
    </div>
  );
}
