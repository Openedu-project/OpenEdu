'use client';

import type { ICourse } from '@oe/api/types/course/course';
import SendSquare from '@oe/assets/icons/send-square';
import { formatCurrency } from '@oe/ui/components/input-currency';
import { RatingStars } from '@oe/ui/components/rating-stars';
import { Separator } from '@oe/ui/shadcn/separator';
import { Layers, UsersRound } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

interface CourseDetailsProps {
  courseData: ICourse;
  showPrice?: boolean;
}

interface PriceDisplayProps {
  currency: string;
  price: string;
  discountPrice?: string;
}

export function CourseDetails({ courseData, showPrice }: CourseDetailsProps) {
  return (
    <>
      <CourseName name={courseData?.name} />
      <CourseOrganization orgName={courseData?.org?.name} isCompleted={courseData?.mark_as_completed} />
      <CourseStats courseData={courseData} />
      {showPrice && <CoursePrice courseData={courseData} />}
    </>
  );
}

function CourseName({ name }: { name: string }) {
  return (
    <p className="giant-iheading-bold18 mx-0 my-auto line-clamp-2 whitespace-break-spaces text-foreground">{name}</p>
  );
}

function CourseOrganization({
  orgName,
  isCompleted,
}: {
  orgName?: string;
  isCompleted?: boolean;
}) {
  return (
    <div className="mcaption-regular14 flex items-center gap-4 text-primary">
      {orgName && <p>{orgName}</p>}
      {isCompleted && (
        <div className="-mr-spacing-sm ml-auto w-12 rounded-l-full bg-[#2BA830]">
          <div className="grid h-6 w-6 items-center justify-center">
            <SendSquare />
          </div>
        </div>
      )}
    </div>
  );
}

function CourseStats({ courseData }: { courseData: ICourse }) {
  return (
    <div className="mcaption-regular14 flex justify-between gap-4 text-foreground">
      <div className="flex flex-wrap gap-2">
        <StatItem icon={<UsersRound className="h-4 w-4" />} value={courseData?.learner_count ?? 0} />
        <Separator orientation="vertical" />
        <RatingStars
          variant="number-shorten"
          className="px-0"
          rating={(courseData?.rating ?? 0) === 0 ? 5 : (courseData?.rating ?? 0)}
        />
        <Separator orientation="vertical" />
        {courseData?.levels?.[0] && (
          <StatItem icon={<Layers className="h-4 w-4" />} value={courseData.levels[0].name} />
        )}
      </div>
    </div>
  );
}

function StatItem({
  icon,
  value,
}: {
  icon: ReactNode;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="mcaption-regular14">{value}</span>
    </div>
  );
}

function PriceDisplay({ currency, price, discountPrice }: PriceDisplayProps) {
  const hasDiscount = Number(discountPrice) > 0;
  const totalPrice = hasDiscount ? String(Number(price) + Number(discountPrice)) : null;

  return (
    <div className="flex items-center gap-2">
      <div className="mcaption-bold20 flex gap-1 text-foreground">
        <span>{currency}</span>
        <span>{formatCurrency(price, false)}</span>
      </div>
      {hasDiscount && (
        <div className="mcaption-regular16 text-muted-foreground line-through">
          {`${currency}  `}
          {totalPrice && formatCurrency(totalPrice?.toString(), false)}
        </div>
      )}
    </div>
  );
}

function CoursePrice({ courseData }: { courseData: ICourse }) {
  const tDetail = useTranslations('courseCard');
  const priceSettings = courseData?.price_settings;

  if (!priceSettings?.is_pay) {
    return (
      <div className="relative flex w-full items-center justify-between">
        <p className="mcaption-bold20 text-foreground">{tDetail('free')}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {priceSettings?.fiat_price && (
        <PriceDisplay
          currency={priceSettings.fiat_currency}
          price={priceSettings.fiat_price}
          discountPrice={priceSettings.fiat_discount_price}
        />
      )}
      {priceSettings?.crypto_payment_enabled && (
        <PriceDisplay
          currency={priceSettings.crypto_currency}
          price={priceSettings.crypto_price}
          discountPrice={priceSettings.crypto_discount_price}
        />
      )}
    </div>
  );
}
