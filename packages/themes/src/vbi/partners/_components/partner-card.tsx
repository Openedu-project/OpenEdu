import type { FileType } from '@oe/ui';
import { Image } from '@oe/ui';
import { Card, CardContent } from '@oe/ui';

interface PartnerCardProps {
  logo?: FileType;
  content: string;
}

const PartnerCard = ({ logo, content }: PartnerCardProps) => {
  return (
    <Card className="p-2 md:p-4">
      <CardContent className="p-0">
        {/* Logo */}
        <div className="relative mb-2 h-[28px]">
          <Image
            src={logo?.url}
            alt="logo"
            height={28}
            width={logo?.width}
            // fill
            className="!h-full absolute top-0 left-0 w-fit object-contain"
          />
        </div>

        {/* Testimonial Content */}
        <p className="text-xs md:text-sm">{content}</p>
      </CardContent>
    </Card>
  );
};

PartnerCard.displayName = 'PartnerCard';
export { PartnerCard, type PartnerCardProps };
