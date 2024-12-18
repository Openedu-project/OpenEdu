import { formatCurrency } from '@oe/core/utils/format-currency';
import { PaymentButton } from '#components/payment-button';
import { Card, CardContent, CardFooter } from '#shadcn/card';
import { cn } from '#utils/cn';
import { useCourseOutlineDetailStore } from '../_store/useCourseOutlineStore';

interface PriceRowProps {
  label?: string;
  value: number | string;
  isBold?: boolean;
  discount?: number | string;
  currency?: string;
  isPay?: boolean;
}

const PriceDisplay = ({
  value,
  currency = 'VND',
  discount,
  isBold,
}: {
  value: number;
  currency?: string;
  discount?: number;
  isBold?: boolean;
}) => {
  const unitPrice = Number(discount ?? 0) + Number(value ?? 0);
  const textStyle = cn('giant-iheading-semibold24', 'text-content-neutral-medium-800', isBold && 'font-bold');

  return (
    <>
      <span className={textStyle}>
        {currency} {formatCurrency(Number(value ?? 0))}
      </span>
      {Number(discount) > 0 && (
        <span className="mcaption-regular16 line-through">
          {currency} {formatCurrency(unitPrice)}
        </span>
      )}
    </>
  );
};

const PriceRow = ({ label, value, isBold, discount, currency = 'VND', isPay }: PriceRowProps) => {
  return (
    <div className="flex items-center justify-between">
      {label && (
        <span className={cn('giant-iheading-semibold16', 'text-content-neutral-light-700', isBold && 'font-bold')}>
          {label}
        </span>
      )}
      {isPay ? (
        <PriceDisplay value={Number(value)} currency={currency} discount={Number(discount)} isBold={isBold} />
      ) : (
        <span className={cn('giant-iheading-semibold24', 'text-content-neutral-medium-800', isBold && 'font-bold')}>
          FREE
        </span>
      )}
    </div>
  );
};

const PaymentCard = () => {
  const { courseOutline } = useCourseOutlineDetailStore();
  const isPaidOrEnrolled = courseOutline.is_paid || courseOutline.is_enrolled;

  return (
    <Card className="w-full border-0 shadow-none lg:max-w-sm">
      <CardContent className={cn(!isPaidOrEnrolled && 'px-0 pt-4 pb-4')}>
        {!isPaidOrEnrolled && (
          <PriceRow
            value={courseOutline?.price_settings?.fiat_price ?? 0}
            discount={courseOutline?.price_settings?.fiat_discount_price}
            currency={courseOutline?.price_settings?.fiat_currency}
            isPay={courseOutline?.price_settings?.is_pay}
          />
        )}
      </CardContent>
      <CardFooter className="p-0">
        <div className="flex w-full items-center space-x-4">
          <PaymentButton className="mbutton-regular16 h-fit flex-grow" courseData={courseOutline} isCourseDetail />
          {/* <WishlistButton
            bookmarkId={courseOutline.bookmark?.id}
            entityId={courseOutline.cuid}
            entityType="course"
            isWishlist={courseOutline.is_wishlist}
            className="flex-shrink-0"
            onClick={async () => {
              await mutateCourseOutline();
            }}
          /> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export { PaymentCard, PriceRow };
