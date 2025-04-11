import { Discord, Facebook, Github, LinkIcon, Linkedin, Mail, Telegram, Twitter, Zalo } from '@oe/assets';
import { EMAIL_REGEX } from '@oe/core';
import type React from 'react';
import { Link } from '#common/navigation';
import { cn } from '#utils/cn';
import { type IconProps, SOCIAL_PATTERNS, type SocialIconLinkProps, type SocialType } from './types';

const HTTP_REGEX = /^(https?:\/\/)/;
const MAILTO_PREFIX = 'mailto:';
const HTTP_PREFIX = 'https://';

const ICON_MAP: Record<SocialType, React.ComponentType<IconProps>> = {
  email: Mail,
  gmail: Mail,
  facebook: Facebook,
  telegram: Telegram,
  x: Twitter,
  zalo: Zalo,
  discord: Discord,
  linkedin: Linkedin,
  github: Github,
  website: LinkIcon,
  other: LinkIcon,
};

export const getSocialType = (url: string): SocialType => {
  const lowercaseUrl = url?.toLowerCase();

  if (EMAIL_REGEX.test(lowercaseUrl)) {
    return 'email';
  }

  for (const [social, patterns] of Object.entries(SOCIAL_PATTERNS)) {
    if (patterns.some(pattern => lowercaseUrl.includes(pattern))) {
      return social as SocialType;
    }
  }

  return 'website';
};

type UrlFormat = {
  displayUrl: string;
  linkUrl: string;
};

export const formatUrl = (url: string, type: SocialType, shortenedLink: boolean): UrlFormat => {
  // Early returns for empty URLs
  if (!url) {
    return { displayUrl: '', linkUrl: '' };
  }

  const isEmail = type === 'email';
  const hasMailto = url.startsWith(MAILTO_PREFIX);
  const hasHttp = HTTP_REGEX.test(url);

  // Format linkUrl
  const linkUrl = isEmail ? (hasMailto ? url : `${MAILTO_PREFIX}${url}`) : hasHttp ? url : `${HTTP_PREFIX}${url}`;

  // Format displayUrl
  const displayUrl = shortenedLink ? (isEmail ? url.replace(MAILTO_PREFIX, '') : url.replace(HTTP_REGEX, '')) : url;

  return { displayUrl, linkUrl };
};

export const getSocialIcon = (type: SocialType, props: IconProps) => {
  const Icon = ICON_MAP[type] || ICON_MAP.other;
  return <Icon {...props} className={cn('h-4 w-4', props?.className)} />;
};

export const SocialIcon: React.FC<SocialIconLinkProps> = ({
  url,
  children,
  className,
  showText = true,
  iconSize = 24,
  iconColor,
  iconClassName,
  linkClassName = 'text-foreground/90 ml-3 line-clamp-1',
  shortenedLink = false,
}) => {
  if (typeof url !== 'string') {
    return;
  }

  const socialType = getSocialType(url);
  const { displayUrl, linkUrl } = formatUrl(url, socialType, shortenedLink);

  const iconProps = {
    size: iconSize,
    width: iconSize,
    height: iconSize,
    color: iconColor,
    className: iconClassName,
  };

  return (
    <div className={cn('flex items-center', className)}>
      {getSocialIcon(socialType, iconProps)}
      {showText
        ? (children ?? (
            <Link href={linkUrl} target="_blank" rel="noopener noreferrer" className={cn(linkClassName, 'h-fit')}>
              {displayUrl}
            </Link>
          ))
        : null}
    </div>
  );
};
