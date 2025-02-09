'use client';
import type { ICoursePriceSettings } from '@oe/api/types/course/basic';
import { useTranslations } from 'next-intl';
import { formatCurrency } from '#components/input-currency';
import { PaymentButton } from '#components/payment-button';
import { WishlistButton } from '#components/wishlist-button';
import { Card, CardContent, CardFooter } from '#shadcn/card';
import { cn } from '#utils/cn';
import { useCourseContext } from './course-context';
// import { useCourseOutlineDetailStore } from "../_store/useCourseOutlineStore";

interface PriceRowProps {
  label?: string;
  // value: number | string;
  isBold?: boolean;
  // discount?: number | string;
  // currency?: string;
  // isPay?: boolean;
  priceSettings: ICoursePriceSettings;
}

interface PriceDisplayProps {
  value: number | string;
  currency?: string;
  discount?: number | string;
  isBold?: boolean;
}

const PriceDisplay = ({ value, currency = 'VND', discount, isBold }: PriceDisplayProps) => {
  const unitPrice = Number(discount ?? 0) + Number(value ?? 0);
  const textStyle = cn('giant-iheading-semibold20 text-primary', isBold && 'font-bold');

  return (
    <div className="flex flex-wrap items-center justify-between gap-1">
      <span className={textStyle}>
        <span className="mr-1 text-foreground">{currency}</span>
        {formatCurrency(String(value ?? 0), false)}
      </span>
      {Number(discount) > 0 && (
        <span className="mcaption-regular16 line-through">
          {currency} {formatCurrency(String(unitPrice), false)}
        </span>
      )}
    </div>
  );
};

const PriceRow = ({ isBold, priceSettings }: PriceRowProps) => {
  const t = useTranslations('courses.payment');

  if (!priceSettings?.is_pay) {
    return <span className={cn('giant-iheading-semibold20 uppercase', isBold && 'font-bold')}>{t('free')}</span>;
  }

  return (
    <div className="flex flex-col justify-between gap-1">
      <PriceDisplay
        value={priceSettings?.fiat_price}
        currency={priceSettings.fiat_currency}
        discount={priceSettings?.fiat_discount_price}
        isBold={isBold}
      />
      {priceSettings?.crypto_payment_enabled && (
        <PriceDisplay
          value={priceSettings?.crypto_price}
          currency={priceSettings.crypto_currency}
          discount={priceSettings?.crypto_discount_price}
          isBold={isBold}
        />
      )}
    </div>
  );
};

const PaymentCard = () => {
  // const { courseOutline: courseDataStore, setCourseOutline } =
  //   useCourseOutlineDetailStore();
  const { courseData, updateWishlistStatus } = useCourseContext();
  const { is_paid, is_enrolled, price_settings, bookmark, cuid } = courseData;
  const isPaidOrEnrolled = is_paid || is_enrolled;

  return (
    <Card className="w-full border-0 shadow-none">
      <CardContent className={cn(!isPaidOrEnrolled && 'px-0 pt-4 pb-4')}>
        {!isPaidOrEnrolled && <PriceRow priceSettings={price_settings} />}
      </CardContent>
      <CardFooter className="p-0">
        <div className="flex w-full items-center space-x-4">
          <PaymentButton className="mbutton-regular16 h-fit flex-grow" courseData={courseData} isCourseDetail />
          <WishlistButton
            bookmarkId={bookmark?.id ?? ''}
            entityId={cuid}
            entityType="course"
            isWishlist={courseData?.is_wishlist}
            className="flex-shrink-0 border-foreground/20"
            onSuccess={updateWishlistStatus}
          />
          {/* <WishlistButton
            bookmarkId={courseDataStore.bookmark?.id}
            entityId={cuid}
            entityType="course"
            isWishlist={courseDataStore.is_wishlist}
            className="flex-shrink-0 border-foreground/20 "
            onClick={async () => {
              const courseData = await getCourseOutlineService(undefined, {
                id: slug,
              });

              if (courseData) {
                setCourseOutline({
                  ...courseData,
                  bookmark: courseData.bookmark,
                  is_wishlist: courseData.is_wishlist,
                });
              }
            }}
          /> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export { PaymentCard, PriceRow };
