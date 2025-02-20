import { Link } from "@oe/ui/common/navigation";
import { Image } from "@oe/ui/components/image";
import type { FileType } from "@oe/ui/components/uploader";
import { Button } from "@oe/ui/shadcn/button";
import { cn } from "@oe/ui/utils/cn";
import type { SectionComponent } from "../../../_types/theme-page";
import type { StatCardProps } from "../../_components/stat-card";

export interface VbiHomepageHeroProps {
  title?: string;
  titleSub?: string;
  button?: {
    text?: string;
    link?: string;
  };
  banner: {
    image?: FileType;
    bannerContent1: StatCardProps;
    bannerContent2: StatCardProps;
    bannerContent3: StatCardProps;
  };
  partners?: FileType[];
}

const VbiHomepageHero: SectionComponent<"homepage", "vbiHero"> = ({
  props,
  className,
  t,
}) => {
  return (
    <div
      className={cn(
        "container relative relative mx-auto bg-background px-4 md:px-8 lg:h-[calc(100vh-var(--header-height))] lg:px-12",
        className
      )}
    >
      {/* Content container */}
      <div className="flex flex-col items-center gap-12 md:h-[calc(100vh-var(--header-height)-120px)] md:flex-row">
        {/* Content */}
        <div className="flex h-[60vh] flex-auto flex-col justify-center space-y-6 py-2 text-foreground md:h-full lg:flex-1">
          <h1 className="font-bold text-3xl leading-tight md:text-5xl">
            {t?.("title")}
          </h1>
          <p className="text-foreground/80 text-md md:text-lg">
            {t?.("titleSub")}
          </p>

          <Button className="w-full sm:w-fit">
            <Link
              href={props?.button?.link ?? "#"}
              className="bg-inherit text-primary-foreground hover:no-underline"
            >
              {t?.("button.text")}
            </Link>
          </Button>
        </div>
        {/* Column - Stats */}
        <div className="mb-12 flex w-full flex-auto justify-center overflow-hidden md:mb-0 md:h-[calc(100vh-var(--header-height)-120px)] lg:flex-1">
          <Image
            alt="banner"
            src={props?.banner?.image?.url}
            height={props?.banner?.image?.height}
            width={props?.banner?.image?.width}
            className="rounded-sm object-contain"
          />
        </div>
      </div>
      {/* Partners */}
      <div className="flex flex-wrap justify-center gap-y-4 md:h-[120px] md:gap-x-[2%] md:gap-y-6">
        {props?.partners?.map((file, index) => (
          <div
            className="mx-0 h-[44px] w-[50%] sm:w-[33%] md:mx-0 md:w-[18%]"
            key={index.toString()}
          >
            <Image
              src={file.url}
              height={file.height}
              width={file.width}
              alt="partners"
              className="h-[40px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VbiHomepageHero;
