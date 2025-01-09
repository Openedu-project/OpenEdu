import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const LoadingState = () => (
  <div className="mt-4 w-full flex items-center justify-center">
    <LoaderCircle className="animate-spin" />
  </div>
);

export const EmptyState = () => {
  const tWalletPage = useTranslations('walletPage');
  return <p className="text-center mt-3">{tWalletPage('noData')}</p>;
};

export const ErrorState = () => {
  const tWalletPage = useTranslations('walletPage');
  return <p className="text-center mt-3 text-red-500">{tWalletPage('fetchFailed')}</p>;
};
