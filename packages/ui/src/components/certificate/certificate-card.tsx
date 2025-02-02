'use client';
import type { ICertificateMyProfile } from '@oe/api/types/user-profile';
import { Card, CardContent, CardHeader } from '@oe/ui/shadcn/card';
import { Checkbox } from '@oe/ui/shadcn/checkbox';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { type HTMLAttributes, useState } from 'react';

import { createAPIUrl } from '@oe/api/utils/fetch';
import image from '@oe/assets/images/blog.png';
import { formatDate } from '@oe/core/utils/datetime';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { Image } from '#components/image';
import { cn } from '#utils/cn';
import { useShowProfileItemsStore } from '../../pages/user/_store/userProfileStore';

const PdfViewer = dynamic(() => import('../pdf-viewer/pdf-viewer'), {
  ssr: false,
});

interface ICertCardProps extends HTMLAttributes<HTMLDivElement> {
  certificate: ICertificateMyProfile;
  username: string;
  isSetting?: boolean;
  type?: 'profile' | 'learning_space';
}

export default function CertificateCard({
  certificate,
  className,
  username,
  isSetting = false,
  type = 'profile',
  ...props
}: ICertCardProps) {
  const t = useTranslations('certificate');
  const router = useRouter();

  const [isShow, setIsShow] = useState<boolean>(certificate?.is_show ?? false);

  const { addItem, removeItem, showItemList } = useShowProfileItemsStore();

  const handleClick = () => {
    if (type === 'profile') {
      router.push(
        createAPIUrl({
          endpoint: PLATFORM_ROUTES.profileCertificateDetail,
          params: { username, certId: certificate.id },
        })
      );
    } else {
      router.push(
        createAPIUrl({
          endpoint: PLATFORM_ROUTES.learnerMyCertificates,
          queryParams: { certificate: certificate.id },
        })
      );
    }
  };

  const handleShowCert = () => {
    if (isShow) {
      removeItem(certificate.id, true);
      setIsShow(false);
    } else if (showItemList.length < 8) {
      addItem(certificate);
      setIsShow(true);
    }
  };

  return (
    <Card
      className={cn(
        '!shadow-shadow-1 flex w-full min-w-[234px] max-w-[360px] cursor-pointer flex-col gap-2 border-[3px] border-transparent bg-background p-2 sm:min-w-[284px]',
        isShow && 'border-primary border-solid',
        !isSetting && 'hover:border-primary hover:border-solid',
        className
      )}
      onClick={isSetting ? handleShowCert : handleClick}
      {...props}
    >
      <CardHeader className="flex-row items-start justify-between gap-2 p-0">
        <h2 className="giant-iheading-semibold16 line-clamp-2 h-10 text-primary">{certificate.course_name}</h2>
        {isSetting && <Checkbox className="!mt-0" checked={isShow} />}
      </CardHeader>
      <CardContent className={cn('flex basis-full flex-col gap-3 p-0')}>
        <span className="mcaption-regular12 text-foreground/90">
          {t('completedOn')} {formatDate(certificate.create_at)}
        </span>
        {certificate?.files ? (
          <PdfViewer
            className="max-h-[244px] w-auto [&>div>div>div>div>div>canvas]:rounded-[12px] [&>div>div>div>div>div>canvas]:border [&>div>div>div>div>div>canvas]:border-primary"
            files={certificate?.files[0]?.url ?? ''}
          />
        ) : (
          <Image
            width={338}
            height={238}
            src={image.src}
            alt="certificate"
            className="rounded-[12px] border border-primary"
          />
        )}
      </CardContent>
    </Card>
  );
}
