import { Image } from "@oe/ui/components/image";
import type { FileType } from "@oe/ui/components/uploader";
import { Card } from "@oe/ui/shadcn/card";
import { Separator } from "@oe/ui/shadcn/separator";
import { cn } from "@oe/ui/utils/cn";
import { ContentSection, type ContentSectionProps } from "./content-section";
import { StatCard, type StatCardProps } from "./stat-card";

interface AchievementCardProps extends ContentSectionProps {
  stats?: {
    stat1?: StatCardProps;
    stat2?: StatCardProps;
    stat3?: StatCardProps;
  };
  image?: FileType;
  contentVariant?: "left" | "right" | string;
  className?: string;
}

const AchievementCard = ({
  stats,
  title,
  description,
  image,
  className,
  contentVariant = "right",
}: AchievementCardProps) => {
  return (
    <Card className={cn("border-none p-0", className)}>
      <div className="flex flex-col gap-6 md:flex-row md:items-center lg:gap-12">
        {/* Left Column - Images */}
        <div className="basis-1/2">
          <Image
            alt="Developer at work"
            src={image?.url}
            className="rounded-lg object-cover"
            height={360}
            width={image?.width ?? 600}
          />
        </div>
        {/* Right Column - Content */}
        <div
          className={cn(
            "flex basis-1/2 flex-col justify-between space-y-6 md:space-y-8",
            contentVariant === "left" && "md:order-first"
          )}
        >
          {/* Content Sections */}
          <ContentSection title={title} description={description} />

          {/* Stats Section */}
          <div className="flex justify-between gap-2 md:gap-4">
            <StatCard
              value={stats?.stat1?.value}
              label={stats?.stat1?.label}
              className={stats?.stat1?.className}
            />
            <Separator className="h-8 w-[1px] self-center" />
            <StatCard
              value={stats?.stat2?.value}
              label={stats?.stat2?.label}
              className={stats?.stat2?.className}
            />
            <Separator className="h-8 w-[1px] self-center" />
            <StatCard
              value={stats?.stat3?.value}
              label={stats?.stat3?.label}
              className={stats?.stat3?.className}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export { AchievementCard, type AchievementCardProps };
export default AchievementCard;
