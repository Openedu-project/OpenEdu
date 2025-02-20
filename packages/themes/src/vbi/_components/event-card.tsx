import { Image } from "@oe/ui/components/image";
import type { FileType } from "@oe/ui/components/uploader";
import { Card, CardContent } from "@oe/ui/shadcn/card";
import { Separator } from "@oe/ui/shadcn/separator";
import { cn } from "@oe/ui/utils/cn";
import { ContentSection, type ContentSectionProps } from "./content-section";
import { StatCard, type StatCardProps } from "./stat-card";

interface EventCardProps extends ContentSectionProps {
  stats?: {
    stat1?: StatCardProps;
    stat2?: StatCardProps;
    stat3?: StatCardProps;
  };
  image?: FileType;
  className?: string;
}

const EventCard = ({
  stats,
  title,
  description,
  image,
  className,
}: EventCardProps) => {
  return (
    <Card className={cn("w-full rounded-lg bg-primary", className)}>
      <CardContent className="!p-0 basis-full">
        <Image
          alt="Developer at work"
          src={image?.url}
          className="-top-8 mx-0 w-[calc(100%-2rem)] flex-0 rounded-lg"
          fill
          aspectRatio="16:9"
          containerHeight="auto"
          sizes="(max-width: 768px) 280px, 380px"
        />
        <div className={cn("space-y-4 p-4 pt-0 text-accent")}>
          {/* Content Sections */}
          <ContentSection
            title={title}
            description={description}
            className="text-accent"
          />

          {/* Stats Section */}
          <div className="flex justify-between gap-2 md:gap-4">
            <StatCard
              value={stats?.stat1?.value}
              label={stats?.stat1?.label}
              variant="primary"
            />
            <Separator className="h-8 w-[1px] self-center bg-accent" />
            <StatCard
              value={stats?.stat2?.value}
              label={stats?.stat2?.label}
              variant="primary"
            />
            <Separator className="h-8 w-[1px] self-center bg-accent" />
            <StatCard
              value={stats?.stat3?.value}
              label={stats?.stat3?.label}
              variant="primary"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { EventCard, type EventCardProps };
export default EventCard;
