'use client';
import type { IAdminLaunchpadDetailRes } from '@oe/api/types/admin-launchpad';
import { formatNumber } from '@oe/core/utils/utils';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

interface FundingStatsProps {
  data: IAdminLaunchpadDetailRes;
}

const FundingStats = ({ data }: FundingStatsProps) => {
  const t = useTranslations('creatorLaunchpad.fundingCard');

  const target = useMemo(() => Number(data?.funding_goal?.target_funding) || 0, [data?.funding_goal?.target_funding]);
  const pledged = useMemo(() => Number(data?.total_amount) || 0, [data?.total_amount]);
  const backers = useMemo(() => data?.total_backers ?? 0, [data?.total_backers]);

  const votingProcess = useMemo(() => {
    return data?.voting_milestones?.find(milestone => milestone.status === 'running')?.voting_process;
  }, [data?.voting_milestones]);

  const percentage = useMemo(() => {
    if (typeof target !== 'number' || typeof pledged !== 'number' || target === 0) {
      return 0;
    }
    return Math.round((pledged / target) * 100);
  }, [target, pledged]);
  const displayPercentage = percentage > 100 ? 100 : percentage;

  const dataChart = [
    { name: 'Pledged', value: displayPercentage || 0 },
    {
      name: 'Remaining',
      value: displayPercentage ? 100 - displayPercentage : 100,
    },
  ];

  const COLORS = ['#484AE7', '#E8E7F9'];

  const shouldShowPledgedInfo = useMemo(() => {
    const showStatuses = ['funding', 'waiting', 'voting', 'success', 'failed', 'refunded'];
    return showStatuses.includes(data?.status);
  }, [data?.status]);

  return (
    <div className="w-full p-0">
      <div className="flex flex-col md:items-center md:justify-between 2xl:flex-row">
        <div className="order-2 mt-6 w-full md:order-1 md:mt-0 2xl:w-1/2">
          <div className="space-y-1">
            <p className="giant-iheading-semibold28">
              {t('amount', {
                amount: formatNumber(data?.funding_goal?.target_funding ?? 0),
                currency: data?.funding_goal?.currency,
              })}
              <span className="giant-iheading-regular16 mb-1 ml-1">{t('target')}</span>
            </p>
            {shouldShowPledgedInfo && (
              <>
                <p className="giant-iheading-semibold28">
                  {t('amount', {
                    amount: formatNumber(pledged ?? 0),
                    currency: data?.funding_goal?.currency,
                  })}
                  <span className="giant-iheading-regular16 mb-1 ml-1">{t('pledged')}</span>
                </p>
                <p className="giant-iheading-semibold28">
                  {formatNumber(backers ?? 0)}
                  <span className="giant-iheading-regular16 mb-1 ml-1">{t('backers')}</span>
                </p>
              </>
            )}
          </div>
        </div>
        <div className="order-1 flex w-full justify-center md:order-2 2xl:w-1/2">
          <div className="relative h-32 w-32">
            <PieChart width={200} height={200}>
              <Pie
                data={dataChart}
                cx={64}
                cy={64}
                innerRadius={48}
                outerRadius={60}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
              >
                {dataChart.map((entry, index) => (
                  <Cell key={`cell-${entry}`} fill={COLORS[index]} strokeWidth={0} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center pl-3">
              <span className="giant-iheading-semibold24 text-primary">{percentage}%</span>
              <span className="giant-iheading-semibold16 text-primary">{t('target')}</span>
            </div>
          </div>
        </div>
      </div>
      {(data?.status === 'voting' || data?.status === 'success' || data?.status === 'refunded') && (
        <div className="block">
          <div className="my-6 h-[2px] w-full rounded-md bg-neutral-300" />
          {data?.status === 'voting' && (
            <div className="giant-iheading-semibold20 flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
              <div className="block text-positive-600 xl:text-center">
                <p className="giant-iheading-bold40">{votingProcess?.approve_percentage ?? 0}%</p>
                <p>{t('approved')}</p>
              </div>
              <div className="block text-negative-600 xl:text-center">
                <p className="giant-iheading-bold40">{votingProcess?.reject_percentage ?? 0}%</p>
                <p>{t('declined')}</p>
              </div>
            </div>
          )}
          {data?.status === 'success' && (
            <div className="giant-iheading-semibold20 flex flex-col gap-2">
              <div className="block text-positive-600">
                <p className="giant-iheading-bold40">{formatNumber(data?.total_amount ?? 0)} USDT</p>
                <p>{t('revenue')}</p>
              </div>
            </div>
          )}
          {data?.status === 'refunded' && (
            <div className="giant-iheading-semibold20 flex flex-col gap-2">
              <div className="block text-negative-600">
                <p className="giant-iheading-bold40">{formatNumber(data?.total_refunded ?? 0)} USDT</p>
                <p>{t('refunded')}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FundingStats;
