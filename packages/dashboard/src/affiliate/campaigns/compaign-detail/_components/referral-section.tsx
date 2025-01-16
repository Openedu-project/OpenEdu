import { usePutShareRate } from '@oe/api/hooks/useShareRate';
import type { ICanApplicableComm } from '@oe/api/types/affiliate-campaign';
import type { ICommissionBonusRes } from '@oe/api/types/commission';
import { Button } from '@oe/ui/shadcn/button';
import { Tooltip } from '@oe/ui/shadcn/tooltip';
import { CirclePercent, Copy, Link as IconLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, useCallback, useMemo, useState } from 'react';

import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { getAlphabetLabel } from '@oe/core/utils/utils';
import { Link } from '@oe/ui/common/navigation';
import { toast } from '@oe/ui/shadcn/sonner';

const processRates = (bonuses: ICommissionBonusRes[]): ICommissionBonusRes[] =>
  bonuses?.map((bonus, index) => {
    const nextBonus = bonuses?.[index + 1];

    return {
      ...bonus,
      qty1_from: bonus.qty1 + 1,
      qty1_to: nextBonus ? nextBonus?.qty1 : undefined,
    };
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
        className="line-clamp-1 flex w-[60px] cursor-pointer items-center p-0 text-primary md:max-w-[189px]"
      >
        <IconLink className="mr-2 h-5 w-5" />
      </Link>
    </Tooltip>
  );
};

