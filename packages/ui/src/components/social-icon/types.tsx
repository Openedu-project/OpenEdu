import type React from 'react';

export type SocialType =
  | 'email'
  | 'facebook'
  | 'telegram'
  | 'x'
  | 'zalo'
  | 'discord'
  | 'linkedin'
  | 'github'
  | 'website'
  | 'gmail'
  | 'other';

export type SocialIconLinkProps = {
  url: string;
  children?: React.ReactNode;
  showText?: boolean;
  className?: string;
  iconSize?: number;
  iconColor?: string;
  iconClassName?: string;
  linkClassName?: string;
  shortenedLink?: boolean;
};

export type IconProps = {
  className?: string;
  size: number;
  width: number;
  height: number;
  color?: string;
};

export const SOCIAL_PATTERNS = {
  facebook: ['facebook.com', 'fb.com', 'facebook', 'fb.me'],
  telegram: ['t.me', 'telegram.me', 'telegram.org', 'telegram'],
  x: ['twitter.com', 'x.com', 'twitter'],
  zalo: ['zalo.me', 'chat.zalo.me', 'zalo'],
  discord: ['discord.com', 'discord.gg', 'discord'],
  linkedin: ['linkedin.com', 'linkedin', 'lnkd.in'],
  github: ['github.com', 'github.io', 'github'],
} as const;
