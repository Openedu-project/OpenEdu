import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import type { ThemeGlobalRadiusKey } from '../../../_types';

interface RadiusPreviewProps {
  size: ThemeGlobalRadiusKey;
  radius: number;
  baseRadius: number;
}

const SIZE_MAP: Record<ThemeGlobalRadiusKey, number> = {
  default: 64,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 80,
};
const RadiusPreview = ({ size, radius, baseRadius }: RadiusPreviewProps) => {
  const t = useTranslations('themeUI.radius');

  const calculatedRadius = useMemo(() => {
    if (size === 'default') {
      return `${radius}rem`;
    }
    return `${baseRadius * 16 + radius}px`; // Convert rem to px and add offset
  }, [size, radius, baseRadius]);

  return (
    <div className="space-y-2">
      <div
        className="bg-primary transition-all"
        style={{
          borderRadius: calculatedRadius,
          width: `${SIZE_MAP[size]}px`,
          height: `${SIZE_MAP[size]}px`,
        }}
      />
      <p className="text-center text-muted-foreground text-xs">{t(`preview.${size}`)}</p>
    </div>
  );
};

RadiusPreview.displayName = 'RadiusPreview';
export { RadiusPreview, SIZE_MAP };
