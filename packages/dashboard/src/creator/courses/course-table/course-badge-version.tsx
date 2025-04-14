import { Badge, type BadgeProps } from '@oe/ui';
import { Link } from '@oe/ui';

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
