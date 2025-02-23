import { isLogin } from '@oe/api/utils/auth';
import { getTranslations } from 'next-intl/server';
import { Link } from '#common/navigation';
import { DescText, H2Text, LaunchpadDialog } from '../components';
import StepCard from '../components/step-card';
import { launchpadStepData } from '../lib/render-data';

const StepSection = async () => {
  const [t, isLoggedIn] = await Promise.all([getTranslations('launchpadHomepage'), isLogin()]);
  const stepData = launchpadStepData(t);

  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-[720px] space-y-6 text-center">
        <H2Text>{t('stepSection.title')}</H2Text>
        <DescText>
          {t('stepSection.desc')}
          <Link href="/terms" className="block font-normal text-sm leading-tight sm:text-base md:text-xl">
            {t('stepSection.terms')}
          </Link>
        </DescText>
      </div>
      <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
        {isLoggedIn && <LaunchpadDialog />}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stepData.map(step => (
          <div key={step.step} className={step.step === 2 || step.step === 3 ? 'lg:mt-16' : ''}>
            <StepCard data={step} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StepSection;
