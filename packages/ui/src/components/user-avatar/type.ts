import type { Root } from '@radix-ui/react-avatar';
import type { ComponentPropsWithoutRef } from 'react';

// Types and Interfaces
type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ColorPair {
  background: string;
  text: string;
}

export interface IUserAvatar extends ComponentPropsWithoutRef<typeof Root> {
  src: string;
  name: string;
  size?: AvatarSize;
  customColors?: ColorPair;
}

// Constants
export const PREDEFINED_COLORS: ColorPair[] = [
  { background: '#C4C6F2', text: '#5055D7' },
  { background: '#CEF2F4', text: '#22C5CE' },
  { background: '#FFECB8', text: '#DCA200' },
  { background: '#FFE1FC', text: '#FD68F2' },
  { background: '#BBDEFF', text: '#0A8AFF' },
];

export const AVATAR_SIZES: Record<AvatarSize, { dimensions: string; fontClass: string }> = {
  sm: { dimensions: 'h-6 w-6', fontClass: 'mcaption-semibold12' },
  md: { dimensions: 'h-8 w-8', fontClass: 'mcaption-semibold14' },
  lg: { dimensions: 'h-[140px] w-[140px]', fontClass: 'giant-iDisplay-bold48' },
  xl: { dimensions: 'h-[200px] w-[200px]', fontClass: 'giant-iDisplay-bold64' },
};
