import type { FileType } from '@oe/ui';
import { Image, cn } from '@oe/ui';
import { Card, CardContent } from '@oe/ui';

interface ExpertProps {
  name?: string;
  role?: string;
  image?: FileType;
  socialLinks?: {
    facebook?: string;
    x?: string;
    linkedin?: string;
  };
  className?: string;
}

const ExpertCard = ({ name, role, image, className }: ExpertProps) => {
  return (
    <Card
      className={cn(
        'h-full overflow-hidden border-none bg-card p-2 shadow-xs transition-shadow duration-300 hover:shadow-md',
        className
      )}
    >
      <Image
        src={image?.url}
        alt="avatar"
        fill
        rounded="lg"
        aspectRatio="1:1"
        sizes="240px"
        className="h-full w-full rounded-lg object-cover transition-all duration-300 hover:scale-105"
      />
      <CardContent className="space-y-2">
        {/* <div className="space-y-2"> */}
        <h3 className="mt-1 font-bold text-base text-foreground tracking-wide sm:mt-2 sm:text-lg">{name}</h3>
        <p className="text-muted-foreground text-xs sm:text-sm">{role}</p>
        {/* </div> */}
        {/* <div className="flex justify-center space-x-2 p-3 sm:p-4 md:space-x-4">
          {socialLinks?.facebook && (
            <Link
              href={socialLinks.facebook}
              className="flex h-7 w-7 items-center justify-center rounded-full border-primary p-0 text-primary transition-colors sm:h-8 sm:w-8"
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
              className="flex h-7 w-7 items-center justify-center rounded-full border-primary p-0 text-primary transition-colors sm:h-8 sm:w-8"
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
              className="flex h-7 w-7 items-center justify-center rounded-full border-primary p-0 text-primary transition-colors sm:h-8 sm:w-8"
              aria-label={`${name}'s Twitter`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin height={24} width={24} />
            </Link>
          )}
        </div> */}
      </CardContent>
    </Card>
  );
};
ExpertCard.displayName = 'ExpertCard';

export { ExpertCard, type ExpertProps };
