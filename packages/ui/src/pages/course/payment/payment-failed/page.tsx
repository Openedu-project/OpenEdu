'use client';

import { useGetCourseOutline } from '@oe/api';
import Icon from '@oe/assets/images/payment/icon-payment-failed.svg';
import { PLATFORM_ROUTES, buildUrl } from '@oe/core';
import { LifeBuoy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import type React from 'react';
import { Link } from '#common/navigation';
import { Image } from '#components/image';
import { buttonVariants } from '#shadcn/button';
import { Card, CardContent } from '#shadcn/card';
import { cn } from '#utils/cn';

export function PaymentFailed() {
  const router = useRouter();
  const t = useTranslations('coursePayment.paymentFailed');
  const { slug } = useParams();
  const { course: courseOutlineData } = useGetCourseOutline(String(slug));

  const handleRetryPayment = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    router.push(
      buildUrl({
        endpoint: PLATFORM_ROUTES.payment,
        params: { slug },
      })
    );
  };
  const supportChannel = courseOutlineData?.props?.support_channel?.channels?.[0];

  return (
    <Card className="mx-auto my-12 w-full text-center md:w-[440px]">
      <CardContent className="pt-6">
        <div className="mx-auto mb-6 flex max-w-[200px] justify-center rounded-full p-4">
          <Image src={Icon.src} height={200} width={200} alt="failed-icon" />
        </div>
        <h2 className="giant-iheading-semibold28 mb-6">{t('title')}</h2>
        <div className="mb-6 flex flex-col gap-2 text-neutral-900">
          <p className="mcaption-regular14">{t('message1')}</p>
          <p className="mcaption-regular14">{t('message2')}</p>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          {supportChannel && (
            <a
              href={supportChannel}
              target="_blank"
              className={cn(buttonVariants({ variant: 'secondary' }), 'flex max-w-[180px] gap-1 text-muted-foreground')}
              rel="noreferrer"
            >
              <LifeBuoy />
              {t('supportButton')}
            </a>
          )}
          <Link
            href={PLATFORM_ROUTES.homepage}
            onClick={e => handleRetryPayment(e)}
            className={cn(buttonVariants({ variant: 'default' }), 'flex max-w-[200px] gap-1 text-primary-foreground')}
          >
            <span>{t('retryButton')}</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
