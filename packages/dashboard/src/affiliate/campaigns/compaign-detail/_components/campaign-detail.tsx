'use client';
import { useGetAffiliateCampaignDetail } from '@oe/api';

import type { ICanApplicableComm } from '@oe/api';
import { usePostExtendReferralLink, usePostReferralLink } from '@oe/api';
import type { ICommissionBonusRes } from '@oe/api';
import { useTranslations } from 'next-intl';
import { useParams, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import type { HTTPErrorMetadata } from '@oe/api';
import { PLATFORM_ROUTES } from '@oe/core';
import { copyToClipboard } from '@oe/core';
import { toast } from '@oe/ui';
import { ReferralSection } from './referral-section';

interface IMinMaxRates {
  min: number;
  max: number;
}
const getBaseRateItem = (items: ICanApplicableComm[]) => items?.find(item => item.is_base_rate === true);
const getMinMaxRates = (data: ICommissionBonusRes[]): IMinMaxRates => {
  const rates = data?.map(item => item?.ref1_rate);

  if (!rates) {
    return { min: 0, max: 0 };
  }
  const min = Math.min(...rates);
  const max = Math.max(...rates);

  return {
    min: min === Number.POSITIVE_INFINITY || min === Number.NEGATIVE_INFINITY ? 0 : min,
    max: max === Number.POSITIVE_INFINITY || max === Number.NEGATIVE_INFINITY ? 0 : max,
  };
};
const getReferralTypeOrder = (item: ICanApplicableComm): number => {
  const type = item?.referrer_types?.[0];
  const hasReferrerIds = item?.referrer_ids && item.referrer_ids.length > 0;

  // Handle 'user' type with special cases
  if (type === 'user') {
    return hasReferrerIds ? 6 : 1; // Empty referrer_ids gets priority 1, with values gets 6
  }

  // Handle other types
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
    } // Any other type goes to the end
  }
};

const sortReferralArray = (array: ICanApplicableComm[]): ICanApplicableComm[] =>
  [...array].sort((a, b) => {
    const orderA = getReferralTypeOrder(a);
    const orderB = getReferralTypeOrder(b);

    return orderA - orderB;
  });

const CampaignDetail = () => {
  const t = useTranslations('userAffiliateCampaignDetail');
  const tError = useTranslations('errors');

  const { campaignId } = useParams();
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get('course_slug');
  const orgDomain = searchParams.get('org_domain');

  const [commissionList, setCommissionList] = useState<ICanApplicableComm[] | []>([]);

  const { dataAffiliateCampaignDetail, mutateAffiliateCampaignDetail } = useGetAffiliateCampaignDetail({
    params: {
      id: String(campaignId),
      queryParams: {
        preloads: 'UserCommission',
        page: 1,
      },
    },
  });
  const { triggerPostReferralLink } = usePostReferralLink();
  const { triggerPostExtendReferralLink } = usePostExtendReferralLink();

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
        // Apply ref 2 and ref 3 for all referrer_type
        const res = newCommissionList.map(item => {
          const minMaxBonues = getMinMaxRates(item.bonuses);
          const isFounded = dataAffiliateCampaignDetail?.can_applicable_comms?.some(
            (canApplyItem: { id: string }) => canApplyItem.id === item?.id || item?.referrer_types?.[0] === 'downline'
          );

          return {
            ...item,
            canCopyLink: isFounded,
            minBonusRate: minMaxBonues.min,
            maxBonusRate: minMaxBonues.max,
            ref2_rate: baseRate?.ref2_rate ?? 0,
            ref3_rate: baseRate?.ref3_rate ?? 0,
          };
        });
        const sortedData = sortReferralArray(res);

        try {
          const result = await fetchData(sortedData);

          setCommissionList(result);
        } catch (error) {
          console.error('Error:', error);
          toast.error(tError((error as HTTPErrorMetadata).code.toString()));
        }
      }
    }

    void initializeData();
  }, [dataAffiliateCampaignDetail, triggerPostExtendReferralLink, triggerPostReferralLink, tError]);

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
      if (!item?.canCopyLink) {
        return false;
      }
      try {
        let res: { ref_code: string } | null = null;

        res = await (item?.referrer_types?.[0] === 'downline'
          ? triggerPostExtendReferralLink({ id: item?.id ?? '' })
          : triggerPostReferralLink({
              commission_id: item.id,
            }));
        await mutateAffiliateCampaignDetail();
        copyToClipboard(`${generateLink(orgDomain ?? '', courseSlug ?? '', res?.ref_code ?? '')}`, t('copied'));
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [
      triggerPostExtendReferralLink,
      triggerPostReferralLink,
      orgDomain,
      courseSlug,
      generateLink,
      mutateAffiliateCampaignDetail,
      t,
      tError,
    ]
  );

  return (
    <div className="space-y-6">
      <div className="mt-4">
        {commissionList?.map(item => (
          <ReferralSection
            key={item.id}
            title={generateCommissionType(item.referrer_types?.[0] ?? '')}
            data={item}
            bonuses={item.bonuses}
            showShareRate
            handleCopyLink={handleCopyLink}
            orgDomain={orgDomain ?? ''}
            courseSlug={courseSlug ?? ''}
          />
        ))}
      </div>
    </div>
  );
};

export { CampaignDetail };
