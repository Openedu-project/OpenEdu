import AiGenerationBg from '@oe/assets/images/theme/aiedu/ai-generation.png';
import { type FileType, Image } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { StatsCard, type StatsCardProps } from '../../_components/stats-card';
import { Title, type TitleProps } from '../../_components/title';
export interface AieduIntroductionBenefitProps extends TitleProps {
  image?: FileType;
  benefit1: StatsCardProps;
  benefit2: StatsCardProps;
  benefit3: StatsCardProps;
  benefit4: StatsCardProps;
}

const AieduIntroductionBenefit: SectionComponent<'introduction', 'aieduBenefit'> = ({ props }) => {
  const t = useTranslations('themePage.aiedu.introduction.aieduBenefit');
  const benefits = [
    {
      percentage: props?.benefit1?.percentage,
      description: t('benefit1.description'),
    },
    {
      percentage: props?.benefit2?.percentage,
      description: t('benefit2.description'),
    },
    {
      percentage: props?.benefit3?.percentage,
      description: t('benefit3.description'),
    },
    {
      percentage: props?.benefit4?.percentage,
      description: t('benefit4.description'),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="hidden w-[100px] lg:block">
          <Image
            src={AiGenerationBg.src}
            alt="logo"
            height={AiGenerationBg?.height ?? 900}
            width={AiGenerationBg?.width ?? 100}
            quality={100}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="container mx-auto max-w-4xl space-y-6 py-12">
          <Title title={t('title')} className="mx-auto max-w-4xl text-center" />
          {benefits?.map((b, index) => (
            <StatsCard
              key={index.toString()}
              className={index % 2 ? 'w-full justify-self-end md:w-[90%]' : 'w-full justify-start md:w-[90%]'}
              percentage={b?.percentage ?? 0}
              description={b?.description}
            />
          ))}
        </div>
        <div className="hidden w-[100px] lg:block">
          <Image
            src={AiGenerationBg.src}
            alt="logo"
            height={AiGenerationBg?.height ?? 900}
            width={AiGenerationBg?.width ?? 100}
            quality={100}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </>
  );
};

export { AieduIntroductionBenefit };
