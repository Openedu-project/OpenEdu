import type { SocialType } from './types';

export const getFilteredSocialProps = (props: Record<string, string>): Record<string, string> => {
  const socialTypes: SocialType[] = [
    'email',
    'facebook',
    'telegram',
    'x',
    'zalo',
    'discord',
    'linkedin',
    'github',
    'website',
    'gmail',
    'other',
  ];

  const filteredProps: Record<string, string> = {};

  for (const [key, value] of Object.entries(props)) {
    if (socialTypes.includes(key as SocialType) && typeof value === 'string') {
      filteredProps[key] = value;
    }
  }

  return filteredProps;
};
