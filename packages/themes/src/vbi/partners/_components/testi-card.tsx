import { Image } from "@oe/ui/components/image";
import type { FileType } from "@oe/ui/components/uploader";
import { Card, CardContent } from "@oe/ui/shadcn/card";
import { cn } from "@oe/ui/utils/cn";

interface TestimonialCardProps {
  variant?: "dark" | "light";
  logo?: FileType;
  content: string;
  authorName: string;
  authorRole: string;
  author?: FileType;
  className?: string;
}

const TestimonialCard = ({
  variant = "light",
  logo,
  content,
  authorName,
  authorRole,
  author,
  className,
}: TestimonialCardProps) => {
  const isDark = variant === "dark";

  return (
    <Card
      className={cn(
        "p-4 md:p-8",
        isDark ? "bg-primary text-accent" : "bg-background",
        className
      )}
    >
      <CardContent className="p-0">
        {/* Logo */}
        <div className="relative mb-4 h-[32px]">
          <Image
            src={logo?.url}
            alt="logo"
            height={32}
            width={logo?.width}
            // fill
            className="!h-full absolute top-0 left-0 w-fit object-contain"
          />
        </div>

        {/* Testimonial Content */}
        <p
          className={`mb-8 text-md md:text-lg ${
            isDark ? "text-accent" : "text-accent-foreground"
          }`}
        >
          {content}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative h-12 w-12">
            <Image
              src={author?.url}
              alt="author"
              fill
              className="!h-full absolute top-0 left-0 w-full rounded-full"
            />
          </div>

          <div>
            <p
              className={`font-semibold text-md md:text-lg${
                isDark ? "text-accent" : "text-accent-foreground"
              }`}
            >
              {authorName}
            </p>
            <p
              className={`text-sm md:text-md ${
                isDark ? "text-accent/80" : "text-accent-foreground/80"
              }`}
            >
              {authorRole}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

TestimonialCard.displayName = "TestimonialCard";
export { TestimonialCard, type TestimonialCardProps };
