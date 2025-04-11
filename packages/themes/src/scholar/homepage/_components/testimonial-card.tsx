import type { FileType } from '@oe/ui';
import { Image } from '@oe/ui';
import { Card, CardContent } from '@oe/ui';
import { Quote, Star, StarHalf } from 'lucide-react';

interface TestimonialCardProps {
  quote?: string;
  rating?: number; // Rating out of 5
  avatar?: FileType;
  name?: string;
  position?: string;
}

const TestimonialCard = ({ quote, rating = 0, avatar, name, position }: TestimonialCardProps) => {
  // Function to render star ratings
  const renderStars = (rating: number) => {
    // biome-ignore lint/suspicious/noEvolvingTypes: <explanation>
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-amber-400 text-amber-400" size={18} />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-amber-400 text-amber-400" size={18} />);
    }

    // Add empty stars to reach 5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="text-amber-400" size={18} fill="none" />);
    }

    return stars;
  };

  return (
    <Card className="mx-auto max-w-md overflow-visible bg-card shadow-xs">
      <CardContent className="relative p-8 text-center">
        {/* Quote Icon */}
        <div className="mt-4 flex w-full justify-center">
          <Quote className="h-10 w-10 fill-primary text-primary" />
        </div>

        {/* Quote Text */}
        <p className="mt-6 mb-4 text-center text-foreground/60">{quote}</p>

        {/* Star Rating */}
        <div className="mb-4 flex justify-center space-x-1">{renderStars(rating)}</div>

        {/* Avatar */}
        <div className="mb-3 flex justify-center">
          <div className="h-16 w-16 overflow-hidden rounded-full border-[1px]">
            <Image
              src={avatar?.url}
              alt={`${name}'s avatar`}
              className="h-16 w-16 scale-125 object-cover"
              height={16}
              width={16}
            />
          </div>
        </div>

        {/* Name and Position */}
        <h3 className="mb-1 font-bold text-foreground/80 text-sm uppercase tracking-wider">{name}</h3>
        <p className="text-forground/50 text-sm">{position}</p>
      </CardContent>
    </Card>
  );
};

TestimonialCard.displayName = 'TestimonialCard';
export { TestimonialCard, type TestimonialCardProps };
