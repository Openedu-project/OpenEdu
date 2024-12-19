import Mail from '@oe/assets/icons/mail';
import Discord from '@oe/assets/icons/social-icon/discord';
import Facebook from '@oe/assets/icons/social-icon/facebook';
import Github from '@oe/assets/icons/social-icon/github';
import Linkedin from '@oe/assets/icons/social-icon/linkedin';
import Telegram from '@oe/assets/icons/social-icon/telegram';
import Twitter from '@oe/assets/icons/social-icon/twitter';
import Zalo from '@oe/assets/icons/social-icon/zalo';
import { EMAIL_REGEX } from '@oe/core/utils/constants';
import { Link as LinkIcon } from 'lucide-react';
import type React from 'react';
import { Link } from '#common/navigation';
import { cn } from '#utils/cn';
import { type IconProps, SOCIAL_PATTERNS, type SocialIconLinkProps, type SocialType } from './types';

const HTTP_REGEX = '/^(https?://)/';

const ICON_MAP: Record<SocialType, React.ComponentType<IconProps>> = {
  email: Mail,
  facebook: Facebook,
  telegram: Telegram,
  twitter: Twitter,
  zalo: Zalo,
  discord: Discord,
  linkedin: Linkedin,
  github: Github,
  other: LinkIcon,
};

export const getSocialType = (url: string): SocialType => {
  const lowercaseUrl = url.toLowerCase();

  if (EMAIL_REGEX.test(lowercaseUrl)) {
    return 'email';
  }

  for (const [social, patterns] of Object.entries(SOCIAL_PATTERNS)) {
    if (patterns.some(pattern => lowercaseUrl.includes(pattern))) {
      return social as SocialType;
    }
  }

  return 'other';
};

export const formatUrl = (
  url: string,
  type: SocialType,
  shortenedLink: boolean
): { displayUrl: string; linkUrl: string } => {
  let linkUrl = url;
  let displayUrl = url;

  // Format linkUrl
  if (type === 'email' && !url.startsWith('mailto:')) {
    linkUrl = `mailto:${url}`;
  } else if (!(url.startsWith('http://') || url.startsWith('https://')) && type !== 'email') {
    linkUrl = `https://${url}`;
  }

  // Format displayUrl
  if (shortenedLink) {
    displayUrl = url.replace(HTTP_REGEX, '');
    if (type === 'email' && url.startsWith('mailto:')) {
      displayUrl = url.replace('mailto:', '');
    }
  } else if (type === 'email' && !url.startsWith('mailto:')) {
    displayUrl = url;
  }

  return { displayUrl, linkUrl };
};

export const getSocialIcon = (type: SocialType, props: IconProps) => {
  const Icon = ICON_MAP[type] || ICON_MAP.other;
  return <Icon {...props} />;
};

export const SocialIcon: React.FC<SocialIconLinkProps> = ({
  url,
  children,
  className,
  iconSize = 24,
  iconColor,
  linkClassName = 'text-neutral-900 ml-3 line-clamp-1',
  shortenedLink = false,
}) => {
  const socialType = getSocialType(url);
  const { displayUrl, linkUrl } = formatUrl(url, socialType, shortenedLink);

  const iconProps = {
    size: iconSize,
    width: iconSize,
    height: iconSize,
    color: iconColor,
  };

  return (
    <div className={cn('flex items-center', className)}>
      {getSocialIcon(socialType, iconProps)}
      {children ?? (
        <Link href={linkUrl} target="_blank" rel="noopener noreferrer" className={cn(linkClassName, 'h-fit')}>
          {displayUrl}
        </Link>
      )}
    </div>
  );
};
