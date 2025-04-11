import type { ICanApplicableComm } from '@oe/api';
import { usePutShareRateById } from '@oe/api';
import { usePostExtendReferralLink, usePostReferralLink } from '@oe/api';
import { Button } from '@oe/ui';
import { Modal } from '@oe/ui';
import { Tooltip } from '@oe/ui';
import { Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';

import type { HTTPErrorMetadata } from '@oe/api';
import { useGetAffiliateCampaignDetail } from '@oe/api';
import { PLATFORM_ROUTES } from '@oe/core';
import { copyToClipboard } from '@oe/core';
import { toast } from '@oe/ui';
import { Link } from '@oe/ui';

const getBaseRateItem = (items: ICanApplicableComm[]) => items.find(item => item.is_base_rate === true);

interface ICampaignCommissionDetailModal {
  campaignId: string;
  title: string;
  courseSlug: string;
  orgDomain: string;
  onClose: () => void;
}

const getReferralTypeOrder = (item: ICanApplicableComm): number => {
  const type = item?.referrer_types?.[0];
  const hasReferrerIds = item?.referrer_ids && item.referrer_ids.length > 0;

  if (type === 'user') {
    return hasReferrerIds ? 6 : 1;
  }

  switch (type) {
    case 'downline': {
      return 2;
    }
    case 'purchased_user': {
      return 3;
    }
    case 'kol': {
      return 4;
    }
    case 'agency': {
      return 5;
    }
    default: {
      return 7;
    }
  }
};

const sortReferralArray = (array: ICanApplicableComm[]): ICanApplicableComm[] =>
  [...array].sort((a, b) => {
    const orderA = getReferralTypeOrder(a);
    const orderB = getReferralTypeOrder(b);

    return orderA - orderB;
  });

const AffiliateLink = ({
  orgDomain,
  courseSlug,
  refCode,
}: {
  orgDomain: string;
  courseSlug: string;
  refCode: string;
}) => {
  const fullLink = `https://${orgDomain}${PLATFORM_ROUTES.courses}/${courseSlug}?ref_code=${refCode}`;

  return (
    <Tooltip content={fullLink} className="ml-1">
      <Link
        href={fullLink}
        target="_blank"
        rel="noopener noreferrer"
        className="line-clamp-1 flex max-w-[148px] cursor-pointer items-center p-0 text-primary md:max-w-[189px]"
      >
        {`${fullLink.slice(0, 19)}...`}
      </Link>
    </Tooltip>
  );
};

export function CampaignCommissionDetailModal({
  campaignId,
  title = '',
  courseSlug,
  orgDomain,
  onClose,
}: ICampaignCommissionDetailModal) {
  const t = useTranslations('userAffiliateCommissionModal');
  const tError = useTranslations('errors');

  const [commissionList, setCommissionList] = useState<ICanApplicableComm[] | []>([]);
  const [shareRates, setShareRates] = useState<{ [key: string]: string }>({});

  const { triggerPostReferralLink } = usePostReferralLink();
  const { triggerPostExtendReferralLink } = usePostExtendReferralLink();

  const { dataAffiliateCampaignDetail, mutateAffiliateCampaignDetail } = useGetAffiliateCampaignDetail({
    params: {
      id: campaignId,
      queryParams: {
        preloads: 'UserCommission',
        page: 1,
      },
    },
  });
  const { triggerPutShareRate } = usePutShareRateById();

  useEffect(() => {
    async function fetchData(list: ICanApplicableComm[]) {
      const newList = await Promise.all(
        list.map(async item => {
          if (item?.canCopyLink) {
            const res = await (item?.referrer_types?.[0] === 'downline'
              ? triggerPostExtendReferralLink({ id: item?.id ?? '' })
              : triggerPostReferralLink({
                  commission_id: item.id,
                }));

            return {
              ...item,
              referral_link_by_user: res,
            };
          }
          return item;
        })
      );

      return newList;
    }

    async function initializeData() {
      let newCommissionList: ICanApplicableComm[] = [];
      const baseRate = getBaseRateItem(dataAffiliateCampaignDetail?.commissions ?? []);

      if (dataAffiliateCampaignDetail) {
        newCommissionList = dataAffiliateCampaignDetail?.commissions ?? [];
        if (dataAffiliateCampaignDetail.bought_from) {
          newCommissionList = [
            ...newCommissionList,
            {
              ...baseRate,
              ...dataAffiliateCampaignDetail.bought_from,
              referrer_types: ['downline'],
              user_extend_link: dataAffiliateCampaignDetail?.user_extend_link,
            },
          ] as ICanApplicableComm[];
        }

        const processedList = newCommissionList.map(item => {
          const maxBonusRate = item.bonuses?.length > 0 ? Math.max(...item.bonuses.map(bonus => bonus.ref1_rate)) : 0;

          const isFounded = dataAffiliateCampaignDetail?.can_applicable_comms?.some(
            (canApplyItem: { id: string }) => canApplyItem.id === item?.id || item?.referrer_types?.[0] === 'downline'
          );

          return {
            ...item,
            canCopyLink: isFounded,
            ref2_rate: baseRate?.ref2_rate ?? 0,
            ref3_rate: baseRate?.ref3_rate ?? 0,
            minRate: item.ref1_rate,
            maxRate: item.ref1_rate + maxBonusRate,
          };
        });

        const sortedData = sortReferralArray(processedList);

        try {
          const result = await fetchData(sortedData);

          setCommissionList(result);

          const initialShareRates: { [key: string]: string } = {};

          for (const item of result) {
            if (item.referral_link_by_user?.share_rate !== undefined) {
              initialShareRates[item.id] = item.referral_link_by_user.share_rate.toString();
            }
          }
          setShareRates(initialShareRates);
        } catch (error) {
          console.error('Error:', error);
          toast.error(tError((error as HTTPErrorMetadata).code.toString()));
        }
      }
    }

    void initializeData();
  }, [dataAffiliateCampaignDetail, tError, triggerPostReferralLink, triggerPostExtendReferralLink]);

  const generateCommissionType = useCallback(
    (type: string) => {
      if (type === 'purchased_user') {
        return t('courseLearner');
      }
      if (type && type !== 'user') {
        return t(type);
      }
      if (!type) {
        return t('specificReferrers');
      }
      return t('baseRate');
    },
    [t]
  );

  const generateLink = useCallback(
    (domain: string, slug: string, refCode: string) =>
      `https://${domain}${PLATFORM_ROUTES.courses}/${slug}?ref_code=${refCode}`,
    []
  );

  const handleCopyLink = useCallback(
    async (item: ICanApplicableComm) => {
      try {
        let res: { ref_code: string } | null = null;

        res = await (item?.referrer_types?.[0] === 'downline'
          ? triggerPostExtendReferralLink({ id: item?.id ?? '' })
          : triggerPostReferralLink({
              commission_id: item.id,
            }));
        await mutateAffiliateCampaignDetail();
        copyToClipboard(`${generateLink(orgDomain ?? '', courseSlug, res.ref_code)}`, t('copied'));
        toast.success(t('copied'));
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [
      courseSlug,
      generateLink,
      mutateAffiliateCampaignDetail,
      orgDomain,
      t,
      tError,
      triggerPostExtendReferralLink,
      triggerPostReferralLink,
    ]
  );

  const handleShareRateChange = useCallback((id: string, value: string) => {
    setShareRates(prev => {
      return { ...prev, [id]: value };
    });
  }, []);

  const handleApplyShareRate = useCallback(
    async (id: string, item: ICanApplicableComm) => {
      if (!['kol', 'agency'].includes(item?.referrer_types?.[0] ?? '')) {
        return true;
      }

      try {
        let res: {
          id: string | undefined;
          ref_code: string;
        } | null = null;

        res = await (item?.referrer_types?.[0] === 'downline'
          ? triggerPostExtendReferralLink({ id: item?.id ?? '' })
          : triggerPostReferralLink({
              commission_id: item.id,
            }));
        await triggerPutShareRate({
          campaignId: res?.id,
          share_rate: Number.parseFloat(shareRates[id] || '0'),
        });
        await mutateAffiliateCampaignDetail();

        toast.success(t('success'));
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [
      mutateAffiliateCampaignDetail,
      shareRates,
      t,
      tError,
      triggerPostReferralLink,
      triggerPostExtendReferralLink,
      triggerPutShareRate,
    ]
  );

  return (
    <>
      <Modal
        open={true}
        title={title}
        onClose={onClose}
        className="w-full md:min-w-[95vw] lg:min-w-[900px]"
        buttons={[
          {
            type: 'button',
            label: t('cancel'),
            variant: 'outline',
            onClick: () => onClose(),
          },
        ]}
      >
        <div>
          <div className="space-y-4">
            {commissionList?.map(item => (
              <div key={item.id} className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex items-end">
                  <span className="giant-iheading-semibold20">
                    {generateCommissionType((item?.referrer_types?.[0] as unknown as string) ?? '')}
                    &nbsp;
                    <span className="mcaption-semibold12 mb-1 ml-2">
                      {item?.minRate === item?.maxRate ? item?.maxRate : `${item?.minRate} - ${item?.maxRate}`}%
                    </span>
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2 md:flex-row">
                  <span className="giant-iheading-semibold16 whitespace-nowrap">{t('shareRate.title')}</span>
                  <input
                    type="number"
                    className="mcaption-regular16 w-full min-w-[80px] rounded-md border px-3 py-2 md:w-[80px]"
                    placeholder="00.0"
                    value={shareRates[item.id] || ''}
                    onChange={e => handleShareRateChange(item.id, e.target.value)}
                    min="0"
                    max="100"
                    step="0.1"
                    disabled={!(['kol', 'agency'].includes(item?.referrer_types?.[0] ?? '') && item?.canCopyLink)}
                  />
                  <Button
                    variant="secondary"
                    className="w-full md:w-auto"
                    onClick={() => handleApplyShareRate(item.id, item)}
                    disabled={!(['kol', 'agency'].includes(item?.referrer_types?.[0] ?? '') && item?.canCopyLink)}
                  >
                    {t('shareRate.apply')}
                  </Button>
                </div>

                <div className="flex items-center justify-end gap-1">
                  {item?.canCopyLink && (
                    <AffiliateLink
                      orgDomain={orgDomain ?? ''}
                      courseSlug={courseSlug}
                      refCode={item?.referral_link_by_user?.ref_code ?? ''}
                    />
                  )}
                  <Button
                    variant="default"
                    disabled={!item?.canCopyLink}
                    className="w-1/2 md:w-auto"
                    onClick={() => handleCopyLink(item)}
                  >
                    <Copy size={16} className="text-white" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
