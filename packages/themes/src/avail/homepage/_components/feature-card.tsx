import { Image } from "@oe/ui/components/image";
import type { FileType } from "@oe/ui/components/uploader";
import { Card } from "@oe/ui/shadcn/card";
import { cn } from "@oe/ui/utils/cn";

interface FeatureCardProps {
  image?: FileType;
  textImg?: FileType;
  description?: string;
  className?: string;
}

const FeatureCard = ({
  image,
  textImg,
  description,
  className,
}: FeatureCardProps) => {
  return (
    <Card
      className={cn(
        "flex h-full w-full flex-col items-center gap-4 rounded-lg bg-transparent p-4",
        className
      )}
    >
      <Image
        alt="Image"
        src={image?.url}
        height={288}
        width={312}
        className="aspect-square max-h-[300px] w-3/4 rounded-radius-m object-contain"
      />
      <Image
        alt="Text"
        src={textImg?.url}
        height={32}
        width={165}
        className="h-8 w-auto object-contain"
      />
      <p className="mcaption-regular18 whitespace-pre-wrap text-center">
        {description}
      </p>
    </Card>
  );
};

export { FeatureCard, type FeatureCardProps };
export default FeatureCard;
