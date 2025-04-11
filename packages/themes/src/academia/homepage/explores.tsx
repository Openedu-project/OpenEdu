import { Button } from '@oe/ui';
import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';

import type { SectionComponent } from '../../_types/theme-page';

export interface AcademiaHomepageExploresProps {
  title?: string;
  description?: string;
  btnText?: string;
}

const AcademiaHomepageExplores: SectionComponent<'homepage', 'explores'> = ({ className }) => {
  const t = useTranslations('themePage.academia.homepage.explores');

  return (
    <div className={cn('space-y-5 text-center', className)}>
      <h2 className="giant-iheading-bold24 md:giant-iheading-bold44 text-center text-primary">{t('title')}</h2>
      <p className="mcaption-regular14 md:mcaption-regular24">{t('description')}</p>
      <Button>{t('btnText')}</Button>
    </div>
  );
};

export { AcademiaHomepageExplores };
