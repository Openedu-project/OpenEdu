import { OrgNotfoundImage } from '@oe/assets/icons/org-notfound';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { ErrorException } from '#components/error-handler';

export default function OrgNotFound() {
  const tErrors = useTranslations('errors');
  const tGeneral = useTranslations('general');

  return (
    <ErrorException
      status={404}
      title={tErrors('orgNotFound.title')}
      description={tErrors('orgNotFound.description')}
      action={{
        href: `${process.env.NEXT_PUBLIC_APP_ORIGIN}${PLATFORM_ROUTES.homepage}`,
        label: tGeneral('backToOpenedu'),
        props: {
          activeClassName: 'border-0',
          nextZone: 'platform',
        },
      }}
    >
      <OrgNotfoundImage className="h-full w-full" />
    </ErrorException>
  );
  // return (
  //   <div className="flex flex-col p-8 gap-10 w-full lg:flex-row">
  //     <OrgNotfoundImage className="w-full flex-1 order-2" />
  //     <div className="flex items-center justify-center flex-1 order-1">
  //       <div className="text-center max-w-[380px]">
  //         <h2 className="text-primary font-primary font-bold text-2xl mb-6">404</h2>
  //         <h3 className="mb-2 font-primary font-bold text-xl">{tErrors('orgNotFound.title')}</h3>
  //         <p className="mb-8">{tErrors('orgNotFound.description')}</p>
  //         <Link href={PLATFORM_ROUTES.homepage} variants={{ variant: 'default' }}>
  //           {tGeneral('backToHomepage')}
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );
}
