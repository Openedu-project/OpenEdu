import { Link } from "#common/navigation";
import { Badge } from "#shadcn/badge";
import { cn } from "#utils/cn";

interface IBadgeCourseVersion {
  variant?:
    | "default"
    | "secondary"
    | "success"
    | "destructive"
    | "muted"
    | "outline"
    | "outline_primary"
    | "outline_secondary"
    | "outline_success"
    | "outline_destructive"
    | "outline_muted";
  version?: number;
  link?: string;
}

const BadgeCourseVerion = ({
  variant = "outline_primary",
  version,
  link,
}: IBadgeCourseVersion) =>
  version ? (
    <Badge variant={variant}>
      <Link
        href={link || "#"}
        target={link ? "_blank" : ""}
        className={cn(
          'h-5 min-w-[65px] p-0',
          link ? "cursor-pointer" : "cursor-auto"
        )}
      >
        {`V.${version}.0`}
      </Link>
    </Badge>
  ) : (
    <span className="giant-iheading-semibold20 text-content-info-light-600">
      -
    </span>
  );

export { BadgeCourseVerion };
