'use client';
import type { ICourse, ICourseOutline } from '@oe/api/types/course/course';
import type { IOrderRes } from '@oe/api/types/order';
import type { IPaymentMethodItem } from '@oe/api/types/payment';
import Layer from '@oe/assets/icons/layer';
import Person2User from '@oe/assets/icons/person-2-user';
import { formatDate } from '@oe/core/utils/datetime';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { Card, CardContent } from '@oe/ui/shadcn/card';
import { CalendarClock, CheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useMemo } from 'react';
import { Link } from '#common/navigation';
import { Image } from '#components/image';
import { UserAvatar } from '#components/user-avatar';
import { cn } from '#utils/cn';
import CourseIncludes from '../../_components/course-includes';
import type { IPaymentCryptoWallet, IPaymentOption } from './payment';
import PaymentCrypto from './payment-crypto';
import PaymentFiat from './payment-fiat';

const NumberedCircle = ({ number }: { number: number }) => (
  <div className="mcaption-semibold14 flex h-6 min-h-6 w-6 min-w-6 items-center justify-center rounded-full border border-[#C4C6F2] text-primary ">
    {number}
  </div>
);

interface IPaymentConfirm {
  courseData: ICourseOutline;
  orderId: string;
  paymentMethodSelected: string;
  paymentOptionSelected: IPaymentOption;
  dataOrder: IOrderRes | null;
  amountDue: number;
  discountAmount: number;
  shareRate: number;
  shareRateAmount: number;
  currentStep: number;
  dataMethods: IPaymentMethodItem[];
  fiatCurrency: string;
  cryptoCurrency: string;
  usedCoupon: string;
  cryptoWallet: IPaymentCryptoWallet[] | null;
  onNextStep: () => void;
  setVerifyOrderRes: (value: IOrderRes | null) => void;
  handleChangeMethod: (value: string) => Promise<boolean>;
  handleChangeCryptoMethod: (value: IPaymentOption) => Promise<boolean>;
  setDiscountAmount: (value: number) => void;
  setAmountDue: (value: number) => void;
  setShareRateAmount: (value: number) => void;
  handleOrderPaymentSuccess: () => void;
}

