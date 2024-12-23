import { copyToClipboard } from '@oe/core/utils/utils';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { SocialIcon } from '#components/social-icon';
import { DropdownMenuContent, DropdownMenuItem } from '#shadcn/dropdown-menu';
import { cn } from '#utils/cn';
import { addParamsToUrl } from './share-button';
import { SOCIAL_MEDIA_CONFIG, type ShareButtonComponent, type ShareConfig } from './types';

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
  config: ShareConfig;
  align?: 'start' | 'end' | 'center';
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
    [config]
  );
};

const MenuItem = ({ url, title, label, onClick, socialUrl, ShareComponent, className }: MenuItemProps) => (
  <DropdownMenuItem className="px-3 py-2" onClick={onClick}>
    {ShareComponent ? (
      <ShareComponent url={url} title={title} className={cn('flex w-full items-center gap-2', className)}>
        <SocialIcon url={socialUrl ?? ''} iconSize={16} iconColor="#2C2C2C">
          <span className="ml-2">{label}</span>
        </SocialIcon>
      </ShareComponent>
    ) : (
      <SocialIcon url={socialUrl ?? ''} iconSize={16} iconColor="#2C2C2C">
        <span className="ml-2">{label}</span>
      </SocialIcon>
    )}
  </DropdownMenuItem>
);

export const MenuContent = ({ align = 'end', config }: MenuContentProps) => {
  const tCommonAction = useTranslations('general');

  const { url, title, permalink, additionalParams = {} } = config;
  const socialItems = useSocialItems(config);

  const handlePermalinkCopy = () => {
    const permalinkUrl = additionalParams ? addParamsToUrl(url, additionalParams) : url;
    copyToClipboard(permalinkUrl, tCommonAction('copied'), 2000);
  };

  return (
    <DropdownMenuContent align={align} className="rounded-lg bg-white shadow-lg">
      {permalink?.enabled && (
        <MenuItem url={permalink.url ?? ''} label={permalink.label || 'Permalink'} onClick={handlePermalinkCopy} />
      )}

      {socialItems?.map(item => (
        <MenuItem key={item.id} {...item} title={title} />
      ))}
    </DropdownMenuContent>
  );
};
