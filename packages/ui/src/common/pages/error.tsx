import { UnderMaintainImage } from '@oe/assets/icons/maintain';
import { AlertCircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ErrorException } from '#components/error-handler';
import { Button } from '#shadcn/button';

type Props = { error: Error & { digest?: string }; reset: () => void };
export default function ErrorBoundary({ error, reset }: Props) {
  const tErrors = useTranslations('errors');

  return (
    <ErrorException
      status={<AlertCircleIcon className="mx-auto mb-6 text-destructive" size={32} />}
      title={tErrors(error.message)}
      action={
        <Button onClick={reset} className="mt-4 w-full">
          {tErrors('tryAgain')}
        </Button>
      }
    >
      <UnderMaintainImage className="h-full w-full [transform:rotateY(180deg)]" />
    </ErrorException>
  );
}