const PaymentConfirm = ({
  courseData,
  orderId,
  paymentMethodSelected,
  paymentOptionSelected,
  dataOrder,
  amountDue,
  discountAmount,
  shareRate,
  shareRateAmount,
  currentStep,
  dataMethods,
  fiatCurrency,
  cryptoCurrency,
  cryptoWallet,
  usedCoupon,
  onNextStep,
  setVerifyOrderRes,
  handleChangeMethod,
  handleChangeCryptoMethod,
  setDiscountAmount,
  setAmountDue,
  setShareRateAmount,
  handleOrderPaymentSuccess,
}: IPaymentConfirm) => {
  const tCoursePayment = useTranslations('coursePayment');
  const t = useTranslations('coursePayment.paymentConfirmation');
  const tPaymentOptions = useTranslations('coursePayment.paymentOptions');

  const router = useRouter();

  const paymentOptions = useMemo(
    () => [
      {
        id: 'fiat',
        name: tPaymentOptions('bank'),
        amount: null,
        enable: true,
      },
      {
        id: 'crypto',
        name: tPaymentOptions('wallet'),
        amount: `${courseData?.price_settings?.crypto_price ?? 0} USD - ${
          courseData?.price_settings?.crypto_price ?? 0
        } ${courseData?.price_settings?.crypto_currency ?? 'USDT'}`,
        enable: courseData?.price_settings?.crypto_payment_enabled,
      },
    ],
    [
      courseData?.price_settings?.crypto_currency,
      courseData?.price_settings?.crypto_payment_enabled,
      courseData?.price_settings?.crypto_price,
      tPaymentOptions,
    ]
  );
  const { quiz_count = 0, video_count = 0, active_section = 0, has_certificate = false } = courseData ?? {};
  const isIncluded = has_certificate || quiz_count > 0 || active_section > 0 || video_count > 0;

  const handleRedirect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>,
    domain?: string
  ) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const { slug } = courseData;
      if (domain && domain !== window.location.hostname) {
        window.open(`https://${domain}${PLATFORM_ROUTES.courses}/${slug}`, '_blank');
      } else {
        void router.push(`${PLATFORM_ROUTES.courses}/${slug}`);
      }
    }
  };

  const supportChannel = useMemo(
    () => courseData?.props?.support_channel?.channels?.[0],
    [courseData?.props?.support_channel?.channels]
  );

  return (
    <div className="mb-4 md:mb-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="giant-iheading-semibold28">{tCoursePayment('coursePayment')}</h2>
        {supportChannel && (
          <div className="mcaption-semibold14 text-black">
            {t('constactSupport')}&nbsp;
            <Link className="text-primary" href={supportChannel ?? '#'}>
              {t('constactSupportLink')}
            </Link>
          </div>
        )}
      </div>
      <Card className="!border-none shadow-none">
        <CardContent className="!border-none !p-0 flex flex-col gap-4 md:p-6 lg:flex-row lg:gap-6">
          <div className="mt-4 w-full rounded-radius-m p-4 shadow-shadow-2 lg:mt-0 lg:w-2/3 lg:pr-4">
            <div className="mb-4 flex flex-col md:mb-6">
              <div className="space-y-4">
                <ul className="mcaption-regular14 text-[#2C2C2C]">
                  {/* Step 1 */}
                  <li className="mb-4 md:mb-6">
                    <div className="mb-3 flex items-center gap-3">
                      <NumberedCircle number={1} />
                      <p className="mcaption-semibold14">
                        {t('step1Title')}
                        <span className="ml-1 text-[#D50010]">*</span>
                      </p>
                    </div>
                    <div className="mx-4 flex flex-col gap-4 md:mx-10 md:gap-4">
                      {paymentOptions.map(
                        method =>
                          method?.enable && (
                            <Card
                              key={method.id}
                              className="cursor-pointer rounded-[12px] p-3 transition-colors"
                              onClick={() => handleChangeCryptoMethod(method?.id as IPaymentOption)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div
                                    className={`flex h-5 w-5 items-center justify-center rounded border bg-[#DBDBDB] ${
                                      paymentOptionSelected === method?.id
                                        ? '!bg-primary border-primary'
                                        : 'border-gray-300'
                                    }`}
                                  >
                                    {paymentOptionSelected === method?.id && (
                                      <CheckIcon className="h-4 w-4 text-white" />
                                    )}
                                  </div>
                                  <span className="mcaption-semibold16">{method?.name}</span>
                                </div>
                                {method?.amount && (
                                  <span className="mcaption-regular16 text-[#2C2C2C]">{method?.amount}</span>
                                )}
                              </div>
                            </Card>
                          )
                      )}
                    </div>
                  </li>
                </ul>
                {paymentOptionSelected === 'fiat' ? (
                  <PaymentFiat
                    orderId={orderId}
                    paymentMethodSelected={paymentMethodSelected}
                    data={courseData as ICourse}
                    dataOrder={dataOrder}
                    amountDue={amountDue}
                    discountAmount={discountAmount}
                    shareRate={shareRate ?? 0}
                    shareRateAmount={shareRateAmount}
                    currentStep={currentStep}
                    dataMethods={dataMethods ?? []}
                    fiatCurrency={fiatCurrency}
                    usedCoupon={usedCoupon}
                    onNextStep={onNextStep}
                    setVerifyOrderRes={setVerifyOrderRes}
                    handleChangeMethod={handleChangeMethod}
                    setDiscountAmount={setDiscountAmount}
                    setAmountDue={setAmountDue}
                    setShareRateAmount={setShareRateAmount}
                    handleOrderPaymentSuccess={handleOrderPaymentSuccess}
                  />
                ) : (
                  <PaymentCrypto
                    orderId={orderId}
                    data={courseData as ICourse}
                    amountDue={amountDue}
                    discountAmount={discountAmount}
                    shareRate={shareRate ?? 0}
                    shareRateAmount={shareRateAmount}
                    currentStep={currentStep}
                    cryptoCurrency={cryptoCurrency}
                    cryptoWallet={cryptoWallet}
                    usedCoupon={usedCoupon}
                    onNextStep={onNextStep}
                    setVerifyOrderRes={setVerifyOrderRes}
                    setDiscountAmount={setDiscountAmount}
                    setAmountDue={setAmountDue}
                    setShareRateAmount={setShareRateAmount}
                    handleOrderPaymentSuccess={handleOrderPaymentSuccess}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-full rounded-radius-m p-4 shadow-shadow-2 lg:w-1/3">
            {courseData && (
              <div
                role="presentation"
                className={cn('group relative w-full')}
                onClick={e =>
                  handleRedirect(e as React.MouseEvent<HTMLDivElement, MouseEvent>, courseData?.org?.domain)
                }
                onKeyUp={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (courseData?.org?.domain) {
                      handleRedirect(e, courseData?.org?.domain);
                    }
                  }
                }}
              >
                <Card
                  id={courseData?.id}
                  className={cn(
                    '!shadow-none !p-0 mx-auto flex h-full w-full flex-col gap-3 rounded-radius-m border-none'
                  )}
                >
                  <div className="relative w-full shrink-0 rounded-2 bg-[#ebecfb]">
                    <Image
                      src={courseData?.thumbnail?.url}
                      alt={courseData?.name ?? ''}
                      className="rounded-2"
                      height={222}
                      width={390}
                      sizes="(max-width: 768px) 280px, 380px"
                    />
                  </div>
                  <div className="mcaption-bold24 flex items-center gap-1 text-primary">
                    <span>{courseData?.name}</span>
                  </div>
                  <CardContent className="flex basis-full flex-col gap-3 p-0 text-foreground">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="mcaption-semibold16 line-clamp-1 flex items-center gap-1">
                        <span className="text-foreground/70">{tCoursePayment('creator')}:</span>
                        <h2 className="mcaption-semibold16 mb-0 line-clamp-1 text-primary">
                          {courseData?.owner?.display_name && courseData?.owner.display_name?.length > 0
                            ? courseData?.owner.display_name
                            : courseData?.owner?.username}
                        </h2>
                      </div>

                      <UserAvatar
                        src={courseData?.owner?.avatar ?? ''}
                        name={courseData?.owner?.display_name ?? courseData?.owner?.username ?? ''}
                      />
                    </div>
                    <div className="mcaption-regular16 mb-2 flex items-center gap-1">
                      <CalendarClock className="h-[17px] w-[16px] text-[#2C2C2C]" />
                      <span>
                        {tCoursePayment('lastUpdated')}&nbsp;
                        {formatDate(courseData?.pub_date ?? 0)}
                      </span>
                    </div>
                    <div className="mcaption-semibold16 flex justify-between gap-2 text-foreground">
                      <div className="flex flex-wrap gap-5">
                        <div className="flex items-center gap-1">
                          <Person2User />
                          <span>
                            {courseData?.learner_count ?? 0}&nbsp;
                            {courseData?.learner_count && courseData?.learner_count > 1
                              ? tCoursePayment('learners')
                              : tCoursePayment('learner')}
                          </span>
                        </div>
                        {courseData?.levels?.[0] && (
                          <div className="flex items-center gap-1">
                            <Layer />
                            &nbsp;
                            <span>{courseData?.levels?.[0]?.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <div className="mt-4 border-t pt-4">
              {isIncluded && <CourseIncludes className="!mb-4" courseOutline={courseData} />}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentConfirm;
