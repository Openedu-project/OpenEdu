import { cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { Sparkle } from 'lucide-react';
import { ExpertCard, type ExpertProps } from '../../_components/expert-card';
import { AieduLayoutSection } from '../../_components/layout-section';

export interface AieduIntroductionTeacherProps {
  title?: string;
  teachers?: ExpertProps[];
}

const AieduIntroductionTeacher: SectionComponent<'introduction', 'aieduTeacher'> = ({ className, props }) => {
  const t = useTranslations('themePage.aiedu.introduction.aieduTeacher');

  return (
    <AieduLayoutSection className={cn('space-y-6', className)}>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center">
          <div className="h-[1.4px] w-4 translate-x-[1px] bg-primary md:w-8 lg:w-12" />
          <Sparkle className="text-primary" />
        </div>

        <h3 className="mb-0 text-center text-primary">{t('title')}</h3>

        <div className="flex items-center">
          <Sparkle className="translate-x-[1px] text-primary" />
          <div className="h-[1.4px] w-4 bg-primary md:w-8 lg:w-12" />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {props?.teachers?.filter(Boolean)?.map((value, index) => (
          <ExpertCard
            key={`${value?.name}-${index}-teacher`}
            name={value?.name}
            role={value?.role}
            image={value?.image}
            className="w-full sm:w-1/3 md:w-1/4 lg:w-1/6"
          />
        ))}
      </div>
    </AieduLayoutSection>
  );
};

export { AieduIntroductionTeacher };
