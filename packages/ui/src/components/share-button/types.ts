import type { MouseEvent, ReactNode } from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share';
import type { ButtonProps } from '#shadcn/button';

export type ShareButtonComponent =
  | typeof FacebookShareButton
  | typeof TwitterShareButton
  | typeof LinkedinShareButton
  | typeof TelegramShareButton
  | typeof EmailShareButton;

interface SocialMediaConfig {
  Component: ShareButtonComponent;
  url: string;
  label: string;
  sourceParam: string;
}

export const SOCIAL_MEDIA_CONFIG: Record<string, SocialMediaConfig> = {
  facebook: {
    Component: FacebookShareButton,
    url: 'facebook.com',
    label: 'Facebook',
    sourceParam: 'fb',
  },
  linkedin: {
    Component: LinkedinShareButton,
    url: 'linkedin.com',
    label: 'LinkedIn',
    sourceParam: 'linkedin',
  },
  twitter: {
    Component: TwitterShareButton,
    url: 'twitter.com',
    label: 'X (Twitter)',
    sourceParam: 'x',
  },
  telegram: {
    Component: TelegramShareButton,
    url: 't.me',
    label: 'Telegram',
    sourceParam: 'telegram',
  },
  email: {
    Component: EmailShareButton,
    url: 'mailto:',
    label: 'Email',
    sourceParam: 'mail',
  },
};

type SocialMediaType = keyof typeof SOCIAL_MEDIA_CONFIG;

export interface SocialShare {
  id: SocialMediaType;
  label?: string;
  className?: string;
  url?: string;
}

export interface ShareConfig {
  url: string;
  title?: string;
  permalink?: {
    url?: string;
    enabled?: boolean;
    label?: string;
  };
  socials: SocialShare[];
  additionalParams?: Record<string, string>;
}

export interface ShareButtonComponentProps extends Omit<ButtonProps, 'onClick'> {
  config: ShareConfig;
  children?: ReactNode;
  onShareClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isAffiliate?: boolean;
}