export const ReferralSection = ({
  title,
  data,
  bonuses,
  showShareRate = false,
  orgDomain,
  courseSlug,
  handleCopyLink,
}: {
  title: string;
  data: ICanApplicableComm;
  bonuses: ICommissionBonusRes[];
  showShareRate?: boolean;
  orgDomain: string;
  courseSlug: string;
  handleCopyLink: (item: ICanApplicableComm) => void;
}) => {
  const t = useTranslations('userAffiliateCampaignDetail');
  const tError = useTranslations('errors');

  const newBonuses = useMemo(() => processRates(bonuses), [bonuses]);

  const [sharePercentage, setSharePercentage] = useState<string>(
    (data?.referral_link_by_user?.share_rate ?? 0).toString()
  );
  const [isValid, setIsValid] = useState<boolean>(true);
  const { triggerPutShareRate } = usePutShareRate(data?.referral_link_by_user?.id ?? '');

  const validateShareRate = useCallback(
    (value: string) => {
      const numValue = Number(value);
      setIsValid(numValue >= 0 && numValue <= data?.ref1_rate);
    },
    [data?.ref1_rate]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSharePercentage(value);
    validateShareRate(value);
  };

  const handleShareRateUpdate = useCallback(async () => {
    if (!['kol', 'agency'].includes(data?.referrer_types?.[0] ?? '')) {
      return true;
    }
    if (sharePercentage && isValid) {
      try {
        await triggerPutShareRate({
          share_rate: Number(sharePercentage),
        });
        toast.success(t('success'));
      } catch (error) {
        console.error('Error updating share rate:', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    }
  }, [sharePercentage, isValid, triggerPutShareRate, data?.referrer_types, t, tError]);

  return (
    <div className="mt-5 w-full rounded-radius-m bg-white shadow-shadow-5">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="border-b p-4">
          <div className="mcaption-semibold20">{title}</div>
        </div>
        <div className="space-y-4 p-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="mcaption-regular14">{t('referralSection.referral.ref1')}</div>
              <div className="mcaption-semibold20">{data?.ref1_rate}%</div>
            </div>
            <div>
              <div className="mcaption-regular14">{t('referralSection.referral.ref2')}</div>
              <div className="mcaption-semibold20">{data?.ref2_rate}%</div>
            </div>
            <div>
              <div className="mcaption-regular14">{t('referralSection.referral.ref3')}</div>
              <div className="mcaption-semibold20">{data?.ref3_rate}%</div>
            </div>
          </div>
          {showShareRate && (
            <div className="space-y-2">
              <div className="mcaption-regular14">{t('referralSection.shareRate.title')}</div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="-translate-y-1/2 absolute top-1/2 left-1 text-gray-500">
                    <CirclePercent className="h-5" />
                  </span>
                  <input
                    type="number"
                    value={sharePercentage}
                    onChange={handleInputChange}
                    placeholder="0.0"
                    step="0.1"
                    className={`mbutton-regular16 h-11 w-full min-w-[100px] rounded-[12px] border py-2 pr-3 pl-8 ${
                      isValid ? '' : 'border-red-500'
                    }`}
                    disabled={!(['kol', 'agency'].includes(data?.referrer_types?.[0] ?? '') && data?.canCopyLink)}
                  />
                </div>
                <Button
                  variant="secondary"
                  onClick={handleShareRateUpdate}
                  disabled={!(['kol', 'agency'].includes(data?.referrer_types?.[0] ?? '') && data?.canCopyLink)}
                >
                  {t('referralSection.shareRate.apply')}
                </Button>
              </div>
            </div>
          )}
          <div className="flex gap-2">
            {data?.canCopyLink && (
              <AffiliateLink
                orgDomain={orgDomain ?? ''}
                courseSlug={courseSlug}
                refCode={data?.referral_link_by_user?.ref_code ?? ''}
              />
            )}
            <Button
              variant="default"
              className="w-full"
              disabled={!data?.canCopyLink}
              onClick={() => handleCopyLink(data)}
            >
              <Copy size={16} className=" text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Header - Updated grid with restored quantity column */}
      <div className="hidden lg:grid lg:grid-cols-10 lg:items-center lg:gap-4 lg:border-b lg:p-4">
        <div className="mcaption-semibold20">{title}</div>
        <div className="mcaption-regular16">{t('referralSection.quantity')}</div>
        <div className="mcaption-regular16">{t('referralSection.referral.ref1')}</div>
        <div className="mcaption-regular16">{t('referralSection.referral.ref2')}</div>
        <div className="mcaption-regular16">{t('referralSection.referral.ref3')}</div>
        {showShareRate && (
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <div className="mcaption-regular16 whitespace-nowrap">{t('referralSection.shareRate.title')}</div>
              <div className="relative flex-1">
                <span className="-translate-y-1/2 absolute top-1/2 left-1 text-gray-500">
                  <CirclePercent className="h-5" />
                </span>
                <input
                  type="number"
                  value={sharePercentage}
                  onChange={handleInputChange}
                  placeholder="0.0"
                  step="0.1"
                  disabled={!(['kol', 'agency'].includes(data?.referrer_types?.[0] ?? '') && data?.canCopyLink)}
                  className={`mbutton-regular16 h-11 w-full min-w-[100px] rounded-[12px] border py-2 pr-3 pl-8 ${
                    isValid ? '' : 'border-red-500'
                  }`}
                />
              </div>
              <Button
                variant="secondary"
                disabled={!(['kol', 'agency'].includes(data?.referrer_types?.[0] ?? '') && data?.canCopyLink)}
                onClick={handleShareRateUpdate}
                className="relative z-10"
              >
                {t('referralSection.shareRate.apply')}
              </Button>
            </div>
          </div>
        )}
        <div className="col-span-3">
          <div className="flex justify-end gap-1">
            <div className="flex items-center justify-end gap-1">
              {data?.canCopyLink && (
                <AffiliateLink
                  orgDomain={orgDomain ?? ''}
                  courseSlug={courseSlug}
                  refCode={data?.referral_link_by_user?.ref_code ?? ''}
                />
              )}
              <div className="justify-self-end">
                <Button variant="default" disabled={!data?.canCopyLink} onClick={() => handleCopyLink(data)}>
                  <Copy size={16} className=" text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bonus Tiers */}
      <div className="">
        {/* Default */}
        <div className="border-b p-4 transition-colors duration-150 hover:bg-gray-50">
          {/* Mobile Layout */}
          <div className="space-y-2 lg:hidden">
            <div className="flex items-center gap-4">
              <span className="mcaption-semibold16">{`${t(
                'referralSection.bonus.prefix'
              )} ${getAlphabetLabel(0)}`}</span>
              <span className="mcaption-regular16">
                {newBonuses?.[0]?.qty1 ? `1 - ${newBonuses?.[0]?.qty1 ?? 1}` : '> 0'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="mcaption-regular14">{t('referralSection.referral.ref1')}</div>
                <div className="mcaption-regular16">{data.ref1_rate}%</div>
              </div>
              <div>
                <div className="mcaption-regular14">{t('referralSection.referral.ref2')}</div>
                <div className="mcaption-regular16">{data.ref2_rate}%</div>
              </div>
              <div>
                <div className="mcaption-regular14">{t('referralSection.referral.ref3')}</div>
                <div className="mcaption-regular16">{data.ref3_rate}%</div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Updated grid with restored quantity column */}
          <div className="hidden lg:grid lg:grid-cols-10 lg:items-center lg:gap-4">
            <div className="mcaption-semibold16">{`${t('referralSection.bonus.prefix')} ${getAlphabetLabel(0)}`}</div>
            <div className="mcaption-regular16">
              {newBonuses?.[0]?.qty1 ? `1 - ${newBonuses?.[0]?.qty1 ?? 2}` : '> 0'}
            </div>
            <div className="mcaption-regular16">{data.ref1_rate}%</div>
            <div className="mcaption-regular16">{data.ref2_rate}%</div>
            <div className="mcaption-regular16">{data.ref3_rate}%</div>
            {showShareRate && <div className="col-span-2" />}
            <div className="col-span-3" />
          </div>
        </div>

        {/* Bonuses */}
        {newBonuses?.map((bonus, index) => (
          <div key={bonus.id} className="border-b p-4 transition-colors duration-150 hover:bg-gray-50">
            {/* Mobile Layout */}
            <div className="space-y-2 lg:hidden">
              <div className="flex items-center gap-4">
                <span className="mcaption-semibold16">{`${t(
                  'referralSection.bonus.prefix'
                )} ${getAlphabetLabel(index + 1)}`}</span>
                <span className="mcaption-regular16">
                  {`${
                    bonus.qty1_to
                      ? `${bonus.qty1_from ?? 1} - ${bonus.qty1_to ?? bonus.qty1}`
                      : `> ${(bonus.qty1_from ?? 1) - 1}`
                  }`}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <div className="mcaption-regular14">{t('referralSection.referral.ref1')}</div>
                  <div className="mcaption-regular16">{bonus.ref1_rate + data.ref1_rate}%</div>
                </div>
                <div>
                  <div className="mcaption-regular14">{t('referralSection.referral.ref2')}</div>
                  <div className="mcaption-regular16">{data.ref2_rate}%</div>
                </div>
                <div>
                  <div className="mcaption-regular14">{t('referralSection.referral.ref3')}</div>
                  <div className="mcaption-regular16">{data.ref3_rate}%</div>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Updated grid with restored quantity column */}
            <div className="hidden lg:grid lg:grid-cols-10 lg:items-center lg:gap-4">
              <div className="mcaption-semibold16">{`${t(
                'referralSection.bonus.prefix'
              )} ${getAlphabetLabel(index + 1)}`}</div>
              <div className="mcaption-regular16">
                {`${
                  bonus.qty1_to
                    ? `${bonus.qty1_from ?? 1} - ${bonus.qty1_to ?? bonus.qty1}`
                    : `> ${(bonus.qty1_from ?? 1) - 1}`
                }`}
              </div>
              <div className="mcaption-regular16">{bonus.ref1_rate + data.ref1_rate}%</div>
              <div className="mcaption-regular16">{data.ref2_rate}%</div>
              <div className="mcaption-regular16">{data.ref3_rate}%</div>
              {showShareRate && <div className="col-span-2" />}
              <div className="col-span-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferralSection;
