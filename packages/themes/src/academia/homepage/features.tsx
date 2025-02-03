import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../_types/theme-page';

export interface AcademiaHomepageFeaturesProps {
  title?: string;
  description?: string;
}

const AcademiaHomepageFeatures: SectionComponent<'homepage', 'features'> = ({ className, props }) => {
  const t = useTranslations('themePage.academia.homepage.features');

  return (
    <div className={cn('flex flex-col md:flex-row', className)}>
      <h2 className="giant-iheading-bold24 md:giant-iheading-bold44 text-primary">{t('title')}</h2>
      <p>{props?.description || t('description')}</p>
    </div>
  );
};

export default AcademiaHomepageFeatures;
