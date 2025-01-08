'use client';
import { useGetMe } from '@oe/api/hooks/useMe';
import type { ICourseOutline } from '@oe/api/types/course/course';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { copyToClipboard } from '@oe/core/utils/utils';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { SocialIcon } from '#components/social-icon';
import { DropdownMenuContent, DropdownMenuItem } from '#shadcn/dropdown-menu';
import { cn } from '#utils/cn';
import { SOCIAL_MEDIA_CONFIG, type ShareButtonComponent, type ShareConfig } from './types';

export const addParamsToUrl = (url: string, params: Record<string, string>) => {
  const urlObj = new URL(url);

  for (const [key, value] of Object.entries(params)) {
    urlObj.searchParams.set(key, value);
  }
  return urlObj.toString();
};

interface MenuItemProps {
  url: string;
  title?: string;
  label: string;
  socialUrl?: string;
  ShareComponent?: ShareButtonComponent;
  className?: string;
  onClick?: () => void;
}

interface MenuContentProps {
  config?: ShareConfig;
  align?: 'start' | 'end' | 'center';
  courseData?: ICourseOutline;
}

const useSocialItems = (config: ShareConfig) => {
  const { url, socials, additionalParams = {} } = config;

  return useMemo(
    () =>
      socials
        .map(social => {
          const socialConfig = SOCIAL_MEDIA_CONFIG[social.id];
          if (!socialConfig) {
            return null;
          }

          return {
            id: social.id,
            url: addParamsToUrl(url, {
              utm: socialConfig.sourceParam,
              ...additionalParams,
            }),
            label: social.label || socialConfig.label,
            socialUrl: socialConfig.url,
            ShareComponent: socialConfig.Component,
            className: social.className,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null),
    [additionalParams, url, socials]
  );
};

const MenuItem = ({ url, title, label, onClick, socialUrl, ShareComponent, className }: MenuItemProps) => (
  <DropdownMenuItem className="px-3 py-2" onClick={onClick}>
    {ShareComponent ? (
      <ShareComponent url={url} title={title} className={cn('flex w-full items-center gap-2', className)}>
        <SocialIcon url={socialUrl ?? ''}>
          <span className="ml-2">{label}</span>
        </SocialIcon>
      </ShareComponent>
    ) : (
      <SocialIcon url={socialUrl ?? ''}>
        <span className="ml-2">{label}</span>
      </SocialIcon>
    )}
  </DropdownMenuItem>
);

export const MenuContent = ({ align = 'end', courseData }: MenuContentProps) => {
  // console.log("courseData - MenuContent", courseData);
  const { dataMe } = useGetMe();
  const tCommonAction = useTranslations('general');
  const tCourses = useTranslations('courses');

  const url = buildUrl({
    endpoint: PLATFORM_ROUTES.courseDetail,
    params: { slug: courseData?.slug },
  });

  const shareConfig: ShareConfig = {
    url: `https://${courseData?.org?.domain}${url}/${dataMe ? `?ref_by=${dataMe?.id}` : ''}`,
    title: courseData?.name,
    permalink: {
      enabled: true,
    },
    socials: [{ id: 'facebook' }, { id: 'twitter' }, { id: 'telegram' }],
  };

  // const { url, title, permalink, additionalParams = {} } = config;
  const socialItems = useSocialItems(shareConfig);

  const handlePermalinkCopy = () => {
    // const permalinkUrl = additionalParams
    //   ? addParamsToUrl(url, additionalParams)
    //   : url;
    const permalinkUrl = shareConfig.url;
    copyToClipboard(permalinkUrl, tCommonAction('copied'), 2000);
  };

  return (
    <DropdownMenuContent align={align} className="rounded-lg bg-background shadow-lg">
      {shareConfig.permalink?.enabled && (
        <MenuItem
          url={shareConfig.permalink.url ?? ''}
          label={shareConfig.permalink.label || tCourses('share.permalink')}
          onClick={handlePermalinkCopy}
        />
      )}

      {socialItems?.map(item => (
        <MenuItem key={item.id} {...item} title={shareConfig.title} />
      ))}
    </DropdownMenuContent>
  );
};
