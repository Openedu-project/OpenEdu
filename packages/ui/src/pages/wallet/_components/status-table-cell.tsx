import { useTranslations } from 'next-intl';
import { Badge } from '#shadcn/badge';

export function StatusTableCell({ status }: { status: string }) {
  const t = useTranslations('wallets.status');
  let statusColor: 'outline_success' | 'outline_secondary' | 'outline_primary' | 'outline_destructive';
  switch (status) {
    case 'success':
    case 'approved':
      statusColor = 'outline_success';
      break;
    case 'pending':
      statusColor = 'outline_secondary';
      break;
    case 'new':
      statusColor = 'outline_primary';
      break;
    case 'cancelled':
    case 'rejected':
    case 'failed':
      statusColor = 'outline_destructive';
      break;
    default:
      statusColor = 'outline_destructive';
      break;
  }
  return <Badge variant={statusColor}>{t(status)}</Badge>;
}
