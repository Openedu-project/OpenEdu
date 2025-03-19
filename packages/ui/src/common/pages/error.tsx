// import { UnderMaintainImage } from "@oe/assets/icons/maintain";
// import { AlertCircleIcon } from "lucide-react";
// import { useTranslations } from "next-intl";
// import { ErrorException } from "#components/error-handler";
// import { Button } from "#shadcn/button";

// type Props = { error: Error & { digest?: string }; reset: () => void };
// export default function ErrorBoundary({ error, reset }: Props) {
//   const tErrors = useTranslations("errors");

//   return (
//     <ErrorException
//       status={
//         <AlertCircleIcon className="mx-auto mb-6 text-destructive" size={32} />
//       }
//       title={tErrors(error.message)}
//       action={
//         <Button onClick={reset} className="mt-4 w-full">
//           {tErrors("tryAgain")}
//         </Button>
//       }
//     >
//       <UnderMaintainImage className="h-full w-full [transform:rotateY(180deg)]" />
//     </ErrorException>
//   );
// }
'use client';
import { UnderMaintainImage } from '@oe/assets/icons/maintain';
import { useRollbar } from '@rollbar/react';
import { AlertCircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Link } from '#common/navigation';
import { ErrorException } from '#components/error-handler';
import { Button } from '#shadcn/button';

type Props = { error: Error & { digest?: string }; reset: () => void };

const NUMERIC_REGEX = /^\d+$/;

function getErrorDetails(error: Error & { digest?: string }) {
  const isServerError =
    error.message?.includes('Server Components render') || error.message?.includes('omitted in production');

  if (isServerError && error.digest) {
    if (NUMERIC_REGEX.test(error.digest)) {
      return {
        errorKey: error.digest,
        isKnownError: true,
        isServerError,
      };
    }

    return {
      errorKey: 'serverError',
      digestValue: error.digest,
      isKnownError: false,
      isServerError,
    };
  }

  return {
    errorKey: error.message || 'unknown',
    isKnownError: true,
    isServerError: false,
  };
}

export default function ErrorBoundary({ error, reset }: Props) {
  const tErrors = useTranslations('errors');
  const tGeneral = useTranslations('general');
  const rollbar = useRollbar();
  const { errorKey, isServerError, isKnownError, digestValue } = getErrorDetails(error);

  let title: string;
  if (typeof errorKey === 'string' && errorKey.includes('.')) {
    const [namespace] = errorKey.split('.');
    title = tErrors(`${namespace}.title`) || tErrors('serverError.title');
  } else {
    try {
      title = isKnownError ? tErrors(errorKey as string) : tErrors('serverError.title');
    } catch {
      title = tErrors('serverError.title');
    }
  }

  let description: string | undefined;
  if (isServerError) {
    description = tErrors('serverError.description');
    if (process.env.NODE_ENV !== 'production' && digestValue) {
      description += ` (Digest: ${digestValue})`;
    }
  }

  useEffect(() => {
    rollbar.error(error);
  }, [error, rollbar]);

  return (
    <ErrorException
      status={<AlertCircleIcon className="mx-auto mb-6 text-destructive" size={32} />}
      title={title}
      description={description}
      action={
        <div className="flex gap-2">
          <Link variant="default" href="/" className="mt-4 w-full">
            {tGeneral('backToHomepage')}
          </Link>
          <Button variant="outline" onClick={reset} className="mt-4 w-full">
            {tErrors('tryAgain')}
          </Button>
        </div>
      }
    >
      <UnderMaintainImage className="h-full w-full [transform:rotateY(180deg)]" />
    </ErrorException>
  );
}
