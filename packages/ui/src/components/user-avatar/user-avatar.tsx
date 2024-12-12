import { useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '#shadcn/avatar';
import { AVATAR_SIZES, type ColorPair, type IUserAvatar, PREDEFINED_COLORS } from './type';

const RE_WORD_SEPARATOR = /\s+/;

const DEFAULT_COLOR_PAIR: ColorPair = {
  background: '#C4C6F2',
  text: '#5055D7',
};

export const pickCharacters = (input: string): string => {
  const words = input.split(RE_WORD_SEPARATOR);

  if (words.length > 1) {
    return words
      .slice(0, 2)
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  }
  return input.slice(0, 2).toUpperCase();
};

const getRandomColorPair = (): ColorPair => {
  if (PREDEFINED_COLORS.length === 0) {
    return DEFAULT_COLOR_PAIR;
  }

  const randomIndex = Math.floor(Math.random() * PREDEFINED_COLORS.length);
  return PREDEFINED_COLORS[randomIndex] ?? DEFAULT_COLOR_PAIR;
};

export const UserAvatar = ({ src, name, size = 'sm', customColors, ...props }: IUserAvatar) => {
  const colors = useMemo(() => customColors || getRandomColorPair(), [customColors]);
  const { dimensions, fontClass } = AVATAR_SIZES[size];

  return (
    <Avatar className={dimensions} {...props}>
      <AvatarImage src={src} alt={name ?? 'avatar'} />
      <AvatarFallback
        className={fontClass}
        style={{
          backgroundColor: colors.background,
          color: colors.text,
        }}
      >
        {pickCharacters(name)}
      </AvatarFallback>
    </Avatar>
  );
};
