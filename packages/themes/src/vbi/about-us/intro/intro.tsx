import aboutBg from '@oe/assets/images/theme/about-bg.png';
import type { FileType } from '@oe/ui';
import { Image } from '@oe/ui';
import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

export interface VbiAboutUsIntroProps {
  name?: string;
  slogan?: string;
  image?: FileType;
}

const VbiAboutUsIntro: SectionComponent<'about-us', 'vbiIntro'> = ({
  // props,
  className,
}) => {
  const t = useTranslations('themePage.vbi.about-us.vbiIntro');

  return (
    <div className={cn('container relative space-y-4 py-8 md:space-y-8 md:py-12', className)}>
      <h2 className="giant-iheading-bold16 md:giant-iheading-bold24 mb-4 whitespace-pre-wrap text-center">
        {t('name')}
      </h2>
      <h1 className="giant-iheading-bold24 md:giant-iDisplay-bold36 lg:giant-iDisplay-bold48 mb-5 text-center">
        {t('slogan')}
      </h1>

      <Image
        alt="banner"
        src={aboutBg?.src}
        className="h-full w-full rounded-lg object-contain"
        height={aboutBg?.height}
        width={aboutBg?.width}
        quality={100}
      />
    </div>
  );
};

export { VbiAboutUsIntro };
