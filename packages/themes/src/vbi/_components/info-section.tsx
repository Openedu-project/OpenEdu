import { Link } from "@oe/ui/common/navigation";
import { Button } from "@oe/ui/shadcn/button";
import { cn } from "@oe/ui/utils/cn";

interface InfoSectionProps {
  title?: string;
  titleSub?: string;
  button?: {
    text?: string;
    link?: string;
  };
  className?: string;
  variant?: "default" | "outline";
}
const InfoSection = ({
  title,
  titleSub,
  button,
  className,
  variant = "default",
}: InfoSectionProps) => {
  return (
    <div className={cn("space-y-2 text-foreground md:space-y-4", className)}>
      <h2
        className={`font-bold text-xl uppercase leading-tight lg:text-3xl ${
          variant === "outline" && "text-background"
        }`}
      >
        {title}
      </h2>
      <p
        className={`text-foreground/80 text-lg ${
          variant === "outline" && "!text-background"
        }`}
      >
        {titleSub}
      </p>

      {button && (
        <Button variant={variant === "default" ? "default" : "outline"}>
          <Link
            href={button?.link ? button?.link : "#"}
            className={cn(
              "!text-primary-foreground bg-inherit hover:bg-transparent hover:no-underline",
              variant === "outline" && "!text-primary"
            )}
          >
            {button?.text}
          </Link>
        </Button>
      )}
    </div>
  );
};

InfoSection.displayName = "InfoSection";

export { InfoSection, type InfoSectionProps };
