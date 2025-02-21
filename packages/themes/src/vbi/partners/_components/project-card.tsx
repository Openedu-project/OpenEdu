import { Image } from "@oe/ui/components/image";
import type { FileType } from "@oe/ui/components/uploader";
// import { Button } from "@oe/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@oe/ui/shadcn/card";
import { cn } from "@oe/ui/utils/cn";
// import { ChevronRight } from "lucide-react";
// import { useTranslations } from "next-intl";

interface StatProps {
  value?: number;
  label?: string;
}

const Stat = ({ value, label }: StatProps) => (
  <div className="min-w-0 flex-1 text-center">
    <div className="truncate font-bold text-lg text-primary sm:text-xl md:text-2xl">
      {value}+
    </div>
    <div className="mt-1 line-clamp-2 text-muted-foreground text-xs sm:text-sm">
      {label}
    </div>
  </div>
);

interface ProjectCardProps {
  title?: string;
  description?: string;
  image?: FileType;
  stats?: {
    stat1?: StatProps;
    stat2?: StatProps;
    stat3?: StatProps;
  };
  className?: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  stats,
  className,
}: ProjectCardProps) => {
  // const t = useTranslations("themePage.vbi.partners.components");
  return (
    <Card
      className={cn(
        "w-full space-y-2 bg-card px-4 py-2 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:p-6 md:space-y-4",
        className
      )}
    >
      <CardHeader className="!p-0">
        {/* biome-ignore lint/nursery/useSortedClasses: <explanation> */}
        <CardTitle className="text-xl sm:text-2xl font-bold line-clamp-1 text-card-foreground">
          {title}
        </CardTitle>

        {/* Stats Section */}
        <div className="mt-4 flex items-start justify-between gap-2 px-2 sm:gap-4">
          <Stat value={stats?.stat1?.value} label={stats?.stat1?.label} />
          <div className="mx-1 h-12 w-px bg-accent/20" />
          <Stat value={stats?.stat2?.value} label={stats?.stat2?.label} />
          <div className="mx-1 h-12 w-px bg-accent/20" />
          <Stat value={stats?.stat3?.value} label={stats?.stat3?.label} />
        </div>
      </CardHeader>

      <CardContent className="!p-0">
        {/* Description */}
        <p className="line-clamp-3 text-muted-foreground text-sm leading-relaxed sm:line-clamp-4 sm:text-base">
          {description}
        </p>

        {/* Image Container */}
        <div className="group relative h-36 w-full overflow-hidden rounded-lg bg-accent sm:h-44 md:h-52">
          <Image
            src={image?.url}
            alt={title ?? "image"}
            fill
            className="h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Button */}
        {/* <Button
          className="h-10 w-full transition-all duration-300 hover:translate-y-[-2px] sm:h-12"
          variant="default"
        >
          {t("seeDetail")}
          <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
        </Button> */}
      </CardContent>
    </Card>
  );
};

ProjectCard.displayName = "ProjectCard";

export { ProjectCard, type ProjectCardProps };
