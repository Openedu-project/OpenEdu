import CreatorImage from '@oe/assets/images/openedu-homepage/banner-creators.png';
import { Image } from '@oe/ui/components/image';
import { Button } from '@oe/ui/shadcn/button';
import { useTranslations } from 'next-intl';

export default function CreatorsSection() {
  const t = useTranslations('homePageLayout.creatorsSection');

  return (
    <div className="relative w-full overflow-hidden">
      <div className="container relative mx-auto px-4 py-5 lg:py-10">
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <div className="relative flex w-48 md:w-64 lg:w-[660px]">
              <Image
                src={CreatorImage.src}
                alt="OpenEdu Creator"
                width={944}
                height={800}
                className="rounded-full object-contain"
                priority
              />
            </div>
          </div>

          <div className="mt-6 text-center md:mt-8 lg:mt-10">
            <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 mb-4 md:mb-6">
              {t('title')}
            </h2>
            <p className="mcaption-regular16 md:mcaption-regular24 mb-4 text-muted-foreground md:mb-6">
              {t('description')}
            </p>
            <Button size="lg" className="rounded-full px-8">
              {t('buttons.become')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
