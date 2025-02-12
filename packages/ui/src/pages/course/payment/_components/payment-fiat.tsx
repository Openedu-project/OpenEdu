'use client';

import { useApplyCouponOrder, useOrderDeleteCoupon } from '@oe/api/hooks/useOrder';
import type { ICourse } from '@oe/api/types/course/course';
import type { IOrderRes } from '@oe/api/types/order';
import type { IPaymentMethodItem } from '@oe/api/types/payment';
import { Button } from '@oe/ui/shadcn/button';
import { Input } from '@oe/ui/shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { Copy, QrCode } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ReactNode, useEffect, useState } from 'react';

import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { copyToClipboard, formatNumber } from '@oe/core/utils/utils';
import { toast } from 'sonner';
import { Image } from '#components/image';

const NumberedCircle = ({ number }: { number: number }) => (
  <div className="mcaption-semibold14 flex h-6 min-h-6 w-6 min-w-6 items-center justify-center rounded-full border border-[#C4C6F2] text-primary ">
    {number}
  </div>
);

interface IPaymentFiat {
  orderId: string;
  paymentMethodSelected: string;
  dataOrder: IOrderRes | null;
  amountDue: number;
  discountAmount: number;
  shareRate: number;
  shareRateAmount: number;
  data: ICourse;
  currentStep: number;
  dataMethods: IPaymentMethodItem[];
  fiatCurrency: string;
  usedCoupon: string;
  onNextStep: () => void;
  setVerifyOrderRes: (value: IOrderRes | null) => void;
  handleChangeMethod: (value: string) => Promise<boolean>;
  setDiscountAmount: (value: number) => void;
  setAmountDue: (value: number) => void;
  setShareRateAmount: (value: number) => void;
  handleOrderPaymentSuccess: () => void;
}

