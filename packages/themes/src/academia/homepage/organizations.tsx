import type { FileType } from '@oe/ui';
import { Image } from '@oe/ui';
import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../_types/theme-page';

interface OrgItem {
  name?: string;
  logo?: FileType;
  url?: string;
}

export interface AcademiaHomepageOrganizationsProps {
  title?: string;
  orgs: OrgItem[];
}

const AcademiaHomepageOrganizations: SectionComponent<'homepage', 'organizations'> = ({ className, props }) => {
  const t = useTranslations('themePage.academia.homepage.organizations');

  return (
    <div className={cn('space-y-1', className)}>
      <h2 className="giant-iheading-bold24 md:giant-iheading-bold44 text-primary">{t('title')}</h2>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
        {(props?.orgs?.length || 0) > 0 &&
          props?.orgs?.map((item, index) => (
            <div key={`${item.name}-${index.toString()}`} className="flex gap-1">
              <Image src={item?.logo?.url} height={68} width={68} alt="" className="object-contain" />
              <div className="space-y-1">
                <p>{item?.name}</p>
                <p>{item?.url}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export { AcademiaHomepageOrganizations };
