'use client';

import { useApplyCouponOrder, useOrderDeleteCoupon, useOrderPaymentWithWallet } from '@oe/api/hooks/useOrder';
import type { ICourse } from '@oe/api/types/course/course';
import type { IOrderRes } from '@oe/api/types/order';
import { createAPIUrl } from '@oe/api/utils/fetch';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { formatNumber } from '@oe/core/utils/utils';
import { Button } from '@oe/ui/shadcn/button';
import { Input } from '@oe/ui/shadcn/input';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Link } from '#common/navigation';
import type { IPaymentCryptoWallet } from './payment';

const NumberedCircle = ({ number }: { number: number }) => (
  <div className="mcaption-semibold14 flex h-6 min-h-6 w-6 min-w-6 items-center justify-center rounded-full border border-[#C4C6F2] text-primary ">
    {number}
  </div>
);

interface IPaymentCrypto {
  orderId: string;
  usedCoupon: string;
  amountDue: number;
  discountAmount: number;
  shareRate: number;
  shareRateAmount: number;
  data: ICourse;
  currentStep: number;
  cryptoCurrency: string;
  cryptoWallet: IPaymentCryptoWallet[] | null;
  onNextStep: () => void;
  setVerifyOrderRes: (value: IOrderRes | null) => void;
  setDiscountAmount: (value: number) => void;
  setAmountDue: (value: number) => void;
  setShareRateAmount: (value: number) => void;
  handleOrderPaymentSuccess: () => void;
}

