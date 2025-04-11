import { NotfoundImage } from '@oe/assets';
import { PLATFORM_ROUTES } from '@oe/core';
import { useTranslations } from 'next-intl';
import { ErrorException } from '#components/error-handler';

export function NotFoundPage() {
  const tErrors = useTranslations('errors');
  const tGeneral = useTranslations('general');

  return (
    <ErrorException
      status={404}
      title={tErrors('notFound.title')}
      description={tErrors('notFound.description')}
      action={{
        href: PLATFORM_ROUTES.homepage,
        label: tGeneral('backToHomepage'),
        props: {
          activeClassName: 'border-0',
          nextZone: 'platform',
        },
      }}
    >
      <NotfoundImage className="h-full w-full" />
    </ErrorException>
  );
}