const PaymentFiat = ({
  orderId,
  paymentMethodSelected,
  data,
  dataOrder,
  amountDue,
  discountAmount,
  shareRate,
  shareRateAmount,
  currentStep,
  dataMethods,
  fiatCurrency,
  usedCoupon,
  onNextStep,
  setVerifyOrderRes,
  handleChangeMethod,
  setDiscountAmount,
  setAmountDue,
  setShareRateAmount,
  handleOrderPaymentSuccess,
}: IPaymentFiat) => {
  const t = useTranslations('coursePayment.paymentConfirmation');
  const tCoursePayment = useTranslations('coursePayment');
  const tError = useTranslations('errors');

  const [couponCode, setCouponCode] = useState<string>(usedCoupon ?? '');
  const [isApplying, setIsApplying] = useState<boolean>(false);

  const { triggerApplyCouponOrder } = useApplyCouponOrder();
  const { triggerOrderDeleteCoupon } = useOrderDeleteCoupon(orderId);

  useEffect(() => {
    if (usedCoupon) {
      setCouponCode(usedCoupon);
    }
  }, [usedCoupon]);

  const handleApplyCoupon = async () => {
    if (!paymentMethodSelected) {
      toast.error(t('choosePaymentMethod'));
      return;
    }

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

  return (
    <ul className="mcaption-regular14 text-neutral-900">
      {/* Step 2 */}
      <li className="mb-4 md:mb-6">
        <div className="mb-3 flex items-center gap-3">
          <NumberedCircle number={2} />
          <p className="mcaption-semibold14">
            {t('step1Title')}
            <span className="ml-1 text-negative-600">*</span>
          </p>
        </div>
        <div className="mx-4 flex flex-col gap-4 md:mx-10 md:gap-6">
          <Select onValueChange={handleChangeMethod}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('searchPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {dataMethods
                ?.filter(item => item.service === 'sepay')
                ?.map((item: IPaymentMethodItem) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.account}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </li>

      {/* Step 3 */}
      <li className="mb-4 md:mb-6">
        <div className="mb-3 flex items-center gap-3">
          <NumberedCircle number={3} />
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
                <span className="giant-iheading-semibold12">{fiatCurrency}</span>
                <span>
                  &nbsp;
                  {formatNumber(Number(data?.price_settings?.fiat_price ?? 0))}
                </span>
              </p>
            </div>

            <div className="mb-4 flex justify-between">
              <span className="giant-iheading-semibold16 md:giant-iheading-semibold20">{t('couponDiscount')}</span>
              <p className="giant-iheading-semibold20 text-positive-600">
                <span className="giant-iheading-semibold12">
                  {discountAmount >= 0 ? `- ${fiatCurrency}` : fiatCurrency}
                </span>
                <span> {formatNumber(discountAmount ?? 0)}</span>
              </p>
            </div>
            <div className="mb-4 flex justify-between">
              <span className="giant-iheading-semibold16 md:giant-iheading-semibold20">
                {t('shareRate')}&nbsp;
                <span className="font-bold text-primary">{shareRate ? `${shareRate}%` : ''}</span>
              </span>
              <p className="giant-iheading-semibold20 text-positive-600">
                <span className="giant-iheading-semibold12">
                  {shareRateAmount >= 0 ? `- ${fiatCurrency}` : fiatCurrency}
                </span>
                <span> {formatNumber(shareRateAmount ?? 0)}</span>
              </p>
            </div>
            <div className="flex items-center justify-between rounded-2 rounded-xl bg-primary-20 px-3 py-2">
              <span className="giant-iheading-semibold16 md:giant-iheading-semibold20">{t('finalPrice')}&nbsp;</span>
              <span className="giant-iheading-semibold20 md:giant-iheading-semibold28 text-primary">
                <span className="giant-iheading-semibold12">{fiatCurrency}</span>
                <span> {formatNumber(amountDue ?? 0)}</span>
              </span>
            </div>
          </div>
        </div>
      </li>

      {/* Step 4 */}
      <li className="mb-4 md:mb-6">
        <div className="mb-3 flex items-center gap-3">
          <NumberedCircle number={4} />
          <p className="mcaption-semibold14">
            {t('step3Title')}
            <span className="ml-1 text-negative-600">*</span>
          </p>
        </div>
        <div className="mcaption-semibold14 mx-4 flex flex-col gap-4 md:mx-10 md:gap-6">
          <div className="block">
            <p>{t('step3QrCodeTitle')}</p>
            <ol>
              <li className="text-primary">
                <span>&#x2022; </span> {t('step3QrCodeDescription1')}
              </li>
              <li className="text-primary">
                <span>&#x2022; </span> {t('step3QrCodeDescription2')}
              </li>
            </ol>
          </div>
          <div className="block">
            <p>{t('step3BankTitle')}</p>
            <ol>
              <li className="text-primary">
                <span>&#x2022; </span>
                {t('step3BankEnterDescription1')}
              </li>
              <li className="text-primary">
                <span>&#x2022; </span> {t('step3BankEnterDescription2')}
              </li>
              <li className="text-primary">
                <span>&#x2022; </span> {t('step3BankEnterDescription3')}
              </li>
              <li className="text-primary">
                <span>&#x2022; </span> {t('step3BankEnterDescription4')}
              </li>
            </ol>
          </div>
          {dataOrder && (
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="w-full sm:w-1/4">
                <div className="mx-auto flex max-h-[130px] max-w-[130px] items-center justify-center rounded-radius-m border border-neutral-100 p-2 sm:mx-0">
                  {dataOrder?.payment_url ? (
                    <Image src={dataOrder.payment_url} alt="qr-code" height={120} width={120} />
                  ) : (
                    <QrCode size={64} />
                  )}
                </div>
              </div>
              <div className="w-full sm:w-3/4">
                <h3 className="giant-iheading-semibold24 mb-2 text-neutral-900">
                  {dataOrder?.payment_method?.account_name}
                </h3>
                <p className="giant-iheading-semibold16 mb-2 flex items-end gap-1">
                  <span className="font-medium">{t('bankName')}:</span>&nbsp;
                  <span>{dataOrder?.payment_method?.account}</span>
                </p>
                <p className="giant-iheading-semibold16 mb-2 flex items-center gap-1">
                  <span>{t('accountNo')}:</span>
                  <span className="text-primary">{dataOrder?.payment_method?.account_number}</span>
                  <Copy
                    className="ml-1 h-4 w-4 cursor-pointer text-gray-500"
                    onClick={() =>
                      copyToClipboard(
                        (dataOrder?.payment_method?.account_number ?? '')?.toString(),
                        tCoursePayment('copied')
                      )
                    }
                  />
                </p>
                <p className="giant-iheading-semibold16 flex items-center gap-1">
                  <span>{t('message')}:</span>
                  <span className="flex items-center gap-5 text-primary">{dataOrder?.order?.code}</span>
                  <Copy
                    className="ml-1 h-4 w-4 cursor-pointer text-gray-500"
                    onClick={() =>
                      copyToClipboard((dataOrder?.order?.code ?? '')?.toString(), tCoursePayment('copied'))
                    }
                  />
                </p>
              </div>
            </div>
          )}
        </div>
      </li>

      {/* Step 5 */}
      <li>
        <div className="mb-6 flex items-start gap-3">
          <NumberedCircle number={5} />
          <div className="block">
            <p className="mcaption-semibold14">
              {t.rich('step4Title', {
                span: (chunks: ReactNode) => <span className="text-primary">{chunks}</span>,
              })}
              <span className="text-negative-600 ">*</span>
            </p>
            <p>{t('step4Note')}</p>
          </div>
        </div>
        {dataOrder && (
          <div className="mcaption-semibold14 mx-4 flex flex-col gap-4 md:mx-10 md:gap-6">
            <Button className="w-full" onClick={onNextStep}>
              {t('completeButton')}
            </Button>
          </div>
        )}
      </li>
    </ul>
  );
};

export default PaymentFiat;
