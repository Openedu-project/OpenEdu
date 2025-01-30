import ReferralImage from '@oe/assets/images/openedu-homepage/banner-referral.png';
import { Link } from '@oe/ui/common/navigation';
import { Image } from '@oe/ui/components/image';
import { MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ReferralProgramSection() {
  const t = useTranslations('homePageLayout.referralProgramSection');

  return (
    <section className="container relative mx-auto px-0 py-5 md:px-4 md:py-10">
      <div className="flex flex-col items-center justify-center">
        <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 mb-3 text-center">
          {t('title')}
        </h2>
        <div className="mcaption-regular16 lg:mcaption-regular24 flex items-center gap-1 text-center">
          <p>
            {t('description')}
            <Link
              href="#"
              className="mcaption-regular16 lg:mcaption-regular24 mb-6 ml-1 inline-flex gap-1 p-0 lg:mb-10"
            >
              {t('exploreMore')}
              <MoveRight />
            </Link>
          </p>
        </div>
        <div className="w-full">
          <div className="relative mx-auto flex w-full">
            <Image src={ReferralImage.src} alt="Referral Gift" height={352} width={322} className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
