import { Link } from '@oe/ui/common/navigation';
import { Badge, type BadgeProps } from '@oe/ui/shadcn/badge';

interface ICourseBadgeVersion {
  variant?: BadgeProps['variant'];
  version?: number;
  href?: string;
}

export const CourseBadgeVersion = ({ variant = 'default', version, href }: ICourseBadgeVersion) =>
  version ? (
    <Badge variant={variant}>{href ? <Link href={href}>{`v${version}.0`}</Link> : `v${version}.0`}</Badge>
  ) : (
    <span className="giant-iheading-semibold20 text-primary">-</span>
  );
