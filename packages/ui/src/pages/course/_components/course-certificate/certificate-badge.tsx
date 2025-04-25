import { useTranslations } from 'next-intl';
import { Badge, type BadgeVariant } from '#shadcn/badge';

type TCertificateBadge = 'default' | 'nft' | 'sponsor';

function CertificateBadge({ badgeType }: { badgeType: TCertificateBadge }) {
  const t = useTranslations('courseOutline.certificate');

  const certBadge = {
    default: {
      text: t('badge.pdfCertificate'),
      variant: 'default',
    },
    nft: {
      text: t('badge.nftCertificate'),
      variant: 'success',
    },
    sponsor: {
      text: t('badge.sponsored'),
      variant: 'warning',
    },
  } as Record<TCertificateBadge, { text: string; variant: BadgeVariant }>;

  return <Badge variant={certBadge[badgeType].variant}>{certBadge[badgeType].text}</Badge>;
}

export { CertificateBadge };
