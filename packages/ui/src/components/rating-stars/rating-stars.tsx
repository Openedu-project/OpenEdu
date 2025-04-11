import { Star, StarHalf, StarOutline } from '@oe/assets';
import { cn } from '#utils/cn';

type RatingVariant = 'with-number' | 'number-shorten' | 'no-number';

interface RatingStarProps {
  rating: number;
  color?: string;
  size?: number;
  variant?: RatingVariant;
  className?: string;
}

const MAX_STARS = 5;

export function RatingStars({ rating, color, variant = 'no-number', size, className }: RatingStarProps) {
  const normalizedRating = Math.min(rating, MAX_STARS);
  const formattedRating = normalizedRating % 1 > 0 ? normalizedRating : `${normalizedRating}.0`;

  const renderStars = () => {
    const fullStars = Math.floor(normalizedRating);
    const hasHalfStar = normalizedRating % 1 > 0;
    const emptyStars = MAX_STARS - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...new Array(fullStars)].map((_, i) => (
          <Star key={`full-${i.toString()}`} color={color} width={size} height={size} />
        ))}
        {hasHalfStar && <StarHalf key="half" color={color} width={size} height={size} />}
        {[...new Array(emptyStars)].map((_, i) => (
          <StarOutline key={`empty-${i.toString()}`} width={size} height={size} />
        ))}
      </>
    );
  };

  if (variant === 'number-shorten') {
    return (
      <div className={cn('flex items-center rounded-xs px-2', className)}>
        <span className="mr-1">{formattedRating}</span>
        <Star color={color} width={size} height={size} />
      </div>
    );
  }

  const stars = renderStars();

  if (variant === 'with-number') {
    return (
      <div className={cn('rating flex items-center gap-1', className)}>
        <span className="mbutton-medium14 flex items-center rounded-xs px-1 text-foreground">{formattedRating}</span>
        {stars}
      </div>
    );
  }

  return <div className={cn('rating flex gap-2', className)}>{stars}</div>;
}
