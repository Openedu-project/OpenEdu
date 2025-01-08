'use client';

import { Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Badge } from '#shadcn/badge';
import { Button } from '#shadcn/button';
import { DropdownMenu, DropdownMenuTrigger } from '#shadcn/dropdown-menu';
import { cn } from '#utils/cn';
import { MenuContent } from './menu-share-item';
import type { ShareButtonComponentProps } from './types';

export default function ShareButton({
  // config,
  // children,
  // onShareClick,
  className,
  // isAffiliate,
  courseData,
  ...props
}: ShareButtonComponentProps) {
  // console.log("courseData", courseData);
  // const { dataMe } = useGetMe();
  const tCourse = useTranslations('courses');
  // const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   // onShareClick?.(e);
  // };

  // const url = buildUrl({
  //   endpoint: PLATFORM_ROUTES.courseDetail,
  //   params: { slug: courseData?.slug },
  // });

  // const shareConfig: ShareConfig = {
  //   url: `https://${courseData?.org?.domain}${url}/${
  //     dataMe ? `?ref_by=${dataMe?.id}` : ""
  //   }`,
  //   title: courseData?.name,
  //   permalink: {
  //     enabled: true,
  //   },
  //   socials: [{ id: "facebook" }, { id: "twitter" }, { id: "telegram" }],
  // };

  const AffiliatedBadge = courseData?.props?.is_affiliate && (
    <Badge
      variant="default"
      className="mcaption-regular8 absolute bottom-[75%] left-[65%] z-10 rounded-md bg-primary p-1 text-background"
    >
      {tCourse('share.referral')}
    </Badge>
  );

  // const DefaultShareIcon = <Share2 className="h-3 w-3 md:h-4 md:w-4" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className={cn(
            'relative flex h-6 w-6 items-center border-foreground/20 focus:border focus-visible:ring-0 md:h-8 md:w-8 md:p-2',
            courseData?.props?.is_affiliate && '!mr-spacing-mml',
            className
          )}
          {...props}
        >
          <Share2 className="h-3 w-3 md:h-4 md:w-4" />
          {AffiliatedBadge}
        </Button>
      </DropdownMenuTrigger>

      <MenuContent courseData={courseData} />
    </DropdownMenu>
  );
}
