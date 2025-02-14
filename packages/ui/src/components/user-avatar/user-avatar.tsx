import { useMemo } from 'react';
import { Image } from '#components/image';
import { cn } from '#utils/cn';
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

const getColorPairFromName = (name: string): ColorPair => {
  if (!name || PREDEFINED_COLORS.length === 0) {
    return DEFAULT_COLOR_PAIR;
  }

  // Create a number from the name string
  const hash = name.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);

  // Get index based on hash
  const index = hash % PREDEFINED_COLORS.length;

  return PREDEFINED_COLORS[index] ?? DEFAULT_COLOR_PAIR;
};

export const UserAvatar = ({ src, name, size = 'sm', customColors, className, ...props }: IUserAvatar) => {
  const colors = useMemo(() => customColors || getColorPairFromName(name), [customColors, name]);
  const { dimensions, fontClass } = AVATAR_SIZES[size];

  return (
    <div className={cn('relative', dimensions, className)} {...props}>
      {src ? (
        <Image src={src} alt={name ?? 'avatar'} fill className="!h-full absolute top-0 left-0 w-full rounded-full" />
      ) : (
        <div
          className={cn('flex h-full w-full items-center justify-center rounded-full', fontClass)}
          style={{
            backgroundColor: colors.background,
            color: colors.text,
          }}
        >
          {pickCharacters(name)}
        </div>
      )}
    </div>
  );
};
