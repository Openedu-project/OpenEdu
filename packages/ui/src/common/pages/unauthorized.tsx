import { OrgNotfoundImage } from '@oe/assets/icons/org-notfound';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { ErrorException } from '#components/error-handler';

export default function UnauthorizedPage() {
  const tErrors = useTranslations('errors');
  const tGeneral = useTranslations('general');

  return (
    <ErrorException
      status={401}
      title={tErrors('unauthorized.title')}
      description={tErrors('unauthorized.description')}
      action={{
        href: PLATFORM_ROUTES.homepage,
        label: tGeneral('backToHomepage'),
        props: {
          activeClassName: 'border-0',
          nextZone: 'platform',
        },
      }}
    >
      <OrgNotfoundImage className="h-full w-full" />
    </ErrorException>
  );
}
