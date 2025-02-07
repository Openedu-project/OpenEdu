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
        <H2Text>How To Get Money From Pledging A Launchpad?</H2Text>
        <DescText>
          With a token wallet in OpenEdu, you can easily make a donate for any course launchpad in OpenEdu Platform.
          <Link href="/terms" className="block p-0 font-normal text-sm leading-tight sm:text-base md:text-xl">
            Read More For Terms & Conditions
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