const PaymentCrypto = ({
  orderId,
  usedCoupon,
  data,
  amountDue,
  discountAmount,
  shareRate,
  shareRateAmount,
  currentStep,
  cryptoCurrency,
  cryptoWallet,
  setVerifyOrderRes,
  setDiscountAmount,
  setAmountDue,
  setShareRateAmount,
  handleOrderPaymentSuccess,
}: IPaymentCrypto) => {
  const t = useTranslations('coursePayment.paymentConfirmation');
  const tError = useTranslations('errors');
  const params = useParams();
  const router = useRouter();

  const courseSlug = params.courseDetail as string;

  const [hasEnoughInsufficient, setHasEnoughInsufficient] = useState<boolean>(true);
  const [couponCode, setCouponCode] = useState<string>(usedCoupon ?? '');
  const [amountWalletByCurrency, setAmountWalletByCurrency] = useState<string>('0');
  const [isApplying, setIsApplying] = useState<boolean>(false);

  const { triggerApplyCouponOrder } = useApplyCouponOrder();
  const { triggerOrderPaymentWithWallet, isLoadingOrderPaymentWithWallet } = useOrderPaymentWithWallet(orderId);
  const { triggerOrderDeleteCoupon } = useOrderDeleteCoupon(orderId);

  useEffect(() => {
    if (usedCoupon) {
      setCouponCode(usedCoupon);
    }
  }, [usedCoupon]);

  useEffect(() => {
    const amountWalletByCurrency = cryptoWallet?.filter(
      item => item.currency_symbol.toLowerCase() === cryptoCurrency.toLowerCase()
    )?.[0]?.balance;
    console.log('amountDue', amountDue);
    console.log('amountWalletByCurrency', amountWalletByCurrency);
    setAmountWalletByCurrency(amountWalletByCurrency ?? '0');
    const hasEnoughInsufficient = Number.parseFloat(amountWalletByCurrency ?? '0') >= amountDue;
    console.log('hasEnoughInsufficient', hasEnoughInsufficient);
    setHasEnoughInsufficient(hasEnoughInsufficient);
  }, [amountDue, cryptoCurrency, cryptoWallet]);

  const handleApplyCoupon = async () => {
    setIsApplying(true);

    if (couponCode) {
      try {
        const res = await triggerApplyCouponOrder({
          orderId,
          code: couponCode,
        });

        setVerifyOrderRes(res);

        const { discount_amount, missing_amount, referral_discount_amount } = res.order;

        setDiscountAmount(Number(discount_amount));
        setAmountDue(Number(missing_amount));
        setShareRateAmount(Number(referral_discount_amount));
        if (Number(missing_amount) === 0) {
          handleOrderPaymentSuccess();
        }
      } catch (error) {
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    } else {
      await handleDeleteCoupon();
    }
  };

  const handleDeleteCoupon = async () => {
    try {
      const res = await triggerOrderDeleteCoupon();

      setVerifyOrderRes(res);

      const { discount_amount, missing_amount, referral_discount_amount } = res.order;

      setDiscountAmount(Number(discount_amount));
      setAmountDue(Number(missing_amount));
      setShareRateAmount(Number(referral_discount_amount));
      if (Number(missing_amount) === 0) {
        handleOrderPaymentSuccess();
      }
    } catch (error) {
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  };

  const handlePayment = async () => {
    try {
      const walletID = cryptoWallet?.filter(item => item.currency_symbol === cryptoCurrency)?.[0]?.id;

      await triggerOrderPaymentWithWallet({
        wallet_id: walletID ?? '',
      });
      void router.push(
        createAPIUrl({
          endpoint: PLATFORM_ROUTES.paymentSuccess,
          params: { slug: courseSlug },
        })
      );
    } catch (error) {
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  };

  return (
    <ul className="mcaption-regular14 text-neutral-900">
      {/* Step 2 */}
      <li className="mb-4 md:mb-6">
        <div className="mb-3 flex items-center gap-3">
          <NumberedCircle number={2} />
          <p className="mcaption-semibold14">{t('step2Title')}</p>
        </div>
        <div className=" mx-4 md:mx-10">
          <div className="mb-4 flex flex-col gap-4 md:gap-6">
            {currentStep === 0 && (
              <div className="flex w-full flex-col items-center gap-4 sm:flex-row">
                <Input
                  placeholder={t('couponCodePlaceholder')}
                  className="w-full flex-basic flex-grow"
                  onChange={e => {
                    const sanitizedValue = e.target.value.replaceAll(/[^\p{L}\d]/gu, '');

                    // Auto convert to uppercase
                    const upperValue = sanitizedValue.toUpperCase();

                    setCouponCode(upperValue);
                    setIsApplying(false);
                  }}
                  value={couponCode}
                />
                <Button
                  className="mt-2 w-full min-w-[140px] sm:mt-0 sm:w-auto"
                  onClick={handleApplyCoupon}
                  disabled={isApplying || !!(discountAmount && couponCode === usedCoupon)}
                >
                  {t('applyButton')}
                </Button>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="mb-4 flex justify-between">
              <span className="giant-iheading-semibold16 md:giant-iheading-semibold20">{t('orginal')}</span>
              <p className="giant-iheading-semibold20">
                <span>{formatNumber(Number(data?.price_settings?.crypto_price ?? 0))}</span>
                &nbsp;
                <span className="giant-iheading-semibold12">{cryptoCurrency}</span>
              </p>
            </div>

            <div className="mb-4 flex justify-between">
              <span className="giant-iheading-semibold16 md:giant-iheading-semibold20">{t('couponDiscount')}</span>
              <p className="giant-iheading-semibold20 text-positive-600">
                <span>{formatNumber(discountAmount ?? 0)}</span>&nbsp;
                <span className="giant-iheading-semibold12">{cryptoCurrency}</span>
              </p>
            </div>
            <div className="mb-4 flex justify-between">
              <span className="giant-iheading-semibold16 md:giant-iheading-semibold20">
                {t('shareRate')}&nbsp;
                <span className="font-bold text-primary">{shareRate ? `${shareRate}%` : ''}</span>
              </span>
              <p className="giant-iheading-semibold20 text-positive-600">
                <span>{formatNumber(shareRateAmount ?? 0)}</span>&nbsp;
                <span className="giant-iheading-semibold12">{cryptoCurrency}</span>
              </p>
            </div>
            <div className="flex items-center justify-between rounded-2 rounded-xl bg-primary-20 px-3 py-2">
              <span className="giant-iheading-semibold16 md:giant-iheading-semibold20">{t('finalPrice')}&nbsp;</span>
              <span className="giant-iheading-semibold20 md:giant-iheading-semibold28 text-primary">
                <span>{formatNumber(amountDue ?? 0)}</span>&nbsp;
                <span className="giant-iheading-semibold12">{cryptoCurrency}</span>
              </span>
            </div>
          </div>
        </div>
      </li>

      {/* Step 3 */}
      <li className="mb-4 md:mb-6">
        <div className="mb-3 flex items-center gap-3">
          <NumberedCircle number={3} />
          <p className="mcaption-semibold14">
            {t('step3CryptoTitle')}
            <span className="ml-1 text-negative-600">*</span>
          </p>
        </div>
        <div className="mcaption-semibold14 mx-4 flex flex-col gap-4 md:mx-10 md:gap-6">
          <div
            className={`flex flex-col justify-between gap-4 rounded-2 px-3 py-2 ${
              hasEnoughInsufficient ? 'bg-positive-50' : 'bg-negative-50'
            }`}
          >
            <p className="flex items-center justify-between">
              <span className="giant-iheading-semibold16 md:giant-iheading-semibold20">
                {t('step3CryptoAvailableAmount')}&nbsp;
              </span>
              <span className="giant-iheading-semibold20 md:giant-iheading-semibold28 text-primary">
                <span>{formatNumber(Number.parseFloat(amountWalletByCurrency ?? '0'))}</span>
                &nbsp;
                <span className="giant-iheading-semibold12">{cryptoCurrency}</span>
              </span>
            </p>
            <p className="flex items-center justify-between">
              <span className="giant-iheading-semibold16 md:giant-iheading-semibold20">
                {t('step3CryptoPaymentAmount')}&nbsp;
              </span>
              <span className="giant-iheading-semibold20 md:giant-iheading-semibold28 text-primary">
                <span>{formatNumber(amountDue ?? 0)}</span>&nbsp;
                <span className="giant-iheading-semibold12">{cryptoCurrency}</span>
              </span>
            </p>
            {!hasEnoughInsufficient && (
              <div className="flex-col justify-between rounded-2 bg-white p-3 md:flex md:flex-row">
                <span className="text-negative-500">
                  {t?.rich('step3CryptoInsufficientAmount', {
                    number: amountDue - Number.parseFloat(amountWalletByCurrency ?? '0'),
                    currency: cryptoCurrency ?? 'USDT',
                  })}
                </span>
                <Link href={PLATFORM_ROUTES.wallet} className="mcaption-semibold14 h-auto p-0 text-primary underline">
                  {t('step3CryptoTopUp')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </li>

      {/* Step 4 */}
      <li>
        <div className="mb-6 flex items-start gap-3">
          <NumberedCircle number={4} />
          <div className="block">
            <p className="mcaption-semibold14">
              {t('step4CryptoTitle')}
              <span className="ml-1 text-negative-600">*</span>
            </p>
            <p>{t('step4CryptoNote1')}</p>
            <p>{t('step4CryptoNote2')}</p>
          </div>
        </div>
        {hasEnoughInsufficient && (
          <div className="mcaption-semibold14 mx-4 flex flex-col gap-4 md:mx-10 md:gap-6">
            <Button className="w-full" onClick={handlePayment} loading={isLoadingOrderPaymentWithWallet}>
              {t('step4SubmitBtn')}
            </Button>
          </div>
        )}
      </li>
    </ul>
  );
};

export default PaymentCrypto;
