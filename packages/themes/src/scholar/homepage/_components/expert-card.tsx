import { Link } from '@oe/ui/common/navigation';
import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
import { Card, CardContent, CardFooter } from '@oe/ui/shadcn/card';

import Facebook from '@oe/assets/icons/social-icon/facebook';
import Linkedin from '@oe/assets/icons/social-icon/linkedin';
import Twitter from '@oe/assets/icons/social-icon/twitter';

interface ExpertProps {
  name?: string;
  role?: string;
  image?: FileType;
  socialLinks?: {
    facebook?: string;
    x?: string;
    linkedin?: string;
  };
}

const ExpertCard = ({ name, role, image, socialLinks }: ExpertProps) => {
  return (
    <Card className="mx-auto h-full max-w-[300px] overflow-hidden border-none bg-card p-2 shadow-sm transition-shadow duration-300 hover:shadow-md md:mx-0 md:w-full md:max-w-none">
      <Image
        src={image?.url}
        height={image?.height ?? 300}
        width={image?.width ?? 300}
        alt="avatar"
        className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
      />
      <CardContent className="p-3 text-center sm:p-4">
        <h3 className="mt-1 font-bold text-base text-foreground uppercase tracking-wide sm:mt-2 sm:text-lg">{name}</h3>
        <p className="text-foreground/80 text-xs sm:text-sm">{role}</p>
      </CardContent>
      <CardFooter className="!pt-0 flex justify-center space-x-2 p-3 sm:p-4">
        {socialLinks?.facebook && (
          <Link
            href={socialLinks.facebook}
            className="flex h-7 w-7 items-center justify-center rounded-full border-primary p-0 text-primary transition-colors hover:bg-primary sm:h-8 sm:w-8"
            aria-label={`${name}'s Twitter`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook height={24} width={24} className="text-primary" />
          </Link>
        )}
        {socialLinks?.x && (
          <Link
            href={socialLinks.x}
            className="flex h-7 w-7 items-center justify-center rounded-full border-primary p-0 text-primary transition-colors hover:bg-primary sm:h-8 sm:w-8"
            aria-label={`${name}'s Twitter`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter height={24} width={24} className="text-primary" />
          </Link>
        )}
        {socialLinks?.linkedin && (
          <Link
            href={socialLinks.linkedin}
            className="flex h-7 w-7 items-center justify-center rounded-full border-primary p-0 text-primary transition-colors hover:bg-primary sm:h-8 sm:w-8"
            aria-label={`${name}'s Twitter`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin height={24} width={24} />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};
ExpertCard.displayName = 'ExpertCard';

export { ExpertCard, type ExpertProps };
