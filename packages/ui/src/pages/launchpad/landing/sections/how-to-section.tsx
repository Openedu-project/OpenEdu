import { getTranslations } from 'next-intl/server';
import { Link } from '#common/navigation';
import { DescText, H2Text, HowToCard } from '../components';

import { howToGetMoneyData } from '../lib/render-data';

const HowToSection = async () => {
  const t = await getTranslations('launchpadHomepage');
  const translatedData = howToGetMoneyData(t);
  return (
    <section className="flex flex-col items-start justify-between gap-10 pb-10 md:flex-row md:gap-16">
      <div className="w-full md:w-[40%]">
        <H2Text>{t('howToSection.title')}</H2Text>
        <DescText>
          {t('howToSection.desc')}
          <Link href="/terms" className="block p-0 font-normal text-sm leading-tight sm:text-base md:text-xl">
            {t('howToSection.terms')}
          </Link>
        </DescText>
      </div>
      <div className="w-full space-y-5 md:w-[60%]">
        {translatedData.map(item => (
          <HowToCard key={item.title} data={item} />
        ))}
      </div>
    </section>
  );
};

export default HowToSection;
